export type BoomerangPhase = "forward" | "reverse" | "replay";

export interface BoomerangFramePair {
  frames0: ImageBitmap[];
  frames1: ImageBitmap[];
}

export type BoomerangCycleState = {
  active: boolean;
  /** Set when a kick fires before the canvas bridge is ready. */
  pendingTrigger: boolean;
  phase: BoomerangPhase;
  segmentEnd0: number;
  captureAccum: number;
  capturePending: boolean;
  reverseIdx: number;
  /** After replay, one final reverse lands on frame 0 and ends the cycle. */
  completeAfterReverse: boolean;
  frames: BoomerangFramePair;
};

export type BoomerangCanvasBundle = {
  c0: HTMLCanvasElement;
  c1: HTMLCanvasElement;
  ctx0: CanvasRenderingContext2D;
  ctx1: CanvasRenderingContext2D;
};

export type BoomerangBackingPair = {
  v0: HTMLVideoElement | null;
  v1: HTMLVideoElement | null;
};

/** True when boomerang reroutes Hydra s0/s1 through canvas + hidden backing videos. */
export function isBoomerangBridgeLive(
  fxEnabled: boolean,
  bridgeReady: boolean,
  backing: BoomerangBackingPair,
  canvasBundle: BoomerangCanvasBundle | null | undefined,
): boolean {
  return (
    fxEnabled &&
    bridgeReady &&
    backing.v0 instanceof HTMLVideoElement &&
    backing.v1 instanceof HTMLVideoElement &&
    canvasBundle != null
  );
}

/**
 * Primary A/B transport videos — when the boomerang bridge is live, Hydra shows
 * canvases on s0/s1; seeks must target the hidden backing elements instead.
 */
export function primaryTransportVideos(
  boomBridgeLive: boolean,
  backing: BoomerangBackingPair,
  hydraS0Src: unknown,
  hydraS1Src: unknown,
): HTMLVideoElement[] {
  if (boomBridgeLive && backing.v0 && backing.v1) {
    return [backing.v0, backing.v1];
  }
  const out: HTMLVideoElement[] = [];
  if (hydraS0Src instanceof HTMLVideoElement) out.push(hydraS0Src);
  if (hydraS1Src instanceof HTMLVideoElement && hydraS1Src !== hydraS0Src) {
    out.push(hydraS1Src);
  }
  return out;
}

export function refreshBoomerangCanvasPair(
  bundle: BoomerangCanvasBundle | null | undefined,
  v0: HTMLVideoElement | null | undefined,
  v1: HTMLVideoElement | null | undefined,
): void {
  if (!bundle || !(v0 instanceof HTMLVideoElement) || !(v1 instanceof HTMLVideoElement)) return;
  drawVideoToCanvas(bundle.ctx0, bundle.c0, v0);
  drawVideoToCanvas(bundle.ctx1, bundle.c1, v1);
}

export function disposeBoomerangFrames(b: BoomerangFramePair) {
  for (const bmp of b.frames0) bmp.close();
  for (const bmp of b.frames1) bmp.close();
  b.frames0.length = 0;
  b.frames1.length = 0;
}

export function resetBoomerangCaptureState(st: BoomerangCycleState) {
  disposeBoomerangFrames(st.frames);
  st.active = false;
  st.pendingTrigger = false;
  st.phase = "forward";
  st.segmentEnd0 = 0;
  st.captureAccum = 0;
  st.capturePending = false;
  st.reverseIdx = -1;
  st.completeAfterReverse = false;
}

/** Arm a new one-shot cycle from the current playhead (caller sets segment starts). */
export function beginBoomerangCycle(st: BoomerangCycleState) {
  disposeBoomerangFrames(st.frames);
  st.active = true;
  st.pendingTrigger = false;
  st.phase = "forward";
  st.segmentEnd0 = 0;
  st.captureAccum = 0;
  st.capturePending = false;
  st.reverseIdx = -1;
  st.completeAfterReverse = false;
}

export function ensureCanvasSize(
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
): CanvasRenderingContext2D | null {
  const w = Math.max(2, video.videoWidth || 2);
  const h = Math.max(2, video.videoHeight || 2);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  return canvas.getContext("2d", { willReadFrequently: true });
}

export function drawVideoToCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
) {
  const w = Math.max(2, video.videoWidth || 2);
  const h = Math.max(2, video.videoHeight || 2);
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}

export function drawBitmapToCanvas(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  bmp: ImageBitmap,
) {
  if (canvas.width !== bmp.width || canvas.height !== bmp.height) {
    canvas.width = bmp.width;
    canvas.height = bmp.height;
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bmp, 0, 0);
}

type BoomerangPlaybackState = {
  reverseIdx: number;
  captureAccum: number;
  phase: BoomerangPhase;
  completeAfterReverse: boolean;
  active: boolean;
  frames: BoomerangFramePair;
};

/** Advance reverse playback by dt. Lands on frame 0 → replay, or ends the cycle. */
export function stepBoomerangReverse(
  st: BoomerangPlaybackState,
  dt: number,
  capFps: number,
): { finished: boolean; frameIdx: number; cycleDone: boolean } {
  const capPeriod = 1 / Math.max(12, capFps);
  st.captureAccum += dt;
  let frameIdx = st.reverseIdx;
  while (st.captureAccum >= capPeriod && frameIdx > 0) {
    st.captureAccum -= capPeriod;
    frameIdx -= 1;
  }
  if (st.captureAccum >= capPeriod && frameIdx === 0) {
    st.captureAccum = 0;
    st.reverseIdx = 0;
    if (st.completeAfterReverse) {
      st.completeAfterReverse = false;
      st.phase = "forward";
      st.active = false;
      return { finished: true, frameIdx: 0, cycleDone: true };
    }
    st.phase = "replay";
    return { finished: true, frameIdx: 0, cycleDone: false };
  }
  st.reverseIdx = frameIdx;
  return { finished: false, frameIdx, cycleDone: false };
}

/** Advance forward replay by dt; at last frame starts the final reverse home. */
export function stepBoomerangReplay(
  st: BoomerangPlaybackState,
  dt: number,
  capFps: number,
): { finished: boolean; frameIdx: number } {
  const last = st.frames.frames0.length - 1;
  if (last < 0) {
    st.phase = "forward";
    st.active = false;
    st.reverseIdx = -1;
    st.captureAccum = 0;
    st.completeAfterReverse = false;
    return { finished: true, frameIdx: -1 };
  }
  const capPeriod = 1 / Math.max(12, capFps);
  st.captureAccum += dt;
  let frameIdx = st.reverseIdx;
  while (st.captureAccum >= capPeriod && frameIdx < last) {
    st.captureAccum -= capPeriod;
    frameIdx += 1;
  }
  if (st.captureAccum >= capPeriod && frameIdx >= last) {
    st.captureAccum = 0;
    st.reverseIdx = last;
    st.completeAfterReverse = true;
    st.phase = "reverse";
    return { finished: true, frameIdx: last };
  }
  st.reverseIdx = frameIdx;
  return { finished: false, frameIdx };
}

export async function captureBoomerangPair(
  v0: HTMLVideoElement,
  v1: HTMLVideoElement,
  buffers: BoomerangFramePair,
  maxFrames: number,
): Promise<void> {
  if (buffers.frames0.length >= maxFrames) return;
  try {
    const [b0, b1] = await Promise.all([createImageBitmap(v0), createImageBitmap(v1)]);
    buffers.frames0.push(b0);
    buffers.frames1.push(b1);
  } catch {
    /* decode may fail briefly during seeks */
  }
}
