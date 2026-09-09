import type { AudioBand, EgBand, FXConfig, ModulationSettings, ParamSync, TriggerEaseOutShape } from "../types/settings";
import { PULSE_HIT_DEFAULTS, ENVELOPE_GATE_DEFAULTS } from "./audioMapperDefaults";
import { egOneShotProfileFromConfig } from "./egEnvelopeConfig";
import { defaultTriggeredEnvelopeRef, envelopeShapeFromParamSync } from "./hitEnvelopeShape";
import { isLegacyLfoBand } from "./lfoBands";
import { isNechAnalysisBand, NECH_TRIGGER_CATALOG } from "./nechTriggerBands";
import {
  isAmBand,
  isEgBand,
  isLfoInstanceBand,
  isModulationSourceBand,
  isStepperBand,
  modSourceIndex,
} from "./modulationSources";
import { isOrbitBand, isStemMappedBand } from "./orbitTriggerBands";
import { responseModeFromSync } from "./responseMode";
import { resolveBindingMapRange, triggerMapRangeDefaults } from "./paramMapRange";

export type ParamResponseMode = "follow" | "trigger" | "envelope";

export type ParamBindingSourceKind =
  | "none"
  | "audio"
  | "studio"
  | "legacyLfo"
  | "lfo"
  | "eg"
  | "am"
  | "step";

export type TriggerCondition = {
  threshold: number;
  count: number;
  delay: number;
};

export type OneShotEnvelopeProfile = {
  attack: number;
  hold: number;
  release: number;
  decay: number;
  easeShape: TriggerEaseOutShape;
};

const SQUARE_TRIGGER_PROFILE: OneShotEnvelopeProfile = {
  attack: 0,
  hold: 0,
  release: 0,
  decay: 40,
  easeShape: "linear",
};

/** Normalized routing for one FX base row or extra param. */
export type ParamBinding = {
  source: AudioBand;
  depth: number;
  mapMin: number;
  mapMax: number;
  mode: ParamResponseMode;
  trigger: TriggerCondition;
  envelopeRef: EgBand | null;
  envelope: OneShotEnvelopeProfile;
};

const DEFAULT_BINDING: ParamBinding = {
  source: "none",
  depth: 1,
  mapMin: 0,
  mapMax: 1,
  mode: "follow",
  trigger: {
    threshold: PULSE_HIT_DEFAULTS.triggerThreshold,
    count: PULSE_HIT_DEFAULTS.triggerCount,
    delay: PULSE_HIT_DEFAULTS.delay,
  },
  envelopeRef: null,
  envelope: {
    attack: PULSE_HIT_DEFAULTS.triggerAttack,
    hold: PULSE_HIT_DEFAULTS.triggerHold,
    release: PULSE_HIT_DEFAULTS.triggerRelease,
    decay: PULSE_HIT_DEFAULTS.decay,
    easeShape: PULSE_HIT_DEFAULTS.triggerEaseOutShape,
  },
};

export function bindingSourceKind(band: AudioBand): ParamBindingSourceKind {
  if (band === "none") return "none";
  if (isEgBand(band)) return "eg";
  if (isAmBand(band)) return "am";
  if (isStepperBand(band)) return "step";
  if (isModulationSourceBand(band)) {
    if (band.startsWith("lfo:")) return "lfo";
    return "none";
  }
  if (isLegacyLfoBand(band)) return "legacyLfo";
  if (isOrbitBand(band) || isStemMappedBand(band)) return "studio";
  return "audio";
}

export function bindingSourceKindLabel(kind: ParamBindingSourceKind): string {
  switch (kind) {
    case "audio":
      return "Audio";
    case "studio":
      return "Studio";
    case "legacyLfo":
      return "LFO";
    case "lfo":
      return "LFO";
    case "eg":
      return "Env";
    case "am":
      return "AM";
    case "step":
      return "Step";
    default:
      return "";
  }
}

/** Modulation EG/AM outputs are already envelope-shaped — no per-target hit envelope. */
export function bindingSourceAlreadyEnveloped(band: AudioBand): boolean {
  return isEgBand(band) || isAmBand(band);
}

/** Smoothed level / macro signals — follow only, no per-target hit envelope. */
const FOLLOW_ONLY_LEVEL_BANDS = new Set<AudioBand>(["master", "specFast", "specSlow"]);

/** Modulation outputs and level sources — continuous follow, no trigger/envelope picker. */
export function bindingSourceIsFollowOnly(band: AudioBand): boolean {
  if (bindingSourceAlreadyEnveloped(band)) return true;
  if (isLfoInstanceBand(band) || isLegacyLfoBand(band) || isStepperBand(band)) return true;
  if (FOLLOW_ONLY_LEVEL_BANDS.has(band)) return true;
  if (isNechAnalysisBand(band)) {
    return NECH_TRIGGER_CATALOG.find((entry) => entry.band === band)?.kind === "level";
  }
  return false;
}

export function bindingAllowsTriggeredMode(band: AudioBand): boolean {
  return !bindingSourceIsFollowOnly(band);
}

export function clearedParamBinding(): ParamBinding {
  return { ...DEFAULT_BINDING };
}

export function clearedParamSync(): ParamSync {
  return bindingToSync(clearedParamBinding());
}

function inlineEnvelopeFromSync(sync: ParamSync): OneShotEnvelopeProfile {
  const shape = envelopeShapeFromParamSync(sync);
  return {
    attack: shape.attack,
    hold: shape.hold,
    release: shape.release,
    decay: shape.decay,
    easeShape: shape.easeShape,
  };
}

function syncToBinding(
  sync: ParamSync,
  staticValue = 0,
  paramMin = 0,
  paramMax = 1,
  fxKey?: string,
  paramKey?: string,
): ParamBinding {
  let mode = responseModeFromSync(sync);
  if (mode !== "follow" && !bindingAllowsTriggeredMode(sync.band)) {
    mode = "follow";
  }
  const isEnvelopeMode = mode === "envelope";
  const gateDefaults = isEnvelopeMode ? ENVELOPE_GATE_DEFAULTS : PULSE_HIT_DEFAULTS;
  let rangeMin = paramMin;
  let rangeMax = paramMax;
  if (mode !== "follow" && fxKey && paramKey) {
    const triggerDefaults = triggerMapRangeDefaults(fxKey, paramKey, paramMin, paramMax);
    if (typeof sync.mapMin !== "number") rangeMin = triggerDefaults.mapMin;
    if (typeof sync.mapMax !== "number") rangeMax = triggerDefaults.mapMax;
  }
  const { mapMin, mapMax } = resolveBindingMapRange(
    sync.mapMin,
    sync.mapMax,
    staticValue,
    sync.multiplier ?? 0,
    rangeMin,
    rangeMax,
  );
  return {
    source: sync.band,
    depth: sync.multiplier ?? 1,
    mapMin,
    mapMax,
    mode,
    trigger: {
      threshold: sync.triggerThreshold ?? gateDefaults.triggerThreshold,
      count: sync.triggerCount ?? gateDefaults.triggerCount,
      delay: sync.delay ?? PULSE_HIT_DEFAULTS.delay,
    },
    envelopeRef:
      mode === "envelope" ? (sync.envelopeRef && sync.envelopeRef !== null ? sync.envelopeRef : defaultTriggeredEnvelopeRef()) : null,
    envelope: inlineEnvelopeFromSync(sync),
  };
}

function bindingToSync(binding: ParamBinding): ParamSync {
  const mode =
    binding.mode !== "follow" && bindingAllowsTriggeredMode(binding.source) ? binding.mode : "follow";
  return {
    band: binding.source,
    multiplier: binding.depth,
    mapMin: binding.mapMin,
    mapMax: binding.mapMax,
    isTrigger: mode !== "follow",
    envelopeRef:
      mode === "envelope"
        ? (binding.envelopeRef ?? defaultTriggeredEnvelopeRef())
        : mode === "trigger"
          ? null
          : undefined,
    triggerThreshold: binding.trigger.threshold,
    triggerCount: binding.trigger.count,
    delay: binding.trigger.delay,
    triggerAttack: binding.envelope.attack,
    triggerRelease: binding.envelope.release,
    triggerHold: binding.envelope.hold,
    decay: binding.envelope.decay,
    triggerEaseOutShape: binding.envelope.easeShape,
  };
}

export function resolveBindingEnvelope(
  binding: ParamBinding,
  modulation?: ModulationSettings | null,
): OneShotEnvelopeProfile {
  if (binding.mode === "trigger") return SQUARE_TRIGGER_PROFILE;
  if (binding.mode === "envelope" && binding.envelopeRef && modulation) {
    const idx = modSourceIndex(binding.envelopeRef);
    if (idx != null) {
      const eg = modulation.egs[idx - 1];
      if (eg?.enabled) return egOneShotProfileFromConfig(eg);
    }
  }
  return binding.envelope;
}

export function paramBindingFromFx(
  fx: FXConfig,
  paramKey: string,
  limits?: { staticValue?: number; paramMin?: number; paramMax?: number; fxKey?: string },
): ParamBinding {
  const fxKey = limits?.fxKey;
  const paramMin = limits?.paramMin ?? 0;
  const paramMax = limits?.paramMax ?? 1;
  if (paramKey === "base") {
    return syncToBinding(
      {
        band: fx.syncBand ?? "none",
        multiplier: fx.syncMultiplier ?? 1,
        mapMin: fx.mapMin,
        mapMax: fx.mapMax,
        isTrigger: fx.isTrigger,
        envelopeRef: fx.envelopeRef,
        triggerThreshold: fx.triggerThreshold,
        triggerCount: fx.triggerCount,
        delay: fx.delay,
        decay: fx.decay,
        triggerAttack: fx.triggerAttack,
        triggerRelease: fx.triggerRelease,
        triggerHold: fx.triggerHold,
        triggerEaseOutShape: fx.triggerEaseOutShape,
      },
      limits?.staticValue ?? fx.base ?? 0,
      paramMin,
      paramMax,
      fxKey,
      paramKey,
    );
  }
  const ps = fx.paramSync?.[paramKey];
  const staticValue =
    limits?.staticValue ??
    (typeof fx.params?.[paramKey] === "number" ? (fx.params[paramKey] as number) : 0);
  return ps
    ? syncToBinding(ps, staticValue, paramMin, paramMax, fxKey, paramKey)
    : { ...DEFAULT_BINDING, mapMin: paramMin, mapMax: paramMax };
}

export function applyParamBinding(fx: FXConfig, paramKey: string, binding: ParamBinding): FXConfig {
  const sync = bindingToSync(binding);
  if (paramKey === "base") {
    return {
      ...fx,
      syncBand: sync.band,
      syncMultiplier: sync.multiplier,
      mapMin: sync.mapMin,
      mapMax: sync.mapMax,
      isTrigger: sync.isTrigger,
      envelopeRef: sync.envelopeRef,
      triggerThreshold: sync.triggerThreshold,
      triggerCount: sync.triggerCount,
      delay: sync.delay,
      decay: sync.decay,
      triggerAttack: sync.triggerAttack,
      triggerRelease: sync.triggerRelease,
      triggerHold: sync.triggerHold,
      triggerEaseOutShape: sync.triggerEaseOutShape,
    };
  }
  return {
    ...fx,
    paramSync: {
      ...(fx.paramSync ?? {}),
      [paramKey]: sync,
    },
  };
}

/** @deprecated Prefer `paramBindingFromFx` — kept for existing call sites. */
export function bindingSyncFromFx(fx: FXConfig, paramKey: string): ParamSync {
  return bindingToSync(paramBindingFromFx(fx, paramKey));
}

/** @deprecated Prefer `applyParamBinding` — kept for existing call sites. */
export function applyBindingSync(fx: FXConfig, paramKey: string, sync: ParamSync): FXConfig {
  return applyParamBinding(fx, paramKey, syncToBinding(sync));
}

/** Fade Off stores matrix silence-fade in paramSync.base so syncBand stays the presence follow. */
export function matrixSilenceFadeUsesParamSync(fxKey: string, paramKey: string): boolean {
  return fxKey === "fadeOff" && paramKey === "base";
}

export function matrixTargetBindingFromFx(
  fx: FXConfig,
  fxKey: string,
  paramKey: string,
  limits?: { staticValue?: number; paramMin?: number; paramMax?: number },
): ParamBinding {
  if (matrixSilenceFadeUsesParamSync(fxKey, paramKey)) {
    const paramMin = limits?.paramMin ?? 0;
    const paramMax = limits?.paramMax ?? 1;
    const staticValue = limits?.staticValue ?? fx.base ?? 0;
    const ps = fx.paramSync?.base;
    return ps
      ? syncToBinding(ps, staticValue, paramMin, paramMax, fxKey, paramKey)
      : { ...DEFAULT_BINDING, mapMin: paramMin, mapMax: paramMax };
  }
  return paramBindingFromFx(fx, paramKey, { ...limits, fxKey });
}

export function applyMatrixTargetSync(
  fx: FXConfig,
  fxKey: string,
  paramKey: string,
  sync: ParamSync,
): FXConfig {
  if (matrixSilenceFadeUsesParamSync(fxKey, paramKey)) {
    return {
      ...fx,
      paramSync: {
        ...(fx.paramSync ?? {}),
        base: sync,
      },
    };
  }
  return applyBindingSync(fx, paramKey, sync);
}

export function matrixTargetBindingSyncFromFx(
  fx: FXConfig,
  fxKey: string,
  paramKey: string,
): ParamSync {
  return bindingToSync(matrixTargetBindingFromFx(fx, fxKey, paramKey));
}

export function bindingIsTriggered(binding: ParamBinding): boolean {
  return (
    (binding.mode === "trigger" || binding.mode === "envelope") &&
    bindingAllowsTriggeredMode(binding.source)
  );
}
