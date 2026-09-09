export type GlitchLayerPreset = {
  shapeScale: number;
  xMult: number;
  yMult: number;
  tearAmpX: number;
  tearAmpY: number;
  tearPhaseX: number;
  tearPhaseY: number;
  tearRateX: number;
  tearRateY: number;
  travelPhaseX: number;
  travelPhaseY: number;
  travelRateX: number;
  travelRateY: number;
  travelSpreadX: number;
  travelSpreadY: number;
};

export const GLITCH_MAX_RECTS = 10;

const GLITCH_LAYER_CORE: GlitchLayerPreset[] = [
  {
    shapeScale: 0.5,
    xMult: 2.0,
    yMult: 0.5,
    tearAmpX: 0.05,
    tearAmpY: 0.03,
    tearPhaseX: 0.2,
    tearPhaseY: 1.1,
    tearRateX: 3.2,
    tearRateY: 2.8,
    travelPhaseX: 0.2,
    travelPhaseY: 1.1,
    travelRateX: 0.42,
    travelRateY: 0.36,
    travelSpreadX: 0.44,
    travelSpreadY: 0.4,
  },
  {
    shapeScale: 0.4,
    xMult: 0.5,
    yMult: 2.5,
    tearAmpX: -0.04,
    tearAmpY: 0.02,
    tearPhaseX: 2.4,
    tearPhaseY: 3.7,
    tearRateX: 4.1,
    tearRateY: 3.5,
    travelPhaseX: 2.4,
    travelPhaseY: 3.7,
    travelRateX: 0.51,
    travelRateY: 0.33,
    travelSpreadX: 0.46,
    travelSpreadY: 0.42,
  },
  {
    shapeScale: 0.6,
    xMult: 1.2,
    yMult: 0.8,
    tearAmpX: 0.03,
    tearAmpY: -0.05,
    tearPhaseX: 4.2,
    tearPhaseY: 5.5,
    tearRateX: 3.8,
    tearRateY: 2.6,
    travelPhaseX: 4.2,
    travelPhaseY: 5.5,
    travelRateX: 0.47,
    travelRateY: 0.39,
    travelSpreadX: 0.41,
    travelSpreadY: 0.45,
  },
  {
    shapeScale: 0.3,
    xMult: 0.8,
    yMult: 1.5,
    tearAmpX: -0.06,
    tearAmpY: -0.04,
    tearPhaseX: 6.1,
    tearPhaseY: 7.3,
    tearRateX: 4.6,
    tearRateY: 3.1,
    travelPhaseX: 6.1,
    travelPhaseY: 7.3,
    travelRateX: 0.44,
    travelRateY: 0.31,
    travelSpreadX: 0.43,
    travelSpreadY: 0.41,
  },
];

function shiftGlitchPreset(
  base: GlitchLayerPreset,
  phase: number,
  shapeScaleMul = 1,
): GlitchLayerPreset {
  return {
    ...base,
    shapeScale: base.shapeScale * shapeScaleMul,
    tearPhaseX: base.tearPhaseX + phase,
    tearPhaseY: base.tearPhaseY + phase * 1.17,
    travelPhaseX: base.travelPhaseX + phase,
    travelPhaseY: base.travelPhaseY + phase * 0.91,
    tearRateX: base.tearRateX + phase * 0.04,
    tearRateY: base.tearRateY + phase * 0.035,
    travelRateX: base.travelRateX + phase * 0.03,
    travelRateY: base.travelRateY + phase * 0.028,
  };
}

export const GLITCH_LAYER_PRESETS: readonly GlitchLayerPreset[] = [
  ...GLITCH_LAYER_CORE,
  shiftGlitchPreset(GLITCH_LAYER_CORE[0]!, 8.3, 0.92),
  shiftGlitchPreset(GLITCH_LAYER_CORE[1]!, 9.4, 0.88),
  shiftGlitchPreset(GLITCH_LAYER_CORE[2]!, 10.5, 0.95),
  shiftGlitchPreset(GLITCH_LAYER_CORE[3]!, 11.6, 0.9),
  shiftGlitchPreset(GLITCH_LAYER_CORE[0]!, 12.7, 0.78),
  shiftGlitchPreset(GLITCH_LAYER_CORE[2]!, 13.8, 0.82),
];

function clampParam(v: number, min: number, max: number, fallback: number): number {
  return Number.isFinite(v) ? Math.max(min, Math.min(max, v)) : fallback;
}

function scaleLegacy01To10(raw: number): number {
  return raw > 0 && raw <= 1 ? raw * 10 : raw;
}

/** Amount is rectangle count on a 0–10 slider. */
export function resolveGlitchRectCount(raw: unknown): number {
  const v = Number(raw);
  if (!Number.isFinite(v)) return 4;
  return Math.max(0, Math.min(GLITCH_MAX_RECTS, Math.round(scaleLegacy01To10(v))));
}

/** Block size param on 0–10. */
export function resolveGlitchBlockSize(raw: unknown): number {
  const v = Number(raw);
  if (!Number.isFinite(v)) return 5;
  return clampParam(scaleLegacy01To10(v), 0, 10, 5);
}

export function glitchBlockMix(size0to10: number): number {
  return Math.max(0, Math.min(1, size0to10 / 10));
}

export function glitchShapeRadius(presetScale: number, size0to10: number): number {
  return presetScale * glitchBlockMix(size0to10) * 2;
}

export function glitchScaleAmount(blockMix: number): number {
  if (blockMix < 0.00001) return 0;
  return 0.85 + blockMix * 0.35;
}

export function glitchAxisMult(presetMult: number, blockMix: number): number {
  return presetMult * (0.45 + blockMix * 0.95);
}

export function resolveGlitchTravel(raw: unknown): number {
  return clampParam(Number(raw), 0, 1, 1);
}

export function resolveGlitchTear(raw: unknown): number {
  return clampParam(Number(raw), 0, 1, 1);
}

export type GlitchTravelMotion = {
  pivot: number;
  scroll: number;
};

/** Animated travel for one axis — pivot moves scale center, scroll shifts the tear window. */
export function computeGlitchTravelMotion(
  phase: number,
  rate: number,
  spread: number,
  layerIndex: number,
  t: number,
  speed: number,
  travelMix: number,
): GlitchTravelMotion {
  const drift =
    Math.sin(t * speed * rate + phase) * 0.58 +
    Math.sin(t * speed * rate * 0.53 + phase * 1.7) * 0.28;
  const hop = Math.sin(Math.floor(t * speed * rate * 0.38) * 5.11 + phase * 1.4) * 0.34;
  const motion = (drift + hop) * spread * 1.15 * travelMix;
  const anchor = ((layerIndex * 0.23 + phase * 0.037) % 1) - 0.5;
  return {
    pivot: 0.5 + motion * 0.75 + anchor * 0.32,
    scroll: motion * 1.05 + anchor * 0.48,
  };
}
