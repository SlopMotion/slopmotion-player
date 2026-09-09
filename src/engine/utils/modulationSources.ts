import { getHydraWindow } from "../types/hydraWindow";
import type {
  AmBand,
  AudioModulatorConfig,
  EgBand,
  EnvelopeGeneratorConfig,
  LfoInstanceBand,
  LfoSourceConfig,
  ModWaveform,
  ModulationSettings,
  ModulationSourceBand,
  StepperBand,
  StepperPlayMode,
  StepperSourceConfig,
} from "../types/settings";
import { normalizeEgConfig } from "./egEnvelopeConfig";
import { LFO_LOOP_BEATS } from "./lfoBands";
import { DEFAULT_AM_FREQ_MAX, DEFAULT_AM_FREQ_MIN } from "./amInputLevel";

import {
  AM_COUNT,
  EG_COUNT,
  LFO_INSTANCE_COUNT,
  STEPPER_COUNT,
  isIndexedModBand,
} from "./modulationSourceBands";
export {
  AM_BANDS,
  AM_COUNT,
  EG_BANDS,
  EG_COUNT,
  LFO_INSTANCE_BANDS,
  LFO_INSTANCE_COUNT,
  STEPPER_BANDS,
  STEPPER_COUNT,
} from "./modulationSourceBands";

export const MOD_SOURCE_COLOR = {
  lfo: "#f59e0b",
  eg: "#2dd4bf",
  am: "#fb7185",
  step: "#38bdf8",
} as const;

/** Default bipolar power-of-two ladder for steppers. */
export const DEFAULT_STEPPER_VALUES: readonly number[] = [
  -16, -8, -4, -2, -1, 0, 1, 2, 4, 8, 16,
];

export const STEPPER_PLAY_MODE_OPTIONS: readonly StepperPlayMode[] = ["loop", "pingpong"];

export const STEPPER_PLAY_MODE_LABEL: Record<StepperPlayMode, string> = {
  loop: "Loop",
  pingpong: "Ping-pong",
};

export const STEPPER_BEATS_CHOICES = [1, 2, 4, 8, 16] as const;

export const MOD_WAVEFORM_LABEL: Record<ModWaveform, string> = {
  sin: "Sine",
  square: "Square",
  saw: "Saw",
  tri: "Triangle",
  sampleHold: "S&H",
  filteredSampleHold: "FS&H",
  doubleSaw: "D.Saw",
  randomSine: "R.Sin",
};

export const MOD_WAVEFORM_OPTIONS: readonly ModWaveform[] = [
  "sin",
  "square",
  "saw",
  "tri",
  "sampleHold",
  "filteredSampleHold",
  "doubleSaw",
  "randomSine",
];

export function isLfoInstanceBand(band: string): band is LfoInstanceBand {
  return isIndexedModBand("lfo", LFO_INSTANCE_COUNT, band);
}

export function isEgBand(band: string): band is EgBand {
  return isIndexedModBand("eg", EG_COUNT, band);
}

export function isAmBand(band: string): band is AmBand {
  return isIndexedModBand("am", AM_COUNT, band);
}

export function isStepperBand(band: string): band is StepperBand {
  return isIndexedModBand("step", STEPPER_COUNT, band);
}

export function isModulationSourceBand(band: string): band is ModulationSourceBand {
  return isLfoInstanceBand(band) || isEgBand(band) || isAmBand(band) || isStepperBand(band);
}

/** Bands that can be picked as a variable source (EG shapes require a trigger binding). */
export function isRoutableModulationSourceBand(band: string): band is ModulationSourceBand {
  return isLfoInstanceBand(band) || isAmBand(band) || isStepperBand(band);
}

/** 1-based instance index parsed from a modulation band, or null. */
export function modSourceIndex(band: string): number | null {
  if (!isModulationSourceBand(band)) return null;
  const n = parseInt(band.slice(band.indexOf(":") + 1), 10);
  return Number.isFinite(n) ? n : null;
}

export function modSourceLabel(band: string): string {
  const idx = modSourceIndex(band);
  if (idx == null) return band;
  if (isLfoInstanceBand(band)) return `LFO ${idx}`;
  if (isEgBand(band)) return `Env ${idx}`;
  if (isAmBand(band)) return `AM ${idx}`;
  if (isStepperBand(band)) return `Step ${idx}`;
  return band;
}

export function modSourceShort(band: string): string {
  const idx = modSourceIndex(band);
  if (idx == null) return "MOD";
  if (isLfoInstanceBand(band)) return `L${idx}`;
  if (isEgBand(band)) return `E${idx}`;
  if (isAmBand(band)) return `A${idx}`;
  if (isStepperBand(band)) return `S${idx}`;
  return "MOD";
}

export function modSourceColor(band: string): string {
  if (isLfoInstanceBand(band)) return MOD_SOURCE_COLOR.lfo;
  if (isEgBand(band)) return MOD_SOURCE_COLOR.eg;
  if (isAmBand(band)) return MOD_SOURCE_COLOR.am;
  if (isStepperBand(band)) return MOD_SOURCE_COLOR.step;
  return "#94a3b8";
}

const LFO_PRESETS: readonly Pick<LfoSourceConfig, "enabled" | "waveform" | "rate">[] = [
  { enabled: true, waveform: "sin", rate: 0.5 },
  { enabled: true, waveform: "tri", rate: 1 },
  { enabled: true, waveform: "saw", rate: 4 },
  { enabled: true, waveform: "square", rate: 16 },
  { enabled: true, waveform: "sampleHold", rate: 16 },
  { enabled: true, waveform: "filteredSampleHold", rate: 4 },
  { enabled: true, waveform: "doubleSaw", rate: 8 },
  { enabled: true, waveform: "randomSine", rate: 0.25 },
];

const EG_PRESET_LABELS = ["Punch", "Swell", "Snare", "Tail", "Pluck", "Pad", "Stutter", "Bloom"] as const;

const EG_PRESETS: readonly Pick<
  EnvelopeGeneratorConfig,
  "enabled" | "attack" | "hold" | "oneshotRelease" | "oneshotDecay" | "triggerEaseOutShape"
>[] = [
  { enabled: true, attack: 0, hold: 0, oneshotRelease: 0, oneshotDecay: 15, triggerEaseOutShape: "smooth" },
  { enabled: true, attack: 5, hold: 0, oneshotRelease: 8, oneshotDecay: 40, triggerEaseOutShape: "smooth" },
  { enabled: true, attack: 0, hold: 0.05, oneshotRelease: 0, oneshotDecay: 25, triggerEaseOutShape: "cubic" },
  { enabled: true, attack: 2, hold: 0, oneshotRelease: 25, oneshotDecay: 80, triggerEaseOutShape: "smooth" },
  { enabled: false, attack: 0, hold: 0, oneshotRelease: 4, oneshotDecay: 20, triggerEaseOutShape: "expo" },
  { enabled: false, attack: 12, hold: 2, oneshotRelease: 20, oneshotDecay: 60, triggerEaseOutShape: "cosine" },
  { enabled: false, attack: 0, hold: 0.02, oneshotRelease: 0.5, oneshotDecay: 8, triggerEaseOutShape: "linear" },
  { enabled: false, attack: 8, hold: 4, oneshotRelease: 16, oneshotDecay: 50, triggerEaseOutShape: "quad" },
];

const STEPPER_PRESET_LABELS = ["Rise", "Gate", "Ladder", "Bounce", "Accent", "Coarse", "Fine", "Flip"] as const;

const STEPPER_PRESETS: readonly Pick<
  StepperSourceConfig,
  "enabled" | "values" | "playMode" | "beatsPerStep"
>[] = [
  { enabled: true, values: [0, 0.25, 0.5, 0.75, 1], playMode: "loop", beatsPerStep: 2 },
  { enabled: true, values: [0, 1], playMode: "loop", beatsPerStep: 1 },
  { enabled: false, values: [...DEFAULT_STEPPER_VALUES], playMode: "loop", beatsPerStep: 4 },
  { enabled: false, values: [0, 0.5, 1], playMode: "pingpong", beatsPerStep: 2 },
  { enabled: false, values: [0, 0, 0, 1], playMode: "loop", beatsPerStep: 1 },
  { enabled: false, values: [0, 0.33, 0.67, 1], playMode: "loop", beatsPerStep: 4 },
  { enabled: false, values: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1], playMode: "loop", beatsPerStep: 1 },
  { enabled: false, values: [0, 1], playMode: "loop", beatsPerStep: 8 },
];

export function createDefaultLfo(index: number): LfoSourceConfig {
  const preset = LFO_PRESETS[index] ?? LFO_PRESETS[0]!;
  return {
    enabled: preset.enabled,
    waveform: preset.waveform,
    rate: preset.rate,
    phase: 0,
    offset: 0,
    oneShot: false,
  };
}

export function createDefaultEg(index: number): EnvelopeGeneratorConfig {
  const preset = EG_PRESETS[index] ?? EG_PRESETS[0]!;
  return {
    enabled: preset.enabled,
    attack: preset.attack,
    hold: preset.hold,
    oneshotRelease: preset.oneshotRelease,
    oneshotDecay: preset.oneshotDecay,
    triggerEaseOutShape: preset.triggerEaseOutShape,
  };
}

export function egPresetLabel(index: number): string {
  return EG_PRESET_LABELS[index] ?? `Env ${index + 1}`;
}

export function stepperPresetLabel(index: number): string {
  return STEPPER_PRESET_LABELS[index] ?? `Step ${index + 1}`;
}

export function createDefaultAm(index: number): AudioModulatorConfig {
  return {
    enabled: false,
    mode: index === 0 ? "gate" : index === 3 ? "range" : "spectrum",
    band: index === 0 ? "master" : index === 1 ? "low" : index === 2 ? "mid" : "high",
    freqMinHz: DEFAULT_AM_FREQ_MIN,
    freqMaxHz: DEFAULT_AM_FREQ_MAX,
    threshold: 0.12,
    gain: 1.5,
    attack: 0.01,
    release: index === 3 ? 0.08 : 0.18,
  };
}

export function normalizeStepperValues(values: unknown): number[] {
  if (!Array.isArray(values)) return [...DEFAULT_STEPPER_VALUES];
  const next = values
    .map((v) => (typeof v === "number" && Number.isFinite(v) ? v : null))
    .filter((v): v is number => v != null);
  return next.length > 0 ? next : [...DEFAULT_STEPPER_VALUES];
}

export function createDefaultStepper(index: number): StepperSourceConfig {
  const preset = STEPPER_PRESETS[index] ?? STEPPER_PRESETS[0]!;
  const values = [...preset.values];
  return {
    enabled: preset.enabled,
    values,
    playMode: preset.playMode,
    beatsPerStep: preset.beatsPerStep,
    startIndex: 0,
    endIndex: values.length - 1,
  };
}

function sameNumberList(a: readonly number[], b: readonly number[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

/** Old factory stepper: every slot was the same ±16 ladder at 4 beats. */
function isLegacyFactoryStepper(input: Partial<StepperSourceConfig>): boolean {
  if (!Array.isArray(input.values) || !sameNumberList(input.values, DEFAULT_STEPPER_VALUES)) {
    return false;
  }
  if ((input.playMode ?? "loop") !== "loop") return false;
  if ((input.beatsPerStep ?? 4) !== 4) return false;
  if (typeof input.startIndex === "number" && input.startIndex !== 0) return false;
  if (typeof input.endIndex === "number" && input.endIndex !== DEFAULT_STEPPER_VALUES.length - 1) {
    return false;
  }
  return true;
}

/** Clamp and order start/end so they form a valid inclusive range into `values`. */
export function normalizeStepperRange(
  valuesLength: number,
  startRaw: number,
  endRaw: number,
): { startIndex: number; endIndex: number } {
  const last = Math.max(0, valuesLength - 1);
  let startIndex = Math.max(0, Math.min(last, Math.round(startRaw)));
  let endIndex = Math.max(0, Math.min(last, Math.round(endRaw)));
  if (startIndex > endIndex) {
    const tmp = startIndex;
    startIndex = endIndex;
    endIndex = tmp;
  }
  return { startIndex, endIndex };
}

export function normalizeStepperConfig(
  input?: Partial<StepperSourceConfig> | null,
  index = 0,
): StepperSourceConfig {
  const base = createDefaultStepper(index);
  if (!input) return base;
  if (isLegacyFactoryStepper(input)) {
    return {
      ...base,
      enabled: typeof input.enabled === "boolean" ? input.enabled : base.enabled,
    };
  }
  const playMode: StepperPlayMode =
    input.playMode === "pingpong" || input.playMode === "loop" ? input.playMode : base.playMode;
  const beatsRaw = typeof input.beatsPerStep === "number" ? input.beatsPerStep : base.beatsPerStep;
  const beatsPerStep = Math.max(1, Math.min(32, Math.round(beatsRaw) || base.beatsPerStep));
  const values = normalizeStepperValues(input.values ?? base.values);
  const startRaw = typeof input.startIndex === "number" ? input.startIndex : base.startIndex;
  const endRaw =
    typeof input.endIndex === "number" ? input.endIndex : values.length - 1;
  const { startIndex, endIndex } = normalizeStepperRange(values.length, startRaw, endRaw);
  return {
    enabled: typeof input.enabled === "boolean" ? input.enabled : base.enabled,
    values,
    playMode,
    beatsPerStep,
    startIndex,
    endIndex,
  };
}

/** Active contiguous slice of the ladder defined by start/end indices. */
export function stepperActiveValues(cfg: StepperSourceConfig): number[] {
  const values = normalizeStepperValues(cfg.values);
  const { startIndex, endIndex } = normalizeStepperRange(
    values.length,
    cfg.startIndex,
    cfg.endIndex,
  );
  return values.slice(startIndex, endIndex + 1);
}

export function createDefaultModulation(): ModulationSettings {
  return {
    lfos: Array.from({ length: LFO_INSTANCE_COUNT }, (_, i) => createDefaultLfo(i)),
    egs: Array.from({ length: EG_COUNT }, (_, i) => createDefaultEg(i)),
    ams: Array.from({ length: AM_COUNT }, (_, i) => createDefaultAm(i)),
    steppers: Array.from({ length: STEPPER_COUNT }, (_, i) => createDefaultStepper(i)),
  };
}

/** Fill any missing instances so the panel always has the full VS count. */
export function normalizeModulation(input?: Partial<ModulationSettings> | null): ModulationSettings {
  const base = createDefaultModulation();
  if (!input) return base;
  return {
    lfos: base.lfos.map((d, i) => ({ ...d, ...(input.lfos?.[i] ?? {}) })),
    egs: base.egs.map((d, i) => normalizeEgConfig({ ...d, ...(input.egs?.[i] ?? {}) })),
    ams: base.ams.map((d, i) => ({ ...d, ...(input.ams?.[i] ?? {}) })),
    steppers: base.steppers.map((d, i) =>
      normalizeStepperConfig({ ...d, ...(input.steppers?.[i] ?? {}) }, i),
    ),
  };
}

/** Deterministic 0–1 pseudo-random keyed by integer step (stateless S&H). */
function hash01(seed: number): number {
  let x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  x -= Math.floor(x);
  return x;
}

/** Bipolar (−1..1) shape value for an LFO waveform at cycle phase `p` (0–1). */
function lfoBipolar(wave: ModWaveform, p: number, cycle: number): number {
  switch (wave) {
    case "sin":
      return Math.sin(p * Math.PI * 2);
    case "square":
      return p < 0.5 ? 1 : -1;
    case "saw":
      return p * 2 - 1;
    case "tri":
      return 1 - 4 * Math.abs(p - 0.5);
    case "doubleSaw":
      // Saw that mirrors direction at the half-cycle (sharp triangle).
      return p < 0.5 ? p * 4 - 1 : 1 - (p - 0.5) * 4;
    case "sampleHold":
      return hash01(Math.floor(cycle)) * 2 - 1;
    case "filteredSampleHold": {
      const a = hash01(Math.floor(cycle)) * 2 - 1;
      const b = hash01(Math.floor(cycle) + 1) * 2 - 1;
      return a + (b - a) * p;
    }
    case "randomSine": {
      const a = hash01(Math.floor(cycle)) * 2 - 1;
      const b = hash01(Math.floor(cycle) + 1) * 2 - 1;
      const ease = (1 - Math.cos(p * Math.PI)) * 0.5;
      return a + (b - a) * ease;
    }
    default:
      return 0;
  }
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/** Map bipolar shape to 0–1 with an offset bias (positive lifts, negative drops). */
export function lfoShape01(wave: ModWaveform, p: number, cycle = 0, offset = 0): number {
  const bipolar = lfoBipolar(wave, p, cycle);
  return clamp01(bipolar * 0.5 + 0.5 + offset * 0.5);
}

function modTimeSec(): number {
  const win = getHydraWindow();
  if (typeof win.studioPlaybackMasterSec === "number") return win.studioPlaybackMasterSec;
  if (typeof win.studioFrozenTimeSec === "number") return win.studioFrozenTimeSec;
  if (typeof win.time === "number") return win.time;
  return performance.now() / 1000;
}

function modBpm(): number {
  const bpm = getHydraWindow().hydraBpm;
  return typeof bpm === "number" && bpm > 0 ? bpm : 120;
}

/** Continuous cycle count + within-cycle phase for an LFO instance at the current clock. */
export function lfoInstancePhase(cfg: LfoSourceConfig, timeSec = modTimeSec(), bpm = modBpm()) {
  const rate = Math.max(0.01, cfg.rate);
  const beatPeriod = 60 / bpm;
  const beats = timeSec / beatPeriod;
  const totalCycles = (beats * rate) / LFO_LOOP_BEATS + cfg.phase;
  const cycle = Math.floor(totalCycles);
  let p = totalCycles - cycle;
  if (cfg.oneShot && totalCycles >= 1) p = 1;
  return { cycle, phase: p, totalCycles };
}

/** Normalized 0–1 level for a configurable LFO instance. */
export function lfoInstanceLevel(cfg: LfoSourceConfig, timeSec = modTimeSec(), bpm = modBpm()): number {
  if (!cfg.enabled) return 0;
  const { cycle, phase } = lfoInstancePhase(cfg, timeSec, bpm);
  return lfoShape01(cfg.waveform, phase, cycle, cfg.offset);
}

/**
 * Map a linear step count onto a table index for loop or ping-pong traversal.
 * `n === 1` always returns 0.
 */
export function stepperIndexFromCount(
  stepCount: number,
  length: number,
  playMode: StepperPlayMode,
): number {
  const n = Math.max(1, Math.floor(length));
  if (n === 1) return 0;
  const count = Math.max(0, Math.floor(stepCount));
  if (playMode === "loop") return count % n;
  const cycleLen = 2 * (n - 1);
  const t = count % cycleLen;
  return t < n ? t : cycleLen - t;
}

/** Absolute table index for a stepper at the current BPM clock (within start…end). */
export function stepperPlayheadIndex(
  cfg: StepperSourceConfig,
  timeSec = modTimeSec(),
  bpm = modBpm(),
): number {
  const values = normalizeStepperValues(cfg.values);
  const { startIndex, endIndex } = normalizeStepperRange(
    values.length,
    cfg.startIndex,
    cfg.endIndex,
  );
  const activeLen = endIndex - startIndex + 1;
  const beatsPerStep = Math.max(1, Math.min(32, Math.round(cfg.beatsPerStep) || 1));
  const beatPeriod = 60 / Math.max(1, bpm);
  const beats = Math.max(0, timeSec / beatPeriod);
  const stepCount = Math.floor(beats / beatsPerStep);
  const local = stepperIndexFromCount(stepCount, activeLen, cfg.playMode);
  return startIndex + local;
}

/** Held table value at the current playhead (raw, not normalized). */
export function stepperHeldValue(
  cfg: StepperSourceConfig,
  timeSec = modTimeSec(),
  bpm = modBpm(),
): number {
  const values = normalizeStepperValues(cfg.values);
  const idx = stepperPlayheadIndex(cfg, timeSec, bpm);
  return values[idx] ?? 0;
}

/** Normalized 0–1 level for a stepper (active-range value mapped by active min/max). */
export function stepperInstanceLevel(
  cfg: StepperSourceConfig,
  timeSec = modTimeSec(),
  bpm = modBpm(),
): number {
  if (!cfg.enabled) return 0;
  const active = stepperActiveValues(cfg);
  const value = stepperHeldValue(cfg, timeSec, bpm);
  let min = active[0]!;
  let max = active[0]!;
  for (let i = 1; i < active.length; i++) {
    const v = active[i]!;
    if (v < min) min = v;
    if (v > max) max = v;
  }
  if (max <= min) return 0.5;
  return clamp01((value - min) / (max - min));
}

/** Live 0–1 value for any modulation source band (reads `window.hydraModulation`). */
export function modulationSourceLevel(band: ModulationSourceBand): number {
  const idx = modSourceIndex(band);
  if (idx == null) return 0;
  const mod = getHydraWindow().hydraModulation;
  if (isLfoInstanceBand(band)) {
    const live = mod?.lfo?.[idx];
    if (typeof live === "number") return live;
    const cfg = mod?.config?.lfos?.[idx - 1];
    return cfg ? lfoInstanceLevel(cfg) : 0;
  }
  if (isEgBand(band)) return mod?.eg?.[idx] ?? 0;
  if (isAmBand(band)) return mod?.am?.[idx] ?? 0;
  if (isStepperBand(band)) {
    const live = mod?.step?.[idx];
    if (typeof live === "number") return live;
    const cfg = mod?.config?.steppers?.[idx - 1];
    return cfg ? stepperInstanceLevel(cfg) : 0;
  }
  return 0;
}
