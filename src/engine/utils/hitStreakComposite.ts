/** Streak spread scales with length, amount, and decay envelope. */
export function hitStreakSpread(length: number, amount: number, decay: number): number {
  if (amount < 0.00001) return 0;
  const len = Math.max(0, Math.min(1, length));
  const dec = Math.max(0, Math.min(1, decay));
  return len * amount * 0.052 * (0.3 + dec * 0.7);
}

export function hitStreakMix(amount: number, decay: number): number {
  if (amount < 0.00001) return 0;
  const dec = Math.max(0, Math.min(1, decay));
  return Math.min(0.95, amount * (0.28 + dec * 0.72));
}

/** High band maps inversely to thinness (brighter-only, tighter streaks). */
export function hitStreakThinness(threshold: number): number {
  return Math.max(0, Math.min(1, 0.25 + threshold * 0.75));
}
