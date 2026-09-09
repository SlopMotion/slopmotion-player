const THUMB_W = 240;
const THUMB_H = 135;
const JPEG_QUALITIES = [0.58, 0.4, 0.28] as const;
export const HYDRA_THUMB_MAX_CHARS = 40_000;

let encodeCanvas: HTMLCanvasElement | null = null;
let srcPixels: Uint8Array | null = null;
let destPixels: Uint8ClampedArray | null = null;

export function parseThumbDataUrl(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  if (
    !value.startsWith("data:image/jpeg;base64,") &&
    !value.startsWith("data:image/webp;base64,") &&
    !value.startsWith("data:image/png;base64,")
  ) {
    return undefined;
  }
  if (value.length < 40 || value.length > HYDRA_THUMB_MAX_CHARS) return undefined;
  return value;
}

export function withCapturedHydraThumb<T extends object>(item: T): T {
  const thumbDataUrl = captureHydraThumbDataUrl();
  if (!thumbDataUrl) return item;
  return { ...item, thumbDataUrl };
}

/** Copy hydra-canvas into a small JPEG data URL. Null when the canvas is missing or tainted. */
export function captureHydraThumbDataUrl(): string | null {
  if (typeof document === "undefined") return null;
  const src = document.getElementById("hydra-canvas") as HTMLCanvasElement | null;
  if (!src || src.width < 2 || src.height < 2) return null;

  const fromDraw = encodeFromDrawImage(src);
  if (fromDraw) return fromDraw;
  return encodeFromWebGlPixels(src);
}

function encodeFromDrawImage(src: HTMLCanvasElement): string | null {
  try {
    const dest = getEncodeCanvas();
    const ctx = dest.getContext("2d", { alpha: false });
    if (!ctx) return null;
    ctx.drawImage(src, 0, 0, THUMB_W, THUMB_H);
    return encodeJpeg(dest);
  } catch {
    return null;
  }
}

function encodeFromWebGlPixels(src: HTMLCanvasElement): string | null {
  const gl =
    (src.getContext("webgl2") ||
      src.getContext("webgl") ||
      src.getContext("experimental-webgl")) as WebGLRenderingContext | null;
  if (!gl) return null;

  const w = src.width;
  const h = src.height;
  const need = w * h * 4;
  if (!srcPixels || srcPixels.length !== need) srcPixels = new Uint8Array(need);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, srcPixels);

  const destNeed = THUMB_W * THUMB_H * 4;
  if (!destPixels || destPixels.length !== destNeed) {
    destPixels = new Uint8ClampedArray(destNeed);
  }
  downsampleFlippedY(srcPixels, w, h, THUMB_W, THUMB_H, destPixels);

  try {
    const dest = getEncodeCanvas();
    const ctx = dest.getContext("2d", { alpha: false });
    if (!ctx) return null;
    const image = ctx.createImageData(THUMB_W, THUMB_H);
    image.data.set(destPixels);
    ctx.putImageData(image, 0, 0);
    return encodeJpeg(dest);
  } catch {
    return null;
  }
}

export function downsampleFlippedY(
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
    const sy = Math.min(sh - 1, Math.max(0, sh - 1 - Math.floor(y * yRatio)));
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

function getEncodeCanvas(): HTMLCanvasElement {
  if (!encodeCanvas) encodeCanvas = document.createElement("canvas");
  encodeCanvas.width = THUMB_W;
  encodeCanvas.height = THUMB_H;
  return encodeCanvas;
}

function encodeJpeg(canvas: HTMLCanvasElement): string | null {
  for (const quality of JPEG_QUALITIES) {
    const url = canvas.toDataURL("image/jpeg", quality);
    if (parseThumbDataUrl(url)) return url;
  }
  return null;
}
