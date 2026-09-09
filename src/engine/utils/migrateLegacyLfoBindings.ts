import type {
  AudioBand,
  FXConfig,
  FolderConfig,
  LfoInstanceBand,
  LfoWaveform,
  ModulationSettings,
  ModWaveform,
} from "../types/settings";
import { applyParamBinding, bindingAllowsTriggeredMode, paramBindingFromFx } from "./paramBinding";
import { isLegacyLfoBand, lfoWaveformFromBand } from "./lfoBands";
import { isEgBand, normalizeModulation } from "./modulationSources";

function paramIsRawTriggered(fx: FXConfig, paramKey: string): boolean {
  if (paramKey === "base") return fx.isTrigger === true;
  return fx.paramSync?.[paramKey]?.isTrigger === true;
}

function demoteInvalidTriggeredBindings(fx: FXConfig): FXConfig {
  let next = fx;
  for (const paramKey of ["base", ...Object.keys(fx.paramSync ?? {})]) {
    if (!paramIsRawTriggered(next, paramKey)) continue;
    const binding = paramBindingFromFx(next, paramKey);
    if (bindingAllowsTriggeredMode(binding.source)) continue;
    next = applyParamBinding(next, paramKey, { ...binding, mode: "follow" });
  }
  return next;
}

function clearDirectEnvelopeSources(fx: FXConfig): FXConfig {
  let next = fx;
  for (const paramKey of ["base", ...Object.keys(next.paramSync ?? {})]) {
    const binding = paramBindingFromFx(next, paramKey);
    if (!isEgBand(binding.source)) continue;
    next = applyParamBinding(next, paramKey, { ...binding, source: "none", mode: "follow" });
  }
  return next;
}

const LEGACY_TO_MOD: Record<
  LfoWaveform,
  { waveform: ModWaveform; phase: number; slot: 1 | 2 | 3 | 4 }
> = {
  sin: { waveform: "sin", phase: 0, slot: 1 },
  cos: { waveform: "sin", phase: 0.25, slot: 1 },
  tri: { waveform: "tri", phase: 0, slot: 2 },
  saw: { waveform: "saw", phase: 0, slot: 3 },
  square: { waveform: "square", phase: 0, slot: 4 },
};

function legacyInstanceBand(wave: LfoWaveform): LfoInstanceBand {
  return `lfo:${LEGACY_TO_MOD[wave].slot}` as LfoInstanceBand;
}

function configureLegacyLfoSlot(
  modulation: ModulationSettings,
  wave: LfoWaveform,
  rate: number,
): ModulationSettings {
  const map = LEGACY_TO_MOD[wave];
  const idx = map.slot - 1;
  const lfos = modulation.lfos.map((lfo, i) => {
    if (i !== idx) return lfo;
    return {
      ...lfo,
      enabled: true,
      waveform: map.waveform,
      rate: Math.max(0.01, rate),
      phase: map.phase,
    };
  });
  return { ...modulation, lfos };
}

export function migrateLegacyLfoBinding(
  band: AudioBand,
  depth: number,
  modulation: ModulationSettings | undefined,
): { band: AudioBand; depth: number; modulation: ModulationSettings } {
  const mod = normalizeModulation(modulation);
  if (!isLegacyLfoBand(band)) {
    return { band, depth, modulation: mod };
  }

  const wave = lfoWaveformFromBand(band)!;
  const nextMod = configureLegacyLfoSlot(mod, wave, depth || 1);
  return {
    band: legacyInstanceBand(wave),
    depth: 1,
    modulation: nextMod,
  };
}

export function migrateLegacyLfoOnFxConfig(
  fx: FXConfig,
  modulation: ModulationSettings | undefined,
): { fx: FXConfig; modulation: ModulationSettings } {
  let mod = normalizeModulation(modulation);
  let nextFx = clearDirectEnvelopeSources(demoteInvalidTriggeredBindings(fx));

  for (const paramKey of ["base", ...Object.keys(nextFx.paramSync ?? {})]) {
    const binding = paramBindingFromFx(nextFx, paramKey);
    if (!isLegacyLfoBand(binding.source)) continue;
    const migrated = migrateLegacyLfoBinding(binding.source, binding.depth, mod);
    mod = migrated.modulation;
    nextFx = applyParamBinding(nextFx, paramKey, {
      ...binding,
      source: migrated.band,
      depth: migrated.depth,
    });
  }

  return { fx: nextFx, modulation: mod };
}

export function migrateLegacyLfoOnFxMap(
  fx: FolderConfig["fx"],
  modulation?: ModulationSettings,
): { fx: FolderConfig["fx"]; modulation: ModulationSettings } {
  let mod = normalizeModulation(modulation);
  let out = fx;
  for (const fxKey of Object.keys(fx) as (keyof typeof fx)[]) {
    const row = out[fxKey];
    if (!row) continue;
    const migrated = migrateLegacyLfoOnFxConfig(row, mod);
    mod = migrated.modulation;
    out = { ...out, [fxKey]: migrated.fx };
  }
  return { fx: out, modulation: mod };
}