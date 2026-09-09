type ResizeGate = {
  pause: () => void;
  resume: () => void;
};

export type HydraFboResizeHost = {
  o: Array<{ resize: (width: number, height: number) => void }>;
  s: Array<{ resize: (width: number, height: number) => void }>;
  regl: { _refresh: () => void; poll?: () => void };
};

export type HydraResolutionHost = HydraFboResizeHost & {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  sandbox: { set: (key: string, value: number) => void };
};

type FboResizeJob = { host: HydraResolutionHost; width: number; height: number };

let gate: ResizeGate | null = null;
let onResizeComplete: (() => void) | null = null;
let pending: FboResizeJob | null = null;
let flushRaf = 0;
let resizePaused = false;
let renderDepth = 0;
const MAX_RETRIES = 12;
const MAX_WAIT_FRAMES = 120;
const IDLE_FRAMES_AFTER_PAUSE = 2;
const REGl_DRAIN_POLLS = 16;

export function registerHydraResizeGate(next: ResizeGate | null): void {
  gate = next;
}

export function registerHydraResizeComplete(next: (() => void) | null): void {
  onResizeComplete = next;
}

/** True while FBO resize is paused — skip hydra.tick so regl FBs are not in use. */
export function isHydraRenderPaused(): boolean {
  return resizePaused;
}

export function isHydraFboResizePending(): boolean {
  return pending !== null || flushRaf !== 0;
}

export function beginHydraRender(): void {
  renderDepth += 1;
}

export function endHydraRender(): void {
  renderDepth = Math.max(0, renderDepth - 1);
}

function beginResizePause(): void {
  if (resizePaused) return;
  resizePaused = true;
  gate?.pause();
}

function finishResizePause(): void {
  if (!resizePaused) return;
  resizePaused = false;
  gate?.resume();
}

function drainRegl(host: HydraFboResizeHost, polls = REGl_DRAIN_POLLS): void {
  for (let i = 0; i < polls; i++) {
    host.regl.poll?.();
  }
  host.regl._refresh();
}

function resizeFbo(
  resize: (width: number, height: number) => void,
  width: number,
  height: number,
  host: HydraFboResizeHost,
): void {
  drainRegl(host);
  resize(width, height);
  drainRegl(host, 8);
}

function runFboResize(job: FboResizeJob): void {
  for (let i = 0; i < job.host.o.length; i++) {
    const output = job.host.o[i];
    if (!output?.resize) continue;
    resizeFbo((w, h) => output.resize(w, h), job.width, job.height, job.host);
  }
  for (let i = 0; i < job.host.s.length; i++) {
    const source = job.host.s[i];
    if (!source?.resize) continue;
    source.resize(job.width, job.height);
  }
  drainRegl(job.host);
}

function commitCanvas(host: HydraResolutionHost, width: number, height: number): void {
  host.canvas.width = width;
  host.canvas.height = height;
  host.width = width;
  host.height = height;
  host.sandbox.set("width", width);
  host.sandbox.set("height", height);
}

function sameResizeJob(a: FboResizeJob | null, b: FboResizeJob | null): boolean {
  return !!a && !!b && a.host === b.host && a.width === b.width && a.height === b.height;
}

function scheduleFlush(retry = 0): void {
  if (flushRaf) {
    cancelAnimationFrame(flushRaf);
    flushRaf = 0;
  }
  flushRaf = requestAnimationFrame(() => flushFboResize(retry));
}

function completeResizeCycle(): void {
  finishResizePause();
  onResizeComplete?.();
}

/** Resume loops when FBO resize finished but pause was never cleared (e.g. stale flush). */
export function recoverStuckHydraResize(): void {
  if (!resizePaused || pending !== null || flushRaf !== 0) return;
  console.warn("[hydra] recovering stuck resize pause");
  completeResizeCycle();
}

/**
 * Commit the canvas backing store first, then resize the regl FBOs. Order matters:
 * regl only refreshes its cached drawing-buffer size (used for the screen viewport)
 * on poll/_refresh, which runFboResize runs last. Resizing FBOs before the canvas
 * leaves regl drawing the output at the old viewport — cropped / letterboxed / off-center.
 */
function applyResizeJob(job: FboResizeJob): void {
  commitCanvas(job.host, job.width, job.height);
  runFboResize(job);
}

function flushFboResize(retry = 0): void {
  flushRaf = 0;
  if (!pending) {
    if (resizePaused) {
      console.warn("[hydra] FBO flush ended with no pending job while paused — recovering");
      completeResizeCycle();
    }
    return;
  }

  beginResizePause();

  let idleFrames = 0;
  let waitFrames = 0;

  const attempt = () => {
    if (renderDepth > 0) {
      waitFrames += 1;
      if (waitFrames >= MAX_WAIT_FRAMES) {
        renderDepth = 0;
      } else {
        flushRaf = requestAnimationFrame(attempt);
        return;
      }
    }

    // Always settle on the most recent requested size so rapid resizes coalesce.
    const job = pending;
    if (!job) {
      completeResizeCycle();
      return;
    }

    drainRegl(job.host, 8);

    if (idleFrames < IDLE_FRAMES_AFTER_PAUSE) {
      idleFrames += 1;
      flushRaf = requestAnimationFrame(attempt);
      return;
    }

    try {
      applyResizeJob(job);
      // A newer size may have arrived while we were settling — chain to it.
      if (!sameResizeJob(pending, job)) {
        idleFrames = 0;
        waitFrames = 0;
        flushRaf = requestAnimationFrame(attempt);
        return;
      }
      pending = null;
      completeResizeCycle();
    } catch (err) {
      if (retry < MAX_RETRIES) {
        idleFrames = 0;
        scheduleFlush(retry + 1);
        return;
      }
      console.warn("[hydra] FBO resize failed after retries", err);
      // Leave the canvas at its previous (consistent) size rather than force a
      // desync; resume so the loop keeps running and a later resize can retry.
      pending = null;
      completeResizeCycle();
    }
  };

  flushRaf = requestAnimationFrame(attempt);
}

/**
 * Queue a Hydra resolution change. The regl FBOs and the canvas backing store
 * are resized together on the next idle frame (when no regl pass is mid-flight).
 * Resizing FBOs synchronously mid-pass throws and leaves the output FBO desynced
 * from the canvas — which renders the video cropped / letterboxed / off-center.
 */
export function applyHydraResolution(host: HydraResolutionHost, width: number, height: number): void {
  if (host.width === width && host.height === height && host.canvas.width === width && host.canvas.height === height) {
    // Backing already matches; only (re)schedule if a flush is still owed.
    if (pending || resizePaused) {
      pending = { host, width, height };
      scheduleFlush(0);
    }
    return;
  }
  pending = { host, width, height };
  beginResizePause();
  scheduleFlush(0);
}

export function cancelHydraFboResize(): void {
  if (flushRaf) {
    cancelAnimationFrame(flushRaf);
    flushRaf = 0;
  }
  pending = null;
  finishResizePause();
}
