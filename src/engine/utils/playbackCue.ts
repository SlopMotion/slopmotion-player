import { getHydraWindow } from "../types/hydraWindow";
import type { FXConfig } from "../types/settings";
import {
  seekVideoElement,
  videoElementHasDecodedFrame,
  videoElementMatchesLoopPath,
} from "./clipPeekVideo";
import { resolvePlaybackCueClipPath } from "./playbackCueSource";
import { LOOP_SOURCE_FPS } from "./loopPlayback";

type PlaybackCueParams = FXConfig["params"];

type CueSource = { path: string }[];

type PlaybackCueState = {
  slot: number;
  remainingSec: number;
  frozen: boolean;
  library: CueSource;
  params?: PlaybackCueParams;
};

let activeCue: PlaybackCueState | null = null;

export function frameToSeekSec(frame: number): number {
  return Math.max(0, frame / LOOP_SOURCE_FPS);
}

type VideoLike = {
  currentTime: number;
  duration?: number;
  loop?: boolean;
  pause?: () => void;
  play?: () => Promise<void> | void;
  muted?: boolean;
};

function isVideoLike(el: unknown): el is VideoLike {
  return (
    !!el &&
    typeof el === "object" &&
    "currentTime" in el &&
    Number.isFinite((el as VideoLike).currentTime)
  );
}

function isHtmlVideo(el: unknown): el is HTMLVideoElement {
  return typeof HTMLVideoElement !== "undefined" && el instanceof HTMLVideoElement;
}

function resumeVideo(el: VideoLike) {
  const played = el.play?.();
  if (played && typeof played === "object" && "catch" in played) {
    void (played as Promise<void>).catch(() => {});
  }
}

function seekVideoLike(el: VideoLike, timeSec: number) {
  if (isHtmlVideo(el)) {
    seekVideoElement(el, timeSec);
    return;
  }
  const dur = el.duration;
  const eps = 1 / 120;
  let t = Math.max(0, timeSec);
  if (Number.isFinite(dur) && dur && dur > 0) {
    t = el.loop ? ((t % dur) + dur) % dur : Math.min(t, dur - eps);
  }
  el.currentTime = t;
}

/** Peek / Zap restore still seek the primary channels after a clip swap. */
export function seekHydraPrimaryVideos(timeSec: number) {
  const win = getHydraWindow();
  for (const key of ["s0", "s1"] as const) {
    const el = win[key]?.src;
    if (!isVideoLike(el)) continue;
    seekVideoLike(el, timeSec);
  }
}

export function queuePendingPlaybackCueSeek(timeSec: number) {
  getHydraWindow().__hydraPendingPlaybackCueSeek = timeSec;
}

export function applyPendingPlaybackCueSeek() {
  const pending = getHydraWindow().__hydraPendingPlaybackCueSeek;
  if (pending == null || !Number.isFinite(pending)) return false;
  delete getHydraWindow().__hydraPendingPlaybackCueSeek;
  seekHydraPrimaryVideos(pending);
  return true;
}

function applyCueOnS2(timeSec: number, freeze: boolean) {
  const el = getHydraWindow().s2?.src;
  if (!isVideoLike(el)) return;
  if (isHtmlVideo(el)) {
    el.muted = true;
    el.loop = true;
  }
  seekVideoLike(el, timeSec);
  if (freeze) {
    el.pause?.();
    return;
  }
  resumeVideo(el);
}

function loadCueClip(path: string, timeSec: number, freeze: boolean) {
  const s2 = getHydraWindow().s2;
  if (!s2) return;

  const existing = s2.src;
  if (
    isHtmlVideo(existing) &&
    videoElementMatchesLoopPath(existing, path) &&
    videoElementHasDecodedFrame(existing)
  ) {
    applyCueOnS2(timeSec, freeze);
    return;
  }

  s2.initVideo?.(path);
  const el = s2.src;
  const readyFloor =
    typeof HTMLMediaElement !== "undefined" ? HTMLMediaElement.HAVE_CURRENT_DATA : 2;
  if (isHtmlVideo(el) && el.readyState < readyFloor) {
    el.addEventListener("loadeddata", () => applyCueOnS2(timeSec, freeze), { once: true });
    return;
  }
  applyCueOnS2(timeSec, freeze);
}

function restoreIdleOverlay(state: PlaybackCueState) {
  const idlePath = resolvePlaybackCueClipPath(state.library, state.params, 1);
  const el = getHydraWindow().s2?.src;
  if (
    idlePath &&
    isHtmlVideo(el) &&
    videoElementMatchesLoopPath(el, idlePath)
  ) {
    resumeVideo(el);
    return;
  }
  if (idlePath) loadCueClip(idlePath, 0, false);
  else if (isVideoLike(el)) resumeVideo(el);
}

export function isPlaybackCueActive(): boolean {
  return activeCue != null;
}

export function isPlaybackCueFrozen(): boolean {
  return !!activeCue?.frozen;
}

/** Clip shown on s2 while idle (slot 1) or during a triggered hold. */
export function getPlaybackCueDisplaySlot(): number {
  return activeCue?.slot ?? 1;
}

export function resetPlaybackCue() {
  activeCue = null;
}

export function triggerPlaybackCue(
  library: CueSource,
  slot: number,
  frame: number,
  holdSec: number,
  params?: PlaybackCueParams,
) {
  const cuePath = resolvePlaybackCueClipPath(library, params, slot);
  if (!cuePath) return;

  const hold = Math.max(0.05, holdSec);
  activeCue = {
    slot,
    remainingSec: hold,
    frozen: true,
    library,
    params,
  };
  loadCueClip(cuePath, frameToSeekSec(frame), true);
}

export function tickPlaybackCue(dt: number) {
  if (!activeCue) return;

  activeCue.remainingSec -= dt;
  if (activeCue.remainingSec > 0) return;

  const state = activeCue;
  activeCue = null;
  restoreIdleOverlay(state);
}

export function cancelPlaybackCue() {
  if (!activeCue) return;
  const state = activeCue;
  activeCue = null;
  restoreIdleOverlay(state);
}
