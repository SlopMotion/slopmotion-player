import type { FXConfig, FolderConfig } from "./settings";

/** Generative FX templates that build a source via `buildLayerInstanceChain`. */
export const LAYER_INSTANCE_TEMPLATE_KEYS = [
  "electricNoise",
  "fillLayer",
  "fractalFold",
  "noise",
  "patternLayer",
  "plasma",
  "plexus",
  "shapeLayer",
  "superformula",
  "topoContour",
  "universeWithin",
] as const;

export type LayerInstanceTemplateKey = (typeof LAYER_INSTANCE_TEMPLATE_KEYS)[number];

export function isLayerInstanceTemplateKey(key: string): key is LayerInstanceTemplateKey {
  return (LAYER_INSTANCE_TEMPLATE_KEYS as readonly string[]).includes(key);
}

/**
 * Any FX key that can live as a group child instance.
 * Wider than generative templates — includes video post FX, Layer Blend, Video Map,
 * and canvas-overlay FX (each owns a dedicated Hydra source from s4).
 * Core and playback FX stay excluded (see `canAdoptFxAsGroupLayer`).
 */
export type GroupLayerTemplateKey = keyof FolderConfig["fx"];

/** One instanced FX inside a group — config is independent of the singleton `fx[key]` row. */
export interface LayerInstance {
  templateKey: GroupLayerTemplateKey;
  config: FXConfig;
}

/** Composite settings for a layer group (blend / mask onto the chain below). */
export type FxGroupComposite = FXConfig & {
  params?: FXConfig["params"] & {
    mode?: number;
    maskReveal?: number;
    maskReach?: number;
    maskThreshold?: number;
    maskSoftness?: number;
    maskInvert?: number;
  };
};

/** Layer stack container with group-level blend and mask. */
export interface FxGroup {
  enabled: boolean;
  label?: string;
  layerIds: string[];
  /** How generative sources stack inside the group (0–4; no mask/source). Default Add (2). */
  internalMode: number;
  composite: FxGroupComposite;
  /** When true, canvas shows this group's buffer only (exclusive). */
  solo?: boolean;
  /**
   * Base of the group's internal FX chain before children.
   * 0 = black, 1 = primary clip, 2 = another group's buffer, 3 = current FX chain.
   */
  bufferStart?: FxGroupBufferStart;
  /** When `bufferStart` is 2, which group buffer to seed from. */
  bufferStartGroupId?: string | null;
}

/** Buffer-start modes for a layer group. */
export const FX_GROUP_BUFFER_START_BLACK = 0 as const;
export const FX_GROUP_BUFFER_START_CLIP = 1 as const;
export const FX_GROUP_BUFFER_START_GROUP = 2 as const;
export const FX_GROUP_BUFFER_START_CHAIN = 3 as const;
export type FxGroupBufferStart =
  | typeof FX_GROUP_BUFFER_START_BLACK
  | typeof FX_GROUP_BUFFER_START_CLIP
  | typeof FX_GROUP_BUFFER_START_GROUP
  | typeof FX_GROUP_BUFFER_START_CHAIN;

export function asFxGroupBufferStart(value: number): FxGroupBufferStart {
  const mode = Math.max(
    FX_GROUP_BUFFER_START_BLACK,
    Math.min(FX_GROUP_BUFFER_START_CHAIN, Math.round(value)),
  );
  return mode as FxGroupBufferStart;
}

export type FxChainFxNode = {
  kind: "fx";
  key: keyof FolderConfig["fx"];
};

export type FxChainGroupNode = {
  kind: "group";
  id: string;
};

export type FxChainNode = FxChainFxNode | FxChainGroupNode;

export function isFxChainGroupNode(node: FxChainNode): node is FxChainGroupNode {
  return node.kind === "group";
}

export function isFxChainFxNode(node: FxChainNode): node is FxChainFxNode {
  return node.kind === "fx";
}

export type FxChainStores = {
  activeChain?: FxChainNode[];
  layerInstances?: Record<string, LayerInstance>;
  fxGroups?: Record<string, FxGroup>;
  activeFxList?: (keyof FolderConfig["fx"])[];
};
