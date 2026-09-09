import type { EnvelopeGeneratorConfig } from "../types/settings";
import type { OneShotEnvelopeProfile } from "./paramBinding";
import { ENVELOPE_SHAPE_DEFAULTS } from "./envelopeShapeDefaults";

export function normalizeEgConfig(eg: EnvelopeGeneratorConfig): EnvelopeGeneratorConfig {
  return {
    ...eg,
    attack: eg.attack ?? ENVELOPE_SHAPE_DEFAULTS.attack,
    hold: eg.hold ?? ENVELOPE_SHAPE_DEFAULTS.hold,
    oneshotRelease: eg.oneshotRelease ?? ENVELOPE_SHAPE_DEFAULTS.release,
    oneshotDecay: eg.oneshotDecay ?? ENVELOPE_SHAPE_DEFAULTS.decay,
    triggerEaseOutShape: eg.triggerEaseOutShape ?? ENVELOPE_SHAPE_DEFAULTS.easeShape,
  };
}

export function egOneShotProfileFromConfig(eg: EnvelopeGeneratorConfig): OneShotEnvelopeProfile {
  const n = normalizeEgConfig(eg);
  return {
    attack: n.attack,
    hold: n.hold ?? ENVELOPE_SHAPE_DEFAULTS.hold,
    release: n.oneshotRelease ?? ENVELOPE_SHAPE_DEFAULTS.release,
    decay: n.oneshotDecay ?? ENVELOPE_SHAPE_DEFAULTS.decay,
    easeShape: n.triggerEaseOutShape ?? ENVELOPE_SHAPE_DEFAULTS.easeShape,
  };
}

export { ENVELOPE_SHAPE_DEFAULTS } from "./envelopeShapeDefaults";
