import type { MutableRefObject } from "react";
import type { FolderConfig, ExportSettings, OutputMapping, FXConfig } from "../types/settings";
import { getHydraWindow, type HydraInstance } from "../types/hydraWindow";
import type { HydraShaderChain, HydraShaderFn } from "./hydraShaderTypes";
import {
  exportFramingEnabled,
  exportMatteLayout,
  normalizeExportSettings,
  sourceAspectCorrectScale,
  videoStretchToRenderScale,
} from "../data/exportPresets";
import {
  isIdentityOutputMapClip,
  normalizeOutputMapping,
  OUTPUT_MAP_DISPLAY_INDEX,
  OUTPUT_MAP_SHADER_MASK_POINTS,
  OUTPUT_MAP_SOURCE_INDEX,
  OUTPUT_MAP_TRANSFORM_GRID_POINTS,
  outputMapMaskAtlasLayout,
  outputMapTransformCorners,
  outputMappingShouldWarp,
} from "../data/outputMapping";
import {
  getOutputMapMaskAtlasSampler,
  isOutputMapMaskAtlasReady,
  uploadOutputMapMaskAtlas,
} from "../utils/outputMapMaskAtlas";
import {
  beginHydraRender,
  endHydraRender,
  isHydraRenderPaused,
} from "../utils/hydraResizeGate";
import {
  getOverlayHydraSource,
  type OverlayCanvasOwner,
} from "../utils/overlayCanvasSource";
import { applyLayerComposite, cloneHydraChain, snapshotChainStack } from "./compositeLayerMode";
import { clampLayerBlendMode } from "../utils/layerBlendMode";
import {
  flattenFxKeysFromChain,
  mergePlaybackKeysOntoRenderChain,
  resolveActiveRenderChain,
} from "../utils/fxChainTree";
import { buildAllFxGroupBuffers, renderFxGroup } from "./renderFxGroup";
import {
  getGroupBufferPreviewGroupId,
  resolveGroupBufferPreviewSlot,
  setGroupBufferPreviewOutputIndex,
} from "../utils/groupBufferPreview";
import { buildLayerInstanceChain, type BuildLayerInstanceContext } from "./buildLayerInstanceChain";
import { fxParamFromRow, type ApplyFxToChainFn } from "./applyFxToChain";
import type { FxChainNode, LayerInstance } from "../types/fxChainTree";
import { liveGroupInstanceConfig } from "../utils/fxGroupInstanceRuntime";
import { getFramePalette, PALETTE_MAX_COLORS } from "../utils/paletteExtract";
import { snapPlexusLayers } from "../shaders/plexusSrcGlsl";
import { snapFractalFoldDepth } from "../shaders/fractalFoldSrcGlsl";
import {
  NORMAL_MAP_ANIM_SPEED,
  NORMAL_MAP_BUMP_LIGHTING,
  NORMAL_MAP_VORONOI_REFRACTION,
  NORMAL_MAP_VORONOI_SCALE,
} from "../shaders/normalMapGlsl";
import {
  blurRadialStepsForQuality,
  blurSpread,
  blurTapMix,
  BLUR_NOISE_SCALE,
  BLUR_NOISE_SPEED,
  GAUSSIAN_1D_9,
  gaussian1DTapsForQuality,
  pickBlurFlushOutput,
} from "../utils/blurComposite";
import {
  vignetteAmountCurve,
  vignetteBlurStrength,
  VIGNETTE_BLUR_NOISE_PASSES,
  VIGNETTE_BLUR_NOISE_SCALE,
  VIGNETTE_BLUR_NOISE_SPEED,
} from "../shaders/vignetteGlsl";
import { sharpenBlurSamplesForQuality, sharpenSpread } from "../utils/sharpenComposite";
import {
  GLITCH_LAYER_PRESETS,
  computeGlitchTravelMotion,
  glitchAxisMult,
  glitchBlockMix,
  glitchScaleAmount,
  glitchShapeRadius,
  resolveGlitchBlockSize,
  resolveGlitchRectCount,
  resolveGlitchTear,
  resolveGlitchTravel,
} from "../utils/glitchLayers";
import {
  lumaGridPixelateDivisions,
  lumaGridRowsForCols,
} from "../utils/lumaGridComposite";
import { edgeSpread, edgeViewportFade } from "../utils/edgeComposite";
import {
  glowBloomMix,
  glowBloomSpread,
  glowGaussianSideTaps,
} from "../utils/glowComposite";
import {
  hitStreakMix,
  hitStreakSpread,
  hitStreakThinness,
} from "../utils/hitStreakComposite";
import { lens7cThrow } from "../utils/lens7cPrism";
import { renderQualityProfile, type RenderQualityTier } from "../utils/renderQuality";
import { plexusLayersForQuality, plexusPointsForQuality } from "../utils/plexusQuality";
import {
  computeFxAmount,
  computeParamValue,
  getBandValue,
  FX_AMT_01,
  PIXELATE_AMT_OPTS,
  resolvePixelateCellCount,
  type FxAmountOptions,
} from "../utils/fxRuntime";
import { computeFadeOffBlackMix } from "../utils/fadeOffMix";
import { resolveDegaussShaderAmount } from "../utils/degaussAmplitude";
import { resolveVibrationShaderAmount } from "../utils/vibrationAmplitude";
import {
  chromaticAberrationBlendAmount,
  chromaticAberrationScrollOffset,
} from "../utils/chromaticAberration";
import { rgbDelayBlendAmount, rgbDelayScrollOffset } from "../utils/rgbDelay";
import {
  defaultCustomShaderCode,
  wrapCustomShaderGlsl,
} from "../utils/customShaderGlsl";
import { layoutMaskVideoRects } from "../utils/maskVideoLayout";
import {
  TRANSITION_STYLE,
  TRANSITION_STYLE_MAX,
  clapScaleY,
  slideBlurStrength,
} from "../utils/transitionStyles";
import {
  REACTION_DIFF_OUTPUT_INDEX,
  hydraOutputDisplaySampler,
  hydraOutputSimReadSampler,
} from "../utils/reactionDiffOutput";
import {
  PATTERN_LAYER_GEOMETRY_TYPE,
  PATTERN_LAYER_MAX_TYPE,
  PATTERN_LAYER_TURING_TYPE,
  PATTERN_RD_OUTPUT_INDEX,
  patternLayerIsTuring,
  patternTuringCells,
  patternTuringRdParams,
} from "../utils/patternLayerRd";
import {
  patternTuringDisplayGlsl,
  PATTERN_TURING_DISPLAY_INPUTS,
} from "../shaders/patternLayerGlsl";
import {
  getElectricNoiseTextureSampler,
} from "../utils/electricNoiseTexture";
import {
  getElectricNoiseTriggerTextureSampler,
} from "../utils/electricNoiseTriggerTex";
import type { ElectricNoiseCirclePack } from "../utils/electricNoiseTriggerCircles";
import { getNoiseTextureSampler } from "../utils/noiseTextureLibrary";
import { SLOWMO_MOTION_BLUR_DEFAULT } from "../utils/slowmoFx";
import { getGridShuffleSeed } from "../utils/gridShuffleRuntime";
import { getTimeGlitchSampler, isTimeGlitchBufferReady } from "../utils/timeGlitchBuffer";
import { resolveRampGradientShaderStops } from "../utils/rampGradientStops";

const EXPORT_MATTE_INSET = 0.025;
const EXPORT_MATTE_FEATHER = 0.015;
/**
 * Generated loops often carry a few fully black rows at the top/bottom edges
 * (ratio mismatch at generation time). A small static overscan crops them out
 * at the source so mirror/kaleid/tile folds never pull black lines into frame.
 */
const SOURCE_EDGE_OVERSCAN = 1.03;
const COLOR_GRADE_LUMA_OPTS = {
  paramMin: -1,
  paramMax: 1,
  clampMin: -1,
  clampMax: 1,
} as const;
/** Trigger-ring mix is always on; param was retired from the FX UI. */
const getElectricTriggerRings = () => 1;

function usesSlideScroll(type: number): boolean {
  return type === TRANSITION_STYLE.swipe || type === TRANSITION_STYLE.slide;
}

const getEdgeViewportMin = () => Math.min(window.innerWidth, window.innerHeight);

function hexRgb01(hex: unknown, fallback: string): [number, number, number] {
  const s = typeof hex === "string" ? hex : fallback;
  const h = s.replace("#", "").trim();
  if (h.length !== 6) return [0, 0, 0];
  const n = parseInt(h, 16);
  if (Number.isNaN(n)) return [0, 0, 0];
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function printPixelateIdentity() {
  const canvas = document.getElementById("hydra-canvas");
  if (canvas instanceof HTMLCanvasElement) {
    return Math.max(canvas.width, canvas.height, 1);
  }
  return 4096;
}

const liveHydraBands = () => getHydraWindow().customBands;

export type ApplyHydraSceneDeps = {
  applySceneDeferredRef: MutableRefObject<boolean>;
  hydraRef: MutableRefObject<HydraInstance | null>;
  settingsRef: MutableRefObject<FolderConfig>;
  studioModeRef: MutableRefObject<boolean>;
  exportSettingsRef: MutableRefObject<ExportSettings | undefined>;
  outputMappingRef: MutableRefObject<OutputMapping | undefined>;
  transitionStateRef: MutableRefObject<{
    active: boolean;
    startTime: number;
    duration: number;
    resolvedType: number;
  }>;
  activeChannelRef: MutableRefObject<0 | 1>;
  reactionDiffForceSeedRef: MutableRefObject<number>;
  feedbackForceClearRef: MutableRefObject<number>;
  patternRdForceSeedRef: MutableRefObject<number>;
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  renderQualityRef: MutableRefObject<RenderQualityTier>;
  runHydraTickRef: MutableRefObject<(dtMs: number) => void>;
  electricNoiseCirclePackRef: MutableRefObject<ElectricNoiseCirclePack>;
  oscilloscopeBridgeReadyRef: MutableRefObject<boolean>;
  neonGridBridgeReadyRef: MutableRefObject<boolean>;
  textLayerBridgeReadyRef: MutableRefObject<boolean>;
  throughTheStarsBridgeReadyRef: MutableRefObject<boolean>;
  lumaDustBridgeReadyRef: MutableRefObject<boolean>;
  lumaLockBridgeReadyRef: MutableRefObject<boolean>;
  getFxState: () => FolderConfig["fx"] | undefined;
  getParamValue: (fxKey: string, paramKey: string, defaultVal: number) => number;
};

export function applyHydraScene(deps: ApplyHydraSceneDeps) {
  const {
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
  } = deps;

    let fxRowOverride: {
      templateKey: string;
      effectKey: string;
      config: FXConfig;
    } | null = null;
    /**
     * applyFxToChain clears `fxRowOverride` in `finally`, but Hydra getters run
     * later. Remember which group instance owns each template so amount/params
     * keep reading the live layer row instead of the disabled singleton.
     */
    const instanceEffectKeyByTemplate = new Map<string, string>();
    /** Hydra output handles reserved for group-local Feedback loops. */
    const groupFeedbackOutById: Record<string, HydraShaderChain> = {};
    /** Deferred `.out()` so later RD / map / main outs cannot steal the FBO. */
    const groupFeedbackCommits: Array<{ out: HydraShaderChain; buffer: HydraShaderChain }> = [];
    const resolveInstanceRow = (templateKey: string, effectKey: string): FXConfig | undefined => {
      return liveGroupInstanceConfig(
        effectKey,
        templateKey,
        settingsRef.current.layerInstances,
      );
    };
    const resolveFxState = (): FolderConfig["fx"] | undefined => {
      const base = getFxState();
      if (!base) return base;
      let next = base;
      if (instanceEffectKeyByTemplate.size > 0) {
        const extra: Partial<FolderConfig["fx"]> = {};
        for (const [templateKey, effectKey] of instanceEffectKeyByTemplate) {
          const live = resolveInstanceRow(templateKey, effectKey);
          if (live) {
            (extra as Record<string, FXConfig>)[templateKey] = live;
          }
        }
        next = { ...base, ...extra };
      }
      if (fxRowOverride) {
        return { ...next, [fxRowOverride.templateKey]: fxRowOverride.config };
      }
      return next;
    };
    const resolveParamValue = (fxKey: string, paramKey: string, defaultVal: number): number => {
      const effectKey =
        fxRowOverride?.templateKey === fxKey
          ? fxRowOverride.effectKey
          : instanceEffectKeyByTemplate.get(fxKey);
      if (effectKey) {
        const config =
          resolveInstanceRow(fxKey, effectKey) ??
          (fxRowOverride?.templateKey === fxKey ? fxRowOverride.config : undefined);
        if (config) {
          return computeParamValue(
            effectKey,
            config,
            paramKey,
            defaultVal,
            liveHydraBands(),
            fxKey,
          );
        }
      }
      return getParamValue(fxKey, paramKey, defaultVal);
    };
    const resolveGroupParamValue = (
      groupId: string,
      paramKey: string,
      defaultVal: number,
    ): number => {
      const composite = settingsRef.current.fxGroups?.[groupId]?.composite;
      if (!composite) return defaultVal;
      return computeParamValue(
        `group:${groupId}`,
        composite,
        paramKey,
        defaultVal,
        liveHydraBands(),
      );
    };

    if (isHydraRenderPaused()) {
      applySceneDeferredRef.current = true;
      return;
    }

    const hydra = getHydraWindow() as unknown as {
      osc: HydraShaderFn;
      noise: HydraShaderFn;
      concentricMask: HydraShaderFn;
      concentricSquareMask: HydraShaderFn;
      perspectiveSlatMask: HydraShaderFn;
      gaussianNoiseGrid: HydraShaderFn;
      fillLayerSrc: HydraShaderFn;
      shapeLayerSrc: HydraShaderFn;
      superformulaSrc: HydraShaderFn;
      mirrorStripesSrc: HydraShaderFn;
      plasmaSrc: HydraShaderFn;
      patternNoiseSrc: HydraShaderFn;
      patternCellsSrc: HydraShaderFn;
      patternTilesSrc: HydraShaderFn;
      patternPolarSrc: HydraShaderFn;
      patternGeometrySrc: HydraShaderFn;
      electricNoiseSrc: HydraShaderFn;
      plexusSrc: HydraShaderFn;
      universeWithinSrc: HydraShaderFn;
      fractalFoldSrc: HydraShaderFn;
      topoContourSrc: HydraShaderFn;
      src: HydraShaderFn;
      shape: HydraShaderFn;
      solid: HydraShaderFn;
      voronoi: HydraShaderFn;
      o0: HydraShaderChain;
      o1: HydraShaderChain;
      o2?: HydraShaderChain;
      o3?: HydraShaderChain;
      s0: NonNullable<ReturnType<typeof getHydraWindow>["s0"]>;
      s1: NonNullable<ReturnType<typeof getHydraWindow>["s1"]>;
      time?: number;
    };
    const { osc, noise, concentricMask, concentricSquareMask, perspectiveSlatMask, gaussianNoiseGrid, fillLayerSrc, shapeLayerSrc, superformulaSrc, mirrorStripesSrc, plasmaSrc, patternNoiseSrc, patternCellsSrc, patternTilesSrc, patternPolarSrc, patternGeometrySrc, electricNoiseSrc, plexusSrc, universeWithinSrc, fractalFoldSrc, topoContourSrc, src, shape, solid, o0, o1, o2, o3, s0, s1 } = hydra;
    const liveTime = () => hydraRef.current?.synth?.time ?? 0;
    if (typeof osc === "undefined" || typeof noise === "undefined") return;

    beginHydraRender();
    try {
      const fx = resolveFxState();
      if (!fx) return;

      const getLogicalMix = () => {
        let val = 0;
        if (transitionStateRef.current.active) {
          const elapsed = performance.now() - transitionStateRef.current.startTime;
          let progress = elapsed / transitionStateRef.current.duration;
          if (progress >= 1.0) {
            progress = 1.0;
            transitionStateRef.current.active = false;
            activeChannelRef.current = activeChannelRef.current === 0 ? 1 : 0;
          }
          // Ease in out cubic — full 0→1 for each clip change (no manual mix)
          val =
            progress < 0.5
              ? 4 * progress * progress * progress
              : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        }
        return Math.max(0, Math.min(1, val));
      };

      const mixUniform = () => getLogicalMix();
      const actualMixUniform = () =>
        activeChannelRef.current === 0 ? mixUniform() : 1.0 - mixUniform();

      const getActiveTransitionType = () =>
        transitionStateRef.current.active
          ? transitionStateRef.current.resolvedType
          : Math.max(
              0,
              Math.min(
                TRANSITION_STYLE_MAX,
                Math.round(Number(resolveFxState()?.transition?.params?.type ?? 0)),
              ),
            );

      const sceneTransitionType = getActiveTransitionType();

      const getZoomScale = (isIncoming: boolean) => {
        if (!transitionStateRef.current.active || !isIncoming) return 1.0;
        if (getActiveTransitionType() !== TRANSITION_STYLE.zoom) return 1.0;
        return 1.0 + (1.0 - mixUniform()) * 2.0;
      };

      const getClapScaleY = (isIncoming: boolean) => {
        if (!transitionStateRef.current.active) return 1.0;
        if (getActiveTransitionType() !== TRANSITION_STYLE.clap) return 1.0;
        return clapScaleY(mixUniform(), isIncoming);
      };

      const getS0ScaleX = () => SOURCE_EDGE_OVERSCAN * getZoomScale(activeChannelRef.current === 1);
      const getS1ScaleX = () => SOURCE_EDGE_OVERSCAN * getZoomScale(activeChannelRef.current === 0);
      const getS0ScaleY = () => {
        const zoom = getZoomScale(activeChannelRef.current === 1);
        if (zoom !== 1.0) return SOURCE_EDGE_OVERSCAN * zoom;
        return SOURCE_EDGE_OVERSCAN * getClapScaleY(activeChannelRef.current === 1);
      };
      const getS1ScaleY = () => {
        const zoom = getZoomScale(activeChannelRef.current === 0);
        if (zoom !== 1.0) return SOURCE_EDGE_OVERSCAN * zoom;
        return SOURCE_EDGE_OVERSCAN * getClapScaleY(activeChannelRef.current === 0);
      };

      const getS0ScrollX = () => {
        if (!transitionStateRef.current.active) return 0.0;
        if (activeChannelRef.current !== 1) return 0.0;
        if (!usesSlideScroll(getActiveTransitionType())) return 0.0;
        return 1.0 - mixUniform();
      };

      const getS1ScrollX = () => {
        if (!transitionStateRef.current.active) return 0.0;
        if (activeChannelRef.current !== 0) return 0.0;
        if (!usesSlideScroll(getActiveTransitionType())) return 0.0;
        return 1.0 - mixUniform();
      };

      const getPix = () => {
        const type = getActiveTransitionType();
        if (!transitionStateRef.current.active || type !== TRANSITION_STYLE.pixelate) {
          return 10000;
        }
        const m = mixUniform();
        const strength = 1.0 - Math.abs(m - 0.5) * 2.0;
        return 10000 - strength * 9900;
      };

      const getSlideBlurSpread = () => {
        if (
          !transitionStateRef.current.active ||
          getActiveTransitionType() !== TRANSITION_STYLE.slide
        ) {
          return 0;
        }
        return slideBlurStrength(mixUniform()) * 0.05;
      };

      const compositeMixUniform = () => {
        if (
          transitionStateRef.current.active &&
          getActiveTransitionType() === TRANSITION_STYLE.clap
        ) {
          const hard = mixUniform() < 0.5 ? 0 : 1;
          return activeChannelRef.current === 0 ? hard : 1 - hard;
        }
        return actualMixUniform();
      };

      const getPrimaryVideoAspect = () => {
        const v = getHydraWindow().s0?.src;
        if (v instanceof HTMLVideoElement && v.videoWidth > 0 && v.videoHeight > 0) {
          return v.videoWidth / v.videoHeight;
        }
        const canvas = canvasRef.current;
        if (canvas && canvas.height > 0) return canvas.width / canvas.height;
        return 16 / 9;
      };

      const getStudioSourceScaleX = () => {
        if (!studioModeRef.current) return 1;
        const canvas = canvasRef.current;
        if (!canvas) return 1;
        return sourceAspectCorrectScale(getPrimaryVideoAspect(), canvas.width, canvas.height).scaleX;
      };

      const getStudioSourceScaleY = () => {
        if (!studioModeRef.current) return 1;
        const canvas = canvasRef.current;
        if (!canvas) return 1;
        return sourceAspectCorrectScale(getPrimaryVideoAspect(), canvas.width, canvas.height).scaleY;
      };

      const applyColorGrade = (
        vid: HydraShaderChain,
        fxKey: "colorAdjust" | "colorLayer",
      ): HydraShaderChain => {
        if (!resolveFxState()?.[fxKey]?.enabled) return vid;
        const getLuma = () =>
          computeFxAmount(fxKey, resolveFxState()?.[fxKey], liveHydraBands(), COLOR_GRADE_LUMA_OPTS);
        const getContrast = () => resolveParamValue(fxKey, "contrast", 1.0);
        const getHue = () => resolveParamValue(fxKey, "hue", 0.0) / 360;
        const getSat = () =>
          Math.max(0, Math.min(2, resolveParamValue(fxKey, "saturation", 1.0)));
        return vid.brightness(getLuma).contrast(getContrast).hue(getHue).saturate(getSat);
      };

      const buildChannelChain = (
        source: typeof s0,
        scaleX: () => number,
        scaleY: () => number,
        scrollX: () => number,
      ) => {
        let vid = src(source)
          .scale(
            () => scaleX() * getStudioSourceScaleX(),
            () => scaleY() * getStudioSourceScaleY(),
          )
          .scrollX(scrollX)
          .pixelate(getPix, getPix) as HydraShaderChain;

        if (sceneTransitionType === TRANSITION_STYLE.slide) {
          const blurSpreadX = getSlideBlurSpread;
          const tapMix = () => Math.min(0.4, blurSpreadX() * 8);
          vid = vid
            .blend(
              src(source)
                .scale(
                  () => scaleX() * getStudioSourceScaleX(),
                  () => scaleY() * getStudioSourceScaleY(),
                )
                .scrollX(() => scrollX() - blurSpreadX())
                .pixelate(getPix, getPix),
              tapMix,
            )
            .blend(
              src(source)
                .scale(
                  () => scaleX() * getStudioSourceScaleX(),
                  () => scaleY() * getStudioSourceScaleY(),
                )
                .scrollX(() => scrollX() + blurSpreadX())
                .pixelate(getPix, getPix),
              tapMix,
            ) as HydraShaderChain;
        }
        return applyColorGrade(vid, "colorAdjust");
      };

      const s0Chain = buildChannelChain(s0, getS0ScaleX, getS0ScaleY, getS0ScrollX);
      const s1Chain = buildChannelChain(s1, getS1ScaleX, getS1ScaleY, getS1ScrollX);

      let chain: HydraShaderChain;
      if (sceneTransitionType === TRANSITION_STYLE.mask) {
        const getMaskSize = () => actualMixUniform() * 1.55;
        chain = s0Chain.layer(s1Chain.mask(shape(100, getMaskSize, 0.07))) as HydraShaderChain;
      } else {
        chain = s0Chain.blend(s1Chain, compositeMixUniform) as HydraShaderChain;
      }

      const isolateKey = getHydraWindow().__hydraIsolateFxKey;
      const renderChain: FxChainNode[] = isolateKey
        ? [{ kind: "fx", key: isolateKey as keyof FolderConfig["fx"] }]
        : mergePlaybackKeysOntoRenderChain(
            [...resolveActiveRenderChain({
              activeChain: settingsRef.current.activeChain,
              activeFxList: settingsRef.current.activeFxList,
              fxGroups: settingsRef.current.fxGroups,
            })],
            settingsRef.current.activeFxList ?? [],
          );
      const chainKeys = flattenFxKeysFromChain(renderChain);
      if (chainKeys.includes("timeGlitch")) {
        const getTimeGlitchAmount = () => {
          if (!isTimeGlitchBufferReady()) return 0;
          return computeFxAmount(
            "timeGlitch",
            resolveFxState()?.timeGlitch,
            liveHydraBands(),
            FX_AMT_01,
          );
        };
        chain = chain.timeGlitchSlices(getTimeGlitchSampler(), getTimeGlitchAmount);
      }
      const overlayChainSrc = (key: OverlayCanvasOwner) => {
        const overlaySource = getOverlayHydraSource(key);
        return overlaySource ? src(overlaySource) : null;
      };
      const fxAmt = (
        key: keyof FolderConfig["fx"],
        opts: FxAmountOptions = FX_AMT_01,
      ) => {
        const instanceEffectKey =
          fxRowOverride?.templateKey === key ? fxRowOverride.effectKey : undefined;
        return () => {
          if (instanceEffectKey) {
            const live = resolveInstanceRow(String(key), instanceEffectKey);
            if (live) {
              return computeFxAmount(instanceEffectKey, live, liveHydraBands(), opts);
            }
          }
          if (fxRowOverride?.templateKey === key) {
            return computeFxAmount(
              fxRowOverride.effectKey,
              fxRowOverride.config,
              liveHydraBands(),
              opts,
            );
          }
          return computeFxAmount(String(key), resolveFxState()?.[key], liveHydraBands(), opts);
        };
      };

      const stacksRef = {
        chainStack: [cloneHydraChain(chain)] as HydraShaderChain[],
        layerSourceStack: [] as HydraShaderChain[],
      };
      const groupMaskCompositeOpts = (groupId: string) => ({
        chainStack: stacksRef.chainStack,
        getMaskReveal: () => resolveGroupParamValue(groupId, "maskReveal", 0),
        getMaskReach: () => resolveGroupParamValue(groupId, "maskReach", 0),
        getMaskThreshold: () => resolveGroupParamValue(groupId, "maskThreshold", 0.35),
        getMaskSoftness: () => resolveGroupParamValue(groupId, "maskSoftness", 0.12),
        getMaskInvert: () => resolveGroupParamValue(groupId, "maskInvert", 0),
      });
      const buildLayerFromInstance = (inst: LayerInstance, effectKey: string) =>
        buildLayerInstanceChain(inst, {
          hydraRef,
          effectKey,
          hydra: {
            fillLayerSrc,
            shapeLayerSrc,
            superformulaSrc,
            plasmaSrc,
            patternNoiseSrc,
            patternCellsSrc,
            patternTilesSrc,
            patternPolarSrc,
            patternGeometrySrc,
            electricNoiseSrc,
            plexusSrc,
            universeWithinSrc,
            fractalFoldSrc,
            topoContourSrc,
            gaussianNoiseGrid,
            noise,
            solid,
            src,
            s0,
            s1,
          },
          activeChannelRef,
          renderQualityRef,
          electricNoiseCirclePackRef,
          liveHydraBands: liveHydraBands as BuildLayerInstanceContext["liveHydraBands"],
        });

      /** Aux FBO so coord warps (blur, liquix) sample the composited chain. */
      let blurFlushOut: HydraShaderChain | null = null;
      let blurPassOut: HydraShaderChain | null = null;
      /** The 7C prism gathers neighbours, so it needs the chain in a texture it does not write. */
      let prismFlushOut: HydraShaderChain | null = null;

      const applyFxKey = (key: string) => {
        const fxRow =
          fxRowOverride?.templateKey === key
            ? fxRowOverride.config
            : resolveFxState()?.[key as keyof FolderConfig["fx"]];
        if (!fxRow) return;
        if (!fxRow.enabled && isolateKey !== key) return;

        if (key === 'layerBlend') {
          const getLayerAmount = fxAmt("layerBlend");
          const { s2 } = getHydraWindow();
          const layerBlendMode = clampLayerBlendMode(Number(fxRow.params?.mode) || 0);
          const layerSrc = src(s2).scale(SOURCE_EDGE_OVERSCAN);
          const getLayerBlendLuma = () => {
            const amt = getLayerAmount();
            return amt < 0.00001 ? 2.0 : amt;
          };

          chain = applyLayerComposite({
            chain,
            layerSrc,
            mode: layerBlendMode,
            getAmount: getLayerAmount,
            solid,
            getLayerLuma: getLayerBlendLuma,
            layerSourceStack: stacksRef.layerSourceStack,
          });
        }

        if (key === "shatterLayer") {
          const getAmount = fxAmt("shatterLayer");
          const getDensity = () => resolveParamValue("shatterLayer", "density", 14);
          const getGap = () => resolveParamValue("shatterLayer", "gap", 0.065);
          const getScatter = () => resolveParamValue("shatterLayer", "scatter", 0.62);
          const getIrregularity = () => resolveParamValue("shatterLayer", "irregularity", 0.82);
          const { s2 } = getHydraWindow();
          const revealSource =
            Math.round(Number(fxRow.params?.mode) || 0) >= 1
              ? src(s2).scale(SOURCE_EDGE_OVERSCAN)
              : solid(0, 0, 0);
          chain = chain
            .shatterLayerCoord(getAmount, getDensity, getScatter, getIrregularity)
            .shatterLayerGap(revealSource, getAmount, getDensity, getGap, getIrregularity);
        }

        if (key === "videoMap") {
          const getAmount = fxAmt("videoMap");
          const { s2 } = getHydraWindow();
          const mapMode = Math.max(0, Math.min(1, Math.round(Number(fxRow.params?.mode) || 0)));
          const invertOn = Math.round(Number(fxRow.params?.invert) || 0) >= 1;
          if (mapMode >= 1) {
            const getDisplace = () => {
              const amt = getAmount();
              return (invertOn ? -amt : amt) * 0.5;
            };
            chain = chain.modulate(src(s2), getDisplace);
          } else {
            const getInvert = () => resolveParamValue("videoMap", "invert", 0);
            const getThreshold = () => resolveParamValue("videoMap", "threshold", 0.35);
            const getSoftness = () => resolveParamValue("videoMap", "softness", 0.12);
            chain = chain.videoMapMask(src(s2), getAmount, getInvert, getThreshold, getSoftness);
          }
        }

        if (key === "playbackCue") {
          const { s2 } = getHydraWindow();
          if (s2) {
            chain = applyLayerComposite({
              chain,
              layerSrc: src(s2).scale(SOURCE_EDGE_OVERSCAN),
              mode: 4,
              getAmount: () => 1,
              solid,
              layerWithoutLuma: true,
              layerSourceStack: stacksRef.layerSourceStack,
            });
          }
        }

        if (key === 'maskVideo') {
          const getSize = () => resolveParamValue("maskVideo", "size", 0.22);
          const getShuffle = () => resolveParamValue("maskVideo", "shuffle", 0.35);

          const rectLayouts = () => {
            const rate = Math.max(0, getShuffle());
            const posSeg = rate <= 0 ? 0 : Math.floor(liveTime() * rate);
            return layoutMaskVideoRects(
              posSeg,
              getSize(),
              window.innerWidth / Math.max(1, window.innerHeight),
            );
          };

          const chainVideoCrop = (
            getZoom: () => number,
            getPanX: () => number,
            getPanY: () => number,
          ) =>
            cloneHydraChain(chain)
              .scale(getZoom, getZoom)
              .scrollX(getPanX)
              .scrollY(getPanY);

          const addRect = (rectIndex: number) => {
            const layout = () => rectLayouts()[rectIndex];
            chain = chain.maskVideoRectCutout(
              chainVideoCrop(
                () => layout().zoom,
                () => layout().panX,
                () => layout().panY,
              ),
              () => layout().cx,
              () => layout().cy,
              () => layout().halfWx,
              () => layout().halfHy,
            );
          };
          addRect(0);
          addRect(1);
          addRect(2);
        }

        if (key === 'midlineStretch') {
          const getStretchAmt = fxAmt("midlineStretch");
          const getSplitY = () => resolveParamValue("midlineStretch", "splitY", 0.5);
          chain = chain.midlineStretch(getStretchAmt, getSplitY);
        }

        if (key === "centerDiffuse") {
          const getCenterDiffuseAmt = fxAmt("centerDiffuse");
          const getCenterY = () => resolveParamValue("centerDiffuse", "centerY", 0.5);
          const getBand = () => resolveParamValue("centerDiffuse", "band", 0.06);
          const getDiffusion = () => resolveParamValue("centerDiffuse", "diffusion", 0.72);

          chain = chain.centerStripMap(
            getCenterDiffuseAmt,
            getCenterY,
            getBand,
            getDiffusion,
          );

          chain = chain.modulateScrollY(
            noise(5, 0.05)
              .scale(1, 10)
              .scrollY(() => getCenterDiffuseAmt() * getDiffusion() * 0.035),
            () => getCenterDiffuseAmt() * getDiffusion() * 0.24,
          );
        }

        if (key === 'circleGlitch') {
          const getCircleGlitchAmt = fxAmt("circleGlitch", {
            clampMin: 0,
            clampMax: 0.5,
            paramMin: 0,
            paramMax: 0.5,
          });
          const getFreq = () => resolveParamValue("circleGlitch", "frequency", 10);
          const getSpread = () => resolveParamValue("circleGlitch", "spread", 0.2);
          const getCircleGlitchMod = () => {
            const amt = getCircleGlitchAmt();
            if (amt < 0.00001) return 0;
            return amt * getSpread();
          };
          chain = chain.modulateScale(
            osc(getFreq, 0.1, 0).kaleid(6).mask(shape(100, 0.5, 0.5)),
            getCircleGlitchMod,
          );
        }

        if (key === 'glitch') {
          const glitchAmtOpts = {
            clampMin: 0,
            clampMax: 10,
            paramMin: 0,
            paramMax: 10,
          };
          const getGlitchAmount = fxAmt("glitch", glitchAmtOpts);
          const builtLayerCount = resolveGlitchRectCount(
            computeFxAmount("glitch", resolveFxState()?.glitch, liveHydraBands(), glitchAmtOpts),
          );
          const getRectCount = () =>
            Math.min(builtLayerCount, resolveGlitchRectCount(getGlitchAmount()));
          const getGlitchBlockSize = () =>
            resolveGlitchBlockSize(resolveParamValue("glitch", "size", 5));
          const getBlockMix = () => glitchBlockMix(getGlitchBlockSize());
          const getLayerMix = (layerIndex: number) => {
            if (layerIndex >= getRectCount()) return 0;
            return getBlockMix();
          };
          const getGlitchSpeed = () => Math.max(0, resolveParamValue("glitch", "speed", 1.15));
          const getGlitchTravelMix = () => resolveGlitchTravel(resolveParamValue("glitch", "travel", 1));
          const getGlitchTearMix = () => resolveGlitchTear(resolveParamValue("glitch", "tear", 1));
          const getGlitchDiffScale = () => {
            if (getRectCount() < 1 || getBlockMix() < 0.00001) return 0;
            return 1;
          };
          const glitchTear = (baseAmp: number, phase: number, tearRate: number, layerIndex: number) => () => {
            const mix = getLayerMix(layerIndex);
            if (mix < 0.00001) return 0;
            const t = liveTime() * getGlitchSpeed();
            const step = Math.floor(t * tearRate);
            const jump = Math.sin(step * 6.283 + phase) * 0.5 + Math.sin(step * 4.1 + phase * 1.7) * 0.3;
            const drift = Math.sin(t * (2.2 + phase * 0.3) + phase) * 0.35;
            return (jump + drift) * baseAmp * getGlitchTearMix() * mix;
          };
          const glitchTravelPivot = (
            phase: number,
            rate: number,
            spread: number,
            layerIndex: number,
          ) => () => {
            if (getLayerMix(layerIndex) < 0.00001) return 0.5;
            return computeGlitchTravelMotion(
              phase,
              rate,
              spread,
              layerIndex,
              liveTime(),
              getGlitchSpeed(),
              getGlitchTravelMix(),
            ).pivot;
          };
          const glitchTravelScroll = (
            phase: number,
            rate: number,
            spread: number,
            layerIndex: number,
          ) => () => {
            if (getLayerMix(layerIndex) < 0.00001) return 0;
            return computeGlitchTravelMotion(
              phase,
              rate,
              spread,
              layerIndex,
              liveTime(),
              getGlitchSpeed(),
              getGlitchTravelMix(),
            ).scroll;
          };
          const makeGlitchLayer = (preset: (typeof GLITCH_LAYER_PRESETS)[number], layerIndex: number) =>
            shape(
              4,
              () => {
                const mix = getLayerMix(layerIndex);
                if (mix < 0.00001) return 0;
                return glitchShapeRadius(preset.shapeScale, getGlitchBlockSize());
              },
              0.001,
            )
              .scale(
                () => glitchScaleAmount(getLayerMix(layerIndex)),
                () => glitchAxisMult(preset.xMult, getLayerMix(layerIndex)),
                () => glitchAxisMult(preset.yMult, getLayerMix(layerIndex)),
                glitchTravelPivot(preset.travelPhaseX, preset.travelRateX, preset.travelSpreadX, layerIndex),
                glitchTravelPivot(preset.travelPhaseY, preset.travelRateY, preset.travelSpreadY, layerIndex),
              )
              .scrollX(
                () =>
                  glitchTravelScroll(preset.travelPhaseX, preset.travelRateX, preset.travelSpreadX, layerIndex)() +
                  glitchTear(preset.tearAmpX, preset.tearPhaseX, preset.tearRateX, layerIndex)(),
              )
              .scrollY(
                () =>
                  glitchTravelScroll(preset.travelPhaseY, preset.travelRateY, preset.travelSpreadY, layerIndex)() +
                  glitchTear(preset.tearAmpY, preset.tearPhaseY, preset.tearRateY, layerIndex)(),
              );

          if (builtLayerCount >= 1) {
            let glitchNode = makeGlitchLayer(
              GLITCH_LAYER_PRESETS[builtLayerCount - 1]!,
              builtLayerCount - 1,
            ).mult(solid(getGlitchDiffScale, getGlitchDiffScale, getGlitchDiffScale));
            for (let i = builtLayerCount - 2; i >= 0; i--) {
              glitchNode = makeGlitchLayer(GLITCH_LAYER_PRESETS[i]!, i).diff(glitchNode);
            }
            chain = chain.diff(glitchNode);
          }
        }

        if (key === "dataDrip") {
          const getDripAmt = fxAmt("dataDrip");
          const getColumns = () => resolveParamValue("dataDrip", "columns", 72);
          const getChaos = () => resolveParamValue("dataDrip", "chaos", 0.35);
          const getDance = () => resolveParamValue("dataDrip", "dance", 0.65);
          const getSpeed = () => resolveParamValue("dataDrip", "speed", 1.0);
          chain = chain.dataDrip(getDripAmt, getColumns, getChaos, getDance, getSpeed);
        }

        if (key === "liquix") {
          const getLiqAmt = fxAmt("liquix");
          const getPivot = () => resolveParamValue("liquix", "pivot", 0.48);
          const getLiqBands = () => resolveParamValue("liquix", "bands", 56);
          const getLiqSpeed = () => resolveParamValue("liquix", "speed", 1.28);
          if (blurFlushOut) {
            groupFeedbackCommits.push({ out: blurFlushOut, buffer: cloneHydraChain(chain) });
            chain = src(blurFlushOut);
          }
          chain = chain.liquix(getLiqAmt, getPivot, getLiqBands, getLiqSpeed);
        }

        if (key === "metalSphere") {
          chain = chain.metalSphereScene(
            o0,
            fxAmt("metalSphere"),
            () => resolveParamValue("metalSphere", "size", 1),
            () => resolveParamValue("metalSphere", "noise", 0.42),
            () => resolveParamValue("metalSphere", "detail", 3.5),
            () => resolveParamValue("metalSphere", "speed", 0.75),
            () => resolveParamValue("metalSphere", "roughness", 0.1),
            () => resolveParamValue("metalSphere", "reflection", 1.05),
            () => resolveParamValue("metalSphere", "rotation", 0.35),
            () => getPrimaryVideoAspect(),
          );
        }

        if (key === "pulseMarch") {
          chain = chain.pulseMarchColor(
            fxAmt("pulseMarch"),
            () => resolveParamValue("pulseMarch", "morph", 0.55),
            () => resolveParamValue("pulseMarch", "speed", 1.1),
            () => resolveParamValue("pulseMarch", "detail", 4.5),
            () => resolveParamValue("pulseMarch", "glow", 0.65),
          );
        }

        if (key === "warpTunnel") {
          const tunnelVideo = activeChannelRef.current === 0 ? s0 : s1;
          const getWarpAudioBoost = () => {
            const fxCfg = resolveFxState()?.warpTunnel;
            if (!fxCfg) return 0;
            return getBandValue("warpTunnel", fxCfg.syncBand ?? "master", liveHydraBands()) * (fxCfg.syncMultiplier ?? 0.45);
          };
          const getWarpQuality = () => renderQualityProfile(renderQualityRef.current).warpTunnelQuality;
          chain = chain.warpTunnelColor(
            tunnelVideo,
            fxAmt("warpTunnel"),
            () => resolveParamValue("warpTunnel", "speed", 0.55),
            () => resolveParamValue("warpTunnel", "refraction", 0.72),
            () => resolveParamValue("warpTunnel", "shine", 0.68),
            () => resolveParamValue("warpTunnel", "arms", 3),
            () => resolveParamValue("warpTunnel", "fog", 0.62),
            getWarpAudioBoost,
            getWarpQuality,
          );
        }

        if (key === "throughTheStars") {
          const starsSrc = overlayChainSrc("throughTheStars");
          if (throughTheStarsBridgeReadyRef.current && starsSrc) {
            const getStarsAmt = fxAmt("throughTheStars");
            stacksRef.layerSourceStack.push(starsSrc);
            const getStarsGlow = () => resolveParamValue("throughTheStars", "glow", 0.74);
            chain = chain.throughTheStarsOverlay(starsSrc, getStarsAmt, getStarsGlow);
          }
        }

        if (key === 'distortion') {
          const getDistAmount = fxAmt("distortion");
          const getDistMode = () => Math.round(resolveParamValue("distortion", "mode", 0));
          const getDistCurve = () => Math.max(0.2, resolveParamValue("distortion", "curvature", 0.9));
          const mode = getDistMode();
          if (mode >= 1) {
            const getSweepStrength = () => {
              const v = getDistAmount();
              return typeof v === "number" ? Math.max(0, Math.min(1, v)) * 0.14 : 0;
            };
            const getSweepPhase =
              () => resolveParamValue("distortion", "speed", 1.2) * liveTime() * 2.2;
            const getSweepFreq = () =>
              Math.max(0.5, resolveParamValue("distortion", "frequency", 10));
            const getSweepMode = () => mode - 1;
            const getSweepCenter = () =>
              Math.max(0.2, resolveParamValue("distortion", "centerFocus", 1.4));
            chain = chain
              .scale(() => window.innerWidth / window.innerHeight, 1)
              .oscilloscopeDistort(
                getSweepStrength,
                getSweepFreq,
                getSweepPhase,
                getSweepMode,
                getSweepCenter,
              )
              .scale(() => window.innerHeight / window.innerWidth, 1);
          } else {
            chain = chain.lensDistort(getDistAmount, getDistCurve);
          }
        }

        if (key === "wetLens") {
          const getWetAmt = fxAmt("wetLens");
          const getWetDensity = () => resolveParamValue("wetLens", "density", 18);
          const getWetSpeed = () => resolveParamValue("wetLens", "speed", 0.26);
          const getWetRefract = () => resolveParamValue("wetLens", "refraction", 0.76);
          const getWetHighlights = () => resolveParamValue("wetLens", "highlights", 0.42);
          const getWetGravity = () => resolveParamValue("wetLens", "gravity", 0.74);
          chain = chain
            .wetLensDistort(getWetAmt, getWetDensity, getWetSpeed, getWetRefract, getWetGravity)
            .wetLensOverlay(getWetAmt, getWetDensity, getWetSpeed, getWetHighlights, getWetGravity);
        }

        if (key === "pixelSort") {
          const getPsAmt = fxAmt("pixelSort");
          const psVideo = activeChannelRef.current === 0 ? s0 : s1;
          const getPsThreshold = () => resolveParamValue("pixelSort", "threshold", 0.45);
          const getPsReach = () => resolveParamValue("pixelSort", "reach", 0.4);
          const getPsChaos = () => resolveParamValue("pixelSort", "chaos", 0.7);
          const getPsDirection = () =>
            Math.max(0, Math.min(3, Math.round(resolveParamValue("pixelSort", "direction", 0))));
          chain = chain.pixelSortSmear(psVideo, getPsAmt, getPsThreshold, getPsReach, getPsChaos, getPsDirection);
        }

        if (key === "emberHeat") {
          const getAmount = fxAmt("emberHeat");
          const getSpeed = () => resolveParamValue("emberHeat", "speed", 0.8);
          const getDensity = () => resolveParamValue("emberHeat", "density", 22);
          const getWaves = () => resolveParamValue("emberHeat", "waves", 0.76);
          const getGlow = () => resolveParamValue("emberHeat", "glow", 0.82);
          const getIntensity = () => resolveParamValue("emberHeat", "intensity", 0.78);
          chain = chain
            .emberHeatDistort(getAmount, getSpeed, getDensity, getWaves)
            .emberHeatOverlay(getAmount, getDensity, getSpeed, getGlow, getWaves, getIntensity)
            .emberHeatFlow(
              src(o0).scrollY(() => -(0.0016 + getSpeed() * 0.0008)),
              getAmount,
              getWaves,
            );
        }

        if (key === "normalMap") {
          const getNmAmt = fxAmt("normalMap");
          const nmVideo = activeChannelRef.current === 0 ? s0 : s1;
          const getNmSource = () => resolveParamValue("normalMap", "source", 1);
          const getNmScale = () => resolveParamValue("normalMap", "scale", NORMAL_MAP_VORONOI_SCALE);
          const getNmRefract = () => resolveParamValue("normalMap", "refraction", NORMAL_MAP_VORONOI_REFRACTION);
          const getNmLighting = () =>
            getNmSource() >= 0.5
              ? NORMAL_MAP_BUMP_LIGHTING
              : resolveParamValue("normalMap", "lighting", NORMAL_MAP_BUMP_LIGHTING);
          const getNmSpecular = () => resolveParamValue("normalMap", "specular", 0.4);
          const getNmLightX = () => resolveParamValue("normalMap", "lightX", 0.65);
          const getNmLightY = () => resolveParamValue("normalMap", "lightY", 0.35);
          const getNmDetail = () => resolveParamValue("normalMap", "detail", 1.05);
          if (getNmSource() < 0.5) {
            chain = chain.normalMapDistort(
              getNmAmt,
              getNmScale,
              () => NORMAL_MAP_ANIM_SPEED,
              getNmRefract,
              getNmDetail,
            );
          }
          chain = chain.normalMapLight(
            nmVideo,
            getNmAmt,
            getNmSource,
            getNmScale,
            () => NORMAL_MAP_ANIM_SPEED,
            getNmLighting,
            getNmSpecular,
            getNmLightX,
            getNmLightY,
            getNmDetail,
          );
        }

        if (key === "reactionDiffusion") {
          const getRdAmt = fxAmt("reactionDiffusion");
          const rdDisplay = hydraOutputDisplaySampler(
            () =>
              (hydraRef.current as { o?: Array<{ getCurrent?: () => unknown }> } | null)?.o?.[
                REACTION_DIFF_OUTPUT_INDEX
              ],
          );
          chain = chain.reactionDiffusionOverlay(src(rdDisplay), getRdAmt);
        }

        if (key === "lumaDust") {
          const dustSrc = overlayChainSrc("lumaDust");
          if (lumaDustBridgeReadyRef.current && dustSrc) {
            const getDustAmt = fxAmt("lumaDust");
            stacksRef.layerSourceStack.push(dustSrc);
            chain = chain.lumaDustOverlay(dustSrc, getDustAmt);
          }
        }

        if (key === "lumaLock") {
          const lockSrc = overlayChainSrc("lumaLock");
          if (lumaLockBridgeReadyRef.current && lockSrc) {
            const getLockAmt = fxAmt("lumaLock");
            stacksRef.layerSourceStack.push(lockSrc);
            chain = chain.lumaLockOverlay(lockSrc, getLockAmt, () => 0.45);
          }
        }

        if (key === "concentricRotate") {
          chain = chain.concentricRotateDistort(
            fxAmt("concentricRotate"),
            () => resolveParamValue("concentricRotate", "mode", 0),
            () => resolveParamValue("concentricRotate", "rings", 7),
            () => resolveParamValue("concentricRotate", "step", 0.08),
            () => resolveParamValue("concentricRotate", "speed", 0.25),
            () => resolveParamValue("concentricRotate", "centerX", 0.5),
            () => resolveParamValue("concentricRotate", "centerY", 0.5),
          );
        }

        if (key === "ripple") {
          const getRippleAmt = fxAmt("ripple");
          const getRippleFreq = () => resolveParamValue("ripple", "frequency", 8);
          const getRippleSpeed = () => resolveParamValue("ripple", "speed", 1.0);
          const getRippleDecay = () => resolveParamValue("ripple", "decay", 0.5);
          const getRippleCenterX = () => resolveParamValue("ripple", "centerX", 0.5);
          const getRippleCenterY = () => resolveParamValue("ripple", "centerY", 0.5);
          chain = chain.rippleDistort(
            getRippleAmt,
            getRippleFreq,
            getRippleSpeed,
            getRippleDecay,
            getRippleCenterX,
            getRippleCenterY,
          );
        }

        if (key === "randomGallery") {
          const getGalleryAmt = fxAmt("randomGallery");
          const getGalleryCells = () => resolveParamValue("randomGallery", "cells", 7);
          const getGallerySpeed = () => resolveParamValue("randomGallery", "speed", 0.72);
          const getGalleryRefract = () => resolveParamValue("randomGallery", "refraction", 0.78);
          const getGalleryDrift = () => resolveParamValue("randomGallery", "drift", 0.78);
          chain = chain.randomGalleryDistort(
            getGalleryAmt,
            getGalleryCells,
            getGallerySpeed,
            getGalleryRefract,
            getGalleryDrift,
          );
        }

        if (key === "gridShuffle") {
          const getShuffleAmt = () => {
            const fxCfg = resolveFxState()?.gridShuffle;
            if (!fxCfg?.enabled) return 0;
            return Math.max(0, Math.min(1, Number(fxCfg.base ?? 1)));
          };
          const getShuffleCells = () => resolveParamValue("gridShuffle", "cells", 4);
          const getShuffleChaos = () => resolveParamValue("gridShuffle", "chaos", 1);
          chain = chain.gridShuffleDistort(
            getShuffleAmt,
            getShuffleCells,
            getShuffleChaos,
            getGridShuffleSeed,
          );
        }

        if (key === "customShader") {
          const shaderType = Math.round(Number(fxRow.params?.shaderType ?? 0));
          const code =
            typeof fxRow.params?.code === "string"
              ? fxRow.params.code
              : defaultCustomShaderCode(shaderType);
          const synth = hydraRef.current?.synth;
          if (synth?.setFunction) {
            const wrapped = wrapCustomShaderGlsl(code, shaderType);
            synth.setFunction({
              name: "customShaderOp",
              type: wrapped.type,
              inputs: [{ type: "float", name: "amount", default: 0.0 }],
              glsl: wrapped.glsl,
            });
          }
          chain = chain.customShaderOp(fxAmt("customShader"));
        }

        if (key === 'mask') {
          const getMaskAmount = fxAmt("mask");
          const getMaskFreq = () => Math.max(0, Math.min(40, resolveParamValue("mask", "frequency", 20)));
          const getMaskSpeed = () => resolveParamValue("mask", "speed", 0.32);
          const getMaskRot = () => resolveParamValue("mask", "rotation", 0.15);
          const getMaskBalance = () => resolveParamValue("mask", "balance", 0.46);
          const shapeMode = Math.max(0, Math.min(4, Math.round(Number(fxRow.params?.shape ?? 0))));
          const blendMode = Math.max(0, Math.min(3, Math.round(Number(fxRow.params?.mode ?? 0))));

          let maskGen;
          if (shapeMode === 0) {
            maskGen = osc(getMaskFreq, getMaskSpeed, 0).rotate(getMaskRot).luma(getMaskBalance, 0.05);
          } else if (shapeMode === 1) {
            maskGen = concentricMask(getMaskFreq, getMaskSpeed, getMaskRot, getMaskBalance);
          } else if (shapeMode === 2) {
            maskGen = concentricSquareMask(getMaskFreq, getMaskSpeed, getMaskRot, getMaskBalance);
          } else if (shapeMode === 3) {
            // Center-anchored density: noise(freq) expands from the UV corner.
            // Hard thresh keeps low-density islands crisp (soft luma looked blurry when zoomed in).
            maskGen = noise(1, getMaskSpeed)
              .scale(() => 1 / Math.max(0.5, getMaskFreq()))
              .thresh(getMaskBalance, 0.0001);
          } else {
            const getMaskPersp = () => resolveParamValue("mask", "perspective", 0.75);
            const getMaskFocus = () => resolveParamValue("mask", "focus", 1.0);
            maskGen = perspectiveSlatMask(
              getMaskFreq, getMaskSpeed, getMaskRot, getMaskBalance, getMaskPersp, getMaskFocus
            );
          }

          // Hydra GlslSource methods mutate and return `this`, so
          // `chain.blend(chain.mask(m), amt)` self-references and fails to compile.
          // Amount-aware equivalents keep the mask generator as a separate branch.
          if (blendMode === 0) {
            chain = chain.mask(solid(1, 1, 1).blend(maskGen, getMaskAmount));
          } else if (blendMode === 1) {
            chain = chain.diff(maskGen.mult(solid(getMaskAmount, getMaskAmount, getMaskAmount)));
          } else if (blendMode === 2) {
            chain = chain.add(maskGen, getMaskAmount);
          } else {
            chain = chain.mult(solid(1, 1, 1).blend(maskGen, getMaskAmount));
          }
        }

        if (key === 'zoom') {
          chain = chain.scale(
            fxAmt("zoom", {
              whenDisabled: 1,
              paramMin: 0.5,
              paramMax: 2,
              clampMin: 0.5,
              clampMax: 2,
            }),
          );
        }

        if (key === 'pulse') {
          const getPulseAmount = fxAmt("pulse");
          const getBreath = () => resolveParamValue("pulse", "breath", 0.5);
          const getBloom = () => resolveParamValue("pulse", "bloom", 0.45);
          // Breath magnifies in only (>1) so no edges are ever exposed.
          const getBreathScale = () => 1.0 + getPulseAmount() * getBreath() * 0.06;
          chain = chain.scale(getBreathScale).pulseGrade(getPulseAmount, getBloom);
        }

        if (key === 'scroll') {
          const getScrollX = fxAmt("scroll", { map: (speed) => speed * liveTime() });
          const getScrollY = () => {
            const speed = resolveParamValue("scroll", "y", 0);
            return speed ? speed * liveTime() : 0;
          };
          chain = chain.scrollX(getScrollX).scrollY(getScrollY);
        }

        if (key === 'wrap') {
          const getWrapAmt = fxAmt("wrap", { clampMin: -1, clampMax: 1 });
          const getWrapCenterX = () => resolveParamValue('wrap', 'centerX', 0.5);
          const getWrapCenterY = () => resolveParamValue('wrap', 'centerY', 0.5);
          const getWrapRadius = () => resolveParamValue('wrap', 'radius', 0.75);
          const getWrapFalloff = () => resolveParamValue('wrap', 'falloff', 0.5);
          const getWrapTwist = () => resolveParamValue('wrap', 'twist', 0);
          chain = chain.customWrap(getWrapAmt, getWrapCenterX, getWrapCenterY, getWrapRadius, getWrapFalloff, getWrapTwist);
        }

        if (key === 'mirror') {
          const getMirrorAmt = fxAmt("mirror");
          const getMirrorAxis = () =>
            Math.max(0, Math.min(3, Math.round(resolveParamValue('mirror', 'axis', 0))));
          const getMirrorAngle = () => resolveParamValue('mirror', 'angle', 0);
          const getMirrorFlip = () => (Number(resolveParamValue('mirror', 'flip', 0)) >= 0.5 ? 1 : 0);
          const getMirrorCenterX = () => resolveParamValue('mirror', 'centerX', 0.5);
          const getMirrorCenterY = () => resolveParamValue('mirror', 'centerY', 0.5);
          chain = chain.customMirror(
            getMirrorAmt,
            getMirrorAxis,
            getMirrorAngle,
            getMirrorFlip,
            getMirrorCenterX,
            getMirrorCenterY,
          );
        }

        if (key === 'tile') {
          const getTileAmt = fxAmt("tile");
          const getTileCols = () =>
            Math.max(1, Math.min(12, Math.round(resolveParamValue('tile', 'cols', 3))));
          const getTileRows = () =>
            Math.max(1, Math.min(12, Math.round(resolveParamValue('tile', 'rows', 3))));
          chain = chain.customTile(getTileAmt, getTileCols, getTileRows);
        }

        if (key === 'vibration') {
          const getVibAmt = () =>
            resolveVibrationShaderAmount(resolveFxState()?.vibration, getHydraWindow().vibrationAmp ?? 0);
          const getVibFreq = () => Math.max(2, resolveParamValue("vibration", "frequency", 12));
          chain = chain.vibrationDistort(getVibAmt, getVibFreq);
        }

        if (key === "shake") {
          const getShakeAmt = fxAmt("shake");
          const getShakeSpeed = () => resolveParamValue("shake", "speed", 1.0);
          const getShakeBounce = () => resolveParamValue("shake", "bounce", 0.55);
          const getShakeRoll = () => resolveParamValue("shake", "roll", 0.4);
          const getShakeZoom = () => resolveParamValue("shake", "zoom", 0.45);
          chain = chain.shakeDistort(getShakeAmt, getShakeSpeed, getShakeBounce, getShakeRoll, getShakeZoom);
        }

        if (key === 'rotate') {
          chain = chain.rotate(
            fxAmt("rotate", { paramMin: -Math.PI, paramMax: Math.PI }),
            () => 0,
          );
        }

        if (key === "rgbDelay") {
          const getRgbDelayAmount = fxAmt("rgbDelay");
          const getRgbDelayScroll = (channelSign: -1 | 0 | 1) => () =>
            rgbDelayScrollOffset(getRgbDelayAmount(), channelSign);
          const getRgbDelayBlend = () => rgbDelayBlendAmount(getRgbDelayAmount());
          chain = chain.blend(
            src(o0)
              .scrollX(getRgbDelayScroll(-1))
              .color(1, 0, 0)
              .add(src(o0).color(0, 1, 0))
              .add(src(o0).scrollX(getRgbDelayScroll(1)).color(0, 0, 1)),
            getRgbDelayBlend,
          );
        }

        if (key === "chromaticAberration") {
          const getCaAmt = fxAmt("chromaticAberration");
          const getCaDir = () => resolveParamValue("chromaticAberration", "direction", 0.125) * Math.PI * 2;
          const getCaScrollX = (channelSign: -1 | 0 | 1) => () =>
            chromaticAberrationScrollOffset(getCaAmt(), getCaDir(), channelSign).x;
          const getCaScrollY = (channelSign: -1 | 0 | 1) => () =>
            chromaticAberrationScrollOffset(getCaAmt(), getCaDir(), channelSign).y;
          chain = chain.blend(
            src(o0)
              .scrollX(getCaScrollX(1))
              .scrollY(getCaScrollY(1))
              .color(1, 0, 0)
              .add(src(o0).color(0, 1, 0))
              .add(
                src(o0)
                  .scrollX(getCaScrollX(-1))
                  .scrollY(getCaScrollY(-1))
                  .color(0, 0, 1),
              ),
            () => chromaticAberrationBlendAmount(getCaAmt()),
          );
        }

        if (key === "degauss") {
          const getDegAmt = () =>
            resolveDegaussShaderAmount(resolveFxState()?.degauss, getHydraWindow().degaussAmp ?? 0);
          const getDegFreq = () => resolveParamValue("degauss", "frequency", 12);
          const getDegSpeed = () => resolveParamValue("degauss", "speed", 1.4);
          const getDegFringe = () => resolveParamValue("degauss", "fringe", 0.55);
          chain = chain.degaussDistort(getDegAmt, getDegFreq, getDegSpeed);
          chain = chain.blend(
            src(o0)
              .scrollX(() => getDegAmt() * getDegFringe() * 0.034)
              .scrollY(() => getDegAmt() * getDegFringe() * 0.012)
              .color(1, 0.15, 0.15)
              .add(src(o0).color(0.12, 1, 0.12))
              .add(
                src(o0)
                  .scrollX(() => -getDegAmt() * getDegFringe() * 0.034)
                  .scrollY(() => -getDegAmt() * getDegFringe() * 0.012)
                  .color(0.15, 0.15, 1),
              ),
            () => getDegAmt() * getDegFringe() * 0.78,
          );
        }

        if (key === "vhs") {
          const getVhsAmt = fxAmt("vhs");
          const getTracking = () => resolveParamValue("vhs", "tracking", 0.48);
          const getVhsSpeed = () => resolveParamValue("vhs", "speed", 1.0);
          const getNoise = () => resolveParamValue("vhs", "noise", 0.38);
          const getLines = () => resolveParamValue("vhs", "lines", 0.52);
          const getDropout = () => resolveParamValue("vhs", "dropout", 0.28);
          const getBleed = () => resolveParamValue("vhs", "bleed", 0.42);
          chain = chain.vhsDistort(getVhsAmt, getTracking, getVhsSpeed);
          chain = chain.vhsColor(getVhsAmt, getNoise, getLines, getDropout);
          chain = chain.blend(
            src(o0)
              .scrollX(() => getVhsAmt() * getBleed() * 0.024)
              .color(1, 0.06, 0.06)
              .add(src(o0).color(0.04, 1, 0.04))
              .add(src(o0).scrollX(() => -getVhsAmt() * getBleed() * 0.024).color(0.06, 0.06, 1)),
            () => getVhsAmt() * getBleed() * 0.44,
          );
        }

        if (key === 'negative') {
          chain = chain.invert(fxAmt("negative"));
        }

        if (key === 'dither') {
          const stochasticBlue = getNoiseTextureSampler("blue64");
          chain = chain.dither(
            stochasticBlue,
            fxAmt("dither"),
            () => resolveParamValue("dither", "binary", 0),
            () => resolveParamValue("dither", "balance", 0.5),
            () => resolveParamValue("dither", "scale", 4),
          );
        }

        if (key === 'rampGradient') {
          const getRampAmt = fxAmt("rampGradient");
          const getRampStops = () =>
            resolveRampGradientShaderStops(
              (paramKey, fallback) => resolveParamValue("rampGradient", paramKey, fallback),
              resolveFxState()?.rampGradient?.params,
            );
          const getStopRgb = (index: number, channel: 0 | 1 | 2) => () => getRampStops()[index]!.rgb[channel];
          const getStopPos = (index: number) => () => getRampStops()[index]!.p;
          const getRampAnimate = () => resolveParamValue("rampGradient", "animate", 0);
          const getRampSpeed = () => resolveParamValue("rampGradient", "speed", 0.45);
          chain = chain.rampGradient(
            getRampAmt,
            () => resolveParamValue("rampGradient", "stopCount", 3),
            getStopRgb(0, 0),
            getStopRgb(0, 1),
            getStopRgb(0, 2),
            getStopPos(0),
            getStopRgb(1, 0),
            getStopRgb(1, 1),
            getStopRgb(1, 2),
            getStopPos(1),
            getStopRgb(2, 0),
            getStopRgb(2, 1),
            getStopRgb(2, 2),
            getStopPos(2),
            getStopRgb(3, 0),
            getStopRgb(3, 1),
            getStopRgb(3, 2),
            getStopPos(3),
            getStopRgb(4, 0),
            getStopRgb(4, 1),
            getStopRgb(4, 2),
            getStopPos(4),
            getStopRgb(5, 0),
            getStopRgb(5, 1),
            getStopRgb(5, 2),
            getStopPos(5),
            getRampAnimate,
            getRampSpeed,
          );
        }

        if (key === "answerPrint") {
          chain = chain.answerPrint(
            fxAmt("answerPrint"),
            () => resolveParamValue("answerPrint", "stock", 0),
            () => resolveParamValue("answerPrint", "density", 1.0),
          );
        }

        if (key === "hdr") {
          chain = chain.hdrGrade(
            fxAmt("hdr"),
            () => resolveParamValue("hdr", "blackFloor", 0.08),
            () => resolveParamValue("hdr", "highlights", 0.85),
            () => resolveParamValue("hdr", "knee", 0.5),
          );
        }

        if (key === "colorLayer") {
          chain = applyColorGrade(chain, "colorLayer");
        }

        if (key === 'encodeGlitch') {
          const getEncodeAmt = fxAmt("encodeGlitch");
          const getMacro = () => resolveParamValue("encodeGlitch", "macroBlock", 0.5);
          const getTear = () => resolveParamValue("encodeGlitch", "tear", 0.35);
          chain = chain.encodingGlitch(getEncodeAmt, getMacro, getTear);
        }

        if (key === "edge") {
          const getEdgeAmt = fxAmt("edge");
          const getEdgeSens = () => resolveParamValue("edge", "threshold", 0.32);
          const getEdgeSoft = () => resolveParamValue("edge", "soften", 0.25);
          const getEdgeStr = () => resolveParamValue("edge", "strength", 1.0);
          const getEdgeThick = () => resolveParamValue("edge", "thickness", 0.35);
          const getEdgeSpread = () => {
            const thick = getEdgeThick();
            const sens = getEdgeSens();
            return edgeSpread(thick, sens, getEdgeViewportMin());
          };
          const getEdgeFade = () => edgeViewportFade(getEdgeSpread(), getEdgeViewportMin());
          const vid = cloneHydraChain(chain);
          const vidShift = cloneHydraChain(chain).scrollX(getEdgeSpread).scrollY(getEdgeSpread);
          const edges = vid.edgeDiff(vidShift, getEdgeSens, getEdgeSoft, getEdgeStr, getEdgeFade);
          chain = chain.add(edges, getEdgeAmt);
        }

        if (key === 'kaleid') {
          const getKaleidSlices = fxAmt("kaleid", {
            clampMin: 0,
            clampMax: 24,
            paramMin: 0,
            paramMax: 24,
          });
          const kaleidLive = () => getKaleidSlices() > 0.1;
          const getKaleidAngle = () => resolveParamValue("kaleid", "angle", 0);
          const getKaleidVideoX = () => (kaleidLive() ? resolveParamValue("kaleid", "videoX", 0) : 0);
          const getKaleidVideoY = () => (kaleidLive() ? resolveParamValue("kaleid", "videoY", 0) : 0);
          const getKaleidVideoFitScale = () => {
            const canvas = canvasRef.current;
            const zoom = resolveParamValue("kaleid", "videoZoom", 1);
            if (!canvas || canvas.height <= 0) {
              const z = Math.max(0.25, zoom);
              return { scaleX: z, scaleY: z };
            }
            return videoStretchToRenderScale(
              getPrimaryVideoAspect(),
              canvas.width,
              canvas.height,
              zoom,
            );
          };
          const getKaleidVideoScaleX = () => (kaleidLive() ? getKaleidVideoFitScale().scaleX : 1);
          const getKaleidVideoScaleY = () => (kaleidLive() ? getKaleidVideoFitScale().scaleY : 1);

          chain = chain
            .scale(getKaleidVideoScaleX, getKaleidVideoScaleY, 0.5, 0.5)
            .scrollX(getKaleidVideoX)
            .scrollY(getKaleidVideoY)
            .customKaleid(getKaleidSlices, getKaleidAngle);
        }

        if (key === 'glow') {
          const getGlowAmount = fxAmt("glow");
          const getGlowThreshold = () => resolveParamValue('glow', 'threshold', 0.48);
          const getGlowBloom = () => resolveParamValue('glow', 'bloom', 0.55);
          const spread = () => glowBloomSpread(getGlowBloom(), getGlowAmount());
          const bloomMix = () => glowBloomMix(getGlowBloom(), getGlowAmount());

          chain = chain.glow(getGlowAmount, getGlowThreshold, getGlowBloom);

          if (renderQualityProfile(renderQualityRef.current).glowAura) {
            const taps = glowGaussianSideTaps(renderQualityRef.current);
            const tapSpan = Math.max(...taps.map(([offset]) => Math.abs(offset)), 1);
            const axisOff = (offset: number) => () => (offset / tapSpan) * spread();
            let hBloom = solid(0, 0, 0, 0);
            for (const [offset, weight] of taps) {
              hBloom = hBloom.add(
                src(o0).scrollX(axisOff(offset)).glowHighlight(getGlowThreshold, getGlowBloom),
                weight,
              );
            }
            chain = chain.glowBloomAdd(hBloom, bloomMix);

            let vBloom = solid(0, 0, 0, 0);
            for (const [offset, weight] of taps) {
              vBloom = vBloom.add(
                src(o0).scrollY(axisOff(offset)).glowHighlight(getGlowThreshold, getGlowBloom),
                weight,
              );
            }
            chain = chain.glowBloomAdd(vBloom, bloomMix);
          }
        }

        if (key === "hitStreak") {
          const getStreakAmt = fxAmt("hitStreak");
          const getLength = () => resolveParamValue("hitStreak", "length", 0.58);
          const getMode = () => Math.round(resolveParamValue("hitStreak", "mode", 0));
          const getThreshold = () => resolveParamValue("hitStreak", "threshold", 0.6);
          const getDecay = () => resolveParamValue("hitStreak", "decay", 0.72);
          const getThinness = () => hitStreakThinness(getThreshold());
          const spread = () => hitStreakSpread(getLength(), getStreakAmt(), getDecay());
          const streakMix = () => hitStreakMix(getStreakAmt(), getDecay());
          const gaussTaps = gaussian1DTapsForQuality(renderQualityRef.current);

          const streakSample = (sample: HydraShaderChain) =>
            sample.hitStreakExtract(getThreshold, getThinness);

          let streak = solid(0, 0, 0, 0);
          const mode = getMode();

          if (mode === 1) {
            for (const [offset, weight] of gaussTaps) {
              const s = () => 1 + offset * spread() * 0.038;
              streak = streak.add(streakSample(src(o0).scale(s, s, 0.5, 0.5)), weight);
            }
          } else if (mode === 2) {
            for (const [offset, weight] of gaussTaps) {
              const o = () => offset * spread();
              streak = streak.add(
                streakSample(src(o0).scrollX(o).scrollY(() => o() * 0.72)),
                weight,
              );
            }
          } else {
            for (const [offset, weight] of gaussTaps) {
              streak = streak.add(
                streakSample(src(o0).scrollX(() => offset * spread())),
                weight,
              );
            }
          }

          chain = chain.add(streak, streakMix);
        }

        if (key === "lens7c") {
          const getLensAmt = fxAmt("lens7c");
          // Without a spare FBO the prism falls back to the raw clip, which still
          // reads as glass in front of the lens — just blind to earlier FX.
          const prismSrc = prismFlushOut ?? (activeChannelRef.current === 0 ? s0 : s1);
          if (prismFlushOut) {
            groupFeedbackCommits.push({ out: prismFlushOut, buffer: cloneHydraChain(chain) });
            chain = src(prismFlushOut);
          }
          chain = chain.lens7cPrism(
            prismSrc,
            getLensAmt,
            () => lens7cThrow(resolveParamValue("lens7c", "spread", 0.55), getLensAmt()),
            () => resolveParamValue("lens7c", "rotation", 0),
            () => resolveParamValue("lens7c", "threshold", 0.42),
            () => resolveParamValue("lens7c", "haze", 0.5),
          );
        }

        if (key === 'pixelate') {
          const getPixelCells = fxAmt("pixelate", PIXELATE_AMT_OPTS);
          const getRoundedPixelCells = () => resolvePixelateCellCount(getPixelCells());
          chain = chain.pixelate(getRoundedPixelCells, getRoundedPixelCells);
        }

        if (key === 'lumaGridSquares') {
          const getGridAmount = fxAmt("lumaGridSquares");
          const getGridCols = () => Math.max(4, Math.min(194, Math.round(resolveParamValue("lumaGridSquares", "cols", 32))));
          const getGridRows = () =>
            lumaGridRowsForCols(getGridCols(), window.innerWidth, window.innerHeight);
          const getGridMinSize = () => resolveParamValue("lumaGridSquares", "minSize", 0.14);
          const getGridMaxSize = () => resolveParamValue("lumaGridSquares", "maxSize", 0.88);
          const getGridPix = () => lumaGridPixelateDivisions(getGridAmount(), getGridCols(), getGridRows()).pix;
          const getGridPixRows = () =>
            lumaGridPixelateDivisions(getGridAmount(), getGridCols(), getGridRows()).pixRows;
          chain = chain
            .pixelate(getGridPix, getGridPixRows)
            .lumaGridSquares(getGridAmount, getGridCols, getGridRows, getGridMinSize, getGridMaxSize);
        }

        if (key === "pointCloud") {
          const getCloudAmount = fxAmt("pointCloud");
          const getCloudCols = () => Math.max(4, Math.min(194, Math.round(resolveParamValue("pointCloud", "cols", 32))));
          const getCloudRows = () => Math.max(2, Math.round(getCloudCols() * (window.innerHeight / Math.max(1, window.innerWidth))));
          const getCloudMinSize = () => resolveParamValue("pointCloud", "minSize", 0.12);
          const getCloudMaxSize = () => resolveParamValue("pointCloud", "maxSize", 0.85);
          const getCloudDepth = () => resolveParamValue("pointCloud", "depth", 0.58);
          const getCloudParallax = () => resolveParamValue("pointCloud", "parallax", 0.78);
          const getCloudBlur = () => resolveParamValue("pointCloud", "blur", 0.5);
          const getCloudFog = () => resolveParamValue("pointCloud", "fog", 0.4);
          chain = chain.pointCloudRemap(
              getCloudAmount,
              getCloudCols,
              getCloudRows,
              getCloudMinSize,
              getCloudMaxSize,
              getCloudDepth,
              getCloudParallax,
              getCloudBlur,
              getCloudFog,
            );
        }

        if (key === 'lumaLines') {
          const getLumaLinesAmount = fxAmt("lumaLines");
          const getLumaLinesCols = () =>
            Math.max(4, Math.min(100, Math.round(resolveParamValue("lumaLines", "cols", 52))));
          const getLumaLinesMinWidth = () => resolveParamValue("lumaLines", "minWidth", 0.1);
          const getLumaLinesMaxWidth = () => resolveParamValue("lumaLines", "maxWidth", 0.8);
          const getLumaLinesRotation = () => resolveParamValue("lumaLines", "rotation", 0);
          const getLumaLinesPix = () =>
            getLumaLinesAmount() < 0.00001 ? 10000 : getLumaLinesCols();
          chain = chain
            .pixelate(getLumaLinesPix, getLumaLinesPix)
            .lumaLines(
              getLumaLinesAmount,
              getLumaLinesCols,
              getLumaLinesMinWidth,
              getLumaLinesMaxWidth,
              getLumaLinesRotation,
            );
        }

        if (key === "lumaPrint") {
          const getPrintAmount = fxAmt("lumaPrint");
          const getPrintMode = () => resolveParamValue("lumaPrint", "mode", 2);
          const getPrintDensity = () =>
            Math.max(4, Math.min(194, Math.round(resolveParamValue("lumaPrint", "density", 24))));
          const getPrintRows = () =>
            Math.max(2, Math.round(getPrintDensity() * (window.innerHeight / Math.max(1, window.innerWidth))));
          const getPrintContrast = () => resolveParamValue("lumaPrint", "contrast", 0.48);
          const getPrintWave = () => resolveParamValue("lumaPrint", "wave", 0.35);
          const getPrintIconSet = () => resolveParamValue("lumaPrint", "iconSet", 0);
          const getPrintShape = () => resolveParamValue("lumaPrint", "shape", 0);
          const getPrintRotation = () => resolveParamValue("lumaPrint", "rotation", 0);
          const printArgs = [
            getPrintAmount,
            getPrintMode,
            getPrintDensity,
            getPrintContrast,
            getPrintWave,
            getPrintIconSet,
            getPrintShape,
            getPrintRotation,
          ] as const;
          const getPrintPix = () =>
            getPrintAmount() < 0.00001 ? printPixelateIdentity() : getPrintDensity();
          const getPrintPixRows = () =>
            getPrintAmount() < 0.00001 ? printPixelateIdentity() : getPrintRows();
          const quantizeCells = getPrintMode() < 3;
          chain = quantizeCells
            ? chain.pixelate(getPrintPix, getPrintPixRows).lumaPrint(...printArgs)
            : chain.lumaPrint(...printArgs);
        }

        if (key === "fillLayer") {
          const getFillAmt = fxAmt("fillLayer");
          const fillParams = () => resolveFxState()?.fillLayer?.params;
          const getFillAr = () => hexRgb01(fillParams()?.colorA, "#7c3aed")[0];
          const getFillAg = () => hexRgb01(fillParams()?.colorA, "#7c3aed")[1];
          const getFillAb = () => hexRgb01(fillParams()?.colorA, "#7c3aed")[2];
          const getFillBr = () => hexRgb01(fillParams()?.colorB, "#06b6d4")[0];
          const getFillBg = () => hexRgb01(fillParams()?.colorB, "#06b6d4")[1];
          const getFillBb = () => hexRgb01(fillParams()?.colorB, "#06b6d4")[2];
          const getFillType = () => Math.max(0, Math.min(3, Math.round(Number(resolveParamValue("fillLayer", "type", 1)))));
          const getFillSweep = () => Math.max(0, Math.min(3, Math.round(Number(resolveParamValue("fillLayer", "sweep", 0)))));
          const getFillSoft = () => resolveParamValue("fillLayer", "softness", 0.35);
          const fillBlendMode = clampLayerBlendMode(Number(resolveParamValue("fillLayer", "mode", 0)));
          const getFillLayerLuma = () => {
            const amt = getFillAmt();
            return amt < 0.00001 ? 2.0 : amt;
          };
          const fillGen =
            typeof fillLayerSrc === "function"
              ? fillLayerSrc(
                  getFillAr,
                  getFillAg,
                  getFillAb,
                  getFillBr,
                  getFillBg,
                  getFillBb,
                  getFillType,
                  getFillSoft,
                  getFillSweep,
                ).scale(() => window.innerWidth / window.innerHeight, 1)
              : solid(1, 0, 0);
          chain = applyLayerComposite({
            chain,
            layerSrc: fillGen,
            mode: fillBlendMode,
            getAmount: getFillAmt,
            solid,
            getLayerLuma: getFillLayerLuma,
            layerSourceStack: stacksRef.layerSourceStack,
          });
        }

        if (key === "mirrorStripes") {
          const getStripesAmt = fxAmt("mirrorStripes");
          const stripeParams = () => resolveFxState()?.mirrorStripes?.params;
          const getStripesCr = () => hexRgb01(stripeParams()?.color, "#ff1a1a")[0];
          const getStripesCg = () => hexRgb01(stripeParams()?.color, "#ff1a1a")[1];
          const getStripesCb = () => hexRgb01(stripeParams()?.color, "#ff1a1a")[2];
          const getStripesScale = () => resolveParamValue("mirrorStripes", "scale", 0.82);
          const getStripesSpread = () => resolveParamValue("mirrorStripes", "spread", 0.48);
          const getStripesDensity = () => resolveParamValue("mirrorStripes", "density", 0.55);
          const getStripesThickness = () => resolveParamValue("mirrorStripes", "thickness", 0.55);
          const getStripesLayers = () => snapPlexusLayers(resolveParamValue("mirrorStripes", "layers", 4));
          const getStripesRotate = () => resolveParamValue("mirrorStripes", "rotate", 0);
          const getStripesRandom = () => resolveParamValue("mirrorStripes", "randomness", 0);
          const getStripesMirror = () => (Number(resolveParamValue("mirrorStripes", "mirror", 1)) >= 0.5 ? 1 : 0);
          const stripesGen =
            typeof mirrorStripesSrc === "function"
              ? mirrorStripesSrc(
                  getStripesCr,
                  getStripesCg,
                  getStripesCb,
                  getStripesScale,
                  getStripesSpread,
                  getStripesDensity,
                  getStripesThickness,
                  getStripesLayers,
                  getStripesRotate,
                  getStripesRandom,
                  getStripesMirror,
                )
              : solid(1, 0.1, 0.1);
          stacksRef.layerSourceStack.push(stripesGen);
          chain = chain.add(stripesGen, getStripesAmt);
        }

        if (key === 'noise') {
          const getNoiseAmount = fxAmt("noise");
          const getNoiseGrid = () => Math.max(8, Math.min(8192, resolveParamValue("noise", "scale", 1681)));
          const getNoiseSpeed = () => 0.22 * Math.pow(Math.min(3, Math.max(0, Number(resolveParamValue("noise", "speed", 0.15)))), 1.35);
          const noiseMode = clampLayerBlendMode(Number(resolveParamValue("noise", "mode", 3)));
          const getNoiseLayerLuma = () => {
            const amt = getNoiseAmount();
            return amt < 0.00001 ? 2.0 : amt;
          };
          const noiseGen = gaussianNoiseGrid != null
            ? gaussianNoiseGrid(() => getNoiseGrid(), () => getNoiseSpeed()).scale(() => window.innerWidth / window.innerHeight, 1)
            : noise(() => Math.max(0.05, getNoiseGrid() * 0.12), () => 0.02 + getNoiseSpeed() * 1.25).saturate(0).scale(() => window.innerWidth / window.innerHeight, 1);
          chain = applyLayerComposite({
            chain,
            layerSrc: noiseGen,
            mode: noiseMode,
            getAmount: getNoiseAmount,
            solid,
            getLayerLuma: getNoiseLayerLuma,
            layerSourceStack: stacksRef.layerSourceStack,
          });
        }

        if (key === "plasma") {
          const getPlasmaAmt = fxAmt("plasma");
          const getPlasmaSpeed = () => resolveParamValue("plasma", "speed", 1.1);
          const getPlasmaScale = () => resolveParamValue("plasma", "scale", 1.0);
          const getPlasmaComplexity = () => resolveParamValue("plasma", "complexity", 1.0);
          const plasmaMode = clampLayerBlendMode(Number(resolveParamValue("plasma", "mode", 0)));
          const getPlasmaLayerLuma = () => {
            const amt = getPlasmaAmt();
            return amt < 0.00001 ? 2.0 : amt;
          };
          const plasmaGen =
            typeof plasmaSrc === "function"
              ? plasmaSrc(getPlasmaSpeed, getPlasmaScale, getPlasmaComplexity)
              : solid(0.5, 0.2, 0.9);
          chain = applyLayerComposite({
            chain,
            layerSrc: plasmaGen,
            mode: plasmaMode,
            getAmount: getPlasmaAmt,
            solid,
            getLayerLuma: getPlasmaLayerLuma,
            layerSourceStack: stacksRef.layerSourceStack,
          });
        }

        if (key === "patternLayer") {
          const getPatternAmt = fxAmt("patternLayer");
          const patternParams = () => resolveFxState()?.patternLayer?.params;
          const getPatternAr = () => hexRgb01(patternParams()?.colorA, "#0b1020")[0];
          const getPatternAg = () => hexRgb01(patternParams()?.colorA, "#0b1020")[1];
          const getPatternAb = () => hexRgb01(patternParams()?.colorA, "#0b1020")[2];
          const getPatternBr = () => hexRgb01(patternParams()?.colorB, "#22d3ee")[0];
          const getPatternBg = () => hexRgb01(patternParams()?.colorB, "#22d3ee")[1];
          const getPatternBb = () => hexRgb01(patternParams()?.colorB, "#22d3ee")[2];
          const getPatternVariant = () =>
            Math.max(0, Math.min(3, Math.round(Number(resolveParamValue("patternLayer", "variant", 2)))));
          const getPatternGeometry = () =>
            Math.max(0, Math.min(10, Math.round(Number(resolveParamValue("patternLayer", "geometry", 0)))));
          const getPatternScale = () => resolveParamValue("patternLayer", "scale", 1.0);
          const getPatternSpeed = () => resolveParamValue("patternLayer", "speed", 0.4);
          const getPatternWarp = () => resolveParamValue("patternLayer", "warp", 0);
          const getPatternCells = () => patternTuringCells(getPatternScale());
          const getPatternSymmetry = () => resolveParamValue("patternLayer", "symmetry", 2);
          const patternFamily = Math.max(
            0,
            Math.min(PATTERN_LAYER_MAX_TYPE, Math.round(Number(resolveParamValue("patternLayer", "type", 1)))),
          );
          const patternMode = clampLayerBlendMode(Number(resolveParamValue("patternLayer", "mode", 0)));
          const getPatternLayerLuma = () => {
            const amt = getPatternAmt();
            return amt < 0.00001 ? 2.0 : amt;
          };
          const rdDisplay = hydraOutputDisplaySampler(
            () =>
              (hydraRef.current as { o?: Array<{ getCurrent?: () => unknown }> } | null)?.o?.[
                PATTERN_RD_OUTPUT_INDEX
              ],
          );
          const patternGen = (() => {
            if (patternFamily === PATTERN_LAYER_TURING_TYPE) {
              const synth = hydraRef.current?.synth;
              synth?.setFunction?.({
                name: "patternTuringDisplay",
                type: "src",
                inputs: [...PATTERN_TURING_DISPLAY_INPUTS],
                glsl: patternTuringDisplayGlsl(
                  hexRgb01(patternParams()?.colorA, "#0b1020"),
                  hexRgb01(patternParams()?.colorB, "#22d3ee"),
                ),
              });
              // Read after setFunction: re-registering inlines the current colors,
              // so a reference captured earlier would render the previous pair.
              const patternTuringDisplay = (hydra as { patternTuringDisplay?: HydraShaderFn })
                .patternTuringDisplay;
              return patternTuringDisplay
                ? patternTuringDisplay(
                    rdDisplay,
                    getPatternVariant,
                    getPatternCells,
                    getPatternSymmetry,
                  )
                : src(rdDisplay);
            }
            if (patternFamily === PATTERN_LAYER_GEOMETRY_TYPE) {
              return typeof patternGeometrySrc === "function"
                ? patternGeometrySrc(
                    getPatternGeometry,
                    getPatternScale,
                    getPatternSpeed,
                    getPatternWarp,
                    getPatternAr,
                    getPatternAg,
                    getPatternAb,
                    getPatternBr,
                    getPatternBg,
                    getPatternBb,
                  )
                : solid(0.1, 0.6, 0.9);
            }
            const patternFamilySrc =
              patternFamily === 1
                ? patternCellsSrc
                : patternFamily === 2
                  ? patternTilesSrc
                  : patternFamily === 3
                    ? patternPolarSrc
                    : patternNoiseSrc;
            return typeof patternFamilySrc === "function"
              ? patternFamilySrc(
                  getPatternVariant,
                  getPatternScale,
                  getPatternSpeed,
                  getPatternWarp,
                  getPatternAr,
                  getPatternAg,
                  getPatternAb,
                  getPatternBr,
                  getPatternBg,
                  getPatternBb,
                )
              : solid(0.1, 0.6, 0.9);
          })();
          chain = applyLayerComposite({
            chain,
            layerSrc: patternGen,
            mode: patternMode,
            getAmount: getPatternAmt,
            solid,
            getLayerLuma: getPatternLayerLuma,
            layerSourceStack: stacksRef.layerSourceStack,
          });
        }

        if (key === "electricNoise") {
          const getElectricAmt = () =>
            Math.max(0, Math.min(1, resolveParamValue("electricNoise", "amount", 1)));
          const getElectricSpeed = () => resolveParamValue("electricNoise", "speed", 1.0);
          const getElectricScale = () => resolveParamValue("electricNoise", "scale", 1.0);
          const getElectricNoiseScale = () => resolveParamValue("electricNoise", "noiseScale", 1.0);
          const getElectricTurbulence = () => resolveParamValue("electricNoise", "turbulence", 0.2);
          const getElectricDetail = () => resolveParamValue("electricNoise", "detail", 5);
          const getElectricIntensity = () => resolveParamValue("electricNoise", "intensity", 1.4);
          const getElectricRings = () => resolveParamValue("electricNoise", "rings", 0.85);
          const getElectricRing = () => resolveParamValue("electricNoise", "ringPower", 0.9);
          const electricParams = () => resolveFxState()?.electricNoise?.params;
          const getElectricColorR = () => hexRgb01(electricParams()?.color, "#331a66")[0];
          const getElectricColorG = () => hexRgb01(electricParams()?.color, "#331a66")[1];
          const getElectricColorB = () => hexRgb01(electricParams()?.color, "#331a66")[2];
          const electricCirclePack = () => electricNoiseCirclePackRef.current;
          const getElectricTriggerRingCount = () => electricCirclePack().count;
          const electricMode = clampLayerBlendMode(Number(fxRow.params?.mode) || 0);
          const electricGen =
            typeof electricNoiseSrc === "function"
              ? electricNoiseSrc(
                  getElectricNoiseTextureSampler(),
                  getElectricSpeed,
                  getElectricScale,
                  getElectricNoiseScale,
                  getElectricTurbulence,
                  getElectricDetail,
                  getElectricIntensity,
                  getElectricRings,
                  getElectricRing,
                  getElectricTriggerRings,
                  getElectricNoiseTriggerTextureSampler(),
                  getElectricTriggerRingCount,
                  getElectricColorR,
                  getElectricColorG,
                  getElectricColorB,
                )
              : solid(0.2, 0.1, 0.4);
          chain = applyLayerComposite({
            chain,
            layerSrc: electricGen,
            mode: electricMode,
            getAmount: getElectricAmt,
            solid,
            layerSourceStack: stacksRef.layerSourceStack,
          });
        }

        if (key === "plexus") {
          const getPlexusAmt = fxAmt("plexus");
          const getPlexusSpeed = () => resolveParamValue("plexus", "speed", 1.0);
          const getPlexusPoints = () =>
            plexusPointsForQuality(
              resolveParamValue("plexus", "points", 1.5),
              renderQualityRef.current,
            );
          const getPlexusIntensity = () => resolveParamValue("plexus", "intensity", 1.0);
          const getPlexusLayers = () =>
            plexusLayersForQuality(
              resolveParamValue("plexus", "layers", 4.0),
              renderQualityRef.current,
            );
          const getPlexusGlow = () => resolveParamValue("plexus", "glow", 1.2);
          const getPlexusAudioBoost = () => {
            const fxCfg = resolveFxState()?.plexus;
            if (!fxCfg) return 0;
            return getBandValue("plexus", fxCfg.syncBand ?? "master", liveHydraBands()) * (fxCfg.syncMultiplier ?? 0.45);
          };
          const plexusMode = fxRow.params?.mode ?? 0;
          const plexusGen =
            typeof plexusSrc === "function"
              ? plexusSrc(
                  getPlexusSpeed,
                  getPlexusPoints,
                  getPlexusIntensity,
                  getPlexusLayers,
                  getPlexusGlow,
                  getPlexusAudioBoost,
                )
              : solid(0.4, 0.15, 0.85);
          chain = applyLayerComposite({
            chain,
            layerSrc: plexusGen,
            mode: Number(plexusMode),
            getAmount: getPlexusAmt,
            solid,
            layerSourceStack: stacksRef.layerSourceStack,
          });
        }

        if (key === "superformula") {
          const getSuperAmt = fxAmt("superformula");
          const superParams = () => resolveFxState()?.superformula?.params;
          const getSuperLook = () =>
            Math.max(0, Math.min(2, Math.round(Number(resolveParamValue("superformula", "look", 2)))));
          const getSuperM = () => resolveParamValue("superformula", "m", 7.6);
          const getSuperN1 = () => resolveParamValue("superformula", "n1", 0.36);
          const getSuperN2 = () => resolveParamValue("superformula", "n2", 2.16);
          const getSuperSize = () => resolveParamValue("superformula", "size", 0.48);
          const getSuperSpeed = () => resolveParamValue("superformula", "speed", 0.35);
          const getSuperGlow = () => resolveParamValue("superformula", "glow", 1.2);
          const getSuperCr = () => hexRgb01(superParams()?.color, "#c4b5fd")[0];
          const getSuperCg = () => hexRgb01(superParams()?.color, "#c4b5fd")[1];
          const getSuperCb = () => hexRgb01(superParams()?.color, "#c4b5fd")[2];
          const superMode = clampLayerBlendMode(Number(resolveParamValue("superformula", "mode", 2)));
          const superGen =
            typeof superformulaSrc === "function"
              ? superformulaSrc(
                  getSuperLook,
                  getSuperM,
                  getSuperN1,
                  getSuperN2,
                  getSuperSize,
                  getSuperSpeed,
                  getSuperGlow,
                  getSuperCr,
                  getSuperCg,
                  getSuperCb,
                )
              : solid(0.77, 0.71, 0.99);
          chain = applyLayerComposite({
            chain,
            layerSrc: superGen,
            mode: superMode,
            getAmount: getSuperAmt,
            solid,
            layerWithoutLuma: true,
            layerSourceStack: stacksRef.layerSourceStack,
          });
        }

        if (key === "topoContour") {
          const topoVideo = activeChannelRef.current === 0 ? s0 : s1;
          const getTopoAmt = fxAmt("topoContour");
          const getTopoScale = () => resolveParamValue("topoContour", "scale", 1.0);
          const getTopoLines = () =>
            Math.max(2, Math.min(24, Math.round(resolveParamValue("topoContour", "lines", 10))));
          const getTopoSpeed = () => resolveParamValue("topoContour", "speed", 1.0);
          const getTopoValley = () => resolveParamValue("topoContour", "valley", 0.12);
          const getTopoLineWidth = () => resolveParamValue("topoContour", "lineWidth", 1.0);
          const getTopoVideoTint = () => resolveParamValue("topoContour", "videoTint", 0.35);
          const getTopoPalette = () =>
            Math.max(0, Math.min(1, Math.round(resolveParamValue("topoContour", "palette", 0))));
          const topoMode = clampLayerBlendMode(Number(fxRow.params?.mode) || 0);
          const topoGen =
            typeof topoContourSrc === "function"
              ? topoContourSrc(
                  topoVideo,
                  getTopoScale,
                  getTopoLines,
                  getTopoSpeed,
                  getTopoValley,
                  getTopoLineWidth,
                  getTopoVideoTint,
                  getTopoPalette,
                )
              : solid(0, 0, 0);
          chain = applyLayerComposite({
            chain,
            layerSrc: topoGen,
            mode: topoMode,
            getAmount: getTopoAmt,
            solid,
            layerSourceStack: stacksRef.layerSourceStack,
          });
        }

        if (key === "universeWithin") {
          const getUniverseAmt = fxAmt("universeWithin");
          const getUniverseSpeed = () => resolveParamValue("universeWithin", "speed", 1.0);
          const getUniverseZoom = () => resolveParamValue("universeWithin", "zoom", 1.5);
          const getUniverseLayers = () => snapPlexusLayers(resolveParamValue("universeWithin", "layers", 4.0));
          const getUniverseGlow = () => resolveParamValue("universeWithin", "glow", 1.2);
          const getUniverseAudioBoost = () => {
            const fxCfg = resolveFxState()?.universeWithin;
            if (!fxCfg) return 0;
            return getBandValue("universeWithin", fxCfg.syncBand ?? "master", liveHydraBands()) * (fxCfg.syncMultiplier ?? 0.45);
          };
          const universeMode = clampLayerBlendMode(Number(fxRow.params?.mode) || 0);
          const universeGen =
            typeof universeWithinSrc === "function"
              ? universeWithinSrc(
                  getUniverseSpeed,
                  getUniverseZoom,
                  getUniverseLayers,
                  getUniverseGlow,
                  getUniverseAudioBoost,
                )
              : solid(0.4, 0.15, 0.85);
          chain = applyLayerComposite({
            chain,
            layerSrc: universeGen,
            mode: universeMode,
            getAmount: getUniverseAmt,
            solid,
            layerSourceStack: stacksRef.layerSourceStack,
          });
        }

        if (key === "fractalFold") {
          const getFoldAmt = fxAmt("fractalFold");
          const getFoldX = () => resolveParamValue("fractalFold", "foldX", 0.86);
          const getFoldY = () => resolveParamValue("fractalFold", "foldY", 1.04);
          const getFoldZoom = () => resolveParamValue("fractalFold", "zoom", 1.0);
          const getFoldSpeed = () => resolveParamValue("fractalFold", "speed", 0.6);
          const getFoldSpin = () => resolveParamValue("fractalFold", "spin", 0.42);
          const getFoldDepth = () => snapFractalFoldDepth(resolveParamValue("fractalFold", "depth", 8));
          const getFoldGlow = () => resolveParamValue("fractalFold", "glow", 1.4);
          const getFoldHue = () => resolveParamValue("fractalFold", "hue", 0.12);
          const getFoldAudioBoost = () => {
            const fxCfg = resolveFxState()?.fractalFold;
            if (!fxCfg) return 0;
            return getBandValue("fractalFold", fxCfg.syncBand ?? "master", liveHydraBands()) * (fxCfg.syncMultiplier ?? 0.45);
          };
          const fractalFoldMode = clampLayerBlendMode(Number(fxRow.params?.mode) || 0);
          const fractalFoldGen =
            typeof fractalFoldSrc === "function"
              ? fractalFoldSrc(
                  getFoldX,
                  getFoldY,
                  getFoldZoom,
                  getFoldSpeed,
                  getFoldSpin,
                  getFoldDepth,
                  getFoldGlow,
                  getFoldHue,
                  getFoldAudioBoost,
                )
              : solid(0.15, 0.35, 0.9);
          chain = applyLayerComposite({
            chain,
            layerSrc: fractalFoldGen,
            mode: fractalFoldMode,
            getAmount: getFoldAmt,
            solid,
            layerSourceStack: stacksRef.layerSourceStack,
          });
        }

        if (key === 'blur') {
          const getBlurStrength = fxAmt("blur", { clampMin: 0, clampMax: 2 });
          const rawBlurMode = Math.round(Number(fxRow.params?.mode ?? 0));
          const blurMode = rawBlurMode >= 0 && rawBlurMode <= 2 ? rawBlurMode : 0;
          const isRadial = blurMode === 1;
          const isNoise = blurMode === 2;
          if (blurFlushOut) {
            groupFeedbackCommits.push({ out: blurFlushOut, buffer: cloneHydraChain(chain) });
            chain = src(blurFlushOut);
          }
          const tapSrc = blurFlushOut ?? o0;

          if (isRadial) {
            const steps = blurRadialStepsForQuality(renderQualityRef.current ?? "full");
            const tapMix = () => blurTapMix(getBlurStrength());
            for (let i = 1; i <= steps; i++) {
              const step = i;
              chain = chain.blend(
                src(tapSrc)
                  .scale(() => 1 + getBlurStrength() * 0.06 * (step / Math.max(steps, 1)))
                  .blurMirrorUv(),
                () => (tapMix() / Math.sqrt(step)) * 0.9,
              );
            }
          } else if (isNoise) {
            chain = chain.blurNoise(
              getBlurStrength,
              () => BLUR_NOISE_SCALE,
              () => BLUR_NOISE_SPEED,
            );
          } else {
            const axisSpread = () => blurSpread(getBlurStrength());
            const blur1d = (srcOut: HydraShaderChain, axis: "x" | "y") => {
              let acc = solid(0, 0, 0, 0);
              for (const [step, weight] of GAUSSIAN_1D_9) {
                const off = () => (step / 4) * axisSpread();
                const shifted =
                  axis === "x" ? src(srcOut).scrollX(off) : src(srcOut).scrollY(off);
                acc = acc.add(shifted.blurMirrorUv(), weight);
              }
              return acc;
            };
            if (blurPassOut) {
              groupFeedbackCommits.push({ out: blurPassOut, buffer: blur1d(tapSrc, "x") });
              chain = blur1d(blurPassOut, "y");
            } else {
              chain = chain.blurGaussian(tapSrc, getBlurStrength);
            }
          }
        }

        if (key === "sharpen") {
          const getSharpenStrength = fxAmt("sharpen", { clampMin: 0, clampMax: 2 });
          const getSharpenRadius = () =>
            Math.max(0.25, Math.min(2, resolveParamValue("sharpen", "radius", 1)));
          const spread = () => sharpenSpread(getSharpenRadius());
          const blurSamples = sharpenBlurSamplesForQuality(renderQualityRef.current ?? "full");
          let blurred = solid(0, 0, 0, 0);
          for (const sample of blurSamples) {
            if (sample.kind === "center") {
              blurred = blurred.add(src(o0), sample.weight);
            } else if (sample.kind === "scrollX") {
              const sign = sample.sign;
              blurred = blurred.add(
                src(o0).scrollX(() => sign * spread()),
                sample.weight,
              );
            } else {
              const sign = sample.sign;
              blurred = blurred.add(
                src(o0).scrollY(() => sign * spread()),
                sample.weight,
              );
            }
          }
          chain = chain.sharpenUnsharp(blurred, getSharpenStrength);
        }

        if (key === 'flash') {
          chain = chain.flashBurst(fxAmt("flash"));
        }

        if (key === "triggerDebug") {
          // Visual: TriggerDebugHighway canvas overlay (center hit line, scrolling lanes).
        }

        if (key === "fadeOff") {
          const getBlackMix = () =>
            computeFadeOffBlackMix(resolveFxState()?.fadeOff, getHydraWindow().customBands);
          chain = chain.blend(solid(0, 0, 0), getBlackMix);
        }

        if (key === 'vignette') {
          const getRawAmount = fxAmt("vignette");
          const getVAmount = () => vignetteAmountCurve(getRawAmount());
          const getRadius = () => resolveParamValue("vignette", "radius", 0.78);
          const getSoft = () => resolveParamValue("vignette", "softness", 0.42);
          const getBlur = () => resolveParamValue("vignette", "blur", 0);
          const getBlurStrength = () => vignetteBlurStrength(getBlur());
          const noiseAmount = (pass: number) => {
            const strength = getBlurStrength();
            if (strength < 0.00001) return 0;
            const falloff = 1 - pass / Math.max(1, VIGNETTE_BLUR_NOISE_PASSES);
            return strength * falloff;
          };
          let blurred = src(o0);
          for (let pass = 0; pass < VIGNETTE_BLUR_NOISE_PASSES; pass += 1) {
            blurred = blurred.blurNoise(
              () => noiseAmount(pass),
              () => VIGNETTE_BLUR_NOISE_SCALE,
              () => VIGNETTE_BLUR_NOISE_SPEED,
            );
          }
          chain = chain.vignetteGrade(blurred, getVAmount, getRadius, getSoft, getBlur);
        }
        
        if (key === 'feedback') {
          const getLiveAmount = fxAmt("feedback", { clampMin: 0.8, clampMax: 0.99 });
          const getAmount = () => (feedbackForceClearRef.current > 0 ? 0 : getLiveAmount());
          const getScale = () => resolveParamValue("feedback", "scale", 1.0);
          const getBalance = () => resolveParamValue("feedback", "balance", 0.5);
          // Main-chain Feedback samples o0. Group Feedback uses a reserved FBO
          // via `applyGroupFeedback` — never applied via applyOperator.
          chain = chain.blend(
            src(o0).scale(getScale).feedbackGrade(getBalance),
            getAmount,
          );
        }

        if (key === "paletteRecolor") {
          const getPaletteAmt = fxAmt("paletteRecolor");
          const getPaletteMode = () =>
            Math.max(0, Math.min(1, Math.round(Number(resolveParamValue("paletteRecolor", "mode", 0)))));
          const getPaletteCount = () =>
            Math.max(2, Math.min(4, Math.round(Number(resolveParamValue("paletteRecolor", "colors", 3)))));
          const livePalette = () =>
            getFramePalette(
              getHydraWindow().s0?.src as HTMLVideoElement | undefined,
              getPaletteCount(),
              resolveParamValue("paletteRecolor", "boost", 0.35),
              performance.now(),
            );
          const paletteChannel = (index: number) => () => livePalette()[index] ?? 0;
          chain = chain.paletteRecolor(
            getPaletteAmt,
            getPaletteMode,
            getPaletteCount,
            ...Array.from({ length: PALETTE_MAX_COLORS * 3 }, (_, i) => paletteChannel(i)),
          );
        }

        if (key === "shapeLayer") {
          const getShapeAmt = fxAmt("shapeLayer");
          const shapeParams = () => resolveFxState()?.shapeLayer?.params;
          const getShapeCr = () => hexRgb01(shapeParams()?.color, "#ffffff")[0];
          const getShapeCg = () => hexRgb01(shapeParams()?.color, "#ffffff")[1];
          const getShapeCb = () => hexRgb01(shapeParams()?.color, "#ffffff")[2];
          const getShapePick = () =>
            Math.max(0, Math.min(4, Math.round(Number(resolveParamValue("shapeLayer", "shape", 0)))));
          const getShapeSize = () => resolveParamValue("shapeLayer", "size", 0.45);
          const getShapeRoundness = () => resolveParamValue("shapeLayer", "roundness", 0);
          const getShapeStroke = () => resolveParamValue("shapeLayer", "stroke", 0.15);
          const getShapeFill = () =>
            Math.max(0, Math.min(1, Math.round(Number(resolveParamValue("shapeLayer", "fill", 0)))));
          const getShapeRotate = () => resolveParamValue("shapeLayer", "rotate", 0);
          const getShapeCenterX = () => resolveParamValue("shapeLayer", "centerX", 0.5);
          const getShapeCenterY = () => resolveParamValue("shapeLayer", "centerY", 0.5);
          const shapeMode = clampLayerBlendMode(Number(resolveParamValue("shapeLayer", "mode", 4)));
          const shapeGen =
            typeof shapeLayerSrc === "function"
              ? shapeLayerSrc(
                  getShapePick,
                  getShapeSize,
                  getShapeRoundness,
                  getShapeStroke,
                  getShapeRotate,
                  getShapeCenterX,
                  getShapeCenterY,
                  getShapeCr,
                  getShapeCg,
                  getShapeCb,
                  getShapeAmt,
                  getShapeFill,
                )
              : solid(1, 1, 1);
          chain = applyLayerComposite({
            chain,
            layerSrc: shapeGen,
            mode: shapeMode,
            getAmount: getShapeAmt,
            solid,
            layerWithoutLuma: true,
            layerSourceStack: stacksRef.layerSourceStack,
          });
        }

        if (key === "string") {
          const getTension = fxAmt("string");
          const stringParams = () => resolveFxState()?.string?.params;
          const getStringCr = () => hexRgb01(stringParams()?.color, "#f6edd4")[0];
          const getStringCg = () => hexRgb01(stringParams()?.color, "#f6edd4")[1];
          const getStringCb = () => hexRgb01(stringParams()?.color, "#f6edd4")[2];
          const getStringPos = () => resolveParamValue("string", "position", 0.5);
          const getStringOrient = () =>
            Math.max(0, Math.min(1, Math.round(Number(resolveParamValue("string", "orientation", 0)))));
          const getStringThick = () => resolveParamValue("string", "thickness", 0.42);
          const getStringGlow = () => resolveParamValue("string", "glow", 0.68);
          const getStringHarm = () =>
            Math.max(1, Math.min(3, Math.round(Number(resolveParamValue("string", "harmonics", 2)))));
          chain = chain.stringLayer(
            () => 1,
            getTension,
            getStringPos,
            getStringOrient,
            getStringThick,
            getStringGlow,
            getStringHarm,
            getStringCr,
            getStringCg,
            getStringCb,
          );
        }

        if (key === "resynthesize") {
          const getResynthMix = fxAmt("resynthesize", { clampMin: 0, clampMax: 0.98 });
          const getResynthX = () => resolveParamValue("resynthesize", "x", 0.5);
          const getResynthY = () => resolveParamValue("resynthesize", "y", 0.78);
          const getResynthHue = () => resolveParamValue("resynthesize", "hue", 0.25);
          const getResynthDecay = () => resolveParamValue("resynthesize", "decay", 0.3);
          chain = chain.blend(
            src(o0)
              .resynthWarp(getResynthX, getResynthY)
              .resynthTint(getResynthX, getResynthY, getResynthHue, getResynthDecay),
            getResynthMix,
          );
        }

        if (key === "ghostFlow") {
          const getGhostAmt = fxAmt("ghostFlow");
          const getMelt = () => resolveParamValue("ghostFlow", "melt", 0.62);
          const getFlowScale = () => resolveParamValue("ghostFlow", "flowScale", 0.48);
          const getRefresh = () => resolveParamValue("ghostFlow", "refresh", 0);
          const getChromaBleed = () => resolveParamValue("ghostFlow", "chromaBleed", 0.35);
          chain = chain.ghostFlow(
            hydraOutputSimReadSampler(
              () => o0 as { getTexture?: () => unknown },
            ),
            getGhostAmt,
            getMelt,
            getFlowScale,
            getRefresh,
            getChromaBleed,
          );
        }
        if (key === 'oscilloscope') {
          const oscSrc = overlayChainSrc("oscilloscope");
          if (oscilloscopeBridgeReadyRef.current && oscSrc) {
            const getOscAmt = fxAmt("oscilloscope");
            stacksRef.layerSourceStack.push(oscSrc);
            const getGlow = () => resolveParamValue("oscilloscope", "glow", 0.55);
            chain = chain.oscilloscopeOverlay(oscSrc, getOscAmt, getGlow);
          }
        }
        if (key === "neonGrid") {
          const neonSrc = overlayChainSrc("neonGrid");
          if (neonGridBridgeReadyRef.current && neonSrc) {
            stacksRef.layerSourceStack.push(neonSrc);
            const getNeonGlow = () =>
              Math.max(0, Math.min(1, resolveParamValue("neonGrid", "intersect", 1.6) / 3));
            chain = chain.neonGridOverlay(neonSrc, () => 1, getNeonGlow);
          }
        }
        if (key === "textLayer") {
          const textSrc = overlayChainSrc("textLayer");
          if (textLayerBridgeReadyRef.current && textSrc) {
            const getTextAmt = fxAmt("textLayer");
            stacksRef.layerSourceStack.push(textSrc);
            const getTextGlow = () => resolveParamValue("textLayer", "glow", 0.35);
            chain = chain.textLayerOverlay(textSrc, getTextAmt, getTextGlow);
          }
        }

        if (key === 'cymatic') {
          const getCymAmount = fxAmt("cymatic");
          const getCymFreq = () => Math.max(1, resolveParamValue("cymatic", "frequency", 12));

          chain = chain
            .scale(() => window.innerWidth / window.innerHeight, 1)
            .cymaticDistort(getCymAmount, getCymFreq)
            .scale(() => window.innerHeight / window.innerWidth, 1);
        }

        snapshotChainStack(chain, stacksRef.chainStack);
      };

      const applyFxToChain: ApplyFxToChainFn = (targetChain, key, getFxRow, modulationEffectKey) => {
        const row = getFxRow();
        if (!row?.enabled) return targetChain;
        const savedChain = chain;
        const savedOverride = fxRowOverride;
        chain = targetChain;
        fxRowOverride = {
          templateKey: key,
          effectKey: modulationEffectKey ?? key,
          config: row,
        };
        instanceEffectKeyByTemplate.set(key, fxRowOverride.effectKey);
        try {
          applyFxKey(key);
          return chain;
        } catch (err) {
          console.warn(`[fx-group] ${key} failed`, err);
          return targetChain;
        } finally {
          chain = savedChain;
          fxRowOverride = savedOverride;
        }
      };

      let groupSoloActive = false;
      const groupBufferCache: Record<string, HydraShaderChain> = {};
      const groupIdsInChain = renderChain
        .filter((node): node is { kind: "group"; id: string } => node.kind === "group")
        .map((node) => node.id);

      // Reserve Hydra outputs for groups that run Feedback.
      {
        const instances = settingsRef.current.layerInstances ?? {};
        const groups = settingsRef.current.fxGroups ?? {};
        const flushKeyLive = (key: "blur" | "liquix" | "lens7c") =>
          renderChain.some(
            (node) => node.kind === "fx" && node.key === key && !!resolveFxState()?.[key]?.enabled,
          ) ||
          groupIdsInChain.some((groupId) => {
            const group = groups[groupId];
            if (!group?.enabled) return false;
            return group.layerIds.some((layerId) => {
              const inst = instances[layerId];
              return inst?.templateKey === key && !!inst.config.enabled;
            });
          });
        const blurLive = flushKeyLive("blur");
        const chainFlushLive = blurLive || flushKeyLive("liquix");
        const taken: HydraShaderChain[] = [];
        const fxNow = resolveFxState();
        if (fxNow?.reactionDiffusion?.enabled && o1) taken.push(o1);
        if (patternLayerIsTuring(fxNow?.patternLayer) && fxNow?.patternLayer?.enabled && o3) {
          taken.push(o3);
        }
        if (
          outputMappingShouldWarp(
            normalizeOutputMapping(getHydraWindow().outputMapping ?? outputMappingRef.current),
          ) &&
          o2
        ) {
          taken.push(o2);
        }
        if (chainFlushLive) {
          blurFlushOut = pickBlurFlushOutput([o2, o3, o1], taken);
          if (blurFlushOut) taken.push(blurFlushOut);
          if (blurLive) blurPassOut = pickBlurFlushOutput([o2, o3, o1], taken);
          if (blurPassOut) taken.push(blurPassOut);
        }
        if (flushKeyLive("lens7c")) {
          prismFlushOut = pickBlurFlushOutput([o2, o3, o1], taken);
          if (prismFlushOut) taken.push(prismFlushOut);
        }
        const freeFbOuts: HydraShaderChain[] = [o3, o2, o1].filter(
          (out): out is HydraShaderChain =>
            !!out && out !== blurFlushOut && out !== blurPassOut && out !== prismFlushOut,
        );
        let fbSlot = 0;
        for (const groupId of groupIdsInChain) {
          const group = groups[groupId];
          if (!group?.enabled) continue;
          const needsFb = group.layerIds.some((layerId) => {
            const inst = instances[layerId];
            return inst?.templateKey === "feedback" && !!inst.config.enabled;
          });
          if (!needsFb) continue;
          const out = freeFbOuts[fbSlot++];
          if (out) groupFeedbackOutById[groupId] = out;
        }
      }

      const groupRenderCtx = {
        fxGroups: settingsRef.current.fxGroups ?? {},
        layerInstances: settingsRef.current.layerInstances ?? {},
        solid,
        buildLayer: buildLayerFromInstance,
        applyOperator: (
          target: HydraShaderChain,
          key: string,
          getFxRow: () => FXConfig | undefined,
          stacks: {
            chainStack: HydraShaderChain[];
            layerSourceStack: HydraShaderChain[];
          },
          modulationEffectKey?: string,
        ) => {
          const prevChainStack = stacksRef.chainStack;
          const prevLayerStack = stacksRef.layerSourceStack;
          stacksRef.chainStack = stacks.chainStack;
          stacksRef.layerSourceStack = stacks.layerSourceStack;
          try {
            return applyFxToChain(target, key, getFxRow, modulationEffectKey);
          } finally {
            stacksRef.chainStack = prevChainStack;
            stacksRef.layerSourceStack = prevLayerStack;
          }
        },
        getGroupAmount: (groupId: string) => () => {
          const group = settingsRef.current.fxGroups?.[groupId];
          if (!group?.composite) return 0;
          return computeFxAmount(
            `group:${groupId}`,
            group.composite,
            liveHydraBands(),
            FX_AMT_01,
          );
        },
        maskCompositeOpts: groupMaskCompositeOpts,
        getClipSource: () => {
          const vid = activeChannelRef.current === 0 ? s0 : s1;
          return src(vid).scale(SOURCE_EDGE_OVERSCAN);
        },
        groupBufferCache,
        hasGroupFeedbackOut: (groupId: string) => !!groupFeedbackOutById[groupId],
        applyGroupFeedback: (
          target: HydraShaderChain,
          groupId: string,
          feedbackRow: FXConfig,
        ) => {
          const out = groupFeedbackOutById[groupId];
          if (!out) return target;
          const getAmount = () => {
            if (feedbackForceClearRef.current > 0) return 0;
            return computeFxAmount("feedback", feedbackRow, liveHydraBands(), {
              clampMin: 0.8,
              clampMax: 0.99,
            });
          };
          const getScale = () => fxParamFromRow(feedbackRow, "scale", 1.0);
          const getBalance = () => fxParamFromRow(feedbackRow, "balance", 0.5);
          // Same formula as main-chain Feedback, sampling this group's FBO.
          return target.blend(
            src(out).scale(getScale).feedbackGrade(getBalance),
            getAmount,
          );
        },
        commitGroupFeedbackLoop: (groupId: string, feedbackChain: HydraShaderChain) => {
          const out = groupFeedbackOutById[groupId];
          if (!out) return;
          groupFeedbackCommits.push({ out, buffer: cloneHydraChain(feedbackChain) });
        },
      };
      buildAllFxGroupBuffers(groupIdsInChain, groupRenderCtx);

      for (const node of renderChain) {
        if (groupSoloActive) break;
        if (node.kind === "group") {
          const groupResult = renderFxGroup(chain, node.id, groupRenderCtx);
          chain = groupResult.chain;
          if (groupResult.solo) {
            groupSoloActive = true;
          }
          snapshotChainStack(chain, stacksRef.chainStack);
          continue;
        }
        applyFxKey(node.key as string);
      }

      const cueInChain = renderChain.some(
        (node) => node.kind === "fx" && node.key === "playbackCue",
      );
      if (!cueInChain) applyFxKey("playbackCue");

      const slowmoFxRow = resolveFxState()?.slowmo;
      const slowmoTrailLive =
        !!slowmoFxRow?.enabled &&
        resolveParamValue("slowmo", "motionBlur", SLOWMO_MOTION_BLUR_DEFAULT) > 0.00001;
      if (slowmoTrailLive) {
        chain = chain.blend(src(o0), () => getHydraWindow().slowmoTrailMix ?? 0);
      }

      if (studioModeRef.current && exportFramingEnabled(exportSettingsRef.current)) {
        const resolveExportMatteLayout = () => {
          const canvas = canvasRef.current;
          const matteSettings = normalizeExportSettings(exportSettingsRef.current);
          if (!canvas) {
            return exportMatteLayout({
              exportSettings: matteSettings,
              canvasWidth: 1920,
              canvasHeight: 1080,
              videoAspect: getPrimaryVideoAspect(),
              inset: EXPORT_MATTE_INSET,
            });
          }
          return exportMatteLayout({
            exportSettings: matteSettings,
            canvasWidth: canvas.width,
            canvasHeight: canvas.height,
            videoAspect: getPrimaryVideoAspect(),
            inset: EXPORT_MATTE_INSET,
          });
        };
        chain = chain
          .exportVideoFit(
            () => resolveExportMatteLayout().contentHalfW,
            () => resolveExportMatteLayout().contentHalfH,
            () => resolveExportMatteLayout().contentOffsetY,
          )
          .exportMatte(
            () => 1,
            () => resolveExportMatteLayout().targetWidth,
            () => resolveExportMatteLayout().targetHeight,
            () => (resolveExportMatteLayout().usePixelBox ? 1 : 0),
            () => resolveExportMatteLayout().targetAspect,
            () => EXPORT_MATTE_INSET,
            () => EXPORT_MATTE_FEATHER,
            () => resolveExportMatteLayout().contentHalfW,
            () => resolveExportMatteLayout().contentHalfH,
            () => resolveExportMatteLayout().contentOffsetY,
          );
      }

      const liveOutputMapping = () =>
        normalizeOutputMapping(getHydraWindow().outputMapping ?? outputMappingRef.current);
      const outputMappingShouldApply = () => outputMappingShouldWarp(liveOutputMapping());

      const rdFx = resolveFxState()?.reactionDiffusion;
      const labsRdLive =
        !!rdFx?.enabled &&
        computeFxAmount("reactionDiffusion", rdFx, liveHydraBands(), FX_AMT_01) > 0.00001;
      if (labsRdLive && o1) {
        const rdVideoSrc = activeChannelRef.current === 0 ? s0 : s1;
        const getRdFeed = () => resolveParamValue("reactionDiffusion", "feed", 0.55);
        const getRdKill = () => resolveParamValue("reactionDiffusion", "kill", 0.57);
        const getRdScale = () => resolveParamValue("reactionDiffusion", "scale", 12);
        const getRdSpeed = () => resolveParamValue("reactionDiffusion", "speed", 0.45);
        const getRdStyleMap = () => resolveParamValue("reactionDiffusion", "styleMap", 0.35);
        const getRdSource = () => resolveParamValue("reactionDiffusion", "source", 0.78);
        const getRdFlow = () => resolveParamValue("reactionDiffusion", "flow", 0.32);
        const getRdEmbossSim = () => resolveParamValue("reactionDiffusion", "emboss", 0.58);
        const getRdForceSeed = () => (reactionDiffForceSeedRef.current > 0 ? 1 : 0);
        const rdStateRead = hydraOutputSimReadSampler(
          () =>
            (hydraRef.current as { o?: Array<{ getTexture?: () => unknown }> } | null)?.o?.[
              REACTION_DIFF_OUTPUT_INDEX
            ],
        );
        (hydra as { reactionDiffSim?: HydraShaderFn }).reactionDiffSim!(
          rdStateRead,
          rdVideoSrc,
          getRdFeed,
          getRdKill,
          getRdScale,
          getRdSpeed,
          getRdStyleMap,
          getRdSource,
          getRdFlow,
          getRdEmbossSim,
          getRdForceSeed,
        ).out(o1);
      }

      const patternFx = resolveFxState()?.patternLayer;
      const patternTuringLive =
        patternLayerIsTuring(patternFx) &&
        computeFxAmount("patternLayer", patternFx, liveHydraBands(), FX_AMT_01) > 0.00001;
      if (patternTuringLive && o3) {
        const turingSim = () =>
          patternTuringRdParams(
            resolveParamValue("patternLayer", "variant", 2),
            resolveParamValue("patternLayer", "scale", 1.0),
            resolveParamValue("patternLayer", "speed", 0.4),
            resolveParamValue("patternLayer", "warp", 0),
            resolveParamValue("patternLayer", "symmetry", 2),
            resolveParamValue("patternLayer", "seedSize", 0.18),
            resolveParamValue("patternLayer", "gap", 0.35),
          );
        const patternStateRead = hydraOutputSimReadSampler(
          () =>
            (hydraRef.current as { o?: Array<{ getTexture?: () => unknown }> } | null)?.o?.[
              PATTERN_RD_OUTPUT_INDEX
            ],
        );
        (hydra as { patternRdSim?: HydraShaderFn }).patternRdSim!(
          patternStateRead,
          () => turingSim().feed,
          () => turingSim().kill,
          () => turingSim().cells,
          () => turingSim().styleMap,
          () => turingSim().speed,
          () => turingSim().seedSize,
          () => (patternRdForceSeedRef.current > 0 ? 1 : 0),
        ).out(o3);
      }

      const hydraOutputs = (hydraRef.current as { o?: Array<{ getCurrent?: () => unknown }> } | null)?.o;
      const mapSourceOut = o0 ?? hydraOutputs?.[OUTPUT_MAP_SOURCE_INDEX];
      const mapDisplayOut = o2 ?? hydraOutputs?.[OUTPUT_MAP_DISPLAY_INDEX];
      const liveTransformAxis = (index: 0 | 1 | 2 | 3, axis: "x" | "y") => () => {
        const corner = outputMapTransformCorners(liveOutputMapping())[index];
        return corner[axis];
      };
      const mapMaskAtlas = getOutputMapMaskAtlasSampler();
      const setDisplayOutput = (
        hydraRef.current as { synth?: { render?: (output: unknown) => void } } | null
      )?.synth?.render;

      if (outputMappingShouldApply() && mapSourceOut && mapDisplayOut) {
        chain.out(mapSourceOut);
        const mapFrame = hydraOutputDisplaySampler(
          () => hydraOutputs?.[OUTPUT_MAP_SOURCE_INDEX],
        );
        osc(1, 0.001, 0)
          .outputCornerPinWarp(
            mapFrame,
            () => 1,
            liveTransformAxis(0, "x"),
            liveTransformAxis(0, "y"),
            liveTransformAxis(1, "x"),
            liveTransformAxis(1, "y"),
            liveTransformAxis(2, "x"),
            liveTransformAxis(2, "y"),
            liveTransformAxis(3, "x"),
            liveTransformAxis(3, "y"),
            {
              getTexture: () => {
                uploadOutputMapMaskAtlas(liveOutputMapping());
                return mapMaskAtlas.getTexture();
              },
            },
            () => {
              const layout = outputMapMaskAtlasLayout(liveOutputMapping());
              return Math.min(OUTPUT_MAP_SHADER_MASK_POINTS, layout.points.length);
            },
            () =>
              isOutputMapMaskAtlasReady() && !isIdentityOutputMapClip(liveOutputMapping())
                ? 1
                : 0,
            () =>
              isOutputMapMaskAtlasReady() &&
              liveOutputMapping().points.length >= OUTPUT_MAP_TRANSFORM_GRID_POINTS
                ? 1
                : 0,
          )
          .out(mapDisplayOut);
        setDisplayOutput?.(mapDisplayOut);
      } else {
        chain.out(o0);
        setDisplayOutput?.(o0);
      }

      const previewGroupId = getGroupBufferPreviewGroupId();
      const previewBusy = new Set<number>();
      if (labsRdLive) previewBusy.add(REACTION_DIFF_OUTPUT_INDEX);
      if (patternTuringLive) previewBusy.add(PATTERN_RD_OUTPUT_INDEX);
      if (outputMappingShouldApply()) previewBusy.add(OUTPUT_MAP_DISPLAY_INDEX);
      if (blurFlushOut) {
        const blurFlushIndex = [o0, o1, o2, o3].indexOf(blurFlushOut);
        if (blurFlushIndex >= 0) previewBusy.add(blurFlushIndex);
      }
      if (blurPassOut) {
        const blurPassIndex = [o0, o1, o2, o3].indexOf(blurPassOut);
        if (blurPassIndex >= 0) previewBusy.add(blurPassIndex);
      }
      if (prismFlushOut) {
        const prismFlushIndex = [o0, o1, o2, o3].indexOf(prismFlushOut);
        if (prismFlushIndex >= 0) previewBusy.add(prismFlushIndex);
      }
      for (const out of Object.values(groupFeedbackOutById)) {
        const index = [o0, o1, o2, o3].indexOf(out);
        if (index >= 0) previewBusy.add(index);
      }
      const previewSlot = resolveGroupBufferPreviewSlot({
        previewGroupId,
        buffer: previewGroupId ? groupBufferCache[previewGroupId] : undefined,
        feedbackOut: previewGroupId ? groupFeedbackOutById[previewGroupId] : undefined,
        outputs: [o0, o1, o2, o3],
        busyIndices: previewBusy,
      });
      setGroupBufferPreviewOutputIndex(previewSlot?.index ?? null);
      const previewBuffer = previewGroupId ? groupBufferCache[previewGroupId] : undefined;
      if (
        previewSlot &&
        previewBuffer &&
        !groupFeedbackCommits.some((commit) => commit.out === previewSlot.out)
      ) {
        groupFeedbackCommits.push({
          out: previewSlot.out,
          buffer: cloneHydraChain(previewBuffer),
        });
      }

      // Group Feedback FBOs must win last `.out()` so RD / map cannot steal them.
      for (const { out, buffer } of groupFeedbackCommits) {
        cloneHydraChain(buffer).out(out);
      }

      if (!isHydraRenderPaused()) {
        runHydraTickRef.current(0);
      }
    } catch (e) {
      console.error("Hydra Shader Error:", e);
    } finally {
      endHydraRender();
    }
}
