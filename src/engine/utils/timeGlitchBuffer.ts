/** Equal-slice timeslice: each cell shows the video N frames behind its neighbor. */

export const TIME_GLITCH_MIN_SLICES = 10;
export const TIME_GLITCH_MAX_SLICES = 40;
export const TIME_GLITCH_DEFAULT_COLS = 16;
export const TIME_GLITCH_DEFAULT_OFFSET = 2;
export const TIME_GLITCH_MAX_OFFSET = 24;
/** One “frame” of offset is one video frame at 24 fps, not a display refresh. */
export const TIME_GLITCH_FRAME_SEC = 1 / 24;
/** Enough slots for 16 slices × 24-frame neighbor gap (loop wrap usually needs fewer). */
export const TIME_GLITCH_MAX_HISTORY =
  1 + (TIME_GLITCH_DEFAULT_COLS - 1) * TIME_GLITCH_MAX_OFFSET;
/** Hard canvas cap when clip duration is unknown. */
export const TIME_GLITCH_SLOT_CAP = 120;

export type TimeGlitchLayout = {
  slices: number;
  frameOffset: number;
  history: number;
  grid: boolean;
};

export function resolveTimeGlitchLayout(
  cols: number,
  frameOffset: number,
  mode = 0,
  _maxHistory = TIME_GLITCH_MAX_HISTORY,
): TimeGlitchLayout {
  const slices = Math.max(
    TIME_GLITCH_MIN_SLICES,
    Math.min(
      TIME_GLITCH_MAX_SLICES,
      Math.round(Number.isFinite(cols) ? cols : TIME_GLITCH_DEFAULT_COLS),
    ),
  );
  const offset = Math.max(
    1,
    Math.min(
      TIME_GLITCH_MAX_OFFSET,
      Math.round(Number.isFinite(frameOffset) ? frameOffset : TIME_GLITCH_DEFAULT_OFFSET),
    ),
  );
  const grid = mode >= 0.5;
  const steps = grid ? 2 * (slices - 1) : slices - 1;
  return {
    slices,
    frameOffset: offset,
    history: 1 + steps * offset,
    grid,
  };
}

export function timeGlitchCompositeKey(
  layout: TimeGlitchLayout,
  direction: number,
  origin: number,
  slots: number,
): string {
  return [
    layout.slices,
    layout.frameOffset,
    layout.grid ? 1 : 0,
    direction >= 0.5 ? 1 : 0,
    Math.round(origin),
    Math.max(1, slots),
  ].join(":");
}

export function timeGlitchLoopFrameCount(durationSec: number): number {
  if (!(durationSec > 0)) return 0;
  return Math.max(1, Math.round(durationSec / TIME_GLITCH_FRAME_SEC));
}

export function resolveTimeGlitchSlotCount(
  layout: TimeGlitchLayout,
  durationSec: number,
): number {
  const needed = Math.max(1, layout.history);
  const loopFrames = timeGlitchLoopFrameCount(durationSec);
  if (loopFrames > 0) return Math.min(TIME_GLITCH_MAX_HISTORY, needed, loopFrames);
  return Math.min(TIME_GLITCH_SLOT_CAP, needed);
}

export function timeGlitchReadyCount(layout: TimeGlitchLayout, slots: number): number {
  return Math.max(1, Math.min(layout.history, Math.max(1, slots)));
}

export function timeGlitchWrappedAge(age: number, period: number): number {
  const p = Math.max(1, period);
  return ((Math.max(0, age) % p) + p) % p;
}

/** Wrap lookback through captured frames so slices repeat the loop instead of going empty. */
export function timeGlitchReadableAge(age: number, filled: number, period: number): number {
  const have = Math.max(1, Math.min(filled, Math.max(1, period)));
  return timeGlitchWrappedAge(age, have);
}

export function resolveTimeGlitchSampleTime(
  playheadSec: number,
  ageFrames: number,
  durationSec: number,
  frameSec = TIME_GLITCH_FRAME_SEC,
): number {
  const t = playheadSec - Math.max(0, ageFrames) * frameSec;
  if (!(durationSec > 0)) return Math.max(0, t);
  return ((t % durationSec) + durationSec) % durationSec;
}

export function isTimeInMediaRanges(ranges: TimeRanges, time: number, pad = 0.04): boolean {
  for (let i = 0; i < ranges.length; i++) {
    if (time >= ranges.start(i) - pad && time <= ranges.end(i) + pad) return true;
  }
  return false;
}

/** 0=Start (left/top) 1=Middle 2=End (right/bottom). */
export function timeGlitchAxisAge(
  index: number,
  slices: number,
  frameOffset: number,
  origin = 0,
): number {
  const n = Math.max(1, slices);
  const i = Math.max(0, Math.min(n - 1, Math.round(index)));
  const offset = Math.max(1, frameOffset);
  const o = Math.max(0, Math.min(2, Math.round(origin)));
  if (o >= 2) return (n - 1 - i) * offset;
  if (o >= 1) {
    const left = Math.floor((n - 1) / 2);
    const right = Math.ceil((n - 1) / 2);
    return Math.min(Math.abs(i - left), Math.abs(i - right)) * offset;
  }
  return i * offset;
}

export function timeGlitchSliceAge(
  sliceIndex: number,
  frameOffset: number,
  slices = TIME_GLITCH_DEFAULT_COLS,
  origin = 0,
): number {
  return timeGlitchAxisAge(sliceIndex, slices, frameOffset, origin);
}

export function timeGlitchCellAge(
  ix: number,
  iy: number,
  frameOffset: number,
  mode: number,
  direction: number,
  slices: number,
  origin = 0,
): number {
  const n = Math.max(1, slices);
  const offset = Math.max(1, frameOffset);
  const x = Math.max(0, Math.min(n - 1, ix));
  const y = Math.max(0, Math.min(n - 1, iy));
  const o = Math.max(0, Math.min(2, Math.round(origin)));
  if (mode >= 0.5) {
    if (o >= 1 && o < 2) {
      return (
        timeGlitchAxisAge(x, n, 1, 1) + timeGlitchAxisAge(y, n, 1, 1)
      ) * offset;
    }
    const fromEnd = o >= 2;
    const flip = direction >= 0.5 !== fromEnd;
    const originX = flip ? n - 1 - x : x;
    const originY = flip ? n - 1 - y : y;
    return (originX + originY) * offset;
  }
  return timeGlitchAxisAge(direction >= 0.5 ? y : x, n, offset, o);
}

export function timeGlitchUniqueAges(
  layout: TimeGlitchLayout,
  direction: number,
  origin = 0,
): number[] {
  const n = layout.slices;
  const ages = new Set<number>();
  if (layout.grid) {
    for (let iy = 0; iy < n; iy++) {
      for (let ix = 0; ix < n; ix++) {
        ages.add(timeGlitchCellAge(ix, iy, layout.frameOffset, 1, direction, n, origin));
      }
    }
  } else {
    for (let i = 0; i < n; i++) {
      ages.add(timeGlitchSliceAge(i, layout.frameOffset, n, origin));
    }
  }
  ages.add(0);
  return [...ages].toSorted((a, b) => a - b);
}

export function timeGlitchHistoryIndex(writeHead: number, age: number, historyLen: number): number {
  const len = Math.max(1, historyLen);
  return ((writeHead - age) % len + len) % len;
}

type ReglTexture = {
  subimage: (src: CanvasImageSource) => void;
  resize: (width: number, height: number) => void;
};

type ReglHost = {
  texture: (opts: object) => ReglTexture;
};

type ChannelRing = {
  slots: HTMLCanvasElement[];
  ctx: CanvasRenderingContext2D[];
  writeHead: number;
  lastSrc: string;
  lastCaptureTime: number;
  durationSec: number;
};

let tex: ReglTexture | null = null;
let rings: [ChannelRing | null, ChannelRing | null] = [null, null];
let composite: HTMLCanvasElement | null = null;
let compositeCtx: CanvasRenderingContext2D | null = null;
let lastLayoutKey = "";
let bufferReady = false;
let readySrc = "";
let histW = 0;
let histH = 0;
let compW = 0;
let compH = 0;
let slotCount = 0;

export function timeGlitchSourceKey(
  source: CanvasImageSource,
  clipHint?: string,
): string {
  const media =
    typeof HTMLVideoElement !== "undefined" && source instanceof HTMLVideoElement
      ? stabilizeVideoUrl(source.currentSrc || source.src)
      : "canvas";
  if (!media) return clipHint || "";
  return clipHint ? `${clipHint}|${media}` : media;
}

function stabilizeVideoUrl(raw: string): string {
  if (!raw) return "";
  try {
    return new URL(raw, typeof location !== "undefined" ? location.href : undefined).href;
  } catch {
    return raw;
  }
}

export function sourcePlayheadSec(source: CanvasImageSource): number | null {
  if (source instanceof HTMLVideoElement && Number.isFinite(source.currentTime)) {
    return source.currentTime;
  }
  return null;
}

export function videoLoopDurationSec(source: CanvasImageSource): number {
  if (
    source instanceof HTMLVideoElement &&
    Number.isFinite(source.duration) &&
    source.duration > 0
  ) {
    return source.duration;
  }
  return 0;
}

export function shouldCaptureTimeGlitchFrame(
  playheadSec: number | null,
  lastSec: number,
  frameSec = TIME_GLITCH_FRAME_SEC,
): boolean {
  if (playheadSec == null) return true;
  if (!Number.isFinite(lastSec)) return true;
  if (playheadSec + frameSec * 0.25 < lastSec) return true;
  return playheadSec - lastSec >= frameSec * 0.85;
}

export function initTimeGlitchBuffer(host: ReglHost) {
  tex = host.texture({ shape: [1, 1] });
}

export function getTimeGlitchSampler() {
  return {
    getTexture: () => tex,
  };
}

export function isTimeGlitchBufferReady() {
  return bufferReady;
}

function makeCtx(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) throw new Error("timeGlitch: 2d context unavailable");
  ctx.imageSmoothingEnabled = true;
  return ctx;
}

function allocSlots(count: number, width: number, height: number) {
  const next: HTMLCanvasElement[] = [];
  const nextCtx: CanvasRenderingContext2D[] = [];
  for (let i = 0; i < count; i++) {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    next.push(canvas);
    nextCtx.push(makeCtx(canvas));
  }
  return { slots: next, ctx: nextCtx };
}

function resizeCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
  if (canvas.width === width && canvas.height === height) return;
  canvas.width = width;
  canvas.height = height;
}

function resizeRingSlots(ring: ChannelRing) {
  for (let i = 0; i < ring.slots.length; i++) {
    const prev = ring.slots[i]!;
    if (prev.width === histW && prev.height === histH) continue;
    const next = document.createElement("canvas");
    next.width = histW;
    next.height = histH;
    const ctx = makeCtx(next);
    ctx.drawImage(prev, 0, 0, histW, histH);
    ring.slots[i] = next;
    ring.ctx[i] = ctx;
  }
}

function sourceReady(source: CanvasImageSource): boolean {
  if (typeof HTMLVideoElement !== "undefined" && source instanceof HTMLVideoElement) {
    return source.readyState >= 2 && source.videoWidth > 0 && source.videoHeight > 0;
  }
  if (source instanceof HTMLCanvasElement) {
    return source.width > 0 && source.height > 0;
  }
  return true;
}

function drawSource(ctx: CanvasRenderingContext2D, source: CanvasImageSource) {
  ctx.drawImage(source, 0, 0, histW, histH);
}

function makeRing(count: number): ChannelRing {
  const alloc = allocSlots(count, histW, histH);
  return {
    slots: alloc.slots,
    ctx: alloc.ctx,
    writeHead: 0,
    lastSrc: "",
    lastCaptureTime: Number.NaN,
    durationSec: 0,
  };
}

function ensureSharedSurfaces(destWidth: number, destHeight: number, nextSlots: number) {
  const w = Math.max(2, Math.round(destWidth));
  const h = Math.max(2, Math.round(destHeight));
  const nextHistW = Math.max(2, Math.min(640, w));
  const nextHistH = Math.max(2, Math.min(360, h));
  const count = Math.max(1, nextSlots);
  const histChanged = nextHistW !== histW || nextHistH !== histH;
  const compChanged = w !== compW || h !== compH;

  if (histChanged) {
    histW = nextHistW;
    histH = nextHistH;
    for (const ring of rings) {
      if (ring) resizeRingSlots(ring);
    }
    lastLayoutKey = "";
  }

  if (compChanged || !composite) {
    compW = w;
    compH = h;
    if (!composite) {
      composite = document.createElement("canvas");
      compositeCtx = makeCtx(composite);
    }
    resizeCanvas(composite, w, h);
    tex?.resize(w, h);
    lastLayoutKey = "";
  }

  slotCount = count;
  for (let i = 0; i < 2; i++) {
    const ring = rings[i];
    if (!ring) continue;
    if (ring.slots.length < count) {
      const extra = allocSlots(count - ring.slots.length, histW, histH);
      const latest = ring.writeHead > 0 ? ring.slots[(ring.writeHead - 1) % ring.slots.length] : null;
      if (latest) {
        for (const ctx of extra.ctx) ctx.drawImage(latest, 0, 0, histW, histH);
      }
      ring.slots.push(...extra.slots);
      ring.ctx.push(...extra.ctx);
    }
  }
}

function ensureRing(index: 0 | 1): ChannelRing {
  const existing = rings[index];
  if (existing) return existing;
  const ring = makeRing(Math.max(1, slotCount));
  rings[index] = ring;
  return ring;
}

function captureChannel(index: 0 | 1, source: CanvasImageSource, burstUntil = 0) {
  if (!sourceReady(source)) return;
  const ring = ensureRing(index);
  const srcKey = timeGlitchSourceKey(source);
  if (!srcKey) return;
  const playhead = sourcePlayheadSec(source);
  if (srcKey !== ring.lastSrc) {
    ring.lastSrc = srcKey;
    ring.durationSec = videoLoopDurationSec(source);
    drawSource(ring.ctx[0]!, source);
    ring.writeHead = 1;
    ring.lastCaptureTime = playhead ?? Number.NaN;
    return;
  }
  const duration = videoLoopDurationSec(source);
  if (duration > 0) ring.durationSec = duration;
  const bursting = ring.writeHead < Math.max(1, burstUntil);
  if (!bursting && !shouldCaptureTimeGlitchFrame(playhead, ring.lastCaptureTime)) return;
  const slot = ring.writeHead % Math.max(1, ring.slots.length);
  drawSource(ring.ctx[slot]!, source);
  if (playhead != null) ring.lastCaptureTime = playhead;
  ring.writeHead += 1;
}

function sampleAge(age: number, filled: number, period: number): number {
  return timeGlitchReadableAge(age, filled, period);
}

function compositeRing(
  ring: ChannelRing,
  layout: TimeGlitchLayout,
  direction: number,
  origin: number,
) {
  const ctx = compositeCtx!;
  const n = layout.slices;
  const mode = layout.grid ? 1 : 0;
  const period = Math.max(1, ring.slots.length);
  const filled = Math.min(Math.max(1, ring.writeHead), period);
  const latest = ring.writeHead - 1;
  const indexPeriod = filled;

  if (layout.grid) {
    const dw = compW / n;
    const dh = compH / n;
    const sw = histW / n;
    const sh = histH / n;
    for (let iy = 0; iy < n; iy++) {
      for (let ix = 0; ix < n; ix++) {
        const age = sampleAge(
          timeGlitchCellAge(ix, iy, layout.frameOffset, mode, direction, n, origin),
          filled,
          period,
        );
        const idx = timeGlitchHistoryIndex(latest, age, indexPeriod);
        ctx.drawImage(ring.slots[idx]!, ix * sw, iy * sh, sw, sh, ix * dw, iy * dh, dw, dh);
      }
    }
    return;
  }

  if (direction >= 0.5) {
    const dh = compH / n;
    const sh = histH / n;
    for (let i = 0; i < n; i++) {
      const age = sampleAge(timeGlitchSliceAge(i, layout.frameOffset, n, origin), filled, period);
      const idx = timeGlitchHistoryIndex(latest, age, indexPeriod);
      ctx.drawImage(ring.slots[idx]!, 0, i * sh, histW, sh, 0, i * dh, compW, dh);
    }
    return;
  }

  const dw = compW / n;
  const sw = histW / n;
  for (let i = 0; i < n; i++) {
    const age = sampleAge(timeGlitchSliceAge(i, layout.frameOffset, n, origin), filled, period);
    const idx = timeGlitchHistoryIndex(latest, age, indexPeriod);
    ctx.drawImage(ring.slots[idx]!, i * sw, 0, sw, histH, i * dw, 0, dw, compH);
  }
}

function asImageSource(value: unknown): CanvasImageSource | null {
  if (!value) return null;
  if (typeof HTMLVideoElement !== "undefined" && value instanceof HTMLVideoElement) return value;
  if (value instanceof HTMLCanvasElement) return value;
  return null;
}

export function tickTimeGlitchBuffer(opts: {
  source?: CanvasImageSource | null;
  sources?: readonly unknown[];
  activeChannel?: 0 | 1;
  enabled: boolean;
  warm?: boolean;
  amount: number;
  cols: number;
  frameOffset: number;
  direction: number;
  origin?: number;
  mode: number;
  destWidth: number;
  destHeight: number;
  clipKey?: string;
}) {
  const live = Boolean(opts.enabled) && opts.amount >= 0.00001;
  const armed = live || Boolean(opts.warm);
  if (!armed || !tex) return;

  const channelA = asImageSource(opts.sources?.[0]) ?? (opts.activeChannel !== 1 ? opts.source ?? null : null);
  const channelB = asImageSource(opts.sources?.[1]) ?? (opts.activeChannel === 1 ? opts.source ?? null : null);
  const activeIndex: 0 | 1 = opts.activeChannel === 1 ? 1 : 0;
  const activeSource = activeIndex === 1 ? channelB : channelA;
  const durationSource = activeSource ?? channelA ?? channelB;
  if (!durationSource) return;

  const duration =
    videoLoopDurationSec(durationSource) || rings[activeIndex]?.durationSec || 0;
  const layout = resolveTimeGlitchLayout(opts.cols, opts.frameOffset, opts.mode);
  const intendedSlots = resolveTimeGlitchSlotCount(layout, duration);
  ensureSharedSurfaces(opts.destWidth, opts.destHeight, intendedSlots);
  const origin = opts.origin ?? 0;
  const needed = timeGlitchReadyCount(layout, intendedSlots);

  if (channelA) captureChannel(0, channelA, needed);
  if (channelB) captureChannel(1, channelB, needed);
  if (!live) return;

  const ring = rings[activeIndex];
  const srcKey = ring?.lastSrc || "";
  if (!ring || ring.writeHead <= 0) {
    if (srcKey !== readySrc) bufferReady = false;
    return;
  }

  if (srcKey !== readySrc) {
    if (ring.writeHead < needed) {
      bufferReady = false;
      return;
    }
    readySrc = srcKey;
  }
  bufferReady = true;

  const layoutKey = `${activeIndex}:${ring.lastSrc}:${timeGlitchCompositeKey(layout, opts.direction, origin, ring.slots.length)}:${ring.writeHead}`;
  if (layoutKey === lastLayoutKey) return;
  compositeRing(ring, layout, opts.direction, origin);
  tex.subimage(composite!);
  lastLayoutKey = layoutKey;
}
