import type { AudioBands } from "../hooks/useAudioAnalyzer";
import type { FXConfig } from "../types/settings";
import { computeParamValue } from "./fxRuntime";
import {
  bindOverlayCanvasSource,
  type OverlayCanvasOwner,
} from "./overlayCanvasSource";
import {
  drawThroughTheStarsFrame,
  parseStarsTint,
  seedThroughTheStars,
  syncThroughTheStarsTexture,
  type ThroughTheStarsBundle,
  type ThroughTheStarsDrawOpts,
  type ThroughTheStarsTexSource,
} from "./throughTheStarsCanvas";

type StarsBands = (AudioBands & Record<string, number>) | undefined;

/** Resolve draw options through paramSync so LFO/audio mappings (CX, CY, …) apply live. */
export function throughTheStarsDrawFromFx(
  fxCfg: FXConfig | undefined,
  bands: StarsBands,
  dt: number,
): ThroughTheStarsDrawOpts {
  const key = "throughTheStars";
  return {
    density: computeParamValue(key, fxCfg, "density", 56, bands),
    speed: computeParamValue(key, fxCfg, "speed", 1.15, bands),
    trail: computeParamValue(key, fxCfg, "trail", 0.48, bands),
    glow: computeParamValue(key, fxCfg, "glow", 0.74, bands),
    fov: computeParamValue(key, fxCfg, "fov", 1.05, bands),
    depth: computeParamValue(key, fxCfg, "depth", 0.65, bands),
    centerX: computeParamValue(key, fxCfg, "centerX", 0.5, bands),
    centerY: computeParamValue(key, fxCfg, "centerY", 0.5, bands),
    tint: parseStarsTint(fxCfg?.params?.tint),
    dt,
  };
}

export function advanceThroughTheStarsFrame(opts: {
  bundle: ThroughTheStarsBundle;
  s3: ThroughTheStarsTexSource | undefined;
  bindState: { owner: OverlayCanvasOwner | null; canvas: HTMLCanvasElement | null };
  fxCfg: FXConfig | undefined;
  bands: StarsBands;
  amount: number;
  dt: number;
  now: number;
  aspect: number;
  pixelWidth?: number;
  pixelHeight?: number;
  shouldBind?: boolean;
}): void {
  const {
    bundle,
    s3,
    bindState,
    fxCfg,
    bands,
    amount,
    dt,
    now,
    aspect,
    pixelWidth,
    pixelHeight,
    shouldBind = true,
  } = opts;
  if (!s3?.tex || amount <= 0.00001) return;

  if (shouldBind) {
    bindOverlayCanvasSource(s3, bundle.canvas, "throughTheStars", bindState);
  }

  const drawOpts = {
    ...throughTheStarsDrawFromFx(fxCfg, bands, dt),
    amount,
    pixelWidth,
    pixelHeight,
  };
  syncThroughTheStarsTexture(s3, bundle, drawOpts, aspect, now, 0);
}

export function flushThroughTheStarsTexture(opts: {
  bundle: ThroughTheStarsBundle;
  s3: ThroughTheStarsTexSource | undefined;
  bindState: { owner: OverlayCanvasOwner | null; canvas: HTMLCanvasElement | null };
  fxCfg: FXConfig | undefined;
  bands: StarsBands;
  amount: number;
  aspect: number;
  now: number;
  pixelWidth?: number;
  pixelHeight?: number;
}): boolean {
  const { bundle, s3, bindState, fxCfg, bands, amount, aspect, now, pixelWidth, pixelHeight } = opts;
  if (!s3?.tex || amount <= 0.00001) return false;
  bindOverlayCanvasSource(s3, bundle.canvas, "throughTheStars", bindState);
  bundle.lastUploadMs = 0;
  return syncThroughTheStarsTexture(
    s3,
    bundle,
    { ...throughTheStarsDrawFromFx(fxCfg, bands, 1 / 60), amount, pixelWidth, pixelHeight },
    aspect,
    now,
    0,
  );
}

export { seedThroughTheStars, drawThroughTheStarsFrame };
