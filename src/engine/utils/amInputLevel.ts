import type { AudioBands } from "../hooks/useAudioAnalyzer";
import type { AudioModulatorConfig } from "../types/settings";
import { getHydraWindow } from "../types/hydraWindow";
import { energyInHzRange, clampAmHzRange } from "./audioBandBins";
import { getTriggerBandLevel } from "./fxRuntime";

export const DEFAULT_AM_FREQ_MIN = 250;
export const DEFAULT_AM_FREQ_MAX = 1200;

export type AmRangePreset = { id: string; label: string; minHz: number; maxHz: number };

export const AM_RANGE_PRESETS: readonly AmRangePreset[] = [
  { id: "vibrato", label: "Vibrato", minHz: 250, maxHz: 1200 },
  { id: "vocals", label: "Vocals", minHz: 280, maxHz: 3600 },
  { id: "lead", label: "Lead", minHz: 400, maxHz: 2500 },
  { id: "mid", label: "Mid", minHz: 400, maxHz: 1800 },
  { id: "hat", label: "Hat", minHz: 6000, maxHz: 12000 },
];

export function normalizeAmHzRange(
  am: AudioModulatorConfig,
  sampleRate = 48000,
): { minHz: number; maxHz: number } {
  const minHz = am.freqMinHz ?? DEFAULT_AM_FREQ_MIN;
  const maxHz = am.freqMaxHz ?? DEFAULT_AM_FREQ_MAX;
  return clampAmHzRange(minHz, maxHz, sampleRate);
}

function readLiveSpectrum(): { spectrum?: Uint8Array; sampleRate: number } {
  const win = getHydraWindow();
  if (win.audioSpectrum?.length && win.audioSampleRate) {
    return { spectrum: win.audioSpectrum, sampleRate: win.audioSampleRate };
  }
  const live = win.oscilloscopeLiveRef?.current;
  if (live?.spectrum?.length && live.sampleRate) {
    return { spectrum: live.spectrum, sampleRate: live.sampleRate };
  }
  return { sampleRate: 48000 };
}

/** Raw 0–1 input for an audio modulator before threshold / envelope following. */
export function getAmInputLevel(
  am: AudioModulatorConfig,
  bands: (AudioBands & Record<string, number>) | undefined,
  inputMultiplier = 1,
): number {
  if (am.mode === "gate") return getTriggerBandLevel("master", bands);

  if (am.mode === "range") {
    const { spectrum, sampleRate } = readLiveSpectrum();
    if (!spectrum?.length) return 0;
    const { minHz, maxHz } = normalizeAmHzRange(am, sampleRate);
    return energyInHzRange(spectrum, sampleRate, minHz, maxHz) * inputMultiplier;
  }

  return getTriggerBandLevel(am.band, bands);
}
