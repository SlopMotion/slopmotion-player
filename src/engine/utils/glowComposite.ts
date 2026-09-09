import { gaussian1DTapsForQuality } from "./blurComposite";
import type { RenderQualityTier } from "./renderQuality";

/** True when the static amount slider is zero and audio follow is off. */
export function isGlowAmountNoOp(base: number, syncBand: string | undefined): boolean {
  return (base ?? 0) < 0.00001 && (syncBand ?? "none") === "none";
}

/** Bloom radius in UV — tight enough that Gaussian taps overlap instead of ghosting. */
export function glowBloomSpread(bloom: number, amount: number): number {
  if (amount < 0.00001) return 0;
  return Math.max(0.01, bloom * 0.042);
}

/** Additive mix for one separable bloom pass. */
export function glowBloomMix(bloom: number, amount: number): number {
  if (amount < 0.00001) return 0;
  return Math.min(0.62, amount * (0.32 + bloom * 0.36));
}

/** Side taps only — skip the center so the last frame is not stamped on top. */
export function glowGaussianSideTaps(
  tier: RenderQualityTier | undefined,
): readonly (readonly [number, number])[] {
  const taps = gaussian1DTapsForQuality(tier).filter(([offset]) => offset !== 0);
  const sum = taps.reduce((acc, [, weight]) => acc + weight, 0);
  if (sum < 0.00001) return taps;
  return taps.map(([offset, weight]) => [offset, weight / sum] as const);
}

/** Whether separable aura passes should run (quality tier + spread + amount). */
export function shouldGlowAura(
  bloom: number,
  amount: number,
  glowAuraEnabled: boolean,
): boolean {
  return glowAuraEnabled && bloom > 0.01 && amount >= 0.00001;
}
