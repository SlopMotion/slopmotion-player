/**
 * Adaptive render-quality tiers. These trim the GPU fill-rate of the most
 * expensive effects (multi-tap blur, the multi-pass glow aura) as a *last
 * resort* — only after adaptive DPR scaling has bottomed out — so capable
 * machines keep full fidelity and weak GPUs stay smooth instead of stuttering.
 */
export type RenderQualityTier = "full" | "reduced" | "minimal";

export interface RenderQualityProfile {
  /** Separable Gaussian 1D taps per pass (full = 5-weight, reduced/minimal = 3-weight). */
  blurGaussianTaps: 4 | 8;
  /** Radial zoom-blur accumulation steps. */
  blurRadialSteps: number;
  /** Whether the 2D bloom kernel (tight + optional wide haze) is rendered. */
  glowAura: boolean;
  /** Warp Tunnel raymarch tier: 0 full, 1 reduced, 2 minimal (passed as tunnelQuality uniform). */
  warpTunnelQuality: 0 | 1 | 2;
}

export const RENDER_QUALITY_PROFILES: Record<RenderQualityTier, RenderQualityProfile> = {
  full: { blurGaussianTaps: 8, blurRadialSteps: 8, glowAura: true, warpTunnelQuality: 0 },
  reduced: { blurGaussianTaps: 4, blurRadialSteps: 6, glowAura: true, warpTunnelQuality: 1 },
  minimal: { blurGaussianTaps: 4, blurRadialSteps: 4, glowAura: false, warpTunnelQuality: 2 },
};

export const RENDER_QUALITY_ORDER: RenderQualityTier[] = ["full", "reduced", "minimal"];

export function renderQualityProfile(tier: RenderQualityTier | undefined): RenderQualityProfile {
  return RENDER_QUALITY_PROFILES[tier ?? "full"];
}
