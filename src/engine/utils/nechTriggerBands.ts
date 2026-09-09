export const NECH_TRIGGER_CATALOG = [
  { band: "nech:onset", label: "Onset", short: "ON", kind: "pulse", color: "#22d3ee" },
  { band: "nech:kick", label: "Kick hit", short: "KI", kind: "pulse", color: "#e879f9" },
  { band: "nech:low", label: "Low hit", short: "LO", kind: "pulse", color: "#ef4444" },
  { band: "nech:mid", label: "Mid hit", short: "MI", kind: "pulse", color: "#34d399" },
  { band: "nech:high", label: "High hit", short: "HI", kind: "pulse", color: "#38bdf8" },
  { band: "nech:beat", label: "Beat grid", short: "BE", kind: "pulse", color: "#a855f7" },
  { band: "nech:rms", label: "RMS", short: "RM", kind: "level", color: "#94a3b8" },
  { band: "nech:specLow", label: "Spec low", short: "SL", kind: "level", color: "#f87171" },
  { band: "nech:specMid", label: "Spec mid", short: "SM", kind: "level", color: "#4ade80" },
  { band: "nech:specHigh", label: "Spec high", short: "SH", kind: "level", color: "#38bdf8" },
  { band: "nech:valence", label: "Valence", short: "VA", kind: "level", color: "#67e8f9" },
  { band: "nech:arousal", label: "Arousal", short: "AR", kind: "level", color: "#fb7185" },
] as const;

export type NechTriggerBand = (typeof NECH_TRIGGER_CATALOG)[number]["band"];

export type NechTriggerOption = {
  band: NechTriggerBand;
  label: string;
  short: string;
  kind: "pulse" | "level";
  color: string;
};

export function isNechAnalysisBand(band: string): band is NechTriggerBand {
  return band.startsWith("nech:");
}

export function findNechTriggerOption(
  band: string,
  options: NechTriggerOption[],
): NechTriggerOption | undefined {
  return options.find((o) => o.band === band);
}

export function buildNechTriggerOptions(hasNechAnalysis: boolean): NechTriggerOption[] {
  if (!hasNechAnalysis) return [];
  return NECH_TRIGGER_CATALOG.map((entry) => ({ ...entry }));
}