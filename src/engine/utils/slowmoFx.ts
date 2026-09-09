import type { FXConfig } from "../types/settings";
import type { OneShotEnvelopeProfile } from "./paramBinding";
import type { TriggerEaseOutShape } from "../types/settings";
import { getHydraWindow } from "../types/hydraWindow";
import { bindingIsTriggered, paramBindingFromFx } from "./paramBinding";
import { triggerEnvelopeDuration } from "./triggerEnvelopeCurve";

export const SLOWMO_DURATION_DEFAULT = 0.5;
export const SLOWMO_DURATION_MIN = 0.05;
export const SLOWMO_DURATION_MAX = 1;
export const SLOWMO_MOTION_BLUR_DEFAULT = 0.65;
/** Plateau share of the Duration param — remainder eases out (cosine). */
export const SLOWMO_HOLD_RATIO = 0.38;
export const SLOWMO_RELEASE_EASE: TriggerEaseOutShape = "cosine";
/** <1 keeps playback speed closer to minSpeed longer during envelope release. */
export const SLOWMO_SPEED_SHAPING_EXP = 0.68;
/** Max feedback blend — matches standalone Feedback FX ceiling. */
export const SLOWMO_TRAIL_FEEDBACK_MAX = 0.92;
/** Immediate trail share on hit — visible ghosts before rise catches up. */
export const SLOWMO_TRAIL_ENTRY_SEED = 0.34;
/** Ease-out power on pulse → trail drive (>1 = more trail early in the hit). */
export const SLOWMO_TRAIL_ENTRY_EASE_POWER = 2.15;
/** Extra rise speed while trail mix is still near zero. */
export const SLOWMO_TRAIL_ENTRY_RISE_BOOST = 2.4;
/** How fast ghost frames accumulate when a slowmo pulse is active (per second). */
export const SLOWMO_TRAIL_RISE_PER_SEC = 4.2;
/** Decay when the pulse ends (per second). */
export const SLOWMO_TRAIL_FALL_PER_SEC = 3.6;

export function clampSlowmoDurationSec(sec: number): number {
  if (!Number.isFinite(sec)) return SLOWMO_DURATION_DEFAULT;
  return Math.max(SLOWMO_DURATION_MIN, Math.min(SLOWMO_DURATION_MAX, sec));
}

/** Hit envelope for Slowmo — short plateau then a long cosine ease back over `durationSec`. */
export function slowmoEnvelopeFromDuration(durationSec: number): OneShotEnvelopeProfile {
  const total = clampSlowmoDurationSec(durationSec);
  const hold = total * SLOWMO_HOLD_RATIO;
  const release = Math.max(SLOWMO_DURATION_MIN, total - hold);
  return {
    attack: 0,
    hold,
    release,
    decay: 20,
    easeShape: SLOWMO_RELEASE_EASE,
  };
}

/** Maps pulse depth to playback slowdown — gentler than square so release lingers. */
export function shapeSlowmoAmount(amount: number): number {
  const a = amount < 0 ? 0 : amount > 1 ? 1 : amount;
  if (a <= 0) return 0;
  if (a >= 1) return 1;
  return Math.pow(a, SLOWMO_SPEED_SHAPING_EXP);
}

/** Wall-clock pulse length for transport fallback (matches the envelope). */
export function slowmoPulseDurationSec(durationSec: number): number {
  const envelope = slowmoEnvelopeFromDuration(durationSec);
  return triggerEnvelopeDuration(
    0,
    envelope.attack,
    envelope.hold,
    envelope.release,
    envelope.decay,
  );
}

export function clampSlowmoMotionBlur(mix: number): number {
  if (!Number.isFinite(mix)) return SLOWMO_MOTION_BLUR_DEFAULT;
  return mix < 0 ? 0 : mix > 1 ? 1 : mix;
}

/** Ease-in drive so trail leads the dip — stronger at the start of the envelope. */
export function shapeSlowmoTrailDrive(pulseAmount: number): number {
  const p = pulseAmount < 0 ? 0 : pulseAmount > 1 ? 1 : pulseAmount;
  if (p <= 0) return 0;
  if (p >= 1) return 1;
  return 1 - Math.pow(1 - p, SLOWMO_TRAIL_ENTRY_EASE_POWER);
}

/** Target feedback mix (0–0.92) from eased pulse depth × trail slider. */
export function slowmoTrailFeedbackTarget(pulseAmount: number, motionBlurMix: number): number {
  const mix = clampSlowmoMotionBlur(motionBlurMix);
  if (pulseAmount < 0.00001 || mix < 0.00001) return 0;
  return shapeSlowmoTrailDrive(pulseAmount) * mix * SLOWMO_TRAIL_FEEDBACK_MAX;
}

/**
 * Progressive frame-trail mix — entry seed + eased rise so ghosts appear as speed dips,
 * then eases down on release and decays after the hit.
 */
export function advanceSlowmoTrailMix(
  current: number,
  pulseAmount: number,
  motionBlurMix: number,
  dt: number,
): number {
  const target = slowmoTrailFeedbackTarget(pulseAmount, motionBlurMix);
  if (target > current) {
    let mix = current;
    if (mix < 0.00001 && target > 0.00001) {
      mix = target * SLOWMO_TRAIL_ENTRY_SEED;
    }
    const u = target > 0.00001 ? mix / target : 1;
    const entryMul = 1 + SLOWMO_TRAIL_ENTRY_RISE_BOOST * (1 - u);
    const rise = dt * SLOWMO_TRAIL_RISE_PER_SEC * Math.max(0.25, target) * entryMul;
    return Math.min(target, mix + rise);
  }
  if (target <= 0.00001) {
    return Math.max(0, current - dt * SLOWMO_TRAIL_FALL_PER_SEC);
  }
  return current + (target - current) * Math.min(1, dt * 8);
}

/** Live slowmo pulse depth for trail/speed (envelope + transport fallback). */
export function slowmoLivePulseAmount(slowFx: FXConfig | undefined): number {
  if (!slowFx?.enabled) return 0;
  const win = getHydraWindow();
  const binding = paramBindingFromFx(slowFx, "base", {
    staticValue: slowFx.base ?? 1,
    paramMin: 0,
    paramMax: 1,
    fxKey: "slowmo",
  });
  if (bindingIsTriggered(binding)) {
    let pulse = win.hydraEnvelopes?.slowmo ?? 0;
    const until = win.slowmoPulseUntilMs;
    if (typeof until === "number" && performance.now() < until) {
      pulse = Math.max(pulse, 1);
    }
    return pulse < 0 ? 0 : pulse > 1 ? 1 : pulse;
  }
  if (binding.source === "none") return 0;
  return 0;
}

/** Advance trail mix once per Hydra tick (reads live envelopes + settings). */
export function tickSlowmoTrailMix(dtSec: number): void {
  const win = getHydraWindow();
  const slowFx = win.hydraSettings?.fx?.slowmo;
  const current = win.slowmoTrailMix ?? 0;
  if (!slowFx?.enabled) {
    win.slowmoTrailMix = advanceSlowmoTrailMix(current, 0, 0, dtSec);
    return;
  }
  const trailParam =
    typeof slowFx.params?.motionBlur === "number"
      ? slowFx.params.motionBlur
      : SLOWMO_MOTION_BLUR_DEFAULT;
  if (trailParam <= 0.00001) {
    win.slowmoTrailMix = advanceSlowmoTrailMix(current, 0, 0, dtSec);
    return;
  }
  const pulse = slowmoLivePulseAmount(slowFx);
  win.slowmoTrailMix = advanceSlowmoTrailMix(current, pulse, trailParam, dtSec);
}
