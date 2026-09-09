import type { AudioBands } from "../hooks/useAudioAnalyzer";
import type { AudioBand, FXConfig, ModulationSourceBand } from "../types/settings";
import { AVAILABLE_FX, CORE_FX_DEFINITIONS } from "../data/fxConfig";
import { getHydraWindow } from "../types/hydraWindow";
import { isLegacyLfoBand } from "./lfoBands";
import { isModulationSourceBand, modulationSourceLevel } from "./modulationSources";
import { migrateLegacyLfoBinding } from "./migrateLegacyLfoBindings";
import { bindingIsTriggered, paramBindingFromFx } from "./paramBinding";
import { bindingMapSignalRange, mapSignalToParam } from "./paramMapRange";
import { orbitNumberFromBand, stemRoleFromBand } from "./orbitTriggerBands";
import { isNechAnalysisBand } from "./nechTriggerBands";

export interface FxAmountOptions {
  clampMin?: number;
  clampMax?: number;
  /** Param definition range for map fallback (can differ from clamp, e.g. Luminosity 0–1 static, −1–1 mapped). */
  paramMin?: number;
  paramMax?: number;
  /** Returned when the effect is disabled. Default 0. */
  whenDisabled?: number;
  /** When false, skip the enabled gate (rare). Default true. */
  requireEnabled?: boolean;
  /** Post-process base + audio sum before optional clamp. */
  map?: (value: number, fxCfg: FXConfig) => number;
}

/** Raw band level for threshold crossing (never the pulse envelope). */
export function getTriggerBandLevel(
  band: AudioBand,
  bandsData: (AudioBands & Record<string, number>) | undefined,
  lfoRate = 1,
): number {
  if (band === "none") return 0;

  if (isModulationSourceBand(band)) return modulationSourceLevel(band);

  if (isLegacyLfoBand(band)) {
    const mod = getHydraWindow().hydraModulation?.config;
    const migrated = migrateLegacyLfoBinding(band, lfoRate, mod);
    return modulationSourceLevel(migrated.band as ModulationSourceBand);
  }

  const win = getHydraWindow();

  if (band === "kick") {
    if (bandsData && typeof bandsData.kick === "number") return bandsData.kick;
    return typeof win.kick === "number" ? win.kick : 0;
  }
  if (band === "low") return win.low ?? 0;
  if (band === "mid") return win.mid ?? 0;
  if (band === "high") return win.high ?? 0;
  if (band === "beat") return win.beat ?? 0;
  if (band === "master") {
    if (bandsData && typeof bandsData.master === "number") return bandsData.master;
    return typeof win.masterLevel === "number" ? win.masterLevel : 0;
  }

  const orbit = orbitNumberFromBand(band);
  if (orbit != null) {
    const fromPulse = win.studioOrbitPulse?.[orbit];
    if (typeof fromPulse === "number") return fromPulse;
    if (bandsData) {
      const key = `orbit${orbit}`;
      if (typeof bandsData[key] === "number") return bandsData[key]!;
    }
    return 0;
  }

  const role = stemRoleFromBand(band);
  if (role != null) {
    const fromPulse = win.studioRolePulse?.[role];
    if (typeof fromPulse === "number") return fromPulse;
    if (bandsData && typeof bandsData[band] === "number") return bandsData[band]!;
    return 0;
  }

  if (isNechAnalysisBand(band)) {
    if (bandsData && typeof bandsData[band] === "number") return bandsData[band]!;
    return 0;
  }

  if (bandsData) return bandsData[band] || 0;
  return 0;
}

/** Band level or hit-envelope output for base / paramSync audio mapping. */
export function getBandValue(
  fxKey: string,
  band: AudioBand,
  bandsData: (AudioBands & Record<string, number>) | undefined,
  paramKey?: string,
  fxCfg?: FXConfig,
): number {
  const win = getHydraWindow();
  const fxRow =
    fxCfg ?? win.hydraSettings?.fx?.[fxKey as keyof typeof win.hydraSettings.fx];
  const envelopeKey = paramKey ? `${fxKey}:${paramKey}` : fxKey;
  const binding = fxRow ? paramBindingFromFx(fxRow, paramKey ?? "base") : null;

  if (binding && bindingIsTriggered(binding)) {
    return win.hydraEnvelopes?.[envelopeKey] || 0;
  }

  const source = binding?.source ?? band;
  const lfoRate = binding?.depth ?? 1;
  return getTriggerBandLevel(source, bandsData, lfoRate);
}

function clampValue(value: number, min?: number, max?: number): number {
  let out = value;
  if (min !== undefined) out = Math.max(min, out);
  if (max !== undefined) out = Math.min(max, out);
  return out;
}

/** Base slider or mapped min/max range, with optional clamp and disabled gate. */
export function computeFxAmount(
  fxKey: string,
  fxCfg: FXConfig | undefined,
  bands: (AudioBands & Record<string, number>) | undefined,
  options: FxAmountOptions = {},
): number {
  const {
    clampMin,
    clampMax,
    paramMin: optParamMin,
    paramMax: optParamMax,
    whenDisabled = 0,
    requireEnabled = true,
    map,
  } = options;

  if (requireEnabled && (!fxCfg || !fxCfg.enabled)) return whenDisabled;

  const paramMin = optParamMin ?? clampMin ?? 0;
  const paramMax = optParamMax ?? clampMax ?? 1;
  const binding = paramBindingFromFx(fxCfg!, "base", {
    staticValue: fxCfg!.base ?? 0,
    paramMin,
    paramMax,
    fxKey,
  });

  if (binding.source === "none") {
    let raw = fxCfg!.base;
    if (map) raw = map(raw, fxCfg!);
    if (clampMin !== undefined || clampMax !== undefined) {
      return clampValue(raw, clampMin, clampMax);
    }
    return raw;
  }

  const val = getBandValue(fxKey, binding.source, bands, undefined, fxCfg);
  const range = bindingMapSignalRange(binding);
  let raw = mapSignalToParam(val, binding.mapMin, binding.mapMax, range);
  if (map) raw = map(raw, fxCfg!);
  if (clampMin !== undefined || clampMax !== undefined) {
    return clampValue(raw, clampMin, clampMax);
  }
  return raw;
}

/** Static param from fx.params plus optional paramSync mapping. */
export function computeParamValue(
  fxKey: string,
  fxCfg: FXConfig | undefined,
  paramKey: string,
  defaultVal: number,
  bands: (AudioBands & Record<string, number>) | undefined,
  defFxKey?: string,
): number {
  if (!fxCfg) return defaultVal;

  const base = (fxCfg.params?.[paramKey] as number) ?? defaultVal;
  const ps = fxCfg.paramSync?.[paramKey];

  if (!ps || ps.band === "none") return base;

  const defKey = defFxKey ?? fxKey;
  const def = [...CORE_FX_DEFINITIONS, ...AVAILABLE_FX].find((d) => d.key === defKey);
  const spec = def && "extraParams" in def
    ? def.extraParams?.find(
        (p) => p && typeof p === "object" && "key" in p && p.key === paramKey,
      )
    : undefined;
  const paramMin = spec && typeof spec === "object" && "min" in spec ? spec.min : defaultVal;
  const paramMax = spec && typeof spec === "object" && "max" in spec ? spec.max : defaultVal;

  const binding = paramBindingFromFx(fxCfg, paramKey, {
    staticValue: base,
    paramMin,
    paramMax,
    fxKey,
  });
  const val = getBandValue(fxKey, binding.source, bands, paramKey, fxCfg);
  const range = bindingMapSignalRange(binding);
  let out = mapSignalToParam(val, binding.mapMin, binding.mapMax, range);

  if (spec && typeof spec === "object" && "min" in spec && "max" in spec) {
    out = clampValue(out, spec.min, spec.max);
  }

  return out;
}

/** Shorthand for Hydra lazy getters: clamp 0–1 amount. */
export const FX_AMT_01: FxAmountOptions = { clampMin: 0, clampMax: 1 };

/** UI max for Pixelate “cells across”; at this value the effect should be identity. */
export const PIXELATE_CELLS_MAX = 512;

/** Live VJ default — coarse enough to read on stage, fine enough to keep detail. */
export const PIXELATE_DEFAULT_CELLS = 64;

export const PIXELATE_AMT_OPTS: FxAmountOptions = {
  clampMin: 4,
  clampMax: PIXELATE_CELLS_MAX,
  paramMin: 4,
  paramMax: PIXELATE_CELLS_MAX,
  whenDisabled: PIXELATE_CELLS_MAX,
};

/** Hydra `pixelate` quantizes UVs — use canvas-sized cells for a true no-op. */
export function pixelateIdentityCells(): number {
  if (typeof document !== "undefined") {
    const canvas = document.getElementById("hydra-canvas");
    if (canvas instanceof HTMLCanvasElement) {
      return Math.max(canvas.width, canvas.height, 1);
    }
  }
  return 4096;
}

export function resolvePixelateCellCount(rawCells: number): number {
  const cells = Math.round(rawCells);
  return cells >= PIXELATE_CELLS_MAX ? pixelateIdentityCells() : cells;
}
