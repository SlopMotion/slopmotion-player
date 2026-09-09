import type { FolderConfig } from "../types/settings";
import { AVAILABLE_FX } from "../data/fxConfig";
import { resolveRenderFxList } from "./settingsUtils";
import { OVERLAY_FX_KEYS, type OverlayCanvasOwner } from "./overlayCanvasSource";

export { OVERLAY_FX_KEYS as CANVAS_OVERLAY_FX_KEYS, type OverlayCanvasOwner };

/** Addable Color & grade FX that run in the shader chain (after source Color Adjust). */
export const ADDABLE_GRADE_FX_KEYS = AVAILABLE_FX.filter((fx) => fx.category === "Color & grade").map(
  (fx) => fx.key,
) as readonly (keyof FolderConfig["fx"])[];

const ADDABLE_GRADE_FX_KEY_SET = new Set<string>(ADDABLE_GRADE_FX_KEYS);

export function isAddableGradeFxKey(key: string): boolean {
  return ADDABLE_GRADE_FX_KEY_SET.has(key);
}

/** Playback transport FX that ignore activeFxList order. */
export const TRANSPORT_CHAIN_FX_KEYS = [
  "videoSpeed",
  "boomerang",
  "jumpCut",
  "stutterBack",
  "clipPeek",
  "zap",
  "slowmo",
  "accelerate",
  "playbackCue",
] as const;

const TRANSPORT_CHAIN_FX_KEY_SET = new Set<string>(TRANSPORT_CHAIN_FX_KEYS);

export function isTransportChainFxKey(key: string): boolean {
  return TRANSPORT_CHAIN_FX_KEY_SET.has(key);
}

export type TransitionCrossfadeInput = {
  playing: boolean;
  force?: boolean;
  instantLoad?: boolean;
  loadedPath?: string | null;
  transitionEnabled: boolean;
  /** True while a boomerang capture/reverse cycle is running — not merely when the FX toggle is on. */
  boomerangEngaged: boolean;
};

/** Mirrors HydraCanvas clip-load crossfade gate (Transition vs Boomerang). */
export function shouldTransitionCrossfade(input: TransitionCrossfadeInput): boolean {
  const { playing, force = false, instantLoad = false, loadedPath, transitionEnabled, boomerangEngaged } =
    input;
  return (
    playing &&
    !force &&
    !instantLoad &&
    loadedPath != null &&
    loadedPath.length > 0 &&
    transitionEnabled &&
    !boomerangEngaged
  );
}

/** All transport triggers (including stutter / re-trigger) wait until the boomerang cycle ends. */
export function shouldSuppressTransportTriggerWhenBoomerangEngaged(
  boomEngaged: boolean,
  _fxKey: string,
): boolean {
  return boomEngaged;
}

/** Shader chain keys in render order (core FX stripped; missing enabled FX appended). */
export function resolveShaderChainOrder(
  fx: FolderConfig["fx"] | undefined,
  activeFxList: FolderConfig["activeFxList"] | undefined,
): (keyof FolderConfig["fx"])[] {
  return resolveRenderFxList(fx, activeFxList);
}

/** Grade FX keys in shader-chain order (after source Color Adjust). */
export function resolveGradeFxChainOrder(
  fx: FolderConfig["fx"] | undefined,
  activeFxList: FolderConfig["activeFxList"] | undefined,
): (keyof FolderConfig["fx"])[] {
  return resolveShaderChainOrder(fx, activeFxList).filter((key) => isAddableGradeFxKey(key as string));
}

/** Relative positions of two shader-chain keys; null when either key is absent from the chain. */
export function shaderChainRelativeOrder(
  fx: FolderConfig["fx"] | undefined,
  activeFxList: FolderConfig["activeFxList"] | undefined,
  earlierKey: string,
  laterKey: string,
): "earlier-first" | "later-first" | null {
  const chain = resolveShaderChainOrder(fx, activeFxList).map(String);
  const earlierIdx = chain.indexOf(earlierKey);
  const laterIdx = chain.indexOf(laterKey);
  if (earlierIdx < 0 || laterIdx < 0) return null;
  return earlierIdx < laterIdx ? "earlier-first" : "later-first";
}
