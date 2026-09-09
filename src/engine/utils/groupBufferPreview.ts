import type { HydraShaderChain } from "../hydra/hydraShaderTypes";

const PREVIEW_W = 320;
const PREVIEW_H = 180;
const BLIT_MIN_MS = 80;

let previewGroupId: string | null = null;
let previewOutputIndex: number | null = null;
let previewCanvas: HTMLCanvasElement | null = null;
let lastBlit = 0;
let srcPixels: Uint8Array | null = null;
let destPixels: Uint8ClampedArray | null = null;

export function getGroupBufferPreviewGroupId(): string | null {
  return previewGroupId;
}

export function setGroupBufferPreviewGroupId(groupId: string | null): void {
  previewGroupId = groupId;
  if (!groupId) previewOutputIndex = null;
}

export function setGroupBufferPreviewOutputIndex(index: number | null): void {
  previewOutputIndex = index;
}

export function registerGroupBufferPreviewCanvas(canvas: HTMLCanvasElement | null): void {
  previewCanvas = canvas;
}

type HydraPreviewFbo = {
  width?: number;
  height?: number;
  _framebuffer?: { framebuffer?: WebGLFramebuffer | null };
};

type HydraPreviewOutput = {
  getCurrent?: () => HydraPreviewFbo | undefined;
  getTexture?: () => HydraPreviewFbo | undefined;
};

export function resolveGroupBufferPreviewSlot(opts: {
  previewGroupId: string | null;
  buffer: HydraShaderChain | undefined;
  feedbackOut: HydraShaderChain | undefined;
  outputs: readonly (HydraShaderChain | undefined)[];
  busyIndices: ReadonlySet<number>;
}): { out: HydraShaderChain; index: number } | null {
  if (!opts.previewGroupId || !opts.buffer) return null;
  if (opts.feedbackOut) {
    const index = opts.outputs.indexOf(opts.feedbackOut);
    if (index > 0) return { out: opts.feedbackOut, index };
  }
  for (const index of [3, 2, 1]) {
    if (opts.busyIndices.has(index)) continue;
    const out = opts.outputs[index];
    if (out) return { out, index };
  }
  return null;
}

/** After hydra.tick, getCurrent is the FBO just written. Never use the display (o0). */
export function resolveGroupBufferPreviewFbo(
  output: HydraPreviewOutput | undefined,
): HydraPreviewFbo | null {
  return output?.getCurrent?.() ?? output?.getTexture?.() ?? null;
}

export function reglFboReadTarget(fbo: HydraPreviewFbo | null): {
  handle: WebGLFramebuffer;
  width: number;
  height: number;
} | null {
  const handle = fbo?._framebuffer?.framebuffer;
  const width = Math.round(fbo?.width ?? 0);
  const height = Math.round(fbo?.height ?? 0);
  if (!handle || width < 2 || height < 2) return null;
  return { handle, width, height };
}

function glOf(hydra: { regl?: { _gl?: WebGLRenderingContext }; canvas?: HTMLCanvasElement }): WebGLRenderingContext | null {
  const fromRegl = hydra.regl?._gl;
  if (fromRegl) return fromRegl;
  const canvas = hydra.canvas;
  if (!canvas) return null;
  return (
    canvas.getContext("webgl2") ||
    canvas.getContext("webgl") ||
    canvas.getContext("experimental-webgl")
  ) as WebGLRenderingContext | null;
}

/**
 * Hydra offscreen FBOs are already in canvas orientation (regl only flips
 * the default framebuffer). Copy top-left → top-left — do not invert Y.
 */
export function downsamplePreviewPixels(
  src: Uint8Array,
  sw: number,
  sh: number,
  dw: number,
  dh: number,
  dest: Uint8ClampedArray,
): void {
  const xRatio = sw / dw;
  const yRatio = sh / dh;
  for (let y = 0; y < dh; y++) {
    const sy = Math.min(sh - 1, Math.floor(y * yRatio));
    for (let x = 0; x < dw; x++) {
      const sx = Math.min(sw - 1, Math.floor(x * xRatio));
      const si = (sy * sw + sx) * 4;
      const di = (y * dw + x) * 4;
      dest[di] = src[si] ?? 0;
      dest[di + 1] = src[si + 1] ?? 0;
      dest[di + 2] = src[si + 2] ?? 0;
      dest[di + 3] = 255;
    }
  }
}

/** Copy the reserved group FBO into the inspector canvas. No-op when unused. */
export function requestGroupBufferPreviewFrame(hydra: {
  o?: HydraPreviewOutput[];
  regl?: { _gl?: WebGLRenderingContext };
  canvas?: HTMLCanvasElement;
}): void {
  const canvas = previewCanvas;
  const index = previewOutputIndex;
  if (!canvas || index == null || index === 0) return;
  const now = performance.now();
  if (now - lastBlit < BLIT_MIN_MS) return;

  const target = reglFboReadTarget(resolveGroupBufferPreviewFbo(hydra.o?.[index]));
  const gl = glOf(hydra);
  if (!target || !gl) return;
  lastBlit = now;

  const { handle, width: sw, height: sh } = target;
  const prev = gl.getParameter(gl.FRAMEBUFFER_BINDING) as WebGLFramebuffer | null;
  gl.bindFramebuffer(gl.FRAMEBUFFER, handle);
  try {
    const need = sw * sh * 4;
    if (!srcPixels || srcPixels.length !== need) srcPixels = new Uint8Array(need);
    gl.readPixels(0, 0, sw, sh, gl.RGBA, gl.UNSIGNED_BYTE, srcPixels);
  } finally {
    gl.bindFramebuffer(gl.FRAMEBUFFER, prev);
  }

  if (canvas.width !== PREVIEW_W) canvas.width = PREVIEW_W;
  if (canvas.height !== PREVIEW_H) canvas.height = PREVIEW_H;
  const destNeed = PREVIEW_W * PREVIEW_H * 4;
  if (!destPixels || destPixels.length !== destNeed) {
    destPixels = new Uint8ClampedArray(destNeed);
  }
  downsamplePreviewPixels(srcPixels, sw, sh, PREVIEW_W, PREVIEW_H, destPixels);
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return;
  const image = ctx.createImageData(PREVIEW_W, PREVIEW_H);
  image.data.set(destPixels);
  ctx.putImageData(image, 0, 0);
}
