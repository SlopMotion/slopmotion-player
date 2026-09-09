/** Fade-in, spawn drip, and spectral tint helpers for Luma Dust. */

export const LUMA_DUST_SPECTRAL_DEFAULT = 0.52;

export function dustFadeInDuration(burst: number, seed: number): number {
  const haste = clamp01(burst) * 0.22;
  return 0.58 + (1 - haste) * 0.4 + clamp01(seed) * 0.32;
}

export function dustFadeIn(age: number, fadeInSec: number): number {
  if (fadeInSec <= 0.0001) return 1;
  const t = age / fadeInSec;
  if (t >= 1) return 1;
  if (t <= 0) return 0;
  return t * t * (3 - 2 * t);
}

export function dustGrowScale(fadeIn: number): number {
  return 0.22 + clamp01(fadeIn) * 0.78;
}

export function spectralHueRgb(t: number): [number, number, number] {
  const h = ((t % 1) + 1) % 1 * 6;
  const i = Math.floor(h);
  const f = h - i;
  const q = 1 - f;
  switch (i) {
    case 0:
      return [1, f, 0];
    case 1:
      return [q, 1, 0];
    case 2:
      return [0, 1, f];
    case 3:
      return [0, q, 1];
    case 4:
      return [f, 0, 1];
    default:
      return [1, 0, q];
  }
}

export function mixSpectralTint(
  r: number,
  g: number,
  b: number,
  spectral: number,
  hueT: number,
): { r: number; g: number; b: number } {
  const s = clamp01(spectral);
  if (s < 0.008) return { r, g, b };
  const [sr, sg, sb] = spectralHueRgb(hueT);
  const chroma = s * 0.2;
  const nr = r * (1 - chroma) + sr * chroma;
  const ng = g * (1 - chroma) + sg * chroma;
  const nb = b * (1 - chroma) + sb * chroma;
  const srcL = 0.299 * r + 0.587 * g + 0.114 * b;
  const newL = 0.299 * nr + 0.587 * ng + 0.114 * nb;
  if (newL < 1e-5) return { r: nr, g: ng, b: nb };
  const scale = srcL / newL;
  return {
    r: Math.min(1, nr * scale),
    g: Math.min(1, ng * scale),
    b: Math.min(1, nb * scale),
  };
}

export function dustLifeFade(lifeT: number): number {
  if (lifeT >= 0.4) return 1;
  if (lifeT <= 0) return 0;
  return lifeT / 0.4;
}

export function dustEdgeFade(u: number, v: number, margin = 0.09): number {
  const x = Math.min(u, 1 - u);
  const y = Math.min(v, 1 - v);
  const d = Math.min(x, y);
  if (d >= margin) return 1;
  if (d <= 0) return 0;
  const t = d / margin;
  return t * t * (3 - 2 * t);
}

export function dustDetachedLife(turbulence: number): number {
  return 0.7 + clamp01(turbulence) * 0.65;
}

export function dustLumaReleased(now: number, cast: number, stick: number): boolean {
  const hold = 0.05 + clamp01(stick) * 0.2;
  if (!Number.isFinite(now) || now < 0) return true;
  if (Math.abs(now - cast) >= hold) return true;
  return now < cast * (0.6 + clamp01(stick) * 0.22);
}

export function lumaAtUv(luma: Float32Array, u: number, v: number, width: number, height: number): number {
  const x = Math.max(0, Math.min(width - 1, Math.floor(u * width)));
  const y = Math.max(0, Math.min(height - 1, Math.floor(v * height)));
  return luma[y * width + x] ?? 0;
}

export function dustSpectralHueT(u: number, v: number, age: number, phase: number, seed: number): number {
  return seed * 0.9 + u * 0.16 + v * 0.1 + age * 0.08 + phase * 0.00014;
}

export const LUMA_DUST_SPREAD_START = 0.08;
export const LUMA_DUST_SPREAD_MAX = 0.82;

export function dustCenterDist(u: number, v: number): number {
  return Math.hypot(u - 0.5, v - 0.5);
}

export function dustSpreadRadius(prev: number, dt: number, amount: number, burst: number): number {
  const grow = (0.18 + clamp01(amount) * 0.24 + clamp01(burst) * 0.16) * Math.max(0, dt);
  return Math.min(LUMA_DUST_SPREAD_MAX, Math.max(LUMA_DUST_SPREAD_START, prev) + grow);
}

/** Higher = spawn sooner. Outside the growing disk is ineligible unless ignoreRadius. */
export function dustSpawnScore(luma: number, dist: number, radius: number, ignoreRadius = false): number {
  if (!ignoreRadius && dist > radius) return -1;
  const inward = 1 - dist / Math.max(radius, 1e-4);
  return Math.max(0, luma) * (0.42 + inward * 0.58);
}

export const DUST_WHITE_LUMA = 0.86;
export const DUST_WHITE_OFF = 0.8;

export function dustIsWhite(luma: number): boolean {
  return luma >= DUST_WHITE_LUMA;
}

export function dustIsWhiteOnset(now: number, prev: number): boolean {
  return now >= DUST_WHITE_LUMA && prev < DUST_WHITE_OFF;
}

export function dustFlashSpend(onsetCount: number, amount: number, pool: number): number {
  if (onsetCount <= 0 || pool <= 0) return 0;
  const want = Math.round(onsetCount * (3.2 + clamp01(amount) * 3.4));
  return Math.min(pool, Math.max(onsetCount, want));
}

export const DUST_RESERVE_RATIO = 0.16;
export const DUST_HOT_PEAK_RATIO = 0.9;

export function dustBudgetSplit(maxParticles: number, active: number): {
  reserveHold: number;
  baseCap: number;
  baseFree: number;
  reserveFree: number;
} {
  const cap = Math.max(0, Math.round(maxParticles));
  const used = Math.max(0, Math.round(active));
  const reserveHold = Math.max(80, Math.min(420, Math.round(cap * DUST_RESERVE_RATIO)));
  const baseCap = Math.max(0, cap - reserveHold);
  const baseUsed = Math.min(used, baseCap);
  const reserveUsed = Math.max(0, used - baseCap);
  return {
    reserveHold,
    baseCap,
    baseFree: Math.max(0, baseCap - baseUsed),
    reserveFree: Math.max(0, reserveHold - reserveUsed),
  };
}

export function dustHotGate(peak: number, shinyGate: number): number {
  const p = Math.max(0, peak);
  return Math.max(shinyGate * 1.08, p * DUST_HOT_PEAK_RATIO, 0.78);
}

export function dustIsHot(luma: number, hotGate: number): boolean {
  return luma >= hotGate || luma >= DUST_WHITE_LUMA;
}

export function dustSpawnBudget(
  cellCount: number,
  onWave: boolean,
  amount: number,
  burst: number,
  density: number,
  budget: number,
): number {
  if (cellCount <= 0 || budget <= 0) return 0;
  const amt = clamp01(amount);
  const dens = clamp01(density);
  if (onWave) {
    const waveCap = Math.round((28 + dens * 110) * (0.4 + amt * 0.75) * (0.65 + clamp01(burst) * 0.55));
    return Math.min(budget, Math.max(8, waveCap));
  }
  const drip = Math.max(2, Math.round(cellCount * 0.014 * amt * (0.55 + dens * 0.7)));
  return Math.min(budget, drip);
}

export function dustHotSpend(
  hotCount: number,
  onWave: boolean,
  amount: number,
  reserveFree: number,
  leftoverBase: number,
): number {
  if (hotCount <= 0) return 0;
  const pool = Math.max(0, reserveFree) + Math.max(0, leftoverBase);
  if (pool <= 0) return 0;
  const amt = clamp01(amount);
  const want = onWave
    ? Math.max(10, Math.round(hotCount * 0.2 * (0.5 + amt)))
    : Math.max(3, Math.round(hotCount * 0.07 * (0.45 + amt)));
  return Math.min(pool, want);
}

function clamp01(v: number): number {
  return Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0;
}
