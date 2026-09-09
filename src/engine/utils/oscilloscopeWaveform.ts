import { parseHexRgb, type RgbTriplet } from "./neonGridLines";

/** CRT lines-spectrum trail — each frame prints a beam at the bottom; trail scrolls up and fades. */

export const OSCILLOSCOPE_TEX_WIDTH = 1920;
export const OSCILLOSCOPE_TEX_HEIGHT = 540;
/** Display bins (log-mapped from analyser FFT). */
export const OSCILLOSCOPE_BIN_COUNT = 512;

const DEFAULT_COLOR_LO: RgbTriplet = [28, 60, 255];
const DEFAULT_COLOR_MID: RgbTriplet = [255, 154, 26];
const DEFAULT_COLOR_HI: RgbTriplet = [255, 246, 200];

export type OscilloscopeWaveformBundle = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  /** Scratch for safe same-size scroll blit. */
  scratch: HTMLCanvasElement;
  scratchCtx: CanvasRenderingContext2D;
  /** Smoothed magnitudes 0…1, low→high frequency. */
  bins: Float32Array;
  lastUploadMs: number;
};

export function createOscilloscopeWaveformBundle(): OscilloscopeWaveformBundle {
  const canvas = document.createElement("canvas");
  canvas.width = OSCILLOSCOPE_TEX_WIDTH;
  canvas.height = OSCILLOSCOPE_TEX_HEIGHT;
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) throw new Error("2d canvas unavailable");
  ctx.imageSmoothingEnabled = true;

  const scratch = document.createElement("canvas");
  scratch.width = OSCILLOSCOPE_TEX_WIDTH;
  scratch.height = OSCILLOSCOPE_TEX_HEIGHT;
  const scratchCtx = scratch.getContext("2d", { alpha: true });
  if (!scratchCtx) throw new Error("2d scratch canvas unavailable");
  scratchCtx.imageSmoothingEnabled = true;

  return {
    canvas,
    ctx,
    scratch,
    scratchCtx,
    bins: new Float32Array(OSCILLOSCOPE_BIN_COUNT),
    lastUploadMs: 0,
  };
}

function smoothToward(bins: Float32Array, i: number, target: number, amount = 0.42): void {
  const t = Math.max(0, Math.min(1, target));
  const prev = bins[i]!;
  bins[i] = prev + (t - prev) * amount;
}

/** Mild log so lows stay readable but highs still reach the right edge. */
function freqMap01(t: number): number {
  const x = Math.max(0, Math.min(1, t));
  return (Math.pow(5, x) - 1) / 4;
}

function lerpRgb(a: RgbTriplet, b: RgbTriplet, t: number): RgbTriplet {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

/** 3-stop intensity ramp: mag 0 → lo, 0.5 → mid, 1 → hi. */
export function spectrumIntensityRgb(
  mag: number,
  colorLo: RgbTriplet = DEFAULT_COLOR_LO,
  colorMid: RgbTriplet = DEFAULT_COLOR_MID,
  colorHi: RgbTriplet = DEFAULT_COLOR_HI,
): RgbTriplet {
  const m = Math.max(0, Math.min(1, mag));
  if (m <= 0.5) return lerpRgb(colorLo, colorMid, m * 2);
  return lerpRgb(colorMid, colorHi, (m - 0.5) * 2);
}

export function oscilloscopeColorsFromParams(
  params: Record<string, unknown> | undefined,
): { colorLo: RgbTriplet; colorMid: RgbTriplet; colorHi: RgbTriplet } {
  return {
    colorLo: parseHexRgb(params?.colorLo, DEFAULT_COLOR_LO),
    colorMid: parseHexRgb(params?.colorMid, DEFAULT_COLOR_MID),
    colorHi: parseHexRgb(params?.colorHi, DEFAULT_COLOR_HI),
  };
}

/**
 * Push live analyser frequency data into smoothed display bins.
 * Expects `getByteFrequencyData` bytes (0…255).
 */
export function pushOscilloscopeFromSpectrum(
  bundle: OscilloscopeWaveformBundle,
  spectrum: Uint8Array | Float32Array,
): void {
  const n = spectrum.length;
  if (n < 8) return;
  const out = bundle.bins;
  const outN = out.length;
  // Wide window so the mapped spectrum fills the full width.
  const start = Math.max(1, Math.floor(n * 0.002));
  const end = Math.max(start + 16, Math.floor(n * 0.96));
  const span = end - start;
  const isByte = spectrum instanceof Uint8Array || spectrum.BYTES_PER_ELEMENT === 1;

  let peak = 0;
  for (let i = 0; i < outN; i++) {
    const t = outN <= 1 ? 0 : i / (outN - 1);
    const src = start + freqMap01(t) * span;
    const i0 = Math.min(end - 1, Math.floor(src));
    const i1 = Math.min(end - 1, i0 + 1);
    const f = src - i0;
    let v0 = spectrum[i0] ?? 0;
    let v1 = spectrum[i1] ?? 0;
    if (isByte) {
      v0 /= 255;
      v1 /= 255;
    } else {
      v0 = Math.max(0, Math.min(1, v0));
      v1 = Math.max(0, Math.min(1, v1));
    }
    const raw = v0 + (v1 - v0) * f;
    const shaped = Math.pow(raw, 0.72);
    if (shaped > peak) peak = shaped;
    smoothToward(out, i, shaped, 0.5);
  }

  // Autoscale so the current frame’s spectrum fills 0…1 (recentered dynamic range).
  if (peak > 0.04) {
    const gain = Math.min(2.4, 1 / peak);
    for (let i = 0; i < outN; i++) {
      out[i] = Math.min(1, out[i]! * gain);
    }
  }
}

/** Studio fallback — sculpt a spectrum shape from master peak energy. */
export function pushOscilloscopeFromPeaks(
  bundle: OscilloscopeWaveformBundle,
  peaks: Float32Array,
  durationSec: number,
  timeSec: number,
): void {
  if (!peaks.length || !Number.isFinite(durationSec) || durationSec <= 0) return;
  const t = Math.max(0, Math.min(durationSec, timeSec));
  const idx = Math.floor((t / durationSec) * peaks.length);
  const energy = peaks[Math.max(0, Math.min(peaks.length - 1, idx))] ?? 0.5;
  const out = bundle.bins;
  const outN = out.length;
  const phase = timeSec * 2.4;
  for (let i = 0; i < outN; i++) {
    const u = i / Math.max(1, outN - 1);
    const lobe =
      Math.exp(-Math.pow((u - 0.12) / 0.09, 2)) * 0.85 +
      Math.exp(-Math.pow((u - 0.35) / 0.14, 2)) * 0.55 +
      Math.exp(-Math.pow((u - 0.62) / 0.18, 2)) * 0.35 +
      Math.exp(-Math.pow((u - 0.85) / 0.12, 2)) * 0.22;
    const shimmer = 0.85 + 0.15 * Math.sin(phase + u * 9.0);
    smoothToward(out, i, energy * lobe * shimmer * 1.15, 0.35);
  }
}

/** Idle / no-FFT fallback from trigger bands. */
export function pushOscilloscopeFromBands(
  bundle: OscilloscopeWaveformBundle,
  bands: { kick?: number; low?: number; mid?: number; high?: number; master?: number },
  phase: number,
): void {
  const k = bands.kick ?? 0;
  const lo = bands.low ?? 0;
  const mid = bands.mid ?? 0;
  const hi = bands.high ?? 0;
  const m = bands.master ?? (lo + mid + hi) / 3;
  const out = bundle.bins;
  const outN = out.length;
  for (let i = 0; i < outN; i++) {
    const u = i / Math.max(1, outN - 1);
    const kickLobe = Math.exp(-Math.pow((u - 0.06) / 0.05, 2)) * k;
    const lowLobe = Math.exp(-Math.pow((u - 0.18) / 0.1, 2)) * lo;
    const midLobe = Math.exp(-Math.pow((u - 0.45) / 0.16, 2)) * mid;
    const highLobe = Math.exp(-Math.pow((u - 0.78) / 0.14, 2)) * hi;
    const floor = m * 0.12 * (0.7 + 0.3 * Math.sin(phase * 6.0 + u * 14.0));
    smoothToward(out, i, Math.min(1, kickLobe * 1.1 + lowLobe + midLobe + highLobe + floor), 0.4);
  }
}

function sampleBins(bins: Float32Array, t: number): number {
  const n = bins.length;
  if (n === 0) return 0;
  const x = Math.max(0, Math.min(n - 1, t));
  const i0 = Math.floor(x);
  const i1 = Math.min(n - 1, i0 + 1);
  const f = x - i0;
  const u = f * f * (3 - 2 * f);
  return bins[i0]! + (bins[i1]! - bins[i0]!) * u;
}

/** Stroke the beam in short spans so color follows local spectrum intensity. */
function strokeTraceIntensityColor(
  ctx: CanvasRenderingContext2D,
  xs: Float32Array,
  ys: Float32Array,
  mags: Float32Array,
  count: number,
  width: number,
  colorLo: RgbTriplet,
  colorMid: RgbTriplet,
  colorHi: RgbTriplet,
  alpha = 1,
): void {
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  const step = count > 1400 ? 2 : 1;
  const a = Math.max(0, Math.min(1, alpha));
  for (let i = 0; i < count - step; i += step) {
    const mag = (mags[i]! + mags[i + step]!) * 0.5;
    const [r, g, b] = spectrumIntensityRgb(mag, colorLo, colorMid, colorHi);
    ctx.strokeStyle = `rgba(${r},${g},${b},${a})`;
    ctx.beginPath();
    ctx.moveTo(xs[i]!, ys[i]!);
    ctx.lineTo(xs[i + step]!, ys[i + step]!);
    ctx.stroke();
  }
}

function printSpectrumLine(
  ctx: CanvasRenderingContext2D,
  bins: Float32Array,
  w: number,
  printY: number,
  amp: number,
  mode: number,
  colorLo: RgbTriplet,
  colorMid: RgbTriplet,
  colorHi: RgbTriplet,
): void {
  const nBins = bins.length;
  const xs = new Float32Array(w);
  const ys = new Float32Array(w);
  const mags = new Float32Array(w);
  const denom = Math.max(1, w - 1);
  const lift = mode === 2 ? 1 : mode === 1 ? 0.7 : 0.22;

  for (let i = 0; i < w; i++) {
    const t = (i / denom) * (nBins - 1);
    const mag = Math.max(0, Math.min(1, sampleBins(bins, t)));
    mags[i] = mag;
    xs[i] = i + 0.5;
    ys[i] = printY - mag * amp * lift;
  }

  ctx.globalCompositeOperation = "source-over";

  if (mode >= 1) {
    const [hr, hg, hb] = colorHi;
    ctx.beginPath();
    ctx.moveTo(0, printY);
    for (let i = 0; i < w; i++) ctx.lineTo(xs[i]!, ys[i]!);
    ctx.lineTo(w, printY);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, printY - amp, 0, printY);
    grad.addColorStop(0, `rgba(${hr},${hg},${hb},0.12)`);
    grad.addColorStop(0.7, `rgba(${hr},${hg},${hb},0.04)`);
    grad.addColorStop(1, `rgba(${hr},${hg},${hb},0)`);
    ctx.fillStyle = grad;
    ctx.globalAlpha = 1;
    ctx.fill();
  }

  strokeTraceIntensityColor(
    ctx, xs, ys, mags, w,
    Math.max(2.2, Math.min(4, amp * 0.04)),
    colorLo, colorMid, colorHi, 0.45,
  );
  strokeTraceIntensityColor(
    ctx, xs, ys, mags, w,
    Math.max(1.0, Math.min(1.8, amp * 0.016)),
    colorLo, colorMid, colorHi, 1,
  );

  if (mode === 2) {
    const mirrorYs = new Float32Array(w);
    for (let i = 0; i < w; i++) mirrorYs[i] = printY + (printY - ys[i]!);
    strokeTraceIntensityColor(
      ctx, xs, mirrorYs, mags, w,
      Math.max(0.9, amp * 0.014),
      colorLo, colorMid, colorHi, 0.55,
    );
  }

  ctx.globalAlpha = 1;
  ctx.globalCompositeOperation = "source-over";
}

/**
 * Scroll existing phosphor up, fade, then print the latest spectrum line at the bottom.
 */
export function drawOscilloscopeWaveform(
  bundle: OscilloscopeWaveformBundle,
  opts: {
    persistence: number;
    positionY: number;
    scale: number;
    mode: number;
    colorLo?: RgbTriplet | string;
    colorMid?: RgbTriplet | string;
    colorHi?: RgbTriplet | string;
  },
): void {
  const { ctx, canvas, scratch, scratchCtx, bins } = bundle;
  const w = canvas.width;
  const h = canvas.height;
  const persist = Math.max(0.15, Math.min(0.97, opts.persistence));
  const mode = Math.round(opts.mode);
  const colorLo =
    typeof opts.colorLo === "string"
      ? parseHexRgb(opts.colorLo, DEFAULT_COLOR_LO)
      : (opts.colorLo ?? DEFAULT_COLOR_LO);
  const colorMid =
    typeof opts.colorMid === "string"
      ? parseHexRgb(opts.colorMid, DEFAULT_COLOR_MID)
      : (opts.colorMid ?? DEFAULT_COLOR_MID);
  const colorHi =
    typeof opts.colorHi === "string"
      ? parseHexRgb(opts.colorHi, DEFAULT_COLOR_HI)
      : (opts.colorHi ?? DEFAULT_COLOR_HI);
  const printY = h * Math.max(0.55, Math.min(0.96, opts.positionY));
  const amp = h * Math.max(0.2, Math.min(0.55, opts.scale * 0.85));
  const scrollPx = Math.max(7, Math.round(h * (0.016 + (1 - persist) * 0.014)));

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  scratchCtx.setTransform(1, 0, 0, 1, 0, 0);

  scratchCtx.globalCompositeOperation = "copy";
  scratchCtx.drawImage(canvas, 0, 0);
  scratchCtx.globalCompositeOperation = "source-over";

  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, w, h);

  const trailKeep = 0.82 + persist * 0.16;
  ctx.globalAlpha = trailKeep;
  ctx.drawImage(scratch, 0, -scrollPx);
  ctx.globalAlpha = 1;

  const fadeH = Math.max(16, h * 0.12);
  const topFade = ctx.createLinearGradient(0, 0, 0, fadeH);
  topFade.addColorStop(0, "rgba(0,0,0,0.35)");
  topFade.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = topFade;
  ctx.fillRect(0, 0, w, fadeH);

  printSpectrumLine(ctx, bins, w, printY, amp, mode, colorLo, colorMid, colorHi);
}

export type OscilloscopeTexSource = {
  tex?: {
    width?: number;
    height?: number;
    resize?: (width: number, height: number) => void;
    subimage: (img: CanvasImageSource) => void;
  };
};

export function syncOscilloscopeWaveformTexture(
  source: OscilloscopeTexSource | undefined,
  bundle: OscilloscopeWaveformBundle | null,
  drawOpts: {
    persistence: number;
    positionY: number;
    scale: number;
    mode: number;
    colorLo?: RgbTriplet | string;
    colorMid?: RgbTriplet | string;
    colorHi?: RgbTriplet | string;
  },
  now: number,
  minIntervalMs = 12,
): boolean {
  if (!source?.tex || !bundle) return false;
  if (bundle.lastUploadMs > 0 && now - bundle.lastUploadMs < minIntervalMs) return false;

  drawOscilloscopeWaveform(bundle, drawOpts);
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
