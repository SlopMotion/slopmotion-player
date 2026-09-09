import type { MutableRefObject } from "react";
import type { FolderConfig } from "../types/settings";
import { getHydraWindow } from "../types/hydraWindow";
import { clipPathsEquivalent } from "../utils/videoUtils";
import { shouldTransitionCrossfade } from "../utils/fxChainInteraction";
import { isBoomerangCycleActive } from "../utils/boomerangFx";
import type { BoomerangCycleState } from "../utils/boomerangVideo";
import {
  consumeInstantVideoLoad,
  consumeTransportFallbackLoad,
  isClipTransportBusy,
  markVideoLoadInFlight,
} from "../utils/clipTransportGuard";
import { computeParamValue } from "../utils/fxRuntime";
import { applyPendingPlaybackCueSeek } from "../utils/playbackCue";
import { resolveTransitionStyle } from "../utils/transitionStyles";
import { playIfVideo, pauseIfVideo } from "./videoElementPlayback";

export type VideoTransitionState = {
  active: boolean;
  startTime: number;
  duration: number;
  resolvedType: number;
};

export type VideoTransportDeps = {
  settingsRef: MutableRefObject<FolderConfig>;
  activeChannelRef: MutableRefObject<0 | 1>;
  transitionStateRef: MutableRefObject<VideoTransitionState>;
  pendingVideoLoadRef: MutableRefObject<string | null>;
  currentVideoRef: MutableRefObject<string | null>;
  videoLoadSeqRef: MutableRefObject<number>;
  clipLoadFreezeRef: MutableRefObject<boolean>;
  secondaryVideoRef: MutableRefObject<string | undefined>;
  boomerangBridgeReadyRef: MutableRefObject<boolean>;
  boomerangBackingRef: MutableRefObject<{ v0: HTMLVideoElement | null; v1: HTMLVideoElement | null }>;
  boomerangStateRef: MutableRefObject<BoomerangCycleState>;
  syncPlaybackRef: MutableRefObject<(force?: number) => void>;
  applySceneAndRenderRef: MutableRefObject<() => void>;
  bumpLumaDustReset: () => void;
  teardownBoomerangBridge: (opts?: { reloadPath?: string; restoreBacking?: boolean }) => void;
  isPrimaryPlaybackActive: () => boolean;
};

export function createVideoTransport(deps: VideoTransportDeps) {
  const {
    settingsRef,
    activeChannelRef,
    transitionStateRef,
    pendingVideoLoadRef,
    currentVideoRef,
    videoLoadSeqRef,
    clipLoadFreezeRef,
    secondaryVideoRef,
    boomerangBridgeReadyRef,
    boomerangBackingRef,
    boomerangStateRef,
    syncPlaybackRef,
    applySceneAndRenderRef,
    bumpLumaDustReset,
    teardownBoomerangBridge,
    isPrimaryPlaybackActive,
  } = deps;

  const commitActiveTransition = () => {
    if (!transitionStateRef.current.active) return;
    const { s0, s1 } = getHydraWindow();
    if (!s0 || !s1) return;
    const elapsed = performance.now() - transitionStateRef.current.startTime;
    const duration = Math.max(1, transitionStateRef.current.duration);
    const progress = Math.min(1, elapsed / duration);
    const incomingChannel = (activeChannelRef.current === 0 ? 1 : 0) as 0 | 1;
    if (progress >= 0.5) {
      activeChannelRef.current = incomingChannel;
    }
    transitionStateRef.current.active = false;
    const playing = isPrimaryPlaybackActive();
    const idleSrc = activeChannelRef.current === 0 ? s1 : s0;
    const activeSrc = activeChannelRef.current === 0 ? s0 : s1;
    pauseIfVideo(idleSrc.src);
    if (playing) playIfVideo(activeSrc.src);
  };

  const flushPendingVideoLoad = () => {
    const pending = pendingVideoLoadRef.current;
    if (!pending || transitionStateRef.current.active) return;
    pendingVideoLoadRef.current = null;
    if (clipPathsEquivalent(pending, currentVideoRef.current ?? "")) return;
    loadPrimaryVideos(false);
  };

  const loadPrimaryVideos = (force: boolean) => {
    let isCancelled = false;

    const cfg = settingsRef.current;
    const { s0, s1 } = getHydraWindow();
    if (!s0 || !s1 || !cfg.video) return () => {
      isCancelled = true;
    };

    const releaseBoomerangForVideoLoad = () => {
      if (
        boomerangBridgeReadyRef.current ||
        !(s0.src instanceof HTMLVideoElement) ||
        !(s1.src instanceof HTMLVideoElement)
      ) {
        teardownBoomerangBridge({ reloadPath: cfg.video, restoreBacking: false });
        return;
      }
      boomerangBridgeReadyRef.current = false;
      boomerangBackingRef.current = { v0: null, v1: null };
    };

    const skipPath = getHydraWindow().__hydraClipPeekSkipLoad;
    if (skipPath && clipPathsEquivalent(skipPath, cfg.video)) {
      delete getHydraWindow().__hydraClipPeekSkipLoad;
      delete getHydraWindow().__hydraInstantVideoLoad;
      currentVideoRef.current = cfg.video;
      syncPlaybackRef.current();
      applySceneAndRenderRef.current();
      const sec = secondaryVideoRef.current;
      const { s2 } = getHydraWindow();
      if (s2 && sec) {
        s2.initVideo(sec);
      }
      return () => {
        isCancelled = true;
      };
    }

    const allowBusyLoad = consumeTransportFallbackLoad(cfg.video);
    if (isClipTransportBusy() && !allowBusyLoad) {
      transitionStateRef.current.active = false;
      pendingVideoLoadRef.current = null;
      delete getHydraWindow().__hydraInstantVideoLoad;
      currentVideoRef.current = cfg.video;
      syncPlaybackRef.current();
      applySceneAndRenderRef.current();
      return () => {
        isCancelled = true;
      };
    }

    const loadedPath = currentVideoRef.current;
    const pathChanged =
      loadedPath === null ||
      !loadedPath ||
      !clipPathsEquivalent(loadedPath, cfg.video);

    if (!force && !pathChanged) {
      syncPlaybackRef.current();
      applySceneAndRenderRef.current();
      return () => {
        isCancelled = true;
      };
    }

    bumpLumaDustReset();

    if (force) {
      pendingVideoLoadRef.current = null;
    } else if (
      pendingVideoLoadRef.current &&
      clipPathsEquivalent(pendingVideoLoadRef.current, cfg.video)
    ) {
      pendingVideoLoadRef.current = null;
    }

    const playing = isPrimaryPlaybackActive();
    const instantLoad = consumeInstantVideoLoad();
    if (instantLoad) {
      transitionStateRef.current.active = false;
      pendingVideoLoadRef.current = null;
      clipLoadFreezeRef.current = false;
    }
    if (force) {
      clipLoadFreezeRef.current = false;
    }
    const transitionFx = cfg.fx?.transition;
    const wouldCrossfade = shouldTransitionCrossfade({
      playing,
      force,
      instantLoad,
      loadedPath,
      transitionEnabled: !!transitionFx?.enabled,
      boomerangEngaged: isBoomerangCycleActive(boomerangStateRef.current),
    });

    if (wouldCrossfade && transitionStateRef.current.active) {
      pendingVideoLoadRef.current = cfg.video;
      return () => {
        isCancelled = true;
      };
    }

    const loadId = ++videoLoadSeqRef.current;

    const canCrossfade = wouldCrossfade;
    /** Keep outgoing clip alive while incoming loads — Automix, manual next/prev, etc. */
    const useChannelSwap =
      force ||
      instantLoad ||
      (pathChanged && loadedPath != null && !!loadedPath && !canCrossfade);

    const startSecondaryVideo = () => {
      const sec = secondaryVideoRef.current;
      const { s2 } = getHydraWindow();
      if (!s2 || !sec) return;

      s2.initVideo(sec);
      const applyS2 = () => {
        const el = s2.src;
        if (!(el instanceof HTMLVideoElement)) return;
        el.muted = true;
        el.loop = true;
        if (playing) void el.play().catch(() => {});
        else {
          try {
            el.currentTime = 0;
          } catch {
            /* noop */
          }
          el.pause();
        }
      };
      const el = s2.src;
      if (el instanceof HTMLVideoElement && el.readyState >= 2) applyS2();
      else if (el instanceof HTMLVideoElement) el.addEventListener("loadeddata", applyS2, { once: true });
      else setTimeout(applyS2, 500);
    };

    /** Preload on inactive channel, swap when ready; outgoing keeps playing until swap. */
    if (useChannelSwap) {
      transitionStateRef.current.active = false;
      releaseBoomerangForVideoLoad();

      const outgoingSrc = activeChannelRef.current === 0 ? s0 : s1;
      const incomingSrc = activeChannelRef.current === 0 ? s1 : s0;
      let swapDone = false;
      markVideoLoadInFlight(true);

      const completeSwap = () => {
        if (swapDone) return;
        swapDone = true;
        if (isCancelled || videoLoadSeqRef.current !== loadId) return;
        const el = incomingSrc.src;
        if (!(el instanceof HTMLVideoElement)) {
          clipLoadFreezeRef.current = false;
          markVideoLoadInFlight(false);
          return;
        }
        el.muted = true;
        el.loop = true;
        if (isPrimaryPlaybackActive()) void el.play().catch(() => {});
        else {
          try {
            el.currentTime = 0;
          } catch {
            /* noop */
          }
          el.pause();
        }
        activeChannelRef.current = activeChannelRef.current === 0 ? 1 : 0;
        const outEl = outgoingSrc.src;
        if (outEl instanceof HTMLVideoElement && outEl !== el) outEl.pause();
        currentVideoRef.current = cfg.video;
        applyPendingPlaybackCueSeek();
        syncPlaybackRef.current();
        startSecondaryVideo();
        clipLoadFreezeRef.current = false;
        markVideoLoadInFlight(false);
        applySceneAndRenderRef.current();
      };

      const waitIncoming = () => {
        if (isCancelled || videoLoadSeqRef.current !== loadId || swapDone) return;
        const el = incomingSrc.src;
        if (!(el instanceof HTMLVideoElement)) {
          requestAnimationFrame(waitIncoming);
          return;
        }
        if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) completeSwap();
        else {
          const onReady = () => completeSwap();
          el.addEventListener("loadeddata", onReady, { once: true });
          el.addEventListener("canplay", onReady, { once: true });
        }
      };

      incomingSrc.initVideo(cfg.video);
      waitIncoming();

      const hardTimeout = window.setTimeout(() => {
        if (isCancelled || videoLoadSeqRef.current !== loadId || swapDone) return;
        swapDone = true;
        clipLoadFreezeRef.current = true;
        pauseIfVideo(s0.src);
        pauseIfVideo(s1.src);
        s0.initVideo(cfg.video);
        s1.initVideo(cfg.video);
        currentVideoRef.current = cfg.video;
        activeChannelRef.current = 0;

        const finishBrutal = () => {
          if (isCancelled || videoLoadSeqRef.current !== loadId) return;
          const el0 = s0.src;
          const el1 = s1.src;
          if (!(el0 instanceof HTMLVideoElement) || !(el1 instanceof HTMLVideoElement)) {
            clipLoadFreezeRef.current = false;
            markVideoLoadInFlight(false);
            return;
          }
          for (const vid of [el0, el1]) {
            vid.muted = true;
            vid.loop = true;
            if (isPrimaryPlaybackActive()) void vid.play().catch(() => {});
            else vid.pause();
          }
          syncPlaybackRef.current();
          startSecondaryVideo();
          clipLoadFreezeRef.current = false;
          markVideoLoadInFlight(false);
          applySceneAndRenderRef.current();
        };

        const waitBrutal = () => {
          if (isCancelled || videoLoadSeqRef.current !== loadId) return;
          const el0 = s0.src;
          const el1 = s1.src;
          if (!(el0 instanceof HTMLVideoElement) || !(el1 instanceof HTMLVideoElement)) {
            requestAnimationFrame(waitBrutal);
            return;
          }
          finishBrutal();
        };
        waitBrutal();
      }, 3000);

      return () => {
        isCancelled = true;
        window.clearTimeout(hardTimeout);
        clipLoadFreezeRef.current = false;
        markVideoLoadInFlight(false);
      };
    }

    if (canCrossfade) {
      if (transitionStateRef.current.active) {
        commitActiveTransition();
      }

      releaseBoomerangForVideoLoad();

      const outgoingSrc = activeChannelRef.current === 0 ? s0 : s1;
      const incomingSrc = activeChannelRef.current === 0 ? s1 : s0;
      const outgoingEl = outgoingSrc.src;
      const preservedTime =
        outgoingEl instanceof HTMLVideoElement && Number.isFinite(outgoingEl.currentTime)
          ? outgoingEl.currentTime
          : 0;

      const durationSec = Math.max(
        0.05,
        computeParamValue("transition", transitionFx, "duration", 1.0, getHydraWindow().customBands),
      );

      const startCrossfade = () => {
        if (isCancelled || videoLoadSeqRef.current !== loadId) return;
        const el = incomingSrc.src;
        if (!(el instanceof HTMLVideoElement)) return;

        el.muted = true;
        el.loop = true;

        let transitionBegun = false;
        const beginTransition = () => {
          if (transitionBegun) return;
          transitionBegun = true;
          if (isCancelled || videoLoadSeqRef.current !== loadId) return;
          clipLoadFreezeRef.current = false;
          if (playing) {
            void el.play().catch(() => {});
            const out = outgoingSrc.src;
            if (out instanceof HTMLVideoElement && out.paused) void out.play().catch(() => {});
          } else {
            el.pause();
          }
          syncPlaybackRef.current();

          const resolvedType = resolveTransitionStyle(
            Number(transitionFx.params?.type ?? 0),
          );
          transitionStateRef.current = {
            active: true,
            startTime: performance.now(),
            duration: durationSec * 1000,
            resolvedType,
          };

          startSecondaryVideo();
          applySceneAndRenderRef.current();
        };

        const syncTime = () => {
          if (applyPendingPlaybackCueSeek()) return;
          if (!Number.isFinite(preservedTime) || preservedTime < 0) return;
          const dur = el.duration;
          if (Number.isFinite(dur) && dur > 0) {
            el.currentTime = preservedTime % dur;
          } else {
            el.currentTime = preservedTime;
          }
        };
        if (el.readyState >= HTMLMediaElement.HAVE_METADATA) syncTime();
        else el.addEventListener("loadedmetadata", syncTime, { once: true });

        if (el.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) beginTransition();
        else {
          el.addEventListener("loadeddata", beginTransition, { once: true });
          el.addEventListener("canplay", beginTransition, { once: true });
        }
      };

      let crossfadeStarted = false;
      const wrappedStartCrossfade = () => {
        if (crossfadeStarted) return;
        crossfadeStarted = true;
        startCrossfade();
      };
      const waitForIncomingCommitted = () => {
        if (isCancelled || videoLoadSeqRef.current !== loadId) return;
        const el = incomingSrc.src;
        if (!(el instanceof HTMLVideoElement)) {
          requestAnimationFrame(waitForIncomingCommitted);
          return;
        }
        wrappedStartCrossfade();
      };

      incomingSrc.initVideo(cfg.video);
      currentVideoRef.current = cfg.video;
      waitForIncomingCommitted();

      const crossfadeTimeout = window.setTimeout(() => {
        if (isCancelled || videoLoadSeqRef.current !== loadId || crossfadeStarted) return;
        crossfadeStarted = true;
        transitionStateRef.current.active = false;
        releaseBoomerangForVideoLoad();
        clipLoadFreezeRef.current = true;
        pauseIfVideo(s0.src);
        pauseIfVideo(s1.src);
        s0.initVideo(cfg.video);
        s1.initVideo(cfg.video);
        currentVideoRef.current = cfg.video;
        activeChannelRef.current = 0;

        const finishFallback = () => {
          if (isCancelled || videoLoadSeqRef.current !== loadId) return;
          const el0 = s0.src;
          const el1 = s1.src;
          if (!(el0 instanceof HTMLVideoElement) || !(el1 instanceof HTMLVideoElement)) {
            clipLoadFreezeRef.current = false;
            return;
          }
          for (const vid of [el0, el1]) {
            vid.muted = true;
            vid.loop = true;
            if (isPrimaryPlaybackActive()) void vid.play().catch(() => {});
            else vid.pause();
          }
          syncPlaybackRef.current();
          startSecondaryVideo();
          applySceneAndRenderRef.current();
          clipLoadFreezeRef.current = false;
        };

        const waitFallback = () => {
          if (isCancelled || videoLoadSeqRef.current !== loadId) return;
          const el0 = s0.src;
          const el1 = s1.src;
          if (!(el0 instanceof HTMLVideoElement) || !(el1 instanceof HTMLVideoElement)) {
            requestAnimationFrame(waitFallback);
            return;
          }
          finishFallback();
        };
        waitFallback();
      }, 4000);

      return () => {
        isCancelled = true;
        window.clearTimeout(crossfadeTimeout);
        clipLoadFreezeRef.current = false;
      };
    }

    transitionStateRef.current.active = false;
    releaseBoomerangForVideoLoad();

    clipLoadFreezeRef.current = true;

    pauseIfVideo(s0.src);
    pauseIfVideo(s1.src);

    s0.initVideo(cfg.video);
    s1.initVideo(cfg.video);
    currentVideoRef.current = cfg.video;
    activeChannelRef.current = 0;

    const startBoth = () => {
      if (isCancelled || videoLoadSeqRef.current !== loadId) return;
      const el0 = s0.src;
      const el1 = s1.src;
      if (!(el0 instanceof HTMLVideoElement) || !(el1 instanceof HTMLVideoElement)) {
        clipLoadFreezeRef.current = false;
        return;
      }

      for (const el of [el0, el1]) {
        el.muted = true;
        el.loop = true;
        if (isPrimaryPlaybackActive()) void el.play().catch(() => {});
        else {
          try {
            el.currentTime = 0;
          } catch {
            /* noop */
          }
          el.pause();
        }
      }
      applyPendingPlaybackCueSeek();
      syncPlaybackRef.current();
      transitionStateRef.current.active = false;
      activeChannelRef.current = 0;
      startSecondaryVideo();
      clipLoadFreezeRef.current = false;
      applySceneAndRenderRef.current();
    };

    const waitForBoth = () => {
      if (isCancelled || videoLoadSeqRef.current !== loadId) return;
      const el0 = s0.src;
      const el1 = s1.src;
      if (!(el0 instanceof HTMLVideoElement) || !(el1 instanceof HTMLVideoElement)) {
        requestAnimationFrame(waitForBoth);
        return;
      }
      if (el0.readyState >= 2 && el1.readyState >= 2) {
        startBoth();
        return;
      }
      let pending = 0;
      const done = () => {
        pending -= 1;
        if (pending <= 0) startBoth();
      };
      if (el0.readyState < 2) {
        pending += 1;
        el0.addEventListener("loadeddata", done, { once: true });
        el0.addEventListener("canplay", done, { once: true });
      }
      if (el1.readyState < 2) {
        pending += 1;
        el1.addEventListener("loadeddata", done, { once: true });
        el1.addEventListener("canplay", done, { once: true });
      }
      if (pending <= 0) startBoth();
    };

    const directLoadTimeout = window.setTimeout(() => {
      if (isCancelled || videoLoadSeqRef.current !== loadId) return;
      startBoth();
    }, 2000);

    waitForBoth();

    return () => {
      isCancelled = true;
      window.clearTimeout(directLoadTimeout);
      clipLoadFreezeRef.current = false;
    };
  };

  return { loadPrimaryVideos, flushPendingVideoLoad };
}
