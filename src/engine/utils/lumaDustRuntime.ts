import {
  bindOverlayCanvasSource,
  type OverlayCanvasOwner,
} from "./overlayCanvasSource";
import {
  clearLumaDust,
  lumaDustDrawFromParams,
  syncLumaDustTexture,
  type LumaDustBundle,
  type LumaDustTexSource,
} from "./lumaDustCanvas";

export function advanceLumaDustFrame(opts: {
  bundle: LumaDustBundle;
  s3: LumaDustTexSource | undefined;
  bindState: { owner: OverlayCanvasOwner | null; canvas: HTMLCanvasElement | null };
  video: HTMLVideoElement | null | undefined;
  params: Record<string, unknown> | undefined;
  amount: number;
  dt: number;
  now: number;
  aspect: number;
  pixelWidth?: number;
  pixelHeight?: number;
  shouldBind?: boolean;
  skipVideoSample?: boolean;
}): void {
  const {
    bundle,
    s3,
    bindState,
    video,
    params,
    amount,
    dt,
    now,
    aspect,
    pixelWidth,
    pixelHeight,
    shouldBind = true,
    skipVideoSample = false,
  } = opts;
  if (!s3?.tex || amount <= 0.00001) return;

  if (shouldBind) {
    bindOverlayCanvasSource(s3, bundle.canvas, "lumaDust", bindState);
  }

  syncLumaDustTexture(
    s3,
    bundle,
    video,
    { ...lumaDustDrawFromParams(params, amount, dt), pixelWidth, pixelHeight, skipVideoSample },
    aspect,
    now,
    0,
  );
}

export function flushLumaDustTexture(opts: {
  bundle: LumaDustBundle;
  s3: LumaDustTexSource | undefined;
  bindState: { owner: OverlayCanvasOwner | null; canvas: HTMLCanvasElement | null };
  video: HTMLVideoElement | null | undefined;
  params: Record<string, unknown> | undefined;
  amount: number;
  aspect: number;
  now: number;
  pixelWidth?: number;
  pixelHeight?: number;
}): boolean {
  const { bundle, s3, bindState, video, params, amount, aspect, now, pixelWidth, pixelHeight } = opts;
  if (!s3?.tex || amount <= 0.00001) return false;
  bindOverlayCanvasSource(s3, bundle.canvas, "lumaDust", bindState);
  bundle.lastUploadMs = 0;
  return syncLumaDustTexture(
    s3,
    bundle,
    video,
    { ...lumaDustDrawFromParams(params, amount, 1 / 60), pixelWidth, pixelHeight },
    aspect,
    now,
    0,
  );
}

export { clearLumaDust };
