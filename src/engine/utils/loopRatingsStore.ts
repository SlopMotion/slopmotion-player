import type { AppState, VideoRatingsMap } from "../types/settings";
import { remapLoopVideoPath } from "../lib/loopPathCanonical";
import { isJsonRecord } from "../types/jsonMigrate";

export const LOOP_RATINGS_STORAGE_KEY = "hexa-account-loop-ratings";
const LEGACY_APP_STATE_STORAGE_KEY = "hydra-hexa-app-state";
const PROJECT_STATE_KEY_PREFIX = "hexa-project-state:";
const PROJECT_LIBRARY_INDEX_KEY = "hexa-project-library";

export function normalizeLoopRatingsMap(raw: unknown): VideoRatingsMap {
  if (!raw || typeof raw !== "object") return {};
  const out: VideoRatingsMap = {};
  for (const [path, stars] of Object.entries(raw as Record<string, unknown>)) {
    if (typeof stars !== "number" || stars <= 0 || stars > 5) continue;
    const canon = remapLoopVideoPath(path);
    if (!canon.startsWith("/loops/")) continue;
    const prev = out[canon];
    out[canon] = prev === undefined ? stars : Math.max(prev, stars);
  }
  return out;
}

function canUseLocalStorage(): boolean {
  return typeof localStorage !== "undefined";
}

export function readAccountLoopRatings(): VideoRatingsMap {
  if (!canUseLocalStorage()) return {};
  try {
    const raw = localStorage.getItem(LOOP_RATINGS_STORAGE_KEY);
    if (!raw) return {};
    return normalizeLoopRatingsMap(JSON.parse(raw));
  } catch {
    return {};
  }
}

export function writeAccountLoopRatings(ratings: VideoRatingsMap): void {
  if (!canUseLocalStorage()) return;
  try {
    localStorage.setItem(
      LOOP_RATINGS_STORAGE_KEY,
      JSON.stringify(normalizeLoopRatingsMap(ratings)),
    );
  } catch {
    /* private mode */
  }
}

export function mergeLoopRatings(...maps: VideoRatingsMap[]): VideoRatingsMap {
  const out: VideoRatingsMap = {};
  for (const map of maps) {
    for (const [path, stars] of Object.entries(map)) {
      const canon = remapLoopVideoPath(path);
      const prev = out[canon];
      out[canon] = prev === undefined ? stars : Math.max(prev, stars);
    }
  }
  return normalizeLoopRatingsMap(out);
}

export function harvestVideoRatingsFromAppStatePayload(payload: unknown): VideoRatingsMap {
  if (!isJsonRecord(payload)) return {};
  const global = payload.global;
  if (!isJsonRecord(global)) return {};
  return normalizeLoopRatingsMap(global.videoRatings);
}

/**
 * Removes the `global.videoRatings` field from a parsed app-state payload so the
 * account loop-ratings store becomes the single source of truth. Returns whether
 * the payload was modified along with the (possibly new) payload to persist.
 */
function stripVideoRatingsFromAppStatePayload(payload: unknown): {
  changed: boolean;
  next: unknown;
} {
  if (!isJsonRecord(payload)) return { changed: false, next: payload };
  const global = payload.global;
  if (!isJsonRecord(global) || !("videoRatings" in global)) {
    return { changed: false, next: payload };
  }
  const nextGlobal = { ...global };
  delete nextGlobal.videoRatings;
  return { changed: true, next: { ...payload, global: nextGlobal } };
}

function readProjectIdsFromIndex(): string[] {
  if (!canUseLocalStorage()) return [];
  try {
    const raw = localStorage.getItem(PROJECT_LIBRARY_INDEX_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { projects?: Array<{ id?: string; kind?: string }> };
    if (!Array.isArray(parsed.projects)) return [];
    return parsed.projects
      .filter((project) => project.kind === "user" && typeof project.id === "string")
      .map((project) => project.id as string);
  } catch {
    return [];
  }
}

export function bootstrapAccountLoopRatingsFromLocal(): VideoRatingsMap {
  if (!canUseLocalStorage()) return {};
  let merged = readAccountLoopRatings();

  try {
    const legacy = localStorage.getItem(LEGACY_APP_STATE_STORAGE_KEY);
    if (legacy) {
      const parsed = JSON.parse(legacy);
      merged = mergeLoopRatings(merged, harvestVideoRatingsFromAppStatePayload(parsed));
      const stripped = stripVideoRatingsFromAppStatePayload(parsed);
      if (stripped.changed) {
        localStorage.setItem(LEGACY_APP_STATE_STORAGE_KEY, JSON.stringify(stripped.next));
      }
    }
  } catch {
    /* ignore */
  }

  for (const projectId of readProjectIdsFromIndex()) {
    try {
      const key = `${PROJECT_STATE_KEY_PREFIX}${projectId}`;
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      merged = mergeLoopRatings(merged, harvestVideoRatingsFromAppStatePayload(parsed));
      const stripped = stripVideoRatingsFromAppStatePayload(parsed);
      if (stripped.changed) {
        localStorage.setItem(key, JSON.stringify(stripped.next));
      }
    } catch {
      /* ignore */
    }
  }

  if (Object.keys(merged).length > 0) {
    writeAccountLoopRatings(merged);
  }
  return merged;
}

export function withAccountLoopRatings(state: AppState, accountRatings?: VideoRatingsMap): AppState {
  const ratings = accountRatings ?? readAccountLoopRatings();
  const merged = mergeLoopRatings(ratings, state.global.videoRatings ?? {});
  if (merged === state.global.videoRatings) return state;
  return {
    ...state,
    global: {
      ...state.global,
      videoRatings: merged,
    },
  };
}

export function syncAccountLoopRatingsFromAppState(state: AppState): VideoRatingsMap {
  const merged = mergeLoopRatings(readAccountLoopRatings(), state.global.videoRatings ?? {});
  writeAccountLoopRatings(merged);
  return merged;
}
