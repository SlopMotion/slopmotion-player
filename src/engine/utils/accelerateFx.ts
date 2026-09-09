import type { OneShotEnvelopeProfile } from "./paramBinding";
import type { TriggerEaseOutShape } from "../types/settings";
import { triggerEnvelopeDuration } from "./triggerEnvelopeCurve";

export const ACCELERATE_DURATION_DEFAULT = 0.5;
export const ACCELERATE_DURATION_MIN = 0.05;
export const ACCELERATE_DURATION_MAX = 1;
export const ACCELERATE_MAX_SPEED_DEFAULT = 2.5;
export const ACCELERATE_HOLD_RATIO = 0.38;
export const ACCELERATE_RELEASE_EASE: TriggerEaseOutShape = "cosine";
export const ACCELERATE_SPEED_SHAPING_EXP = 0.68;

export function clampAccelerateDurationSec(sec: number): number {
  if (!Number.isFinite(sec)) return ACCELERATE_DURATION_DEFAULT;
  return Math.max(ACCELERATE_DURATION_MIN, Math.min(ACCELERATE_DURATION_MAX, sec));
}

export function accelerateEnvelopeFromDuration(durationSec: number): OneShotEnvelopeProfile {
  const total = clampAccelerateDurationSec(durationSec);
  const hold = total * ACCELERATE_HOLD_RATIO;
  const release = Math.max(ACCELERATE_DURATION_MIN, total - hold);
  return {
    attack: 0,
    hold,
    release,
    decay: 20,
    easeShape: ACCELERATE_RELEASE_EASE,
  };
}

export function shapeAccelerateAmount(amount: number): number {
  const a = amount < 0 ? 0 : amount > 1 ? 1 : amount;
  if (a <= 0) return 0;
  if (a >= 1) return 1;
  return Math.pow(a, ACCELERATE_SPEED_SHAPING_EXP);
}

export function acceleratePulseDurationSec(durationSec: number): number {
  const envelope = accelerateEnvelopeFromDuration(durationSec);
  return triggerEnvelopeDuration(
    0,
    envelope.attack,
    envelope.hold,
    envelope.release,
    envelope.decay,
  );
}
