/** Scroll offset for the shifted sample that feeds edge detection (width 0.05–1). */
export function edgeSpread(
  thickness: number,
  threshold: number,
  viewportMin: number,
): number {
  const thick = Math.max(0.05, Math.min(1, thickness ?? 0.35));
  const sens = Math.max(0, Math.min(1, threshold ?? 0.35));
  const px = (0.75 + thick * 2.5) / Math.max(1, viewportMin);
  return px * (1.15 - sens * 0.7);
}

/**
 * UV distance from the framebuffer edge over which edgeDiff fades to 0.
 * Covers the shifted-sample wrap discontinuity (plus a 1.5px safety pad).
 */
export function edgeViewportFade(
  spread: number,
  viewportMin: number,
): number {
  const pad = 1.5 / Math.max(1, viewportMin);
  return Math.max(pad, Math.abs(spread) * 1.35);
}
