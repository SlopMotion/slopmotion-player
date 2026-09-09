import type { ParamSync } from "../types/settings";
import { ENVELOPE_SHAPE_DEFAULTS } from "./envelopeShapeDefaults";
import { DEFAULT_EASE_OUT_SHAPE } from "./triggerEnvelopeCurve";

/** Pulse hit tuning — canonical defaults (“no custom pulse shape”). */
export const PULSE_HIT_DEFAULTS = {
  triggerThreshold: 0.5,
  triggerCount: 1,
  delay: 0,
  decay: ENVELOPE_SHAPE_DEFAULTS.decay,
  triggerAttack: ENVELOPE_SHAPE_DEFAULTS.attack,
  triggerRelease: ENVELOPE_SHAPE_DEFAULTS.release,
  triggerHold: ENVELOPE_SHAPE_DEFAULTS.hold,
  triggerEaseOutShape: DEFAULT_EASE_OUT_SHAPE,
} as const;

/** Envelope bindings: minimal threshold gate; one crossing per fire by default. */
export const ENVELOPE_GATE_DEFAULTS = {
  triggerThreshold: 0,
  triggerCount: 1,
} as const;

export const ENVELOPE_COUNT_CHOICES = [1, 2, 4, 8, 16] as const;
export function coercePulseDefaults(sync: ParamSync): ParamSync {
  if (!sync.isTrigger || sync.envelopeRef === null) return sync;
  return {
    ...sync,
    envelopeRef:
      sync.envelopeRef && sync.envelopeRef !== null ? sync.envelopeRef : "eg:1",
    triggerThreshold: sync.triggerThreshold ?? ENVELOPE_GATE_DEFAULTS.triggerThreshold,
    triggerCount: sync.triggerCount ?? ENVELOPE_GATE_DEFAULTS.triggerCount,
    delay: sync.delay ?? PULSE_HIT_DEFAULTS.delay,
    decay: sync.decay ?? PULSE_HIT_DEFAULTS.decay,
    triggerAttack: sync.triggerAttack ?? PULSE_HIT_DEFAULTS.triggerAttack,
    triggerRelease: sync.triggerRelease ?? PULSE_HIT_DEFAULTS.triggerRelease,
    triggerHold: sync.triggerHold ?? PULSE_HIT_DEFAULTS.triggerHold,
    triggerEaseOutShape: sync.triggerEaseOutShape ?? PULSE_HIT_DEFAULTS.triggerEaseOutShape,
  };
}