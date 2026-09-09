import { getHydraWindow } from "../types/hydraWindow";

export function isHydraTransportFrozen(opts: {
  studioMode: boolean;
  studioTransportActive?: boolean;
  isVideoPlaying?: boolean;
}): boolean {
  if (opts.isVideoPlaying !== false) return false;
  if (opts.studioMode && opts.studioTransportActive === true) return false;
  return true;
}

/** hydra-synth copies `window.speed` onto `synth.speed` every tick — set both. */
export function setHydraClockSpeed(
  synth: { speed?: number } | undefined,
  speed: number,
): void {
  if (synth) synth.speed = speed;
  getHydraWindow().speed = speed;
}

export function pinHydraFrozenTime(synth: { time?: number } | undefined): number {
  const win = getHydraWindow();
  if (typeof win.studioFrozenTimeSec !== "number") {
    win.studioFrozenTimeSec = synth?.time ?? 0;
  }
  const frozen = win.studioFrozenTimeSec;
  if (synth) synth.time = frozen;
  win.time = frozen;
  return frozen;
}
