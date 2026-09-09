import type { AudioBands } from "../hooks/useAudioAnalyzer";

/**
 * Exported pages carry no analyzer, so every band reads silence. Audio-mapped FX
 * then render at their base amount — the same thing the app shows with no input.
 */
export function silentBands(): AudioBands & Record<string, number> {
  return {
    kick: 0,
    snare: 0,
    hat: 0,
    bass: 0,
    vocals: 0,
    low: 0,
    mid: 0,
    high: 0,
    beat: 0,
    rhythm: 0,
    specFast: 0,
    specSlow: 0,
    master: 0,
  };
}
