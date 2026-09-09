// Offline-ish track analysis: derives BPM and per-band sensitivities from a decoded buffer
// using simple biquad filters + envelope statistics. Output is meant to seed the live
// analyzer's GlobalSettings; live FFT-based detection takes over from there.

export const ANALYSIS_FPS = 60;

export interface AnalyzeTrackResult {
  bpm: number;
  /** Confidence 0–1 for the BPM estimate (autocorrelation peak strength). */
  bpmConfidence: number;
  lowSensitivity: number;
  midSensitivity: number;
  highSensitivity: number;
  /** Per-band trigger rate (events/sec) achieved by the proposed sensitivities, given the analysis envelope. */
  estimatedRate: { low: number; mid: number; high: number };
  /** Suggested low crossover (Hz) for cleaner kick separation, or null to leave unchanged. */
  suggestedLowCrossoverHz?: number;
  /** Proposed `inputGain` lands the track's true peak at −1 dBFS. */
  inputGain: number;
  /** Proposed `inputMultiplier` lands the post-gain low-band envelope p95 around 0.75. */
  inputMultiplier: number;
  /** Raw peak (sample magnitude) of the source — for diagnostics / Studio readout. */
  sourcePeak: number;
  durationSec: number;
}

export function mixToMono(buf: AudioBuffer): Float32Array {
  const len = buf.length;
  const out = new Float32Array(len);
  const ch = buf.numberOfChannels;
  for (let c = 0; c < ch; c++) {
    const data = buf.getChannelData(c);
    for (let i = 0; i < len; i++) out[i] += data[i]!;
  }
  if (ch > 1) for (let i = 0; i < len; i++) out[i] /= ch;
  return out;
}

// RBJ cookbook biquad coefficients.
export function biquadCoeffs(kind: "lp" | "hp" | "bp", sr: number, f0: number, Q: number) {
  const w0 = (2 * Math.PI * f0) / sr;
  const cosW = Math.cos(w0);
  const sinW = Math.sin(w0);
  const alpha = sinW / (2 * Q);
  let b0 = 0, b1 = 0, b2 = 0, a0 = 0, a1 = 0, a2 = 0;
  if (kind === "lp") {
    b0 = (1 - cosW) / 2;
    b1 = 1 - cosW;
    b2 = (1 - cosW) / 2;
    a0 = 1 + alpha;
    a1 = -2 * cosW;
    a2 = 1 - alpha;
  } else if (kind === "hp") {
    b0 = (1 + cosW) / 2;
    b1 = -(1 + cosW);
    b2 = (1 + cosW) / 2;
    a0 = 1 + alpha;
    a1 = -2 * cosW;
    a2 = 1 - alpha;
  } else {
    b0 = alpha;
    b1 = 0;
    b2 = -alpha;
    a0 = 1 + alpha;
    a1 = -2 * cosW;
    a2 = 1 - alpha;
  }
  return { b0: b0 / a0, b1: b1 / a0, b2: b2 / a0, a1: a1 / a0, a2: a2 / a0 };
}

export function applyBiquad(samples: Float32Array, c: ReturnType<typeof biquadCoeffs>): Float32Array {
  const out = new Float32Array(samples.length);
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let i = 0; i < samples.length; i++) {
    const x = samples[i]!;
    const y = c.b0 * x + c.b1 * x1 + c.b2 * x2 - c.a1 * y1 - c.a2 * y2;
    out[i] = y;
    x2 = x1; x1 = x;
    y2 = y1; y1 = y;
  }
  return out;
}

/** Decimate to ANALYSIS_FPS via per-frame peak. Raw amplitudes (no normalization). */
function envelopeAtAnalysisFpsRaw(samples: Float32Array, sr: number): Float32Array {
  const samplesPerFrame = Math.max(1, Math.floor(sr / ANALYSIS_FPS));
  const frames = Math.floor(samples.length / samplesPerFrame);
  const out = new Float32Array(frames);
  for (let f = 0; f < frames; f++) {
    const start = f * samplesPerFrame;
    let peak = 0;
    for (let i = 0; i < samplesPerFrame; i++) {
      const v = Math.abs(samples[start + i]!);
      if (v > peak) peak = v;
    }
    out[f] = peak;
  }
  return out;
}

/** Decimate to ANALYSIS_FPS and normalize to the 95th percentile so one transient doesn't crush the rest. */
export function envelopeAtAnalysisFps(samples: Float32Array, sr: number): Float32Array {
  const out = envelopeAtAnalysisFpsRaw(samples, sr);
  const sorted = Array.from(out).toSorted((a, b) => a - b);
  const ref = sorted[Math.floor(sorted.length * 0.95)] ?? sorted[sorted.length - 1] ?? 1;
  const norm = ref > 1e-6 ? 1 / ref : 1;
  for (let i = 0; i < out.length; i++) out[i] = Math.min(1, out[i]! * norm);
  return out;
}

/** Median of per-window p95 amplitudes across the middle 80% of the envelope. Robust to intro/outro. */
function medianWindowedP95(env: Float32Array, windows = 4): number {
  if (env.length === 0) return 0;
  const start = Math.floor(env.length * 0.1);
  const end = Math.floor(env.length * 0.9);
  const middleLen = Math.max(1, end - start);
  const wLen = Math.max(1, Math.floor(middleLen / Math.max(1, windows)));
  const p95s: number[] = [];
  for (let w = 0; w < windows; w++) {
    const wStart = start + w * wLen;
    const wEnd = Math.min(end, wStart + wLen);
    if (wEnd - wStart < 4) continue;
    const slice = Array.from(env.subarray(wStart, wEnd)).toSorted((a, b) => a - b);
    const p95 = slice[Math.floor(slice.length * 0.95)] ?? 0;
    p95s.push(p95);
  }
  if (p95s.length === 0) return 0;
  p95s.sort((a, b) => a - b);
  return p95s[Math.floor(p95s.length / 2)] ?? 0;
}

/** Autocorrelation-based BPM estimator using the low-band envelope. Returns { bpm, confidence }. */
function estimateBpm(envLow: Float32Array): { bpm: number; confidence: number } {
  const minBpm = 60;
  const maxBpm = 200;
  const minLag = Math.round(ANALYSIS_FPS * 60 / maxBpm);
  const maxLag = Math.round(ANALYSIS_FPS * 60 / minBpm);

  let mean = 0;
  for (let i = 0; i < envLow.length; i++) mean += envLow[i]!;
  mean /= envLow.length;
  const centered = new Float32Array(envLow.length);
  for (let i = 0; i < envLow.length; i++) centered[i] = envLow[i]! - mean;

  let bestLag = minLag;
  let bestScore = -Infinity;
  let zeroLagScore = 0;
  for (let i = 0; i < centered.length; i++) zeroLagScore += centered[i]! * centered[i]!;

  for (let lag = minLag; lag <= maxLag; lag++) {
    let score = 0;
    for (let i = 0; i < centered.length - lag; i++) {
      score += centered[i]! * centered[i + lag]!;
    }
    if (score > bestScore) {
      bestScore = score;
      bestLag = lag;
    }
  }
  const bpm = (ANALYSIS_FPS * 60) / bestLag;
  const confidence = zeroLagScore > 0 ? Math.max(0, Math.min(1, bestScore / zeroLagScore)) : 0;
  return { bpm: Math.round(bpm), confidence };
}

/**
 * Solve for sensitivity that lands the adaptive threshold (mean*sens + 0.5*std + 0.02)
 * at the energy percentile that produces the target trigger rate.
 */
function proposeSensitivity(env: Float32Array, targetRatePerSec: number) {
  if (env.length === 0) return { sens: 1.0, achievedRate: 0 };
  const sorted = Float32Array.from(env);
  sorted.sort();
  const ratio = Math.max(0.01, Math.min(0.5, targetRatePerSec / ANALYSIS_FPS));
  const targetPercentileIdx = Math.floor((1 - ratio) * (sorted.length - 1));
  const targetThreshold = sorted[targetPercentileIdx]!;
  let mean = 0;
  for (let i = 0; i < env.length; i++) mean += env[i]!;
  mean /= env.length;
  let varSum = 0;
  for (let i = 0; i < env.length; i++) {
    const d = env[i]! - mean;
    varSum += d * d;
  }
  const std = Math.sqrt(varSum / env.length);
  const proposed = (targetThreshold - 0.5 * std - 0.02) / Math.max(1e-4, mean);
  const sens = Math.max(0.5, Math.min(10, proposed));
  const effectiveThreshold = mean * sens + 0.5 * std + 0.02;
  let hits = 0;
  let cooldown = 0;
  const hold = 10;
  for (let i = 0; i < env.length; i++) {
    if (cooldown > 0) {
      cooldown--;
      continue;
    }
    if (env[i]! > effectiveThreshold) {
      hits++;
      cooldown = hold;
    }
  }
  const durationSec = env.length / ANALYSIS_FPS;
  return { sens, achievedRate: durationSec > 0 ? hits / durationSec : 0 };
}

export async function analyzeTrack(
  buffer: AudioBuffer,
  opts: { lowCrossoverHz: number; highCrossoverHz: number },
): Promise<AnalyzeTrackResult> {
  const sr = buffer.sampleRate;
  const mono = mixToMono(buffer);
  const durationSec = buffer.length / sr;

  // Pass 1 — true-peak gain calibration. Target peak = −1 dBFS ⇒ |x|max ≈ 0.891.
  let sourcePeak = 0;
  for (let i = 0; i < mono.length; i++) {
    const a = Math.abs(mono[i]!);
    if (a > sourcePeak) sourcePeak = a;
  }
  const TARGET_PEAK = Math.pow(10, -1 / 20); // ~0.8913
  const inputGain = sourcePeak > 1e-6
    ? Math.max(0.1, Math.min(20, TARGET_PEAK / sourcePeak))
    : 1.0;

  const lowFc = Math.max(40, Math.min(opts.lowCrossoverHz, sr * 0.4));
  const highFc = Math.max(lowFc + 80, Math.min(opts.highCrossoverHz, sr * 0.45));
  const midCenter = Math.sqrt(lowFc * highFc);

  const lowFiltered = applyBiquad(mono, biquadCoeffs("lp", sr, lowFc, Math.SQRT1_2));
  const midFiltered = applyBiquad(mono, biquadCoeffs("bp", sr, midCenter, 1.0));
  const highFiltered = applyBiquad(mono, biquadCoeffs("hp", sr, highFc, Math.SQRT1_2));

  // Raw envelopes preserve absolute amplitudes (for the multiplier solver).
  const rawEnvLow = envelopeAtAnalysisFpsRaw(lowFiltered, sr);
  // Normalized envelopes feed BPM autocorr and percentile-based sensitivity (amplitude-agnostic).
  const envLow = envelopeAtAnalysisFps(lowFiltered, sr);
  const envMid = envelopeAtAnalysisFps(midFiltered, sr);
  const envHigh = envelopeAtAnalysisFps(highFiltered, sr);

  // Trim the first/last 10% before BPM + sensitivity analysis — intros/outros are often unrepresentative.
  const trimStart = Math.floor(envLow.length * 0.1);
  const trimEnd = Math.max(trimStart + 60, Math.floor(envLow.length * 0.9));
  const envLowTrim = envLow.subarray(trimStart, trimEnd);
  const envMidTrim = envMid.subarray(trimStart, trimEnd);
  const envHighTrim = envHigh.subarray(trimStart, trimEnd);

  const { bpm, confidence } = estimateBpm(envLowTrim);
  const beatsPerSec = bpm / 60;
  const lowProp = proposeSensitivity(envLowTrim, beatsPerSec);
  const midProp = proposeSensitivity(envMidTrim, beatsPerSec * 0.75);
  const highProp = proposeSensitivity(envHighTrim, beatsPerSec * 1.5);

  // Multiplier solver: median across 4 windows of per-window low-band p95 (raw amplitude).
  // Median-of-windows ignores intros/breakdowns/outros, which would otherwise pull the multiplier off.
  const typicalLowP95 = medianWindowedP95(rawEnvLow, 4);
  const postGainLowP95 = typicalLowP95 * inputGain;
  const inputMultiplier = postGainLowP95 > 1e-3
    ? Math.max(0.1, Math.min(5.0, 0.75 / postGainLowP95))
    : 1.0;

  // Heuristic: if the low band is dominated by sustained energy, suggest a narrower kick crossover.
  let suggestedLow: number | undefined;
  let sustained = 0;
  for (let i = 0; i < envLowTrim.length; i++) if (envLowTrim[i]! > 0.4) sustained++;
  const sustainRatio = envLowTrim.length > 0 ? sustained / envLowTrim.length : 0;
  if (sustainRatio > 0.35 && opts.lowCrossoverHz > 150) {
    suggestedLow = 140;
  }

  return {
    bpm,
    bpmConfidence: confidence,
    lowSensitivity: lowProp.sens,
    midSensitivity: midProp.sens,
    highSensitivity: highProp.sens,
    estimatedRate: { low: lowProp.achievedRate, mid: midProp.achievedRate, high: highProp.achievedRate },
    suggestedLowCrossoverHz: suggestedLow,
    inputGain: Number(inputGain.toFixed(2)),
    inputMultiplier: Number(inputMultiplier.toFixed(2)),
    sourcePeak,
    durationSec,
  };
}
