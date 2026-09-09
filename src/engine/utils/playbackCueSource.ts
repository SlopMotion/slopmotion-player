import type { FXConfig } from "../types/settings";
import { clipPathsEquivalent } from "./videoUtils";
import { playbackCueSlotParamKey } from "./playbackCueSlots";

export const PLAYBACK_CUE_CLIP_INDEX = 0;
export const PLAYBACK_CUE_CLIP_STATIC = 1;

type FxParams = FXConfig["params"];

export function playbackCueClipModeKey(slot: number): string {
  return `clipMode${slot}`;
}

export function playbackCueClipPathKey(slot: number): string {
  return `clipPath${slot}`;
}

export function playbackCueClipMode(params: FxParams, slot: number): number {
  const raw = params?.[playbackCueClipModeKey(slot)];
  if (typeof raw === "number" && Number.isFinite(raw)) {
    return Math.round(raw) === PLAYBACK_CUE_CLIP_STATIC
      ? PLAYBACK_CUE_CLIP_STATIC
      : PLAYBACK_CUE_CLIP_INDEX;
  }
  return PLAYBACK_CUE_CLIP_INDEX;
}

export function isPlaybackCueStaticClip(params: FxParams, slot: number): boolean {
  return playbackCueClipMode(params, slot) === PLAYBACK_CUE_CLIP_STATIC;
}

export function playbackCueStaticClipPath(
  params: FxParams,
  slot: number,
): string | undefined {
  const raw = params?.[playbackCueClipPathKey(slot)];
  return typeof raw === "string" && raw.trim() ? raw.trim() : undefined;
}

export function playbackCueIndexFromParams(params: FxParams, slot: number): number {
  const raw = params?.[playbackCueSlotParamKey("clip", slot)] ?? slot;
  return typeof raw === "number" && Number.isFinite(raw)
    ? Math.max(1, Math.round(raw))
    : Math.max(1, Number(raw) || slot);
}

export function resolvePlaybackCueClipPath(
  filteredLibrary: { path: string }[],
  params: FxParams,
  slot: number,
): string | null {
  if (filteredLibrary.length === 0) return null;

  if (isPlaybackCueStaticClip(params, slot)) {
    const staticPath = playbackCueStaticClipPath(params, slot);
    if (staticPath) {
      const match = filteredLibrary.find((v) => clipPathsEquivalent(v.path, staticPath));
      return match?.path ?? staticPath;
    }
  }

  const clipIndex = playbackCueIndexFromParams(params, slot);
  const idx = Math.max(0, Math.min(filteredLibrary.length - 1, clipIndex - 1));
  return filteredLibrary[idx]?.path ?? null;
}
