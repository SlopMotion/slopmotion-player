import { shortLoopHash, stripLoopFileExtension } from "./loopClipLabels";
import { legacyMergedPlaysetRatingPaths } from "../lib/loopPathRules";
import { remapLoopVideoPath } from "../lib/loopPathCanonical";
import type { LibraryVideo } from "../types/videoLibrary";

export type PlaysetStarFilter = "all" | "unrated" | 1 | 2 | 3 | 4 | 5;

export type LibraryClipRow = LibraryVideo;

/** Resolve star rating across canonical and legacy path keys (post–point-waves merge). */
export function clipStarRating(path: string, ratings: Record<string, number> | undefined): number {
  if (!path) return 0;
  const r = ratings ?? {};
  const canon = remapLoopVideoPath(path);
  if (r[canon] !== undefined) return r[canon];
  if (r[path] !== undefined) return r[path];
  if (canon.startsWith("/loops/point-cloud/")) {
    for (const key of legacyMergedPlaysetRatingPaths(canon)) {
      if (r[key] !== undefined) return r[key];
    }
  }
  return 0;
}

export function filterClipsByStar(
  clips: LibraryClipRow[],
  ratings: Record<string, number> | undefined,
  starFilter: PlaysetStarFilter,
): LibraryClipRow[] {
  if (starFilter === "all") return clips;
  return clips.filter((c) => {
    const stars = clipStarRating(c.path, ratings);
    if (starFilter === "unrated") return stars === 0;
    return stars === starFilter;
  });
}

export function filterClipsBySearch(
  clips: LibraryClipRow[],
  query: string,
  getTagsForPath?: (path: string) => string[],
): LibraryClipRow[] {
  const q = query.trim().toLowerCase();
  if (!q) return clips;
  return clips.filter((c) => {
    const label = c.sourceFolder ? `${c.sourceFolder}/${c.name}` : c.name;
    const base = c.path.split("/").pop() ?? "";
    const bare = stripLoopFileExtension(base);
    const hash = shortLoopHash(c.path);
    const tagText = getTagsForPath ? getTagsForPath(c.path).join(" ") : "";
    const hay = `${label} ${c.path} ${bare} ${hash} ${tagText}`.toLowerCase();
    return hay.includes(q);
  });
}

export function filterClipsByTags(
  clips: LibraryClipRow[],
  activeTags: string[],
  getTagsForPath: (path: string) => string[],
): LibraryClipRow[] {
  if (activeTags.length === 0) return clips;
  const want = activeTags.map((t) => t.toLowerCase());
  return clips.filter((c) => {
    const have = getTagsForPath(c.path).map((t) => t.toLowerCase());
    return want.every((t) => have.includes(t));
  });
}

export function collectTagVocabulary(
  clips: LibraryClipRow[],
  getTagsForPath: (path: string) => string[],
): string[] {
  const seen = new Map<string, string>();
  for (const c of clips) {
    for (const t of getTagsForPath(c.path)) {
      const k = t.toLowerCase();
      if (!seen.has(k)) seen.set(k, t);
    }
  }
  return [...seen.values()].toSorted((a, b) => a.localeCompare(b));
}