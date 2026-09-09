import type { EgBand, EnvelopeGeneratorConfig, ParamSync, TriggerEaseOutShape } from "../types/settings";
import { coercePulseDefaults } from "./audioMapperDefaults";
import { ENVELOPE_SHAPE_DEFAULTS } from "./envelopeShapeDefaults";
import { normalizeEgConfig } from "./egEnvelopeConfig";

/** Pure envelope shape — no trigger gating. */
export type EnvelopeShape = {
  attack: number;
  hold: number;
  release: number;
  decay: number;
  easeShape: TriggerEaseOutShape;
};

export const ENVELOPE_SHAPE_PRESET: EnvelopeShape = {
  attack: ENVELOPE_SHAPE_DEFAULTS.attack,
  hold: ENVELOPE_SHAPE_DEFAULTS.hold,
  release: ENVELOPE_SHAPE_DEFAULTS.release,
  decay: ENVELOPE_SHAPE_DEFAULTS.decay,
  easeShape: ENVELOPE_SHAPE_DEFAULTS.easeShape,
};

export function envelopeShapeFromEgConfig(eg: EnvelopeGeneratorConfig): EnvelopeShape {
  const profile = normalizeEgConfig(eg);
  return {
    attack: profile.attack,
    hold: profile.hold ?? ENVELOPE_SHAPE_DEFAULTS.hold,
    release: profile.oneshotRelease ?? ENVELOPE_SHAPE_DEFAULTS.release,
    decay: profile.oneshotDecay ?? ENVELOPE_SHAPE_DEFAULTS.decay,
    easeShape: profile.triggerEaseOutShape ?? ENVELOPE_SHAPE_DEFAULTS.easeShape,
  };
}

export function envelopeShapeToEgPatch(shape: EnvelopeShape): Partial<EnvelopeGeneratorConfig> {
  return {
    attack: shape.attack,
    hold: shape.hold,
    oneshotRelease: shape.release,
    oneshotDecay: shape.decay,
    triggerEaseOutShape: shape.easeShape,
  };
}

export function envelopeShapeFromParamSync(sync: ParamSync): EnvelopeShape {
  const resolved = coercePulseDefaults(sync);
  return {
    attack: resolved.triggerAttack ?? ENVELOPE_SHAPE_DEFAULTS.attack,
    hold: resolved.triggerHold ?? ENVELOPE_SHAPE_DEFAULTS.hold,
    release: resolved.triggerRelease ?? ENVELOPE_SHAPE_DEFAULTS.release,
    decay: resolved.decay ?? ENVELOPE_SHAPE_DEFAULTS.decay,
    easeShape: resolved.triggerEaseOutShape ?? ENVELOPE_SHAPE_DEFAULTS.easeShape,
  };
}

export function defaultTriggeredEnvelopeRef(): EgBand {
  return "eg:1";
}

/** @deprecated Legacy inline pulse fields */
export type HitEnvelopeShape = {
  triggerThreshold: number;
  triggerCount: number;
  delay: number;
  triggerAttack: number;
  triggerHold: number;
  triggerRelease: number;
  decay: number;
  triggerEaseOutShape: TriggerEaseOutShape;
};

export function hitShapeFromParamSync(sync: ParamSync): HitEnvelopeShape {
  const resolved = coercePulseDefaults(sync);
  return {
    triggerThreshold: resolved.triggerThreshold!,
    triggerCount: resolved.triggerCount!,
    delay: resolved.delay!,
    triggerAttack: resolved.triggerAttack!,
    triggerHold: resolved.triggerHold!,
    triggerRelease: resolved.triggerRelease!,
    decay: resolved.decay!,
    triggerEaseOutShape: resolved.triggerEaseOutShape!,
  };
}

export function hitShapeToParamSync(sync: ParamSync, shape: HitEnvelopeShape): ParamSync {
  return coercePulseDefaults({
    ...sync,
    isTrigger: true,
    triggerThreshold: shape.triggerThreshold,
    triggerCount: shape.triggerCount,
    delay: shape.delay,
    triggerAttack: shape.triggerAttack,
    triggerHold: shape.triggerHold,
    triggerRelease: shape.triggerRelease,
    decay: shape.decay,
    triggerEaseOutShape: shape.triggerEaseOutShape,
  });
}