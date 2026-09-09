import { getHydraWindow } from "../types/hydraWindow";
import { clipPathsEquivalent } from "./videoUtils";

let peekActive = false;
let zapActive = false;
let cueActive = false;

export function setClipPeekTransportActive(active: boolean) {
  peekActive = active;
}

export function setClipZapTransportActive(active: boolean) {
  zapActive = active;
}

export function setPlaybackCueTransportActive(active: boolean) {
  cueActive = active;
}

export function isClipPeekTransportActive(): boolean {
  return peekActive;
}

export function isClipZapTransportActive(): boolean {
  return zapActive;
}

export function isPlaybackCueTransportActive(): boolean {
  return cueActive;
}

export function isClipTransportBusy(): boolean {
  return peekActive || zapActive || cueActive;
}

/** Allow the next primary load of `path` even while peek/zap/cue transport is busy. */
export function markTransportFallbackLoad(path: string) {
  if (typeof window === "undefined" || !path) return;
  getHydraWindow().__hydraTransportFallbackLoad = path;
}

export function consumeTransportFallbackLoad(requestedPath: string): boolean {
  if (typeof window === "undefined" || !requestedPath) return false;
  const win = getHydraWindow();
  const fallback = win.__hydraTransportFallbackLoad;
  if (typeof fallback !== "string" || !fallback) return false;
  if (!clipPathsEquivalent(fallback, requestedPath)) return false;
  delete win.__hydraTransportFallbackLoad;
  return true;
}

/** Playback transport FX (peek, zap, cue) — skip crossfade transition on clip swap. */
export function markInstantVideoLoad() {
  if (typeof window === "undefined") return;
  (window as Window & { __hydraInstantVideoLoad?: boolean }).__hydraInstantVideoLoad = true;
}

export function consumeInstantVideoLoad(): boolean {
  if (typeof window === "undefined") return false;
  const win = window as Window & { __hydraInstantVideoLoad?: boolean };
  const instant =
    !!win.__hydraInstantVideoLoad ||
    isClipPeekTransportActive() ||
    isClipZapTransportActive() ||
    isPlaybackCueTransportActive();
  delete win.__hydraInstantVideoLoad;
  return instant;
}

/**
 * A primary-clip channel swap is loading. Automix/scene advances must wait for it
 * so a fast trigger cadence can't cancel every swap and freeze on the first clip.
 * Carries a safety deadline so a stuck load can never permanently block advances.
 */
let videoLoadInFlightUntil = 0;

export function markVideoLoadInFlight(active: boolean, maxMs = 4000): void {
  videoLoadInFlightUntil = active ? performance.now() + maxMs : 0;
}

export function isVideoLoadInFlight(): boolean {
  return performance.now() < videoLoadInFlightUntil;
}

/** Skip playset pool sync briefly after scene recall — avoids racing scene apply reload. */
let playsetPoolSyncSuppressedUntil = 0;

export function suppressPlaysetPoolSync(ms = 1200): void {
  playsetPoolSyncSuppressedUntil = performance.now() + ms;
}

export function isPlaysetPoolSyncSuppressed(): boolean {
  return performance.now() < playsetPoolSyncSuppressedUntil;
}
