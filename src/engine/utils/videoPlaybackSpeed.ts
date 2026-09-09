import type { AudioBands } from "../hooks/useAudioAnalyzer";
import type { AudioBand, FolderConfig, FXConfig } from "../types/settings";
import { CORE_FX_DEFINITIONS } from "../data/fxConfig";
import { getHydraWindow } from "../types/hydraWindow";
import { computeFxAmount, FX_AMT_01 } from "./fxRuntime";
import { DEFAULT_VIDEO_SPEED_BASE } from "./loopPlayback";
import { bindingIsTriggered, paramBindingFromFx } from "./paramBinding";
import { bindingMapSignalRange, mapSignalToParam } from "./paramMapRange";
import { normalizeTriggerOnlyPlaybackFxRow } from "./triggerOnlyPlaybackFx";
import { shapeAccelerateAmount } from "./accelerateFx";
import { shapeSlowmoAmount } from "./slowmoFx";
import { maxVideoPlaybackRateForWallClock } from "./videoUtils";

type Bands = AudioBands & Record<string, number>;

const VIDEO_SPEED_DEF = CORE_FX_DEFINITIONS.find((d) => d.key === "videoSpeed")!;
/** Native decoder path needs a small floor; below this we pause and manual-seek. */
export const VIDEO_SPEED_DECODER_MIN = 0.1;

/** Snap instantly on pulse hits and sub-decoder targets so base 0 does not creep via easing. */
export function resolveSmoothedVideoSpeed(
  targetSpeed: number,
  currentSmoothed: number,
  isTriggerMapped: boolean,
): number {
  if (isTriggerMapped || targetSpeed < VIDEO_SPEED_DECODER_MIN) {
    return targetSpeed;
  }
  return currentSmoothed + (targetSpeed - currentSmoothed) * 0.1;
}

export function isVideoSpeedTriggerMapped(fx: FolderConfig["fx"] | undefined): boolean {
  const vsFx = fx?.videoSpeed;
  if (!vsFx?.enabled || vsFx.syncBand === "none") return false;
  const binding = paramBindingFromFx(vsFx, "base", {
    staticValue: vsFx.base ?? DEFAULT_VIDEO_SPEED_BASE,
    paramMin: VIDEO_SPEED_DEF.min,
    paramMax: VIDEO_SPEED_DEF.max,
    fxKey: "videoSpeed",
  });
  return bindingIsTriggered(binding);
}

export function isPlaybackSpeedPulseMapped(fx: FolderConfig["fx"] | undefined): boolean {
  if (isVideoSpeedTriggerMapped(fx)) return true;
  for (const key of ["slowmo", "accelerate"] as const) {
    const row = fx?.[key];
    if (!row?.enabled || row.syncBand === "none") continue;
    const binding = paramBindingFromFx(row, "base", {
      staticValue: row.base ?? 1,
      paramMin: 0,
      paramMax: 1,
      fxKey: key,
    });
    if (bindingIsTriggered(binding)) return true;
  }
  return false;
}

function clampPulseAmount(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

function resolvePulsePlaybackAmount(
  fxKey: "slowmo" | "accelerate",
  pulseFx: FXConfig | undefined,
  bands: Bands | undefined,
  bandValue: (fxKey: string, band: AudioBand, bands: Bands | undefined) => number,
  envelopeKey: string,
  pulseUntilKey: "slowmoPulseUntilMs" | "acceleratePulseUntilMs",
): number {
  const row = normalizeTriggerOnlyPlaybackFxRow(fxKey, pulseFx);
  if (!row?.enabled) return 0;

  const binding = paramBindingFromFx(row, "base", {
    staticValue: row.base ?? 1,
    paramMin: 0,
    paramMax: 1,
    fxKey,
  });

  if (binding.source === "none") {
    return clampPulseAmount(computeFxAmount(fxKey, row, bands, FX_AMT_01));
  }

  let signal: number;
  if (bindingIsTriggered(binding)) {
    const win = typeof window !== "undefined" ? getHydraWindow() : undefined;
    signal = win?.hydraEnvelopes?.[envelopeKey] ?? 0;
    const pulseUntil = win?.[pulseUntilKey];
    if (typeof pulseUntil === "number" && performance.now() < pulseUntil) {
      signal = Math.max(signal, 1);
    }
  } else {
    signal = bandValue(fxKey, binding.source, bands);
  }

  const mapMax = binding.mapMax > binding.mapMin ? binding.mapMax : 1;
  const mapMin = binding.mapMax > binding.mapMin ? binding.mapMin : 0;
  const range = bindingMapSignalRange(binding);
  return clampPulseAmount(mapSignalToParam(signal, mapMin, mapMax, range));
}

/** Pulse amount from the hit envelope (and transport pulse fallback), not the live band. */
export function resolveSlowmoAmount(
  slowFx: FXConfig | undefined,
  bands: Bands | undefined,
  bandValue: (fxKey: string, band: AudioBand, bands: Bands | undefined) => number,
): number {
  return resolvePulsePlaybackAmount(
    "slowmo",
    slowFx,
    bands,
    bandValue,
    "slowmo",
    "slowmoPulseUntilMs",
  );
}

export function resolveAccelerateAmount(
  accelFx: FXConfig | undefined,
  bands: Bands | undefined,
  bandValue: (fxKey: string, band: AudioBand, bands: Bands | undefined) => number,
): number {
  return resolvePulsePlaybackAmount(
    "accelerate",
    accelFx,
    bands,
    bandValue,
    "accelerate",
    "acceleratePulseUntilMs",
  );
}

export function resolveTargetVideoSpeed(
  fx: FolderConfig["fx"] | undefined,
  bands: Bands | undefined,
  bandValue: (fxKey: string, band: AudioBand, bands: Bands | undefined) => number,
  paramValue: (fxKey: string, paramKey: string, defaultVal: number) => number,
  clipDurationSec?: number,
): number {
  let targetSpeed = 1.0;
  const vsFx = fx?.videoSpeed;
  if (vsFx?.enabled) {
    const rawBase = vsFx.base !== undefined ? vsFx.base : DEFAULT_VIDEO_SPEED_BASE;
    const binding = paramBindingFromFx(vsFx, "base", {
      staticValue: rawBase,
      paramMin: VIDEO_SPEED_DEF.min,
      paramMax: VIDEO_SPEED_DEF.max,
      fxKey: "videoSpeed",
    });
    if (binding.source === "none") {
      targetSpeed = Math.max(0, rawBase);
    } else {
      const signal = bandValue("videoSpeed", binding.source, bands);
      const range = bindingMapSignalRange(binding);
      targetSpeed = Math.max(
        0,
        mapSignalToParam(signal, binding.mapMin, binding.mapMax, range),
      );
    }
  }

  const slowAmt = resolveSlowmoAmount(fx?.slowmo, bands, bandValue);
  if (slowAmt > 0) {
    const minSpeed = Math.max(0.02, Math.min(1, paramValue("slowmo", "minSpeed", 0.2)));
    const shaped = shapeSlowmoAmount(slowAmt);
    targetSpeed *= (1 - shaped) + shaped * minSpeed;
  }

  const accelAmt = resolveAccelerateAmount(fx?.accelerate, bands, bandValue);
  if (accelAmt > 0) {
    const maxSpeed = Math.max(1.1, Math.min(6, paramValue("accelerate", "maxSpeed", 2.5)));
    const shaped = shapeAccelerateAmount(accelAmt);
    targetSpeed *= (1 - shaped) + shaped * maxSpeed;
  }

  if (Number.isFinite(clipDurationSec) && (clipDurationSec as number) > 0) {
    targetSpeed = Math.min(targetSpeed, maxVideoPlaybackRateForWallClock(clipDurationSec as number));
  }

  return targetSpeed;
}

/** Legacy persisted base before 30fps default — treat as unset so refresh picks up 1.25. */
export function migrateLegacyVideoSpeedBase(fx: FolderConfig["fx"]): void {
  const vs = fx.videoSpeed;
  if (!vs || vs.enabled === false) return;
  if (typeof vs.base !== "number") return;
  if (Math.abs(vs.base - 1.0) > 0.011) return;
  fx.videoSpeed = { ...vs, base: DEFAULT_VIDEO_SPEED_BASE };
}

export function applyPlaybackRateToVideos(
  videos: Array<HTMLVideoElement | null | undefined>,
  speed: number,
): void {
  for (const v of videos) {
    if (!(v instanceof HTMLVideoElement)) continue;
    if (speed < VIDEO_SPEED_DECODER_MIN) {
      v.pause();
      continue;
    }
    v.playbackRate = speed;
  }
}

/** Base rate from `hydraSettings` when the full sync hook is not registered yet. */
export function applyBaseVideoPlaybackRate(vid: HTMLVideoElement): void {
  const vs = getHydraWindow().hydraSettings?.fx?.videoSpeed;
  if (!vs || vs.enabled === false) return;
  const base = vs.base !== undefined ? vs.base : DEFAULT_VIDEO_SPEED_BASE;
  let speed = Math.max(0, base);
  const dur = vid.duration;
  if (Number.isFinite(dur) && dur > 0) {
    speed = Math.min(speed, maxVideoPlaybackRateForWallClock(dur));
  }
  applyPlaybackRateToVideos([vid], speed);
}

/** Patched `initVideo` calls this when a clip is committed — after refresh, before rAF sync. */
export function notifyVideoElementCommitted(vid: HTMLVideoElement): void {
  const hook = getHydraWindow().__hydraVideoSpeedSync;
  if (typeof hook === "function") {
    hook(vid);
    return;
  }
  applyBaseVideoPlaybackRate(vid);
}

/** Whether primary s0/s1 clips should advance — respects Stop and Studio transport. */
export function shouldPrimaryVideoPlay(): boolean {
  const win = getHydraWindow();
  if (win.studioTransportActive === true) return true;
  return win.hydraSettings?.isVideoPlaying !== false;
}
