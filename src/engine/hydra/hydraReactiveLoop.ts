import type { MutableRefObject } from "react";
import type { FolderConfig, FXConfig } from "../types/settings";
import { getHydraWindow } from "../types/hydraWindow";
import {
  BACKGROUND_TICK_MS,
  HYDRA_FPS_BACKGROUND,
  HYDRA_FPS_IDLE,
  HYDRA_FPS_REACTIVE_IDLE,
  IDLE_TICK_MS,
} from "../hooks/useDocumentVisible";
import {
  isHydraRenderPaused,
  recoverStuckHydraResize,
} from "../utils/hydraResizeGate";
import { setHydraClockSpeed } from "../utils/hydraClock";
import type { HydraInstance } from "../types/hydraWindow";
import {
  bindOverlayCanvasSource,
  getOverlayHydraSource,
  overlayTemplateKeyFromEffectKey,
  resolveLiveOverlayFx,
  type OverlayCanvasBindState,
} from "../utils/overlayCanvasSource";
import { paramBindingFromFx, bindingIsTriggered, resolveBindingEnvelope } from "../utils/paramBinding";
import { normalizeModulation } from "../utils/modulationSources";
import {
  createTriggeredBindingRuntime,
  clearTriggeredBindingRuntime,
  fireOneShotEnvelope,
  stepTriggeredBinding,
  triggeredRuntimeHasMotion,
  type TriggeredBindingRuntime,
} from "../utils/modulationEngine";
import { isTriggerOnlyFx } from "../data/fxConfig";
import { pushTriggerLogEvent } from "../utils/triggerEventLog";
import {
  SLOWMO_DURATION_DEFAULT,
  slowmoEnvelopeFromDuration,
  slowmoPulseDurationSec,
} from "../utils/slowmoFx";
import {
  ACCELERATE_DURATION_DEFAULT,
  accelerateEnvelopeFromDuration,
  acceleratePulseDurationSec,
} from "../utils/accelerateFx";
import { beatAtSec } from "../utils/triggerDebugHighway";
import {
  beginBoomerangCycle,
  captureBoomerangPair,
  disposeBoomerangFrames,
  drawBitmapToCanvas,
  drawVideoToCanvas,
  isBoomerangBridgeLive,
  primaryTransportVideos,
  refreshBoomerangCanvasPair,
  resetBoomerangCaptureState,
  stepBoomerangReplay,
  stepBoomerangReverse,
} from "../utils/boomerangVideo";
import {
  isBoomerangCycleActive,
  resolveBoomerangSegmentSec,
} from "../utils/boomerangFx";
import { shouldSuppressTransportTriggerWhenBoomerangEngaged } from "../utils/fxChainInteraction";
import { DEFAULT_VIDEO_SPEED_BASE } from "../utils/videoUtils";
import { resolveSecondaryVideoFxEntry } from "../utils/playsetLibraryHelpers";
import {
  isPlaybackSpeedPulseMapped,
  resolveSmoothedVideoSpeed,
  VIDEO_SPEED_DECODER_MIN,
} from "../utils/videoPlaybackSpeed";
import type { PerfVideoPresentationMode } from "../hooks/useVideoPresentedFps";
import {
  computeFxAmount,
  computeParamValue,
  getBandValue,
  getTriggerBandLevel,
  FX_AMT_01,
} from "../utils/fxRuntime";
import {
  advanceDegaussSmooth,
  computeDegaussTarget,
  degaussDriveForFx,
} from "../utils/degaussAmplitude";
import {
  advanceVibrationSmooth,
  computeVibrationTarget,
  vibrationDriveForFx,
} from "../utils/vibrationAmplitude";
import { pushVideoSpeedCurveSample } from "../utils/videoSpeedCurveRing";
import {
  pushOscilloscopeFromBands,
  pushOscilloscopeFromPeaks,
  oscilloscopeColorsFromParams,
  syncOscilloscopeWaveformTexture,
  type OscilloscopeWaveformBundle,
} from "../utils/oscilloscopeWaveform";
import { metalSphereUsesLiveEnvMap, syncMetalSphereEnvMap, type MetalSphereEnvBundle } from "../utils/metalSphereEnvMap";
import {
  neonGridSpawnFromParams,
  neonGridDrawFromParams,
  spawnNeonGridLines,
  type NeonGridBundle,
} from "../utils/neonGridLines";
import { advanceNeonGridFrame, type NeonGridRuntimeState } from "../utils/neonGridRuntime";
import { advanceGridShuffleSeed } from "../utils/gridShuffleRuntime";
import { advanceThroughTheStarsFrame } from "../utils/throughTheStarsRuntime";
import type { ThroughTheStarsBundle } from "../utils/throughTheStarsCanvas";
import { advanceLumaDustFrame } from "../utils/lumaDustRuntime";
import type { LumaDustBundle } from "../utils/lumaDustCanvas";
import { advanceLumaLockFrame } from "../utils/lumaLockRuntime";
import type { LumaLockBundle } from "../utils/lumaLockCanvas";
import { advanceTextLayerFrame, type TextLayerRuntimeState } from "../utils/textLayerRuntime";
import type { TextLayerBundle } from "../utils/textLayerOverlay";
import {
  createElectricNoiseTriggerCircles,
  packElectricNoiseTriggerCircles,
  spawnElectricNoiseTriggerCircle,
  type ElectricNoiseCirclePack,
  type ElectricNoiseTriggerCircle,
} from "../utils/electricNoiseTriggerCircles";
import { uploadElectricNoiseTriggerTexture } from "../utils/electricNoiseTriggerTex";
import {
  cancelClipPeek,
  clampClipPeekHoldSec,
  clampClipPeekSteps,
  isClipPeekActive,
  resetClipPeek,
  tickClipPeek,
  type ClipPeekDeps,
} from "../utils/clipPeek";
import {
  cancelClipZap,
  isClipZapActive,
  resetClipZap,
  tickClipZap,
  triggerClipZap,
} from "../utils/clipZap";
import {
  cancelPlaybackCue,
  isPlaybackCueActive,
  isPlaybackCueFrozen,
  tickPlaybackCue,
} from "../utils/playbackCue";
import { playbackCueEventCount, playbackCueFrameFromParams } from "../utils/playbackCueSlots";
import {
  advanceVideoJumpCut,
  computeJumpCutAdvanceSec,
  computeStutterBackRewindSec,
  seekVideoByDelta,
} from "../utils/videoSeek";
import { triggerClipPeek } from "../utils/clipPeek";
import {
  countNewStemMappedHits,
  pruneStemMappedSeen,
  stemMappedHitEvents,
} from "../utils/stemMappedTriggers";
import { isStemMappedBand } from "../utils/orbitTriggerBands";
import type { ReactiveTriggerDescriptor } from "./reactiveTriggers";
import { playIfVideo, pauseIfVideo } from "./videoElementPlayback";
import type { VideoTransitionState } from "./videoTransport";
import {
  isHydraOutputLive,
  isOutputDrivingVisuals,
  registerOutputLivePump,
  shouldThrottleHiddenVisuals,
} from "../utils/hydraOutputStream";

const seekVideoManual = (
  v: HTMLVideoElement | HTMLCanvasElement | null | undefined,
  speed: number,
  dt: number,
) => {
  if (!(v instanceof HTMLVideoElement)) return;
  if (!v.paused) v.pause();
  if (speed <= 0) return;
  let newTime = v.currentTime + speed * dt;
  if (v.duration) {
    if (newTime < 0) {
      newTime = v.loop ? v.duration + (newTime % v.duration) : 0;
    } else if (newTime >= v.duration) {
      newTime = v.loop ? newTime % v.duration : v.duration;
    }
  }
  v.currentTime = newTime;
};

const resolveSecondaryPlaybackSpeed = (fxKey: string, secondaryFx: FXConfig) =>
  computeParamValue(
    fxKey,
    secondaryFx,
    "playbackSpeed",
    DEFAULT_VIDEO_SPEED_BASE,
    getHydraWindow().customBands,
  );

export type HydraReactiveLoopDeps = {
  settingsRef: MutableRefObject<FolderConfig>;
  studioModeRef: MutableRefObject<boolean>;
  bpmRef: MutableRefObject<number>;
  hydraRef: MutableRefObject<HydraInstance | null>;
  hydraRenderBudgetKeyRef: MutableRefObject<string>;
  syncHydraRenderBudgetRef: MutableRefObject<(hasPulseTail?: boolean) => void>;
  runHydraTickRef: MutableRefObject<(dtMs: number) => void>;
  hydraResizePauseRef: MutableRefObject<(() => void) | null>;
  hydraResizeResumeRef: MutableRefObject<(() => void) | null>;
  syncElectricNoiseTriggerTexRef: MutableRefObject<() => void>;
  transitionStateRef: MutableRefObject<VideoTransitionState>;
  pendingVideoLoadRef: MutableRefObject<string | null>;
  activeChannelRef: MutableRefObject<0 | 1>;
  clipLoadFreezeRef: MutableRefObject<boolean>;
  clipPeekDepsRef: MutableRefObject<ClipPeekDeps | undefined>;
  onPlaybackCueRef: MutableRefObject<
    ((slot: number, frame: number, holdSec: number, params: Record<string, unknown>) => void) | undefined
  >;
  boomerangBridgeReadyRef: MutableRefObject<boolean>;
  boomerangBackingRef: MutableRefObject<{ v0: HTMLVideoElement | null; v1: HTMLVideoElement | null }>;
  boomerangCanvasBundleRef: MutableRefObject<{
    c0: HTMLCanvasElement;
    c1: HTMLCanvasElement;
    ctx0: CanvasRenderingContext2D;
    ctx1: CanvasRenderingContext2D;
  } | null>;
  boomerangStateRef: MutableRefObject<{
    active: boolean;
    pendingTrigger: boolean;
    phase: "forward" | "reverse" | "replay";
    segmentStart0: number;
    segmentStart1: number;
    segmentEnd0: number;
    captureAccum: number;
    capturePending: boolean;
    reverseIdx: number;
    completeAfterReverse: boolean;
    frames: { frames0: ImageBitmap[]; frames1: ImageBitmap[] };
    lastFrameTime: number;
  }>;
  boomerangCaptureFpsCapRef: MutableRefObject<number>;
  boomerangMaxFramesCapRef: MutableRefObject<number>;
  currentSpeedSmoothedRef: MutableRefObject<number>;
  fxReactiveTriggerGateRef: MutableRefObject<boolean>;
  reactiveTriggerDescriptorsRef: MutableRefObject<ReactiveTriggerDescriptor[]>;
  electricNoiseCirclesRef: MutableRefObject<ElectricNoiseTriggerCircle[]>;
  electricNoiseCirclePackRef: MutableRefObject<ElectricNoiseCirclePack>;
  neonGridBundleRef: MutableRefObject<NeonGridBundle | null>;
  neonGridBridgeReadyRef: MutableRefObject<boolean>;
  neonGridRuntimeRef: MutableRefObject<NeonGridRuntimeState>;
  s3OverlayBindRef: MutableRefObject<OverlayCanvasBindState>;
  throughTheStarsBundleRef: MutableRefObject<ThroughTheStarsBundle | null>;
  throughTheStarsBridgeReadyRef: MutableRefObject<boolean>;
  lumaDustBundleRef: MutableRefObject<LumaDustBundle | null>;
  lumaDustBridgeReadyRef: MutableRefObject<boolean>;
  lumaLockBundleRef: MutableRefObject<LumaLockBundle | null>;
  lumaLockBridgeReadyRef: MutableRefObject<boolean>;
  textLayerBundleRef: MutableRefObject<TextLayerBundle | null>;
  textLayerBridgeReadyRef: MutableRefObject<boolean>;
  textLayerRuntimeRef: MutableRefObject<TextLayerRuntimeState>;
  oscilloscopeBundleRef: MutableRefObject<OscilloscopeWaveformBundle | null>;
  oscilloscopeBridgeReadyRef: MutableRefObject<boolean>;
  metalEnvBundleRef: MutableRefObject<MetalSphereEnvBundle | null>;
  metalEnvBridgeReadyRef: MutableRefObject<boolean>;
  perfLastPrimaryRef: MutableRefObject<HTMLVideoElement | null>;
  perfVideoSinkRef: MutableRefObject<((el: HTMLVideoElement | null) => void) | undefined>;
  perfPresentationLastRef: MutableRefObject<PerfVideoPresentationMode | null>;
  perfPresentationSinkRef: MutableRefObject<((mode: PerfVideoPresentationMode) => void) | undefined>;
  wasStudioFrozenRef: MutableRefObject<boolean>;
  flushPendingVideoLoad: () => void;
  getParamValue: (fxKey: string, paramKey: string, defaultVal: number) => number;
  resolvePrimaryVideoSpeed: (clipDurationSec?: number) => number;
  resolveStarLayerPixels: () => { width: number; height: number };
  isTransportFrozen: () => boolean;
  isStudioTransportRunning: () => boolean;
  isVisualTransportPlaying: () => boolean;
  bootstrapTransportFreeze: () => void;
  reportPresentationMode: (mode: PerfVideoPresentationMode) => void;
};

export function startHydraReactiveLoop(deps: HydraReactiveLoopDeps): () => void {
  const {
    settingsRef,
    studioModeRef,
    bpmRef,
    hydraRef,
    hydraRenderBudgetKeyRef,
    syncHydraRenderBudgetRef,
    runHydraTickRef,
    hydraResizePauseRef,
    hydraResizeResumeRef,
    syncElectricNoiseTriggerTexRef,
    transitionStateRef,
    pendingVideoLoadRef,
    activeChannelRef,
    clipLoadFreezeRef,
    clipPeekDepsRef,
    onPlaybackCueRef,
    boomerangBridgeReadyRef,
    boomerangBackingRef,
    boomerangCanvasBundleRef,
    boomerangStateRef,
    boomerangCaptureFpsCapRef,
    boomerangMaxFramesCapRef,
    currentSpeedSmoothedRef,
    fxReactiveTriggerGateRef,
    reactiveTriggerDescriptorsRef,
    electricNoiseCirclesRef,
    electricNoiseCirclePackRef,
    neonGridBundleRef,
    neonGridBridgeReadyRef,
    neonGridRuntimeRef,
    s3OverlayBindRef,
    throughTheStarsBundleRef,
    throughTheStarsBridgeReadyRef,
    lumaDustBundleRef,
    lumaDustBridgeReadyRef,
    lumaLockBundleRef,
    lumaLockBridgeReadyRef,
    textLayerBundleRef,
    textLayerBridgeReadyRef,
    textLayerRuntimeRef,
    oscilloscopeBundleRef,
    oscilloscopeBridgeReadyRef,
    metalEnvBundleRef,
    metalEnvBridgeReadyRef,
    perfLastPrimaryRef,
    perfVideoSinkRef,
    perfPresentationLastRef,
    perfPresentationSinkRef,
    wasStudioFrozenRef,
    flushPendingVideoLoad,
    getParamValue,
    resolvePrimaryVideoSpeed,
    resolveStarLayerPixels,
    isTransportFrozen,
    isStudioTransportRunning,
    isVisualTransportPlaying,
    bootstrapTransportFreeze,
    reportPresentationMode,
  } = deps;

    const tickOverlayCanvases = (dt: number, now: number) => {
      const win = getHydraWindow();
      const overlayStores = win.hydraSettings ?? {};

      const neonLive = resolveLiveOverlayFx(overlayStores, "neonGrid");
      const neonFx = neonLive?.config;
      const neonBundle = neonGridBundleRef.current;
      if (neonFx && neonGridBridgeReadyRef.current && neonBundle) {
        advanceNeonGridFrame({
          bundle: neonBundle,
          s3: getOverlayHydraSource("neonGrid"),
          bindState: s3OverlayBindRef.current,
          params: neonFx.params,
          spawn: neonGridSpawnFromParams(neonFx.params),
          draw: neonGridDrawFromParams(neonFx.params),
          dt,
          now,
          aspect: window.innerWidth / Math.max(1, window.innerHeight),
          envelope: win.hydraEnvelopes?.[neonLive.effectKey] ?? 0,
          binding: paramBindingFromFx(neonFx, "base"),
          bands: win.customBands,
          runtime: neonGridRuntimeRef.current,
        });
      }

      const shuffleFx = win.hydraSettings?.fx?.gridShuffle;
      if (shuffleFx?.enabled) {
        advanceGridShuffleSeed({
          envelope: win.hydraEnvelopes?.gridShuffle ?? 0,
          binding: paramBindingFromFx(shuffleFx, "base"),
          bands: win.customBands,
          dt,
        });
      }

      const starsLive = resolveLiveOverlayFx(overlayStores, "throughTheStars");
      const starsFx = starsLive?.config;
      const starsBundle = throughTheStarsBundleRef.current;
      if (starsFx && throughTheStarsBridgeReadyRef.current && starsBundle) {
        const starPixels = resolveStarLayerPixels();
        advanceThroughTheStarsFrame({
          bundle: starsBundle,
          s3: getOverlayHydraSource("throughTheStars"),
          bindState: s3OverlayBindRef.current,
          fxCfg: starsFx,
          bands: win.customBands,
          amount: computeFxAmount(starsLive.effectKey, starsFx, win.customBands, FX_AMT_01),
          dt,
          now,
          aspect: window.innerWidth / Math.max(1, window.innerHeight),
          pixelWidth: starPixels.width,
          pixelHeight: starPixels.height,
        });
      }

      const dustLive = resolveLiveOverlayFx(overlayStores, "lumaDust");
      const dustFx = dustLive?.config;
      const dustBundle = lumaDustBundleRef.current;
      if (dustFx && lumaDustBridgeReadyRef.current && dustBundle) {
        const dustPixels = resolveStarLayerPixels();
        const dustVideo =
          activeChannelRef.current === 0
            ? (win.s0?.src as HTMLVideoElement | undefined)
            : (win.s1?.src as HTMLVideoElement | undefined);
        advanceLumaDustFrame({
          bundle: dustBundle,
          s3: getOverlayHydraSource("lumaDust"),
          bindState: s3OverlayBindRef.current,
          video: dustVideo,
          params: dustFx.params,
          amount: computeFxAmount(dustLive.effectKey, dustFx, win.customBands, FX_AMT_01),
          dt,
          now,
          aspect: window.innerWidth / Math.max(1, window.innerHeight),
          pixelWidth: dustPixels.width,
          pixelHeight: dustPixels.height,
          skipVideoSample: clipLoadFreezeRef.current,
        });
      }

      const lockLive = resolveLiveOverlayFx(overlayStores, "lumaLock");
      const lockFx = lockLive?.config;
      const lockBundle = lumaLockBundleRef.current;
      if (lockFx && lumaLockBridgeReadyRef.current && lockBundle) {
        const lockPixels = resolveStarLayerPixels();
        const lockVideo =
          activeChannelRef.current === 0
            ? (win.s0?.src as HTMLVideoElement | undefined)
            : (win.s1?.src as HTMLVideoElement | undefined);
        advanceLumaLockFrame({
          bundle: lockBundle,
          s3: getOverlayHydraSource("lumaLock"),
          bindState: s3OverlayBindRef.current,
          video: lockVideo,
          params: lockFx.params,
          amount: computeFxAmount(lockLive.effectKey, lockFx, win.customBands, FX_AMT_01),
          dt,
          now,
          skipVideoSample: clipLoadFreezeRef.current,
          pixelWidth: lockPixels.width,
          pixelHeight: lockPixels.height,
        });
      }

      const textLive = resolveLiveOverlayFx(overlayStores, "textLayer");
      const textFx = textLive?.config;
      const textBundle = textLayerBundleRef.current;
      if (textFx && textLayerBridgeReadyRef.current && textBundle) {
        advanceTextLayerFrame({
          bundle: textBundle,
          s3: getOverlayHydraSource("textLayer"),
          bindState: s3OverlayBindRef.current,
          fxCfg: textFx,
          bands: win.customBands,
          amount: computeFxAmount(textLive.effectKey, textFx, win.customBands, FX_AMT_01),
          now,
          envelope: win.hydraEnvelopes?.[textLive.effectKey] ?? 0,
          binding: paramBindingFromFx(textFx, "base"),
          runtime: textLayerRuntimeRef.current,
          shouldBind: true,
        });
      }
    };

    let frameId = 0;
    let idleTimer = 0;
    let lastTime = performance.now();
    let currentSpeedSmoothed = currentSpeedSmoothedRef.current;
    let speedDiagCounter = 0;
    let vibrationSmooth = 0;
    let degaussSmooth = 0;

    const syncHydraRenderBudget = (hasPulseTail = false) => {
      const h = hydraRef.current;
      if (!h?.synth) return;
      const frozen = isTransportFrozen();
      const playing = isVisualTransportPlaying();
      const reactive = !frozen && (hasPulseTail || fxReactiveTriggerGateRef.current);
      const hidden = shouldThrottleHiddenVisuals(document.hidden, isHydraOutputLive());
      const key = `${hidden ? "h" : "v"}-${frozen ? "f" : playing ? "p" : "s"}-${reactive ? "r" : "i"}`;
      if (hydraRenderBudgetKeyRef.current === key) return;
      hydraRenderBudgetKeyRef.current = key;

      if (hidden) {
        setHydraClockSpeed(h.synth, 0);
        h.synth.fps = HYDRA_FPS_BACKGROUND;
        return;
      }
      if (frozen) {
        setHydraClockSpeed(h.synth, 0);
        h.synth.fps = undefined;
        return;
      }
      if (!playing) {
        setHydraClockSpeed(h.synth, 0);
        h.synth.fps = reactive ? HYDRA_FPS_REACTIVE_IDLE : HYDRA_FPS_IDLE;
        return;
      }
      setHydraClockSpeed(h.synth, 1);
      h.synth.fps = undefined;
    };
    syncHydraRenderBudgetRef.current = syncHydraRenderBudget;

    const resumeForegroundLoop = () => {
      hydraRenderBudgetKeyRef.current = "";
      syncHydraRenderBudget();
      if (!isOutputDrivingVisuals()) scheduleLoop(0);
    };

    const cancelLoop = () => {
      if (frameId) cancelAnimationFrame(frameId);
      if (idleTimer) clearTimeout(idleTimer);
      frameId = 0;
      idleTimer = 0;
    };

    hydraResizePauseRef.current = () => cancelLoop();

    syncElectricNoiseTriggerTexRef.current = () => {
      const now = performance.now();
      if (electricNoiseCirclesRef.current.length > 0) {
        electricNoiseCirclePackRef.current = packElectricNoiseTriggerCircles(
          electricNoiseCirclesRef.current,
          now,
        );
      } else {
        electricNoiseCirclePackRef.current = { count: 0, slots: [] };
      }
      uploadElectricNoiseTriggerTexture(electricNoiseCirclePackRef.current.slots);
    };

    const scheduleLoop = (delayMs: number) => {
      if (isHydraRenderPaused()) {
        recoverStuckHydraResize();
        if (isHydraRenderPaused()) return;
      }
      cancelLoop();
      if (isOutputDrivingVisuals()) {
        idleTimer = window.setTimeout(() => {
          idleTimer = 0;
          tickFrame(performance.now());
        }, 50);
        return;
      }
      if (delayMs > 0) {
        idleTimer = window.setTimeout(() => {
          idleTimer = 0;
          frameId = requestAnimationFrame(tickFrame);
        }, delayMs);
        return;
      }
      frameId = requestAnimationFrame(tickFrame);
    };

    hydraResizeResumeRef.current = () => scheduleLoop(0);
    document.addEventListener("visibilitychange", resumeForegroundLoop);
    window.addEventListener("focus", resumeForegroundLoop);

    const reportPerfPrimary = (el: HTMLVideoElement | null) => {
      if (perfLastPrimaryRef.current === el) return;
      perfLastPrimaryRef.current = el;
      perfVideoSinkRef.current?.(el);
    };

    const triggerState: TriggeredBindingRuntime = createTriggeredBindingRuntime();
    const egBusScratch: Record<number, number> = {};
    const egPhaseScratch: Record<number, number> = {};

    const clearTriggerMotion = (win: ReturnType<typeof getHydraWindow>, wipeElectricRings = true) => {
      clearTriggeredBindingRuntime(triggerState);
      win.hydraEnvelopes = {};
      win.hydraEnvelopePhaseU = {};
      win.hydraTriggerCounts = {};
      win.vibrationAmp = 0;
      vibrationSmooth = 0;
      win.degaussAmp = 0;
      degaussSmooth = 0;
      if (isClipPeekActive()) {
        const clipPeekDeps = clipPeekDepsRef.current;
        if (clipPeekDeps) cancelClipPeek(clipPeekDeps);
        else resetClipPeek();
      }
      if (isClipZapActive()) {
        const clipPeekDeps = clipPeekDepsRef.current;
        if (clipPeekDeps) cancelClipZap(clipPeekDeps);
        else resetClipZap();
      }
      if (isPlaybackCueActive()) {
        cancelPlaybackCue();
      }
      if (wipeElectricRings) {
        electricNoiseCirclesRef.current = createElectricNoiseTriggerCircles();
        electricNoiseCirclePackRef.current = { count: 0, slots: [] };
      }
    };

    const resolveBoomBridgeLive = (hs: FolderConfig | undefined) =>
      isBoomerangBridgeLive(
        !!hs?.fx?.boomerang?.enabled,
        boomerangBridgeReadyRef.current,
        boomerangBackingRef.current,
        boomerangCanvasBundleRef.current,
      );

    const firePlaybackTransportTrigger = (fxKey: string) => {
      if (!isVisualTransportPlaying() || clipLoadFreezeRef.current) return;
      const win = getHydraWindow();
      const hs = win.hydraSettings;
      const boomBridgeLive = resolveBoomBridgeLive(hs);
      const boomEngaged = boomBridgeLive && isBoomerangCycleActive(boomerangStateRef.current);
      if (shouldSuppressTransportTriggerWhenBoomerangEngaged(boomEngaged, fxKey)) return;

      if (fxKey === "boomerang") {
        const fx = hs?.fx?.boomerang;
        if (!fx?.enabled) return;
        const st = boomerangStateRef.current;
        if (isBoomerangCycleActive(st)) return;
        if (!boomBridgeLive) {
          st.pendingTrigger = true;
          return;
        }
        beginBoomerangCycle(st);
        return;
      }

      if (fxKey === "jumpCut") {
        const fx = hs?.fx?.jumpCut;
        if (!fx?.enabled) return;
        const advanceSec = computeJumpCutAdvanceSec(
          getParamValue("jumpCut", "skipFrames", 2),
          getParamValue("jumpCut", "jumpCuts", 1),
        );
        for (const video of primaryTransportVideos(
          boomBridgeLive,
          boomerangBackingRef.current,
          win.s0?.src,
          win.s1?.src,
        )) {
          advanceVideoJumpCut(video, advanceSec);
        }
        if (boomBridgeLive) {
          refreshBoomerangCanvasPair(
            boomerangCanvasBundleRef.current,
            boomerangBackingRef.current.v0,
            boomerangBackingRef.current.v1,
          );
        }
        if (win.s2?.src instanceof HTMLVideoElement) advanceVideoJumpCut(win.s2.src, advanceSec);
        return;
      }

      if (fxKey === "stutterBack") {
        const fx = hs?.fx?.stutterBack;
        if (!fx?.enabled) return;
        const backFrames = getParamValue("stutterBack", "backFrames", 6);
        const rewindSec = computeStutterBackRewindSec(backFrames);
        for (const video of primaryTransportVideos(
          boomBridgeLive,
          boomerangBackingRef.current,
          win.s0?.src,
          win.s1?.src,
        )) {
          seekVideoByDelta(video, -rewindSec);
        }
        if (boomBridgeLive) {
          refreshBoomerangCanvasPair(
            boomerangCanvasBundleRef.current,
            boomerangBackingRef.current.v0,
            boomerangBackingRef.current.v1,
          );
        }
        const s2el = win.s2?.src;
        if (s2el instanceof HTMLVideoElement) seekVideoByDelta(s2el, -rewindSec);
        return;
      }

      if (fxKey === "clipPeek") {
        const fx = hs?.fx?.clipPeek;
        const clipPeekDeps = clipPeekDepsRef.current;
        if (!fx?.enabled || !clipPeekDeps || isClipPeekActive() || isClipZapActive()) return;
        const holdSec = clampClipPeekHoldSec(getParamValue("clipPeek", "holdSec", 0.35));
        const steps = clampClipPeekSteps(getParamValue("clipPeek", "steps", 1));
        triggerClipPeek(clipPeekDeps, steps, holdSec);
        return;
      }

      if (fxKey === "zap") {
        const fx = hs?.fx?.zap;
        const clipPeekDeps = clipPeekDepsRef.current;
        if (!fx?.enabled || !clipPeekDeps || isClipPeekActive() || isClipZapActive()) return;
        const clipCount = Math.max(
          1,
          Math.min(8, Math.round(getParamValue("zap", "clipCount", 3))),
        );
        const framesPerClip = Math.max(
          1,
          Math.min(12, Math.round(getParamValue("zap", "framesPerClip", 4))),
        );
        triggerClipZap(clipPeekDeps, clipCount, framesPerClip);
      }
    };

    const logTriggeredBindingFire = (key: string, eventTimeMs: number) => {
      const studioCtx = getHydraWindow().triggerDebugStudio;
      const logTimeSec = studioCtx?.playbackSec ?? eventTimeMs / 1000;
      const logBpm = Math.max(30, bpmRef.current);
      pushTriggerLogEvent({
        timeSec: logTimeSec,
        beat: beatAtSec(logTimeSec, logBpm),
        channel: "fx",
        fxKey: key,
        intensity: 1,
      });
      if (
        key === "clipPeek" ||
        key === "zap" ||
        key === "jumpCut" ||
        key === "stutterBack" ||
        key === "boomerang"
      ) {
        firePlaybackTransportTrigger(key);
        return;
      }
      const fireOverlay = overlayTemplateKeyFromEffectKey(
        key,
        getHydraWindow().hydraSettings ?? {},
      );
      if (fireOverlay === "neonGrid") {
        const bundle = neonGridBundleRef.current;
        const live = resolveLiveOverlayFx(getHydraWindow().hydraSettings ?? {}, "neonGrid");
        if (bundle && live) {
          spawnNeonGridLines(bundle, neonGridSpawnFromParams(live.config.params));
        }
      }
      if (key.startsWith("playbackCue:frame")) {
        const slot = Number.parseInt(key.slice("playbackCue:frame".length), 10);
        const fx = getHydraWindow().hydraSettings?.fx?.playbackCue;
        if (!fx?.enabled || !Number.isFinite(slot) || slot < 1 || slot > 4) return;
        const params = fx.params ?? {};
        const eventCount = playbackCueEventCount(params);
        if (slot > eventCount) return;
        const frame = playbackCueFrameFromParams(params, slot);
        onPlaybackCueRef.current?.(
          slot,
          frame,
          Math.max(0.05, getParamValue("playbackCue", "holdSec", 0.35)),
          params,
        );
      }
    };

    const pulsePlaybackEnvelope = (fxKey: string) => {
      if (fxKey === "slowmo") {
        return slowmoEnvelopeFromDuration(
          getParamValue("slowmo", "duration", SLOWMO_DURATION_DEFAULT),
        );
      }
      if (fxKey === "accelerate") {
        return accelerateEnvelopeFromDuration(
          getParamValue("accelerate", "duration", ACCELERATE_DURATION_DEFAULT),
        );
      }
      return null;
    };

    const setPulsePlaybackUntil = (fxKey: string, time: number) => {
      if (fxKey === "slowmo") {
        const durationSec = getParamValue("slowmo", "duration", SLOWMO_DURATION_DEFAULT);
        getHydraWindow().slowmoPulseUntilMs =
          time + slowmoPulseDurationSec(durationSec) * 1000;
      } else if (fxKey === "accelerate") {
        const durationSec = getParamValue("accelerate", "duration", ACCELERATE_DURATION_DEFAULT);
        getHydraWindow().acceleratePulseUntilMs =
          time + acceleratePulseDurationSec(durationSec) * 1000;
      }
    };

    const manualFireFxTrigger = (fxKey: string) => {
      if (!isTriggerOnlyFx(fxKey)) return;
      const time = performance.now();
      const hs = getHydraWindow().hydraSettings;
      const fxRow = hs?.fx?.[fxKey as keyof NonNullable<typeof hs>["fx"]];
      if (!fxRow?.enabled) return;

      const binding = paramBindingFromFx(fxRow, "base");
      const durationEnvelope = pulsePlaybackEnvelope(fxKey);
      const envelope =
        durationEnvelope ??
        resolveBindingEnvelope(
          binding,
          normalizeModulation(getHydraWindow().hydraModulation?.config),
        );
      const delaySec = binding.trigger?.delay ?? 0;
      fireOneShotEnvelope(triggerState, fxKey, time, envelope, delaySec);
      logTriggeredBindingFire(fxKey, time);
      if (durationEnvelope) setPulsePlaybackUntil(fxKey, time);
    };

    const spawnElectricTriggerRing = (nowMs: number) => {
      spawnElectricNoiseTriggerCircle(electricNoiseCirclesRef.current, nowMs);
    };

    getHydraWindow().__hydraFireFxTrigger = manualFireFxTrigger;

    /**
     * Advance one reactive trigger source (FX row or paramSync entry). Hoisted
     * out of the rAF loop so no closure is allocated per FX per frame, and only
     * called for the precomputed reactive descriptors (not all ~50 FX keys).
     * Also fills `phaseByKey` for the live pulse-preview dot.
     */
    const processTriggerDescriptor = (
      desc: ReactiveTriggerDescriptor,
      fxRow: FXConfig,
      time: number,
      dt: number,
      phaseByKey: Record<string, number>,
    ) => {
      const paramKey = desc.paramKey ?? "base";
      const binding = paramBindingFromFx(fxRow, paramKey);
      if (!bindingIsTriggered(binding) || binding.source === "none") return;

      const key = desc.key;
      const win = getHydraWindow();
      const bandVal = getTriggerBandLevel(binding.source, win.customBands, binding.depth);

      const stemHits = isStemMappedBand(binding.source)
        ? countNewStemMappedHits(
            binding.source,
            binding.trigger.threshold,
            stemMappedHitEvents(win.studioStemEventsStep, win.studioEventPulses),
            triggerState.stemHitsSeen,
            key,
          )
        : 0;

      const durationEnvelope = pulsePlaybackEnvelope(desc.fxKey);
      const envelope =
        durationEnvelope ??
        resolveBindingEnvelope(
          binding,
          normalizeModulation(getHydraWindow().hydraModulation?.config),
        );
      const phase = stepTriggeredBinding(triggerState, {
        key,
        bandVal,
        stemHits,
        trigger: binding.trigger,
        envelope,
        nowMs: time,
        dt,
        onFire: (fireKey) => {
          logTriggeredBindingFire(fireKey, time);
          if (durationEnvelope) setPulsePlaybackUntil(desc.fxKey, time);
          if (
            desc.fxKey === "electricNoise" &&
            !desc.paramKey
          ) {
            spawnElectricTriggerRing(time);
          }
        },
      });
      if (phase != null) phaseByKey[key] = phase;
      if (binding.envelopeRef && binding.mode === "envelope") {
        const egIdx = parseInt(binding.envelopeRef.slice(3), 10);
        const level = triggerState.envelopes[key] ?? 0;
        const prev = egBusScratch[egIdx] ?? 0;
        if (level > prev) {
          egBusScratch[egIdx] = level;
          egPhaseScratch[egIdx] = phase ?? 0;
        }
      }
    };

    // Hoisted per-source video drivers. Defined once per effect run (not per
    // frame) so the rAF loop allocates no arrays/closures while pacing playback.
    const VIDEO_LOOP_EPS = Math.max(0.04, 1 / 24);

    const wrapVideoToLoopStart = (v: HTMLVideoElement, playing: boolean) => {
      if (
        v.loop &&
        typeof v.duration === "number" &&
        Number.isFinite(v.duration) &&
        v.duration > 0 &&
        (v.ended || v.currentTime >= v.duration - VIDEO_LOOP_EPS)
      ) {
        v.currentTime = 0;
        if (playing) v.play().catch(() => {});
      }
    };

    const advanceVideoForward = (
      v: HTMLVideoElement | HTMLCanvasElement | null | undefined,
      speed: number,
      playing: boolean,
    ) => {
      if (!(v instanceof HTMLVideoElement)) return;
      if (playing) {
        if (v.paused) void v.play().catch(() => {});
      } else if (!v.paused) {
        v.pause();
      }
      v.playbackRate = speed;
      wrapVideoToLoopStart(v, playing);
    };

    const driveLayerSecondary = (playing: boolean) => {
      const win = getHydraWindow();
      const v2 = win.s2?.src;
      if (!(v2 instanceof HTMLVideoElement)) return;
      if (isPlaybackCueFrozen()) {
        if (!v2.paused) v2.pause();
        return;
      }
      if (playing && v2.paused) v2.play().catch(() => {});
      const secondary = resolveSecondaryVideoFxEntry(win.hydraSettings?.fx);
      v2.playbackRate = secondary
        ? resolveSecondaryPlaybackSpeed(secondary.key, secondary.config)
        : 1.0;
      wrapVideoToLoopStart(v2, playing);
    };

    const tickFrame = (time: number) => {
      if (isHydraRenderPaused()) return;
      if (!transitionStateRef.current.active && pendingVideoLoadRef.current) {
        flushPendingVideoLoad();
      }
      const dt = Math.min((time - lastTime) / 1000, 0.1); // Cap dt to avoid huge jumps
      lastTime = time;

      const studioFrozen = isTransportFrozen();
      const videoTransportOff =
        settingsRef.current.isVideoPlaying === false && !isStudioTransportRunning();
      const transportIdle = studioFrozen || videoTransportOff;

      const transportDeps = clipPeekDepsRef.current;
      if (!transportIdle && transportDeps) {
        if (isClipPeekActive()) {
          tickClipPeek(transportDeps, dt);
        } else if (isClipZapActive()) {
          tickClipZap(transportDeps, dt);
        } else if (isPlaybackCueActive()) {
          tickPlaybackCue(dt);
        }
      }

      if (!transportIdle) {
        tickOverlayCanvases(dt, time);
      }

      const { s0, s1, hydraSettings, customBands } = getHydraWindow();

      const hasPulseTail =
        triggeredRuntimeHasMotion(triggerState) ||
        electricNoiseCirclesRef.current.length > 0;

      if (shouldThrottleHiddenVisuals(document.hidden, isHydraOutputLive())) {
        syncHydraRenderBudget(hasPulseTail);
        scheduleLoop(BACKGROUND_TICK_MS);
        return;
      }

      if (studioFrozen && wasStudioFrozenRef.current === false) {
        if (hydraRef.current) {
          bootstrapTransportFreeze();
          wasStudioFrozenRef.current = true;
        }
      } else if (wasStudioFrozenRef.current && !studioFrozen) {
        hydraRenderBudgetKeyRef.current = "";
        syncHydraRenderBudget(hasPulseTail);
        runHydraTickRef.current(16.67);
        const win = getHydraWindow();
        playIfVideo(win.s0?.src);
        playIfVideo(win.s1?.src);
        playIfVideo(win.s2?.src);
        playIfVideo(boomerangBackingRef.current?.v0);
        playIfVideo(boomerangBackingRef.current?.v1);
        wasStudioFrozenRef.current = false;
      } else if (!studioFrozen) {
        wasStudioFrozenRef.current = false;
      }

      if (transportIdle) {
        const win = getHydraWindow();
        pauseIfVideo(win.s2?.src);
        pauseIfVideo(win.s0?.src);
        pauseIfVideo(win.s1?.src);
        pauseIfVideo(boomerangBackingRef.current?.v0);
        pauseIfVideo(boomerangBackingRef.current?.v1);
        if (studioFrozen) {
          clearTriggerMotion(win, false);
        } else if (
          !resolveLiveOverlayFx(hydraSettings ?? {}, "neonGrid")
        ) {
          win.hydraEnvelopes = {};
          win.hydraEnvelopePhaseU = {};
          win.hydraTriggerCounts = {};
          win.slowmoTrailMix = 0;
        }
        if (!studioModeRef.current) {
          win.customBands = { kick: 0, snare: 0, hat: 0, bass: 0, vocals: 0, low: 0, mid: 0, high: 0, beat: 0, rhythm: 0, specFast: 0, specSlow: 0, master: 0 };
          getHydraWindow().masterLevel = 0;
          getHydraWindow().masterDbfs = -96;
          hydraRenderBudgetKeyRef.current = "";
          syncHydraRenderBudget(false);
          scheduleLoop(IDLE_TICK_MS);
          return;
        }
      }

      syncHydraRenderBudget(false);

      const hydraSettingsEarly = getHydraWindow().hydraSettings;
      const boomBridgeEarly =
        boomerangBridgeReadyRef.current && hydraSettingsEarly?.fx?.boomerang?.enabled;

      if (s0 && s1 && !boomBridgeEarly) {
        const currentSrc = activeChannelRef.current === 0 ? s0 : s1;
        if (currentSrc.src instanceof HTMLVideoElement) currentSrc.src.loop = true;
      } else if (s0 && s1 && boomBridgeEarly) {
        const vb0 = boomerangBackingRef.current.v0;
        const vb1 = boomerangBackingRef.current.v1;
        if (vb0) vb0.loop = true;
        if (vb1) vb1.loop = true;
      }

      const hasPulseTailActive = hasPulseTail;

      const runTriggerPass =
        !!hydraSettings?.fx && (fxReactiveTriggerGateRef.current || hasPulseTailActive);

      if (runTriggerPass) {
        const winTriggers = getHydraWindow();
        if (winTriggers.studioStemHitsReset) {
          triggerState.stemHitsSeen.clear();
          winTriggers.studioStemHitsReset = false;
        }
        const descriptors = reactiveTriggerDescriptorsRef.current;
        const phaseByKey: Record<string, number> = {};
        const fxMap = hydraSettings.fx;
        for (const key of Object.keys(egBusScratch)) delete egBusScratch[Number(key)];
        for (const key of Object.keys(egPhaseScratch)) delete egPhaseScratch[Number(key)];
        for (let i = 0; i < descriptors.length; i++) {
          const desc = descriptors[i]!;
          const fxRow =
            desc.config ??
            fxMap[desc.fxKey as keyof typeof fxMap];
          if (!fxRow || !fxRow.enabled) continue;
          processTriggerDescriptor(desc, fxRow, time, dt, phaseByKey);
        }
        pruneStemMappedSeen(
          triggerState.stemHitsSeen,
          winTriggers.studioStemEventsStep,
          winTriggers.studioEventPulses,
        );
        getHydraWindow().hydraEnvelopes = triggerState.envelopes;
        getHydraWindow().hydraEnvelopePhaseU = phaseByKey;
        getHydraWindow().hydraTriggerCounts = triggerState.counts;
        const modWin = getHydraWindow();
        if (modWin.hydraModulation) {
          modWin.hydraModulation.eg = { ...egBusScratch };
          modWin.hydraModulation.egOneShotPhase = { ...egPhaseScratch };
        }
      } else if (hydraSettings?.fx) {
        getHydraWindow().hydraEnvelopes = {};
        getHydraWindow().hydraEnvelopePhaseU = {};
        getHydraWindow().hydraTriggerCounts = {};
      }

      if (hydraSettings) {
        const bands = customBands ?? { kick: 0, snare: 0, hat: 0, bass: 0, vocals: 0, low: 0, mid: 0, high: 0, beat: 0, rhythm: 0, specFast: 0, specSlow: 0, master: 0 };

        syncElectricNoiseTriggerTexRef.current();

        getHydraWindow().low = bands.low || 0;
        getHydraWindow().mid = bands.mid || 0;
        getHydraWindow().high = bands.high || 0;
        getHydraWindow().beat = bands.beat || 0;
        if (typeof (bands as Record<string, number>).kick === "number") {
          getHydraWindow().kick = (bands as Record<string, number>).kick!;
        }
        getHydraWindow().masterLevel =
          typeof bands.master === "number" ? bands.master : getHydraWindow().masterLevel ?? 0;

        const vibFx = hydraSettings.fx?.vibration;
        if (vibFx?.enabled) {
          const drive = vibrationDriveForFx(
            vibFx,
            triggerState.envelopes.vibration ?? 0,
            (band) => getBandValue("vibration", band, bands),
          );
          const target = computeVibrationTarget(vibFx, drive);
          vibrationSmooth = advanceVibrationSmooth(vibrationSmooth, target, vibFx);
          getHydraWindow().vibrationAmp = vibrationSmooth;
        } else {
          vibrationSmooth *= 0.88;
          getHydraWindow().vibrationAmp = vibrationSmooth;
        }

        const degFx = hydraSettings.fx?.degauss;
        if (degFx?.enabled) {
          const drive = degaussDriveForFx(
            degFx,
            triggerState.envelopes.degauss ?? 0,
            (band) => getBandValue("degauss", band, bands),
          );
          const target = computeDegaussTarget(degFx, drive);
          degaussSmooth = advanceDegaussSmooth(degaussSmooth, target, degFx);
          getHydraWindow().degaussAmp = degaussSmooth;
        } else {
          degaussSmooth *= 0.86;
          getHydraWindow().degaussAmp = degaussSmooth;
        }
      }

      if (!hydraSettings || !s0 || !s1) {
          reportPerfPrimary(null);
          reportPresentationMode("idle");
          scheduleLoop(IDLE_TICK_MS);
          return;
        }

        const boomActive =
          !!hydraSettings.fx?.boomerang?.enabled &&
          boomerangBridgeReadyRef.current &&
          !!boomerangBackingRef.current.v0 &&
          !!boomerangBackingRef.current.v1 &&
          !!boomerangCanvasBundleRef.current;

        if (!boomActive && isBoomerangCycleActive(boomerangStateRef.current)) {
          resetBoomerangCaptureState(boomerangStateRef.current);
        }

        if (!boomActive && !(s0.src instanceof HTMLVideoElement && s1.src instanceof HTMLVideoElement)) {
          reportPerfPrimary(null);
          reportPresentationMode("idle");
          scheduleLoop(IDLE_TICK_MS);
          return;
        }

        const vidPrimary0 = boomActive ? boomerangBackingRef.current.v0! : (s0.src as HTMLVideoElement);
        const vidPrimary1 = boomActive ? boomerangBackingRef.current.v1! : (s1.src as HTMLVideoElement);
        reportPerfPrimary(vidPrimary0);

        let targetSpeed = resolvePrimaryVideoSpeed(vidPrimary0.duration);

        currentSpeedSmoothed = resolveSmoothedVideoSpeed(
          targetSpeed,
          currentSpeedSmoothed,
          isPlaybackSpeedPulseMapped(hydraSettings.fx),
        );
        currentSpeedSmoothedRef.current = currentSpeedSmoothed;
        if ((speedDiagCounter++ & 7) === 0) {
          pushVideoSpeedCurveSample(currentSpeedSmoothed);
        }

        const playing = isVisualTransportPlaying() && !clipLoadFreezeRef.current;

        const cpFx = hydraSettings.fx?.clipPeek;
        const cpDeps = clipPeekDepsRef.current;
        if (!cpFx?.enabled && isClipPeekActive() && cpDeps) {
          cancelClipPeek(cpDeps);
        }

        const zapFx = hydraSettings.fx?.zap;
        const zapDeps = clipPeekDepsRef.current;
        if (!zapFx?.enabled && isClipZapActive() && zapDeps) {
          cancelClipZap(zapDeps);
        }

        const cueFx = hydraSettings.fx?.playbackCue;
        if (!cueFx?.enabled && isPlaybackCueActive()) {
          cancelPlaybackCue();
        }

        const bundle = boomerangCanvasBundleRef.current;
        const boomFx = hydraSettings.fx?.boomerang;
        const boomSt = boomerangStateRef.current;
        if (
          boomActive &&
          boomFx?.enabled &&
          boomSt.pendingTrigger &&
          !isBoomerangCycleActive(boomSt)
        ) {
          beginBoomerangCycle(boomSt);
        }
        const boomEngaged = boomActive && !!boomFx?.enabled && isBoomerangCycleActive(boomSt);

        if (boomActive && boomFx?.enabled && bundle && playing && !boomEngaged) {
          const st = boomerangStateRef.current;
          if (
            st.phase !== "forward" ||
            st.frames.frames0.length > 0 ||
            st.segmentEnd0 > 0 ||
            st.capturePending ||
            st.completeAfterReverse
          ) {
            resetBoomerangCaptureState(st);
          }
          if (currentSpeedSmoothed >= VIDEO_SPEED_DECODER_MIN) {
            advanceVideoForward(vidPrimary0, currentSpeedSmoothed, playing);
            advanceVideoForward(vidPrimary1, currentSpeedSmoothed, playing);
          } else {
            seekVideoManual(vidPrimary0, currentSpeedSmoothed, dt);
            seekVideoManual(vidPrimary1, currentSpeedSmoothed, dt);
          }
          drawVideoToCanvas(bundle.ctx0, bundle.c0, vidPrimary0);
          drawVideoToCanvas(bundle.ctx1, bundle.c1, vidPrimary1);
          driveLayerSecondary(playing);
        } else if (boomEngaged && boomFx?.enabled && bundle && playing) {
          const st = boomerangStateRef.current;
          const segmentSec = resolveBoomerangSegmentSec(
            getParamValue("boomerang", "segmentSec", 1.25),
          );
          const maxFrames = Math.max(
            24,
            Math.min(
              180,
              Math.round(getParamValue("boomerang", "maxFrames", 60)),
              boomerangMaxFramesCapRef.current,
            ),
          );
          const capFps = Math.max(
            12,
            Math.min(
              60,
              getParamValue("boomerang", "captureFps", 24),
              boomerangCaptureFpsCapRef.current,
            ),
          );

          const finishBoomerangCycle = () => {
            vidPrimary0.currentTime = st.segmentStart0;
            vidPrimary1.currentTime = st.segmentStart1;
            disposeBoomerangFrames(st.frames);
            st.active = false;
            st.phase = "forward";
            st.segmentEnd0 = 0;
            st.reverseIdx = -1;
            st.captureAccum = 0;
            st.completeAfterReverse = false;
          };

          if (st.phase === "reverse" || st.phase === "replay") {
            vidPrimary0.pause();
            vidPrimary1.pause();
            const i = st.reverseIdx;
            const b0 = i >= 0 ? st.frames.frames0[i] : null;
            const b1 = i >= 0 ? st.frames.frames1[i] : null;
            if (i >= 0 && b0 && b1) {
              drawBitmapToCanvas(bundle.ctx0, bundle.c0, b0);
              drawBitmapToCanvas(bundle.ctx1, bundle.c1, b1);
              if (st.phase === "reverse") {
                const { cycleDone } = stepBoomerangReverse(st, dt, capFps);
                if (cycleDone) finishBoomerangCycle();
              } else {
                stepBoomerangReplay(st, dt, capFps);
              }
            } else {
              finishBoomerangCycle();
            }
          } else {
            if (!Number.isFinite(st.segmentEnd0) || st.segmentEnd0 <= st.segmentStart0 + 1e-4) {
              st.segmentStart0 = vidPrimary0.currentTime;
              st.segmentStart1 = vidPrimary1.currentTime;
              const dur = vidPrimary0.duration;
              let end = st.segmentStart0 + segmentSec;
              if (Number.isFinite(dur) && dur > 0) {
                end = Math.min(end, dur - 1 / 120);
              }
              st.segmentEnd0 = Math.max(st.segmentStart0 + 0.05, end);
            }

            if (playing && currentSpeedSmoothed >= VIDEO_SPEED_DECODER_MIN) {
              if (vidPrimary0.paused) vidPrimary0.play().catch(() => {});
              if (vidPrimary1.paused) vidPrimary1.play().catch(() => {});
              vidPrimary0.playbackRate = currentSpeedSmoothed;
              vidPrimary1.playbackRate = currentSpeedSmoothed;

              const s2 = getHydraWindow().s2;
              if (s2 && s2.src instanceof HTMLVideoElement) {
                if (s2.src.paused) s2.src.play().catch(() => {});
                const secondary = resolveSecondaryVideoFxEntry(hydraSettings.fx);
                if (secondary) {
                  s2.src.playbackRate = resolveSecondaryPlaybackSpeed(
                    secondary.key,
                    secondary.config,
                  );
                } else {
                  s2.src.playbackRate = 1.0;
                }
              }
              wrapVideoToLoopStart(vidPrimary0, playing);
              wrapVideoToLoopStart(vidPrimary1, playing);
            } else if (playing) {
              if (!vidPrimary0.paused) vidPrimary0.pause();
              if (!vidPrimary1.paused) vidPrimary1.pause();
              seekVideoManual(vidPrimary0, currentSpeedSmoothed, dt);
              seekVideoManual(vidPrimary1, currentSpeedSmoothed, dt);
            } else {
              if (!vidPrimary0.paused) vidPrimary0.pause();
              if (!vidPrimary1.paused) vidPrimary1.pause();
            }

            drawVideoToCanvas(bundle.ctx0, bundle.c0, vidPrimary0);
            drawVideoToCanvas(bundle.ctx1, bundle.c1, vidPrimary1);

            const epsHit = Math.max(0.03, 1 / capFps);
            if (vidPrimary0.currentTime >= st.segmentEnd0 - epsHit) {
              if (st.frames.frames0.length >= 2) {
                st.phase = "reverse";
                st.completeAfterReverse = false;
                vidPrimary0.pause();
                vidPrimary1.pause();
                st.reverseIdx = st.frames.frames0.length - 1;
                st.captureAccum = 0;
              } else {
                finishBoomerangCycle();
              }
            } else {
              st.captureAccum += dt;
              const capPeriod = 1 / capFps;
              if (
                st.captureAccum >= capPeriod &&
                !st.capturePending &&
                st.frames.frames0.length < maxFrames
              ) {
                st.captureAccum -= capPeriod;
                st.capturePending = true;
                void captureBoomerangPair(vidPrimary0, vidPrimary1, st.frames, maxFrames).finally(() => {
                  st.capturePending = false;
                });
              }
            }
          }

          driveLayerSecondary(playing);
        } else if (
          playing &&
          currentSpeedSmoothed >= VIDEO_SPEED_DECODER_MIN &&
          !document.hidden
        ) {
          const win = getHydraWindow();
          advanceVideoForward(win.s0?.src, currentSpeedSmoothed, playing);
          advanceVideoForward(win.s1?.src, currentSpeedSmoothed, playing);

          driveLayerSecondary(playing);
        } else if (playing) {
          const win = getHydraWindow();
          seekVideoManual(win.s0?.src, currentSpeedSmoothed, dt);
          seekVideoManual(win.s1?.src, currentSpeedSmoothed, dt);

          driveLayerSecondary(playing);
        } else {
          const win = getHydraWindow();
          pauseIfVideo(win.s0?.src);
          pauseIfVideo(win.s1?.src);
          driveLayerSecondary(false);
        }

        let presentationMode: PerfVideoPresentationMode = "decoder";
        if (boomEngaged && boomFx?.enabled && bundle && playing) {
          const st = boomerangStateRef.current;
          if (st.phase === "reverse" || st.phase === "replay") presentationMode = "manualSeek";
          else if (currentSpeedSmoothed < VIDEO_SPEED_DECODER_MIN) presentationMode = "manualSeek";
        } else if (currentSpeedSmoothed < VIDEO_SPEED_DECODER_MIN) {
          presentationMode = "manualSeek";
        }
        reportPresentationMode(presentationMode);

        const oscLive = resolveLiveOverlayFx(hydraSettings, "oscilloscope");
        const oscFx = oscLive?.config;
        const oscOn =
          !!oscFx &&
          oscilloscopeBridgeReadyRef.current &&
          oscilloscopeBundleRef.current;
        if (oscOn) {
          const win = getHydraWindow();
          const oscBundle = oscilloscopeBundleRef.current!;
          bindOverlayCanvasSource(
            getOverlayHydraSource("oscilloscope"),
            oscBundle.canvas,
            "oscilloscope",
            s3OverlayBindRef.current,
          );
          const peaks = win.studioOscilloscopePeaks;
          const dur = win.studioOscilloscopeDurationSec ?? 0;
          const playT = win.studioOscilloscopeTimeSec ?? 0;
          if (
            studioModeRef.current &&
            peaks &&
            peaks.length > 0 &&
            dur > 0 &&
            (win.studioTransportActive || playT > 0)
          ) {
            pushOscilloscopeFromPeaks(oscBundle, peaks, dur, playT);
          } else {
            const liveSnap = win.oscilloscopeLiveRef?.current;
            const spectrum = liveSnap?.spectrum;
            let spectrumEnergy = 0;
            if (spectrum && spectrum.length > 8) {
              const step = Math.max(1, Math.floor(spectrum.length / 64));
              for (let i = 0; i < spectrum.length; i += step) {
                spectrumEnergy += spectrum[i]!;
              }
            }
            // Live FFT is pushed from the analyser; synthesize from bands when silent/unavailable
            // (headless capture has no mic — empty FFT buffers still have length > 8).
            if (spectrumEnergy < 64) {
              pushOscilloscopeFromBands(oscBundle, win.customBands ?? {}, performance.now() * 0.003);
            }
          }
          const oscColors = oscilloscopeColorsFromParams(oscFx.params as Record<string, unknown>);
          const oscParam = (paramKey: string, fallback: number) =>
            computeParamValue(
              oscLive.effectKey,
              oscFx,
              paramKey,
              fallback,
              getHydraWindow().customBands,
              "oscilloscope",
            );
          syncOscilloscopeWaveformTexture(
            getOverlayHydraSource("oscilloscope"),
            oscBundle,
            {
              persistence: oscParam("persistence", 0.72),
              positionY: oscParam("positionY", 0.88),
              scale: oscParam("scale", 0.55),
              mode: Math.round(oscParam("mode", 0)),
              colorLo: oscColors.colorLo,
              colorMid: oscColors.colorMid,
              colorHi: oscColors.colorHi,
            },
            performance.now(),
          );
        }

        const msFx = hydraSettings.fx?.metalSphere;
        const msEnvStatic =
          msFx?.enabled &&
          (msFx.base ?? 0) > 0.01 &&
          !metalSphereUsesLiveEnvMap(Number(msFx.params?.envMap ?? 0)) &&
          metalEnvBridgeReadyRef.current &&
          metalEnvBundleRef.current;
        if (msEnvStatic) {
          syncMetalSphereEnvMap(
            getHydraWindow().s3,
            vidPrimary0,
            metalEnvBundleRef.current,
            {
              now: performance.now(),
              videoPath: settingsRef.current.video ?? "",
            },
          );
        }

      scheduleLoop(0);
    };
    const stopOutputPump = registerOutputLivePump("hydra", () => {
      tickFrame(performance.now());
    });
    scheduleLoop(0);
    syncHydraRenderBudget();
    return () => {
      stopOutputPump();
      document.removeEventListener("visibilitychange", resumeForegroundLoop);
      window.removeEventListener("focus", resumeForegroundLoop);
      delete getHydraWindow().__hydraFireFxTrigger;
      syncHydraRenderBudgetRef.current = () => {};
      hydraResizePauseRef.current = null;
      hydraResizeResumeRef.current = null;
      syncElectricNoiseTriggerTexRef.current = () => {};
      cancelLoop();
      reportPerfPrimary(null);
      perfPresentationLastRef.current = null;
      perfPresentationSinkRef.current?.("idle");
    };
}
