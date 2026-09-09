import { manualNextClipPath } from "./playsetLibraryHelpers";
import {
  clipPathsEquivalent,
  getNextPrevInOrderedPaths,
  resolveClipPathInPlaysetList,
} from "./videoUtils";

export type ClipPeekDeps = {
  filteredLibrary: { path: string }[];
  currentVideo: string | undefined;
  applyVideo: (path: string) => void;
  sceneVideoPaths?: string[];
};

export function resolveUpcomingClipPaths(deps: ClipPeekDeps, count: number): string[] {
  const want = Math.max(1, Math.round(count));
  const out: string[] = [];
  const origin = typeof deps.currentVideo === "string" ? deps.currentVideo : "";
  let cur = origin;

  const scenePaths = deps.sceneVideoPaths?.filter(
    (p): p is string => typeof p === "string" && p.length > 0,
  );

  for (let i = 0; i < want; i++) {
    let next: string | null = null;
    if (scenePaths && scenePaths.length > 0) {
      const hop = getNextPrevInOrderedPaths(cur, scenePaths).next;
      next = hop && !clipPathsEquivalent(hop, cur) ? hop : null;
    } else {
      const canonical =
        resolveClipPathInPlaysetList(deps.filteredLibrary, cur) ??
        (cur.length > 0 ? cur : "");
      next = manualNextClipPath(deps.filteredLibrary, canonical, 1);
    }
    if (!next || clipPathsEquivalent(next, origin)) break;
    out.push(next);
    cur = next;
  }

  return out;
}

export function resolveClipPeekTargetPath(deps: ClipPeekDeps, steps: number): string | null {
  const paths = resolveUpcomingClipPaths(deps, steps);
  if (paths.length === 0) return null;
  return paths[paths.length - 1] ?? null;
}
