import type { CoreAudioBand } from "../types/settings";
import { lfoBandLabel, lfoBandShort } from "../utils/lfoBands";
import {
  isModulationSourceBand,
  modSourceColor,
  modSourceLabel,
  modSourceShort,
} from "../utils/modulationSources";
import { NECH_TRIGGER_CATALOG } from "../utils/nechTriggerBands";

/** Shared K / L / M / H / beat palette (FX rail, Audio panel, spectrum canvas, timeline). */
export const AUDIO_BAND_HSL = {
  kick: { h: 322, s: 94, l: 64 },
  snare: { h: 38, s: 95, l: 58 },
  hat: { h: 175, s: 88, l: 52 },
  bass: { h: 275, s: 82, l: 48 },
  vocals: { h: 18, s: 88, l: 62 },
  low: { h: 0, s: 96, l: 50 },
  mid: { h: 160, s: 84, l: 39 },
  high: { h: 199, s: 89, l: 48 },
  beat: { h: 271, s: 81, l: 56 },
  rhythm: { h: 286, s: 70, l: 62 },
  specFast: { h: 50, s: 92, l: 60 },
  specSlow: { h: 220, s: 60, l: 62 },
  master: { h: 187, s: 85, l: 52 },
} as const;

export type AudioBandHueKey = keyof typeof AUDIO_BAND_HSL;

function hslToRgb255(h: number, s: number, l: number): [number, number, number] {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;
  let rp = 0;
  let gp = 0;
  let bp = 0;
  if (h < 60) {
    rp = c;
    gp = x;
  } else if (h < 120) {
    rp = x;
    gp = c;
  } else if (h < 180) {
    gp = c;
    bp = x;
  } else if (h < 240) {
    gp = x;
    bp = c;
  } else if (h < 300) {
    rp = x;
    bp = c;
  } else {
    rp = c;
    bp = x;
  }
  return [
    Math.round((rp + m) * 255),
    Math.round((gp + m) * 255),
    Math.round((bp + m) * 255),
  ];
}

export function bandRgb255(band: AudioBandHueKey): [number, number, number] {
  const c = AUDIO_BAND_HSL[band];
  return hslToRgb255(c.h, c.s, c.l);
}

export function bandRgb01(band: AudioBandHueKey): [number, number, number] {
  const [r, g, b] = bandRgb255(band);
  return [r / 255, g / 255, b / 255];
}

export function bandHex(band: AudioBandHueKey): string {
  const [r, g, b] = bandRgb255(band);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export function bandRgbGlsl(band: AudioBandHueKey): string {
  const [r, g, b] = bandRgb01(band);
  return `vec3(${r.toFixed(4)}, ${g.toFixed(4)}, ${b.toFixed(4)})`;
}

export function bandHsla(band: keyof typeof AUDIO_BAND_HSL, alpha: number) {
  const c = AUDIO_BAND_HSL[band];
  return `hsla(${c.h}, ${c.s}%, ${c.l}%, ${alpha})`;
}

/** Studio timeline trigger lanes (mid reads bass events offline). */
export type TimelineTriggerLaneKey = "kick" | "low" | "mid" | "high";

export type TriggerVisualKey = CoreAudioBand | "fx";

export type TriggerBandVisual = {
  short: string;
  label: string;
  iconActive: string;
  iconIdle: string;
};

/** Distinct icon + two-letter code used across trigger pickers, meters, and logs. */
export const TRIGGER_BAND_VISUAL: Record<TriggerVisualKey, TriggerBandVisual> = {
  none: {
    short: "—",
    label: "None",
    iconActive: "text-white/45",
    iconIdle: "text-white/28",
  },
  kick: {
    short: "KI",
    label: "Kick",
    iconActive: "text-fuchsia-300",
    iconIdle: "text-fuchsia-500/38",
  },
  snare: {
    short: "SN",
    label: "Snare",
    iconActive: "text-amber-300",
    iconIdle: "text-amber-500/38",
  },
  hat: {
    short: "HT",
    label: "Hat",
    iconActive: "text-teal-300",
    iconIdle: "text-teal-500/38",
  },
  bass: {
    short: "BA",
    label: "Bass",
    iconActive: "text-violet-400",
    iconIdle: "text-violet-500/38",
  },
  vocals: {
    short: "VO",
    label: "Vocals",
    iconActive: "text-orange-300",
    iconIdle: "text-orange-500/38",
  },
  low: {
    short: "LO",
    label: "Low",
    iconActive: "text-red-400",
    iconIdle: "text-red-500/38",
  },
  mid: {
    short: "MI",
    label: "Mid",
    iconActive: "text-emerald-400",
    iconIdle: "text-emerald-500/38",
  },
  high: {
    short: "HI",
    label: "High",
    iconActive: "text-sky-400",
    iconIdle: "text-sky-500/38",
  },
  beat: {
    short: "BE",
    label: "Beat",
    iconActive: "text-purple-400",
    iconIdle: "text-purple-500/38",
  },
  rhythm: {
    short: "RY",
    label: "Rhythm",
    iconActive: "text-violet-300",
    iconIdle: "text-violet-500/38",
  },
  specFast: {
    short: "SF",
    label: "Spec Fast",
    iconActive: "text-yellow-300",
    iconIdle: "text-yellow-500/38",
  },
  specSlow: {
    short: "SS",
    label: "Spec Slow",
    iconActive: "text-indigo-300",
    iconIdle: "text-indigo-500/38",
  },
  master: {
    short: "MA",
    label: "Master",
    iconActive: "text-white",
    iconIdle: "text-white/38",
  },
  fx: {
    short: "FX",
    label: "FX",
    iconActive: "text-white/85",
    iconIdle: "text-white/32",
  },
};
export function triggerBandVisual(band: string): TriggerBandVisual {
  return TRIGGER_BAND_VISUAL[band as TriggerVisualKey] ?? TRIGGER_BAND_VISUAL.none;
}

export function triggerBandShort(band: string): string {
  if (isModulationSourceBand(band)) return modSourceShort(band);
  if (band.startsWith("lfo:")) return lfoBandShort(band);
  return triggerBandVisual(band).short;
}

export function triggerBandLabel(band: string): string {
  if (band in TRIGGER_BAND_VISUAL) return TRIGGER_BAND_VISUAL[band as TriggerVisualKey].label;
  if (isModulationSourceBand(band)) return modSourceLabel(band);
  if (band.startsWith("lfo:")) return lfoBandLabel(band);
  if (/^orbit([1-9]|1[0-2])$/.test(band)) return band.replace("orbit", "Orbit ");
  if (band.startsWith("nech:")) {
    return NECH_TRIGGER_CATALOG.find((entry) => entry.band === band)?.label ?? band;
  }
  const roleMatch = /^role:(.+)$/.exec(band);
  if (roleMatch) return roleMatch[1]!.charAt(0).toUpperCase() + roleMatch[1]!.slice(1);
  return band;
}

export function triggerBandFillHex(band: TriggerVisualKey | string): string {
  if (band === "none") return "#888888";
  if (band === "fx") return "#c8c8c8";
  if (isModulationSourceBand(band)) return modSourceColor(band);
  if (band.startsWith("lfo:")) return "#f59e0b";
  if (band.startsWith("nech:")) {
    return NECH_TRIGGER_CATALOG.find((entry) => entry.band === band)?.color ?? "#22d3ee";
  }
  if (band in AUDIO_BAND_HSL) return bandHex(band as AudioBandHueKey);
  return "#888888";
}

export const TIMELINE_TRIGGER_LANES: ReadonlyArray<{
  key: TimelineTriggerLaneKey;
  eventKey: "kick" | "low" | "bass" | "high";
  label: string;
  shortLabel: string;
}> = [
  { key: "kick", eventKey: "kick", label: "Kick", shortLabel: TRIGGER_BAND_VISUAL.kick.short },
  { key: "low", eventKey: "low", label: "Low", shortLabel: TRIGGER_BAND_VISUAL.low.short },
  { key: "mid", eventKey: "bass", label: "Mid", shortLabel: TRIGGER_BAND_VISUAL.mid.short },
  { key: "high", eventKey: "high", label: "High", shortLabel: TRIGGER_BAND_VISUAL.high.short },
];

export function timelineLaneFill(key: TimelineTriggerLaneKey, alpha = 0.92): string {
  return bandHsla(key, alpha);
}

export function bandMeterFill(band: "kick" | "low" | "mid" | "high" | "beat"): string {
  if (band === "kick") return "bg-fuchsia-400";
  if (band === "low") return "bg-red-500";
  if (band === "mid") return "bg-emerald-500";
  if (band === "high") return "bg-sky-500";
  return "bg-purple-500";
}

export const AUDIO_BAND_DETAIL_TEXT: Record<CoreAudioBand, string> = {
  none: "text-muted-foreground",
  kick: "text-fuchsia-400",
  snare: "text-amber-500",
  hat: "text-teal-500",
  bass: "text-violet-500",
  vocals: "text-orange-500",
  low: "text-red-500",
  mid: "text-emerald-500",
  high: "text-sky-500",
  beat: "text-purple-500",
  rhythm: "text-violet-500",
  specFast: "text-yellow-500",
  specSlow: "text-indigo-500",
  master: "text-cyan-400",
};

export const AUDIO_BAND_DETAIL_BG: Record<CoreAudioBand, string> = {
  none: "bg-white/10",
  kick: "bg-fuchsia-500/20",
  snare: "bg-amber-500/20",
  hat: "bg-teal-500/20",
  bass: "bg-violet-500/20",
  vocals: "bg-orange-500/20",
  low: "bg-red-500/20",
  mid: "bg-emerald-500/20",
  high: "bg-sky-500/20",
  beat: "bg-purple-500/20",
  rhythm: "bg-violet-500/20",
  specFast: "bg-yellow-500/20",
  specSlow: "bg-indigo-500/20",
  master: "bg-cyan-500/20",
};
