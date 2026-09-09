// Shared band-bin DSP — used by the live analyzer and the offline capture replay
// so both compute identical per-band energies from the same FFT magnitudes.

// Shared band-bin DSP — used by the live analyzer and the offline capture replay
// so both compute identical per-band energies from the same FFT magnitudes.

/** Closed-hat / stick-noise window — above most snare body, below air hiss. */
export const HAT_MIN_HZ = 6000;
export const HAT_MAX_HZ = 12000;

export interface BandBinRanges {
  key: string;
  low: [number, number];
  mid: [number, number];
  high: [number, number];
  /** Sub/low body (~25–120 Hz) — separate from the crossover low band. */
  bass: [number, number];
  /** Formant / vocal presence (~280 Hz–3.6 kHz). */
  vocals: [number, number];
  /** Closed-hat / stick noise (~6–12 kHz). */
  hat: [number, number];
}

/** Blend peak + mean bin energy — less twitchy than raw max on live mics. */
export function energyInBinRange(dataArray: Uint8Array, startBin: number, endBin: number) {
  let sum = 0;
  let peak = 0;
  let count = 0;
  for (let i = startBin; i <= endBin; i++) {
    const v = dataArray[i]!;
    sum += v;
    count++;
    if (v > peak) peak = v;
  }
  if (!count) return 0;
  const mean = sum / count;
  const blended = peak * 0.55 + mean * 0.45;
  return blended / 255;
}

/**
 * Bin index ranges only change when the sample rate, FFT size, or crossover
 * frequencies change — cache them so the per-frame audio loop skips the
 * floor/ceil/divide math and just scans the cached ranges.
 */
export function computeBandBinRanges(
  sr: number,
  binCount: number,
  lowX: number,
  highX: number,
  highTop: number,
): BandBinRanges {
  const nyquist = sr / 2;
  const startBin = (f: number) => Math.max(0, Math.floor((f / nyquist) * binCount));
  const endBin = (f: number) => Math.min(binCount - 1, Math.ceil((f / nyquist) * binCount));
  const bassTop = Math.min(120, lowX * 0.85);
  const vocalLo = Math.max(260, lowX + 40);
  const vocalHi = Math.min(3600, highX + 400);
  const hatLo = Math.min(HAT_MIN_HZ, highTop - 200);
  const hatHi = Math.min(HAT_MAX_HZ, highTop);
  return {
    key: `${sr}|${binCount}|${lowX}|${highX}|${highTop}`,
    low: [startBin(20), endBin(lowX)],
    mid: [startBin(lowX), endBin(highX)],
    high: [startBin(highX), endBin(highTop)],
    bass: [startBin(25), endBin(bassTop)],
    vocals: [startBin(vocalLo), endBin(vocalHi)],
    hat: [startBin(hatLo), endBin(Math.max(hatLo + 50, hatHi))],
  };
}

/** Clamp crossover frequencies exactly as the live analyzer does before binning. */
export function clampBandCrossovers(sr: number, lowCrossoverHz: number, highCrossoverHz: number) {
  const nyquist = sr / 2;
  const minGap = 80;
  let lowX = Math.max(30, lowCrossoverHz);
  let highX = Math.max(lowX + minGap, highCrossoverHz);
  const highTop = Math.min(20000, nyquist * 0.98);
  highX = Math.min(highX, highTop - minGap);
  lowX = Math.min(lowX, highX - minGap);
  return { lowX, highX, highTop };
}

export function clampFftSmoothing(v: number | undefined): number {
  if (typeof v !== "number" || !Number.isFinite(v)) return 0;
  return Math.max(0, Math.min(1, v));
}

const AM_RANGE_MIN_HZ = 20;
const AM_RANGE_MAX_HZ = 20000;
const AM_RANGE_MIN_GAP_HZ = 40;

/** Clamp a custom AM band-pass window (log-friendly defaults for vocal / vibrato). */
export function clampAmHzRange(minHz: number, maxHz: number, sampleRate = 48000) {
  const nyquist = Math.min(AM_RANGE_MAX_HZ, (sampleRate / 2) * 0.98);
  let lo = Math.max(AM_RANGE_MIN_HZ, minHz);
  let hi = Math.max(lo + AM_RANGE_MIN_GAP_HZ, maxHz);
  hi = Math.min(hi, nyquist);
  lo = Math.min(lo, hi - AM_RANGE_MIN_GAP_HZ);
  lo = Math.max(AM_RANGE_MIN_HZ, lo);
  return { minHz: lo, maxHz: hi };
}

export function hzToBinRange(sr: number, binCount: number, minHz: number, maxHz: number): [number, number] {
  const nyquist = sr / 2;
  const { minHz: lo, maxHz: hi } = clampAmHzRange(minHz, maxHz, sr);
  const startBin = Math.max(0, Math.floor((lo / nyquist) * binCount));
  const endBin = Math.min(binCount - 1, Math.ceil((hi / nyquist) * binCount));
  return startBin <= endBin ? [startBin, endBin] : [startBin, startBin];
}

/** Normalized 0–1 energy in an arbitrary Hz window (same weighting as fixed bands). */
export function energyInHzRange(dataArray: Uint8Array, sr: number, minHz: number, maxHz: number) {
  const [startBin, endBin] = hzToBinRange(sr, dataArray.length, minHz, maxHz);
  return energyInBinRange(dataArray, startBin, endBin);
}
