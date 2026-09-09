import type { AudioBand, FolderConfig, FXConfig } from "../types/settings";
import { HYDRA_FX_TEMPLATE_RAW } from "../data/defaultHydraFxMap";
import { isTriggerOnlyFx, isTriggerOnlyPulseAmountFx } from "../data/fxConfig";
import { ACCELERATE_DURATION_DEFAULT } from "./accelerateFx";
import { SLOWMO_DURATION_DEFAULT, SLOWMO_MOTION_BLUR_DEFAULT } from "./slowmoFx";

function pulseDurationDefault(fxKey: string, template?: FXConfig): number {
  if (typeof template?.params?.duration === "number") return template.params.duration;
  return fxKey === "accelerate" ? ACCELERATE_DURATION_DEFAULT : SLOWMO_DURATION_DEFAULT;
}

function templateBandFor(fxKey: string): AudioBand {
  const template = HYDRA_FX_TEMPLATE_RAW[fxKey as keyof typeof HYDRA_FX_TEMPLATE_RAW];
  return template?.syncBand && template.syncBand !== "none" ? template.syncBand : "kick";
}

/** Ensure enabled trigger-only playback FX rows stay trigger-ready when mapped. */
export function normalizeTriggerOnlyPlaybackFxRow(
  fxKey: string,
  row: FXConfig | undefined,
): FXConfig | undefined {
  if (!row || !isTriggerOnlyFx(fxKey) || !row.enabled) return row;

  const template = HYDRA_FX_TEMPLATE_RAW[fxKey as keyof typeof HYDRA_FX_TEMPLATE_RAW];
  const syncBand: AudioBand =
    row.syncBand === "none" ? "none" : (row.syncBand ?? templateBandFor(fxKey));

  const next: FXConfig = { ...row, syncBand };
  if (syncBand !== "none") {
    next.isTrigger = true;
    next.syncMultiplier = 0;
  }

  if (isTriggerOnlyPulseAmountFx(fxKey)) {
    if (row.envelopeRef === null) delete next.envelopeRef;
    delete next.mapMin;
    delete next.mapMax;
    if (typeof next.base !== "number" || next.base <= 0) {
      next.base = typeof template?.base === "number" ? template.base : 1;
    }
    const params = { ...(next.params ?? {}) };
    if (typeof params.duration !== "number") {
      params.duration = pulseDurationDefault(fxKey, template);
    }
    if (fxKey === "slowmo" && typeof params.motionBlur !== "number") {
      params.motionBlur =
        typeof template?.params?.motionBlur === "number"
          ? template.params.motionBlur
          : SLOWMO_MOTION_BLUR_DEFAULT;
    }
    next.params = params;
  } else if (next.envelopeRef === undefined) {
    next.envelopeRef = null;
  }

  return next;
}

export function normalizeTriggerOnlyPlaybackFxInPlace(fx: FolderConfig["fx"] | undefined): void {
  if (!fx || typeof fx !== "object") return;
  for (const fxKey of Object.keys(fx)) {
    if (!isTriggerOnlyFx(fxKey)) continue;
    const row = fx[fxKey as keyof typeof fx] as FXConfig | undefined;
    const normalized = normalizeTriggerOnlyPlaybackFxRow(fxKey, row);
    if (normalized && normalized !== row) {
      fx[fxKey as keyof typeof fx] = normalized as never;
    }
  }
}
