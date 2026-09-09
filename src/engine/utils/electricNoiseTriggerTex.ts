import type { ElectricNoiseTriggerSlot } from "./electricNoiseTriggerCircles";
import { ELECTRIC_NOISE_MAX_TRIGGER_CIRCLES } from "./electricNoiseTriggerCircles";

type ReglTexture = unknown;

export const ELECTRIC_NOISE_TRIGGER_TEX_SLOTS = ELECTRIC_NOISE_MAX_TRIGGER_CIRCLES;

type TriggerTexState = {
  data: Uint8Array;
  tex: ReglTexture;
};

let state: TriggerTexState | null = null;

export function initElectricNoiseTriggerTexture(
  regl: { texture: (opts: object) => ReglTexture },
): void {
  if (state) return;
  const data = new Uint8Array(ELECTRIC_NOISE_TRIGGER_TEX_SLOTS * 4);
  const tex = regl.texture({
    data,
    shape: [ELECTRIC_NOISE_TRIGGER_TEX_SLOTS, 1],
    wrap: "clamp",
    mag: "nearest",
    min: "nearest",
  });
  state = { data, tex };
}

export function getElectricNoiseTriggerTextureSampler(): { getTexture: () => ReglTexture } {
  if (state) return { getTexture: () => state!.tex };
  return {
    getTexture: () => {
      console.warn("[electricNoise] trigger texture not loaded yet");
      return null;
    },
  };
}

/** Upload ring expansion age 0–1 for each active slot (R channel). */
export function uploadElectricNoiseTriggerTexture(slots: ElectricNoiseTriggerSlot[]): void {
  if (!state) return;
  const { data, tex } = state;
  data.fill(0);
  const n = Math.min(slots.length, ELECTRIC_NOISE_TRIGGER_TEX_SLOTS);
  for (let i = 0; i < n; i++) {
    const ageU = Math.max(0, Math.min(1, slots[i]!.ageFrac));
    const o = i * 4;
    data[o] = Math.round(ageU * 255);
    data[o + 3] = 255;
  }
  const texObj = tex as {
    subimage?: (arg: Uint8Array | { data: Uint8Array; width: number; height: number }) => void;
  };
  texObj.subimage?.({
    data,
    width: ELECTRIC_NOISE_TRIGGER_TEX_SLOTS,
    height: 1,
  });
}
