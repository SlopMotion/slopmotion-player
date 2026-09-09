import type { ParamSync } from "../types/settings";
import { DEFAULT_VIDEO_SPEED_BASE } from "./loopPlayback";
import { isLegacyLfoBand } from "./lfoBands";
import { bindingIsTriggered, type ParamBinding } from "./paramBinding";
import { isLfoInstanceBand } from "./modulationSources";

export type MapSignalRange = "0-1" | "-1-1";

export function bindingMapSignalRange(binding: ParamBinding): MapSignalRange {
  if (bindingIsTriggered(binding)) return "0-1";
  if (isLfoInstanceBand(binding.source) || isLegacyLfoBand(binding.source)) return "-1-1";
  return "0-1";
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/** Map a live signal into [mapMin, mapMax]. */
export function mapSignalToParam(
  signal: number,
  mapMin: number,
  mapMax: number,
  range: MapSignalRange,
): number {
  let t: number;
  if (range === "-1-1") {
    const bipolar = Math.max(-1, Math.min(1, signal * 2 - 1));
    t = (bipolar + 1) / 2;
  } else {
    t = clamp01(signal);
  }
  return mapMin + t * (mapMax - mapMin);
}

export function legacyMapRangeFromOffset(
  staticValue: number,
  multiplier: number,
): { mapMin: number; mapMax: number } {
  if (multiplier >= 0) {
    return { mapMin: staticValue, mapMax: staticValue + multiplier };
  }
  return { mapMin: staticValue + multiplier, mapMax: staticValue };
}

export function resolveBindingMapRange(
  mapMin: number | undefined,
  mapMax: number | undefined,
  staticValue: number,
  multiplier: number,
  paramMin: number,
  paramMax: number,
): { mapMin: number; mapMax: number } {
  if (typeof mapMin === "number" && typeof mapMax === "number") {
    return { mapMin, mapMax };
  }
  if (multiplier !== 0) {
    return legacyMapRangeFromOffset(staticValue, multiplier);
  }
  return { mapMin: paramMin, mapMax: paramMax };
}

export function defaultMapRangeForBind(
  staticValue: number,
  paramMin: number,
  paramMax: number,
  multiplier = 1,
): { mapMin: number; mapMax: number } {
  if (multiplier !== 0 && multiplier !== 1) {
    return legacyMapRangeFromOffset(staticValue, multiplier);
  }
  return { mapMin: paramMin, mapMax: paramMax };
}

/** Trigger/envelope map-range defaults — static slider mins can differ (e.g. Luminosity 0, trigger floor −1). */
export function triggerMapRangeDefaults(
  fxKey: string,
  paramKey: string,
  paramMin: number,
  paramMax: number,
): { mapMin: number; mapMax: number } {
  if ((fxKey === "colorAdjust" || fxKey === "colorLayer") && paramKey === "base") {
    return { mapMin: -1, mapMax: paramMax };
  }
  if (fxKey === "videoSpeed" && paramKey === "base") {
    return { mapMin: paramMin, mapMax: DEFAULT_VIDEO_SPEED_BASE };
  }
  if (fxKey === "zoom" && paramKey === "base") {
    return { mapMin: 1, mapMax: paramMax };
  }
  if (fxKey === "rotate" && paramKey === "base") {
    return { mapMin: 0, mapMax: paramMax };
  }
  return { mapMin: paramMin, mapMax: paramMax };
}

export function coerceTriggerMapRange(
  fxKey: string,
  paramKey: string,
  sync: ParamSync,
  limits: { min: number; max: number },
): ParamSync {
  if (!sync.isTrigger || sync.band === "none") return sync;
  const defaults = triggerMapRangeDefaults(fxKey, paramKey, limits.min, limits.max);
  return {
    ...sync,
    mapMin: typeof sync.mapMin === "number" ? sync.mapMin : defaults.mapMin,
    mapMax: typeof sync.mapMax === "number" ? sync.mapMax : defaults.mapMax,
  };
}

/** Slider bounds for Min/Max map fields — triggered Luminosity can dip below the static floor. */
export function triggerMapSliderBounds(
  fxKey: string,
  paramKey: string,
  paramMin: number,
  paramMax: number,
  triggered: boolean,
): { min: number; max: number } {
  if (!triggered) return { min: paramMin, max: paramMax };
  if ((fxKey === "colorAdjust" || fxKey === "colorLayer") && paramKey === "base") {
    return { min: -1, max: paramMax };
  }
  if (fxKey === "zoom" && paramKey === "base") return { min: 1, max: paramMax };
  if (fxKey === "rotate" && paramKey === "base") return { min: 0, max: paramMax };
  return { min: paramMin, max: paramMax };
}