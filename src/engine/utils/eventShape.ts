/** Per-hit character derived from live band energy — length + intensity. */

export type EventShapeBand = "kick" | "snare" | "hat" | "bass" | "vocals" | "low" | "mid" | "high";

export type BandEventCharacter = {
  /** Normalized hit strength 0–1 (deep kick, bright snare, etc.). */
  intensity: number;
  /** How long the gate stayed active this hit (ms). */
  durationMs: number;
  /** 0 = quick transient, 1 = long sustain (long bass, short snare). */
  sustain: number;
};

export const EMPTY_BAND_EVENT: BandEventCharacter = {
  intensity: 0,
  durationMs: 0,
  sustain: 0,
};

/** Reference sustain length per band — maps duration to 0–1 sustain. */
const SUSTAIN_REF_MS: Record<EventShapeBand, number> = {
  kick: 140,
  snare: 90,
  hat: 50,
  bass: 900,
  vocals: 380,
  low: 720,
  mid: 480,
  high: 180,
};

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export class EventShapeTracker {
  private active = false;
  private startMs = 0;
  private peakEnergy = 0;
  private baselineEma = 0;

  lastCharacter: BandEventCharacter = { ...EMPTY_BAND_EVENT };

  constructor(public band: EventShapeBand) {}

  reset() {
    this.active = false;
    this.startMs = 0;
    this.peakEnergy = 0;
    this.lastCharacter = { ...EMPTY_BAND_EVENT };
  }

  update(active: boolean, energy: number, nowMs: number): BandEventCharacter {
    this.baselineEma += 0.07 * (energy - this.baselineEma);

    if (active && !this.active) {
      this.active = true;
      this.startMs = nowMs;
      this.peakEnergy = energy;
    }

    if (this.active) {
      this.peakEnergy = Math.max(this.peakEnergy, energy);
      const durationMs = Math.max(0, nowMs - this.startMs);
      const ref = SUSTAIN_REF_MS[this.band];
      const floor = Math.max(0.04, this.baselineEma * 0.85);
      const excess = Math.max(0, this.peakEnergy - floor);
      const ratio = excess / Math.max(0.08, floor * 1.6 + 0.06);
      const intensity = clamp01(1 - Math.exp(-ratio * 1.35));
      const sustain = clamp01(durationMs / ref);
      this.lastCharacter = { intensity, durationMs, sustain };
      if (!active) this.active = false;
      return this.lastCharacter;
    }

    if (!active) {
      this.lastCharacter = { intensity: 0, durationMs: 0, sustain: 0 };
    }
    return this.lastCharacter;
  }
}

export type EventVisualScale = { width: number; height: number };

/** Map event character to draw scale multipliers (width = length, height = intensity). */
export function eventVisualScale(
  char: BandEventCharacter,
  band: EventShapeBand,
): EventVisualScale {
  const ref = SUSTAIN_REF_MS[band];
  const sustain =
    char.sustain > 0 ? char.sustain : clamp01(char.durationMs / ref);
  const intensity = clamp01(char.intensity);
  return {
    width: 0.45 + sustain * 1.05 + intensity * 0.12,
    height: 0.4 + intensity * 0.75 + sustain * 0.08,
  };
}

/** Estimate shape from offline timeline spacing (studio / pre-analyzed events). */
export function eventShapeFromGapSec(
  band: EventShapeBand,
  gapSec: number,
  peakHint = 0.62,
): BandEventCharacter {
  const durationMs = Math.max(0, gapSec * 1000);
  const ref = SUSTAIN_REF_MS[band];
  return {
    intensity: clamp01(peakHint),
    durationMs,
    sustain: clamp01(durationMs / ref),
  };
}

export type BandEventCharacterMap = Partial<Record<EventShapeBand, BandEventCharacter>>;

export function createEventShapeTrackers() {
  return {
    kick: new EventShapeTracker("kick"),
    snare: new EventShapeTracker("snare"),
    hat: new EventShapeTracker("hat"),
    bass: new EventShapeTracker("bass"),
    vocals: new EventShapeTracker("vocals"),
    low: new EventShapeTracker("low"),
    mid: new EventShapeTracker("mid"),
    high: new EventShapeTracker("high"),
  };
}
