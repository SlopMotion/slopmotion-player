/** Low-res env map snapshot for Metal Sphere static mode. */
export const METAL_SPHERE_ENV_MAX_EDGE = 256;

export type MetalSphereEnvBundle = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  lastUpdateMs: number;
  lastPath: string;
};

export type MetalSphereEnvSource = {
  tex?: {
    width?: number;
    height?: number;
    resize?: (width: number, height: number) => void;
    subimage: (img: CanvasImageSource) => void;
  };
};

/** 0 = static snapshot, 1 = live video env (smooth, higher GPU cost). */
export function metalSphereUsesLiveEnvMap(envMapParam: number): boolean {
  return Math.round(envMapParam) >= 1;
}

function ensureEnvTextureSize(
  tex: NonNullable<MetalSphereEnvSource["tex"]>,
  width: number,
  height: number,
): void {
  if (typeof tex.resize !== "function") return;
  if (tex.width === width && tex.height === height) return;
  tex.resize(width, height);
}

export function createMetalSphereEnvBundle(): MetalSphereEnvBundle {
  const canvas = document.createElement("canvas");
  canvas.width = 2;
  canvas.height = 2;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2d canvas unavailable");
  return { canvas, ctx, lastUpdateMs: 0, lastPath: "" };
}

function envCanvasSize(vw: number, vh: number): { w: number; h: number } {
  const edge = Math.max(vw, vh);
  const scale = edge > METAL_SPHERE_ENV_MAX_EDGE ? METAL_SPHERE_ENV_MAX_EDGE / edge : 1;
  return {
    w: Math.max(2, Math.round(vw * scale)),
    h: Math.max(2, Math.round(vh * scale)),
  };
}

export function drawMetalSphereEnvFrame(
  bundle: MetalSphereEnvBundle,
  video: HTMLVideoElement,
): boolean {
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  if (!vw || !vh) return false;
  const { w, h } = envCanvasSize(vw, vh);
  if (bundle.canvas.width !== w || bundle.canvas.height !== h) {
    bundle.canvas.width = w;
    bundle.canvas.height = h;
  }
  bundle.ctx.setTransform(1, 0, 0, 1, 0, 0);
  bundle.ctx.drawImage(video, 0, 0, w, h);
  return true;
}

/** Upload a snapshot to s3. Static mode only — play mode samples live s0 in the shader. */
export function syncMetalSphereEnvMap(
  envSource: MetalSphereEnvSource | undefined,
  video: HTMLVideoElement | null | undefined,
  bundle: MetalSphereEnvBundle | null,
  opts: { now: number; videoPath: string; force?: boolean },
): boolean {
  if (!envSource?.tex || !bundle || !video || video.videoWidth <= 0) return false;

  const needsCapture = opts.force || bundle.lastPath !== opts.videoPath;
  if (!needsCapture) return false;

  if (!drawMetalSphereEnvFrame(bundle, video)) return false;
  const tex = envSource.tex;
  ensureEnvTextureSize(tex, bundle.canvas.width, bundle.canvas.height);
  try {
    tex.subimage(bundle.canvas);
  } catch {
    return false;
  }
  bundle.lastUpdateMs = opts.now;
  bundle.lastPath = opts.videoPath;
  return true;
}
