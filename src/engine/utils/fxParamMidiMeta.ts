import { AVAILABLE_FX, CORE_FX_DEFINITIONS, CORE_FX_KEYS, type FXExtraParamSpec } from "../data/fxConfig";
import { DEFAULT_GLOBAL_SETTINGS } from "../data/defaultSettings";
import type { AppState, FolderConfig } from "../types/settings";
import { touchLiveSessionGlobal } from "./settingsUtils";
import {
  encodeFxMidiTarget,
  encodeFxMidiTargetEnabled,
  midiCc7ToFxValue,
  parseFxMidiTarget,
} from "./fxMidiParam";
import { FX_LAUNCH_SLOT_PREFIX } from "../types/midiMap";

type FxDefLike = {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  baseLabel?: string;
  extraParams?: readonly FXExtraParamSpec[];
};

const ALL_DEFS: FxDefLike[] = [...CORE_FX_DEFINITIONS, ...AVAILABLE_FX] as FxDefLike[];
const fxDefByKey = new Map(ALL_DEFS.map((d) => [d.key, d]));

export function getFxParamMidiRange(
  effectKey: string,
  slot: "base" | { paramKey: string },
): { min: number; max: number; step: number } | null {
  const d = fxDefByKey.get(effectKey);
  if (!d) return null;
  if (slot === "base") return { min: d.min, max: d.max, step: d.step };
  const ep = d.extraParams?.find((p) => p.key === slot.paramKey);
  if (!ep || !("min" in ep)) return null;
  return { min: ep.min, max: ep.max, step: ep.step };
}

export function encodeFxLaunchSlotAction(targetId: string): `${typeof FX_LAUNCH_SLOT_PREFIX}${string}` {
  return `${FX_LAUNCH_SLOT_PREFIX}${targetId}`;
}

export function buildFxLaunchSlotSelectOptions(activeFxList: readonly string[]) {
  const seen = new Set<string>();
  const out: { value: string; label: string; compact: string }[] = [];
  const keys = [...CORE_FX_KEYS, ...activeFxList];
  for (const k of keys) {
    const d = fxDefByKey.get(k);
    if (!d) continue;
    const onVal = encodeFxLaunchSlotAction(encodeFxMidiTargetEnabled(k));
    if (!seen.has(onVal)) {
      seen.add(onVal);
      out.push({
        value: onVal,
        label: `FX · ${d.label} · On/Off`,
        compact: `${d.label.slice(0, 6)} · On`,
      });
    }
    const baseVal = encodeFxLaunchSlotAction(encodeFxMidiTarget(k, "base"));
    if (!seen.has(baseVal)) {
      seen.add(baseVal);
      const baseLbl = (d as { baseLabel?: string }).baseLabel ?? "Amount";
      out.push({
        value: baseVal,
        label: `FX · ${d.label} · ${baseLbl}`,
        compact: `${d.label.slice(0, 7)} · ${baseLbl.slice(0, 5)}`,
      });
    }
    for (const p of d.extraParams ?? []) {
      if ("kind" in p && p.kind === "color") continue;
      if (!("min" in p)) continue;
      const val = encodeFxLaunchSlotAction(encodeFxMidiTarget(k, { paramKey: p.key }));
      if (seen.has(val)) continue;
      seen.add(val);
      out.push({
        value: val,
        label: `FX · ${d.label} · ${p.label}`,
        compact: `${d.label.slice(0, 6)} · ${p.key}`,
      });
    }
  }
  return out;
}

export function describeFxLaunchSlotAction(action: string): { label: string; compact: string } | null {
  if (!action.startsWith(FX_LAUNCH_SLOT_PREFIX)) return null;
  const parsed = parseFxMidiTarget(action.slice(FX_LAUNCH_SLOT_PREFIX.length));
  if (!parsed) return null;
  const d = fxDefByKey.get(parsed.effectKey);
  if (!d) return { label: action, compact: action.slice(FX_LAUNCH_SLOT_PREFIX.length, 14) };
  if (parsed.enabledToggle) {
    return { label: `FX · ${d.label} · On/Off`, compact: `${d.label.slice(0, 6)} · On` };
  }
  if (parsed.paramKey == null) {
    const bl = (d as { baseLabel?: string }).baseLabel ?? "Mix";
    return { label: `FX · ${d.label} · ${bl}`, compact: `${d.label.slice(0, 7)} · ${bl.slice(0, 5)}` };
  }
  const ep = d.extraParams?.find((x) => "key" in x && x.key === parsed.paramKey);
  const pl = ep && "label" in ep ? ep.label : parsed.paramKey;
  return { label: `FX · ${d.label} · ${pl}`, compact: `${d.label.slice(0, 6)} · ${parsed.paramKey}` };
}

export function patchGlobalFxEnabledToggle(
  s: AppState,
  effectKey: string,
  enabled?: boolean,
): AppState | null {
  const fxKey = effectKey as keyof FolderConfig["fx"];
  const curFx = s.global.fx[fxKey];
  const base =
    curFx && typeof curFx === "object"
      ? curFx
      : (DEFAULT_GLOBAL_SETTINGS.fx[fxKey] as (typeof s.global.fx)[typeof fxKey] | undefined);
  if (!base || typeof base !== "object") return null;
  const next = enabled ?? !base.enabled;
  if (curFx && typeof curFx === "object" && curFx.enabled === next) return null;
  return {
    ...s,
    global: touchLiveSessionGlobal(
      {
        ...s.global,
        fx: { ...s.global.fx, [fxKey]: { ...base, enabled: next } },
      },
      s.folders,
    ),
  };
}

export type FxMidiRangeOverride = { min: number; max: number; step: number };

/** Apply a learned 0–127 CC value to global `fx` (same semantics as `useMidiFxParamRouting`). */
export function patchGlobalFxFromMidiCc(
  s: AppState,
  targetId: string,
  cc7: number,
  rangeOverride?: FxMidiRangeOverride,
): AppState | null {
  const parsed = parseFxMidiTarget(targetId);
  if (!parsed || parsed.enabledToggle) return null;
  const range =
    rangeOverride ??
    getFxParamMidiRange(
      parsed.effectKey,
      parsed.paramKey == null ? "base" : { paramKey: parsed.paramKey },
    );
  if (!range) return null;
  const nextVal = midiCc7ToFxValue(cc7, range.min, range.max, range.step);
  const fxKey = parsed.effectKey as keyof FolderConfig["fx"];
  const curFx = s.global.fx[fxKey];
  if (!curFx || typeof curFx !== "object") return null;

  if (parsed.paramKey == null) {
    if (curFx.base === nextVal) return null;
    return {
      ...s,
      global: touchLiveSessionGlobal(
        {
          ...s.global,
          fx: { ...s.global.fx, [fxKey]: { ...curFx, base: nextVal } },
        },
        s.folders,
      ),
    };
  }

  const rawPrev = curFx.params?.[parsed.paramKey];
  const prev = typeof rawPrev === "number" ? rawPrev : Number(rawPrev);
  if (Number.isFinite(prev) && prev === nextVal) return null;

  return {
    ...s,
    global: touchLiveSessionGlobal(
      {
        ...s.global,
        fx: {
          ...s.global.fx,
          [fxKey]: {
            ...curFx,
            params: { ...(curFx.params ?? {}), [parsed.paramKey]: nextVal },
          },
        },
      },
      s.folders,
    ),
  };
}

export function stripAudioModulationForFxTarget(s: AppState, targetId: string): AppState {
  const parsed = parseFxMidiTarget(targetId);
  if (!parsed) return s;
  const fxKey = parsed.effectKey as keyof FolderConfig["fx"];
  const curFx = s.global.fx[fxKey];
  if (!curFx || typeof curFx !== "object") return s;

  if (parsed.paramKey == null) {
    if ((curFx.syncBand === "none" || curFx.syncBand === undefined) && (curFx.syncMultiplier ?? 1) === 1)
      return s;
    return {
      ...s,
      global: touchLiveSessionGlobal(
        {
          ...s.global,
          fx: {
            ...s.global.fx,
            [fxKey]: {
              ...curFx,
              syncBand: "none",
              syncMultiplier: 1,
            },
          },
        },
        s.folders,
      ),
    };
  }

  const ps = { ...(curFx.paramSync || {}) };
  const cur = ps[parsed.paramKey!];
  if (!cur || cur.band === "none") return s;
  ps[parsed.paramKey!] = { ...cur, band: "none", multiplier: 1, isTrigger: false };
  return {
    ...s,
    global: touchLiveSessionGlobal(
      {
        ...s.global,
        fx: {
          ...s.global.fx,
          [fxKey]: { ...curFx, paramSync: ps },
        },
      },
      s.folders,
    ),
  };
}
