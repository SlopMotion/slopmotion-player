import { parseHexRgb, type RgbTriplet } from "./neonGridLines";
import type { AudioBands } from "../hooks/useAudioAnalyzer";
import type { FXConfig } from "../types/settings";
import { computeParamValue } from "./fxRuntime";

export const TEXT_LAYER_TEX_WIDTH = 960;
export const TEXT_LAYER_TEX_HEIGHT = 540;

const FONT_STACKS = [
  'system-ui, -apple-system, "Segoe UI", sans-serif',
  'ui-monospace, "SF Mono", "Cascadia Code", monospace',
  'Impact, "Arial Narrow", Haettenschweiler, sans-serif',
  'Georgia, "Times New Roman", serif',
  '"Segoe UI Variable", "Segoe UI", "Trebuchet MS", sans-serif',
] as const;

export type TextLayerBundle = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  lastUploadMs: number;
};

export type TextLayerAnimState = {
  animStartMs: number;
  lastMessage: string;
  lastAnim: number;
  glitchPhase: number;
};

export function createTextLayerAnimState(): TextLayerAnimState {
  return { animStartMs: 0, lastMessage: "", lastAnim: -1, glitchPhase: 0 };
}

export function createTextLayerBundle(): TextLayerBundle {
  const canvas = document.createElement("canvas");
  canvas.width = TEXT_LAYER_TEX_WIDTH;
  canvas.height = TEXT_LAYER_TEX_HEIGHT;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2d canvas unavailable");
  return { canvas, ctx, lastUploadMs: 0 };
}

export type TextLayerDrawOpts = {
  message: string;
  size: number;
  positionX: number;
  positionY: number;
  align: number;
  font: number;
  weight: number;
  tracking: number;
  color: RgbTriplet;
  glow: number;
  shadow: number;
  anim: number;
  animSpeed: number;
  amount: number;
  nowMs: number;
  animStartMs: number;
};

function easeOutCubic(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - x, 3);
}

function animProgress(opts: TextLayerDrawOpts): number {
  const speed = Math.max(0.15, opts.animSpeed);
  const anim = Math.round(opts.anim);
  if (anim === 0) return 1;
  if (anim === 4) return 1;
  const dur = anim === 3 ? 2200 / speed : 900 / speed;
  return easeOutCubic((opts.nowMs - opts.animStartMs) / dur);
}

function pulseFactor(opts: TextLayerDrawOpts): number {
  const speed = Math.max(0.15, opts.animSpeed);
  const t = opts.nowMs * 0.001 * speed * 3.2;
  return 0.72 + 0.28 * Math.sin(t);
}

function glitchOffset(opts: TextLayerDrawOpts, lineIndex: number): number {
  const speed = Math.max(0.15, opts.animSpeed);
  const seed = Math.sin(opts.nowMs * 0.017 * speed + lineIndex * 4.7 + opts.animStartMs * 0.003);
  return seed > 0.55 ? (seed - 0.55) * 48 : 0;
}

function glitchFlicker(opts: TextLayerDrawOpts): number {
  const speed = Math.max(0.15, opts.animSpeed);
  const flick = Math.sin(opts.nowMs * 0.031 * speed + opts.animStartMs * 0.01);
  return flick > 0.2 ? 1 : 0.35 + 0.25 * Math.max(0, flick);
}

function rgba([r, g, b]: RgbTriplet, a: number): string {
  return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, a))})`;
}

export function textLayerParamsFromFx(params: Record<string, unknown> | undefined) {
  const rawMsg = params?.message;
  const message = typeof rawMsg === "string" && rawMsg.trim() ? rawMsg : "YOUR MESSAGE";
  return {
    message,
    size: Number(params?.size ?? 0.085),
    positionX: Number(params?.positionX ?? 0.5),
    positionY: Number(params?.positionY ?? 0.82),
    align: Math.round(Number(params?.align ?? 1)),
    font: Math.round(Number(params?.font ?? 0)),
    weight: Math.round(Number(params?.weight ?? 1)),
    tracking: Number(params?.tracking ?? 0.02),
    color: parseHexRgb(params?.color, [255, 255, 255]),
    glow: Number(params?.glow ?? 0.35),
    shadow: Number(params?.shadow ?? 0.5),
    anim: Math.round(Number(params?.anim ?? 0)),
    animSpeed: Number(params?.animSpeed ?? 0.85),
  };
}

/** Resolve modulated numeric params for canvas draw + shader (matrix sweep). */
export function textLayerDrawFromFx(
  fxCfg: FXConfig | undefined,
  bands: (AudioBands & Record<string, number>) | undefined,
) {
  const parsed = textLayerParamsFromFx(fxCfg?.params);
  return {
    ...parsed,
    size: computeParamValue("textLayer", fxCfg, "size", 0.085, bands),
    positionX: computeParamValue("textLayer", fxCfg, "positionX", 0.5, bands),
    positionY: computeParamValue("textLayer", fxCfg, "positionY", 0.82, bands),
    tracking: computeParamValue("textLayer", fxCfg, "tracking", 0.02, bands),
    glow: computeParamValue("textLayer", fxCfg, "glow", 0.35, bands),
    shadow: computeParamValue("textLayer", fxCfg, "shadow", 0.5, bands),
    animSpeed: computeParamValue("textLayer", fxCfg, "animSpeed", 0.85, bands),
  };
}

export function drawTextLayerOverlay(bundle: TextLayerBundle, opts: TextLayerDrawOpts): void {
  const amount = Math.max(0, Math.min(1, opts.amount));
  if (amount < 0.004) return;

  const { ctx, canvas } = bundle;
  const w = canvas.width;
  const h = canvas.height;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, w, h);

  const parsed = textLayerParamsFromFx({
    message: opts.message,
    size: opts.size,
    positionX: opts.positionX,
    positionY: opts.positionY,
    align: opts.align,
    font: opts.font,
    weight: opts.weight,
    tracking: opts.tracking,
    color: `rgb(${opts.color.join(",")})`,
    glow: opts.glow,
    shadow: opts.shadow,
    anim: opts.anim,
    animSpeed: opts.animSpeed,
  });

  const anim = parsed.anim;
  const progress = animProgress({ ...opts, ...parsed });
  let alpha = amount;
  let risePx = 0;
  let scale = 1;
  let reveal = parsed.message;

  if (anim === 1) {
    alpha *= progress;
  } else if (anim === 2) {
    alpha *= progress;
    risePx = (1 - progress) * h * 0.06;
  } else if (anim === 3) {
    const chars = Math.floor(progress * parsed.message.length);
    reveal = parsed.message.slice(0, Math.max(0, chars));
    alpha *= Math.max(0.35, progress);
  } else if (anim === 4) {
    scale = pulseFactor({ ...opts, ...parsed });
    alpha *= 0.85 + 0.15 * scale;
  } else if (anim === 5) {
    alpha *= glitchFlicker({ ...opts, ...parsed });
  }

  if (alpha < 0.01 || !reveal.trim()) return;

  const fontIdx = Math.max(0, Math.min(FONT_STACKS.length - 1, parsed.font));
  const fontPx = Math.max(14, Math.min(h * 0.28, parsed.size * h));
  const fontWeight = parsed.weight >= 1 ? "700" : "500";
  ctx.font = `${fontWeight} ${fontPx}px ${FONT_STACKS[fontIdx]}`;
  ctx.textBaseline = "middle";

  const alignIdx = Math.max(0, Math.min(2, parsed.align));
  const alignMap = ["left", "center", "right"] as const;
  ctx.textAlign = alignMap[alignIdx]!;

  const lines = reveal.split("\n");
  const lineHeight = fontPx * 1.22;
  const blockHeight = lineHeight * lines.length;
  const anchorX = parsed.positionX * w;
  const anchorY = parsed.positionY * h - blockHeight * 0.5 + lineHeight * 0.5 + risePx;

  const trackingPx = parsed.tracking * fontPx;
  if ("letterSpacing" in ctx) {
    (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${trackingPx}px`;
  }

  const drawLine = (text: string, x: number, y: number, lineIndex: number) => {
    let dx = 0;
    if (anim === 5) dx = glitchOffset({ ...opts, ...parsed }, lineIndex);

    if (parsed.shadow > 0.02) {
      ctx.save();
      ctx.globalAlpha = alpha * parsed.shadow * 0.85;
      ctx.fillStyle = "rgba(0,0,0,0.92)";
      ctx.shadowColor = "rgba(0,0,0,0.75)";
      ctx.shadowBlur = fontPx * 0.12;
      ctx.shadowOffsetX = fontPx * 0.03;
      ctx.shadowOffsetY = fontPx * 0.04;
      ctx.fillText(text, x + dx, y);
      ctx.restore();
    }

    if (parsed.glow > 0.02) {
      ctx.save();
      ctx.globalAlpha = alpha * parsed.glow * 0.55;
      ctx.fillStyle = rgba(parsed.color, 1);
      ctx.shadowColor = rgba(parsed.color, 0.95);
      ctx.shadowBlur = fontPx * (0.18 + parsed.glow * 0.42);
      ctx.fillText(text, x + dx, y);
      ctx.restore();
    }

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = rgba(parsed.color, 1);
    if (anim === 4) {
      ctx.translate(x + dx, y);
      ctx.scale(scale, scale);
      ctx.fillText(text, 0, 0);
    } else {
      ctx.fillText(text, x + dx, y);
    }
    ctx.restore();
  };

  for (let i = 0; i < lines.length; i++) {
    drawLine(lines[i]!, anchorX, anchorY + i * lineHeight, i);
  }
}

export type TextLayerTexSource = {
  tex?: {
    width?: number;
    height?: number;
    resize?: (width: number, height: number) => void;
    subimage: (img: CanvasImageSource) => void;
  };
};

export function syncTextLayerTexture(
  source: TextLayerTexSource | undefined,
  bundle: TextLayerBundle | null,
  drawOpts: TextLayerDrawOpts,
  now: number,
  minIntervalMs = 16,
): boolean {
  if (!source?.tex || !bundle) return false;
  if (bundle.lastUploadMs > 0 && now - bundle.lastUploadMs < minIntervalMs) return false;

  drawTextLayerOverlay(bundle, drawOpts);
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
