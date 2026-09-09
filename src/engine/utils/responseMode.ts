import type { ParamSync } from "../types/settings";
import { coercePulseDefaults, PULSE_HIT_DEFAULTS } from "./audioMapperDefaults";
import { defaultTriggeredEnvelopeRef } from "./hitEnvelopeShape";
import type { ParamResponseMode } from "./paramBinding";

/** Derive UI response mode from persisted sync fields. */
export function responseModeFromSync(sync: ParamSync): ParamResponseMode {
  if (!sync.isTrigger) return "follow";
  if (sync.envelopeRef === null) return "trigger";
  return "envelope";
}

export function syncWithResponseMode(sync: ParamSync, mode: ParamResponseMode): ParamSync {
  if (mode === "follow") {
    return { ...sync, isTrigger: false, envelopeRef: undefined };
  }
  if (mode === "trigger") {
    return {
      ...sync,
      isTrigger: true,
      envelopeRef: null,
      triggerThreshold: sync.triggerThreshold ?? PULSE_HIT_DEFAULTS.triggerThreshold,
      triggerCount: sync.triggerCount ?? PULSE_HIT_DEFAULTS.triggerCount,
    };
  }
  return coercePulseDefaults({
    ...sync,
    isTrigger: true,
    envelopeRef:
      sync.envelopeRef && sync.envelopeRef !== null ? sync.envelopeRef : defaultTriggeredEnvelopeRef(),
  });
}

export function bindingUsesGate(sync: ParamSync): boolean {
  const mode = responseModeFromSync(sync);
  return mode === "trigger" || mode === "envelope";
}
