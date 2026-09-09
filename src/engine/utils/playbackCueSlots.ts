import type { ParamSync } from "../types/settings";
import {
  bindingAllowsTriggeredMode,
  clearedParamSync,
} from "./paramBinding";
import { syncWithResponseMode } from "./responseMode";

type FxParams = Record<string, number | string | undefined> | undefined;

export const PLAYBACK_CUE_SLOT_COUNT = 4;

export function playbackCueEventCount(params: FxParams, fallback = 2): number {
  const raw = params?.eventCount;
  if (typeof raw === "number" && Number.isFinite(raw)) {
    return Math.max(1, Math.min(PLAYBACK_CUE_SLOT_COUNT, Math.round(raw)));
  }
  return Math.max(1, Math.min(PLAYBACK_CUE_SLOT_COUNT, Math.round(fallback)));
}

export function playbackCueSlotParamKey(kind: "clip" | "frame", slot: number): string {
  return `${kind}${slot}`;
}

/** Static seek frame for a cue slot — triggers fire this value, not envelope-mapped audio. */
export function playbackCueFrameFromParams(params: FxParams, slot: number): number {
  const raw = params?.[playbackCueSlotParamKey("frame", slot)];
  if (typeof raw === "number" && Number.isFinite(raw)) {
    return Math.max(0, Math.round(raw));
  }
  return 0;
}

export function playbackCueSlotFromParamKey(paramKey: string): { kind: "clip" | "frame"; slot: number } | null {
  const match = paramKey.match(/^(clip|frame)(\d)$/);
  if (!match) return null;
  const slot = Number.parseInt(match[2]!, 10);
  if (!Number.isFinite(slot) || slot < 1 || slot > PLAYBACK_CUE_SLOT_COUNT) return null;
  return { kind: match[1] as "clip" | "frame", slot };
}

export function isPlaybackCueFrameParamKey(paramKey: string): boolean {
  return playbackCueSlotFromParamKey(paramKey)?.kind === "frame";
}

export function isPlaybackCueSlotParamVisible(
  paramKey: string,
  params: FxParams,
  fallbackEventCount = 2,
): boolean {
  const parsed = playbackCueSlotFromParamKey(paramKey);
  if (!parsed) return true;
  return parsed.slot <= playbackCueEventCount(params, fallbackEventCount);
}

/** Frame rows fire on pulse hits only — no follow map or envelope slots. */
export function coercePlaybackCueFrameSync(sync: ParamSync): ParamSync {
  const band = sync.band ?? "none";
  if (band === "none" || !bindingAllowsTriggeredMode(band)) {
    return clearedParamSync();
  }
  return syncWithResponseMode(
    {
      ...sync,
      band,
      multiplier: 0,
      isTrigger: true,
      envelopeRef: null,
    },
    "trigger",
  );
}
