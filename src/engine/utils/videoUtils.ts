import { remapLoopVideoPath, restoreMisarchivedActivePlaysetPath } from "../lib/loopPathCanonical";
import { clipStarRating } from "./playsetLibraryFilters";
import type { LibraryVideo, VideoLibrary } from "../types/videoLibrary";
import { resolveLoopAssetUrl } from "./loopAssetUrl";
import type { AppState, FolderConfig, Scene } from "../types/settings";
import { DEFAULT_VIDEO_SPEED_BASE } from "./loopPlayback";
export {
  DEFAULT_VIDEO_SPEED_BASE,
  LOOP_SOURCE_FPS,
  LOOP_TARGET_PRESENTATION_FPS,
} from "./loopPlayback";

/** Standard Veo loop length; caps reactive playback so one pass stays within this wall-clock span. */
export const LOOP_WALL_CLOCK_MAX_SEC = 8;

export function maxVideoPlaybackRateForWallClock(
  durationSec: number,
  maxWallSec = LOOP_WALL_CLOCK_MAX_SEC,
): number {
  if (!Number.isFinite(durationSec) || durationSec <= 0) return Infinity;
  const fromWall = durationSec / maxWallSec;
  if (fromWall < DEFAULT_VIDEO_SPEED_BASE) {
    // ~7.5s Veo exports sit under the 8s wall budget — allow 30fps base + sync headroom.
    return DEFAULT_VIDEO_SPEED_BASE * 3;
  }
  return fromWall;
}

/** Virtual shelf: clips rated 5★ across all folders (see `collectFiveStarVideos`). */
export const SELECTA_FOLDER = "selecta";

/** Virtual shelf: clips with no rating yet; ordered newest-first by filename epoch when present. */
export const UNRATED_FOLDER = "unrated";

/** Clips under consolidated archive — not star-rated in the UI. */
export function isArchiveLoopPath(path: string | undefined): boolean {
  return typeof path === "string" && path.includes("/loops/archive/");
}

/** Same clip after migration remaps (`archive`, `VEO-incoming` → `white-hole`, etc.). */
export function clipPathsEquivalent(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string" || !a || !b) return false;
  if (a === b) return true;
  return remapLoopVideoPath(a) === remapLoopVideoPath(b);
}

/** Scene clip playlist applies only while the browsed playset matches the scene's playset. */
export function scenePlaylistActiveForBrowse(
  scene: Scene | null | undefined,
  browseFolder: string,
): boolean {
  if (!scene) return false;
  const scenePaths = (scene.videoPaths ?? []).filter(
    (p): p is string => typeof p === "string" && p.length > 0,
  );
  if (scenePaths.length === 0) return false;
  const scenePlayset = scene.playsetFolder?.trim();
  if (!scenePlayset) return false;
  return scenePlayset === browseFolder;
}

/** Armed scene has an ordered clip list — drives transport even while browsing other playsets. */
export function sceneHasPlaylist(scene: Scene | null | undefined): boolean {
  return (scene?.videoPaths ?? []).some(
    (p): p is string => typeof p === "string" && p.length > 0,
  );
}

/** Folder row that drives Hydra playback — follows browse folder unless scene playset matches browse. */
export function resolvePlaybackFolder(
  state: Pick<AppState, "global" | "folders">,
  activeFolder: string,
): string {
  const scene = activeSceneFromState(state);
  const scenePlayset = scene?.playsetFolder?.trim();
  if (scenePlayset && scenePlayset === activeFolder) return scenePlayset;
  return activeFolder;
}

/** Current clip path on the playback folder row for the browsed playset. */
export function resolvePlaybackVideo(
  state: Pick<AppState, "global" | "folders">,
  browseFolder: string,
): string | undefined {
  const playbackFolder = resolvePlaybackFolder(state, browseFolder);
  const video = state.folders[playbackFolder]?.video;
  return typeof video === "string" && video.length > 0 ? video : undefined;
}

/** Clip pool for playback + next/prev — scene playlist when active for browse, else the playset shelf. */
export function resolvePlaybackClipPool(
  state: Pick<AppState, "global" | "folders">,
  activeFolder: string,
  videoLibrary: VideoLibrary,
  ratings: Record<string, number> | undefined,
  sortMode: "library" | "rating",
): { playbackFolder: string; pool: LibraryVideo[] } {
  const playbackFolder = resolvePlaybackFolder(state, activeFolder);
  const scene = activeSceneFromState(state);
  if (sceneHasPlaylist(scene) && scenePlaylistActiveForBrowse(scene, activeFolder)) {
    const scenePaths = (scene!.videoPaths ?? []).filter(
      (p): p is string => typeof p === "string" && p.length > 0,
    );
    return {
      playbackFolder,
      pool: scenePaths.map((path) => ({ path, name: path.split("/").pop() ?? path })),
    };
  }
  return {
    playbackFolder,
    pool: getVideosForPlayset(playbackFolder, videoLibrary, ratings, sortMode),
  };
}

/** Active scene when `activeSceneId` is set. */
export function activeSceneFromState(state: Pick<AppState, "global">): Scene | null {
  const sceneId = state.global.activeSceneId;
  if (!sceneId) return null;
  return (state.global.scenes ?? []).find((s) => s.id === sceneId) ?? null;
}

/** Pick a clip path that exists in `pool` — stored folder row, else first library row. */
export function resolvePlaysetClipInPool(
  pool: readonly { path?: string }[],
  storedVideo: string | undefined,
): string | null {
  if (storedVideo) {
    const canon = resolveClipPathInPlaysetList(pool, storedVideo);
    if (canon) return canon;
  }
  const first = pool[0]?.path;
  return typeof first === "string" && first.length > 0 ? first : null;
}

/** Library row `path` spelling when `needle` matches under {@link clipPathsEquivalent}. */
export function resolveClipPathInPlaysetList(list: readonly { path?: string }[], needle: string): string | null {
  if (!needle || !Array.isArray(list)) return null;
  for (const row of list) {
    const p = row?.path;
    if (typeof p !== "string" || !p) continue;
    if (clipPathsEquivalent(needle, p)) return p;
  }
  return null;
}

/** Find a clip anywhere in the generated library (any playset folder). */
export function resolveClipInVideoLibrary(
  videoLibrary: VideoLibrary,
  path: string,
): LibraryVideo | undefined {
  if (!path || !Array.isArray(videoLibrary)) return undefined;
  for (const folder of videoLibrary) {
    for (const video of folder.videos) {
      if (typeof video.path === "string" && clipPathsEquivalent(video.path, path)) {
        return video;
      }
    }
  }
  return undefined;
}

/**
 * Staging-style generated loops (Veo + perfect-loop CLI), identifiable by filename — excludes archive.
 * `generate_perfect_loop.js` uses `prefix__perfect_loop_<ts>.mp4` when `LOOP_FILENAME_PREFIX` is set,
 * and `perfect_loop_<ts>.mp4` when it is empty; both must count for the unrated virtual shelf.
 */
export function isVeoGeneratedLoopPath(path: string | undefined): boolean {
  if (!path || isArchiveLoopPath(path)) return false;
  const base = path.split("/").pop() ?? "";
  if (/^VEO-/i.test(base)) return true;
  if (/^000_White-Hole3?__/i.test(base)) return true;
  if (/__perfect_loop_\d+\.mp4$/i.test(base)) return true;
  if (/^perfect_loop_\d+\.mp4$/i.test(base)) return true;
  return false;
}

function extractLoopEpochMs(videoPath: string): number {
  const m =
    videoPath.match(/perfect_loop_(\d+)\.mp4$/i) ?? videoPath.match(/(\d{13})\.mp4$/i);
  if (!m) return 0;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : 0;
}

export function sortVideosForLibraryPane<T extends { path: string; name: string }>(
  videos: T[],
  ratings: Record<string, number> | undefined,
  sortMode: "library" | "rating",
): T[] {
  if (sortMode !== "rating") return videos;
  const r = ratings ?? {};
  return [...videos].toSorted((a, b) => {
    const ra = clipStarRating(a.path, r);
    const rb = clipStarRating(b.path, r);
    if (rb !== ra) return rb - ra;
    return a.name.localeCompare(b.name);
  });
}

export function collectFiveStarVideos(
  library: VideoLibrary,
  ratings: Record<string, number> | undefined,
  sortMode: "library" | "rating",
): LibraryVideo[] {
  const r = ratings ?? {};
  const flat: LibraryVideo[] = library.flatMap((lib) =>
    (lib.videos || []).map((v) => ({
      ...v,
      sourceFolder: lib.folder,
    })),
  );
  const five = flat.filter((v) => clipStarRating(v.path, r) === 5 && !isArchiveLoopPath(v.path));
  return sortVideosForLibraryPane(five, ratings, sortMode);
}

/** Flattened unrated staging clips (Veo / `__perfect_loop_*` exports); excludes archive and starred paths. */
export function collectUnratedVideos(
  library: VideoLibrary,
  ratings: Record<string, number> | undefined,
): LibraryVideo[] {
  const r = ratings ?? {};
  const flat: LibraryVideo[] = library.flatMap((lib) =>
    (lib.videos || []).map((v) => ({
      ...v,
      sourceFolder: lib.folder,
    })),
  );
  const unrated = flat.filter((v) => {
    if (!isVeoGeneratedLoopPath(v.path)) return false;
    const stars = clipStarRating(v.path, r);
    return stars === undefined || stars === null || stars === 0;
  });
  return unrated.toSorted((a, b) => {
    const eb = extractLoopEpochMs(b.path);
    const ea = extractLoopEpochMs(a.path);
    if (eb !== ea) return eb - ea;
    return b.name.localeCompare(a.name);
  });
}

/** Ordered clip list for the given playset key — always keyed by `activeFolder`, never by “who contains current path”. */
export function getVideosForPlayset(
  activeFolder: string,
  videoLibrary: VideoLibrary,
  ratings: Record<string, number> | undefined,
  sortMode: "library" | "rating",
  selectaFolderKey: string = SELECTA_FOLDER,
  unratedFolderKey: string = UNRATED_FOLDER,
): LibraryVideo[] {
  if (activeFolder === selectaFolderKey) {
    return collectFiveStarVideos(videoLibrary, ratings, sortMode);
  }
  if (activeFolder === unratedFolderKey) {
    return collectUnratedVideos(videoLibrary, ratings);
  }
  const lib = videoLibrary.find((f) => f.folder === activeFolder);
  return sortVideosForLibraryPane(lib?.videos ?? [], ratings, sortMode);
}

export function getNextPrevVideos(
  activeFolder: string,
  activeFolderConfig: Pick<FolderConfig, "video">,
  videoLibrary: VideoLibrary,
  ratings: Record<string, number> | undefined,
  sortMode: "library" | "rating",
  selectaFolderKey: string = SELECTA_FOLDER,
  unratedFolderKey: string = UNRATED_FOLDER,
) {
  const currentFolderVideos = getVideosForPlayset(
    activeFolder,
    videoLibrary,
    ratings,
    sortMode,
    selectaFolderKey,
    unratedFolderKey,
  );

  if (currentFolderVideos.length === 0) return { next: null, prev: null };

  const rawCur = typeof activeFolderConfig.video === "string" ? activeFolderConfig.video : "";
  const cur = rawCur ? resolveClipPathInPlaysetList(currentFolderVideos, rawCur) ?? rawCur : "";
  let currentIndex = -1;
  if (cur) {
    currentIndex = currentFolderVideos.findIndex((v) =>
      typeof v?.path === "string" ? clipPathsEquivalent(v.path, cur) : false,
    );
  }
  if (currentIndex === -1) {
    const fallbackNext = currentFolderVideos[0]!.path;
    const fallbackPrev = currentFolderVideos[currentFolderVideos.length - 1]!.path;
    return { next: fallbackNext, prev: fallbackPrev };
  }

  let nextIndex = currentIndex + 1;
  if (nextIndex >= currentFolderVideos.length) nextIndex = 0;
  let prevIndex = currentIndex - 1;
  if (prevIndex < 0) prevIndex = currentFolderVideos.length - 1;

  return {
    next: currentFolderVideos[nextIndex]!.path,
    prev: currentFolderVideos[prevIndex]!.path,
  };
}

/** Next/prev within an explicit ordered path list (e.g. active scene playlist). Wraps at ends. */
export function getNextPrevInOrderedPaths(
  currentPath: string,
  paths: readonly string[],
): { next: string | null; prev: string | null } {
  const ordered = paths.filter((p): p is string => typeof p === "string" && p.length > 0);
  if (ordered.length === 0) return { next: null, prev: null };

  const cur = typeof currentPath === "string" ? currentPath : "";
  let currentIndex = -1;
  if (cur) {
    currentIndex = ordered.findIndex((p) => clipPathsEquivalent(p, cur));
  }
  if (currentIndex === -1) {
    return { next: ordered[0]!, prev: ordered[ordered.length - 1]! };
  }

  const nextIndex = (currentIndex + 1) % ordered.length;
  const prevIndex = (currentIndex - 1 + ordered.length) % ordered.length;
  return { next: ordered[nextIndex]!, prev: ordered[prevIndex]! };
}

/** Candidate spellings when resolving a stored scene clip path (archive → shelf, migration remaps). */
function sceneClipPathCandidates(path: string): string[] {
  const out: string[] = [];
  const add = (p: string) => {
    if (typeof p === "string" && p.length > 0 && !out.includes(p)) out.push(p);
  };
  add(path);
  add(unarchiveLoopPath(path));
  add(remapLoopVideoPath(path));
  add(remapLoopVideoPath(unarchiveLoopPath(path)));
  return out;
}

/** Prefer library spelling, then migration remap, for stable scene playlist paths. */
export function normalizeSceneClipPath(
  path: string,
  library: readonly { path?: string }[],
  videoLibrary?: VideoLibrary,
): string {
  for (const candidate of sceneClipPathCandidates(path)) {
    const fromLibrary = resolveClipPathInPlaysetList([...library], candidate);
    if (fromLibrary) return remapLoopVideoPath(fromLibrary);
  }
  if (videoLibrary) {
    for (const candidate of sceneClipPathCandidates(path)) {
      const global = resolveClipInVideoLibrary(videoLibrary, candidate);
      if (global?.path) return remapLoopVideoPath(global.path);
    }
  }
  const unarchived = unarchiveLoopPath(path);
  return remapLoopVideoPath(unarchived !== path ? unarchived : path);
}

/** Resolve a clip against a scene's bound playset shelf — null when not on that playset. */
export function resolveSceneClipInPlayset(
  path: string,
  playsetFolder: string,
  videoLibrary: VideoLibrary,
  ratings: Record<string, number> | undefined,
  sortMode: "library" | "rating",
): string | null {
  const folder = playsetFolder?.trim();
  if (!folder || !path) return null;
  const library = getVideosForPlayset(folder, videoLibrary, ratings, sortMode);
  const normalized = normalizeSceneClipPath(path, library, videoLibrary);
  return resolveClipPathInPlaysetList(library, normalized) ? normalized : null;
}

/**
 * Resolve a clip for adding to a scene playlist — scene playset shelf first, then the
 * browsed playset grid (while detached), then any known library path.
 */
export function resolveClipForScenePlaylistAdd(
  clipPath: string,
  scene: Scene,
  browseFolder: string,
  videoLibrary: VideoLibrary,
  ratings: Record<string, number> | undefined,
  sortMode: "library" | "rating",
): string | null {
  if (!clipPath) return null;
  const scenePlayset = scene.playsetFolder?.trim() ?? "";
  if (scenePlayset) {
    const fromScenePlayset = resolveSceneClipInPlayset(
      clipPath,
      scenePlayset,
      videoLibrary,
      ratings,
      sortMode,
    );
    if (fromScenePlayset) return fromScenePlayset;
  }
  const browseLibrary = getVideosForPlayset(browseFolder, videoLibrary, ratings, sortMode);
  const fromBrowse = normalizeSceneClipPath(clipPath, browseLibrary, videoLibrary);
  if (resolveClipPathInPlaysetList(browseLibrary, fromBrowse)) return fromBrowse;
  if (resolveClipInVideoLibrary(videoLibrary, fromBrowse)?.path) return fromBrowse;
  return null;
}

/** Normalize every path on a scene against its playset folder (not the browsed shelf). */
export function normalizeSceneVideoPaths(
  scene: Scene,
  videoLibrary: VideoLibrary,
  ratings: Record<string, number> | undefined,
  sortMode: "library" | "rating",
): string[] {
  const folder = scene.playsetFolder?.trim();
  const library = folder
    ? getVideosForPlayset(folder, videoLibrary, ratings, sortMode)
    : [];
  return normalizeSceneClipPaths(scene.videoPaths, library, videoLibrary);
}

export function normalizeSceneClipPaths(
  paths: readonly string[],
  library: readonly { path?: string }[],
  videoLibrary?: VideoLibrary,
): string[] {
  return paths.map((path) => normalizeSceneClipPath(path, library, videoLibrary));
}

function loopMediaUrlRank(p: string): number {
  return p.includes("/loops/archive/") ? 1 : 0;
}

/**
 * Generic un-archive: `/loops/archive/<folder>__<rest>` → `/loops/<folder>/<rest>`.
 * Archived clips are named `<sourceFolder>__<originalFilename>`; when a shelf's clips
 * still live under `/loops/<folder>/` this recovers the real on-disk path without an
 * ever-growing per-folder whitelist. Tried as one candidate — a miss just falls through.
 */
export function unarchiveLoopPath(path: string): string {
  if (!path.startsWith("/loops/archive/")) return path;
  const base = path.slice("/loops/archive/".length);
  const sep = base.indexOf("__");
  if (sep <= 0) return path;
  const folder = base.slice(0, sep);
  const rest = base.slice(sep + 2);
  if (!folder || !rest || folder.endsWith("-frames")) return path;
  return `/loops/${folder}/${rest}`;
}

/** Prefer on-disk playset URLs over false `archive/slug__file` remaps (e.g. parvagues). */
export function resolveLoopVideoMediaUrls(videoPath: string): string[] {
  if (!videoPath || typeof videoPath !== "string" || !videoPath.startsWith("/")) return [];
  const out: string[] = [];
  const add = (p: string) => {
    if (p.startsWith("/") && !out.includes(p)) out.push(p);
  };
  add(videoPath);
  add(restoreMisarchivedActivePlaysetPath(videoPath));
  add(unarchiveLoopPath(videoPath));
  add(remapLoopVideoPath(videoPath));
  return out
    .toSorted((a, b) => loopMediaUrlRank(a) - loopMediaUrlRank(b))
    .map((p) => resolveLoopAssetUrl(p));
}

