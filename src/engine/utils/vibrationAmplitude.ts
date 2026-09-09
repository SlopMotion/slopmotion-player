import type { AudioBand, FXConfig } from "../types/settings";

const VIBRATION_TAIL_DEFAULT = 0.82;

export function isVibrationAmountNoOp(fxCfg: FXConfig): boolean {
  return (fxCfg.base ?? 0) < 0.00001 && (fxCfg.syncBand ?? "none") === "none";
}

export function computeVibrationTarget(
  fxCfg: FXConfig,
  drive: number,
): number {
  let target = Math.max(0, Math.min(1, fxCfg.base ?? 0));
  if ((fxCfg.syncBand ?? "none") === "none") return target;

  return Math.max(
    0,
    Math.min(1, (fxCfg.base ?? 0) + drive * (fxCfg.syncMultiplier ?? 0)),
  );
}

export function advanceVibrationSmooth(
  prev: number,
  target: number,
  fxCfg: FXConfig,
): number {
  if (isVibrationAmountNoOp(fxCfg)) return 0;

  if (fxCfg.isTrigger) return target;

  if ((fxCfg.syncBand ?? "none") !== "none") {
    const tailRaw = fxCfg.params?.tail;
    const tail = Math.max(
      0,
      Math.min(1, typeof tailRaw === "number" ? tailRaw : VIBRATION_TAIL_DEFAULT),
    );
    const releaseAlpha = 0.04 + (1 - tail) * 0.28;
    const attackAlpha = 0.62;
    const alpha = target > prev ? attackAlpha : releaseAlpha;
    return prev + alpha * (target - prev);
  }

  if (target < 0.00001) return 0;
  return prev + 0.35 * (target - prev);
}

export function resolveVibrationShaderAmount(
  fxCfg: FXConfig | undefined,
  vibrationAmp: number,
): number {
  if (!fxCfg?.enabled) return 0;
  if (isVibrationAmountNoOp(fxCfg)) return 0;
  return Math.max(0, Math.min(1, vibrationAmp));
}

export function vibrationDriveForFx(
  fxCfg: FXConfig,
  envelope: number,
  bandLevel: (band: AudioBand) => number,
): number {
  if ((fxCfg.syncBand ?? "none") === "none") return 0;
  return fxCfg.isTrigger ? envelope : bandLevel(fxCfg.syncBand ?? "none");
}
