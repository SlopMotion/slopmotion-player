import type { FxMidiParamBinding } from "../types/settings";

/** `${effectKey}::base` */
export const FX_MIDI_SUFFIX_BASE = "::base";
/** `${effectKey}::enabled` — toggle FX on/off from a MIDI pad */
export const FX_MIDI_SUFFIX_ENABLED = "::enabled";
/** `${effectKey}::param:${key}` — param keys avoid `:` in practice */
export const FX_MIDI_PREFIX_PARAM = "::param:";

export function encodeFxMidiTarget(effectKey: string, slot: "base" | { paramKey: string }): string {
  if (slot === "base") return `${effectKey}${FX_MIDI_SUFFIX_BASE}`;
  return `${effectKey}${FX_MIDI_PREFIX_PARAM}${slot.paramKey}`;
}

export function encodeFxMidiTargetEnabled(effectKey: string): string {
  return `${effectKey}${FX_MIDI_SUFFIX_ENABLED}`;
}

export function parseFxMidiTarget(
  targetId: string,
): { effectKey: string; paramKey: string | null; enabledToggle?: boolean } | null {
  if (targetId.endsWith(FX_MIDI_SUFFIX_ENABLED)) {
    return {
      effectKey: targetId.slice(0, -FX_MIDI_SUFFIX_ENABLED.length),
      paramKey: null,
      enabledToggle: true,
    };
  }
  if (targetId.endsWith(FX_MIDI_SUFFIX_BASE)) {
    return {
      effectKey: targetId.slice(0, -FX_MIDI_SUFFIX_BASE.length),
      paramKey: null,
    };
  }
  const i = targetId.indexOf(FX_MIDI_PREFIX_PARAM);
  if (i === -1) return null;
  const paramKey = targetId.slice(i + FX_MIDI_PREFIX_PARAM.length);
  if (!paramKey) return null;
  return { effectKey: targetId.slice(0, i), paramKey };
}

export function snapMidiParamToStep(raw: number, step: number): number {
  if (!Number.isFinite(step) || step <= 0) return raw;
  const snapped = Math.round(raw / step) * step;
  return Number.parseFloat(snapped.toPrecision(12));
}

export function midiCc7ToFxValue(cc7: number, min: number, max: number, step: number): number {
  const t = Math.max(0, Math.min(127, cc7)) / 127;
  const raw = min + (max - min) * t;
  const snapped = snapMidiParamToStep(raw, step);
  return Math.min(max, Math.max(min, snapped));
}

export function sanitizeFxMidiParamBindings(raw: unknown): FxMidiParamBinding[] {
  if (!Array.isArray(raw)) return [];
  const out: FxMidiParamBinding[] = [];
  for (const row of raw) {
    if (!row || typeof row !== "object") continue;
    const r = row as Record<string, unknown>;
    const targetId = typeof r.targetId === "string" ? r.targetId : "";
    if (!targetId || !parseFxMidiTarget(targetId)) continue;
    const min = typeof r.min === "number" ? r.min : 0;
    const max = typeof r.max === "number" ? r.max : 1;
    const step =
      typeof r.step === "number" && Number.isFinite(r.step) && r.step > 0 ? r.step : 0.01;
    const channel = typeof r.channel === "number" ? Math.floor(r.channel) : 0;
    const cc = typeof r.cc === "number" ? Math.floor(r.cc) : 0;
    if (!Number.isFinite(channel) || channel < 0 || channel > 15) continue;
    if (!Number.isFinite(cc) || cc < 0 || cc > 127) continue;
    out.push({
      targetId,
      min: Math.min(min, max),
      max: Math.max(min, max),
      step,
      channel,
      cc,
    });
  }
  /** Last writer wins shared CC or duplicate targets (persisted quirks). */
  const byWire = new Map<string, FxMidiParamBinding>();
  for (let i = out.length - 1; i >= 0; i--) {
    const row = out[i]!;
    byWire.set(`${row.channel}:${row.cc}`, row);
  }
  return [...byWire.values()];
}

export function formatFxMidiCcWire(chZero: number, cc: number): string {
  const ch1 = Math.max(1, Math.min(16, Math.floor(chZero + 1)));
  const n = Math.max(0, Math.min(127, Math.floor(cc)));
  return `Ch${ch1}·CC${n}`;
}
