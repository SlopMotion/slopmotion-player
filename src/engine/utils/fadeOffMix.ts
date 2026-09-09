import type { AudioBands } from "../hooks/useAudioAnalyzer";
import type { FXConfig } from "../types/settings";
import { getHydraWindow } from "../types/hydraWindow";
import { TRIGGER_SILENCE_DBFS } from "./adaptiveMusicGate";
import { computeFxAmount, getBandValue, getTriggerBandLevel } from "./fxRuntime";
import { matrixTargetBindingFromFx } from "./paramBinding";
import { bindingMapSignalRange, mapSignalToParam } from "./paramMapRange";

const FADE_OFF_KEY = "fadeOff";

/** True when silence fade and audio depth are both zero. */
export function isFadeOffNoOp(
  fxCfg: Pick<FXConfig, "base" | "syncMultiplier"> | undefined,
): boolean {
  if (!fxCfg) return true;
  const base = fxCfg.base ?? 0;
  const mult = fxCfg.syncMultiplier ?? 0;
  return base < 0.00001 && mult < 0.00001;
}

/** Skip fade when there is no live audio program (mic off / analyzer idle). */
export function fadeOffAudioInputActive(): boolean {
  const dbfs = getHydraWindow().masterDbfs;
  if (typeof dbfs !== "number" || !Number.isFinite(dbfs)) return false;
  return dbfs >= TRIGGER_SILENCE_DBFS;
}

/** Audio presence 0..1 — higher means louder (less fade). */
export function fadeOffPresence(
  fxCfg: FXConfig,
  bands: (AudioBands & Record<string, number>) | undefined,
): number {
  const syncBand = fxCfg.syncBand ?? "none";
  if (syncBand === "none") {
    if (bands && typeof bands.master === "number") return bands.master;
    const win = getHydraWindow();
    return typeof win.masterLevel === "number" ? win.masterLevel : 0;
  }
  return getBandValue(FADE_OFF_KEY, syncBand, bands);
}

/** Black blend mix 0..1 — fades toward black when audio is quiet. */
export function computeFadeOffBlackMix(
  fxCfg: FXConfig | undefined,
  bands: (AudioBands & Record<string, number>) | undefined,
): number {
  if (!fxCfg || !fxCfg.enabled) return 0;
  if (isFadeOffNoOp(fxCfg)) return 0;
  if (!fadeOffAudioInputActive()) return 0;

  const presence = fadeOffPresence(fxCfg, bands);
  const p = Math.max(0, Math.min(1, presence));
  const baseAmt = fadeOffSilenceAmount(fxCfg, bands);
  const mult = Math.max(0, Math.min(1, fxCfg.syncMultiplier ?? 0));
  return Math.max(0, Math.min(1, (1 - p) * (baseAmt + mult)));
}

export function fadeOffSilenceAmount(
  fxCfg: FXConfig,
  bands: (AudioBands & Record<string, number>) | undefined,
): number {
  const ps = fxCfg.paramSync?.base;
  if (ps?.band && ps.band !== "none") {
    const binding = matrixTargetBindingFromFx(fxCfg, FADE_OFF_KEY, "base", {
      staticValue: fxCfg.base ?? 0,
      paramMin: 0,
      paramMax: 1,
    });
    const val = getTriggerBandLevel(binding.source, bands);
    const range = bindingMapSignalRange(binding);
    const out = mapSignalToParam(val, binding.mapMin, binding.mapMax, range);
    return Math.max(0, Math.min(1, out));
  }
  return Math.max(0, Math.min(1, fxCfg.base ?? 0));
}

/**
 * Inspector playhead for Silence fade.
 * Matrix routes amount via paramSync.base; the FX row maps presence/envelope via syncBand.
 */
export function fadeOffMappedLiveValue(
  fxCfg: FXConfig,
  bands: (AudioBands & Record<string, number>) | undefined,
): number | null {
  const ps = fxCfg.paramSync?.base;
  if (ps?.band && ps.band !== "none") {
    return fadeOffSilenceAmount(fxCfg, bands);
  }
  if ((fxCfg.syncBand ?? "none") === "none") return null;
  return computeFxAmount(FADE_OFF_KEY, fxCfg, bands, { requireEnabled: false });
}
