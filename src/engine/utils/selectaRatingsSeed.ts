import type { VideoLibrary } from "../types/videoLibrary";
import { getSelectaClipRows } from "../data/selectaClipCatalog";

export const SELECTA_RATINGS_SEED_VERSION = 1;

/** Shipped 5★ selecta baseline — merged into `videoRatings` when clips exist in the current library. */
export function seedSelectaRatingsFromCatalog(
  ratings: Record<string, number> | undefined,
  videoLibrary: VideoLibrary | undefined,
): Record<string, number> {
  const base = ratings ?? {};
  if (!Array.isArray(videoLibrary) || videoLibrary.length === 0) return base;

  const libPaths = new Set(
    videoLibrary.flatMap((lib) =>
      (lib.videos ?? [])
        .map((v) => (typeof v.path === "string" ? v.path : ""))
        .filter((p) => p.startsWith("/loops/")),
    ),
  );
  if (libPaths.size === 0) return base;

  const clips = getSelectaClipRows();
  if (clips.length === 0) return base;

  let changed = false;
  const next = { ...base };
  for (const row of clips) {
    const path = row?.path;
    if (typeof path !== "string" || !path.startsWith("/loops/")) continue;
    if (!libPaths.has(path)) continue;
    const prev = next[path] ?? 0;
    if (prev >= 5) continue;
    next[path] = 5;
    changed = true;
  }

  return changed ? next : base;
}
