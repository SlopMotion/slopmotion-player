import { getHydraWindow } from "../types/hydraWindow";
import type { FXConfig } from "../types/settings";

export type AutoMixAdvanceWhen = "time" | "loop";

/** Hidden cooldown between accepted mixer trigger hits — not a user-facing param. */
export const AUTO_MIX_TRIGGER_MIN_DELAY_MS = 250;

export function shouldSkipAutoMixTrigger(
  now: number,
  lastEventAt: number,
  minDelayMs = AUTO_MIX_TRIGGER_MIN_DELAY_MS,
): boolean {
  if (lastEventAt <= 0) return false;
  return now - lastEventAt < minDelayMs;
}

export function isAutoMixAudioMapped(syncBand: string | undefined): boolean {
  return (syncBand ?? "none") !== "none";
}

export function resolveAutoMixAdvanceWhen(
  fx: Pick<FXConfig, "params" | "syncBand">,
): AutoMixAdvanceWhen {
  if (isAutoMixAudioMapped(fx.syncBand)) return "time";
  return fx.params?.advanceWhen === "loop" ? "loop" : "time";
}

/** Pulse / band crossings — not wall-clock interval or loop wraps. */
export function autoMixUsesPulseAdvance(fx: Pick<FXConfig, "syncBand" | "isTrigger">): boolean {
  return isAutoMixAudioMapped(fx.syncBand) || fx.isTrigger === true;
}

type AutoMixGate = Pick<FXConfig, "enabled" | "base" | "syncBand" | "isTrigger" | "params">;

/** Timer interval 0 (or a disabled layer) means Auto does not advance clips. */
export function isAutoMixActive(fx: AutoMixGate | undefined | null): boolean {
  if (!fx?.enabled) return false;
  if (autoMixUsesPulseAdvance(fx)) return true;
  if (resolveAutoMixAdvanceWhen(fx) === "loop") return true;
  return (Number(fx.base) || 0) > 0;
}

/** Mixer timer slider: disabled layers show 0 / Off. */
export function autoMixTimerSliderValue(fx: AutoMixGate): number {
  if (autoMixUsesPulseAdvance(fx) || resolveAutoMixAdvanceWhen(fx) === "loop") {
    return Number(fx.base) || 0;
  }
  if (!fx.enabled) return 0;
  return Math.max(0, Number(fx.base) || 0);
}

/** Persist a timer slider pick. 0 turns Auto off and keeps the last interval. */
export function persistAutoMixTimerSlider(
  fx: AutoMixGate,
  picked: number,
): { enabled: boolean; base: number } {
  const v = Math.round(Number(picked));
  if (!Number.isFinite(v) || v <= 0) {
    const keep = Number(fx.base) || 0;
    return { enabled: false, base: keep > 0 ? keep : 0 };
  }
  return { enabled: true, base: v };
}

export function autoMixBandLevel(
  bands: Record<string, number> | undefined,
  syncBand: string,
): number {
  if (!bands || syncBand === "none") return 0;
  return bands[syncBand] ?? 0;
}

export function primaryPlaysetVideoElement(): HTMLVideoElement | null {
  const win = getHydraWindow();
  const candidates: HTMLVideoElement[] = [];
  for (const slot of [win.s0, win.s1]) {
    const el = slot?.src;
    if (el instanceof HTMLVideoElement && el.readyState >= HTMLMediaElement.HAVE_METADATA) {
      candidates.push(el);
    }
  }
  if (candidates.length === 0) return null;
  return candidates.find((v) => !v.paused && !v.ended) ?? candidates[0]!;
}

export type LoopWrapState = { lastTime: number; completedLoops: number };

export function resetLoopWrapState(): LoopWrapState {
  return { lastTime: -1, completedLoops: 0 };
}

/** True when the playset video has completed `requiredLoops` seamless wraps. */
export function tickAutoMixLoopWrap(
  video: HTMLVideoElement,
  requiredLoops: number,
  state: LoopWrapState,
): boolean {
  if (!video.loop) return false;
  const dur = video.duration;
  if (!Number.isFinite(dur) || dur <= 0) return false;
  const t = video.currentTime;
  const eps = Math.max(0.05, 1 / 30);
  if (state.lastTime < 0) {
    state.lastTime = t;
    return false;
  }
  if (state.lastTime > dur * 0.4 && t < eps) {
    state.completedLoops += 1;
    state.lastTime = t;
    return state.completedLoops >= requiredLoops;
  }
  state.lastTime = t;
  return false;
}
