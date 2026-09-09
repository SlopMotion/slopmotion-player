import { getHydraWindow } from "../types/hydraWindow";
import type { ClipPeekDeps } from "./clipPlaylistAdvance";
import { resolveClipPeekTargetPath } from "./clipPlaylistAdvance";
import { queuePendingPlaybackCueSeek } from "./playbackCue";
import {
  isClipZapTransportActive,
  isPlaybackCueTransportActive,
  markTransportFallbackLoad,
  setClipPeekTransportActive,
} from "./clipTransportGuard";

export type { ClipPeekDeps } from "./clipPlaylistAdvance";

export const CLIP_PEEK_HOLD_SEC_MIN = 0.05;
export const CLIP_PEEK_HOLD_SEC_MAX = 2;
export const CLIP_PEEK_STEPS_MIN = 1;
export const CLIP_PEEK_STEPS_MAX = 8;

export function clampClipPeekHoldSec(value: number): number {
  return Math.max(CLIP_PEEK_HOLD_SEC_MIN, Math.min(CLIP_PEEK_HOLD_SEC_MAX, value));
}

export function clampClipPeekSteps(value: number): number {
  return Math.max(CLIP_PEEK_STEPS_MIN, Math.min(CLIP_PEEK_STEPS_MAX, Math.round(value)));
}

type ClipPeekState = {
  returnPath: string;
  returnTimeSec: number;
  remainingSec: number;
  peekPath: string;
};

let activePeek: ClipPeekState | null = null;

function readPrimaryVideoTimeSec(): number {
  const win = getHydraWindow();
  for (const key of ["s0", "s1"] as const) {
    const el = win[key]?.src;
    if (el instanceof HTMLVideoElement && Number.isFinite(el.currentTime)) {
      return el.currentTime;
    }
  }
  return 0;
}

function restoreClipPeek(deps: ClipPeekDeps, state: ClipPeekState) {
  setClipPeekTransportActive(false);
  const win = getHydraWindow();
  const api = win.__hydraClipPeekVideo;
  if (api?.endPeek(state.returnPath, state.returnTimeSec)) {
    win.__hydraClipPeekSkipLoad = state.returnPath;
    deps.applyVideo(state.returnPath);
    api.preloadPath(state.peekPath);
    return;
  }

  queuePendingPlaybackCueSeek(state.returnTimeSec);
  deps.applyVideo(state.returnPath);
}

export function isClipPeekActive(): boolean {
  return activePeek != null;
}

export function getClipPeekPreloadPath(deps: ClipPeekDeps, steps: number): string | null {
  if (activePeek) return activePeek.returnPath;
  return resolveClipPeekTargetPath(deps, steps);
}

export function resetClipPeek() {
  activePeek = null;
  setClipPeekTransportActive(false);
}

export function triggerClipPeek(deps: ClipPeekDeps, steps: number, holdSec: number) {
  if (activePeek || isClipZapTransportActive() || isPlaybackCueTransportActive()) return;

  const returnPath = typeof deps.currentVideo === "string" ? deps.currentVideo : "";
  if (!returnPath) return;

  const clampedSteps = clampClipPeekSteps(steps);
  const target = resolveClipPeekTargetPath(deps, clampedSteps);
  if (!target) return;

  const returnTimeSec = readPrimaryVideoTimeSec();
  const win = getHydraWindow();
  const api = win.__hydraClipPeekVideo;
  const clampedHoldSec = clampClipPeekHoldSec(holdSec);

  activePeek = {
    returnPath,
    returnTimeSec,
    remainingSec: clampedHoldSec,
    peekPath: target,
  };
  setClipPeekTransportActive(true);

  if (api?.beginPeek(target, returnPath, returnTimeSec)) {
    win.__hydraClipPeekSkipLoad = target;
    deps.applyVideo(target);
    return;
  }

  markTransportFallbackLoad(target);
  deps.applyVideo(target);
}

export function tickClipPeek(deps: ClipPeekDeps, dt: number) {
  if (!activePeek) return;

  activePeek.remainingSec -= dt;
  if (activePeek.remainingSec > 0) return;

  const state = activePeek;
  activePeek = null;
  restoreClipPeek(deps, state);
}

export function cancelClipPeek(deps: ClipPeekDeps) {
  if (!activePeek) return;
  const state = activePeek;
  activePeek = null;
  restoreClipPeek(deps, state);
}
