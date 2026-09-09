import type { TriggerEaseOutShape } from "../types/settings";

export const DEFAULT_EASE_OUT_SHAPE: TriggerEaseOutShape = "smooth";

/** Matches HydraCanvas `easeInOutCubic` for pulse envelope preview. */
export function easeInOutCubic(t: number): number {
  return t <= 0 ? 0 : t >= 1 ? 1 : t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Envelope value during timed release: u = 0…1 through the release window. */
export function easeReleaseRemaining(shape: TriggerEaseOutShape, u: number): number {
  const t = Math.max(0, Math.min(1, u));
  switch (shape) {
    case "linear":
      return 1 - t;
    case "quad":
      return (1 - t) * (1 - t);
    case "cubic":
      return Math.pow(1 - t, 3);
    case "cosine":
      return Math.cos((Math.PI / 2) * t);
    case "expo":
      return t >= 1 ? 0 : Math.pow(2, -12 * t);
    case "smooth":
    default:
      return 1 - easeInOutCubic(t);
  }
}

function peakEnd(delay: number, attack: number): number {
  return delay + Math.max(0, attack);
}

/**
 * One-shot envelope value at time `t` (seconds) from pulse fire.
 */
export function triggerEnvelopeAt(
  t: number,
  delay: number,
  attack: number,
  hold: number,
  release: number,
  decay: number,
  easeShape: TriggerEaseOutShape = DEFAULT_EASE_OUT_SHAPE
): number {
  if (t < delay) return 0;

  const tPeak = peakEnd(delay, attack);
  const tHoldEnd = tPeak + Math.max(0, hold);

  if (attack > 0) {
    if (t < tPeak) {
      return easeInOutCubic((t - delay) / attack);
    }
  } else {
    if (t < delay) return 0;
  }

  if (t < tHoldEnd) {
    return 1;
  }

  const tRel = t - tHoldEnd;
  if (release > 0) {
    if (tRel < release) {
      return easeReleaseRemaining(easeShape, tRel / release);
    }
    return 0;
  }

  return Math.max(0, 1 - decay * tRel);
}

export function triggerEnvelopeDuration(
  delay: number,
  attack: number,
  hold: number,
  release: number,
  decay: number
): number {
  const d = Math.max(0, decay);
  const tail = release > 0 ? release : 1 / Math.max(d, 0.05);
  return Math.max(0.08, delay + attack + hold + tail) * 1.05;
}

export function sampleTriggerEnvelope(
  delay: number,
  attack: number,
  hold: number,
  release: number,
  decay: number,
  easeShape: TriggerEaseOutShape,
  pointCount = 180
): { tMax: number; values: Float32Array } {
  const tMax = triggerEnvelopeDuration(delay, attack, hold, release, decay);
  const values = new Float32Array(pointCount * 2);
  for (let i = 0; i < pointCount; i++) {
    const tt = (i / (pointCount - 1)) * tMax;
    values[i * 2] = tt / tMax;
    values[i * 2 + 1] = triggerEnvelopeAt(tt, delay, attack, hold, release, decay, easeShape);
  }
  return { tMax, values };
}
