import {
  bindOverlayCanvasSource,
  type OverlayCanvasOwner,
} from "./overlayCanvasSource";
import {
  clearLumaLock,
  lumaLockDrawFromParams,
  syncLumaLockTexture,
  type LumaLockBundle,
  type LumaLockTexSource,
} from "./lumaLockCanvas";

export function advanceLumaLockFrame(opts: {
  bundle: LumaLockBundle;
  s3: LumaLockTexSource | undefined;
  bindState: { owner: OverlayCanvasOwner | null; canvas: HTMLCanvasElement | null };
  video: HTMLVideoElement | null | undefined;
  params: Record<string, unknown> | undefined;
  amount: number;
  dt: number;
  now: number;
  shouldBind?: boolean;
  skipVideoSample?: boolean;
  pixelWidth?: number;
  pixelHeight?: number;
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
    shouldBind = true,
    skipVideoSample = false,
    pixelWidth,
    pixelHeight,
  } = opts;
  if (!s3?.tex || amount <= 0.00001) return;

  if (shouldBind) {
    bindOverlayCanvasSource(s3, bundle.canvas, "lumaLock", bindState);
  }

  syncLumaLockTexture(
    s3,
    bundle,
    video,
    { ...lumaLockDrawFromParams(params, amount, dt), skipVideoSample, pixelWidth, pixelHeight },
    now,
    0,
  );
}

export function flushLumaLockTexture(opts: {
  bundle: LumaLockBundle;
  s3: LumaLockTexSource | undefined;
  bindState: { owner: OverlayCanvasOwner | null; canvas: HTMLCanvasElement | null };
  video: HTMLVideoElement | null | undefined;
  params: Record<string, unknown> | undefined;
  amount: number;
  now: number;
  pixelWidth?: number;
  pixelHeight?: number;
}): boolean {
  const { bundle, s3, bindState, video, params, amount, now, pixelWidth, pixelHeight } = opts;
  if (!s3?.tex || amount <= 0.00001) return false;
  bindOverlayCanvasSource(s3, bundle.canvas, "lumaLock", bindState);
  bundle.lastUploadMs = 0;
  return syncLumaLockTexture(
    s3,
    bundle,
    video,
    { ...lumaLockDrawFromParams(params, amount, 1 / 60), pixelWidth, pixelHeight },
    now,
    0,
  );
}

export { clearLumaLock };
