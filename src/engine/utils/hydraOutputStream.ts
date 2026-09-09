import { ingestOutputDisplayPing } from "./outputDisplayTarget";
import outputKeepaliveWorkletSource from "./outputKeepalive.worklet.js?raw";

/** Copy the live Hydra frame into an output window. No second synth. */

export const HEXA_OPEN_OUTPUT_EVENT = "hexa-open-output";
export const HEXA_OUTPUT_CHANNEL = "hexa-hydra-output";
export const HEXA_OUTPUT_READY = "hexa-output-ready";
export const HEXA_OUTPUT_TICK = "hexa-output-tick";
export const HEXA_OUTPUT_PULSE = "hexa-output-pulse";
export const OUTPUT_INTERRUPT_STALE_MS = 500;
export const OUTPUT_INTERRUPT_FADE_MS = 800;

const OUTPUT_LIVE_MS = 2500;
const OUTPUT_PUMP_MIN_MS = 8;
const OUTPUT_PUMP_ORDER = ["analyzer", "automix", "hydra"] as const;

let sourceCanvas: HTMLCanvasElement | null = null;
let outputClipReady = false;
let outputWindow: Window | null = null;
let pixelBuf: Uint8Array | null = null;
let flippedBuf: Uint8ClampedArray | null = null;
let outputChannel: BroadcastChannel | null = null;
let wantOutputUntil = 0;
let lastOutputPumpMs = 0;
let outputPumpRunning = false;
const outputPumps: { id: string; fn: () => void }[] = [];
export const OUTPUT_KEEPALIVE_PROCESSOR = "hexa-output-keepalive";

let keepaliveAudio: HTMLAudioElement | null = null;
let keepaliveCtx: AudioContext | null = null;
let keepaliveProcessor: AudioNode | null = null;
let keepaliveWatch = 0;
let keepaliveGeneration = 0;

/** Hidden-tab throttle is for battery, not for a live projector feed. */
export function shouldThrottleHiddenVisuals(hidden: boolean, outputLive: boolean): boolean {
  return hidden && !outputLive;
}

export function isHydraOutputLive(now = Date.now()): boolean {
  if (outputWindow && !outputWindow.closed) return true;
  return now <= wantOutputUntil;
}

/** Visible output window keeps rAF alive; use it when the session tab is hidden or unfocused. */
export function isOutputDrivingVisuals(): boolean {
  if (typeof document === "undefined" || !isHydraOutputLive()) return false;
  return document.hidden || !document.hasFocus();
}

export function registerOutputLivePump(id: string, fn: () => void): () => void {
  const next = outputPumps.filter((p) => p.id !== id);
  next.push({ id, fn });
  next.sort((a, b) => {
    const ai = OUTPUT_PUMP_ORDER.indexOf(a.id as (typeof OUTPUT_PUMP_ORDER)[number]);
    const bi = OUTPUT_PUMP_ORDER.indexOf(b.id as (typeof OUTPUT_PUMP_ORDER)[number]);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
  outputPumps.length = 0;
  outputPumps.push(...next);
  return () => {
    const i = outputPumps.findIndex((p) => p.id === id);
    if (i >= 0) outputPumps.splice(i, 1);
  };
}

function markOutputLive() {
  wantOutputUntil = Date.now() + OUTPUT_LIVE_MS;
}

function runOutputLivePumps(force = false) {
  markOutputLive();
  if (!force && !isOutputDrivingVisuals()) return;
  if (outputPumpRunning) return;
  const now = performance.now();
  if (now - lastOutputPumpMs < OUTPUT_PUMP_MIN_MS) return;
  lastOutputPumpMs = now;
  outputPumpRunning = true;
  try {
    for (const pump of outputPumps) pump.fn();
  } finally {
    outputPumpRunning = false;
  }
}

/** Visible output window calls this on the opener — hidden tabs ignore postMessage. */
export function pullHydraOutputFrame(): boolean {
  startOutputKeepalive();
  runOutputLivePumps(true);
  return true;
}

/** Hold the dual-window stream until the boot clip has settled (splash covers the main view only). */
export function setHydraOutputClipReady(ready: boolean): void {
  outputClipReady = ready;
}

export function isHydraOutputClipReady(): boolean {
  return outputClipReady;
}

export function getHydraOutputMediaStream(): MediaStream | null {
  if (!outputClipReady) return null;
  if (!sourceCanvas || typeof sourceCanvas.captureStream !== "function") return null;
  try {
    return sourceCanvas.captureStream(60);
  } catch {
    return null;
  }
}

const SILENT_WAV =
  "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";

function startOutputKeepalive() {
  if (typeof document === "undefined") return;
  if (!keepaliveAudio) {
    const audio = document.createElement("audio");
    audio.src = SILENT_WAV;
    audio.loop = true;
    audio.volume = 0.001;
    audio.setAttribute("playsinline", "");
    audio.setAttribute("aria-hidden", "true");
    void audio.play().catch(() => {});
    keepaliveAudio = audio;
  } else if (keepaliveAudio.paused) {
    void keepaliveAudio.play().catch(() => {});
  }

  if (keepaliveCtx) {
    void keepaliveCtx.resume().catch(() => {});
    return;
  }
  const AudioCtx = window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return;
  const ctx = new AudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  gain.gain.value = 0.0001;
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  void ctx.resume().catch(() => {});
  keepaliveCtx = ctx;
  void attachOutputKeepaliveProcessor(ctx, gain);
  if (!keepaliveWatch) {
    keepaliveWatch = window.setInterval(() => {
      if (!isHydraOutputLive()) stopOutputKeepalive();
    }, 2000);
  }
}

async function attachOutputKeepaliveProcessor(ctx: AudioContext, gain: GainNode) {
  const generation = keepaliveGeneration;
  const silent = ctx.createGain();
  silent.gain.value = 0;

  if (ctx.audioWorklet) {
    const workletUrl = URL.createObjectURL(
      new Blob([outputKeepaliveWorkletSource], { type: "application/javascript" }),
    );
    try {
      await ctx.audioWorklet.addModule(workletUrl);
      if (generation !== keepaliveGeneration || keepaliveCtx !== ctx) return;
      const node = new AudioWorkletNode(ctx, OUTPUT_KEEPALIVE_PROCESSOR);
      node.port.addEventListener("message", () => {
        if (isOutputDrivingVisuals()) runOutputLivePumps();
      });
      silent.connect(node);
      node.connect(gain);
      keepaliveProcessor = node;
      return;
    } catch {
      if (generation !== keepaliveGeneration || keepaliveCtx !== ctx) return;
    } finally {
      URL.revokeObjectURL(workletUrl);
    }
  }

  if (generation !== keepaliveGeneration || keepaliveCtx !== ctx) return;
  const processor = ctx.createScriptProcessor(512, 1, 1);
  processor.onaudioprocess = () => {
    if (isOutputDrivingVisuals()) runOutputLivePumps();
  };
  silent.connect(processor);
  processor.connect(gain);
  keepaliveProcessor = processor;
}

function stopOutputKeepalive() {
  keepaliveGeneration += 1;
  if (keepaliveWatch) {
    window.clearInterval(keepaliveWatch);
    keepaliveWatch = 0;
  }
  keepaliveProcessor?.disconnect();
  keepaliveProcessor = null;
  void keepaliveCtx?.close().catch(() => {});
  keepaliveCtx = null;
  if (keepaliveAudio) {
    keepaliveAudio.pause();
    keepaliveAudio.src = "";
    keepaliveAudio = null;
  }
}

function isOutputTickPayload(data: unknown): boolean {
  return Boolean(data && typeof data === "object" && (data as { type?: string }).type === HEXA_OUTPUT_TICK);
}

export function isOutputStreamInterrupted(
  lastPulseMs: number,
  now = typeof performance !== "undefined" ? performance.now() : 0,
  openerClosed = false,
): boolean {
  if (!lastPulseMs) return false;
  return openerClosed || now - lastPulseMs > OUTPUT_INTERRUPT_STALE_MS;
}

function emitOutputPulse() {
  const payload = { type: HEXA_OUTPUT_PULSE };
  const channel = ensureOutputChannel();
  try {
    // BroadcastChannel.postMessage has no targetOrigin; oxlint maps this to Window.postMessage.
    // oxlint-disable-next-line unicorn/require-post-message-target-origin
    channel?.postMessage(payload);
  } catch {
    /* channel closed */
  }
  const win = outputWindow && !outputWindow.closed ? outputWindow : null;
  if (win) {
    try {
      win.postMessage(payload, "*");
    } catch {
      /* popup gone */
    }
  }
}

function glOf(canvas: HTMLCanvasElement) {
  return (
    canvas.getContext("webgl2") ||
    canvas.getContext("webgl") ||
    canvas.getContext("experimental-webgl")
  ) as WebGLRenderingContext | WebGL2RenderingContext | null;
}

function ensureOutputChannel() {
  if (outputChannel || typeof BroadcastChannel === "undefined") return outputChannel;
  outputChannel = new BroadcastChannel(HEXA_OUTPUT_CHANNEL);
  outputChannel.addEventListener("message", (event) => {
    if (isOutputTickPayload(event.data)) {
      runOutputLivePumps();
      return;
    }
    if (event.data?.type !== HEXA_OUTPUT_READY) return;
    markOutputLive();
    startOutputKeepalive();
    ingestOutputDisplayPing(event.data);
  });
  return outputChannel;
}

export function blitHydraOutput() {
  if (!outputClipReady) return;
  const src = sourceCanvas;
  if (!src || src.width < 2 || src.height < 2) return;
  const channel = ensureOutputChannel();
  const win = outputWindow && !outputWindow.closed ? outputWindow : null;
  if (!win && Date.now() > wantOutputUntil) return;

  const w = src.width;
  const h = src.height;
  const gl = glOf(src);
  if (!gl) return;
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  const need = w * h * 4;
  if (!pixelBuf || pixelBuf.length !== need) pixelBuf = new Uint8Array(need);
  if (!flippedBuf || flippedBuf.length !== need) flippedBuf = new Uint8ClampedArray(need);
  gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixelBuf);

  const row = w * 4;
  for (let y = 0; y < h; y++) {
    flippedBuf.set(pixelBuf.subarray((h - 1 - y) * row, (h - y) * row), y * row);
  }

  const payload = { type: "hexa-frame", w, h, pixels: flippedBuf.slice().buffer };
  try {
    // BroadcastChannel.postMessage has no targetOrigin; oxlint maps this to Window.postMessage.
    // oxlint-disable-next-line unicorn/require-post-message-target-origin
    channel?.postMessage(payload);
  } catch {
    /* channel closed */
  }
  if (win) {
    try {
      win.postMessage(payload, "*");
    } catch {
      /* popup gone */
    }
  }
  emitOutputPulse();
}

export const requestHydraOutputFrame = blitHydraOutput;

export const OUTPUT_PLAYER_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>SlopMotion output</title>
<style>
  html, body { margin: 0; background: #000; height: 100%; overflow: hidden; }
  canvas, video { display: block; width: 100%; height: 100%; object-fit: contain; background: #000; }
  #hexa-output-veil {
    position: absolute; inset: 0; background: #000; opacity: 1; pointer-events: none;
    transition: opacity ${OUTPUT_INTERRUPT_FADE_MS}ms ease;
  }
  #hexa-output-veil.live { opacity: 0; }
  #hexa-output-mark {
    position: absolute; right: 3.5%; bottom: 5%;
    display: flex; align-items: center; gap: 10px; opacity: 0.7;
  }
  #hexa-output-mark svg { display: block; width: 36px; height: 36px; }
  #hexa-output-mark span {
    font: 500 12px/1 system-ui, sans-serif;
    letter-spacing: 0.32em; text-transform: uppercase;
    color: rgba(244, 239, 230, 0.88);
  }
</style>
</head>
<body>
<video id="hexa-output-video" autoplay muted playsinline></video>
<canvas id="hexa-output-canvas"></canvas>
<div id="hexa-output-veil">
  <div id="hexa-output-mark">
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M7 10.5c3.2-4.2 6.4-4.2 9.6 0s6.4 4.2 9.6 0" stroke="#22e0ff" stroke-width="2.4" stroke-linecap="round"/>
      <path d="M7 16c3.2-3.2 6.4-3.2 9.6 0s6.4 3.2 9.6 0" stroke="#f4efe6" stroke-width="2" stroke-linecap="round" opacity="0.55"/>
      <path d="M7 21.5c3.2-4.2 6.4-4.2 9.6 0s6.4 4.2 9.6 0" stroke="#22e0ff" stroke-width="2.4" stroke-linecap="round" opacity="0.85"/>
    </svg>
    <span>SlopMotion</span>
  </div>
</div>
<script>
const canvas = document.getElementById("hexa-output-canvas");
const video = document.getElementById("hexa-output-video");
const veil = document.getElementById("hexa-output-veil");
const ctx = canvas.getContext("2d", { alpha: false });
const bc = new BroadcastChannel("hexa-hydra-output");
var lastPulse = 0;
function markPulse() {
  lastPulse = performance.now();
  veil.classList.add("live");
}
function checkInterrupt() {
  if (!lastPulse) return;
  if (!openerLive() || performance.now() - lastPulse > ${OUTPUT_INTERRUPT_STALE_MS}) veil.classList.remove("live");
}
video.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#000";
canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:contain";
function openerLive() {
  return window.opener && !window.opener.closed;
}
function attachStream() {
  if (!openerLive() || !window.opener.__hexaCaptureStream) return false;
  try {
    var stream = window.opener.__hexaCaptureStream();
    if (!stream) return false;
    video.srcObject = stream;
    video.play().catch(function () {});
    canvas.style.display = "none";
    return true;
  } catch (e) {
    return false;
  }
}
function pumpOpener() {
  if (!openerLive() || typeof window.opener.__hexaPumpFromOutput !== "function") return false;
  try {
    window.opener.__hexaPumpFromOutput();
    return true;
  } catch (e) {
    return false;
  }
}
function displayPing() {
  var fs = Boolean(document.fullscreenElement)
    || (Math.abs(window.innerWidth - screen.width) < 8 && Math.abs(window.innerHeight - screen.height) < 8);
  return {
    type: "hexa-output-ready",
    screenWidth: screen.width,
    screenHeight: screen.height,
    dpr: window.devicePixelRatio || 1,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    fullscreen: fs
  };
}
function ping() {
  var payload = displayPing();
  bc.postMessage(payload);
  if (openerLive()) window.opener.postMessage(payload, "*");
}
function streamIsLive(src) {
  return src && typeof src.getTracks === "function" && src.getTracks().some(function (track) {
    return track.readyState === "live";
  });
}
function tickLoop() {
  requestAnimationFrame(tickLoop);
  if (!streamIsLive(video.srcObject)) attachStream();
  pumpOpener();
  checkInterrupt();
}
ping();
setInterval(ping, 500);
attachStream();
requestAnimationFrame(tickLoop);
window.addEventListener("resize", ping);
window.addEventListener("fullscreenchange", ping);
function paint(msg) {
  if (!msg) return;
  if (msg.type === "hexa-output-pulse") {
    markPulse();
    return;
  }
  if (msg.type !== "hexa-frame") return;
  markPulse();
  if (video.srcObject) return;
  if (canvas.width !== msg.w) canvas.width = msg.w;
  if (canvas.height !== msg.h) canvas.height = msg.h;
  const image = ctx.createImageData(msg.w, msg.h);
  image.data.set(new Uint8ClampedArray(msg.pixels));
  ctx.putImageData(image, 0, 0);
}
bc.addEventListener("message", (event) => paint(event.data));
window.addEventListener("message", (event) => paint(event.data));
</script>
</body>
</html>`;

export type OutputPlayerPlacement = {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
};

type OutputGlobals = {
  __hydraOpenOutput?: typeof openHydraOutputPlayer;
  __hydraOutputDebug?: () => unknown;
  __hexaOutputPlacement?: OutputPlayerPlacement;
  __hexaPumpFromOutput?: typeof pullHydraOutputFrame;
  __hexaCaptureStream?: typeof getHydraOutputMediaStream;
};

function bindOutputGlobals() {
  const w = window as unknown as OutputGlobals;
  w.__hydraOpenOutput = openHydraOutputPlayer;
  w.__hexaPumpFromOutput = pullHydraOutputFrame;
  w.__hexaCaptureStream = getHydraOutputMediaStream;
  w.__hydraOutputDebug = () => ({
    src: sourceCanvas ? { id: sourceCanvas.id, w: sourceCanvas.width, h: sourceCanvas.height } : null,
    win: Boolean(outputWindow && !outputWindow.closed),
    keepalive: Boolean(keepaliveAudio && !keepaliveAudio.paused),
  });
}

let lastPlacement: OutputPlayerPlacement | undefined;

function resolvedPlacement(placement?: OutputPlayerPlacement): OutputPlayerPlacement | undefined {
  const fromWin = (window as unknown as OutputGlobals).__hexaOutputPlacement;
  const p = placement ?? lastPlacement ?? fromWin;
  if (placement) lastPlacement = placement;
  return p;
}

export function openHydraOutputPlayer(placement?: OutputPlayerPlacement): Window | null {
  const p = resolvedPlacement(placement);
  const features = [
    "popup=yes",
    "toolbar=no",
    "menubar=no",
    "location=no",
    "status=no",
    "scrollbars=no",
  ];
  if (p) {
    if (Number.isFinite(p.left)) features.push(`left=${Math.round(p.left!)}`);
    if (Number.isFinite(p.top)) features.push(`top=${Math.round(p.top!)}`);
    if (Number.isFinite(p.width)) features.push(`width=${Math.round(p.width!)}`);
    if (Number.isFinite(p.height)) features.push(`height=${Math.round(p.height!)}`);
  }
  const win = window.open("about:blank", "hexa-output", features.join(","));
  if (!win) {
    console.warn("Output window was blocked. Press D in the live session.");
    return null;
  }
  outputWindow = win;
  markOutputLive();
  bindOutputGlobals();
  startOutputKeepalive();
  try {
    win.document.open();
    win.document.write(OUTPUT_PLAYER_HTML);
    win.document.close();
  } catch (error) {
    console.warn("Could not write output player document", error);
  }
  if (p && Number.isFinite(p.left) && Number.isFinite(p.top)) {
    try {
      win.moveTo(Math.round(p.left!), Math.round(p.top!));
      if (Number.isFinite(p.width) && Number.isFinite(p.height)) {
        win.resizeTo(Math.round(p.width!), Math.round(p.height!));
      }
    } catch {
      /* popup move blocked */
    }
  }
  return win;
}

export function publishHydraCanvas(canvas: HTMLCanvasElement): () => void {
  sourceCanvas = canvas;
  ensureOutputChannel();
  bindOutputGlobals();

  const onReady = (event: MessageEvent) => {
    if (isOutputTickPayload(event.data)) {
      if (event.source instanceof Window) outputWindow = event.source;
      runOutputLivePumps();
      return;
    }
    if (event.data?.type !== HEXA_OUTPUT_READY) return;
    if (event.source instanceof Window) outputWindow = event.source;
    markOutputLive();
    startOutputKeepalive();
    ingestOutputDisplayPing(event.data);
  };
  window.addEventListener("message", onReady);

  return () => {
    window.removeEventListener("message", onReady);
    if (sourceCanvas === canvas) sourceCanvas = null;
  };
}

if (typeof window !== "undefined") {
  window.addEventListener(HEXA_OPEN_OUTPUT_EVENT, () => {
    openHydraOutputPlayer();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && isHydraOutputLive()) startOutputKeepalive();
  });
}
