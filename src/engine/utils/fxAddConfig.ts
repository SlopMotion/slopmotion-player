import type { FolderConfig, FXConfig } from "../types/settings";
import {
  AVAILABLE_FX,
  CORE_FX_DEFINITIONS,
  FX_PARAM,
  isTriggerNativeFx,
  isTriggerOnlyPulseAmountFx,
  type FXExtraParamSpec,
} from "../data/fxConfig";
import { PULSE_HIT_DEFAULTS } from "./audioMapperDefaults";

type FxDefWithExtras = {
  key: string;
  min?: number;
  max?: number;
  baseLabel?: string;
  extraParams?: readonly FXExtraParamSpec[];
};

const FX_DEF_BY_KEY = new Map<string, FxDefWithExtras>(
  ([...CORE_FX_DEFINITIONS, ...AVAILABLE_FX] as FxDefWithExtras[]).map((d) => [d.key, d]),
);

/**
 * Overlay FX that only render meaningful output once a hit spawns geometry
 * (lines on the shared canvas). Stripping their authored audio binding to a
 * static row leaves them visibly dead on add, so keep the template's
 * `syncBand` / trigger fields instead of forcing the static defaults.
 */
/** Scene templates keep base at 0 for no-op semantics; picker uses these instead. */
const PICKER_BASE_OVERRIDES: Partial<Record<string, number>> = {
  noise: 0.6,
  glow: 0.55,
  lens7c: 0.62,
};

const REACTIVE_DEFAULT_FX_KEYS = new Set<string>([
  "circleGlitch",
  "neonGrid",
  "electricNoise",
  "stutterBack",
  "jumpCut",
  "clipPeek",
  "zap",
  "boomerang",
  "slowmo",
  "accelerate",
  "string",
]);

/** Audio-binding fields copied verbatim when an FX keeps its reactive defaults. */
function reactiveBindingFromTemplate(fxKey: string, template: FXConfig): Partial<FXConfig> {
  const pulseAmount = isTriggerOnlyPulseAmountFx(fxKey);
  return {
    syncBand: template.syncBand,
    syncMultiplier: template.syncMultiplier,
    isTrigger: template.isTrigger ?? false,
    triggerThreshold: template.triggerThreshold ?? PULSE_HIT_DEFAULTS.triggerThreshold,
    triggerCount: template.triggerCount ?? PULSE_HIT_DEFAULTS.triggerCount,
    envelopeRef: pulseAmount
      ? template.envelopeRef ?? undefined
      : template.envelopeRef ?? null,
    triggerAttack: template.triggerAttack ?? PULSE_HIT_DEFAULTS.triggerAttack,
    triggerRelease: template.triggerRelease ?? PULSE_HIT_DEFAULTS.triggerRelease,
  };
}

function paramsFromTemplateAndMetadata(
  templateParams: Record<string, number | string> | undefined,
  extraParams?: readonly FXExtraParamSpec[],
): Record<string, number | string> | undefined {
  const out = { ...(templateParams ?? {}) };
  if (extraParams?.length) {
    for (const spec of extraParams) {
      if (!spec || typeof spec !== "object" || !("key" in spec)) continue;
      if ("default" in spec && spec.default !== undefined) {
        out[spec.key] = spec.default as number | string;
      }
    }
  }
  return Object.keys(out).length ? out : undefined;
}

/**
 * Amount sliders default to a visible-on-add value so enabling an effect always
 * does something. A meaningful authored `templateBase` wins (e.g. Feedback 0.9,
 * not its 0.99 ceiling); otherwise full strength, capped at 1 so wide-range
 * sliders (Blur/Sharpen, max 2) land at a tasteful 1.0 instead of an invisible 0.
 */
export function resolveDefaultFxBase(
  def: FxDefWithExtras | undefined,
  templateBase: number,
): number {
  if (!def || def.min !== 0 || def.max == null) return templateBase;
  if (def.baseLabel !== FX_PARAM.amount) return templateBase;
  if (def.max === 1) return 1;
  if (templateBase > 0) return Math.min(templateBase, def.max);
  return Math.min(def.max, 1);
}

/** Static FX row: picker/add/reset defaults — no audio follow, no paramSync, no triggers. */
export function buildStaticFxConfig(
  fxKey: keyof FolderConfig["fx"],
  template: FXConfig,
  enabled = template.enabled,
): FXConfig {
  const def = FX_DEF_BY_KEY.get(String(fxKey));

  const {
    paramSync: templateParamSync,
    enabled: _enabled,
    syncBand: _syncBand,
    syncMultiplier: _syncMultiplier,
    isTrigger: _isTrigger,
    triggerThreshold: _triggerThreshold,
    triggerCount: _triggerCount,
    delay: _delay,
    decay: _decay,
    triggerAttack: _triggerAttack,
    triggerRelease: _triggerRelease,
    triggerHold: _triggerHold,
    triggerEaseOutShape: _triggerEaseOutShape,
    ...rest
  } = template;

  const reactive = REACTIVE_DEFAULT_FX_KEYS.has(String(fxKey));
  const pickerBaseOverride = PICKER_BASE_OVERRIDES[String(fxKey)];

  return {
    ...rest,
    enabled,
    base: reactive
      ? template.base
      : pickerBaseOverride ?? resolveDefaultFxBase(def, template.base),
    params: paramsFromTemplateAndMetadata(template.params, def?.extraParams),
    syncBand: "none",
    syncMultiplier: 0,
    isTrigger: false,
    ...PULSE_HIT_DEFAULTS,
    ...(reactive ? reactiveBindingFromTemplate(String(fxKey), template) : {}),
    ...(isTriggerNativeFx(String(fxKey)) && templateParamSync
      ? { paramSync: templateParamSync }
      : {}),
  };
}

/** Fresh FX row when adding from the picker. */
export function buildFxConfigForAdd(
  fxKey: keyof FolderConfig["fx"],
  template: FXConfig,
): FXConfig {
  return buildStaticFxConfig(fxKey, template, true);
}
