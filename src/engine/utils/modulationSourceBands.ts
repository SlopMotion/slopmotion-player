import type {
  AmBand,
  EgBand,
  LfoInstanceBand,
  StepperBand,
} from "../types/settings";

export const LFO_INSTANCE_COUNT = 8;
export const EG_COUNT = 8;
export const AM_COUNT = 4;
export const STEPPER_COUNT = 8;

function slotBands<P extends string, T extends `${P}:${number}`>(prefix: P, count: number): readonly T[] {
  return Array.from({ length: count }, (_, i) => `${prefix}:${i + 1}` as T);
}

export function isIndexedModBand(
  prefix: "lfo" | "eg" | "am" | "step",
  count: number,
  band: string,
): boolean {
  if (!band.startsWith(`${prefix}:`)) return false;
  const n = Number(band.slice(prefix.length + 1));
  return Number.isInteger(n) && n >= 1 && n <= count;
}

export const LFO_INSTANCE_BANDS: readonly LfoInstanceBand[] = slotBands("lfo", LFO_INSTANCE_COUNT);
export const EG_BANDS: readonly EgBand[] = slotBands("eg", EG_COUNT);
export const AM_BANDS: readonly AmBand[] = slotBands("am", AM_COUNT);
export const STEPPER_BANDS: readonly StepperBand[] = slotBands("step", STEPPER_COUNT);
