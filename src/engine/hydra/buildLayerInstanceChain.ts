import type { MutableRefObject } from "react";
import type { HydraShaderChain, HydraShaderFn } from "./hydraShaderTypes";
import type { LayerInstance } from "../types/fxChainTree";
import type { HydraInstance } from "../types/hydraWindow";
import { getHydraWindow } from "../types/hydraWindow";
import {
  PATTERN_LAYER_GEOMETRY_TYPE,
  PATTERN_LAYER_MAX_TYPE,
  PATTERN_LAYER_TURING_TYPE,
  PATTERN_RD_OUTPUT_INDEX,
  patternTuringCells,
} from "../utils/patternLayerRd";
import {
  patternTuringDisplayGlsl,
  PATTERN_TURING_DISPLAY_INPUTS,
} from "../shaders/patternLayerGlsl";
import { hydraOutputDisplaySampler } from "../utils/reactionDiffOutput";
import {
  getElectricNoiseTextureSampler,
} from "../utils/electricNoiseTexture";
import { getElectricNoiseTriggerTextureSampler } from "../utils/electricNoiseTriggerTex";
import type { ElectricNoiseCirclePack } from "../utils/electricNoiseTriggerCircles";
import { plexusLayersForQuality, plexusPointsForQuality } from "../utils/plexusQuality";
import { snapPlexusLayers } from "../shaders/plexusSrcGlsl";
import { snapFractalFoldDepth } from "../shaders/fractalFoldSrcGlsl";
import type { RenderQualityTier } from "../utils/renderQuality";
import { computeFxAmount, computeParamValue, getBandValue, FX_AMT_01 } from "../utils/fxRuntime";
import type { AudioBand } from "../types/settings";

const getElectricTriggerRings = () => 1;

function hexRgb01(hex: unknown, fallback: string): [number, number, number] {
  const s = typeof hex === "string" ? hex : fallback;
  const h = s.replace("#", "").trim();
  if (h.length !== 6) return [0, 0, 0];
  const n = parseInt(h, 16);
  if (Number.isNaN(n)) return [0, 0, 0];
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function instanceParam(
  effectKey: string,
  inst: LayerInstance,
  paramKey: string,
  def: number,
  liveHydraBands: () => Record<AudioBand, number> | undefined,
): number {
  return computeParamValue(
    effectKey,
    inst.config,
    paramKey,
    def,
    liveHydraBands(),
    inst.templateKey,
  );
}

function aspectScale(chain: HydraShaderChain) {
  return chain.scale(() => window.innerWidth / window.innerHeight, 1);
}

function instanceStringParam(inst: LayerInstance, paramKey: string, fallback: string): string {
  const raw = inst.config.params?.[paramKey];
  return typeof raw === "string" ? raw : fallback;
}

function instanceAmount(
  effectKey: string,
  inst: LayerInstance,
  liveHydraBands: () => Record<AudioBand, number> | undefined,
): number {
  return computeFxAmount(effectKey, inst.config, liveHydraBands(), FX_AMT_01);
}

function instanceAudioBoost(
  effectKey: string,
  inst: LayerInstance,
  liveHydraBands: () => Record<AudioBand, number> | undefined,
): number {
  const cfg = inst.config;
  if (!cfg.syncBand || cfg.syncBand === "none") return 0;
  return (
    getBandValue(effectKey, cfg.syncBand, liveHydraBands(), undefined, cfg) *
    (cfg.syncMultiplier ?? 0.45)
  );
}

export type BuildLayerInstanceHydra = {
  fillLayerSrc: HydraShaderFn;
  shapeLayerSrc: HydraShaderFn;
  superformulaSrc: HydraShaderFn;
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
  gaussianNoiseGrid: HydraShaderFn;
  noise: HydraShaderFn;
  solid: HydraShaderFn;
  src: HydraShaderFn;
  s0: NonNullable<ReturnType<typeof getHydraWindow>["s0"]>;
  s1: NonNullable<ReturnType<typeof getHydraWindow>["s1"]>;
  patternTuringDisplay?: HydraShaderFn;
};

export type BuildLayerInstanceContext = {
  hydraRef: MutableRefObject<HydraInstance | null>;
  effectKey: string;
  hydra: BuildLayerInstanceHydra;
  activeChannelRef: MutableRefObject<0 | 1>;
  renderQualityRef: MutableRefObject<RenderQualityTier>;
  electricNoiseCirclePackRef: MutableRefObject<ElectricNoiseCirclePack>;
  liveHydraBands: () => Record<AudioBand, number> | undefined;
};

export function buildLayerInstanceChain(
  inst: LayerInstance,
  ctx: BuildLayerInstanceContext,
): HydraShaderChain | null {
  const { hydra, hydraRef, effectKey, activeChannelRef, renderQualityRef, electricNoiseCirclePackRef, liveHydraBands } =
    ctx;
  const {
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
  } = hydra;
  const param = (paramKey: string, def: number) =>
    instanceParam(effectKey, inst, paramKey, def, liveHydraBands);
  const params = () => inst.config.params;

  switch (inst.templateKey) {
    case "fillLayer": {
      const getFillAr = () => hexRgb01(params()?.colorA, "#7c3aed")[0];
      const getFillAg = () => hexRgb01(params()?.colorA, "#7c3aed")[1];
      const getFillAb = () => hexRgb01(params()?.colorA, "#7c3aed")[2];
      const getFillBr = () => hexRgb01(params()?.colorB, "#06b6d4")[0];
      const getFillBg = () => hexRgb01(params()?.colorB, "#06b6d4")[1];
      const getFillBb = () => hexRgb01(params()?.colorB, "#06b6d4")[2];
      const getFillType = () =>
        Math.max(0, Math.min(3, Math.round(Number(param("type", 1)))));
      const getFillSweep = () =>
        Math.max(0, Math.min(3, Math.round(Number(param("sweep", 0)))));
      const getFillSoft = () => param("softness", 0.35);
      return typeof fillLayerSrc === "function"
        ? aspectScale(
            fillLayerSrc(
              getFillAr,
              getFillAg,
              getFillAb,
              getFillBr,
              getFillBg,
              getFillBb,
              getFillType,
              getFillSoft,
              getFillSweep,
            ),
          )
        : solid(1, 0, 0);
    }
    case "noise": {
      const getNoiseGrid = () => Math.max(8, Math.min(8192, param("scale", 1681)));
      const getNoiseSpeed = () =>
        0.22 *
        Math.pow(Math.min(3, Math.max(0, Number(param("speed", 0.15)))), 1.35);
      return gaussianNoiseGrid != null
        ? aspectScale(gaussianNoiseGrid(() => getNoiseGrid(), () => getNoiseSpeed()))
        : aspectScale(
            noise(() => Math.max(0.05, getNoiseGrid() * 0.12), () => 0.02 + getNoiseSpeed() * 1.25).saturate(
              0,
            ),
          );
    }
    case "plasma": {
      const getPlasmaSpeed = () => param("speed", 1.1);
      const getPlasmaScale = () => param("scale", 1.0);
      const getPlasmaComplexity = () => param("complexity", 1.0);
      return typeof plasmaSrc === "function"
        ? plasmaSrc(getPlasmaSpeed, getPlasmaScale, getPlasmaComplexity)
        : solid(0.5, 0.2, 0.9);
    }
    case "patternLayer": {
      const getPatternAr = () => hexRgb01(instanceStringParam(inst, "colorA", "#0b1020"), "#0b1020")[0];
      const getPatternAg = () => hexRgb01(instanceStringParam(inst, "colorA", "#0b1020"), "#0b1020")[1];
      const getPatternAb = () => hexRgb01(instanceStringParam(inst, "colorA", "#0b1020"), "#0b1020")[2];
      const getPatternBr = () => hexRgb01(instanceStringParam(inst, "colorB", "#22d3ee"), "#22d3ee")[0];
      const getPatternBg = () => hexRgb01(instanceStringParam(inst, "colorB", "#22d3ee"), "#22d3ee")[1];
      const getPatternBb = () => hexRgb01(instanceStringParam(inst, "colorB", "#22d3ee"), "#22d3ee")[2];
      const getPatternVariant = () =>
        Math.max(0, Math.min(3, Math.round(Number(param("variant", 2)))));
      const getPatternGeometry = () =>
        Math.max(0, Math.min(10, Math.round(Number(param("geometry", 0)))));
      const getPatternScale = () => param("scale", 1.0);
      const getPatternSpeed = () => param("speed", 0.4);
      const getPatternWarp = () => param("warp", 0);
      const getPatternCells = () => patternTuringCells(getPatternScale());
      const getPatternSymmetry = () => param("symmetry", 2);
      const patternFamily = Math.max(
        0,
        Math.min(PATTERN_LAYER_MAX_TYPE, Math.round(Number(param("type", 1)))),
      );
      const rdDisplay = hydraOutputDisplaySampler(
        () =>
          (hydraRef.current as { o?: Array<{ getCurrent?: () => unknown }> } | null)?.o?.[
            PATTERN_RD_OUTPUT_INDEX
          ],
      );
      if (patternFamily === PATTERN_LAYER_TURING_TYPE) {
        const synth = hydraRef.current?.synth;
        synth?.setFunction?.({
          name: "patternTuringDisplay",
          type: "src",
          inputs: [...PATTERN_TURING_DISPLAY_INPUTS],
          glsl: patternTuringDisplayGlsl(
            hexRgb01(instanceStringParam(inst, "colorA", "#0b1020"), "#0b1020"),
            hexRgb01(instanceStringParam(inst, "colorB", "#22d3ee"), "#22d3ee"),
          ),
        });
        const patternTuringDisplay = (getHydraWindow() as { patternTuringDisplay?: HydraShaderFn })
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
    }
    case "electricNoise": {
      const getElectricSpeed = () => param("speed", 1.0);
      const getElectricScale = () => param("scale", 1.0);
      const getElectricNoiseScale = () => param("noiseScale", 1.0);
      const getElectricTurbulence = () => param("turbulence", 0.2);
      const getElectricDetail = () => param("detail", 5);
      const getElectricIntensity = () => param("intensity", 1.4);
      const getElectricRings = () => param("rings", 0.85);
      const getElectricRing = () => param("ringPower", 0.9);
      const getElectricColorR = () => hexRgb01(instanceStringParam(inst, "color", "#331a66"), "#331a66")[0];
      const getElectricColorG = () => hexRgb01(instanceStringParam(inst, "color", "#331a66"), "#331a66")[1];
      const getElectricColorB = () => hexRgb01(instanceStringParam(inst, "color", "#331a66"), "#331a66")[2];
      const electricCirclePack = () => electricNoiseCirclePackRef.current;
      const getElectricTriggerRingCount = () => electricCirclePack().count;
      return typeof electricNoiseSrc === "function"
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
    }
    case "plexus": {
      const getPlexusSpeed = () => param("speed", 1.0);
      const getPlexusPoints = () =>
        plexusPointsForQuality(param("points", 1.5), renderQualityRef.current);
      const getPlexusIntensity = () => param("intensity", 1.0);
      const getPlexusLayers = () =>
        plexusLayersForQuality(param("layers", 4.0), renderQualityRef.current);
      const getPlexusGlow = () => param("glow", 1.2);
      const getPlexusAudioBoost = () => instanceAudioBoost(effectKey, inst, liveHydraBands);
      return typeof plexusSrc === "function"
        ? plexusSrc(
            getPlexusSpeed,
            getPlexusPoints,
            getPlexusIntensity,
            getPlexusLayers,
            getPlexusGlow,
            getPlexusAudioBoost,
          )
        : solid(0.4, 0.15, 0.85);
    }
    case "topoContour": {
      const topoVideo = activeChannelRef.current === 0 ? s0 : s1;
      const getTopoScale = () => param("scale", 1.0);
      const getTopoLines = () =>
        Math.max(2, Math.min(24, Math.round(param("lines", 10))));
      const getTopoSpeed = () => param("speed", 1.0);
      const getTopoValley = () => param("valley", 0.12);
      const getTopoLineWidth = () => param("lineWidth", 1.0);
      const getTopoVideoTint = () => param("videoTint", 0.35);
      const getTopoPalette = () =>
        Math.max(0, Math.min(1, Math.round(param("palette", 0))));
      return typeof topoContourSrc === "function"
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
    }
    case "universeWithin": {
      const getUniverseSpeed = () => param("speed", 1.0);
      const getUniverseZoom = () => param("zoom", 1.5);
      const getUniverseLayers = () => snapPlexusLayers(param("layers", 4.0));
      const getUniverseGlow = () => param("glow", 1.2);
      const getUniverseAudioBoost = () => instanceAudioBoost(effectKey, inst, liveHydraBands);
      return typeof universeWithinSrc === "function"
        ? universeWithinSrc(
            getUniverseSpeed,
            getUniverseZoom,
            getUniverseLayers,
            getUniverseGlow,
            getUniverseAudioBoost,
          )
        : solid(0.4, 0.15, 0.85);
    }
    case "fractalFold": {
      const getFoldX = () => param("foldX", 0.86);
      const getFoldY = () => param("foldY", 1.04);
      const getFoldZoom = () => param("zoom", 1.0);
      const getFoldSpeed = () => param("speed", 0.6);
      const getFoldSpin = () => param("spin", 0.42);
      const getFoldDepth = () => snapFractalFoldDepth(param("depth", 8));
      const getFoldGlow = () => param("glow", 1.4);
      const getFoldHue = () => param("hue", 0.12);
      const getFoldAudioBoost = () => instanceAudioBoost(effectKey, inst, liveHydraBands);
      return typeof fractalFoldSrc === "function"
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
    }
    case "shapeLayer": {
      const getShapeAmt = () => instanceAmount(effectKey, inst, liveHydraBands);
      const getShapeCr = () => hexRgb01(instanceStringParam(inst, "color", "#ffffff"), "#ffffff")[0];
      const getShapeCg = () => hexRgb01(instanceStringParam(inst, "color", "#ffffff"), "#ffffff")[1];
      const getShapeCb = () => hexRgb01(instanceStringParam(inst, "color", "#ffffff"), "#ffffff")[2];
      const getShapePick = () =>
        Math.max(0, Math.min(4, Math.round(Number(param("shape", 0)))));
      const getShapeSize = () => param("size", 0.45);
      const getShapeRoundness = () => param("roundness", 0);
      const getShapeStroke = () => param("stroke", 0.15);
      const getShapeFill = () =>
        Math.max(0, Math.min(1, Math.round(Number(param("fill", 0)))));
      const getShapeRotate = () => param("rotate", 0);
      const getShapeCenterX = () => param("centerX", 0.5);
      const getShapeCenterY = () => param("centerY", 0.5);
      return typeof shapeLayerSrc === "function"
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
    }
    case "superformula": {
      const getSuperLook = () =>
        Math.max(0, Math.min(2, Math.round(Number(param("look", 2)))));
      const getSuperM = () => param("m", 7.6);
      const getSuperN1 = () => param("n1", 0.36);
      const getSuperN2 = () => param("n2", 2.16);
      const getSuperSize = () => param("size", 0.48);
      const getSuperSpeed = () => param("speed", 0.35);
      const getSuperGlow = () => param("glow", 1.2);
      const getSuperCr = () => hexRgb01(instanceStringParam(inst, "color", "#c4b5fd"), "#c4b5fd")[0];
      const getSuperCg = () => hexRgb01(instanceStringParam(inst, "color", "#c4b5fd"), "#c4b5fd")[1];
      const getSuperCb = () => hexRgb01(instanceStringParam(inst, "color", "#c4b5fd"), "#c4b5fd")[2];
      return typeof superformulaSrc === "function"
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
    }
    default:
      return null;
  }
}
