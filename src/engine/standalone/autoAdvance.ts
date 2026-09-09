import type { FXConfig } from "../types/settings";
import {
  isAutoMixActive,
  primaryPlaysetVideoElement,
  resetLoopWrapState,
  resolveAutoMixAdvanceWhen,
  tickAutoMixLoopWrap,
} from "../utils/autoMixAdvance";

export type AutoAdvanceController = { stop: () => void };

/** Picks the next clip the way Mixer Auto does — sequential, or random without repeats. */
export function nextClipIndex(current: number, count: number, mode: string): number {
  if (count <= 1) return current;
  if (mode === "sequential") return (current + 1) % count;
  let next = Math.floor(Math.random() * count);
  if (next === current) next = (next + 1) % count;
  return next;
}

/**
 * Mixer Auto for the exported player: advances on the timer interval, or on clip
 * loop wraps when the scene was saved with `advanceWhen: "loop"`.
 */
export function startAutoAdvance(deps: {
  autoMix: FXConfig | undefined;
  clipCount: number;
  currentIndex: () => number;
  selectClip: (index: number) => void;
}): AutoAdvanceController {
  const fx = deps.autoMix;
  if (!fx || !isAutoMixActive(fx) || deps.clipCount <= 1) return { stop: () => {} };

  const mode = fx.params?.advanceMode === "sequential" ? "sequential" : "random";
  const advance = () => deps.selectClip(nextClipIndex(deps.currentIndex(), deps.clipCount, mode));

  if (resolveAutoMixAdvanceWhen(fx) === "loop") {
    const requiredLoops = Math.max(1, Math.round(Number(fx.base) || 1));
    let state = resetLoopWrapState();
    const raf = { id: 0 };
    const tick = () => {
      const video = primaryPlaysetVideoElement();
      if (video && tickAutoMixLoopWrap(video, requiredLoops, state)) {
        state = resetLoopWrapState();
        advance();
      }
      raf.id = requestAnimationFrame(tick);
    };
    raf.id = requestAnimationFrame(tick);
    return { stop: () => cancelAnimationFrame(raf.id) };
  }

  const intervalMs = Math.max(1, Number(fx.base) || 12) * 1000;
  const timer = window.setInterval(advance, intervalMs);
  return { stop: () => window.clearInterval(timer) };
}
