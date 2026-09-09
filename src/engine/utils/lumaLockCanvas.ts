import { parseHexRgb, type RgbTriplet } from "./neonGridLines";

export const LUMA_LOCK_TEX_WIDTH = 1920;
export const LUMA_LOCK_TEX_HEIGHT = 1080;
export const LUMA_LOCK_MAX_EDGE = 2560;
export const LUMA_LOCK_SAMPLE_W = 48;
export const LUMA_LOCK_SAMPLE_H = 27;
export const LUMA_LOCK_MAX_TARGETS = 5;

const DEFAULT_BOX: RgbTriplet = [255, 42, 42];
const DEFAULT_LABEL: RgbTriplet = [255, 176, 32];

export type LumaLockSpot = {
  u: number;
  v: number;
  size: number;
  luma: number;
};

export type LumaLockTrack = {
  id: number;
  u: number;
  v: number;
  size: number;
  luma: number;
  alpha: number;
};

export type LumaLockBundle = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  sampleCanvas: HTMLCanvasElement;
  sampleCtx: CanvasRenderingContext2D;
  luma: Float32Array;
  hasSample: boolean;
  tracks: LumaLockTrack[];
  nextId: number;
  lastUploadMs: number;
  lastSampleMs: number;
};

export type LumaLockTexSource = {
  tex?: {
    width?: number;
    height?: number;
    resize?: (width: number, height: number) => void;
    subimage: (img: CanvasImageSource) => void;
  };
};

export type LumaLockDrawOpts = {
  amount: number;
  count: number;
  threshold: number;
  smooth: number;
  size: number;
  links: number;
  color: RgbTriplet;
  labelColor: RgbTriplet;
  dt: number;
  skipVideoSample: boolean;
  pixelWidth?: number;
  pixelHeight?: number;
};

function clamp(v: number, lo: number, hi: number, fallback: number): number {
  return Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : fallback;
}

export function lumaLockDrawFromParams(
  params: Record<string, unknown> | undefined,
  amount: number,
  dt: number,
): LumaLockDrawOpts {
  return {
    amount: clamp(amount, 0, 1, 0),
    count: Math.round(clamp(Number(params?.count), 1, LUMA_LOCK_MAX_TARGETS, 3)),
    threshold: clamp(Number(params?.threshold), 0, 1, 0.42),
    smooth: clamp(Number(params?.smooth), 0, 1, 0.76),
    size: clamp(Number(params?.size), 0.4, 2.2, 1),
    links: clamp(Number(params?.links), 0, 1, 0.7),
    color: parseHexRgb(params?.color, DEFAULT_BOX),
    labelColor: parseHexRgb(params?.labelColor, DEFAULT_LABEL),
    dt: Number.isFinite(dt) ? Math.max(0.001, Math.min(0.08, dt)) : 1 / 60,
    skipVideoSample: false,
  };
}

export function formatLockCoord(u: number, v: number): string {
  const x = Math.round(clamp(u, 0, 1, 0) * 999);
  const y = Math.round(clamp(v, 0, 1, 0) * 999);
  return `x: ${x} y: ${y}`;
}

export function followAmount(smooth: number, dt: number): number {
  const tau = 0.028 + clamp(smooth, 0, 1, 0.76) * 0.4;
  return 1 - Math.exp(-Math.max(dt, 1 / 240) / tau);
}

export function lumaFromRgba(data: Uint8ClampedArray, width: number, height: number): Float32Array {
  const luma = new Float32Array(width * height);
  for (let i = 0; i < luma.length; i++) {
    const o = i * 4;
    luma[i] = (0.2126 * data[o]! + 0.7152 * data[o + 1]! + 0.0722 * data[o + 2]!) / 255;
  }
  return luma;
}

function cellSize(luma: Float32Array, width: number, height: number, cx: number, cy: number, peak: number): number {
  const floor = Math.max(0.12, peak * 0.55);
  let rx = 0;
  let ry = 0;
  while (cx + rx + 1 < width && luma[cy * width + cx + rx + 1]! >= floor) rx++;
  while (cx - rx - 1 >= 0 && luma[cy * width + cx - rx - 1]! >= floor) rx++;
  while (cy + ry + 1 < height && luma[(cy + ry + 1) * width + cx]! >= floor) ry++;
  while (cy - ry - 1 >= 0 && luma[(cy - ry - 1) * width + cx]! >= floor) ry++;
  const ext = Math.max(rx, ry, 1);
  return clamp((ext * 2 + 1) / Math.max(width, height), 0.045, 0.28, 0.09);
}

export function findBrightPeaks(
  luma: Float32Array,
  width: number,
  height: number,
  count: number,
  threshold: number,
): LumaLockSpot[] {
  const want = Math.round(clamp(count, 1, LUMA_LOCK_MAX_TARGETS, 3));
  const gate = clamp(threshold, 0, 1, 0.42);
  const soft = Math.max(0.08, gate * 0.45);
  const peaks: { i: number; luma: number }[] = [];

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      const v = luma[i]!;
      if (v < soft) continue;
      let localMax = true;
      for (let dy = -1; dy <= 1 && localMax; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          if (luma[(y + dy) * width + (x + dx)]! > v) localMax = false;
        }
      }
      if (localMax) peaks.push({ i, luma: v });
    }
  }

  peaks.sort((a, b) => b.luma - a.luma);
  const minDist = 0.14;
  const picked: LumaLockSpot[] = [];
  for (const peak of peaks) {
    if (picked.length >= want) break;
    const x = peak.i % width;
    const y = Math.floor(peak.i / width);
    const u = (x + 0.5) / width;
    const v = (y + 0.5) / height;
    if (peak.luma < gate && picked.length > 0) continue;
    const tooClose = picked.some((p) => Math.hypot(p.u - u, p.v - v) < minDist);
    if (tooClose) continue;
    picked.push({
      u,
      v,
      size: cellSize(luma, width, height, x, y, peak.luma),
      luma: peak.luma,
    });
  }
  return picked;
}

export const LUMA_LOCK_DEMO_SPOTS: readonly LumaLockSpot[] = [
  { u: 0.42, v: 0.48, size: 0.1, luma: 0.82 },
  { u: 0.61, v: 0.36, size: 0.075, luma: 0.7 },
  { u: 0.52, v: 0.64, size: 0.068, luma: 0.64 },
  { u: 0.28, v: 0.3, size: 0.055, luma: 0.52 },
  { u: 0.74, v: 0.58, size: 0.05, luma: 0.48 },
];

export function advanceLumaLockTracks(
  tracks: LumaLockTrack[],
  spots: readonly LumaLockSpot[],
  count: number,
  smooth: number,
  dt: number,
  idRef: { nextId: number },
): LumaLockTrack[] {
  const want = Math.round(clamp(count, 1, LUMA_LOCK_MAX_TARGETS, 3));
  const k = followAmount(smooth, dt);
  const fadeIn = Math.min(1, dt * 4.2);
  const fadeOut = Math.min(1, dt * 2.4);
  const used = new Set<number>();
  const next: LumaLockTrack[] = [];

  const ranked = tracks.toSorted((a, b) => b.alpha - a.alpha);
  for (const track of ranked) {
    let best = -1;
    let bestDist = 0.22;
    for (let i = 0; i < spots.length; i++) {
      if (used.has(i)) continue;
      const spot = spots[i]!;
      const dist = Math.hypot(track.u - spot.u, track.v - spot.v);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    }
    if (best >= 0) {
      const spot = spots[best]!;
      used.add(best);
      next.push({
        id: track.id,
        u: track.u + (spot.u - track.u) * k,
        v: track.v + (spot.v - track.v) * k,
        size: track.size + (spot.size - track.size) * k,
        luma: track.luma + (spot.luma - track.luma) * k,
        alpha: Math.min(1, track.alpha + fadeIn),
      });
    } else {
      const alpha = Math.max(0, track.alpha - fadeOut);
      if (alpha > 0.02) next.push({ ...track, alpha });
    }
  }

  for (let i = 0; i < spots.length && next.length < want; i++) {
    if (used.has(i)) continue;
    const spot = spots[i]!;
    next.push({
      id: idRef.nextId++,
      u: spot.u,
      v: spot.v,
      size: spot.size,
      luma: spot.luma,
      alpha: fadeIn,
    });
  }

  return next.slice(0, want);
}

export function lumaLockLinkPairs(tracks: readonly LumaLockTrack[]): Array<[LumaLockTrack, LumaLockTrack]> {
  const visible = tracks.filter((track) => track.alpha > 0.02);
  const pairs: Array<[LumaLockTrack, LumaLockTrack]> = [];
  for (let i = 0; i < visible.length; i++) {
    for (let j = i + 1; j < visible.length; j++) {
      pairs.push([visible[i]!, visible[j]!]);
    }
  }
  return pairs;
}

function ensureLumaLockCanvasSize(
  bundle: LumaLockBundle,
  pixelWidth?: number,
  pixelHeight?: number,
): void {
  let w = LUMA_LOCK_TEX_WIDTH;
  let h = LUMA_LOCK_TEX_HEIGHT;
  if (
    pixelWidth !== undefined &&
    pixelHeight !== undefined &&
    pixelWidth >= 640 &&
    pixelHeight >= 360
  ) {
    w = Math.round(pixelWidth);
    h = Math.round(pixelHeight);
    const edge = Math.max(w, h);
    if (edge > LUMA_LOCK_MAX_EDGE) {
      const fit = LUMA_LOCK_MAX_EDGE / edge;
      w = Math.max(640, Math.round(w * fit));
      h = Math.max(360, Math.round(h * fit));
    }
  }
  if (bundle.canvas.width !== w || bundle.canvas.height !== h) {
    bundle.canvas.width = w;
    bundle.canvas.height = h;
  }
}

export function createLumaLockBundle(): LumaLockBundle {
  const canvas = document.createElement("canvas");
  canvas.width = LUMA_LOCK_TEX_WIDTH;
  canvas.height = LUMA_LOCK_TEX_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("2d canvas unavailable");

  const sampleCanvas = document.createElement("canvas");
  sampleCanvas.width = LUMA_LOCK_SAMPLE_W;
  sampleCanvas.height = LUMA_LOCK_SAMPLE_H;
  const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });
  if (!sampleCtx) throw new Error("2d canvas unavailable");

  return {
    canvas,
    ctx,
    sampleCanvas,
    sampleCtx,
    luma: new Float32Array(LUMA_LOCK_SAMPLE_W * LUMA_LOCK_SAMPLE_H),
    hasSample: false,
    tracks: [],
    nextId: 1,
    lastUploadMs: 0,
    lastSampleMs: 0,
  };
}

export function clearLumaLock(bundle: LumaLockBundle): void {
  bundle.tracks.length = 0;
  bundle.hasSample = false;
  bundle.lastUploadMs = 0;
  bundle.lastSampleMs = 0;
  bundle.ctx.setTransform(1, 0, 0, 1, 0, 0);
  bundle.ctx.clearRect(0, 0, bundle.canvas.width, bundle.canvas.height);
}

function refreshLumaSample(
  bundle: LumaLockBundle,
  video: HTMLVideoElement | null | undefined,
  now: number,
  allowSample: boolean,
): void {
  if (!allowSample && bundle.hasSample && now - bundle.lastSampleMs < 50) return;
  if (!video || video.readyState < 2 || video.videoWidth < 2) {
    bundle.hasSample = false;
    return;
  }
  bundle.sampleCtx.drawImage(video, 0, 0, LUMA_LOCK_SAMPLE_W, LUMA_LOCK_SAMPLE_H);
  const data = bundle.sampleCtx.getImageData(0, 0, LUMA_LOCK_SAMPLE_W, LUMA_LOCK_SAMPLE_H).data;
  bundle.luma = lumaFromRgba(data, LUMA_LOCK_SAMPLE_W, LUMA_LOCK_SAMPLE_H);
  bundle.hasSample = true;
  bundle.lastSampleMs = now;
}

function rgba([r, g, b]: RgbTriplet, a: number): string {
  return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, a))})`;
}

export function drawLumaLockOverlay(bundle: LumaLockBundle, opts: LumaLockDrawOpts): void {
  const { ctx, canvas } = bundle;
  const w = canvas.width;
  const h = canvas.height;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const amount = clamp(opts.amount, 0, 1, 0);
  if (amount < 0.004) return;

  const sizeScale = clamp(opts.size, 0.4, 2.2, 1);
  const scale = w / 1920;
  const stroke = Math.max(1.5, 2.2 * scale);
  const fontPx = Math.max(18, Math.round(24 * scale));
  const labelGap = Math.max(4, 6 * scale);
  const links = clamp(opts.links, 0, 1, 0);

  ctx.lineJoin = "miter";
  ctx.lineCap = "round";
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  ctx.font = `600 ${fontPx}px ui-monospace, "SF Mono", "Cascadia Code", monospace`;

  if (links > 0.004) {
    ctx.setLineDash([8 * scale, 6 * scale]);
    ctx.lineWidth = Math.max(1.1, 1.4 * scale);
    for (const [a, b] of lumaLockLinkPairs(bundle.tracks)) {
      const alpha = amount * links * Math.min(a.alpha, b.alpha);
      if (alpha < 0.02) continue;
      ctx.strokeStyle = rgba(opts.color, alpha * 0.82);
      ctx.beginPath();
      ctx.moveTo(a.u * w, a.v * h);
      ctx.lineTo(b.u * w, b.v * h);
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  for (const track of bundle.tracks) {
    const a = amount * track.alpha;
    if (a < 0.02) continue;
    const cx = track.u * w;
    const cy = track.v * h;
    const half = track.size * Math.min(w, h) * sizeScale * 0.5;
    const x = cx - half;
    const y = cy - half;
    const side = half * 2;

    ctx.strokeStyle = rgba(opts.color, a);
    ctx.lineWidth = stroke;
    ctx.strokeRect(x + 0.5, y + 0.5, side, side);

    ctx.fillStyle = rgba(opts.labelColor, a);
    ctx.fillText(formatLockCoord(track.u, track.v), x, y - labelGap);
  }
}

export function syncLumaLockTexture(
  source: LumaLockTexSource | undefined,
  bundle: LumaLockBundle,
  video: HTMLVideoElement | null | undefined,
  opts: LumaLockDrawOpts,
  now: number,
  minIntervalMs = 0,
): boolean {
  if (!source?.tex) return false;
  if (opts.amount <= 0.00001) return false;
  if (bundle.lastUploadMs > 0 && now - bundle.lastUploadMs < minIntervalMs) return false;

  ensureLumaLockCanvasSize(bundle, opts.pixelWidth, opts.pixelHeight);
  refreshLumaSample(bundle, video, now, !opts.skipVideoSample);
  const spots = bundle.hasSample
    ? findBrightPeaks(bundle.luma, LUMA_LOCK_SAMPLE_W, LUMA_LOCK_SAMPLE_H, opts.count, opts.threshold)
    : LUMA_LOCK_DEMO_SPOTS.slice(0, opts.count);

  bundle.tracks = advanceLumaLockTracks(
    bundle.tracks,
    spots,
    opts.count,
    opts.smooth,
    opts.dt,
    bundle,
  );
  drawLumaLockOverlay(bundle, opts);

  const tex = source.tex;
  if (typeof tex.resize === "function") {
    if (tex.width !== bundle.canvas.width || tex.height !== bundle.canvas.height) {
      tex.resize(bundle.canvas.width, bundle.canvas.height);
    }
  }
  tex.subimage(bundle.canvas);
  bundle.lastUploadMs = now;
  return true;
}
