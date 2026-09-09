/** ParVagues post-production bundle — see bundle README for schema docs. */

export type ParVaguesOrbitRole =
  | "rhythm"
  | "bass"
  | "lead"
  | "pad"
  | "riser"
  | "other"
  | string;

export interface ParVaguesTrackManifestEntry {
  track: number;
  title: string;
  start: number;
  end: number;
  duration?: number;
  end_confidence?: string;
}

export interface ParVaguesBoundaryGroundTruth {
  between_tracks: [number, number];
  boundary_final_time: number;
  confidence?: string;
  user_confirmed?: boolean;
}

export interface ParVaguesHighlightLabel {
  t: number;
  kind: string;
  score?: number;
  duration?: number;
}

export interface ParVaguesTrackHighlights {
  track: number;
  title: string;
  duration: number;
  labels?: ParVaguesHighlightLabel[];
  moments?: Array<{
    t: number;
    type: string;
    confidence?: number;
    duration?: number;
  }>;
  counts?: Record<string, number>;
}

export interface ParVaguesStemMeta {
  role: ParVaguesOrbitRole;
  sound?: string;
  name?: string | null;
  declared?: boolean;
}

export interface ParVaguesStemBinding {
  label: string;
  effect: string;
}

export interface ParVaguesStemSummary {
  orbit: number;
  role: ParVaguesOrbitRole;
  sound?: string;
  name?: string | null;
  declared?: boolean;
  nEvents?: number;
  density?: number;
  pattern?: string | null;
  cycleSteps?: number | null;
  impliedBpm?: number | null;
  fillRatio?: number | null;
  rhythmConfidence?: number | null;
  /** Seconds with audible stem activity (from stems/_manifest.json kept[].active_s). */
  activeSec?: number | null;
  peakDb?: number | null;
  bindings?: ParVaguesStemBinding[];
  /** Present in stems/_manifest.json dropped[] — silent / unused orbit. */
  silent?: boolean;
}

export interface ParVaguesHighlightMoment {
  t: number;
  kind: string;
  score?: number;
  duration?: number;
}

export interface ParVaguesTrackDetail {
  track: number;
  title: string;
  start: number;
  end: number;
  duration: number;
  endConfidence?: string;
  dominantBpm?: number | null;
  bpmStability?: number | null;
  gtBpm?: number | null;
  bpmSource?: string | null;
  gridSubdivisionMs?: number | null;
  nEvents?: number;
  nBleed?: number;
  sourceTidal?: string | null;
  headerComments?: string[];
  stems: ParVaguesStemSummary[];
  highlights: ParVaguesHighlightMoment[];
  highlightCounts?: Record<string, number>;
}

export interface ParVaguesDiscreteEvent {
  t: number;
  orbit: number;
  v: number;
  role: ParVaguesOrbitRole;
  bleed?: boolean;
}

export interface ParVaguesTrackEventsFile {
  track: number;
  title: string;
  duration: number;
  source_tidal?: string;
  grid?: {
    subdivision_ms?: number;
    dominant_bpm?: number;
    gt_bpm?: number;
    bpm_stability?: number;
    bpm_source?: string;
    gt_variable?: boolean;
    gt_range?: [number, number];
  };
  stems?: Record<
    string,
    ParVaguesStemMeta & {
      n_events?: number;
      density?: number;
      rhythm?: { pattern?: string; cycle_steps?: number; implied_bpm?: number; fill_ratio?: number; confidence?: number } | null;
    }
  >;
  events: Array<{ t: number; orbit: number; v: number; bleed?: boolean }>;
}

export interface ParVaguesMasterHighlight {
  t: number;
  kind: string;
  track: number;
  title: string;
  score?: number;
}

/** @deprecated use ParVaguesTrackDetail.start/end */
export interface ParVaguesTrackRegion {
  track: number;
  title: string;
  start: number;
  end: number;
}

export interface ParVaguesBundleParams {
  sr?: number;
  hop?: number;
  min_strength?: number;
  activity_floor_db?: number;
  head_trim_s?: number;
}

export interface ParVaguesBundleCatalog {
  name: string;
  setName: string;
  trackCount: number;
  durationSec: number;
  hasEvents: boolean;
  hasHighlights: boolean;
  hasSource: boolean;
  masterFileName: string;
  dominantBpm: number | null;
  gridSubdivisionMs: number | null;
  params?: ParVaguesBundleParams;
  tracks: ParVaguesTrackDetail[];
}

/** Alias kept for older call sites */
export type ParVaguesBundleMeta = ParVaguesBundleCatalog;

export interface ParVaguesOrbitMeta {
  role: ParVaguesOrbitRole;
  sound?: string;
  density: number;
  nEvents: number;
}

export interface ParVaguesTimelineLayer {
  bundle: ParVaguesBundleCatalog;
  discreteEvents: ParVaguesDiscreteEvent[];
  highlights: ParVaguesMasterHighlight[];
  gridTicks: number[];
  /** Global orbit metadata keyed by orbit number (1–12). */
  orbitMeta: Record<number, ParVaguesOrbitMeta>;
}

export const PARVAGUES_ROLE_COLOR: Record<string, string> = {
  rhythm: "#ff4d4d",
  bass: "#a855f7",
  lead: "#facc15",
  pad: "#3b82f6",
  riser: "#06b6d4",
  other: "#94a3b8",
};
