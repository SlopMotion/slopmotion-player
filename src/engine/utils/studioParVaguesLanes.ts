import { TIMELINE_TRIGGER_LANES, timelineLaneFill } from "../theme/audioBands";
import type { TrackTimelineAnalysis } from "./analyzeTrackTimeline";
import {
  buildNechTimelineLanes,
  hasNechTimelineAnalysis,
  type StudioNechLane,
} from "./nechTimelineLanes";
import type { NechTriggerBand } from "./nechTriggerBands";
import type {
  ParVaguesBundleCatalog,
  ParVaguesHighlightMoment,
  ParVaguesOrbitRole,
  ParVaguesStemSummary,
  ParVaguesTimelineLayer,
  ParVaguesTrackDetail,
} from "../types/parVaguesBundle";
import { PARVAGUES_ROLE_COLOR } from "../types/parVaguesBundle";
import { STUDIO_EVENT_LANE_HEIGHT, STUDIO_TIMELINE_LANE_HEIGHT } from "./studioTimelineLayout";

/** Minimum discrete events in the visible window to allocate a dedicated orbit lane (full-set fallback). */
export const ORBIT_LANE_MIN_EVENTS = 6;
/** Minimum stem density (events/s) to allocate a lane even with fewer marks (full-set fallback). */
export const ORBIT_LANE_MIN_DENSITY = 0.035;

export const PARVAGUES_MOMENT_COLORS: Record<string, string> = {
  drop: "rgba(244,63,94,0.9)",
  peak: "rgba(250,204,21,0.9)",
  buildup: "rgba(56,189,248,0.85)",
  breakdown: "rgba(148,163,184,0.8)",
  transition: "rgba(167,139,250,0.85)",
};

export type StudioMomentLane = {
  kind: "moment";
  label: "Mom";
  events: Array<{
    t: number;
    kind: string;
    track: number;
    duration?: number;
    score?: number;
  }>;
};

export type StudioOrbitLane = {
  kind: "orbit";
  orbit: number;
  role: ParVaguesOrbitRole;
  label: string;
  shortLabel: string;
  color: string;
  pulseSec: number;
  events: Array<{ t: number; v: number }>;
};

export type StudioBandLane = {
  kind: "band";
  bandKey: (typeof TIMELINE_TRIGGER_LANES)[number]["key"];
  label: string;
  shortLabel: string;
  color: string;
  times: number[];
};

export type StudioRoleGroupLane = {
  kind: "roleGroup";
  role: ParVaguesOrbitRole;
  label: string;
  color: string;
  stemCount: number;
  pulseSec: number;
  events: Array<{ t: number; v: number }>;
};

export type { StudioNechLane } from "./nechTimelineLanes";

export type StudioTimelineLane =
  | StudioMomentLane
  | StudioRoleGroupLane
  | StudioOrbitLane
  | StudioBandLane
  | StudioNechLane;

function compactSoundLabel(sound?: string | null): string {
  if (!sound?.trim()) return "";
  let s = sound.trim().replace(/^\[|\]$/g, "");
  const parts = s.split(",").map((p) => p.trim()).filter(Boolean);
  return parts[parts.length - 1] ?? s;
}

export function orbitDisplayName(opts: {
  orbit: number;
  role: string;
  sound?: string | null;
  name?: string | null;
}): string {
  const fromName = opts.name?.trim();
  if (fromName) return fromName;
  const fromSound = compactSoundLabel(opts.sound);
  if (fromSound) return fromSound;
  return opts.role;
}

export function orbitShortDisplayName(opts: {
  orbit: number;
  role: string;
  sound?: string | null;
  name?: string | null;
  maxLen?: number;
}): string {
  const maxLen = opts.maxLen ?? 11;
  const full = orbitDisplayName(opts);
  if (full.length <= maxLen) return full;
  return `${full.slice(0, maxLen - 1)}…`;
}

function orbitLabel(
  orbit: number,
  role: string,
  sound?: string | null,
  name?: string | null,
) {
  const tag = orbitDisplayName({ orbit, role, sound, name });
  return `d${orbit} · ${tag}`;
}

export function orbitLaneColor(role: ParVaguesOrbitRole) {
  return PARVAGUES_ROLE_COLOR[role] ?? PARVAGUES_ROLE_COLOR.other!;
}

export const PARVAGUES_ROLE_ORDER = ["rhythm", "bass", "lead", "pad", "riser", "other"] as const;

function parVaguesRoleSortIndex(role: string): number {
  const i = PARVAGUES_ROLE_ORDER.indexOf(role as (typeof PARVAGUES_ROLE_ORDER)[number]);
  return i === -1 ? PARVAGUES_ROLE_ORDER.length : i;
}

export function parVaguesRoleLabel(role: string): string {
  if (!role) return "other";
  return role;
}

export function parVaguesRoleShortLabel(role: string): string {
  const label = parVaguesRoleLabel(role);
  if (label.length <= 3) return label.toUpperCase();
  return label.slice(0, 3).toUpperCase();
}

function groupOrbitLanesByRole(
  orbitLanes: StudioOrbitLane[],
): Array<{ role: string; lanes: StudioOrbitLane[] }> {
  const map = new Map<string, StudioOrbitLane[]>();
  for (const lane of orbitLanes) {
    const role = lane.role || "other";
    const list = map.get(role) ?? [];
    list.push(lane);
    map.set(role, list);
  }
  return [...map.entries()]
    .toSorted(([a], [b]) => parVaguesRoleSortIndex(a) - parVaguesRoleSortIndex(b) || a.localeCompare(b))
    .map(([role, lanes]) => ({ role, lanes }));
}

/** Role-group lanes only — individual orbit rows are folded into category lanes. */
export function visibleStudioTimelineLanes(lanes: StudioTimelineLane[]): StudioTimelineLane[] {
  return lanes.filter((lane) => lane.kind !== "orbit");
}

/** Collapse key for highlight zones on the waveform (not a stem role). */
export const PARVAGUES_WAVE_MOMENT_KEY = "moment";

export type WaveformStemGroup = {
  role: string;
  shortLabel: string;
  label: string;
  color: string;
  stemCount: number;
  orbits: number[];
  pulseSec: number;
};

function buildParVaguesOrbitLanes(
  timeline: TrackTimelineAnalysis,
  focusTrackNumber: number | null,
  bundleMeta: ParVaguesBundleCatalog,
): StudioOrbitLane[] {
  const pv = timeline.parVagues!;
  const track =
    focusTrackNumber != null
      ? bundleMeta.tracks.find((t) => t.track === focusTrackNumber) ?? null
      : null;
  const { start, end } = trackWindow(track, timeline.durationSec);
  const pulseSec = pulseSecForTrack(track, bundleMeta);
  const orbitLanes: StudioOrbitLane[] = [];
  const exhaustive = Boolean(track?.stems.length);
  for (const stem of orbitCandidatesForTrack(track, pv)) {
    const meta = pv.orbitMeta[stem.orbit];
    const role = stem.role ?? meta?.role ?? "other";
    const sound = stem.sound ?? meta?.sound;
    const name = stem.name ?? null;
    const events = collectOrbitEventsInWindow(pv, stem.orbit, start, end);
    const density = stem.density ?? meta?.density;
    if (!exhaustive && !stemQualifiesForLane(events.length, density)) continue;
    orbitLanes.push({
      kind: "orbit",
      orbit: stem.orbit,
      role,
      label: orbitLabel(stem.orbit, role, sound, name),
      shortLabel: orbitShortDisplayName({ orbit: stem.orbit, role, sound, name }),
      color: orbitLaneColor(role),
      pulseSec,
      events,
    });
  }
  return orbitLanes;
}

export function parVaguesStemVizOnWaveform(
  timeline: TrackTimelineAnalysis | null,
  bundleMeta: ParVaguesBundleCatalog | null,
): boolean {
  if (!timeline?.parVagues || !bundleMeta?.hasEvents) return false;
  return buildParVaguesOrbitLanes(timeline, null, bundleMeta).length > 0;
}

export function resolveWaveformStemGroups(
  timeline: TrackTimelineAnalysis | null,
  focusTrackNumber: number | null,
  bundleMeta: ParVaguesBundleCatalog | null,
): WaveformStemGroup[] {
  if (!timeline?.parVagues || !bundleMeta?.hasEvents) return [];
  const orbitLanes = buildParVaguesOrbitLanes(timeline, focusTrackNumber, bundleMeta);
  if (!orbitLanes.length) return [];
  return groupOrbitLanesByRole(orbitLanes).map(({ role, lanes }) => ({
    role,
    shortLabel: parVaguesRoleShortLabel(role),
    label: parVaguesRoleLabel(role),
    color: orbitLaneColor(role),
    stemCount: lanes.length,
    orbits: lanes.map((l) => l.orbit),
    pulseSec: lanes[0]?.pulseSec ?? 0.2,
  }));
}

/** Unique highlight kinds (drop, buildup, peak, …) in the focused track/window. */
export function momentKindsInFocus(
  timeline: TrackTimelineAnalysis | null,
  focusTrackNumber: number | null,
  bundleMeta: ParVaguesBundleCatalog | null,
): string[] {
  const pv = timeline?.parVagues;
  if (!pv || !bundleMeta || !timeline) return [];
  const track =
    focusTrackNumber != null
      ? bundleMeta.tracks.find((t) => t.track === focusTrackNumber) ?? null
      : null;
  const { start, end } = trackWindow(track, timeline.durationSec);
  const kinds = new Set<string>();
  for (const ev of momentEventsForWindow(pv, track, start, end)) {
    if (ev.kind) kinds.add(ev.kind);
  }
  return [...kinds].toSorted();
}

export function groupStemsByRole(
  stems: ParVaguesStemSummary[],
): Array<{ role: string; stems: ParVaguesStemSummary[] }> {
  const map = new Map<string, ParVaguesStemSummary[]>();
  for (const stem of stems) {
    const role = stem.role || "other";
    const list = map.get(role) ?? [];
    list.push(stem);
    map.set(role, list);
  }
  return [...map.entries()]
    .toSorted(([a], [b]) => parVaguesRoleSortIndex(a) - parVaguesRoleSortIndex(b) || a.localeCompare(b))
    .map(([role, list]) => ({
      role,
      stems: [...list].toSorted((a, b) => a.orbit - b.orbit),
    }));
}

function trackWindow(
  track: ParVaguesTrackDetail | null | undefined,
  durationSec: number,
): { start: number; end: number } {
  if (track) return { start: track.start, end: track.end };
  return { start: 0, end: durationSec };
}

function collectOrbitEventsInWindow(
  layer: ParVaguesTimelineLayer,
  orbit: number,
  start: number,
  end: number,
): Array<{ t: number; v: number }> {
  const events: Array<{ t: number; v: number }> = [];
  for (const ev of layer.discreteEvents) {
    if (ev.orbit !== orbit || ev.bleed) continue;
    if (ev.t < start || ev.t >= end) continue;
    events.push({ t: ev.t, v: ev.v });
  }
  return events;
}

function pulseSecForTrack(
  track: ParVaguesTrackDetail | null | undefined,
  bundle: ParVaguesBundleCatalog,
): number {
  const ms = track?.gridSubdivisionMs ?? bundle.gridSubdivisionMs ?? 200;
  return Math.max(0.04, ms / 1000);
}

function momentEventsForWindow(
  pv: ParVaguesTimelineLayer,
  track: ParVaguesTrackDetail | null | undefined,
  start: number,
  end: number,
) {
  if (track) {
    return track.highlights.map((h) => ({
      t: track.start + h.t,
      kind: h.kind,
      track: track.track,
      duration: h.duration,
      score: h.score,
    }));
  }
  return pv.highlights
    .filter((h) => h.t >= start && h.t < end)
    .map((h) => {
      const tr = pv.bundle.tracks.find((t) => t.track === h.track);
      const local = tr ? tr.highlights.find((m) => Math.abs(tr.start + m.t - h.t) < 0.05) : null;
      return {
        t: h.t,
        kind: h.kind,
        track: h.track,
        duration: local?.duration,
        score: local?.score ?? h.score,
      };
    });
}

function stemQualifiesForLane(
  eventsInWindow: number,
  density: number | undefined,
): boolean {
  if (eventsInWindow >= ORBIT_LANE_MIN_EVENTS) return true;
  if ((density ?? 0) >= ORBIT_LANE_MIN_DENSITY && eventsInWindow >= 3) return true;
  return false;
}

type OrbitStemCandidate = {
  orbit: number;
  role: ParVaguesOrbitRole;
  sound?: string;
  name?: string | null;
  density?: number;
  nEvents?: number;
};

function orbitCandidatesForTrack(
  track: ParVaguesTrackDetail | null | undefined,
  layer: ParVaguesTimelineLayer,
): OrbitStemCandidate[] {
  if (track?.stems.length) {
    return [...track.stems].toSorted((a, b) => a.orbit - b.orbit);
  }
  return Object.entries(layer.orbitMeta)
    .map(([n, meta]) => ({
      orbit: Number(n),
      role: meta.role,
      sound: meta.sound,
      density: meta.density,
      nEvents: meta.nEvents,
    }))
    .toSorted((a, b) => a.orbit - b.orbit);
}

export function buildAnalysisBandLanes(
  timeline: TrackTimelineAnalysis,
  focusTrackNumber: number | null,
  bundleMeta: ParVaguesBundleCatalog | null,
): StudioBandLane[] {
  const track =
    focusTrackNumber != null && bundleMeta
      ? (bundleMeta.tracks.find((t) => t.track === focusTrackNumber) ?? null)
      : null;
  const { start, end } = trackWindow(track, timeline.durationSec);
  return TIMELINE_TRIGGER_LANES.map((lane) => ({
    kind: "band" as const,
    bandKey: lane.key,
    label: lane.label,
    shortLabel: lane.shortLabel,
    times: timeline.events[lane.eventKey].filter((t) => t >= start && t < end),
    color: timelineLaneFill(lane.key, 0.95),
  }));
}

export function analysisBandEventCount(
  timeline: TrackTimelineAnalysis | null,
  focusTrackNumber: number | null,
  bundleMeta: ParVaguesBundleCatalog | null,
): number {
  if (!timeline) return 0;
  return buildAnalysisBandLanes(timeline, focusTrackNumber, bundleMeta).reduce(
    (n, lane) => n + lane.times.length,
    0,
  );
}

/** ParVagues stem viz on the waveform replaces default band trigger rows. */
export function parVaguesSuppressesBandLanes(
  timeline: TrackTimelineAnalysis | null,
  bundleMeta: ParVaguesBundleCatalog | null,
): boolean {
  if (!timeline?.parVagues || !bundleMeta?.hasEvents) return false;
  return buildParVaguesOrbitLanes(timeline, null, bundleMeta).length > 0;
}

export function resolveStudioTimelineLanes(
  timeline: TrackTimelineAnalysis | null,
  focusTrackNumber: number | null,
  bundleMeta: ParVaguesBundleCatalog | null,
  showAnalysisBandLanes = false,
  hiddenNechLanes: ReadonlySet<NechTriggerBand> = new Set(),
  nechTimelineApplied = false,
): StudioTimelineLane[] {
  if (!timeline) return [];

  const track =
    focusTrackNumber != null && bundleMeta
      ? (bundleMeta.tracks.find((t) => t.track === focusTrackNumber) ?? null)
      : null;
  const { start, end } = trackWindow(track, timeline.durationSec);

  const nechActive = hasNechTimelineAnalysis(timeline, nechTimelineApplied);
  const nechLanes = nechActive
    ? buildNechTimelineLanes(timeline, start, end, hiddenNechLanes)
    : [];

  const pv = timeline.parVagues;
  if (!pv || !bundleMeta?.hasEvents) {
    if (nechLanes.length) return nechLanes;
    return buildAnalysisBandLanes(timeline, focusTrackNumber, bundleMeta);
  }

  const orbitLanes = buildParVaguesOrbitLanes(timeline, focusTrackNumber, bundleMeta);

  if (orbitLanes.length === 0) {
    if (nechLanes.length) return nechLanes;
    return buildAnalysisBandLanes(timeline, focusTrackNumber, bundleMeta);
  }

  if (nechLanes.length) {
    return nechLanes;
  }

  if (showAnalysisBandLanes) {
    return buildAnalysisBandLanes(timeline, focusTrackNumber, bundleMeta);
  }

  // Stem + moment lanes live on the waveform; band rows are opt-in via header toggle.
  return [];
}

export function usesParVaguesEventLanes(lanes: StudioTimelineLane[]): boolean {
  return lanes.some(
    (lane) => lane.kind === "moment" || lane.kind === "orbit" || lane.kind === "roleGroup",
  );
}

export function studioTimelineLaneHeightForLanes(lanes: StudioTimelineLane[]): number {
  return usesParVaguesEventLanes(lanes) ? STUDIO_EVENT_LANE_HEIGHT : STUDIO_TIMELINE_LANE_HEIGHT;
}

/** Map a track-local highlight timestamp to master timeline seconds. */
export function masterTimeForTrackMoment(
  track: Pick<ParVaguesTrackDetail, "start" | "end">,
  moment: Pick<ParVaguesHighlightMoment, "t">,
): number {
  const localT = Number(moment.t);
  if (!Number.isFinite(localT)) return track.start;
  const masterT = track.start + Math.max(0, localT);
  const endCap = track.end > track.start ? track.end - 0.05 : track.start;
  return Math.max(track.start, Math.min(endCap, masterT));
}
