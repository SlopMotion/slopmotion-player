import type { MutableRefObject } from "react";
import type { HydraClipPeekVideoApi } from "../types/hydraWindow";
import { clipPathsEquivalent } from "./videoUtils";

export function loopPathFromMediaUrl(url: string): string | null {
  if (!url) return null;
  try {
    return new URL(url, window.location.origin).pathname;
  } catch {
    return null;
  }
}

export function videoElementMatchesLoopPath(el: HTMLVideoElement, loopPath: string): boolean {
  if (!loopPath) return false;
  const src = el.currentSrc || el.src;
  if (!src) return false;
  const fromEl = loopPathFromMediaUrl(src);
  if (!fromEl) return false;
  return clipPathsEquivalent(fromEl, loopPath);
}

export function videoElementHasDecodedFrame(el: HTMLVideoElement): boolean {
  return el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && el.videoWidth > 0;
}

export function seekVideoElement(el: HTMLVideoElement, timeSec: number) {
  const dur = el.duration;
  const eps = 1 / 120;
  let t = Math.max(0, timeSec);
  if (Number.isFinite(dur) && dur > 0) {
    t = el.loop ? ((t % dur) + dur) % dur : Math.min(t, dur - eps);
  }
  el.currentTime = t;
}

export function warmHiddenVideo(el: HTMLVideoElement, playing: boolean) {
  el.muted = true;
  el.loop = true;
  if (playing) {
    if (el.paused) void el.play().catch(() => {});
  } else if (!el.paused) {
    el.pause();
  }
}

export type ClipPeekChannelRefs = {
  activeChannelRef: MutableRefObject<0 | 1>;
  transitionStateRef: MutableRefObject<{ active: boolean; startTime: number; duration: number }>;
  currentVideoRef: MutableRefObject<string | null>;
  preloadedPathRef: MutableRefObject<string | null>;
  syncPlayback: () => void;
  /** Rebuild Hydra output after an instant s0/s1 channel swap. */
  onChannelFlip?: () => void;
  isVideoPlaying: () => boolean;
};

function getClipPeekHydraSources() {
  const win = window as Window & {
    s0?: { src?: unknown; initVideo?: (url: string) => void };
    s1?: { src?: unknown; initVideo?: (url: string) => void };
  };
  return { s0: win.s0, s1: win.s1 };
}

export function createClipPeekVideoApi(refs: ClipPeekChannelRefs): HydraClipPeekVideoApi {
  const inactiveIndex = () => (refs.activeChannelRef.current === 0 ? 1 : 0) as 0 | 1;
  const sourceAt = (index: 0 | 1) =>
    (index === 0 ? getClipPeekHydraSources().s0 : getClipPeekHydraSources().s1);

  let zapReturnChannel: 0 | 1 | null = null;
  let zapMontageChannel: 0 | 1 | null = null;
  let zapPendingPath: string | null = null;

  const zapLoadChannel = (): 0 | 1 =>
    zapMontageChannel ?? inactiveIndex();

  const preloadPath = (path: string | null) => {
    refs.preloadedPathRef.current = path;
    if (!path) return;

    const loadChannel = zapLoadChannel();
    const inactive = sourceAt(loadChannel);
    if (!inactive?.initVideo) return;

    const existing = inactive.src;
    if (
      existing instanceof HTMLVideoElement &&
      videoElementMatchesLoopPath(existing, path) &&
      videoElementHasDecodedFrame(existing)
    ) {
      warmHiddenVideo(existing, refs.isVideoPlaying());
      return;
    }

    inactive.initVideo(path);
    const onReady = () => {
      const el = inactive.src;
      if (!(el instanceof HTMLVideoElement)) return;
      if (!videoElementMatchesLoopPath(el, path)) return;
      el.currentTime = 0;
      warmHiddenVideo(el, refs.isVideoPlaying());
    };
    const el = inactive.src;
    if (el instanceof HTMLVideoElement && el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      onReady();
    } else if (el instanceof HTMLVideoElement) {
      el.addEventListener("loadeddata", onReady, { once: true });
    } else {
      window.setTimeout(onReady, 32);
    }
  };

  const beginPeek = (
    targetPath: string,
    returnPath: string,
    returnTimeSec: number,
    targetTimeSec = 0,
  ) => {
    const inactive = sourceAt(inactiveIndex());
    const inactiveEl = inactive?.src;
    if (!(inactiveEl instanceof HTMLVideoElement) || !videoElementMatchesLoopPath(inactiveEl, targetPath)) {
      return false;
    }
    if (!videoElementHasDecodedFrame(inactiveEl)) return false;

    const active = sourceAt(refs.activeChannelRef.current);
    const activeEl = active?.src;
    if (activeEl instanceof HTMLVideoElement && videoElementMatchesLoopPath(activeEl, returnPath)) {
      seekVideoElement(activeEl, returnTimeSec);
      activeEl.pause();
    }

    refs.activeChannelRef.current = inactiveIndex();
    refs.transitionStateRef.current.active = false;

    seekVideoElement(inactiveEl, targetTimeSec);
    warmHiddenVideo(inactiveEl, refs.isVideoPlaying());

    refs.currentVideoRef.current = targetPath;
    refs.preloadedPathRef.current = null;
    refs.syncPlayback();
    refs.onChannelFlip?.();
    return true;
  };

  const endPeek = (returnPath: string, returnTimeSec: number) => {
    const inactive = sourceAt(inactiveIndex());
    const inactiveEl = inactive?.src;

    if (
      inactiveEl instanceof HTMLVideoElement &&
      videoElementMatchesLoopPath(inactiveEl, returnPath) &&
      videoElementHasDecodedFrame(inactiveEl)
    ) {
      refs.activeChannelRef.current = inactiveIndex();
      refs.transitionStateRef.current.active = false;
      seekVideoElement(inactiveEl, returnTimeSec);
      warmHiddenVideo(inactiveEl, refs.isVideoPlaying());
      refs.currentVideoRef.current = returnPath;
      refs.syncPlayback();
      refs.onChannelFlip?.();
      return true;
    }

    return false;
  };

  const presentZapMontageClip = (path: string) => {
    if (zapMontageChannel == null) return false;
    const montageEl = sourceAt(zapMontageChannel)?.src;
    if (
      !(montageEl instanceof HTMLVideoElement) ||
      !videoElementMatchesLoopPath(montageEl, path) ||
      !videoElementHasDecodedFrame(montageEl)
    ) {
      return false;
    }

    seekVideoElement(montageEl, 0);
    warmHiddenVideo(montageEl, refs.isVideoPlaying());
    refs.activeChannelRef.current = zapMontageChannel;
    refs.transitionStateRef.current.active = false;
    refs.currentVideoRef.current = path;
    refs.preloadedPathRef.current = null;
    refs.syncPlayback();
    refs.onChannelFlip?.();
    return true;
  };

  const beginZap = (returnPath: string, returnTimeSec: number) => {
    zapPendingPath = null;
    zapReturnChannel = refs.activeChannelRef.current;
    zapMontageChannel = inactiveIndex();

    const returnEl = sourceAt(zapReturnChannel)?.src;
    if (
      returnEl instanceof HTMLVideoElement &&
      videoElementMatchesLoopPath(returnEl, returnPath)
    ) {
      seekVideoElement(returnEl, returnTimeSec);
      returnEl.pause();
    }
  };

  const showZapClip = (path: string): "ready" | "loading" | "failed" => {
    if (zapReturnChannel == null || zapMontageChannel == null) return "failed";
    if (presentZapMontageClip(path)) return "ready";
    if (zapPendingPath === path) return "loading";
    const montage = sourceAt(zapMontageChannel);
    if (!montage?.initVideo) return "failed";
    montage.initVideo(path);
    zapPendingPath = path;
    return "loading";
  };

  const completeZapClipLoad = (path: string) => {
    if (zapPendingPath !== path) return false;
    if (!presentZapMontageClip(path)) return false;
    zapPendingPath = null;
    return true;
  };

  const endZap = (returnPath: string, returnTimeSec: number) => {
    if (zapReturnChannel == null) return false;
    const returnEl = sourceAt(zapReturnChannel)?.src;
    if (!(returnEl instanceof HTMLVideoElement) || !videoElementMatchesLoopPath(returnEl, returnPath)) {
      zapReturnChannel = null;
      zapMontageChannel = null;
      zapPendingPath = null;
      return false;
    }
    refs.activeChannelRef.current = zapReturnChannel;
    refs.transitionStateRef.current.active = false;
    seekVideoElement(returnEl, returnTimeSec);
    warmHiddenVideo(returnEl, refs.isVideoPlaying());
    refs.currentVideoRef.current = returnPath;
    refs.syncPlayback();
    refs.onChannelFlip?.();
    zapReturnChannel = null;
    zapMontageChannel = null;
    zapPendingPath = null;
    return true;
  };

  const cancelZap = () => {
    zapReturnChannel = null;
    zapMontageChannel = null;
    zapPendingPath = null;
  };

  return { preloadPath, beginPeek, endPeek, beginZap, showZapClip, completeZapClipLoad, endZap, cancelZap };
}
