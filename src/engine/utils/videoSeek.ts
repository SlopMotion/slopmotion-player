import { LOOP_SOURCE_FPS } from "./loopPlayback";

/** Seek a looping (or bounded) video by a signed delta in seconds. */
export function seekVideoByDelta(video: HTMLVideoElement, deltaSec: number) {
  if (!video || !Number.isFinite(deltaSec) || deltaSec === 0) return;
  const dur = video.duration;
  if (!Number.isFinite(dur) || dur <= 0) {
    video.currentTime = Math.max(0, video.currentTime + deltaSec);
    return;
  }
  const eps = 1 / 120;
  let t = video.currentTime + deltaSec;
  if (video.loop) {
    t = ((t % dur) + dur) % dur;
  } else {
    t = Math.min(Math.max(0, t), dur - eps);
  }
  video.currentTime = t;
}

export function advanceVideoJumpCut(video: HTMLVideoElement, deltaSec: number) {
  if (deltaSec > 0) seekVideoByDelta(video, deltaSec);
}

/** Stutter Back rewinds against the loop source frame rate (24 fps Veo clips). */
export function computeStutterBackRewindSec(
  backFrames: number,
  fps: number = LOOP_SOURCE_FPS,
): number {
  return Math.max(1, Math.round(backFrames)) / fps;
}

/** Jump Cut advances playback by skipFrames × bursts at the loop source frame rate. */
export function computeJumpCutAdvanceSec(
  skipFrames: number,
  jumpCuts: number,
  fps: number = LOOP_SOURCE_FPS,
): number {
  const frames = Math.max(1, Math.round(skipFrames)) * Math.max(1, Math.round(jumpCuts));
  return frames / fps;
}
