import type { MutableRefObject } from "react";
import type { FolderConfig } from "../types/settings";
import { getHydraWindow } from "../types/hydraWindow";
import {
  createOscilloscopeWaveformBundle,
  drawOscilloscopeWaveform,
  type OscilloscopeWaveformBundle,
} from "../utils/oscilloscopeWaveform";
import {
  createNeonGridBundle,
  neonGridSpawnFromParams,
  neonGridDrawFromParams,
  type NeonGridBundle,
} from "../utils/neonGridLines";
import {
  createTextLayerBundle,
  syncTextLayerTexture,
  textLayerDrawFromFx,
  type TextLayerBundle,
} from "../utils/textLayerOverlay";
import { createTextLayerRuntimeState, type TextLayerRuntimeState } from "../utils/textLayerRuntime";
import {
  createThroughTheStarsBundle,
  type ThroughTheStarsBundle,
} from "../utils/throughTheStarsCanvas";
import { flushThroughTheStarsTexture, seedThroughTheStars } from "../utils/throughTheStarsRuntime";
import { createLumaDustBundle, type LumaDustBundle } from "../utils/lumaDustCanvas";
import { clearLumaDust, flushLumaDustTexture } from "../utils/lumaDustRuntime";
import { createLumaLockBundle, type LumaLockBundle } from "../utils/lumaLockCanvas";
import { clearLumaLock, flushLumaLockTexture } from "../utils/lumaLockRuntime";
import {
  createMetalSphereEnvBundle,
  type MetalSphereEnvBundle,
} from "../utils/metalSphereEnvMap";
import { seedNeonGridDemo, flushNeonGridTexture } from "../utils/neonGridRuntime";
import {
  bindOverlayFxSource,
  getOverlayHydraSource,
  resolveLiveOverlayFx,
  type OverlayCanvasBindState,
} from "../utils/overlayCanvasSource";
import { computeFxAmount, FX_AMT_01 } from "../utils/fxRuntime";

export type OverlayBridgeInitDeps = {
  settingsRef: MutableRefObject<FolderConfig>;
  backingWidth: number;
  backingHeight: number;
  oscilloscopeBundleRef: MutableRefObject<OscilloscopeWaveformBundle | null>;
  neonGridBundleRef: MutableRefObject<NeonGridBundle | null>;
  textLayerBundleRef: MutableRefObject<TextLayerBundle | null>;
  throughTheStarsBundleRef: MutableRefObject<ThroughTheStarsBundle | null>;
  lumaDustBundleRef: MutableRefObject<LumaDustBundle | null>;
  lumaLockBundleRef: MutableRefObject<LumaLockBundle | null>;
  metalEnvBundleRef: MutableRefObject<MetalSphereEnvBundle | null>;
  s3OverlayBindRef: MutableRefObject<OverlayCanvasBindState>;
  textLayerRuntimeRef: MutableRefObject<TextLayerRuntimeState>;
  oscilloscopeBridgeReadyRef: MutableRefObject<boolean>;
  neonGridBridgeReadyRef: MutableRefObject<boolean>;
  textLayerBridgeReadyRef: MutableRefObject<boolean>;
  throughTheStarsBridgeReadyRef: MutableRefObject<boolean>;
  lumaDustBridgeReadyRef: MutableRefObject<boolean>;
  lumaLockBridgeReadyRef: MutableRefObject<boolean>;
  metalEnvBridgeReadyRef: MutableRefObject<boolean>;
  neonGridWasEnabledRef: MutableRefObject<boolean>;
  textLayerWasEnabledRef: MutableRefObject<boolean>;
  throughTheStarsWasEnabledRef: MutableRefObject<boolean>;
  lumaDustWasEnabledRef: MutableRefObject<boolean>;
  lumaLockWasEnabledRef: MutableRefObject<boolean>;
};

export function initHydraOverlayBridges(deps: OverlayBridgeInitDeps) {
  const {
    settingsRef,
    backingWidth,
    backingHeight,
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
  } = deps;

  if (!getOverlayHydraSource("neonGrid")) return;

  try {
          const oscBundle = createOscilloscopeWaveformBundle();
          oscilloscopeBundleRef.current = oscBundle;
          getHydraWindow().oscilloscopeWaveformBundle = oscBundle;
          const neonBundle = createNeonGridBundle();
          neonGridBundleRef.current = neonBundle;
          neonGridBridgeReadyRef.current = true;
          const textBundle = createTextLayerBundle();
          textLayerBundleRef.current = textBundle;
          textLayerBridgeReadyRef.current = true;
          const starsBundle = createThroughTheStarsBundle();
          throughTheStarsBundleRef.current = starsBundle;
          throughTheStarsBridgeReadyRef.current = true;
          const dustBundle = createLumaDustBundle();
          lumaDustBundleRef.current = dustBundle;
          lumaDustBridgeReadyRef.current = true;
          const lockBundle = createLumaLockBundle();
          lumaLockBundleRef.current = lockBundle;
          lumaLockBridgeReadyRef.current = true;
          bindOverlayFxSource("neonGrid", neonBundle.canvas, s3OverlayBindRef.current);
          bindOverlayFxSource("textLayer", textBundle.canvas, s3OverlayBindRef.current);
          bindOverlayFxSource("throughTheStars", starsBundle.canvas, s3OverlayBindRef.current);
          bindOverlayFxSource("lumaDust", dustBundle.canvas, s3OverlayBindRef.current);
          bindOverlayFxSource("lumaLock", lockBundle.canvas, s3OverlayBindRef.current);
          bindOverlayFxSource("oscilloscope", oscBundle.canvas, s3OverlayBindRef.current);
          // Seed a short climbing trail so first frames aren't empty.
          for (let step = 0; step < 36; step++) {
            const wobble = 0.85 + 0.15 * Math.sin(step * 0.45);
            for (let i = 0; i < oscBundle.bins.length; i++) {
              const u = i / Math.max(1, oscBundle.bins.length - 1);
              oscBundle.bins[i] =
                (Math.exp(-Math.pow((u - 0.14) / 0.1, 2)) * 0.7 +
                  Math.exp(-Math.pow((u - 0.42) / 0.16, 2)) * 0.45 +
                  Math.exp(-Math.pow((u - 0.72) / 0.14, 2)) * 0.28) *
                wobble;
            }
            drawOscilloscopeWaveform(oscBundle, {
              persistence: 0.72,
              positionY: 0.88,
              scale: 0.55,
              mode: 0,
              colorLo: "#1c3cff",
              colorMid: "#ff9a1a",
              colorHi: "#fff6c8",
            });
          }
          oscBundle.lastUploadMs = -999;
          neonBundle.lastUploadMs = -999;
          oscilloscopeBridgeReadyRef.current = true;
          const metalBundle = createMetalSphereEnvBundle();
          metalEnvBundleRef.current = metalBundle;
          metalEnvBridgeReadyRef.current = true;
          const neonFx = resolveLiveOverlayFx(settingsRef.current, "neonGrid")?.config;
          if (neonFx) {
            const spawn = neonGridSpawnFromParams(neonFx.params);
            seedNeonGridDemo(neonBundle, spawn);
            flushNeonGridTexture({
              bundle: neonBundle,
              s3: getOverlayHydraSource("neonGrid"),
              bindState: s3OverlayBindRef.current,
              params: neonFx.params,
              draw: neonGridDrawFromParams(neonFx.params),
              aspect: window.innerWidth / Math.max(1, window.innerHeight),
              now: performance.now(),
            });
            neonGridWasEnabledRef.current = true;
          }
          const textFx = resolveLiveOverlayFx(settingsRef.current, "textLayer")?.config;
          if (textFx) {
            const parsed = textLayerDrawFromFx(textFx, getHydraWindow().customBands);
            textLayerRuntimeRef.current = createTextLayerRuntimeState();
            textLayerRuntimeRef.current.animStartMs = performance.now();
            textLayerRuntimeRef.current.lastMessage = parsed.message;
            textLayerRuntimeRef.current.lastAnim = parsed.anim;
            syncTextLayerTexture(
              getOverlayHydraSource("textLayer"),
              textBundle,
              {
                ...parsed,
                amount: textFx.base ?? 0.92,
                nowMs: performance.now(),
                animStartMs: textLayerRuntimeRef.current.animStartMs,
              },
              performance.now(),
              0,
            );
            textLayerWasEnabledRef.current = true;
          }
          const starsLive = resolveLiveOverlayFx(settingsRef.current, "throughTheStars");
          const starsFx = starsLive?.config;
          if (starsFx) {
            seedThroughTheStars(
              starsBundle,
              Number(starsFx.params?.density ?? 56),
              Number(starsFx.params?.depth ?? 0.65),
            );
            flushThroughTheStarsTexture({
              bundle: starsBundle,
              s3: getOverlayHydraSource("throughTheStars"),
              bindState: s3OverlayBindRef.current,
              fxCfg: starsFx,
              bands: getHydraWindow().customBands,
              amount: computeFxAmount(starsLive.effectKey, starsFx, getHydraWindow().customBands, FX_AMT_01),
              aspect: window.innerWidth / Math.max(1, window.innerHeight),
              now: performance.now(),
              pixelWidth: backingWidth,
              pixelHeight: backingHeight,
            });
            throughTheStarsWasEnabledRef.current = true;
          }
          const dustLive = resolveLiveOverlayFx(settingsRef.current, "lumaDust");
          const dustFx = dustLive?.config;
          if (dustFx) {
            clearLumaDust(dustBundle);
            flushLumaDustTexture({
              bundle: dustBundle,
              s3: getOverlayHydraSource("lumaDust"),
              bindState: s3OverlayBindRef.current,
              video: getHydraWindow().s0?.src as HTMLVideoElement | undefined,
              params: dustFx.params,
              amount: computeFxAmount(dustLive.effectKey, dustFx, getHydraWindow().customBands, FX_AMT_01),
              aspect: window.innerWidth / Math.max(1, window.innerHeight),
              now: performance.now(),
              pixelWidth: backingWidth,
              pixelHeight: backingHeight,
            });
            lumaDustWasEnabledRef.current = true;
          }
          const lockLive = resolveLiveOverlayFx(settingsRef.current, "lumaLock");
          const lockFx = lockLive?.config;
          if (lockFx) {
            clearLumaLock(lockBundle);
            flushLumaLockTexture({
              bundle: lockBundle,
              s3: getOverlayHydraSource("lumaLock"),
              bindState: s3OverlayBindRef.current,
              video: getHydraWindow().s0?.src as HTMLVideoElement | undefined,
              params: lockFx.params,
              amount: computeFxAmount(lockLive.effectKey, lockFx, getHydraWindow().customBands, FX_AMT_01),
              now: performance.now(),
              pixelWidth: backingWidth,
              pixelHeight: backingHeight,
            });
            lumaLockWasEnabledRef.current = true;
          }
        } catch {
          metalEnvBridgeReadyRef.current = false;
          oscilloscopeBridgeReadyRef.current = false;
          neonGridBridgeReadyRef.current = false;
          textLayerBridgeReadyRef.current = false;
          throughTheStarsBridgeReadyRef.current = false;
          lumaDustBridgeReadyRef.current = false;
          lumaLockBridgeReadyRef.current = false;
        }
}
