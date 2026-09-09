import type { AudioBand, FXConfig } from "../types/settings";

const DEGAUSS_TAIL_DEFAULT = 0.82;

export function isDegaussAmountNoOp(fxCfg: FXConfig): boolean {
  return (fxCfg.base ?? 0) < 0.00001 && (fxCfg.syncBand ?? "none") === "none";
}

export function computeDegaussTarget(fxCfg: FXConfig, drive: number): number {
  let target = Math.max(0, Math.min(1, fxCfg.base ?? 0));
  if ((fxCfg.syncBand ?? "none") === "none") return target;

  return Math.max(
    0,
    Math.min(1, (fxCfg.base ?? 0) + drive * (fxCfg.syncMultiplier ?? 0)),
  );
}

export function advanceDegaussSmooth(
  prev: number,
  target: number,
  fxCfg: FXConfig,
): number {
  if (isDegaussAmountNoOp(fxCfg)) return 0;

  if (fxCfg.isTrigger) return target;

  if ((fxCfg.syncBand ?? "none") !== "none") {
    const tailRaw = fxCfg.params?.tail;
    const tail = Math.max(
      0,
      Math.min(1, typeof tailRaw === "number" ? tailRaw : DEGAUSS_TAIL_DEFAULT),
    );
    const releaseAlpha = 0.035 + (1 - tail) * 0.26;
    const attackAlpha = 0.58;
    const alpha = target > prev ? attackAlpha : releaseAlpha;
    return prev + alpha * (target - prev);
  }

  if (target < 0.00001) return 0;
  return prev + 0.32 * (target - prev);
}

export function resolveDegaussShaderAmount(
  fxCfg: FXConfig | undefined,
  degaussAmp: number,
): number {
  if (!fxCfg?.enabled) return 0;
  if (isDegaussAmountNoOp(fxCfg)) return 0;
  return Math.max(0, Math.min(1, degaussAmp));
}

export function degaussDriveForFx(
  fxCfg: FXConfig,
  envelope: number,
  bandLevel: (band: AudioBand) => number,
): number {
  if ((fxCfg.syncBand ?? "none") === "none") return 0;
  return fxCfg.isTrigger ? envelope : bandLevel(fxCfg.syncBand ?? "none");
}
