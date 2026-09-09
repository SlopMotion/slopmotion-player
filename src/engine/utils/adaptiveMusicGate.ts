/** Inputs for deciding whether adaptive normalization should track current audio. */
export type AdaptiveMusicGateInput = {
  inputDbfs: number;
  inputPeakDbfs?: number;
  rawLow: number;
  rawMid: number;
  rawHigh: number;
  masterLevel?: number;
};

function bandMeanVariance(values: Float32Array, count: number) {
  let sum = 0;
  for (let i = 0; i < count; i++) sum += values[i]!;
  const mean = sum / count;
  let varSum = 0;
  for (let i = 0; i < count; i++) {
    const d = values[i]! - mean;
    varSum += d * d;
  }
  return { mean, variance: varSum / count };
}

function coefficientOfVariation(mean: number, variance: number) {
  if (mean < 0.008) return 1;
  return Math.sqrt(variance) / mean;
}

function bandTotal(input: AdaptiveMusicGateInput) {
  return input.rawLow + input.rawMid + input.rawHigh;
}

function crestDb(input: AdaptiveMusicGateInput) {
  return input.inputPeakDbfs != null && Number.isFinite(input.inputPeakDbfs)
    ? input.inputPeakDbfs - input.inputDbfs
    : 99;
}

/** RMS below this → all band triggers and the beat clock are suppressed. */
export const TRIGGER_SILENCE_DBFS = -40;

/**
 * Ambient fan/HVAC may still match above the silence floor when the spectrum
 * is a steady low rumble (restaurant vent, etc.).
 */
export const AMBIENT_CEILING_DBFS = -36;

/** Hard silence floor from post-gain RMS — ignores FFT noise and smoothed master lag. */
export function isBelowTriggerSilenceFloor(input: AdaptiveMusicGateInput): boolean {
  return input.inputDbfs < TRIGGER_SILENCE_DBFS;
}

/** 0 below the trigger silence floor; fades in over the next 8 dB for the spectrum envelope. */
export function spectrumVisualGain(inputDbfs: number): number {
  if (!Number.isFinite(inputDbfs) || inputDbfs < TRIGGER_SILENCE_DBFS) return 0;
  const fadeEnd = TRIGGER_SILENCE_DBFS + 8;
  if (inputDbfs >= fadeEnd) return 1;
  return (inputDbfs - TRIGGER_SILENCE_DBFS) / (fadeEnd - TRIGGER_SILENCE_DBFS);
}

/**
 * Flat HVAC / vent spectrum without needing temporal CV — blocks pure loudness
 * unlocks so a loud restaurant fan cannot become Track via RMS alone.
 * (No absolute mid cap: FFT band overlap can inflate mid while still sounding like rumble.)
 */
function isFlatLowRumble(input: AdaptiveMusicGateInput): boolean {
  const total = bandTotal(input);
  if (total < 0.03) return false;
  const lowShare = input.rawLow / total;
  return lowShare > 0.55 && input.rawHigh < 0.055 && crestDb(input) < 8;
}

/** Mid/high body or transient crest — distinguishes music from steady rumble. */
function hasMusicBody(input: AdaptiveMusicGateInput): boolean {
  return input.rawMid > 0.04 || input.rawHigh > 0.03 || crestDb(input) > 8;
}

/**
 * Steady HVAC / fan profile — quiet through moderately loud room levels.
 * Higher lowShare + low crest separates vents from bass-forward program near −37
 * (which has more crest and/or a less low-dominated spectrum).
 */
export function isSteadyAmbientNoise(input: AdaptiveMusicGateInput, lowCv: number, midCv: number): boolean {
  if (input.inputDbfs > AMBIENT_CEILING_DBFS) return false;

  const total = bandTotal(input);
  if (total < 0.03) return false;

  const lowShare = input.rawLow / total;

  return (
    input.inputDbfs > -58 &&
    lowShare > 0.55 &&
    input.rawHigh < 0.055 &&
    lowCv < 0.11 &&
    midCv < 0.14 &&
    crestDb(input) < 7
  );
}

/**
 * Speech-like: mid-dominant, weak bass, modest total energy. Vocals over a real
 * beat keep strong low/high, so this stays false for music with singing.
 */
export function isVoiceLike(input: AdaptiveMusicGateInput): boolean {
  const total = bandTotal(input);
  return (
    input.rawMid > 0.065 &&
    input.rawMid > input.rawLow * 1.65 &&
    input.rawLow < 0.14 &&
    total < 0.35
  );
}

/**
 * Room-mic friendly program detection — permissive for loud input, stricter for quiet.
 */
export function isMusicLikelyForAdaptiveNorm(input: AdaptiveMusicGateInput): boolean {
  const total = bandTotal(input);
  const master = input.masterLevel ?? 0;

  // RMS silence — never treat as program (FFT byte noise can still look "peaky").
  if (input.inputDbfs < TRIGGER_SILENCE_DBFS) return false;
  if (input.inputDbfs < -54 && master < 0.06) return false;
  if (total < 0.03) return false;

  if (isVoiceLike(input)) return false;
  if (isFlatLowRumble(input)) return false;

  const crest = crestDb(input);
  const body = hasMusicBody(input);

  // Quiet-but-audible program (common with low gain / room mic just under −35 sweet zone).
  // Require mid/high or crest so steady vent energy above −46 does not unlock Track.
  if (input.inputDbfs > -46 && total > 0.045 && body) return true;
  if (input.inputDbfs > -42 && total > 0.05 && body) return true;

  // Crest alone is not enough when the room is quiet — avoids mic noise false positives.
  if (crest > 8 && total > 0.04 && input.inputDbfs > TRIGGER_SILENCE_DBFS) return true;
  if (total > 0.1 && (input.rawMid > 0.03 || input.rawHigh > 0.025) && body) return true;

  return input.inputDbfs > -46 && input.rawLow > 0.07 && total > 0.08 && body;
}

/** Loud enough that triggers should run even if spectral heuristics are uncertain. */
export function isLiveProgramLevel(input: AdaptiveMusicGateInput): boolean {
  const total = bandTotal(input);
  if (isFlatLowRumble(input)) return false;
  if (!hasMusicBody(input)) return false;
  // Room/line levels just under the VU sweet zone (−35) still count as program.
  if (input.inputDbfs > -46 && total > 0.04) return true;
  return input.inputDbfs > -43 && total > 0.045;
}

export type ProgramMaterialState = {
  /** Triggers may fire — music or recent hold after music. */
  programActive: boolean;
  /** Adaptive normalization may track levels. */
  adaptActive: boolean;
  /** Steady fan/HVAC-like noise detected this frame. */
  ambientNoise: boolean;
};

/**
 * Stateful gate: suppresses triggers for steady ambient noise (fan/HVAC),
 * including moderately loud room vents. Loud music-like program from a room
 * mic still passes. Program state is sticky across brief RMS dips so UI labels
 * and FX triggers don't chatter near the floor.
 */
export class ProgramMaterialGate {
  private lowRing = new Float32Array(90);
  private midRing = new Float32Array(90);
  private idx = 0;
  private filled = false;
  private programHoldUntilMs = 0;
  private ambientHoldUntilMs = 0;
  /** First frame we saw continuous silence — 0 when above the floor. */
  private silenceSinceMs = 0;

  assess(input: AdaptiveMusicGateInput, nowMs: number): ProgramMaterialState {
    this.lowRing[this.idx] = input.rawLow;
    this.midRing[this.idx] = input.rawMid;
    this.idx++;
    if (this.idx >= this.lowRing.length) {
      this.idx = 0;
      this.filled = true;
    }

    const count = this.filled ? this.lowRing.length : Math.max(1, this.idx);
    const lowStats = bandMeanVariance(this.lowRing, count);
    const midStats = bandMeanVariance(this.midRing, count);
    const lowCv = coefficientOfVariation(lowStats.mean, lowStats.variance);
    const midCv = coefficientOfVariation(midStats.mean, midStats.variance);

    const quietAmbient = isSteadyAmbientNoise(input, lowCv, midCv);
    const silence = isBelowTriggerSilenceFloor(input);
    if (silence) {
      if (this.silenceSinceMs <= 0) this.silenceSinceMs = nowMs;
      // Brief dips around the −40 floor (quiet room / low gain) must not drop Track.
      if (nowMs - this.silenceSinceMs >= 700) this.programHoldUntilMs = 0;
    } else {
      this.silenceSinceMs = 0;
    }
    const sustainedSilence =
      silence && this.silenceSinceMs > 0 && nowMs - this.silenceSinceMs >= 700;
    // Windowed voice region: mid-dominant over the recent window catches whole
    // spoken passages (including each syllable's low-band onset transient).
    const windowVoice =
      midStats.mean > 0.05 && midStats.mean > lowStats.mean * 1.4 && lowStats.mean < 0.12;
    const voice = isVoiceLike(input) || windowVoice;
    const musicFrame = isMusicLikelyForAdaptiveNorm(input);
    const liveProgram = isLiveProgramLevel(input) && !voice;
    const programHint = (musicFrame || liveProgram) && !voice;

    if (programHint) {
      this.programHoldUntilMs = nowMs + 3200;
      this.ambientHoldUntilMs = 0;
    }
    if (quietAmbient) {
      this.ambientHoldUntilMs = nowMs + 2000;
      this.programHoldUntilMs = 0;
    }

    const ambientBlocking =
      quietAmbient ||
      (nowMs < this.ambientHoldUntilMs && !liveProgram && input.inputDbfs < AMBIENT_CEILING_DBFS + 2);

    const programActive =
      !sustainedSilence &&
      (programHint || nowMs < this.programHoldUntilMs) &&
      !ambientBlocking;

    return {
      programActive,
      adaptActive: programActive,
      ambientNoise: quietAmbient,
    };
  }

  reset() {
    this.lowRing.fill(0);
    this.midRing.fill(0);
    this.idx = 0;
    this.filled = false;
    this.programHoldUntilMs = 0;
    this.ambientHoldUntilMs = 0;
    this.silenceSinceMs = 0;
  }
}
