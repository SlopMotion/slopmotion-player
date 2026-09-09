import { renderQualityProfile, type RenderQualityTier } from "./renderQuality";

export const SHARPEN_AMOUNT_EPS = 0.00001;

/** True when the static amount slider is zero and audio follow is off. */
export function isSharpenAmountNoOp(base: number, syncBand: string | undefined): boolean {
  return (base ?? 0) < SHARPEN_AMOUNT_EPS && (syncBand ?? "none") === "none";
}

/** Scroll offset for the box-blur taps that feed the unsharp mask (radius 0.25–2). */
export function sharpenSpread(radius: number): number {
  const r = Math.max(0.25, Math.min(2, radius ?? 1));
  return Math.max(0.0005, r * 0.008);
}

export type SharpenBlurSample =
  | { kind: "center"; weight: number }
  | { kind: "scrollX"; weight: number; sign: 1 | -1 }
  | { kind: "scrollY"; weight: number; sign: 1 | -1 };

/**
 * Cross-pattern blur taps for the unsharp mask. Full quality uses five offsets;
 * reduced/minimal trims to three so weak GPUs keep headroom (same tier gate as blur).
 */
export function sharpenBlurSamplesForQuality(
  tier: RenderQualityTier | undefined,
): readonly SharpenBlurSample[] {
  if (renderQualityProfile(tier).blurGaussianTaps >= 8) {
    return [
      { kind: "center", weight: 0.2 },
      { kind: "scrollX", weight: 0.2, sign: 1 },
      { kind: "scrollX", weight: 0.2, sign: -1 },
      { kind: "scrollY", weight: 0.2, sign: 1 },
      { kind: "scrollY", weight: 0.2, sign: -1 },
    ];
  }
  return [
    { kind: "center", weight: 0.34 },
    { kind: "scrollX", weight: 0.33, sign: 1 },
    { kind: "scrollY", weight: 0.33, sign: 1 },
  ];
}
