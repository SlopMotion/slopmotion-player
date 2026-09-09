/** Triggered horizontal / vertical neon lines with intersection flares. */

export const NEON_GRID_MAX_EDGE = 512;
export const NEON_GRID_MAX_LINES = 96;

export type NeonGridLine = {
  axis: "h" | "v";
  pos: number;
  life: number;
  width: number;
};

export type NeonGridBundle = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  lines: NeonGridLine[];
  lastUploadMs: number;
};

export type NeonGridSpawnOpts = {
  spawn: number;
  horizontal: number;
  vertical: number;
  thickness: number;
};

export type NeonGridDrawOpts = {
  decay: number;
  thickness: number;
  intersect: number;
  dt: number;
  colors: NeonGridColors;
};

export type RgbTriplet = readonly [number, number, number];

export type NeonGridColors = {
  horizontal: RgbTriplet;
  vertical: RgbTriplet;
  cross: RgbTriplet;
};

const DEFAULT_HORIZONTAL: RgbTriplet = [255, 60, 180];
const DEFAULT_VERTICAL: RgbTriplet = [80, 220, 255];
const DEFAULT_CROSS: RgbTriplet = [255, 255, 255];

export type NeonGridTexSource = {
  tex?: {
    width?: number;
    height?: number;
    resize?: (width: number, height: number) => void;
    subimage: (img: CanvasImageSource) => void;
  };
};

function clampParam(v: number, min: number, max: number, fallback: number): number {
  return Number.isFinite(v) ? Math.max(min, Math.min(max, v)) : fallback;
}

/** Legacy point-cloud presets used px thickness (e.g. 2); line mode expects 0.005–0.35. */
export function resolveNeonGridThickness(raw: unknown): number {
  const v = Number(raw);
  if (!Number.isFinite(v)) return 0.08;
  if (v > 1) return clampParam(v / 24, 0.005, 0.35, 0.08);
  return clampParam(v, 0.005, 0.35, 0.08);
}

export function parseHexRgb(hex: unknown, fallback: RgbTriplet): RgbTriplet {
  if (typeof hex !== "string" || !/^#[0-9a-fA-F]{6}$/.test(hex)) return fallback;
  const n = Number.parseInt(hex.slice(1), 16);
  if (!Number.isFinite(n)) return fallback;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function neonGridColorsFromParams(
  params: Record<string, unknown> | undefined,
): NeonGridColors {
  return {
    horizontal: parseHexRgb(params?.horizontalColor, DEFAULT_HORIZONTAL),
    vertical: parseHexRgb(params?.verticalColor, DEFAULT_VERTICAL),
    cross: parseHexRgb(params?.crossColor, DEFAULT_CROSS),
  };
}

export function neonGridDrawFromParams(
  params: Record<string, unknown> | undefined,
): Omit<NeonGridDrawOpts, "colors" | "dt"> {
  return {
    decay: Number(params?.decay ?? 1.25),
    thickness: resolveNeonGridThickness(params?.thickness),
    intersect: clampParam(Number(params?.intersect ?? params?.defocus), 0, 3, 1.6),
  };
}

export function createNeonGridBundle(): NeonGridBundle {
  const canvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 180;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2d canvas unavailable");
  return { canvas, ctx, lines: [], lastUploadMs: 0 };
}

function ensureCanvasSize(bundle: NeonGridBundle, aspect: number): void {
  const safeAspect = Number.isFinite(aspect) && aspect > 0.05 ? aspect : 16 / 9;
  let w = NEON_GRID_MAX_EDGE;
  let h = Math.round(w / safeAspect);
  if (h > NEON_GRID_MAX_EDGE) {
    h = NEON_GRID_MAX_EDGE;
    w = Math.round(h * safeAspect);
  }
  w = Math.max(160, w);
  h = Math.max(90, h);
  if (bundle.canvas.width !== w || bundle.canvas.height !== h) {
    bundle.canvas.width = w;
    bundle.canvas.height = h;
  }
}

function pickOrientation(hWeight: number, vWeight: number): "h" | "v" {
  const hW = Math.max(0, hWeight);
  const vW = Math.max(0, vWeight);
  const total = hW + vW;
  if (total <= 0) return Math.random() < 0.5 ? "h" : "v";
  return Math.random() < hW / total ? "h" : "v";
}

export function spawnNeonGridLines(bundle: NeonGridBundle, opts: NeonGridSpawnOpts): void {
  const count = Math.max(0, Math.min(16, Math.round(opts.spawn)));
  if (count <= 0) return;

  const hWeight = Math.max(0, opts.horizontal);
  const vWeight = Math.max(0, opts.vertical);
  const thickness = resolveNeonGridThickness(opts.thickness);

  for (let i = 0; i < count; i++) {
    if (bundle.lines.length >= NEON_GRID_MAX_LINES) {
      bundle.lines.shift();
    }
    const axis = pickOrientation(hWeight, vWeight);
    bundle.lines.push({
      axis,
      pos: 0.04 + Math.random() * 0.92,
      life: 1,
      width: thickness * (0.65 + Math.random() * 0.7),
    });
  }
  bundle.lastUploadMs = 0;
}

export function neonGridSpawnFromParams(
  params: Record<string, unknown> | undefined,
): NeonGridSpawnOpts {
  return {
      spawn: Number(params?.spawn ?? 4),
    horizontal: Number(params?.horizontal ?? 1),
    vertical: Number(params?.vertical ?? 1),
    thickness: resolveNeonGridThickness(params?.thickness),
  };
}

export function stepNeonGridLines(bundle: NeonGridBundle, dt: number, decayPerSec: number): void {
  const fade = Math.max(0.5, decayPerSec) * Math.max(0, dt);
  const next: NeonGridLine[] = [];
  for (let i = 0; i < bundle.lines.length; i++) {
    const line = bundle.lines[i]!;
    const life = line.life - fade;
    if (life > 0.008) next.push({ ...line, life });
  }
  bundle.lines = next;
}

function rgba([r, g, b]: RgbTriplet, alpha: number): string {
  return `rgba(${r},${g},${b},${alpha})`;
}

function coreStroke(color: RgbTriplet, alpha: number): string {
  const mix = 0.35;
  const r = Math.round(color[0] * (1 - mix) + 255 * mix);
  const g = Math.round(color[1] * (1 - mix) + 255 * mix);
  const b = Math.round(color[2] * (1 - mix) + 255 * mix);
  return `rgba(${r},${g},${b},${alpha})`;
}

function glowLayersForThickness(lineW: number): { scale: number; alpha: number }[] {
  const halo = Math.pow(Math.max(0.004, lineW) / 0.08, 0.55);
  return [
    { scale: 0.35 + 5.15 * halo, alpha: 0.08 },
    { scale: 0.3 + 2.9 * halo, alpha: 0.14 },
    { scale: 0.25 + 1.55 * halo, alpha: 0.28 },
    { scale: 0.2 + 0.8 * halo, alpha: 0.72 },
    { scale: 0.15 + 0.2 * halo, alpha: 0.95 },
  ];
}

function drawGlowLine(
  ctx: CanvasRenderingContext2D,
  axis: "h" | "v",
  pos: number,
  w: number,
  h: number,
  lineW: number,
  life: number,
  color: RgbTriplet,
): void {
  const core = lineW * Math.min(w, h);
  const layers = glowLayersForThickness(lineW);

  ctx.lineCap = "round";
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i]!;
    ctx.strokeStyle =
      i === layers.length - 1 ? coreStroke(color, layer.alpha * life) : rgba(color, layer.alpha * life);
    ctx.lineWidth = Math.max(0.25, core * layer.scale);
    ctx.beginPath();
    if (axis === "h") {
      const y = pos * h;
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    } else {
      const x = pos * w;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    ctx.stroke();
  }
}

function drawIntersectionFlare(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  strength: number,
  arm: number,
  color: RgbTriplet,
): void {
  const s = Math.max(0, strength);
  if (s < 0.04) return;

  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.lineCap = "round";

  const rings = [
    { r: arm * 2.8, alpha: 0.12 },
    { r: arm * 1.6, alpha: 0.22 },
    { r: arm * 0.75, alpha: 0.55 },
  ];
  for (let i = 0; i < rings.length; i++) {
    const ring = rings[i]!;
    ctx.fillStyle = rgba(color, ring.alpha * s);
    ctx.beginPath();
    ctx.arc(x, y, ring.r, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = rgba(color, 0.85 * s);
  ctx.lineWidth = Math.max(1, arm * 0.35);
  ctx.beginPath();
  ctx.moveTo(x - arm * 3.2, y);
  ctx.lineTo(x + arm * 3.2, y);
  ctx.moveTo(x, y - arm * 3.2);
  ctx.lineTo(x, y + arm * 3.2);
  ctx.stroke();

  ctx.fillStyle = rgba(color, s);
  ctx.beginPath();
  ctx.arc(x, y, arm * 0.28, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function drawNeonGridLines(
  bundle: NeonGridBundle,
  opts: NeonGridDrawOpts,
  aspect: number,
): void {
  ensureCanvasSize(bundle, aspect);
  const { ctx, canvas, lines } = bundle;
  const w = canvas.width;
  const h = canvas.height;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.fillRect(0, 0, w, h);

  if (lines.length === 0) return;

  const thickness = resolveNeonGridThickness(opts.thickness);
  const intersectBoost = Math.max(0, Math.min(3, opts.intersect));
  const { horizontal, vertical, cross } = opts.colors;

  ctx.globalCompositeOperation = "lighter";
  const horiz = lines.filter((l) => l.axis === "h");
  const vert = lines.filter((l) => l.axis === "v");

  for (let i = 0; i < horiz.length; i++) {
    const line = horiz[i]!;
    drawGlowLine(ctx, "h", line.pos, w, h, line.width || thickness, line.life, horizontal);
  }
  for (let i = 0; i < vert.length; i++) {
    const line = vert[i]!;
    drawGlowLine(ctx, "v", line.pos, w, h, line.width || thickness, line.life, vertical);
  }

  if (intersectBoost > 0.01 && horiz.length > 0 && vert.length > 0) {
    const arm = Math.min(w, h) * thickness * 0.55;
    for (let hi = 0; hi < horiz.length; hi++) {
      const hLine = horiz[hi]!;
      const y = hLine.pos * h;
      for (let vi = 0; vi < vert.length; vi++) {
        const vLine = vert[vi]!;
        const x = vLine.pos * w;
        const strength = Math.min(1, hLine.life * vLine.life * intersectBoost);
        drawIntersectionFlare(ctx, x, y, strength, arm, cross);
      }
    }
  }
}

export function syncNeonGridTexture(
  source: NeonGridTexSource | undefined,
  bundle: NeonGridBundle | null,
  drawOpts: NeonGridDrawOpts,
  aspect: number,
  now: number,
  minIntervalMs = 12,
): boolean {
  if (!source?.tex || !bundle) return false;
  const minGap = bundle.lines.length > 0 ? 0 : minIntervalMs;
  if (bundle.lastUploadMs > 0 && now - bundle.lastUploadMs < minGap) return false;

  drawNeonGridLines(bundle, drawOpts, aspect);
  const tex = source.tex;
  if (typeof tex.resize === "function") {
    if (tex.width !== bundle.canvas.width || tex.height !== bundle.canvas.height) {
      tex.resize(bundle.canvas.width, bundle.canvas.height);
    }
  }
  try {
    tex.subimage(bundle.canvas);
  } catch {
    return false;
  }
  bundle.lastUploadMs = now;
  return true;
}
