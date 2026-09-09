import { AVAILABLE_FX, CORE_FX_DEFINITIONS } from "../data/fxConfig";
import { bandHsla, triggerBandShort } from "../theme/audioBands";
import type { HighwayChannel } from "./triggerDebugHighway";

export type TriggerLogChannel = HighwayChannel | "fx";

export type TriggerLogEntry = {
  id: number;
  wallMs: number;
  /** Track or session time in seconds (studio playhead when available). */
  timeSec: number;
  beat: number;
  channel: TriggerLogChannel;
  intensity: number;
  /** FX descriptor key (`fxKey` or `fxKey:paramKey`). */
  fxKey?: string;
  fxLabel?: string;
  /** Collapsed duplicate count (starts at 1). */
  repeat: number;
};

export type TriggerLogFilter = TriggerLogChannel | "all";

const MAX_ENTRIES = 120;
const DEDUP_MS = 140;

let nextId = 1;
let entries: TriggerLogEntry[] = [];
const listeners = new Set<() => void>();

const FX_LABEL = new Map<string, string>(
  [...CORE_FX_DEFINITIONS, ...AVAILABLE_FX].map((fx) => [fx.key, fx.label]),
);

export function fxTriggerLabel(key: string): string {
  const [fxKey, paramKey] = key.split(":");
  const base = FX_LABEL.get(fxKey ?? key) ?? fxKey ?? key;
  return paramKey ? `${base} · ${paramKey}` : base;
}

export function getTriggerLogEntries(): readonly TriggerLogEntry[] {
  return entries;
}

export function clearTriggerLog() {
  entries = [];
  notify();
}

export function subscribeTriggerLog(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function notify() {
  for (const fn of listeners) fn();
}

export function pushTriggerLogEvent(input: {
  wallMs?: number;
  timeSec: number;
  beat: number;
  channel: TriggerLogChannel;
  intensity?: number;
  fxKey?: string;
  fxLabel?: string;
}) {
  const wallMs = input.wallMs ?? performance.now();
  const intensity = Math.max(0, Math.min(1, input.intensity ?? 1));
  const last = entries[0];
  if (
    last &&
    last.channel === input.channel &&
    last.fxKey === input.fxKey &&
    wallMs - last.wallMs < DEDUP_MS
  ) {
    last.repeat += 1;
    last.intensity = Math.max(last.intensity, intensity);
    last.wallMs = wallMs;
    last.timeSec = input.timeSec;
    last.beat = input.beat;
    notify();
    return;
  }

  entries.unshift({
    id: nextId++,
    wallMs,
    timeSec: input.timeSec,
    beat: input.beat,
    channel: input.channel,
    intensity,
    fxKey: input.fxKey,
    fxLabel: input.fxLabel ?? (input.fxKey ? fxTriggerLabel(input.fxKey) : undefined),
    repeat: 1,
  });
  if (entries.length > MAX_ENTRIES) entries.length = MAX_ENTRIES;
  notify();
}

export function formatTriggerLogBeat(beat: number) {
  const bar = Math.floor(beat / 4) + 1;
  const beatInBar = (Math.floor(beat) % 4) + 1;
  return `${String(bar).padStart(2, "0")}.${beatInBar}`;
}

export function formatTriggerLogTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  const ss = s.toFixed(2).padStart(5, "0");
  return `${String(m).padStart(2, "0")}:${ss}`;
}

export function triggerLogChannelColor(channel: TriggerLogChannel, alpha = 0.92) {
  if (channel === "fx") return "hsla(0, 0%, 78%, 0.92)";
  if (channel === "mid") return bandHsla("mid", alpha);
  return bandHsla(channel, alpha);
}

export const TRIGGER_LOG_FILTERS: ReadonlyArray<{ key: TriggerLogFilter; label: string }> = [
  { key: "all", label: "All" },
  { key: "kick", label: triggerBandShort("kick") },
  { key: "snare", label: triggerBandShort("snare") },
  { key: "hat", label: triggerBandShort("hat") },
  { key: "low", label: triggerBandShort("low") },
  { key: "mid", label: triggerBandShort("mid") },
  { key: "high", label: triggerBandShort("high") },
  { key: "beat", label: triggerBandShort("beat") },
  { key: "rhythm", label: triggerBandShort("rhythm") },
  { key: "fx", label: triggerBandShort("fx") },
];
