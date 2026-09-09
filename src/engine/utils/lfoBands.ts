import type { LfoBand, LfoWaveform } from "../types/settings";

export const LFO_WAVEFORMS: readonly LfoWaveform[] = ["sin", "cos", "tri", "saw", "square"];

/** One full LFO sweep spans this many quarter-note beats (4 bars @ 4/4). */
export const LFO_LOOP_BEATS = 16;

const LFO_LABEL: Record<LfoWaveform, string> = {
  sin: "Sine",
  cos: "Cosine",
  tri: "Triangle",
  saw: "Saw",
  square: "Square",
};

const LFO_SHORT: Record<LfoWaveform, string> = {
  sin: "SI",
  cos: "CO",
  tri: "TR",
  saw: "SA",
  square: "SQ",
};

export function isLegacyLfoBand(band: string): band is LfoBand {
  return lfoWaveformFromBand(band) != null;
}

/** @deprecated Prefer `isLegacyLfoBand` — true only for `lfo:sin`…`lfo:square`, not `lfo:1`…`lfo:8`. */
export function isLfoBand(band: string): band is LfoBand {
  return isLegacyLfoBand(band);
}

export function lfoWaveformFromBand(band: string): LfoWaveform | null {
  if (!band.startsWith("lfo:")) return null;
  const w = band.slice(4) as LfoWaveform;
  return LFO_WAVEFORMS.includes(w) ? w : null;
}

export function lfoBandLabel(band: string): string {
  const w = lfoWaveformFromBand(band);
  return w ? LFO_LABEL[w] : band;
}

export function lfoBandShort(band: string): string {
  const w = lfoWaveformFromBand(band);
  return w ? LFO_SHORT[w] : "LF";
}

export function lfoBandSortKey(band: LfoBand): number {
  const w = lfoWaveformFromBand(band);
  if (!w) return 8;
  return 6 + LFO_WAVEFORMS.indexOf(w) * 0.1;
}
