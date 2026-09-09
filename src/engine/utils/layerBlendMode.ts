import type { FXExtraParamSpec } from "../data/fxConfig";

export const LAYER_BLEND_MODE_NAMES = [
  "Blend",
  "Diff",
  "Add",
  "Mult",
  "Layer",
  "Overlay",
] as const;

export type LayerBlendModeName = (typeof LAYER_BLEND_MODE_NAMES)[number];

export const LAYER_BLEND_MODE_MAX = LAYER_BLEND_MODE_NAMES.length - 1;

export function layerBlendModeLabel(title = "Blend"): string {
  const choices = LAYER_BLEND_MODE_NAMES.map((name, index) => `${index}=${name}`).join(", ");
  return `${title} (${choices})`;
}

export const LAYER_BLEND_MODE_LABEL = layerBlendModeLabel("Blend");
export const LAYER_BLEND_MODE_MIX_LABEL = layerBlendModeLabel("Mix");
export const LAYER_BLEND_MODE_ONTO_LABEL = layerBlendModeLabel("Onto");

export const GROUP_COMPOSITE_MASK_MODE = 6;
export const GROUP_COMPOSITE_MODE_MAX = GROUP_COMPOSITE_MASK_MODE;
export const GROUP_COMPOSITE_MODE_ONTO_LABEL = `${LAYER_BLEND_MODE_ONTO_LABEL.slice(0, -1)}, 6=Mask)`;

export const LAYER_BLEND_MODE_PARAM: FXExtraParamSpec = {
  key: "mode",
  label: LAYER_BLEND_MODE_LABEL,
  min: 0,
  max: LAYER_BLEND_MODE_MAX,
  step: 1,
  default: 0,
};

export function layerBlendModeParam(
  defaultValue = 0,
): Extract<FXExtraParamSpec, { default: number }> {
  return {
    key: "mode",
    label: LAYER_BLEND_MODE_LABEL,
    min: 0,
    max: LAYER_BLEND_MODE_MAX,
    step: 1,
    default: defaultValue,
  };
}

export function clampLayerBlendMode(mode: number): number {
  return clampBlendMode(mode, LAYER_BLEND_MODE_MAX);
}

export function clampGroupCompositeMode(mode: number): number {
  return clampBlendMode(mode, GROUP_COMPOSITE_MODE_MAX);
}

export function clampBlendMode(mode: number, max: number): number {
  return Math.max(0, Math.min(max, Math.round(mode)));
}

export function isLayerBlendModeParam(paramKey: string, label: string): boolean {
  if (paramKey !== "mode") return false;
  return /\d+=Diff/.test(label) && /\d+=(?:Blend|Layer|Overlay)/.test(label);
}

export function isGroupCompositeModeParam(paramKey: string, label: string): boolean {
  if (paramKey !== "mode") return false;
  return (
    label === GROUP_COMPOSITE_MODE_ONTO_LABEL ||
    label.includes(`${GROUP_COMPOSITE_MASK_MODE}=Mask`)
  );
}
