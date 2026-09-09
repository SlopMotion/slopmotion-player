/** Slice length from the Slice param (trigger-only — no amount scaling). */
export function resolveBoomerangSegmentSec(sliceSec: number): number {
  return Math.max(0.2, sliceSec);
}

export function isBoomerangCycleActive(st: { active: boolean } | null | undefined): boolean {
  return !!st?.active;
}

/** True when a boomerang trigger may start a new cycle. */
export function canStartBoomerangCycle(
  fxEnabled: boolean,
  bridgeReady: boolean,
  st: { active: boolean } | null | undefined,
): boolean {
  return fxEnabled && bridgeReady && !isBoomerangCycleActive(st);
}