import { renderQualityProfile, type RenderQualityTier } from "./renderQuality";

/** True when the static amount slider is zero and audio follow is off. */
export function isBlurAmountNoOp(base: number, syncBand: string | undefined): boolean {
  return (base ?? 0) < 0.00001 && (syncBand ?? "none") === "none";
}

export function blurMixAmount(strength: number): number {
  if (strength < 0.00001) return 0;
  return Math.min(1, strength * 0.5);
}

export function blurSpread(strength: number): number {
  if (strength < 0.00001) return 0;
  return Math.max(0.001, strength * 0.045);
}

/** Separable Gaussian blend weight — zero at amount 0 so passes cannot leak blur. */
export function blurGaussianMix(strength: number): number {
  if (strength < 0.00001) return 0;
  return Math.min(0.92, 0.48 + strength * 0.28);
}

/** Per-tap incremental blend mix — accumulates blur without a single high-mix composite pass. */
export function blurTapMix(strength: number): number {
  if (strength < 0.00001) return 0;
  return Math.min(0.35, strength * 0.17);
}

export function blurRadialStepsForQuality(tier: RenderQualityTier): number {
  return renderQualityProfile(tier).blurRadialSteps;
}

/** 9-tap 1D Gaussian [1,8,28,56,70,56,28,8,1]/256 — separable H then V. */
export const GAUSSIAN_1D_9: readonly (readonly [number, number])[] = [
  [-4, 1 / 256],
  [-3, 8 / 256],
  [-2, 28 / 256],
  [-1, 56 / 256],
  [0, 70 / 256],
  [1, 56 / 256],
  [2, 28 / 256],
  [3, 8 / 256],
  [4, 1 / 256],
];

/** 5-tap 1D Gaussian [1,4,6,4,1]/16 — used per separable pass at full quality. */
export const GAUSSIAN_1D_5: readonly (readonly [number, number])[] = [
  [-2, 1 / 16],
  [-1, 4 / 16],
  [0, 6 / 16],
  [1, 4 / 16],
  [2, 1 / 16],
];

/** 3-tap 1D Gaussian [1,2,1]/4 — lighter pass for reduced/minimal tiers. */
export const GAUSSIAN_1D_3: readonly (readonly [number, number])[] = [
  [-1, 1 / 4],
  [0, 2 / 4],
  [1, 1 / 4],
];

export function gaussian1DTapsForQuality(
  tier: RenderQualityTier | undefined,
): readonly (readonly [number, number])[] {
  return renderQualityProfile(tier).blurGaussianTaps >= 8 ? GAUSSIAN_1D_5 : GAUSSIAN_1D_3;
}

export function blurGaussianTapCount(tier: RenderQualityTier | undefined): number {
  return renderQualityProfile(tier).blurGaussianTaps;
}

/** Tensor-product 2D Gaussian from the 1D taps — weights already sum to 1. */
export function blurGaussianKernelSamples(
  tier: RenderQualityTier | undefined,
): readonly { dx: number; dy: number; weight: number }[] {
  const taps = gaussian1DTapsForQuality(tier);
  const samples: { dx: number; dy: number; weight: number }[] = [];
  for (const [dx, wx] of taps) {
    for (const [dy, wy] of taps) {
      samples.push({ dx, dy, weight: wx * wy });
    }
  }
  return samples;
}

/** Noise blur (mode 2) — fixed coords; not user-facing. Higher scale = denser grain. */
export const BLUR_NOISE_SCALE = 24;
export const BLUR_NOISE_SPEED = 0.2;

/**
 * Mirror-wrap a UV so blur taps that walk off-frame read reflected pixels
 * instead of black / clamp-to-edge (the bright 1px seam).
 * Matches GLSL: `t - 2.0 * floor(t * 0.5)` then fold `t > 1` to `2 - t`.
 */
export function mirrorWrapUv(t: number): number {
  const folded = t - 2 * Math.floor(t * 0.5);
  return folded > 1 ? 2 - folded : folded;
}

/**
 * Aux Hydra output used to flatten the chain-so-far before a coord warp
 * (blur, liquix). Coord ops only warp clip UVs; color overlays stay sharp
 * unless we sample a rendered buffer. Prefer o2, then o3, then o1.
 */
export function pickBlurFlushOutput<T>(
  candidates: readonly (T | null | undefined)[],
  taken: Iterable<T>,
): T | null {
  const busy = new Set(taken);
  for (const out of candidates) {
    if (out != null && !busy.has(out)) return out;
  }
  return null;
}
