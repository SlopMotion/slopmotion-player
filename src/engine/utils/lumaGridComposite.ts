export const LUMA_GRID_AMOUNT_EPS = 0.00001;

/** True when the static amount slider is zero and audio follow is off. */
export function isLumaGridAmountNoOp(base: number, syncBand: string | undefined): boolean {
  return (base ?? 0) < LUMA_GRID_AMOUNT_EPS && (syncBand ?? "none") === "none";
}

/** Companion pixelate divisions — bypassed at amount ~0 so enabling the FX does not leave a hidden blocky grade. */
export function lumaGridPixelateDivisions(
  amount: number,
  cols: number,
  rows: number,
): { pix: number; pixRows: number } {
  if (amount < LUMA_GRID_AMOUNT_EPS) {
    return { pix: 10000, pixRows: 10000 };
  }
  return { pix: cols, pixRows: rows };
}

/** Aspect-correct row count for square LED cells. */
export function lumaGridRowsForCols(cols: number, width: number, height: number): number {
  const c = Math.max(4, Math.min(194, Math.round(cols)));
  return Math.max(2, Math.round(c * (height / Math.max(1, width))));
}
