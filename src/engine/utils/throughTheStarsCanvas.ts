/** Canvas starfield — full-surface spawn, depth fade-in, outward drift + feedback trails. */

/** Soft cap — layer matches Hydra backing size up to this edge. */
export const THROUGH_STARS_MAX_EDGE = 4096;
/** Design baseline for stroke/point sizing (legacy 512-wide buffer). */
const THROUGH_STARS_REF_WIDTH = 512;

export type ThroughTheStarsStar = {
  /** Normalized screen anchor 0–1 (random across the whole frame). */
  u: number;
  v: number;
  /** 0 = far / invisible, 1 = near camera / recycle. */
  z: number;
  brightness: number;
  size: number;
  px: number;
  py: number;
};

export type ThroughTheStarsBundle = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  buffer: HTMLCanvasElement;
  bufferCtx: CanvasRenderingContext2D;
  stars: ThroughTheStarsStar[];
  lastUploadMs: number;
};

export type ThroughTheStarsTexSource = {
  tex?: {
    width?: number;
    height?: number;
    resize?: (width: number, height: number) => void;
    subimage: (img: CanvasImageSource) => void;
  };
};

export type ThroughTheStarsDrawOpts = {
  density: number;
  speed: number;
  trail: number;
  glow: number;
  fov: number;
  depth: number;
  centerX: number;
  centerY: number;
  tint: readonly [number, number, number];
  dt: number;
  /** Live amount (base + audio depth) — extends trail length on hits. */
  amount?: number;
  pixelWidth?: number;
  pixelHeight?: number;
};

function clamp(v: number, lo: number, hi: number, fallback: number): number {
  return Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : fallback;
}

function mix(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / Math.max(1e-6, edge1 - edge0), 0, 1, 0);
  return t * t * (3 - 2 * t);
}

function ensureCanvasSize(
  bundle: ThroughTheStarsBundle,
  aspect: number,
  pixelWidth?: number,
  pixelHeight?: number,
): { w: number; h: number } {
  const safeAspect = Number.isFinite(aspect) && aspect > 0.05 ? aspect : 16 / 9;
  let w: number;
  let h: number;

  if (
    pixelWidth !== undefined &&
    pixelHeight !== undefined &&
    pixelWidth >= 160 &&
    pixelHeight >= 90
  ) {
    w = Math.round(pixelWidth);
    h = Math.round(pixelHeight);
    const edge = Math.max(w, h);
    if (edge > THROUGH_STARS_MAX_EDGE) {
      const scale = THROUGH_STARS_MAX_EDGE / edge;
      w = Math.max(160, Math.round(w * scale));
      h = Math.max(90, Math.round(h * scale));
    }
  } else {
    w = Math.min(THROUGH_STARS_MAX_EDGE, 1920);
    h = Math.round(w / safeAspect);
    if (h > THROUGH_STARS_MAX_EDGE) {
      h = THROUGH_STARS_MAX_EDGE;
      w = Math.round(h * safeAspect);
    }
    w = Math.max(160, w);
    h = Math.max(90, h);
  }

  if (bundle.canvas.width !== w || bundle.canvas.height !== h) {
    bundle.canvas.width = w;
    bundle.buffer.width = w;
    bundle.canvas.height = h;
    bundle.buffer.height = h;
    bundle.lastUploadMs = 0;
  }
  return { w, h };
}

function spawnStarSurface(): Pick<ThroughTheStarsStar, "u" | "v" | "z" | "brightness" | "size" | "px" | "py"> {
  return {
    u: 0.04 + Math.random() * 0.92,
    v: 0.04 + Math.random() * 0.92,
    z: Math.random() * mix(0.22, 0.48, Math.random()),
    brightness: 0.45 + Math.random() * 0.55,
    size: 0.55 + Math.random() * 0.65,
    px: -9999,
    py: -9999,
  };
}

export function parseStarsTint(hex: unknown): [number, number, number] {
  if (typeof hex !== "string" || !/^#[0-9a-fA-F]{6}$/.test(hex)) return [0, 232, 204];
  const n = Number.parseInt(hex.slice(1), 16);
  if (!Number.isFinite(n)) return [0, 232, 204];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function createThroughTheStarsBundle(): ThroughTheStarsBundle {
  const canvas = document.createElement("canvas");
  const buffer = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 180;
  buffer.width = 320;
  buffer.height = 180;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const bufferCtx = buffer.getContext("2d", { willReadFrequently: true });
  if (!ctx || !bufferCtx) throw new Error("2d canvas unavailable");
  return { canvas, ctx, buffer, bufferCtx, stars: [], lastUploadMs: 0 };
}

export function targetThroughTheStarsCount(density: number): number {
  const d = clamp(density, 12, 220, 56);
  return Math.max(8, Math.min(462, Math.round(d * 2.1)));
}

/** Audio-driven amount stretches streak length without changing the Trail slider rest value. */
export function effectiveThroughTheStarsTrail(trail: number, amount: number): number {
  const t = clamp(trail, 0, 1.5, 0.48);
  const a = clamp(amount, 0, 1, 0.78);
  return clamp(t * mix(0.52, 1.72, a), 0, 1.5, 0.48);
}

export function syncThroughTheStarsDensity(bundle: ThroughTheStarsBundle, density: number): void {
  const target = targetThroughTheStarsCount(density);
  const { stars } = bundle;
  if (stars.length === target) return;
  if (stars.length < target) {
    for (let i = stars.length; i < target; i++) {
      stars.push(spawnStarSurface());
    }
    return;
  }
  stars.length = target;
}

export function seedThroughTheStars(
  bundle: ThroughTheStarsBundle,
  density: number,
  _depth: number,
): void {
  const count = targetThroughTheStarsCount(density);
  const stars: ThroughTheStarsStar[] = [];
  for (let i = 0; i < count; i++) {
    stars.push(spawnStarSurface());
  }
  bundle.stars = stars;
  bundle.lastUploadMs = 0;
  const { w, h } = { w: bundle.canvas.width, h: bundle.canvas.height };
  bundle.ctx.fillStyle = "#000";
  bundle.ctx.fillRect(0, 0, w, h);
  bundle.bufferCtx.fillStyle = "#000";
  bundle.bufferCtx.fillRect(0, 0, w, h);
}

function starScreenPos(
  star: ThroughTheStarsStar,
  cxN: number,
  cyN: number,
  w: number,
  h: number,
  fov: number,
  depthParam: number,
): { x: number; y: number; fade: number; pointScale: number } {
  const z = star.z;
  const fadeInEnd = mix(0.2, 0.52, depthParam);
  const fadeIn = smoothstep(0, fadeInEnd, z);
  const fadeOut = 1 - smoothstep(0.86, 1, z);
  const fade = fadeIn * fadeOut;

  const dx = star.u - cxN;
  const dy = star.v - cyN;
  const stretch = 1 + z * z * mix(0.35, 1.65, fov);
  const x = (cxN + dx * stretch) * w;
  const y = (cyN + dy * stretch) * h;
  const pointScale = mix(0.18, 0.62, z) * mix(0.8, 1.05, depthParam);

  return { x, y, fade, pointScale };
}

export function drawThroughTheStarsFrame(
  bundle: ThroughTheStarsBundle,
  opts: ThroughTheStarsDrawOpts,
  aspect: number,
): void {
  const trail = effectiveThroughTheStarsTrail(
    opts.trail,
    opts.amount ?? 0.78,
  );
  const trailN = trail / 1.5;
  const speed = clamp(opts.speed, 0, 8, 1);
  const glow = clamp(opts.glow, 0, 1, 0.72);
  const fov = clamp(opts.fov, 0.25, 2, 1);
  const depthParam = clamp(opts.depth, 0, 1, 0.65);
  const density = clamp(opts.density, 12, 220, 52);
  const cxN = clamp(opts.centerX, 0, 1, 0.5);
  const cyN = clamp(opts.centerY, 0, 1, 0.5);
  const dt = Math.max(0.001, Math.min(0.05, opts.dt));
  const [tr, tg, tb] = opts.tint;

  syncThroughTheStarsDensity(bundle, density);

  const { w, h } = ensureCanvasSize(bundle, aspect, opts.pixelWidth, opts.pixelHeight);
  const resScale = w / THROUGH_STARS_REF_WIDTH;
  const cx = cxN * w;
  const cy = cyN * h;
  const amount = clamp(opts.amount ?? 0.78, 0, 1, 0.78);
  const approach = dt * speed * mix(0.2, 0.72, depthParam) * mix(0.88, 1.28, amount);
  const zoom =
    1 + (0.0006 + speed * 0.0042) * trailN * mix(0.45, 2.6, depthParam);
  const fadeAlpha =
    trailN < 0.007 ? 1 : 1 - trailN * mix(0.018, 0.075, 1 - trailN * 0.45);
  const persistAlpha = trailN < 0.007 ? 0 : trailN * mix(0.72, 0.99, glow);

  const { ctx, bufferCtx, buffer, canvas } = bundle;

  bufferCtx.setTransform(1, 0, 0, 1, 0, 0);
  bufferCtx.globalCompositeOperation = "source-over";
  bufferCtx.globalAlpha = 1;
  bufferCtx.fillStyle = `rgba(0,0,0,${fadeAlpha.toFixed(4)})`;
  bufferCtx.fillRect(0, 0, w, h);

  if (trailN > 0.007 && persistAlpha > 0.01) {
    bufferCtx.save();
    bufferCtx.globalAlpha = persistAlpha;
    bufferCtx.translate(cx, cy);
    bufferCtx.scale(zoom, zoom);
    bufferCtx.translate(-cx, -cy);
    bufferCtx.drawImage(canvas, 0, 0, w, h);
    bufferCtx.restore();
  }

  const useLines = trailN > 0.03;
  const coreAlpha = mix(0.75, 1, glow);
  const lineW =
    mix(0.55, 1.85, trailN) * mix(0.75, 1.15, glow) * mix(1, 1.35, speed / 8) * resScale;
  const sizeScale = 0.52;

  for (let i = 0; i < bundle.stars.length; i++) {
    const star = bundle.stars[i]!;
    star.z += approach * mix(0.85, 1.15, star.size);

    if (star.z >= 1) {
      Object.assign(star, spawnStarSurface());
    }

    const { x, y, fade, pointScale } = starScreenPos(star, cxN, cyN, w, h, fov, depthParam);
    const alpha = star.brightness * coreAlpha * fade;
    if (alpha < 0.004) continue;

    if (useLines && star.px > -9000 && fade > 0.08) {
      bufferCtx.strokeStyle = `rgba(${tr},${tg},${tb},${(alpha * mix(0.3, 0.88, trailN) * glow).toFixed(3)})`;
      bufferCtx.lineWidth = lineW * star.size * pointScale * sizeScale;
      bufferCtx.lineCap = "round";
      bufferCtx.beginPath();
      bufferCtx.moveTo(star.px, star.py);
      bufferCtx.lineTo(x, y);
      bufferCtx.stroke();
    }

    const pointR =
      mix(0.22, 0.62, star.size) * pointScale * mix(0.82, 1.02, glow) * resScale * sizeScale;

    if (glow > 0.08 && fade > 0.08) {
      bufferCtx.fillStyle = `rgba(${tr},${tg},${tb},${(alpha * glow * 0.62).toFixed(3)})`;
      bufferCtx.beginPath();
      bufferCtx.arc(x, y, pointR * mix(2.8, 5.5, glow), 0, Math.PI * 2);
      bufferCtx.fill();
    }

    bufferCtx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
    bufferCtx.beginPath();
    bufferCtx.arc(x, y, pointR, 0, Math.PI * 2);
    bufferCtx.fill();

    star.px = x;
    star.py = y;
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
  ctx.drawImage(buffer, 0, 0, w, h);
  bundle.lastUploadMs = 0;
}

export function throughTheStarsDrawFromParams(
  params: Record<string, unknown> | undefined,
  dt: number,
): ThroughTheStarsDrawOpts {
  return {
    density: clamp(Number(params?.density ?? 56), 12, 220, 56),
    speed: clamp(Number(params?.speed ?? 1.15), 0, 8, 1.15),
    trail: clamp(Number(params?.trail ?? 0.48), 0, 1.5, 0.48),
    glow: clamp(Number(params?.glow ?? 0.74), 0, 1, 0.74),
    fov: clamp(Number(params?.fov ?? 1.05), 0.25, 2, 1.05),
    depth: clamp(Number(params?.depth ?? 0.65), 0, 1, 0.65),
    centerX: clamp(Number(params?.centerX ?? 0.5), 0, 1, 0.5),
    centerY: clamp(Number(params?.centerY ?? 0.5), 0, 1, 0.5),
    tint: parseStarsTint(params?.tint),
    dt,
  };
}

export function syncThroughTheStarsTexture(
  s3: ThroughTheStarsTexSource | undefined,
  bundle: ThroughTheStarsBundle,
  opts: ThroughTheStarsDrawOpts,
  aspect: number,
  now: number,
  minUploadMs = 0,
): boolean {
  if (!s3?.tex) return false;
  if (now - bundle.lastUploadMs < minUploadMs) return false;
  drawThroughTheStarsFrame(bundle, opts, aspect);
  const tex = s3.tex;
  if (tex.width !== bundle.canvas.width || tex.height !== bundle.canvas.height) {
    tex.resize?.(bundle.canvas.width, bundle.canvas.height);
  }
  tex.subimage(bundle.canvas);
  bundle.lastUploadMs = now;
  return true;
}
