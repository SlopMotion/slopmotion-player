// @ts-ignore
import Hydra from "hydra-synth";
// @ts-ignore — same raf-loop hydra-synth uses internally
import loop from "raf-loop";
import type { FolderConfig } from "../types/settings";
import { getHydraWindow, type HydraInstance } from "../types/hydraWindow";
import { applyHydraScene } from "../hydra/applyHydraScene";
import { registerHydraShaderFunctions } from "../hydra/registerShaderFunctions";
import { initHydraOverlayBridges } from "../hydra/initOverlayBridges";
import { startHydraReactiveLoop } from "../hydra/hydraReactiveLoop";
import { createVideoTransport, type VideoTransitionState } from "../hydra/videoTransport";
import { playIfVideo } from "../hydra/videoElementPlayback";
import {
  buildReactiveTriggerDescriptors,
  type ReactiveTriggerDescriptor,
} from "../hydra/reactiveTriggers";
import { patchHydraSourceInitVideo } from "../utils/patchHydraInitVideo";
import { patchHydraSynthDebug } from "../utils/patchHydraSynthDebug";
import { hydraElementBackingDimensions } from "../utils/perfProfile";
import {
  beginHydraRender,
  endHydraRender,
  isHydraRenderPaused,
  registerHydraResizeComplete,
  registerHydraResizeGate,
} from "../utils/hydraResizeGate";
import { wrapHydraTickForSimBuffers } from "../utils/tickHydraReactionDiff";
import { tickSlowmoTrailMix } from "../utils/slowmoFx";
import {
  REACTION_DIFF_OUTPUT_INDEX,
  REACTION_DIFF_FORCE_SEED_FRAMES,
} from "../utils/reactionDiffOutput";
import {
  patternLayerIsTuring,
  patternLayerTuringLive,
  PATTERN_RD_OUTPUT_INDEX,
  PATTERN_RD_FORCE_SEED_FRAMES,
} from "../utils/patternLayerRd";
import {
  patternTuringDisplayGlsl,
  PATTERN_TURING_DISPLAY_INPUTS,
} from "../shaders/patternLayerGlsl";
import { parseHexRgb, type NeonGridBundle } from "../utils/neonGridLines";
import { initElectricNoiseTexture } from "../utils/electricNoiseTexture";
import { initElectricNoiseTriggerTexture } from "../utils/electricNoiseTriggerTex";
import { initOutputMapMaskAtlas } from "../utils/outputMapMaskAtlas";
import { initTimeGlitchBuffer, tickTimeGlitchBuffer } from "../utils/timeGlitchBuffer";
import {
  createElectricNoiseTriggerCircles,
  type ElectricNoiseCirclePack,
  type ElectricNoiseTriggerCircle,
} from "../utils/electricNoiseTriggerCircles";
import {
  createOverlayCanvasBindState,
  hydraSourceCountForOverlays,
} from "../utils/overlayCanvasSource";
import { createNeonGridRuntimeState, type NeonGridRuntimeState } from "../utils/neonGridRuntime";
import { createTextLayerRuntimeState, type TextLayerRuntimeState } from "../utils/textLayerRuntime";
import type { TextLayerBundle } from "../utils/textLayerOverlay";
import type { ThroughTheStarsBundle } from "../utils/throughTheStarsCanvas";
import type { LumaDustBundle } from "../utils/lumaDustCanvas";
import { clearLumaDust } from "../utils/lumaDustRuntime";
import type { LumaLockBundle } from "../utils/lumaLockCanvas";
import type { MetalSphereEnvBundle } from "../utils/metalSphereEnvMap";
import type { OscilloscopeWaveformBundle } from "../utils/oscilloscopeWaveform";
import { settingsHasReactiveTriggers } from "../utils/memoryPrune";
import { normalizeTriggerOnlyPlaybackFxInPlace } from "../utils/triggerOnlyPlaybackFx";
import { computeFxAmount, computeParamValue, getBandValue, FX_AMT_01 } from "../utils/fxRuntime";
import {
  applyPlaybackRateToVideos,
  resolveTargetVideoSpeed,
} from "../utils/videoPlaybackSpeed";
import { markInstantVideoLoad } from "../utils/clipTransportGuard";
import {
  resolveSecondaryVideoFxEntry,
  secondaryBlendVideoPath,
} from "../utils/playsetLibraryHelpers";
import { silentBands } from "./silentBands";

type Ref<T> = { current: T };
const ref = <T,>(value: T): Ref<T> => ({ current: value });

export type SceneHostOptions = {
  canvas: HTMLCanvasElement;
  config: FolderConfig;
  clips: string[];
  clipIndex?: number;
  dprCap?: number;
};

export type SceneHost = {
  clipCount: number;
  clipIndex: () => number;
  selectClip: (index: number) => void;
  nextClip: () => void;
  previousClip: () => void;
  setPlaying: (playing: boolean) => void;
  isPlaying: () => boolean;
  resize: () => void;
  dispose: () => void;
};

function patternColorRgb01(hex: unknown, fallback: string): [number, number, number] {
  const fb = parseHexRgb(fallback, [3, 3, 6]);
  const [r, g, b] = parseHexRgb(hex, fb);
  return [r / 255, g / 255, b / 255];
}

/**
 * Boots the Hexa Hydra pipeline against a bare canvas — the same scene builder,
 * shader registry, clip transport and reactive loop the app runs, without React.
 */
export function startSceneHost(options: SceneHostOptions): SceneHost {
  const { canvas } = options;
  const dprCap = options.dprCap ?? 2;
  const clips = options.clips.length > 0 ? options.clips : [options.config.video].filter(Boolean);

  const win = getHydraWindow();
  win.customBands = silentBands();

  const config: FolderConfig = {
    ...options.config,
    video: clips[options.clipIndex ?? 0] ?? options.config.video,
  };
  normalizeTriggerOnlyPlaybackFxInPlace(config.fx);

  const settingsRef = ref(config);
  win.hydraSettings = config;

  const canvasRef = ref<HTMLCanvasElement | null>(canvas);
  const hydraRef = ref<HydraInstance | null>(null);
  const studioModeRef = ref(false);
  const exportSettingsRef = ref(undefined);
  const outputMappingRef = ref(undefined);
  const renderQualityRef = ref("full" as const);
  const bpmRef = ref(120);
  const activeChannelRef = ref<0 | 1>(0);
  const transitionStateRef = ref<VideoTransitionState>({
    active: false,
    startTime: 0,
    duration: 0,
    resolvedType: 0,
  });
  const applySceneDeferredRef = ref(false);
  const reactionDiffForceSeedRef = ref(0);
  const feedbackForceClearRef = ref(0);
  const patternRdForceSeedRef = ref(0);
  const runHydraTickRef = ref<(dtMs: number) => void>(() => {});
  const applySceneRef = ref<() => void>(() => {});
  const applySceneAndRenderRef = ref<() => void>(() => {});
  const syncPlaybackRef = ref<(force?: number) => void>(() => {});
  const hydraRenderBudgetKeyRef = ref("");
  const syncHydraRenderBudgetRef = ref<(hasPulseTail?: boolean) => void>(() => {});
  const hydraResizePauseRef = ref<(() => void) | null>(null);
  const hydraResizeResumeRef = ref<(() => void) | null>(null);
  const syncElectricNoiseTriggerTexRef = ref<() => void>(() => {});
  const currentSpeedSmoothedRef = ref(1);
  const wasStudioFrozenRef = ref(false);

  const pendingVideoLoadRef = ref<string | null>(null);
  const currentVideoRef = ref<string | null>(null);
  const videoLoadSeqRef = ref(0);
  const clipLoadFreezeRef = ref(false);
  const secondaryVideoRef = ref<string | undefined>(undefined);

  const electricNoiseCirclesRef = ref<ElectricNoiseTriggerCircle[]>(
    createElectricNoiseTriggerCircles(),
  );
  const electricNoiseCirclePackRef = ref<ElectricNoiseCirclePack>({ count: 0, slots: [] });

  const oscilloscopeBundleRef = ref<OscilloscopeWaveformBundle | null>(null);
  const oscilloscopeBridgeReadyRef = ref(false);
  const neonGridBundleRef = ref<NeonGridBundle | null>(null);
  const neonGridBridgeReadyRef = ref(false);
  const neonGridRuntimeRef = ref<NeonGridRuntimeState>(createNeonGridRuntimeState());
  const neonGridWasEnabledRef = ref(false);
  const textLayerBundleRef = ref<TextLayerBundle | null>(null);
  const textLayerBridgeReadyRef = ref(false);
  const textLayerRuntimeRef = ref<TextLayerRuntimeState>(createTextLayerRuntimeState());
  const textLayerWasEnabledRef = ref(false);
  const throughTheStarsBundleRef = ref<ThroughTheStarsBundle | null>(null);
  const throughTheStarsBridgeReadyRef = ref(false);
  const throughTheStarsWasEnabledRef = ref(false);
  const lumaDustBundleRef = ref<LumaDustBundle | null>(null);
  const lumaDustBridgeReadyRef = ref(false);
  const lumaDustWasEnabledRef = ref(false);
  const lumaLockBundleRef = ref<LumaLockBundle | null>(null);
  const lumaLockBridgeReadyRef = ref(false);
  const lumaLockWasEnabledRef = ref(false);
  const metalEnvBundleRef = ref<MetalSphereEnvBundle | null>(null);
  const metalEnvBridgeReadyRef = ref(false);
  const s3OverlayBindRef = ref(createOverlayCanvasBindState());

  const boomerangBridgeReadyRef = ref(false);
  const boomerangBackingRef = ref<{ v0: HTMLVideoElement | null; v1: HTMLVideoElement | null }>({
    v0: null,
    v1: null,
  });
  const boomerangCanvasBundleRef = ref<{
    c0: HTMLCanvasElement;
    c1: HTMLCanvasElement;
    ctx0: CanvasRenderingContext2D;
    ctx1: CanvasRenderingContext2D;
  } | null>(null);
  const boomerangStateRef = ref({
    active: false,
    pendingTrigger: false,
    phase: "forward" as "forward" | "reverse" | "replay",
    segmentStart0: 0,
    segmentStart1: 0,
    segmentEnd0: 0,
    captureAccum: 0,
    capturePending: false,
    reverseIdx: -1,
    completeAfterReverse: false,
    frames: { frames0: [] as ImageBitmap[], frames1: [] as ImageBitmap[] },
    lastFrameTime: 0,
  });
  const boomerangCaptureFpsCapRef = ref(60);
  const boomerangMaxFramesCapRef = ref(180);

  const perfLastPrimaryRef = ref<HTMLVideoElement | null>(null);
  const perfVideoSinkRef = ref(undefined);
  const perfPresentationLastRef = ref(null);
  const perfPresentationSinkRef = ref(undefined);
  const clipPeekDepsRef = ref(undefined);
  const onPlaybackCueRef = ref(undefined);

  const fxReactiveTriggerGateRef = ref(
    settingsHasReactiveTriggers(config.fx, config.layerInstances, config.fxGroups),
  );
  const reactiveTriggerDescriptorsRef = ref<ReactiveTriggerDescriptor[]>(
    buildReactiveTriggerDescriptors(config.fx, {
      layerInstances: config.layerInstances,
      fxGroups: config.fxGroups,
    }),
  );

  const bands = () => getHydraWindow().customBands;
  const getFxState = () => getHydraWindow().hydraSettings?.fx ?? settingsRef.current.fx;
  const getParamValue = (fxKey: string, paramKey: string, defaultVal: number): number =>
    computeParamValue(
      fxKey,
      getFxState()?.[fxKey as keyof FolderConfig["fx"]],
      paramKey,
      defaultVal,
      bands(),
    );
  const resolvePrimaryVideoSpeed = (clipDurationSec?: number): number =>
    resolveTargetVideoSpeed(
      settingsRef.current.fx,
      bands(),
      (fxKey, band, live) => getBandValue(fxKey, band, live),
      getParamValue,
      clipDurationSec,
    );

  const backingSize = () => hydraElementBackingDimensions(canvas, dprCap);
  const resolveStarLayerPixels = () =>
    canvas.width > 0 && canvas.height > 0
      ? { width: canvas.width, height: canvas.height }
      : backingSize();

  const isVisualTransportPlaying = () => settingsRef.current.isVideoPlaying !== false;

  const { width, height } = backingSize();
  canvas.width = width;
  canvas.height = height;

  const proto = HTMLCanvasElement.prototype;
  const originalGetContext = proto.getContext;
  proto.getContext = function getContextWithPreservedBuffer(
    this: HTMLCanvasElement,
    type: string,
    attrs?: WebGLContextAttributes,
  ) {
    if (
      this === canvas &&
      (type === "webgl" || type === "webgl2" || type === "experimental-webgl")
    ) {
      return originalGetContext.call(this, type, { ...attrs, preserveDrawingBuffer: true });
    }
    return originalGetContext.apply(this, arguments as unknown as [string, WebGLContextAttributes?]);
  } as typeof proto.getContext;

  let hydra: HydraInstance;
  try {
    hydra = new Hydra({
      canvas,
      detectAudio: false,
      makeGlobal: true,
      autoLoop: false,
      width,
      height,
      numSources: hydraSourceCountForOverlays(),
    });
  } finally {
    proto.getContext = originalGetContext;
  }
  hydraRef.current = hydra;

  const hydraRenderer = hydra as typeof hydra & Parameters<typeof wrapHydraTickForSimBuffers>[0];
  const baseTick = wrapHydraTickForSimBuffers(hydraRenderer, [
    {
      outputIndex: REACTION_DIFF_OUTPUT_INDEX,
      isActive: () => !!settingsRef.current.fx?.reactionDiffusion?.enabled,
      simSteps: () => {
        const speed = Number(settingsRef.current.fx?.reactionDiffusion?.params?.speed ?? 0.45);
        return 1 + Math.round(speed * 2);
      },
    },
    {
      outputIndex: PATTERN_RD_OUTPUT_INDEX,
      isActive: () => patternLayerTuringLive(settingsRef.current.fx),
      simSteps: () => {
        const speed = computeParamValue(
          "patternLayer",
          settingsRef.current.fx?.patternLayer,
          "speed",
          0.4,
          bands(),
        );
        return 3 + Math.round(Math.max(0, Math.min(2, speed)) * 3);
      },
      maxSteps: 6,
    },
  ]);

  hydra.tick = (dt: number, uniforms?: unknown) => {
    if (isHydraRenderPaused()) return;
    beginHydraRender();
    try {
      baseTick(dt, uniforms);
    } finally {
      if (reactionDiffForceSeedRef.current > 0) reactionDiffForceSeedRef.current -= 1;
      if (patternRdForceSeedRef.current > 0) patternRdForceSeedRef.current -= 1;
      if (feedbackForceClearRef.current > 0) feedbackForceClearRef.current -= 1;
      endHydraRender();
    }
  };

  runHydraTickRef.current = (dtMs: number) => {
    if (isHydraRenderPaused()) return;
    syncElectricNoiseTriggerTexRef.current();
    tickSlowmoTrailMix(Math.max(0, dtMs) / 1000);
    const fx = getHydraWindow().hydraSettings?.fx?.timeGlitch ?? settingsRef.current.fx?.timeGlitch;
    const live = getHydraWindow();
    tickTimeGlitchBuffer({
      sources: [live.s0?.src, live.s1?.src],
      activeChannel: activeChannelRef.current,
      enabled: Boolean(fx?.enabled),
      warm: (settingsRef.current.activeFxList || []).includes("timeGlitch"),
      amount: computeFxAmount("timeGlitch", fx, bands(), FX_AMT_01),
      cols: computeParamValue("timeGlitch", fx, "cols", 16, bands()),
      frameOffset: computeParamValue("timeGlitch", fx, "frameOffset", 2, bands()),
      origin: computeParamValue("timeGlitch", fx, "origin", 1, bands()),
      direction: computeParamValue("timeGlitch", fx, "direction", 0, bands()),
      mode: computeParamValue("timeGlitch", fx, "mode", 0, bands()),
      destWidth: canvas.width,
      destHeight: canvas.height,
    });
    hydra.tick?.(dtMs);
  };

  const hydraLoop = loop((dt: number) => runHydraTickRef.current(dt));
  hydraLoop.start();
  registerHydraResizeGate({
    pause: () => {
      hydraLoop.stop();
      hydraResizePauseRef.current?.();
    },
    resume: () => {
      hydraLoop.start();
      hydraResizeResumeRef.current?.();
    },
  });
  registerHydraResizeComplete(() => {
    applySceneDeferredRef.current = false;
    applySceneAndRenderRef.current();
  });

  patchHydraSynthDebug(hydra);
  patchHydraSourceInitVideo();
  registerHydraShaderFunctions(hydra.synth);

  initHydraOverlayBridges({
    settingsRef,
    backingWidth: width,
    backingHeight: height,
    oscilloscopeBundleRef,
    neonGridBundleRef,
    textLayerBundleRef,
    throughTheStarsBundleRef,
    lumaDustBundleRef,
    lumaLockBundleRef,
    metalEnvBundleRef,
    s3OverlayBindRef,
    textLayerRuntimeRef,
    oscilloscopeBridgeReadyRef,
    neonGridBridgeReadyRef,
    textLayerBridgeReadyRef,
    throughTheStarsBridgeReadyRef,
    lumaDustBridgeReadyRef,
    lumaLockBridgeReadyRef,
    metalEnvBridgeReadyRef,
    neonGridWasEnabledRef,
    textLayerWasEnabledRef,
    throughTheStarsWasEnabledRef,
    lumaDustWasEnabledRef,
    lumaLockWasEnabledRef,
  });

  if (patternLayerIsTuring(config.fx?.patternLayer)) {
    const params = config.fx.patternLayer.params;
    hydra.synth?.setFunction?.({
      name: "patternTuringDisplay",
      type: "src",
      inputs: [...PATTERN_TURING_DISPLAY_INPUTS],
      glsl: patternTuringDisplayGlsl(
        patternColorRgb01(params?.colorA, "#030306"),
        patternColorRgb01(params?.colorB, "#f0abfc"),
      ),
    });
  }

  hydra.setResolution?.(width, height);

  const regl = (getHydraWindow().s0 as { regl?: { texture: (opts: object) => unknown } } | undefined)
    ?.regl;
  if (regl) {
    initElectricNoiseTriggerTexture(regl);
    initOutputMapMaskAtlas(regl);
    initTimeGlitchBuffer(regl as Parameters<typeof initTimeGlitchBuffer>[0]);
    void initElectricNoiseTexture(regl).then(() => {
      requestAnimationFrame(() => applySceneAndRenderRef.current());
    });
  }

  applySceneRef.current = () =>
    applyHydraScene({
      applySceneDeferredRef,
      hydraRef,
      settingsRef,
      studioModeRef,
      exportSettingsRef,
      outputMappingRef,
      transitionStateRef,
      activeChannelRef,
      reactionDiffForceSeedRef,
      feedbackForceClearRef,
      patternRdForceSeedRef,
      canvasRef,
      renderQualityRef,
      runHydraTickRef,
      electricNoiseCirclePackRef,
      oscilloscopeBridgeReadyRef,
      neonGridBridgeReadyRef,
      textLayerBridgeReadyRef,
      throughTheStarsBridgeReadyRef,
      lumaDustBridgeReadyRef,
      lumaLockBridgeReadyRef,
      getFxState,
      getParamValue,
    });
  applySceneAndRenderRef.current = () => {
    if (isHydraRenderPaused()) {
      applySceneDeferredRef.current = true;
      return;
    }
    getHydraWindow().hydraSettings = settingsRef.current;
    applySceneRef.current();
    if (!isHydraRenderPaused()) runHydraTickRef.current(16.67);
  };

  syncPlaybackRef.current = (forceSpeed?: number) => {
    const live = getHydraWindow();
    const v0 = live.s0?.src;
    const v1 = live.s1?.src;
    if (!(v0 instanceof HTMLVideoElement) || !(v1 instanceof HTMLVideoElement)) return;
    const speed = forceSpeed ?? resolvePrimaryVideoSpeed(v0.duration);
    currentSpeedSmoothedRef.current = speed;
    applyPlaybackRateToVideos([v0, v1], speed);
  };

  const { loadPrimaryVideos, flushPendingVideoLoad } = createVideoTransport({
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
    bumpLumaDustReset: () => {
      if (lumaDustBundleRef.current) clearLumaDust(lumaDustBundleRef.current);
      queueMicrotask(() => applySceneRef.current());
    },
    teardownBoomerangBridge: () => {},
    isPrimaryPlaybackActive: isVisualTransportPlaying,
  });

  const stopReactiveLoop = startHydraReactiveLoop({
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
    isTransportFrozen: () => settingsRef.current.isVideoPlaying === false,
    isStudioTransportRunning: () => false,
    isVisualTransportPlaying,
    bootstrapTransportFreeze: () => {
      hydraRenderBudgetKeyRef.current = "";
      syncHydraRenderBudgetRef.current(false);
      runHydraTickRef.current(16.67);
    },
    reportPresentationMode: () => {},
  });

  reactionDiffForceSeedRef.current = REACTION_DIFF_FORCE_SEED_FRAMES;
  patternRdForceSeedRef.current = PATTERN_RD_FORCE_SEED_FRAMES;

  const clipLibrary = clips.map((path) => ({ path }));
  /** Layer Blend / Video Map / Cue Layer read their second clip from `s2`. */
  const syncSecondarySource = () => {
    const entry = resolveSecondaryVideoFxEntry(settingsRef.current.fx);
    const path = secondaryBlendVideoPath(
      clipLibrary,
      settingsRef.current.video,
      entry?.config ?? null,
      entry?.key ?? null,
    );
    if (!path || path === secondaryVideoRef.current) return;
    secondaryVideoRef.current = path;
    const s2 = getHydraWindow().s2;
    if (!s2?.initVideo) return;
    if (s2.src instanceof HTMLVideoElement) s2.src.pause();
    s2.initVideo(path);
    window.setTimeout(() => {
      const el = getHydraWindow().s2?.src;
      if (!(el instanceof HTMLVideoElement)) return;
      el.muted = true;
      el.loop = true;
      if (isVisualTransportPlaying()) void el.play().catch(() => {});
    }, 500);
  };

  let releaseClips = loadPrimaryVideos(true);
  syncSecondarySource();
  applySceneAndRenderRef.current();

  const resumePlayback = () => {
    if (!isVisualTransportPlaying()) return;
    const live = getHydraWindow();
    playIfVideo(live.s0?.src);
    playIfVideo(live.s1?.src);
    clipLoadFreezeRef.current = false;
  };
  const resumeTimers = [
    window.setTimeout(resumePlayback, 250),
    window.setTimeout(resumePlayback, 750),
  ];

  let currentIndex = clips.indexOf(config.video) >= 0 ? clips.indexOf(config.video) : 0;

  const selectClip = (index: number) => {
    if (clips.length === 0) return;
    const next = ((index % clips.length) + clips.length) % clips.length;
    if (next === currentIndex && settingsRef.current.video === clips[next]) return;
    currentIndex = next;
    settingsRef.current = { ...settingsRef.current, video: clips[next] };
    getHydraWindow().hydraSettings = settingsRef.current;
    releaseClips();
    releaseClips = loadPrimaryVideos(false);
    syncSecondarySource();
  };

  const resize = () => {
    const size = backingSize();
    if (canvas.width === size.width && canvas.height === size.height) return;
    hydra.setResolution?.(size.width, size.height);
  };
  const onWindowResize = () => resize();
  window.addEventListener("resize", onWindowResize);
  document.addEventListener("fullscreenchange", onWindowResize);
  const canvasObserver = new ResizeObserver(onWindowResize);
  canvasObserver.observe(canvas);

  return {
    clipCount: clips.length,
    clipIndex: () => currentIndex,
    selectClip,
    nextClip: () => selectClip(currentIndex + 1),
    previousClip: () => selectClip(currentIndex - 1),
    isPlaying: () => settingsRef.current.isVideoPlaying !== false,
    setPlaying: (playing: boolean) => {
      settingsRef.current = { ...settingsRef.current, isVideoPlaying: playing };
      getHydraWindow().hydraSettings = settingsRef.current;
      if (playing) resumePlayback();
      else {
        const live = getHydraWindow();
        if (live.s0?.src instanceof HTMLVideoElement) live.s0.src.pause();
        if (live.s1?.src instanceof HTMLVideoElement) live.s1.src.pause();
      }
      applySceneAndRenderRef.current();
    },
    resize,
    dispose: () => {
      markInstantVideoLoad();
      resumeTimers.forEach((id) => window.clearTimeout(id));
      canvasObserver.disconnect();
      window.removeEventListener("resize", onWindowResize);
      document.removeEventListener("fullscreenchange", onWindowResize);
      stopReactiveLoop();
      registerHydraResizeGate(null);
      registerHydraResizeComplete(null);
      hydraLoop.stop();
      releaseClips();
      hydraRef.current = null;
    },
  };
}
