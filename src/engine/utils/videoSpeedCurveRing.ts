import { LOOP_WALL_CLOCK_MAX_SEC } from "./videoUtils";

/** Wall-clock span shown in the Video Speed trace (matches Veo loop length). */
export const VIDEO_SPEED_CURVE_HISTORY_MS = LOOP_WALL_CLOCK_MAX_SEC * 1000;

/** Upper bound on stored samples (120 Hz display / 8-frame cadence × 8 s). */
const CAPACITY = 120;

const EMPTY_SAMPLES = new Float32Array(0);

/** Grows with ring length; reused across reads — synchronous use only. */
let readScratch = new Float32Array(CAPACITY);

export type VideoSpeedCurveRing = {
  capacity: number;
  times: Float32Array;
  data: Float32Array;
  /** Next write index. */
  w: number;
  /** Number of valid samples (capped at capacity). */
  len: number;
};

/** Clears telemetry samples (helps trim retained floats when idle). */
export function clearVideoSpeedCurveRing(): void {
  const win = typeof window !== "undefined" ? (window as unknown as { __hydraVideoSpeedRing?: VideoSpeedCurveRing }) : null;
  if (!win?.__hydraVideoSpeedRing) return;
  const r = win.__hydraVideoSpeedRing;
  r.w = 0;
  r.len = 0;
}

export function pushVideoSpeedCurveSample(speed: number): void {
  const win = typeof window !== "undefined" ? (window as unknown as { __hydraVideoSpeedRing?: VideoSpeedCurveRing }) : null;
  if (!win) return;
  let r = win.__hydraVideoSpeedRing;
  if (!r || r.capacity !== CAPACITY || !r.times) {
    r = {
      capacity: CAPACITY,
      times: new Float32Array(CAPACITY),
      data: new Float32Array(CAPACITY),
      w: 0,
      len: 0,
    };
    win.__hydraVideoSpeedRing = r;
  }
  const now = performance.now();
  r.times[r.w] = now;
  r.data[r.w] = Number.isFinite(speed) ? speed : 1;
  r.w = (r.w + 1) % CAPACITY;
  if (r.len < CAPACITY) r.len++;
}

/** Latest playback speed sample, or null if no recent telemetry. */
export function readVideoSpeedCurveLatest(): number | null {
  const samples = readVideoSpeedCurveSamples();
  if (samples.length === 0) return null;
  const last = samples[samples.length - 1]!;
  return Number.isFinite(last) ? last : null;
}

/** Oldest → newest chronological samples for drawing. Length ≤ samples in last 8 s. Reuses internal buffer — consume before next read. */
export function readVideoSpeedCurveSamples(): Float32Array {
  const win = typeof window !== "undefined" ? (window as unknown as { __hydraVideoSpeedRing?: VideoSpeedCurveRing }) : null;
  const r = win?.__hydraVideoSpeedRing;
  if (!r || r.len === 0 || !r.times) return EMPTY_SAMPLES;

  const cutoff = performance.now() - VIDEO_SPEED_CURVE_HISTORY_MS;
  if (readScratch.length < r.len) {
    readScratch = new Float32Array(Math.max(r.len, CAPACITY));
  }

  const oldest = r.len < r.capacity ? 0 : r.w;
  let outLen = 0;
  for (let k = 0; k < r.len; k++) {
    const idx = (oldest + k) % r.capacity;
    if (r.times[idx]! >= cutoff) {
      readScratch[outLen++] = r.data[idx]!;
    }
  }
  return outLen === 0 ? EMPTY_SAMPLES : readScratch.subarray(0, outLen);
}
