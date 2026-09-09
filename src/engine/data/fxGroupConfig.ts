import type { FXExtraParamSpec } from "./fxConfig";
import { FX_PARAM } from "./fxConfig";
import { isLayerInstanceTemplateKey } from "../types/fxChainTree";
import {
  GROUP_COMPOSITE_MODE_MAX,
  GROUP_COMPOSITE_MODE_ONTO_LABEL,
  LAYER_BLEND_MODE_MIX_LABEL,
} from "../utils/layerBlendMode";

/** How the group's internal chain is seeded before children. Peer label filled in by UI. */
export const FX_GROUP_BUFFER_START_LABEL =
  "Start (0=Black, 1=Clip, 2=Other, 3=Chain)";

export function fxGroupBufferStartLabel(otherGroupLabel?: string | null): string {
  if (otherGroupLabel != null) {
    const peer = otherGroupLabel.trim() || "Other";
    return `Start (0=Black, 1=Clip, 2=${peer}, 3=Chain)`;
  }
  return "Start (0=Black, 1=Clip, 2=Chain)";
}

/** How child layers stack inside the group. */
export const FX_GROUP_INTERNAL_MODE_LABEL = LAYER_BLEND_MODE_MIX_LABEL;

/** How the group composites onto the chain below — blend modes plus Mask at 6. */
export const FX_GROUP_COMPOSITE_MODE_LABEL = GROUP_COMPOSITE_MODE_ONTO_LABEL;

const GROUP_MASK_LABELS: Record<string, string> = {
  maskReveal: "Reveal (0=Below, 1=Black)",
  maskReach: "Reach (0=All, 1=Prev, 2=2, 3=3, 4=4, 5=5, 6=6)",
  maskThreshold: "Threshold",
  maskSoftness: "Softness",
  maskInvert: "Invert (0=Off, 1=On)",
};

const FX_GROUP_MASK_PARAM_SPECS = [
  {
    key: "maskReveal",
    label: "Mask reveal (0=Below, 1=Black)",
    min: 0,
    max: 1,
    step: 1,
    default: 0,
  },
  {
    key: "maskReach",
    label: "Mask reach (0=All, 1=Prev, 2=2, 3=3, 4=4, 5=5, 6=6)",
    min: 0,
    max: 6,
    step: 1,
    default: 0,
  },
  {
    key: "maskThreshold",
    label: "Mask threshold",
    min: 0,
    max: 1,
    step: 0.01,
    default: 0.35,
  },
  {
    key: "maskSoftness",
    label: "Mask softness",
    min: 0.01,
    max: 0.5,
    step: 0.01,
    default: 0.12,
  },
  {
    key: "maskInvert",
    label: "Invert (0=Off, 1=On)",
    min: 0,
    max: 1,
    step: 1,
    default: 0,
  },
] as const satisfies readonly FXExtraParamSpec[];

/** Mask tuning for group output — shown when Onto mode is Mask. */
export const FX_GROUP_MASK_PARAMS: FXExtraParamSpec[] = FX_GROUP_MASK_PARAM_SPECS.map((param) => {
  const label = GROUP_MASK_LABELS[param.key];
  return (label ? { ...param, label } : param) as FXExtraParamSpec;
});

export const FX_GROUP_COMPOSITE_EXTRA_PARAMS: FXExtraParamSpec[] = [
  {
    key: "mode",
    label: FX_GROUP_COMPOSITE_MODE_LABEL,
    min: 0,
    max: GROUP_COMPOSITE_MODE_MAX,
    step: 1,
    default: 0,
  },
  ...FX_GROUP_MASK_PARAMS,
];

export const FX_GROUP_COMPOSITE_BASE_LABEL = FX_PARAM.amount;

export const FX_GROUP_MASK_DEFAULT_PARAMS = {
  maskReveal: 0,
  maskReach: 0,
  maskThreshold: 0.35,
  maskSoftness: 0.12,
  maskInvert: 0,
} as const;

/** Composite params owned by the group — hidden on nested generative layers. */
export const FX_GROUP_LAYER_INSTANCE_HIDDEN_PARAM_KEYS = new Set([
  "mode",
  "maskReveal",
  "maskReach",
  "maskThreshold",
  "maskSoftness",
  "maskInvert",
  "sourceMode",
]);

export function filterExtraParamsForGroupLayerInstance(
  extraParams: readonly FXExtraParamSpec[] | undefined,
  templateKey?: string,
): FXExtraParamSpec[] | undefined {
  if (!extraParams?.length) return undefined;
  const hideBlendMode = isLayerInstanceTemplateKey(templateKey ?? "");
  const filtered = extraParams.filter((param) => {
    if (!("key" in param)) return true;
    if (param.key === "mode") return !hideBlendMode;
    return !FX_GROUP_LAYER_INSTANCE_HIDDEN_PARAM_KEYS.has(param.key);
  });
  return filtered.length > 0 ? filtered : undefined;
}

export { GROUP_COMPOSITE_MODE_MAX as FX_GROUP_BLEND_MODE_MAX };
