export type ElectricNoiseTriggerCircle = {
  bornMs: number;
};

export type ElectricNoiseTriggerSlot = {
  ageFrac: number;
};

export type ElectricNoiseCirclePack = {
  count: number;
  slots: ElectricNoiseTriggerSlot[];
};

import { ELECTRIC_NOISE_TRIGGER_EXPAND_SEC } from "../shaders/electricNoiseSrcGlsl";

/** Concurrent expanding rings — each hit adds one; they fade out as they grow. */
export const ELECTRIC_NOISE_MAX_TRIGGER_CIRCLES = 6;
const EXPAND_SEC = ELECTRIC_NOISE_TRIGGER_EXPAND_SEC;

export function createElectricNoiseTriggerCircles(): ElectricNoiseTriggerCircle[] {
  return [];
}

export function spawnElectricNoiseTriggerCircle(
  circles: ElectricNoiseTriggerCircle[],
  nowMs: number,
): void {
  circles.push({ bornMs: nowMs });
  const maxPool = ELECTRIC_NOISE_MAX_TRIGGER_CIRCLES * 4;
  while (circles.length > maxPool) circles.shift();
}

export function packElectricNoiseTriggerCircles(
  circles: ElectricNoiseTriggerCircle[],
  nowMs: number,
): ElectricNoiseCirclePack {
  const slots: ElectricNoiseTriggerSlot[] = [];
  for (let i = circles.length - 1; i >= 0; i--) {
    const c = circles[i]!;
    const ageSec = (nowMs - c.bornMs) / 1000;
    if (ageSec >= EXPAND_SEC) {
      circles.splice(i, 1);
      continue;
    }
    slots.push({
      ageFrac: Math.max(0, Math.min(1, ageSec / EXPAND_SEC)),
    });
  }
  if (slots.length > ELECTRIC_NOISE_MAX_TRIGGER_CIRCLES) {
    slots.sort((a, b) => a.ageFrac - b.ageFrac);
    slots.length = ELECTRIC_NOISE_MAX_TRIGGER_CIRCLES;
  }
  return { count: slots.length, slots };
}
