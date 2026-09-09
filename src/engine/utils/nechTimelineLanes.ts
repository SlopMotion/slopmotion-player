import { ANALYSIS_FPS } from "./analyzeTrack";
import type { TrackTimelineAnalysis } from "./analyzeTrackTimeline";
import type { NechSpectrumResult } from "./nechAudioApi";
import {
  NECH_TRIGGER_CATALOG,
  type NechTriggerBand,
} from "./nechTriggerBands";

export type StudioNechLane = {
  kind: "nech";
  nechBand: NechTriggerBand;
  label: string;
  shortLabel: string;
  color: string;
  times: number[];
  /** Wider marks for dense level-derived crossings. */
  levelDerived?: boolean;
};

/** Timeline rows — onset is a trigger source only, not its own lane. */
export const NECH_TIMELINE_LANE_BANDS = NECH_TRIGGER_CATALOG.filter(
  (entry) =>
    entry.band !== "nech:onset" &&
    entry.band !== "nech:valence" &&
    entry.band !== "nech:arousal" &&
    (entry.kind === "pulse" ||
      entry.band === "nech:rms" ||
      entry.band === "nech:specLow" ||
      entry.band === "nech:specMid" ||
      entry.band === "nech:specHigh"),
);

const LEVEL_LANE_BANDS = new Set<NechTriggerBand>([
  "nech:rms",
  "nech:specLow",
  "nech:specMid",
  "nech:specHigh",
]);

export function hasNechTimelineAnalysis(
  timeline: TrackTimelineAnalysis | null,
  nechTimelineApplied = false,
): boolean {
  if (!timeline) return false;
  return (
    nechTimelineApplied ||
    timeline.source === "nech" ||
    !!timeline.nechMeta ||
    !!timeline.nechEnvelopes ||
    !!timeline.nechLaneEvents
  );
}

export function beatGridTimes(tempo: number, durationSec: number): number[] {
  if (!Number.isFinite(tempo) || tempo <= 0 || durationSec <= 0) return [];
  const beatSec = 60 / tempo;
  const out: number[] = [];
  for (let t = beatSec; t < durationSec - 0.02; t += beatSec) {
    out.push(t);
  }
  return out;
}

export function estimateTempoFromOnsets(onsets: number[]): number | undefined {
  if (onsets.length < 8) return undefined;
  const intervals: number[] = [];
  for (let i = 1; i < onsets.length; i++) {
    const dt = onsets[i]! - onsets[i - 1]!;
    if (dt >= 0.22 && dt <= 1.4) intervals.push(dt);
  }
  if (intervals.length < 4) return undefined;
  intervals.sort((a, b) => a - b);
  const median = intervals[Math.floor(intervals.length / 2)]!;
  if (!median) return undefined;
  let bpm = 60 / median;
  while (bpm < 72) bpm *= 2;
  while (bpm > 176) bpm /= 2;
  return Math.round(bpm);
}

function transposeMatrix(matrix: number[][]): number[][] {
  const rows = matrix.length;
  const cols = matrix[0]?.length ?? 0;
  const out: number[][] = [];
  for (let c = 0; c < cols; c++) {
    const row: number[] = [];
    for (let r = 0; r < rows; r++) row.push(matrix[r]![c] ?? 0);
    out.push(row);
  }
  return out;
}

/** Spectrum API may return frames×bands or bands×frames — normalize to frames×bands. */
export function flattenSpectrumFrames(spectrum: NechSpectrumResult): number[][] {
  const raw = spectrum.data;
  if (!raw) return [];

  let rows: number[][];
  if (Array.isArray(raw[0])) {
    rows = raw as number[][];
  } else {
    const bands = spectrum.bands ?? 64;
    const frames = spectrum.frames ?? Math.floor((raw as number[]).length / bands);
    const flat = raw as number[];
    rows = [];
    for (let f = 0; f < frames; f++) {
      rows.push(flat.slice(f * bands, (f + 1) * bands));
    }
  }

  const frameCount = spectrum.frames ?? rows.length;
  const bandCount = spectrum.bands ?? rows[0]?.length ?? 0;
  if (bandCount > 0 && rows.length === bandCount && rows[0]!.length === frameCount) {
    return transposeMatrix(rows);
  }
  return rows;
}

export function spectrumFrameAt(
  frames: number[][],
  tSec: number,
  durationSec: number,
): number[] | null {
  if (!frames.length || durationSec <= 0) return null;
  const idx = Math.min(
    frames.length - 1,
    Math.max(0, Math.floor((tSec / durationSec) * frames.length)),
  );
  return frames[idx] ?? null;
}

function bandEnergies(row: number[]): { low: number; mid: number; high: number } {
  const n = row.length;
  if (!n) return { low: 0, mid: 0, high: 0 };
  const iLow = Math.max(1, Math.floor(n / 3));
  const iHigh = Math.max(iLow + 1, Math.floor((2 * n) / 3));
  let sumL = 0;
  let sumM = 0;
  let sumH = 0;
  for (let i = 0; i < iLow; i++) sumL += row[i] ?? 0;
  for (let i = iLow; i < iHigh; i++) sumM += row[i] ?? 0;
  for (let i = iHigh; i < n; i++) sumH += row[i] ?? 0;
  return {
    low: sumL / iLow,
    mid: sumM / Math.max(1, iHigh - iLow),
    high: sumH / Math.max(1, n - iHigh),
  };
}

/** Route each API onset to the dominant spectrum band at that instant. */
export function classifyOnsetsBySpectrum(
  onsets: number[],
  spectrumFrames: number[][],
  durationSec: number,
): { low: number[]; mid: number[]; high: number[] } {
  const low: number[] = [];
  const mid: number[] = [];
  const high: number[] = [];
  for (const t of onsets) {
    const row = spectrumFrameAt(spectrumFrames, t, durationSec);
    if (!row?.length) {
      low.push(t);
      continue;
    }
    const e = bandEnergies(row);
    const peak = Math.max(e.low, e.mid, e.high);
    if (peak <= 0) {
      low.push(t);
      continue;
    }
    if (e.low >= e.mid && e.low >= e.high) low.push(t);
    else if (e.mid >= e.high) mid.push(t);
    else high.push(t);
  }
  return { low, mid, high };
}

export function normalizeEnvelopeInPlace(env: Float32Array): void {
  let max = 0;
  for (let i = 0; i < env.length; i++) max = Math.max(max, env[i] ?? 0);
  if (max <= 1e-9) return;
  for (let i = 0; i < env.length; i++) env[i] = (env[i] ?? 0) / max;
}

export function buildSpectrumBandEnvelopes(
  spectrum: NechSpectrumResult,
  frameCount: number,
): { low: Float32Array; mid: Float32Array; high: Float32Array } {
  const frames = flattenSpectrumFrames(spectrum);
  const low = new Float32Array(frameCount);
  const mid = new Float32Array(frameCount);
  const high = new Float32Array(frameCount);
  if (!frames.length) return { low, mid, high };

  for (let f = 0; f < frameCount; f++) {
    const row = frames[Math.min(frames.length - 1, Math.floor((f / frameCount) * frames.length))]!;
    const e = bandEnergies(row);
    low[f] = e.low;
    mid[f] = e.mid;
    high[f] = e.high;
  }
  normalizeEnvelopeInPlace(low);
  normalizeEnvelopeInPlace(mid);
  normalizeEnvelopeInPlace(high);
  return { low, mid, high };
}

export function adaptiveEnvelopeThreshold(env: ArrayLike<number>): number {
  let sum = 0;
  const n = env.length;
  for (let i = 0; i < n; i++) sum += env[i] ?? 0;
  const mean = n ? sum / n : 0.35;
  return Math.min(0.85, Math.max(0.22, mean * 1.25));
}

export function collectRisingEnvelopeEvents(
  env: ArrayLike<number>,
  threshold?: number,
): number[] {
  if (!env.length) return [];
  const thr = threshold ?? adaptiveEnvelopeThreshold(env);
  const out: number[] = [];
  for (let f = 1; f < env.length; f++) {
    const prev = env[f - 1] ?? 0;
    const cur = env[f] ?? 0;
    if (cur >= thr && prev < thr) {
      out.push(f / ANALYSIS_FPS);
    }
  }
  return out;
}

export function collectLocalPeakEvents(
  env: ArrayLike<number>,
  minGapFrames = 4,
): number[] {
  if (env.length < 3) return [];
  const out: number[] = [];
  let lastFrame = -minGapFrames;
  for (let f = 1; f < env.length - 1; f++) {
    const prev = env[f - 1] ?? 0;
    const cur = env[f] ?? 0;
    const next = env[f + 1] ?? 0;
    if (cur <= 0 || cur < prev || cur < next) continue;
    if (f - lastFrame < minGapFrames) {
      if (cur > (env[lastFrame] ?? 0)) {
        out[out.length - 1] = f / ANALYSIS_FPS;
        lastFrame = f;
      }
      continue;
    }
    out.push(f / ANALYSIS_FPS);
    lastFrame = f;
  }
  return out;
}

export function nechLaneEventTimes(
  timeline: TrackTimelineAnalysis,
  band: NechTriggerBand,
): number[] {
  const stored = timeline.nechLaneEvents?.[band];
  if (stored?.length) return stored;

  switch (band) {
    case "nech:kick":
      return timeline.events.kick;
    case "nech:low":
      return timeline.events.low;
    case "nech:mid":
      return timeline.events.bass;
    case "nech:high":
      return timeline.events.high;
    case "nech:beat": {
      const tempo =
        timeline.nechMeta?.tempo ??
        estimateTempoFromOnsets(timeline.events.kick);
      return tempo ? beatGridTimes(tempo, timeline.durationSec) : [];
    }
    case "nech:rms":
      return timeline.nechEnvelopes?.rms
        ? collectLocalPeakEvents(timeline.nechEnvelopes.rms)
        : [];
    case "nech:specLow":
      return timeline.nechEnvelopes?.low
        ? collectRisingEnvelopeEvents(timeline.nechEnvelopes.low)
        : [];
    case "nech:specMid":
      return timeline.nechEnvelopes?.mid
        ? collectRisingEnvelopeEvents(timeline.nechEnvelopes.mid)
        : [];
    case "nech:specHigh":
      return timeline.nechEnvelopes?.high
        ? collectRisingEnvelopeEvents(timeline.nechEnvelopes.high)
        : [];
    default:
      return [];
  }
}

export function buildNechTimelineLanes(
  timeline: TrackTimelineAnalysis,
  startSec = 0,
  endSec = timeline.durationSec,
  hiddenBands: ReadonlySet<NechTriggerBand> = new Set(),
): StudioNechLane[] {
  return NECH_TIMELINE_LANE_BANDS.filter((entry) => !hiddenBands.has(entry.band)).map(
    (entry) => ({
      kind: "nech" as const,
      nechBand: entry.band,
      label: entry.label,
      shortLabel: entry.short,
      color: entry.color,
      levelDerived: LEVEL_LANE_BANDS.has(entry.band),
      times: nechLaneEventTimes(timeline, entry.band).filter(
        (t) => t >= startSec && t < endSec,
      ),
    }),
  );
}

export function nechLaneEventCounts(
  timeline: TrackTimelineAnalysis | null,
  startSec = 0,
  endSec?: number,
): Partial<Record<NechTriggerBand, number>> {
  if (!timeline) return {};
  const end = endSec ?? timeline.durationSec;
  const out: Partial<Record<NechTriggerBand, number>> = {};
  for (const entry of NECH_TIMELINE_LANE_BANDS) {
    out[entry.band] = nechLaneEventTimes(timeline, entry.band).filter(
      (t) => t >= startSec && t < end,
    ).length;
  }
  return out;
}