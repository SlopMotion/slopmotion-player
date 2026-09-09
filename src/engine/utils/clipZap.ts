import { getHydraWindow } from "../types/hydraWindow";
import type { ClipPeekDeps } from "./clipPlaylistAdvance";
import { resolveUpcomingClipPaths } from "./clipPlaylistAdvance";
import { queuePendingPlaybackCueSeek } from "./playbackCue";
import { LOOP_SOURCE_FPS } from "./loopPlayback";
import {
  isClipPeekTransportActive,
  isPlaybackCueTransportActive,
  markInstantVideoLoad,
  setClipZapTransportActive,
} from "./clipTransportGuard";

type ClipZapState = {
  returnPath: string;
  returnTimeSec: number;
  paths: string[];
  clipIndex: number;
  clipRemainingSec: number;
  waitingLoad: boolean;
  waitingLoadSec: number;
  frameDurationSec: number;
};

let activeZap: ClipZapState | null = null;

const ZAP_LOAD_TIMEOUT_SEC = 2.5;

export const ZAP_CLIP_COUNT_MIN = 1;
export const ZAP_CLIP_COUNT_MAX = 8;
export const ZAP_FRAMES_PER_CLIP_MIN = 1;
export const ZAP_FRAMES_PER_CLIP_MAX = 12;

export function clampZapClipCount(value: number): number {
  return Math.max(ZAP_CLIP_COUNT_MIN, Math.min(ZAP_CLIP_COUNT_MAX, Math.round(value)));
}

export function clampZapFramesPerClip(value: number): number {
  return Math.max(ZAP_FRAMES_PER_CLIP_MIN, Math.min(ZAP_FRAMES_PER_CLIP_MAX, Math.round(value)));
}

export function clipZapMontageSec(clipCount: number, framesPerClip: number): number {
  return (clampZapClipCount(clipCount) * clampZapFramesPerClip(framesPerClip)) / LOOP_SOURCE_FPS;
}

function syncHydraSceneAfterTransportFlip() {
  getHydraWindow().__hydraApplyScene?.();
}

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

function clipDurationSec(framesPerClip: number): number {
  const frames = clampZapFramesPerClip(framesPerClip);
  return Math.max(1 / LOOP_SOURCE_FPS, frames / LOOP_SOURCE_FPS);
}

function showCurrentZapClip(deps: ClipPeekDeps, state: ClipZapState): boolean {
  const path = state.paths[state.clipIndex];
  if (!path) return false;

  const win = getHydraWindow();
  const api = win.__hydraClipPeekVideo;
  const result = api?.showZapClip(path) ?? "failed";

  if (result === "ready") {
    state.waitingLoad = false;
    state.waitingLoadSec = 0;
    state.clipRemainingSec = state.frameDurationSec;
    win.__hydraClipPeekSkipLoad = path;
    deps.applyVideo(path);
    syncHydraSceneAfterTransportFlip();
    const nextPath = state.paths[state.clipIndex + 1];
    if (nextPath) api?.preloadPath(nextPath);
    return true;
  }

  if (result === "loading") {
    state.waitingLoad = true;
    state.waitingLoadSec = 0;
    state.clipRemainingSec = 0;
    return true;
  }

  activeZap = null;
  abortClipZap(deps, state);
  return false;
}

function restoreClipZap(deps: ClipPeekDeps, state: ClipZapState) {
  setClipZapTransportActive(false);
  const win = getHydraWindow();
  const api = win.__hydraClipPeekVideo;
  if (api?.endZap(state.returnPath, state.returnTimeSec)) {
    win.__hydraClipPeekSkipLoad = state.returnPath;
    deps.applyVideo(state.returnPath);
    const first = state.paths[0];
    if (first) api.preloadPath(first);
    return;
  }

  queuePendingPlaybackCueSeek(state.returnTimeSec);
  deps.applyVideo(state.returnPath);
}

function abortClipZap(deps: ClipPeekDeps, state: ClipZapState) {
  getHydraWindow().__hydraClipPeekVideo?.cancelZap?.();
  markInstantVideoLoad();
  restoreClipZap(deps, state);
}

export function isClipZapActive(): boolean {
  return activeZap != null;
}

export function getClipZapPreloadPath(deps: ClipPeekDeps, clipCount: number): string | null {
  const count = clampZapClipCount(clipCount);
  if (activeZap) {
    const next = activeZap.paths[activeZap.clipIndex + 1];
    return next ?? activeZap.returnPath;
  }
  const paths = resolveUpcomingClipPaths(deps, count);
  return paths[0] ?? null;
}

export function resetClipZap() {
  activeZap = null;
  setClipZapTransportActive(false);
  getHydraWindow().__hydraClipPeekVideo?.cancelZap?.();
}

export function triggerClipZap(
  deps: ClipPeekDeps,
  clipCount: number,
  framesPerClip: number,
) {
  if (activeZap || isClipPeekTransportActive() || isPlaybackCueTransportActive()) return;

  const count = clampZapClipCount(clipCount);
  const frames = clampZapFramesPerClip(framesPerClip);

  const returnPath = typeof deps.currentVideo === "string" ? deps.currentVideo : "";
  if (!returnPath) return;

  const paths = resolveUpcomingClipPaths(deps, count);
  if (paths.length === 0) return;

  const returnTimeSec = readPrimaryVideoTimeSec();
  const win = getHydraWindow();
  const api = win.__hydraClipPeekVideo;
  api?.beginZap(returnPath, returnTimeSec);
  api?.preloadPath(paths[0] ?? null);

  activeZap = {
    returnPath,
    returnTimeSec,
    paths,
    clipIndex: 0,
    clipRemainingSec: 0,
    waitingLoad: true,
    waitingLoadSec: 0,
    frameDurationSec: clipDurationSec(frames),
  };
  setClipZapTransportActive(true);

  if (!showCurrentZapClip(deps, activeZap)) {
    activeZap = null;
  }
}

export function tickClipZap(deps: ClipPeekDeps, dt: number) {
  if (!activeZap) return;

  const state = activeZap;
  const win = getHydraWindow();
  const api = win.__hydraClipPeekVideo;
  const path = state.paths[state.clipIndex];

  if (state.waitingLoad && path) {
    state.waitingLoadSec += dt;
    if (api?.completeZapClipLoad(path)) {
      state.waitingLoad = false;
      state.waitingLoadSec = 0;
      state.clipRemainingSec = state.frameDurationSec;
      win.__hydraClipPeekSkipLoad = path;
      deps.applyVideo(path);
      syncHydraSceneAfterTransportFlip();
      const nextPath = state.paths[state.clipIndex + 1];
      if (nextPath) api.preloadPath(nextPath);
    } else if (state.waitingLoadSec >= ZAP_LOAD_TIMEOUT_SEC) {
      const snapshot = { ...state };
      activeZap = null;
      abortClipZap(deps, snapshot);
      syncHydraSceneAfterTransportFlip();
    }
    return;
  }

  state.clipRemainingSec -= dt;
  if (state.clipRemainingSec > 0) return;

  state.clipIndex += 1;
  if (state.clipIndex >= state.paths.length) {
    activeZap = null;
    restoreClipZap(deps, state);
    return;
  }

  state.waitingLoad = true;
  state.waitingLoadSec = 0;
  state.clipRemainingSec = 0;
  showCurrentZapClip(deps, state);
}

export function cancelClipZap(deps: ClipPeekDeps) {
  if (!activeZap) return;
  const state = activeZap;
  activeZap = null;
  restoreClipZap(deps, state);
}
