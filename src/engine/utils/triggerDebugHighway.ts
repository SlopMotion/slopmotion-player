import { bandHex } from "../theme/audioBands";
import type { TriggerDebugStudioContext } from "../types/hydraWindow";
import type { TrackTimelineAnalysis } from "./analyzeTrackTimeline";
import type { TriggerDebugBands } from "./triggerDebugBands";
import {
  eventShapeFromGapSec,
  eventVisualScale,
  type EventShapeBand,
} from "./eventShape";

export const TRIGGER_DEBUG_BEAT_WINDOW = 16;
export const TRIGGER_DEBUG_LABEL_H = 30;

export type HighwayChannel =
  | "kick"
  | "snare"
  | "hat"
  | "bass"
  | "vocals"
  | "low"
  | "mid"
  | "high"
  | "beat"
  | "rhythm";

export const HIGHWAY_CHANNELS: ReadonlyArray<{
  key: HighwayChannel;
  label: string;
  timelineKey?: keyof TrackTimelineAnalysis["events"];
  /** Beat-grid lane (no timeline event list). */
  grid?: boolean;
}> = [
  { key: "kick", label: "Kick", timelineKey: "kick" },
  { key: "snare", label: "Snare" },
  { key: "hat", label: "Hat" },
  { key: "bass", label: "Bass", timelineKey: "bass" },
  { key: "vocals", label: "Vocals" },
  { key: "low", label: "Low", timelineKey: "low" },
  { key: "mid", label: "Mid", timelineKey: "low" },
  { key: "high", label: "High", timelineKey: "high" },
  { key: "beat", label: "Beat", grid: true },
  { key: "rhythm", label: "Rhythm", grid: true },
];

export const EMPTY_HIGHWAY_LEVELS: Record<HighwayChannel, number> = {
  kick: 0,
  snare: 0,
  hat: 0,
  bass: 0,
  vocals: 0,
  low: 0,
  mid: 0,
  high: 0,
  beat: 0,
  rhythm: 0,
};

export function levelsFromTriggerDebug(
  debug: TriggerDebugBands | undefined,
  fallback?: Partial<TriggerDebugBands>,
): Record<HighwayChannel, number> {
  const pick = (key: keyof TriggerDebugBands) => {
    const v = debug?.[key] ?? fallback?.[key];
    return typeof v === "number" ? Math.max(0, Math.min(1, v)) : 0;
  };
  return {
    kick: pick("kick"),
    snare: pick("snare"),
    hat: pick("hat"),
    bass: pick("bass"),
    vocals: pick("vocals"),
    low: pick("low"),
    mid: pick("mid"),
    high: pick("high"),
    beat: pick("beat"),
    rhythm: pick("rhythm"),
  };
}

const SNARE_KICK_GAP_SEC = 0.09;
const LOW_KICK_MERGE_SEC = 0.09;

function mergeEventTimes(...lists: readonly number[][]): number[] {
  const merged = lists.flat().toSorted((a, b) => a - b);
  if (merged.length === 0) return merged;
  const out = [merged[0]!];
  for (let i = 1; i < merged.length; i++) {
    const t = merged[i]!;
    if (t - out[out.length - 1]! >= LOW_KICK_MERGE_SEC) out.push(t);
  }
  return out;
}

function collectSnareTimelineEvents(
  ctx: TriggerDebugStudioContext,
  bpm: number,
  beatMin: number,
  beatMax: number,
): HighwayEvent[] {
  const out: HighwayEvent[] = [];
  for (const t of ctx.events.high) {
    const beat = beatAtSec(t, bpm);
    if (beat < beatMin || beat > beatMax) continue;
    let nearKick = false;
    for (const k of ctx.events.kick) {
      if (Math.abs(t - k) < SNARE_KICK_GAP_SEC) {
        nearKick = true;
        break;
      }
    }
    if (!nearKick) out.push({ beat, channel: "snare" });
  }
  return out;
}

export type HighwayEvent = {
  beat: number;
  channel: HighwayChannel;
  intensity?: number;
  sustain?: number;
};

export function highwayShapeBand(channel: HighwayChannel): EventShapeBand | null {
  if (
    channel === "kick" ||
    channel === "snare" ||
    channel === "hat" ||
    channel === "bass" ||
    channel === "vocals" ||
    channel === "low" ||
    channel === "mid" ||
    channel === "high"
  ) {
    return channel;
  }
  return null;
}

export function beatAtSec(sec: number, bpm: number) {
  const bps = Math.max(1, bpm) / 60;
  return sec * bps;
}

export function columnCenters(width: number, count: number) {
  const colW = width / count;
  return Array.from({ length: count }, (_, i) => (i + 0.5) * colW);
}

export function yForBeat(
  eventBeat: number,
  currentBeat: number,
  centerY: number,
  pxPerBeat: number,
) {
  return centerY - (eventBeat - currentBeat) * pxPerBeat;
}

export function collectTimelineEvents(
  ctx: TriggerDebugStudioContext,
  currentBeat: number,
  halfWindow: number,
): HighwayEvent[] {
  const bpm = Math.max(1, ctx.bpm);
  const beatMin = currentBeat - halfWindow - 0.25;
  const beatMax = currentBeat + halfWindow + 0.25;
  const out: HighwayEvent[] = [];

  for (const ch of HIGHWAY_CHANNELS) {
    if (ch.grid) {
      const first = Math.ceil(beatMin);
      const last = Math.floor(beatMax);
      for (let b = first; b <= last; b++) {
        out.push({ beat: b, channel: ch.key });
      }
      continue;
    }
    if (ch.key === "snare") {
      out.push(...collectSnareTimelineEvents(ctx, bpm, beatMin, beatMax));
      continue;
    }
    if (ch.key === "vocals") {
      const lowTimes = ctx.events.low;
      for (let i = 0; i < lowTimes.length; i++) {
        const t = lowTimes[i]!;
        const beat = beatAtSec(t, bpm);
        if (beat < beatMin || beat > beatMax) continue;
        let nearKick = false;
        for (const k of ctx.events.kick) {
          if (Math.abs(t - k) < SNARE_KICK_GAP_SEC) {
            nearKick = true;
            break;
          }
        }
        if (nearKick) continue;
        let nearBass = false;
        for (const b of ctx.events.bass) {
          if (Math.abs(t - b) < SNARE_KICK_GAP_SEC) {
            nearBass = true;
            break;
          }
        }
        if (nearBass) continue;
        const gap = i + 1 < lowTimes.length ? lowTimes[i + 1]! - t : 0.12;
        const char = eventShapeFromGapSec("vocals", gap);
        out.push({ beat, channel: "vocals", intensity: char.intensity, sustain: char.sustain });
      }
      continue;
    }
    if (!ch.timelineKey) continue;
    const times =
      ch.key === "low"
        ? mergeEventTimes(ctx.events.low, ctx.events.kick)
        : ctx.events[ch.timelineKey!];
    for (let i = 0; i < times.length; i++) {
      const t = times[i]!;
      const beat = beatAtSec(t, bpm);
      if (beat < beatMin || beat > beatMax) continue;
      const shapeBand = highwayShapeBand(ch.key);
      let intensity: number | undefined;
      let sustain: number | undefined;
      if (shapeBand) {
        const gap = i + 1 < times.length ? times[i + 1]! - t : 0.14;
        const char = eventShapeFromGapSec(shapeBand, gap);
        intensity = char.intensity;
        sustain = char.sustain;
      }
      out.push({ beat, channel: ch.key, intensity, sustain });
    }
  }
  return out;
}

export function pruneLiveEvents(events: HighwayEvent[], currentBeat: number, keepBehind = 10) {
  const cut = currentBeat - keepBehind;
  let i = 0;
  while (i < events.length && events[i]!.beat < cut) i++;
  if (i > 0) events.splice(0, i);
}

/** 0 at window edge → 1 at hit line (smoothstep). */
function approachFactor(distBeats: number, halfWindow: number) {
  const reach = Math.min(halfWindow, 2.4);
  const t = Math.max(0, 1 - distBeats / reach);
  return t * t * (3 - 2 * t);
}

/** Sharp peak in the last ~80 ms of travel onto the hit line. */
function hitPeak(distBeats: number) {
  const t = Math.max(0, 1 - distBeats / 0.07);
  return t * t;
}

function highwayBandHex(channel: HighwayChannel): string {
  return bandHex(channel === "mid" ? "mid" : channel);
}

function isGridPulseChannel(channel: HighwayChannel) {
  return channel === "beat" || channel === "rhythm";
}

function mixHexWithWhite(hex: string, whiteMix: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h, 16);
  if (Number.isNaN(n)) return "#ffffff";
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const m = Math.max(0, Math.min(1, whiteMix));
  const rr = Math.round(r + (255 - r) * m);
  const gg = Math.round(g + (255 - g) * m);
  const bb = Math.round(b + (255 - b) * m);
  return `rgb(${rr},${gg},${bb})`;
}

export function drawTriggerDebugHighway(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  currentBeat: number,
  events: HighwayEvent[],
  liveLevels: Record<HighwayChannel, number>,
  beatWindow: number,
  overlayOpacity: number,
) {
  const labelH = TRIGGER_DEBUG_LABEL_H;
  const highwayH = Math.max(1, height - labelH);
  const centerY = highwayH * 0.5;
  const pxPerBeat = highwayH / Math.max(4, beatWindow);
  const halfWindow = beatWindow * 0.5;
  const cols = columnCenters(width, HIGHWAY_CHANNELS.length);
  const colW = width / HIGHWAY_CHANNELS.length;

  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = `rgba(0, 0, 0, ${0.42 * overlayOpacity})`;
  ctx.fillRect(0, 0, width, highwayH);

  for (let li = 0; li < HIGHWAY_CHANNELS.length; li++) {
    const x0 = li * colW;
    ctx.fillStyle = li % 2 === 0 ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.12)";
    ctx.fillRect(x0, 0, colW, highwayH);
  }

  const vanishY = highwayH * 0.06;
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 1;
  for (let li = 0; li <= HIGHWAY_CHANNELS.length; li++) {
    const xBottom = li * colW;
    const xTop = width * 0.5 + (xBottom - width * 0.5) * 0.38;
    ctx.beginPath();
    ctx.moveTo(xBottom, highwayH);
    ctx.lineTo(xTop, vanishY);
    ctx.stroke();
  }

  const beatFirst = Math.floor(currentBeat - halfWindow - 1);
  const beatLast = Math.ceil(currentBeat + halfWindow + 1);
  for (let b = beatFirst; b <= beatLast; b++) {
    const y = yForBeat(b, currentBeat, centerY, pxPerBeat);
    if (y < -4 || y > highwayH + 4) continue;
    const bar = b % 4 === 0;
    ctx.strokeStyle = bar ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.08)";
    ctx.lineWidth = bar ? 1.5 : 1;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  for (const ev of events) {
    const li = HIGHWAY_CHANNELS.findIndex((c) => c.key === ev.channel);
    if (li < 0) continue;
    const y = yForBeat(ev.beat, currentBeat, centerY, pxPerBeat);
    if (y < -12 || y > highwayH + 12) continue;

    const distBeats = Math.abs(ev.beat - currentBeat);
    const distPx = Math.abs(y - centerY);
    const approach = approachFactor(distBeats, halfWindow);
    const peak = hitPeak(distBeats);
    const channelLevel = liveLevels[ev.channel] ?? 0;
    const crossing = peak > 0.12 || (distPx < 5 && channelLevel > 0.35);
    const x = cols[li]!;

    const baseHex = highwayBandHex(ev.channel);
    const fill = mixHexWithWhite(baseHex, peak * 0.72 + (crossing ? 0.18 : 0));
    const grow = 0.32 + approach * 0.68;
    const hitBoost = 1 + peak * 0.42;
    const fade = overlayOpacity * (0.28 + approach * 0.52 + peak * 0.28);
    const shapeBand = highwayShapeBand(ev.channel);
    const shapeScale =
      shapeBand && (ev.intensity != null || ev.sustain != null)
        ? eventVisualScale(
            {
              intensity: ev.intensity ?? 0.55,
              durationMs: 0,
              sustain: ev.sustain ?? 0.35,
            },
            shapeBand,
          )
        : { width: 1, height: 1 };

    ctx.save();
    ctx.globalAlpha = fade;
    ctx.fillStyle = fill;

    if (crossing) {
      ctx.shadowColor = "rgba(255,255,255,0.95)";
      ctx.shadowBlur = 10 + peak * 14;
    }

    if (isGridPulseChannel(ev.channel)) {
      const s =
        Math.min(colW * 0.09 * grow * hitBoost, pxPerBeat * 0.42) *
        (1 + peak * 0.25);
      ctx.beginPath();
      if (ev.channel === "rhythm") {
        ctx.arc(x, y, s * 0.48, 0, Math.PI * 2);
      } else {
        ctx.moveTo(x, y - s * 0.55);
        ctx.lineTo(x + s * 0.5, y);
        ctx.lineTo(x, y + s * 0.55);
        ctx.lineTo(x - s * 0.5, y);
        ctx.closePath();
      }
      ctx.fill();
      if (crossing) {
        ctx.shadowBlur = 0;
        ctx.strokeStyle = `rgba(255,255,255,${0.55 + peak * 0.4})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    } else {
      const noteW =
        Math.min(colW * 0.11 * grow * hitBoost * shapeScale.width, 48 * shapeScale.width);
      const noteH =
        (5 + approach * 11 + peak * 5) * Math.min(1.35, hitBoost) * shapeScale.height;
      const r = Math.min(3, noteW * 0.22);
      ctx.beginPath();
      ctx.roundRect(x - noteW / 2, y - noteH / 2, noteW, noteH, r);
      ctx.fill();
      if (crossing) {
        ctx.shadowBlur = 0;
        ctx.strokeStyle = `rgba(255,255,255,${0.5 + peak * 0.45})`;
        ctx.lineWidth = 1.5 + peak;
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  for (let li = 0; li < HIGHWAY_CHANNELS.length; li++) {
    const ch = HIGHWAY_CHANNELS[li]!;
    const level = liveLevels[ch.key] ?? 0;
    if (level < 0.2) continue;
    const x0 = li * colW;
    const pad = colW * 0.22;
    const glow = 0.25 + level * 0.65;
    const h = 4 + level * 8;
    ctx.fillStyle = `rgba(255,255,255,${glow * overlayOpacity})`;
    ctx.fillRect(x0 + pad, centerY - h / 2, colW - pad * 2, h);
  }

  ctx.strokeStyle = `rgba(255,255,255,${0.92 * overlayOpacity})`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(width, centerY);
  ctx.stroke();
  ctx.strokeStyle = `rgba(255,255,255,${0.35 * overlayOpacity})`;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(width, centerY);
  ctx.stroke();

  ctx.fillStyle = `rgba(0, 0, 0, ${0.72 * overlayOpacity})`;
  ctx.fillRect(0, highwayH, width, labelH);
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.beginPath();
  ctx.moveTo(0, highwayH);
  ctx.lineTo(width, highwayH);
  ctx.stroke();
}
