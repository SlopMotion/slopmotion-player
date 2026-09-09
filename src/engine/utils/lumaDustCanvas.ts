/**
 * Luma dust — dense square particles pulled toward moving light; detach when left behind.
 */

import {
  LUMA_DUST_SPECTRAL_DEFAULT,
  LUMA_DUST_SPREAD_START,
  dustBudgetSplit,
  dustCenterDist,
  dustDetachedLife,
  dustEdgeFade,
  dustLifeFade,
  dustFadeIn,
  dustFadeInDuration,
  dustGrowScale,
  DUST_WHITE_LUMA,
  dustFlashSpend,
  dustHotGate,
  dustHotSpend,
  dustIsHot,
  dustIsWhite,
  dustIsWhiteOnset,
  dustLumaReleased,
  lumaAtUv,
  dustSpawnBudget,
  dustSpawnScore,
  dustSpectralHueT,
  dustSpreadRadius,
  mixSpectralTint,
} from "./lumaDustLook";

export const LUMA_DUST_MAX_EDGE = 4096;
const LUMA_DUST_REF_WIDTH = 512;
const SAMPLE_W = 128;
const SAMPLE_H = 72;

const ABSOLUTE_MAX_PARTICLES = 18000;
const PARTICLE_SIZE = 0.95;
const SHINY_FLOOR = 0.32;
const SHINY_PEAK_RATIO = 0.64;
const SPAWN_PER_CELL = 5;

export type LumaDustParticle = {
  active: boolean;
  attached: boolean;
  u: number;
  v: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  age: number;
  seed: number;
  lightU: number;
  lightV: number;
  castLuma: number;
  size: number;
  r: number;
  g: number;
  b: number;
};

export type LumaDustBundle = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  buffer: HTMLCanvasElement;
  bufferCtx: CanvasRenderingContext2D;
  sampleCanvas: HTMLCanvasElement;
  sampleCtx: CanvasRenderingContext2D;
  lumaData: Uint8ClampedArray | null;
  particles: LumaDustParticle[];
  lastUploadMs: number;
  turbPhase: number;
  burstPhase: number;
  lastSampleMs: number;
  spreadRadius: number;
  prevLuma: Float32Array | null;
};

type LightField = {
  luma: Float32Array;
  cr: Float32Array;
  cg: Float32Array;
  cb: Float32Array;
};

export type LumaDustTexSource = {
  tex?: {
    width?: number;
    height?: number;
    resize?: (width: number, height: number) => void;
    subimage: (img: CanvasImageSource) => void;
  };
};

export type LumaDustDrawOpts = {
  amount: number;
  stick: number;
  detach: number;
  burst: number;
  turbulence: number;
  size: number;
  brightness: number;
  spectral: number;
  density: number;
  quality: number;
  trail: number;
  skipVideoSample: boolean;
  dt: number;
  pixelWidth?: number;
  pixelHeight?: number;
};

type LumaSample = { u: number; v: number; luma: number; r: number; g: number; b: number };

function clamp(v: number, lo: number, hi: number, fallback: number): number {
  return Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : fallback;
}

function dustSizeScale(size: number): number {
  return clamp(size, 0.4, 1.8, 1);
}

function dustBrightnessScale(brightness: number): number {
  return 0.32 + clamp(brightness, 0, 1, 0.65) * 1.28;
}

function resolveMaxParticles(density: number): number {
  return Math.round(2500 + clamp(density, 0, 1, 0.5) * 13500);
}

function resolveRenderScale(quality: number): number {
  return 0.4 + clamp(quality, 0, 1, 0.55) * 0.6;
}

function resolveSampleIntervalMs(quality: number): number {
  return Math.round(16 - clamp(quality, 0, 1, 0.55) * 8);
}

function hash2(x: number, y: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function turbField(u: number, v: number, phase: number): [number, number] {
  const p = phase * 0.001;
  let nx = 0;
  let ny = 0;
  let amp = 0.55;
  let px = u * 5.5 + p * 0.31;
  let py = v * 5.5 + p * 0.27;
  for (let i = 0; i < 4; i++) {
    nx += (hash2(px, py) - 0.5) * amp;
    ny += (hash2(px + 17.3, py + 11.1) - 0.5) * amp;
    px *= 2.1;
    py *= 2.1;
    amp *= 0.5;
  }
  return [nx, ny];
}

function outwardSwirlForce(u: number, v: number, phase: number, seed: number): [number, number] {
  const cx = u - 0.5;
  const cy = v - 0.5;
  const dist = Math.hypot(cx, cy) + 1e-4;
  const outU = cx / dist;
  const outV = cy / dist;
  const tanU = -outV;
  const tanV = outU;

  const edgeBiasU =
    (u < 0.5 ? -1 + u * 2 : (u - 0.5) * 2) * (1 - Math.abs(cx) * 1.6);
  const edgeBiasV =
    (v < 0.5 ? -1 + v * 2 : (v - 0.5) * 2) * (1 - Math.abs(cy) * 1.6);

  const swirl =
    Math.sin(phase * 0.0031 + u * 13.5 + v * 9.2 + seed) * 0.7 +
    Math.cos(phase * 0.0024 - u * 8.4 + v * 11.7 + seed * 0.61) * 0.3;
  const outward = 0.42 + Math.min(dist * 1.8, 0.58);

  return [
    outU * outward + tanU * swirl * 0.92 + edgeBiasU * 0.38,
    outV * outward + tanV * swirl * 0.92 + edgeBiasV * 0.38,
  ];
}

function ensureCanvasSize(
  bundle: LumaDustBundle,
  aspect: number,
  renderScale: number,
  pixelWidth?: number,
  pixelHeight?: number,
): { w: number; h: number } {
  const safeAspect = Number.isFinite(aspect) && aspect > 0.05 ? aspect : 16 / 9;
  const scale = clamp(renderScale, 0.35, 1, 0.55);
  let w: number;
  let h: number;

  if (
    pixelWidth !== undefined &&
    pixelHeight !== undefined &&
    pixelWidth >= 160 &&
    pixelHeight >= 90
  ) {
    w = Math.round(pixelWidth * scale);
    h = Math.round(pixelHeight * scale);
    const edge = Math.max(w, h);
    if (edge > LUMA_DUST_MAX_EDGE) {
      const fit = LUMA_DUST_MAX_EDGE / edge;
      w = Math.max(160, Math.round(w * fit));
      h = Math.max(90, Math.round(h * fit));
    }
  } else {
    w = Math.min(LUMA_DUST_MAX_EDGE, 1920);
    h = Math.round(w / safeAspect);
    if (h > LUMA_DUST_MAX_EDGE) {
      h = LUMA_DUST_MAX_EDGE;
      w = Math.round(h * safeAspect);
    }
    w = Math.max(160, w);
    h = Math.max(90, h);
  }

  if (bundle.canvas.width !== w || bundle.canvas.height !== h) {
    bundle.canvas.width = w;
    bundle.buffer.width = w;
    bundle.canvas.height = h;
    bundle.buffer.height = h;
    bundle.lastUploadMs = 0;
  }
  return { w, h };
}

export function createLumaDustBundle(): LumaDustBundle {
  const canvas = document.createElement("canvas");
  const buffer = document.createElement("canvas");
  const sampleCanvas = document.createElement("canvas");
  canvas.width = 320;
  canvas.height = 180;
  buffer.width = 320;
  buffer.height = 180;
  sampleCanvas.width = SAMPLE_W;
  sampleCanvas.height = SAMPLE_H;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const bufferCtx = buffer.getContext("2d", { willReadFrequently: true });
  const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });
  if (!ctx || !bufferCtx || !sampleCtx) throw new Error("2d canvas unavailable");
  return {
    canvas,
    ctx,
    buffer,
    bufferCtx,
    sampleCanvas,
    sampleCtx,
    lumaData: null,
    particles: [],
    lastUploadMs: 0,
    turbPhase: 0,
    burstPhase: 0,
    lastSampleMs: 0,
    spreadRadius: LUMA_DUST_SPREAD_START,
    prevLuma: null,
  };
}

export function clearLumaDust(bundle: LumaDustBundle): void {
  bundle.particles.length = 0;
  bundle.lumaData = null;
  bundle.lastUploadMs = 0;
  bundle.turbPhase = 0;
  bundle.burstPhase = 0;
  bundle.lastSampleMs = 0;
  bundle.spreadRadius = LUMA_DUST_SPREAD_START;
  bundle.prevLuma = null;
  const { w, h } = { w: bundle.canvas.width, h: bundle.canvas.height };
  bundle.ctx.fillStyle = "#000";
  bundle.ctx.fillRect(0, 0, w, h);
  bundle.bufferCtx.fillStyle = "#000";
  bundle.bufferCtx.fillRect(0, 0, w, h);
}

function refreshLumaSample(
  bundle: LumaDustBundle,
  video: HTMLVideoElement | null | undefined,
  now: number,
  sampleIntervalMs: number,
  allowSample: boolean,
): boolean {
  if (!bundle.lumaData) {
    allowSample = true;
  } else if (!allowSample || now - bundle.lastSampleMs < sampleIntervalMs) {
    return true;
  }

  if (!video || video.readyState < 2 || video.videoWidth < 2) {
    bundle.lumaData = null;
    return false;
  }
  bundle.sampleCtx.drawImage(video, 0, 0, SAMPLE_W, SAMPLE_H);
  bundle.lumaData = bundle.sampleCtx.getImageData(0, 0, SAMPLE_W, SAMPLE_H).data;
  bundle.lastSampleMs = now;
  return true;
}

function buildLumaField(data: Uint8ClampedArray): LightField {
  const n = SAMPLE_W * SAMPLE_H;
  const luma = new Float32Array(n);
  const cr = new Float32Array(n);
  const cg = new Float32Array(n);
  const cb = new Float32Array(n);

  for (let i = 0; i < n; i++) {
    const i4 = i * 4;
    const r = data[i4]! / 255;
    const g = data[i4 + 1]! / 255;
    const b = data[i4 + 2]! / 255;
    luma[i] = 0.299 * r + 0.587 * g + 0.114 * b;
    cr[i] = r;
    cg[i] = g;
    cb[i] = b;
  }

  return { luma, cr, cg, cb };
}

function computeShinyGate(data: Uint8ClampedArray): number {
  let peak = 0;
  for (let i = 0; i < data.length; i += 4) {
    const l =
      (0.299 * data[i]! + 0.587 * data[i + 1]! + 0.114 * data[i + 2]!) / 255;
    if (l > peak) peak = l;
  }
  return Math.max(SHINY_FLOOR, peak * SHINY_PEAK_RATIO);
}

function acquireParticle(bundle: LumaDustBundle, maxParticles: number): LumaDustParticle | null {
  for (let i = 0; i < bundle.particles.length; i++) {
    const p = bundle.particles[i]!;
    if (!p.active) return p;
  }
  const cap = Math.min(ABSOLUTE_MAX_PARTICLES, Math.max(1500, maxParticles));
  if (bundle.particles.length >= cap) return null;
  const p: LumaDustParticle = {
    active: false,
    attached: true,
    u: 0,
    v: 0,
    vx: 0,
    vy: 0,
    life: 0,
    maxLife: 1,
    age: 0,
    seed: 0,
    lightU: 0,
    lightV: 0,
    castLuma: 0,
    size: PARTICLE_SIZE,
    r: 1,
    g: 1,
    b: 1,
  };
  bundle.particles.push(p);
  return p;
}

function activeParticleCount(bundle: LumaDustBundle): number {
  let n = 0;
  for (let i = 0; i < bundle.particles.length; i++) {
    if (bundle.particles[i]!.active) n++;
  }
  return n;
}

function buildSpawnOccupancy(bundle: LumaDustBundle): Uint8Array {
  const occ = new Uint8Array(SAMPLE_W * SAMPLE_H);
  for (let i = 0; i < bundle.particles.length; i++) {
    const p = bundle.particles[i]!;
    if (!p.active || !p.attached) continue;
    const idx = Math.floor(p.v * SAMPLE_H) * SAMPLE_W + Math.floor(p.u * SAMPLE_W);
    if (idx >= 0 && idx < occ.length) occ[idx] = Math.min(255, occ[idx]! + 1);
  }
  return occ;
}

function spawnAttachedParticle(
  bundle: LumaDustBundle,
  sample: LumaSample,
  jitterU: number,
  jitterV: number,
  maxParticles: number,
  instant = false,
): void {
  const p = acquireParticle(bundle, maxParticles);
  if (!p) return;

  p.active = true;
  p.attached = true;
  p.u = Math.max(0.002, Math.min(0.998, sample.u + jitterU));
  p.v = Math.max(0.002, Math.min(0.998, sample.v + jitterV));
  p.lightU = sample.u;
  p.lightV = sample.v;
  p.castLuma = sample.luma;
  p.vx = 0;
  p.vy = 0;
  p.maxLife = 12;
  p.life = p.maxLife;
  p.age = instant ? 8 : 0;
  p.seed = Math.random();
  p.size = PARTICLE_SIZE * (instant ? 1.02 + Math.random() * 0.28 : 0.84 + Math.random() * 0.32);
  p.r = sample.r;
  p.g = sample.g;
  p.b = sample.b;
}

type ShinySpawnCell = {
  px: number;
  py: number;
  idx: number;
  slots: number;
  score: number;
};

function collectShinySpawnCells(
  field: LightField,
  occ: Uint8Array,
  gate: number,
  perCellMax: number,
  hotPerCell: number,
  hotGate: number,
  radius: number,
): ShinySpawnCell[] {
  const cells: ShinySpawnCell[] = [];
  for (let py = 0; py < SAMPLE_H; py++) {
    for (let px = 0; px < SAMPLE_W; px++) {
      const idx = py * SAMPLE_W + px;
      const luma = field.luma[idx]!;
      if (luma < gate) continue;
      const cap = dustIsHot(luma, hotGate) ? hotPerCell : perCellMax;
      if (occ[idx]! >= cap) continue;
      const dist = dustCenterDist((px + 0.5) / SAMPLE_W, (py + 0.5) / SAMPLE_H);
      const score = dustSpawnScore(luma, dist, radius, dustIsWhite(luma));
      if (score < 0) continue;
      cells.push({ px, py, idx, slots: cap - occ[idx]!, score });
    }
  }
  cells.sort((a, b) => b.score - a.score);
  return cells;
}

function collectWhiteOnsets(
  field: LightField,
  prevLuma: Float32Array | null,
  occ: Uint8Array,
  perCell: number,
): ShinySpawnCell[] {
  if (!prevLuma || prevLuma.length !== field.luma.length) return [];
  const cells: ShinySpawnCell[] = [];
  for (let py = 0; py < SAMPLE_H; py++) {
    for (let px = 0; px < SAMPLE_W; px++) {
      const idx = py * SAMPLE_W + px;
      if (!dustIsWhiteOnset(field.luma[idx]!, prevLuma[idx]!)) continue;
      if (occ[idx]! >= perCell) continue;
      cells.push({
        px,
        py,
        idx,
        slots: perCell - occ[idx]!,
        score: field.luma[idx]!,
      });
    }
  }
  cells.sort((a, b) => b.score - a.score);
  return cells;
}

function storePrevLuma(bundle: LumaDustBundle, field: LightField): void {
  if (!bundle.prevLuma || bundle.prevLuma.length !== field.luma.length) {
    bundle.prevLuma = new Float32Array(field.luma.length);
  }
  bundle.prevLuma.set(field.luma);
}

function fieldPeakLuma(field: LightField): number {
  let peak = 0;
  for (let i = 0; i < field.luma.length; i++) {
    const luma = field.luma[i]!;
    if (luma > peak) peak = luma;
  }
  return peak;
}

function reclaimDimAttached(
  bundle: LumaDustBundle,
  field: LightField,
  need: number,
  hotGate: number,
): number {
  if (need <= 0) return 0;
  const dim: Array<{ i: number; luma: number; age: number }> = [];
  for (let i = 0; i < bundle.particles.length; i++) {
    const p = bundle.particles[i]!;
    if (!p.active || !p.attached || p.age < 0.28) continue;
    const idx = Math.floor(p.v * SAMPLE_H) * SAMPLE_W + Math.floor(p.u * SAMPLE_W);
    const luma = idx >= 0 && idx < field.luma.length ? field.luma[idx]! : 0;
    if (luma >= hotGate) continue;
    dim.push({ i, luma, age: p.age });
  }
  dim.sort((a, b) => a.luma - b.luma || b.age - a.age);
  let freed = 0;
  for (let k = 0; k < dim.length && freed < need; k++) {
    bundle.particles[dim[k]!.i]!.active = false;
    freed++;
  }
  return freed;
}

function readPixelFromField(field: LightField, px: number, py: number): LumaSample {
  const idx = py * SAMPLE_W + px;
  return {
    u: (px + 0.5) / SAMPLE_W,
    v: (py + 0.5) / SAMPLE_H,
    luma: field.luma[idx]!,
    r: field.cr[idx]!,
    g: field.cg[idx]!,
    b: field.cb[idx]!,
  };
}

function spawnByPriority(
  bundle: LumaDustBundle,
  field: LightField,
  cells: ShinySpawnCell[],
  spend: number,
  occ: Uint8Array,
  cellW: number,
  cellH: number,
  maxParticles: number,
  instant = false,
): number {
  if (cells.length === 0 || spend <= 0) return 0;

  let spawned = 0;
  let left = spend;

  while (left > 0) {
    let placed = false;
    for (let k = 0; k < cells.length; k++) {
      if (left <= 0) break;
      const cell = cells[k]!;
      if (cell.slots <= 0) continue;

      const sample = readPixelFromField(field, cell.px, cell.py);
      const jitterU = (Math.random() - 0.5) * cellW * 0.95;
      const jitterV = (Math.random() - 0.5) * cellH * 0.95;
      spawnAttachedParticle(bundle, sample, jitterU, jitterV, maxParticles, instant);
      cell.slots--;
      occ[cell.idx] = (occ[cell.idx] ?? 0) + 1;
      spawned++;
      left--;
      placed = true;
    }
    if (!placed) break;
  }

  return spawned;
}

function spawnOnShinyAreas(
  bundle: LumaDustBundle,
  field: LightField,
  shinyGate: number,
  amount: number,
  burst: number,
  density: number,
  dt: number,
): void {
  if (amount < 0.0001) {
    storePrevLuma(bundle, field);
    return;
  }

  const maxParticles = resolveMaxParticles(density);
  const burstRate = 0.3 + clamp(burst, 0, 1, 0.55) * 5.2;
  bundle.burstPhase += dt * burstRate;
  const onWave = bundle.burstPhase >= 1;
  if (onWave) bundle.burstPhase -= 1;

  bundle.spreadRadius = dustSpreadRadius(bundle.spreadRadius, dt, amount, burst);

  const occ = buildSpawnOccupancy(bundle);
  const cellW = 1 / SAMPLE_W;
  const cellH = 1 / SAMPLE_H;
  const peak = fieldPeakLuma(field);
  const hotGate = dustHotGate(peak, shinyGate);
  const flashCells = collectWhiteOnsets(field, bundle.prevLuma, occ, 5);
  if (flashCells.length > 0) {
    let split = dustBudgetSplit(maxParticles, activeParticleCount(bundle));
    let pool = split.reserveFree + split.baseFree;
    const want = dustFlashSpend(flashCells.length, amount, Math.max(pool, flashCells.length * 4));
    if (pool < want) {
      reclaimDimAttached(bundle, field, want - pool, DUST_WHITE_LUMA);
      split = dustBudgetSplit(maxParticles, activeParticleCount(bundle));
      pool = split.reserveFree + split.baseFree;
    }
    spawnByPriority(
      bundle,
      field,
      flashCells,
      dustFlashSpend(flashCells.length, amount, pool),
      occ,
      cellW,
      cellH,
      maxParticles,
      true,
    );
  }

  const dripChance = 0.32 + amount * (0.22 + burst * 0.28);
  if (!onWave && Math.random() > dripChance) {
    storePrevLuma(bundle, field);
    return;
  }

  const densityScale = 0.55 + clamp(density, 0, 1, 0.5) * 0.9;
  const perCellMax = onWave
    ? Math.max(1, Math.round((SPAWN_PER_CELL + Math.round(clamp(burst, 0, 1, 0.55) * 4)) * densityScale))
    : 1;
  const hotPerCell = perCellMax + 2;
  const gate = onWave ? shinyGate * (0.93 - clamp(burst, 0, 1, 0.55) * 0.08) : shinyGate;

  const cells = collectShinySpawnCells(
    field,
    occ,
    gate,
    perCellMax,
    hotPerCell,
    hotGate,
    bundle.spreadRadius,
  );
  if (cells.length === 0) {
    storePrevLuma(bundle, field);
    return;
  }

  const hot: ShinySpawnCell[] = [];
  const glow: ShinySpawnCell[] = [];
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i]!;
    if (dustIsHot(field.luma[cell.idx]!, hotGate)) hot.push(cell);
    else glow.push(cell);
  }

  let split = dustBudgetSplit(maxParticles, activeParticleCount(bundle));
  if (hot.length > 0 && split.reserveFree + split.baseFree < 8) {
    reclaimDimAttached(bundle, field, 8, hotGate);
    split = dustBudgetSplit(maxParticles, activeParticleCount(bundle));
  }

  const glowSpend = dustSpawnBudget(glow.length, onWave, amount, burst, density, split.baseFree);
  spawnByPriority(bundle, field, glow, glowSpend, occ, cellW, cellH, maxParticles);

  const afterGlow = dustBudgetSplit(maxParticles, activeParticleCount(bundle));
  const hotSpend = dustHotSpend(
    hot.length,
    onWave,
    amount,
    afterGlow.reserveFree,
    afterGlow.baseFree,
  );
  spawnByPriority(bundle, field, hot, hotSpend, occ, cellW, cellH, maxParticles);
  storePrevLuma(bundle, field);
}

function releaseParticle(
  p: LumaDustParticle,
  bundle: LumaDustBundle,
  amount: number,
  turbulence: number,
): void {
  p.attached = false;
  const turb = clamp(turbulence, 0, 1, 0.45);
  const [tx, ty] = turbField(p.u, p.v, bundle.turbPhase);
  const [ox, oy] = outwardSwirlForce(p.u, p.v, bundle.turbPhase, p.u * 97 + p.v * 53);
  const kick = turb * amount;
  p.vx = ox * 0.1 * kick + tx * 0.00025 * amount;
  p.vy = oy * 0.1 * kick + ty * 0.00025 * amount;
  p.maxLife = dustDetachedLife(turb);
  p.life = p.maxLife;
}

function updateParticles(
  bundle: LumaDustBundle,
  field: LightField,
  opts: LumaDustDrawOpts,
  dt: number,
): void {
  const turb = clamp(opts.turbulence, 0, 1, 0.45);
  const maxHold = 0.4 + (1 - clamp(opts.detach, 0, 1, 0.26)) * 1.35;
  const detachedStep = dt * (3.2 + turb * 4.8);
  bundle.turbPhase += dt * 1000;

  for (let i = 0; i < bundle.particles.length; i++) {
    const p = bundle.particles[i]!;
    if (!p.active) continue;

    p.age += dt;

    if (p.attached) {
      const nowLuma = lumaAtUv(field.luma, p.lightU, p.lightV, SAMPLE_W, SAMPLE_H);
      if (dustLumaReleased(nowLuma, p.castLuma, opts.stick) || p.age > maxHold) {
        releaseParticle(p, bundle, opts.amount, opts.turbulence);
      }
      continue;
    }

    const [tx, ty] = turbField(p.u, p.v, bundle.turbPhase);
    const [ox, oy] = outwardSwirlForce(p.u, p.v, bundle.turbPhase, i * 17.3 + p.u * 41);
    const swirlMix = turb * opts.amount;
    const baseDrift = 0.00022 * opts.amount * (0.55 + turb * 0.7);

    p.vx += tx * baseDrift * dt;
    p.vy += ty * baseDrift * dt;
    p.vx += (ox * 0.0021 + tx * 0.00038) * swirlMix * dt;
    p.vy += (oy * 0.0021 + ty * 0.00038) * swirlMix * dt;
    const edge = dustEdgeFade(p.u, p.v);
    const edgeSlow = 0.32 + edge * 0.68;
    p.u += p.vx * detachedStep * edgeSlow;
    p.v += p.vy * detachedStep * edgeSlow;
    p.life -= dt * (0.85 + turb * 0.2 + (1 - edge) * 1.4);

    if (p.life <= 0 || p.u < 0 || p.u > 1 || p.v < 0 || p.v > 1) {
      p.active = false;
    }
  }
}

function drawParticle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  p: LumaDustParticle,
  alpha: number,
  resScale: number,
  size: number,
  brightness: number,
  fadeIn: number,
  spectral: number,
  hueT: number,
): void {
  if (alpha < 0.004) return;
  const sizeMul = dustSizeScale(size);
  const brightMul = dustBrightnessScale(brightness);
  const grow = dustGrowScale(fadeIn);
  const half = Math.max(0.22, p.size * resScale * sizeMul * grow);
  const lift = clamp(brightness, 0, 1, 0.65) * 0.08;
  const tint = mixSpectralTint(p.r, p.g, p.b, spectral, hueT);
  const cr = Math.round(Math.min(255, (tint.r + lift) * 255));
  const cg = Math.round(Math.min(255, (tint.g + lift) * 255));
  const cb = Math.round(Math.min(255, (tint.b + lift) * 255));
  const bodyAlpha = alpha * brightMul * (p.attached ? 0.9 : 0.62);

  const glowHalf = half * 1.45;
  ctx.fillStyle = `rgba(${cr},${cg},${cb},${(bodyAlpha * 0.16).toFixed(3)})`;
  ctx.fillRect(x - glowHalf, y - glowHalf, glowHalf * 2, glowHalf * 2);

  ctx.fillStyle = `rgba(${cr},${cg},${cb},${bodyAlpha.toFixed(3)})`;
  ctx.fillRect(x - half, y - half, half * 2, half * 2);
}

export function drawLumaDustFrame(
  bundle: LumaDustBundle,
  video: HTMLVideoElement | null | undefined,
  opts: LumaDustDrawOpts,
  aspect: number,
  now = performance.now(),
): void {
  if (opts.amount <= 0.00001) return;
  const dt = Math.max(0.001, Math.min(0.05, opts.dt));
  const renderScale = resolveRenderScale(opts.quality);
  const sampleIntervalMs = resolveSampleIntervalMs(opts.quality);
  const { w, h } = ensureCanvasSize(bundle, aspect, renderScale, opts.pixelWidth, opts.pixelHeight);
  const resScale = w / LUMA_DUST_REF_WIDTH;

  const sampled = refreshLumaSample(
    bundle,
    video,
    now,
    sampleIntervalMs,
    !opts.skipVideoSample,
  );
  if (!sampled || !bundle.lumaData) return;
  const data = bundle.lumaData;
  const shinyGate = computeShinyGate(data);
  const field = buildLumaField(data);

  spawnOnShinyAreas(bundle, field, shinyGate, opts.amount, opts.burst, opts.density, dt);
  updateParticles(bundle, field, opts, dt);

  const trailN = clamp(opts.trail, 0, 1, 0.5) * 1.15;
  const fadeAlpha = 1 - trailN * 0.052;
  const persistAlpha = trailN * 0.92;

  const { ctx, bufferCtx, buffer, canvas } = bundle;

  bufferCtx.setTransform(1, 0, 0, 1, 0, 0);
  bufferCtx.globalCompositeOperation = "source-over";
  bufferCtx.globalAlpha = 1;
  bufferCtx.drawImage(canvas, 0, 0, w, h);
  bufferCtx.globalAlpha = fadeAlpha;
  bufferCtx.fillStyle = "#000";
  bufferCtx.fillRect(0, 0, w, h);
  bufferCtx.globalAlpha = 1;

  const brightMul = dustBrightnessScale(opts.brightness);
  const spectral = clamp(opts.spectral, 0, 1, LUMA_DUST_SPECTRAL_DEFAULT);

  for (let i = 0; i < bundle.particles.length; i++) {
    const p = bundle.particles[i]!;
    if (!p.active) continue;
    const fadeIn = dustFadeIn(p.age, dustFadeInDuration(opts.burst, p.seed));
    const lifeT = p.attached ? 1 : dustLifeFade(p.life / p.maxLife);
    const edge = p.attached ? 1 : dustEdgeFade(p.u, p.v);
    const alpha =
      fadeIn *
      lifeT *
      edge *
      opts.amount *
      brightMul *
      (p.attached ? 0.96 : 0.55 + persistAlpha * 0.38);
    const hueT = dustSpectralHueT(p.u, p.v, p.age, bundle.turbPhase, p.seed);
    drawParticle(
      bufferCtx,
      p.u * w,
      p.v * h,
      p,
      alpha,
      resScale,
      opts.size,
      opts.brightness,
      fadeIn,
      spectral,
      hueT,
    );
  }

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
  ctx.drawImage(buffer, 0, 0, w, h);
  bundle.lastUploadMs = 0;
}

export function lumaDustDrawFromParams(
  params: Record<string, unknown> | undefined,
  amount: number,
  dt: number,
): LumaDustDrawOpts {
  return {
    amount: clamp(amount, 0, 1, 0.8),
    stick: clamp(Number(params?.stick ?? 0.65), 0, 1, 0.65),
    detach: clamp(Number(params?.detach ?? 0.26), 0, 1, 0.26),
    burst: clamp(Number(params?.burst ?? 0.58), 0, 1, 0.58),
    turbulence: clamp(Number(params?.turbulence ?? 0.48), 0, 1, 0.48),
    size: clamp(Number(params?.size ?? 1), 0.4, 1.8, 1),
    brightness: clamp(Number(params?.brightness ?? 0.68), 0, 1, 0.68),
    spectral: clamp(Number(params?.spectral ?? LUMA_DUST_SPECTRAL_DEFAULT), 0, 1, LUMA_DUST_SPECTRAL_DEFAULT),
    density: clamp(Number(params?.density ?? 0.5), 0, 1, 0.5),
    quality: clamp(Number(params?.quality ?? 0.55), 0, 1, 0.55),
    trail: clamp(Number(params?.trail ?? 0.5), 0, 1, 0.5),
    skipVideoSample: false,
    dt,
  };
}

export function syncLumaDustTexture(
  s3: LumaDustTexSource | undefined,
  bundle: LumaDustBundle,
  video: HTMLVideoElement | null | undefined,
  opts: LumaDustDrawOpts,
  aspect: number,
  now: number,
  minUploadMs = 0,
): boolean {
  if (!s3?.tex) return false;
  if (now - bundle.lastUploadMs < minUploadMs) return false;
  drawLumaDustFrame(bundle, video, opts, aspect, now);
  const tex = s3.tex;
  if (tex.width !== bundle.canvas.width || tex.height !== bundle.canvas.height) {
    tex.resize?.(bundle.canvas.width, bundle.canvas.height);
  }
  tex.subimage(bundle.canvas);
  bundle.lastUploadMs = now;
  return true;
}
