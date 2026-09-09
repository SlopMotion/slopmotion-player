import type { FXExtraParamSpec } from "../data/fxConfig";

type RampParamMap = Record<string, number | string | undefined> | undefined;

export const RAMP_GRADIENT_MIN_STOPS = 2;
export const RAMP_GRADIENT_MAX_STOPS = 6;

export type RampStopChannel = "h" | "s" | "l" | "p";

export type RampGradientStop = {
  h: number;
  s: number;
  l: number;
  p: number;
};

export const RAMP_GRADIENT_DEFAULT_STOPS: readonly RampGradientStop[] = [
  { h: 0, s: 0, l: 0, p: 0 },
  { h: 0, s: 0, l: 0.5, p: 0.5 },
  { h: 0, s: 0, l: 1, p: 1 },
  { h: 0, s: 0.55, l: 0.55, p: 0.7 },
  { h: 40, s: 0.55, l: 0.55, p: 0.82 },
  { h: 80, s: 0.55, l: 0.55, p: 0.94 },
];

const STOP_KEY = /^s([0-5])([hslp])$/;

export function rampStopKey(index: number, channel: RampStopChannel): string {
  return `s${index}${channel}`;
}

export function parseRampStopKey(key: string): { index: number; channel: RampStopChannel } | null {
  const match = STOP_KEY.exec(key);
  if (!match) return null;
  return { index: Number(match[1]), channel: match[2] as RampStopChannel };
}

export function isRampStopChannelKey(key: string): boolean {
  return STOP_KEY.test(key);
}

export function clampRampStopCount(value: unknown): number {
  const n = Math.round(Number(value));
  if (!Number.isFinite(n)) return 3;
  return Math.min(RAMP_GRADIENT_MAX_STOPS, Math.max(RAMP_GRADIENT_MIN_STOPS, n));
}

export function clampRampEditStop(value: unknown, stopCount: number): number {
  const n = Math.round(Number(value));
  if (!Number.isFinite(n)) return 0;
  return Math.min(stopCount - 1, Math.max(0, n));
}

function num(params: RampParamMap, key: string, fallback: number): number {
  const raw = params?.[key];
  return typeof raw === "number" && Number.isFinite(raw) ? raw : fallback;
}

export function hslToRgb01(h: number, s: number, l: number): [number, number, number] {
  const hh = ((h % 360) + 360) % 360;
  const sat = Math.min(1, Math.max(0, s));
  const lit = Math.min(1, Math.max(0, l));
  const c = (1 - Math.abs(2 * lit - 1)) * sat;
  const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
  const m = lit - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (hh < 60) {
    r = c;
    g = x;
  } else if (hh < 120) {
    r = x;
    g = c;
  } else if (hh < 180) {
    g = c;
    b = x;
  } else if (hh < 240) {
    g = x;
    b = c;
  } else if (hh < 300) {
    r = x;
    b = c;
  } else {
    r = c;
    b = x;
  }
  return [r + m, g + m, b + m];
}

export function rgb01ToHsl(r: number, g: number, b: number): RampGradientStop {
  const rr = Math.min(1, Math.max(0, r));
  const gg = Math.min(1, Math.max(0, g));
  const bb = Math.min(1, Math.max(0, b));
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const l = (max + min) / 2;
  const d = max - min;
  if (d < 1e-6) return { h: 0, s: 0, l, p: 0 };
  const s = d / (1 - Math.abs(2 * l - 1));
  let h = 0;
  if (max === rr) h = 60 * (((gg - bb) / d) % 6);
  else if (max === gg) h = 60 * ((bb - rr) / d + 2);
  else h = 60 * ((rr - gg) / d + 4);
  if (h < 0) h += 360;
  return { h, s, l, p: 0 };
}

export function hexToRgb01(hex: unknown, fallback: string): [number, number, number] {
  const s = typeof hex === "string" ? hex : fallback;
  const h = s.replace("#", "").trim();
  if (h.length !== 6) return [0, 0, 0];
  const n = parseInt(h, 16);
  if (Number.isNaN(n)) return [0, 0, 0];
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function hexToStop(hex: unknown, fallback: string, p: number): RampGradientStop {
  const [r, g, b] = hexToRgb01(hex, fallback);
  return { ...rgb01ToHsl(r, g, b), p };
}

function toHexByte(n: number): string {
  return Math.round(Math.min(1, Math.max(0, n)) * 255)
    .toString(16)
    .padStart(2, "0");
}

export function hslToHex(h: number, s: number, l: number): string {
  const [r, g, b] = hslToRgb01(h, s, l);
  return `#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}`;
}

export function rampStopHexPatch(index: number, hex: string): Record<string, number> {
  const [r, g, b] = hexToRgb01(hex, "#000000");
  const hsl = rgb01ToHsl(r, g, b);
  return {
    [rampStopKey(index, "h")]: hsl.h,
    [rampStopKey(index, "s")]: hsl.s,
    [rampStopKey(index, "l")]: hsl.l,
    editStop: index,
  };
}

export function defaultRampStop(index: number): RampGradientStop {
  return RAMP_GRADIENT_DEFAULT_STOPS[index] ?? RAMP_GRADIENT_DEFAULT_STOPS[0]!;
}

export function readRampGradientStops(params: RampParamMap): RampGradientStop[] {
  if (typeof params?.shadow === "string" && typeof params.s0h !== "number") {
    return [
      hexToStop(params.shadow, "#000000", 0),
      hexToStop(params.mid, "#808080", 0.5),
      hexToStop(params.highlight, "#ffffff", 1),
    ];
  }
  const count = clampRampStopCount(params?.stopCount);
  const stops: RampGradientStop[] = [];
  for (let i = 0; i < count; i += 1) {
    const fallback = defaultRampStop(i);
    stops.push({
      h: num(params, rampStopKey(i, "h"), fallback.h),
      s: num(params, rampStopKey(i, "s"), fallback.s),
      l: num(params, rampStopKey(i, "l"), fallback.l),
      p: num(params, rampStopKey(i, "p"), fallback.p),
    });
  }
  return stops;
}

export function writeRampGradientStops(
  stops: readonly RampGradientStop[],
  params: RampParamMap = {},
): Record<string, number | string> {
  const next: Record<string, number | string> = { ...params };
  delete next.shadow;
  delete next.mid;
  delete next.highlight;
  const count = clampRampStopCount(stops.length);
  next.stopCount = count;
  next.editStop = clampRampEditStop(next.editStop, count);
  for (let i = 0; i < RAMP_GRADIENT_MAX_STOPS; i += 1) {
    const stop = stops[i] ?? defaultRampStop(i);
    next[rampStopKey(i, "h")] = stop.h;
    next[rampStopKey(i, "s")] = stop.s;
    next[rampStopKey(i, "l")] = stop.l;
    next[rampStopKey(i, "p")] = stop.p;
  }
  return next;
}

export function sortedRampGradientStops(stops: readonly RampGradientStop[]): RampGradientStop[] {
  return stops.toSorted((a, b) => a.p - b.p);
}

export type RampShaderStop = { rgb: [number, number, number]; p: number };

function padShaderStops(stops: RampShaderStop[]): RampShaderStop[] {
  const sorted = stops.toSorted((a, b) => a.p - b.p);
  const last = sorted[sorted.length - 1] ?? { rgb: [0, 0, 0] as [number, number, number], p: 1 };
  while (sorted.length < RAMP_GRADIENT_MAX_STOPS) sorted.push(last);
  return sorted;
}

export function resolveRampGradientShaderStops(
  readChannel: (key: string, fallback: number) => number,
  params?: RampParamMap,
): RampShaderStop[] {
  if (params && typeof params.shadow === "string" && typeof params.s0h !== "number") {
    return padShaderStops(
      readRampGradientStops(params).map((stop) => ({
        rgb: hslToRgb01(stop.h, stop.s, stop.l),
        p: stop.p,
      })),
    );
  }
  const count = clampRampStopCount(readChannel("stopCount", 3));
  const stops: RampShaderStop[] = [];
  for (let i = 0; i < count; i += 1) {
    const fallback = defaultRampStop(i);
    stops.push({
      rgb: hslToRgb01(
        readChannel(rampStopKey(i, "h"), fallback.h),
        readChannel(rampStopKey(i, "s"), fallback.s),
        readChannel(rampStopKey(i, "l"), fallback.l),
      ),
      p: readChannel(rampStopKey(i, "p"), fallback.p),
    });
  }
  return padShaderStops(stops);
}

export function rampGradientCss(stops: readonly RampGradientStop[]): string {
  const sorted = sortedRampGradientStops(stops);
  if (sorted.length === 0) return "linear-gradient(to right, #000, #fff)";
  const parts = sorted.map((stop) => {
    const [r, g, b] = hslToRgb01(stop.h, stop.s, stop.l);
    const pct = Math.round(Math.min(1, Math.max(0, stop.p)) * 1000) / 10;
    return `rgb(${Math.round(r * 255)} ${Math.round(g * 255)} ${Math.round(b * 255)}) ${pct}%`;
  });
  return `linear-gradient(to right, ${parts.join(", ")})`;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function addRampGradientStop(params: RampParamMap): Record<string, number | string> {
  const stops = readRampGradientStops(params);
  if (stops.length >= RAMP_GRADIENT_MAX_STOPS) return { ...(params ?? {}) };
  const sorted = sortedRampGradientStops(stops);
  let gapAt = 0;
  let gap = -1;
  for (let i = 0; i < sorted.length - 1; i += 1) {
    const d = sorted[i + 1]!.p - sorted[i]!.p;
    if (d > gap) {
      gap = d;
      gapAt = i;
    }
  }
  const a = sorted[gapAt]!;
  const b = sorted[gapAt + 1] ?? a;
  const t = 0.5;
  const inserted: RampGradientStop = {
    h: lerp(a.h, b.h, t),
    s: lerp(a.s, b.s, t),
    l: lerp(a.l, b.l, t),
    p: lerp(a.p, b.p, t),
  };
  const nextStops = [...stops, inserted];
  const written = writeRampGradientStops(nextStops, params);
  written.editStop = nextStops.length - 1;
  return written;
}

export function removeRampGradientStop(
  params: RampParamMap,
  index: number,
): Record<string, number | string> {
  const stops = readRampGradientStops(params);
  if (stops.length <= RAMP_GRADIENT_MIN_STOPS) return { ...(params ?? {}) };
  if (index < 0 || index >= stops.length) return { ...(params ?? {}) };
  const nextStops = stops.filter((_, i) => i !== index);
  const written = writeRampGradientStops(nextStops, params);
  written.editStop = clampRampEditStop(index, nextStops.length);
  return written;
}

export function rampGradientStopExtraParams(): FXExtraParamSpec[] {
  const extras: FXExtraParamSpec[] = [
    {
      key: "stopCount",
      label: "Stops",
      min: RAMP_GRADIENT_MIN_STOPS,
      max: RAMP_GRADIENT_MAX_STOPS,
      step: 1,
      default: 3,
    },
    {
      key: "editStop",
      label: "Edit stop",
      min: 0,
      max: RAMP_GRADIENT_MAX_STOPS - 1,
      step: 1,
      default: 0,
    },
    {
      key: "stopsOpen",
      label: "Stops (0=Cards, 1=HSL)",
      min: 0,
      max: 1,
      step: 1,
      default: 0,
    },
  ];
  for (let i = 0; i < RAMP_GRADIENT_MAX_STOPS; i += 1) {
    const fallback = defaultRampStop(i);
    const n = i + 1;
    extras.push(
      { key: rampStopKey(i, "h"), label: `S${n} Hue`, min: 0, max: 360, step: 1, default: fallback.h },
      { key: rampStopKey(i, "s"), label: `S${n} Sat`, min: 0, max: 1, step: 0.01, default: fallback.s },
      { key: rampStopKey(i, "l"), label: `S${n} Light`, min: 0, max: 1, step: 0.01, default: fallback.l },
      { key: rampStopKey(i, "p"), label: `S${n} Pos`, min: 0, max: 1, step: 0.01, default: fallback.p },
    );
  }
  return extras;
}

export function defaultRampGradientStopParams(): Record<string, number> {
  const params: Record<string, number> = {
    stopCount: 3,
    editStop: 0,
    stopsOpen: 0,
  };
  for (let i = 0; i < RAMP_GRADIENT_MAX_STOPS; i += 1) {
    const stop = defaultRampStop(i);
    params[rampStopKey(i, "h")] = stop.h;
    params[rampStopKey(i, "s")] = stop.s;
    params[rampStopKey(i, "l")] = stop.l;
    params[rampStopKey(i, "p")] = stop.p;
  }
  return params;
}

export function migrateLegacyRampGradientFx<T extends Record<string, unknown>>(saved: T): T {
  const row = saved.rampGradient as { params?: RampParamMap } | undefined;
  if (!row?.params || typeof row.params !== "object") return saved;
  if (typeof row.params.s0h === "number") return saved;
  if (typeof row.params.shadow !== "string") return saved;
  return {
    ...saved,
    rampGradient: {
      ...row,
      params: writeRampGradientStops(readRampGradientStops(row.params), row.params),
    },
  };
}
