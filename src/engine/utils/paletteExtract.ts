/**
 * Extracts a small dominant-colour palette from the live video frame.
 *
 * Clustering runs in Oklab so "close colours" match perception rather than raw
 * RGB distance, and the result is sorted by lightness so entry 0 is always the
 * darkest. That ordering plus temporal smoothing is what stops the palette from
 * popping between frames as clusters swap places.
 *
 * Sampling is throttled internally, so this is safe to call from a per-frame
 * Hydra uniform getter.
 */

const SAMPLE_EDGE = 24;
const REFRESH_MS = 120;
const SMOOTHING = 0.18;
const KMEANS_ITERATIONS = 6;
export const PALETTE_MAX_COLORS = 4;

export type OklabColor = { L: number; a: number; b: number };

export function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

export function linearToSrgb(c: number): number {
  const v = c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  return Math.min(1, Math.max(0, v));
}

export function rgbToOklab(r: number, g: number, b: number): OklabColor {
  const lr = srgbToLinear(r);
  const lg = srgbToLinear(g);
  const lb = srgbToLinear(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}

export function oklabToRgb(col: OklabColor): [number, number, number] {
  const l = (col.L + 0.3963377774 * col.a + 0.2158037573 * col.b) ** 3;
  const m = (col.L - 0.1055613458 * col.a - 0.0638541728 * col.b) ** 3;
  const s = (col.L - 0.0894841775 * col.a - 1.291485548 * col.b) ** 3;
  return [
    linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ];
}

/**
 * Lightness-seeded k-means. Seeding across the lightness range (rather than
 * randomly) keeps cluster identity stable from frame to frame.
 */
export function clusterOklab(samples: OklabColor[], count: number): OklabColor[] {
  const k = Math.max(2, Math.min(PALETTE_MAX_COLORS, Math.round(count)));
  if (samples.length === 0) {
    return Array.from({ length: k }, (_, i) => ({ L: i / (k - 1), a: 0, b: 0 }));
  }

  let minL = Infinity;
  let maxL = -Infinity;
  for (const s of samples) {
    if (s.L < minL) minL = s.L;
    if (s.L > maxL) maxL = s.L;
  }
  const span = Math.max(0.001, maxL - minL);
  const centroids: OklabColor[] = Array.from({ length: k }, (_, i) => ({
    L: minL + (span * i) / (k - 1),
    a: 0,
    b: 0,
  }));

  const sumL = new Float64Array(k);
  const sumA = new Float64Array(k);
  const sumB = new Float64Array(k);
  const counts = new Int32Array(k);

  for (let iter = 0; iter < KMEANS_ITERATIONS; iter++) {
    sumL.fill(0);
    sumA.fill(0);
    sumB.fill(0);
    counts.fill(0);

    for (const s of samples) {
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < k; i++) {
        const c = centroids[i]!;
        const dL = s.L - c.L;
        const da = s.a - c.a;
        const db = s.b - c.b;
        const dist = dL * dL + da * da + db * db;
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      }
      sumL[best]! += s.L;
      sumA[best]! += s.a;
      sumB[best]! += s.b;
      counts[best]! += 1;
    }

    for (let i = 0; i < k; i++) {
      const n = counts[i]!;
      if (n === 0) continue;
      centroids[i] = { L: sumL[i]! / n, a: sumA[i]! / n, b: sumB[i]! / n };
    }
  }

  return centroids.toSorted((x, y) => x.L - y.L);
}

/** Below this Oklab chroma a cluster carries no usable hue to amplify. */
const COLORLESS_CHROMA = 0.02;

/**
 * Pushes chroma outward so an auto-extracted palette reads as a deliberate one.
 *
 * Greyscale footage has no chroma to amplify, which would leave the whole effect
 * a no-op, so colourless clusters instead get a hue spread around the wheel by
 * slot. Lightness always stays as extracted — only the hue is invented, and only
 * when the frame supplies none.
 */
export function boostChroma(
  col: OklabColor,
  boost: number,
  index = 0,
  total = 1,
): OklabColor {
  const amount = Math.max(0, Math.min(1, boost));
  const chroma = Math.hypot(col.a, col.b);
  if (chroma >= COLORLESS_CHROMA) {
    const gain = 1 + amount * 1.6;
    return { L: col.L, a: col.a * gain, b: col.b * gain };
  }
  const hue = (index / Math.max(1, total)) * Math.PI * 2 + 0.6;
  const reach = amount * 0.11;
  return { L: col.L, a: Math.cos(hue) * reach, b: Math.sin(hue) * reach };
}

type PaletteState = {
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  rgb: Float32Array;
  lastMs: number;
  lastCount: number;
  seeded: boolean;
};

const state: PaletteState = {
  canvas: null,
  ctx: null,
  rgb: new Float32Array(PALETTE_MAX_COLORS * 3),
  lastMs: 0,
  lastCount: 0,
  seeded: false,
};

function ensureContext(): CanvasRenderingContext2D | null {
  if (state.ctx) return state.ctx;
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = SAMPLE_EDGE;
  canvas.height = SAMPLE_EDGE;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  state.canvas = canvas;
  state.ctx = ctx;
  return ctx;
}

function writePalette(colors: OklabColor[], boost: number, immediate: boolean): void {
  const k = colors.length;
  for (let i = 0; i < PALETTE_MAX_COLORS; i++) {
    const slot = Math.min(i, k - 1);
    const src = colors[slot]!;
    const [r, g, b] = oklabToRgb(boostChroma(src, boost, slot, k));
    const o = i * 3;
    if (immediate) {
      state.rgb[o] = r;
      state.rgb[o + 1] = g;
      state.rgb[o + 2] = b;
    } else {
      state.rgb[o]! += (r - state.rgb[o]!) * SMOOTHING;
      state.rgb[o + 1]! += (g - state.rgb[o + 1]!) * SMOOTHING;
      state.rgb[o + 2]! += (b - state.rgb[o + 2]!) * SMOOTHING;
    }
  }
}

/**
 * Current palette as a flat [r,g,b] × 4 array in 0–1 sRGB. Re-samples the video
 * at most every REFRESH_MS; every other call returns the cached values.
 */
export function getFramePalette(
  video: HTMLVideoElement | null | undefined,
  count: number,
  boost: number,
  now: number,
): Float32Array {
  const countChanged = count !== state.lastCount;
  const stale = now - state.lastMs >= REFRESH_MS;
  if (!countChanged && !stale) return state.rgb;

  const ctx = ensureContext();
  if (!ctx || !video || video.readyState < 2 || video.videoWidth < 2) return state.rgb;

  state.lastMs = now;
  state.lastCount = count;
  ctx.drawImage(video, 0, 0, SAMPLE_EDGE, SAMPLE_EDGE);
  const data = ctx.getImageData(0, 0, SAMPLE_EDGE, SAMPLE_EDGE).data;

  const samples: OklabColor[] = [];
  for (let i = 0; i < data.length; i += 4) {
    samples.push(rgbToOklab(data[i]! / 255, data[i + 1]! / 255, data[i + 2]! / 255));
  }

  writePalette(clusterOklab(samples, count), boost, !state.seeded || countChanged);
  state.seeded = true;
  return state.rgb;
}

/** Test seam — drops the cached palette and sampling canvas. */
export function resetFramePalette(): void {
  state.rgb = new Float32Array(PALETTE_MAX_COLORS * 3);
  state.lastMs = 0;
  state.lastCount = 0;
  state.seeded = false;
  state.canvas = null;
  state.ctx = null;
}
