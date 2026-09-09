import type { Scene } from "../types/settings";
import type { VideoLibrary } from "../types/videoLibrary";
import { clipPathsEquivalent, resolveClipPathInPlaysetList, SELECTA_FOLDER, UNRATED_FOLDER } from "./videoUtils";

function libraryPathSet(videoLibrary: VideoLibrary): Set<string> {
  const out = new Set<string>();
  for (const folder of videoLibrary) {
    for (const vid of folder.videos ?? []) {
      const p = typeof vid?.path === "string" ? vid.path : "";
      if (p) out.add(p);
    }
  }
  return out;
}

function pathKnownInLibrary(path: string, known: Set<string>, videoLibrary: VideoLibrary): string | null {
  for (const p of known) {
    if (clipPathsEquivalent(p, path)) return p;
  }
  for (const folder of videoLibrary) {
    const hit = resolveClipPathInPlaysetList(folder.videos ?? [], path);
    if (hit) return hit;
  }
  return null;
}

function parseAutoLoopIndex1(path: string): number | null {
  const m = path.match(/__(\d+)\.mp4$/i);
  if (!m) return null;
  const n = parseInt(m[1]!, 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function playsetFolderForStalePath(scene: Scene, stalePath: string): string {
  const fromPath = stalePath.match(/^\/loops\/([^/]+)\//)?.[1];
  if (
    fromPath &&
    fromPath !== SELECTA_FOLDER &&
    fromPath !== UNRATED_FOLDER &&
    fromPath !== "archive"
  ) {
    return fromPath;
  }
  if (scene.playsetFolder !== SELECTA_FOLDER && scene.playsetFolder !== UNRATED_FOLDER) {
    return scene.playsetFolder;
  }
  return fromPath ?? scene.playsetFolder;
}

function substituteFromPlayset(
  playsetFolder: string,
  indexInScene: number,
  videoLibrary: VideoLibrary,
): string | null {
  const playset = videoLibrary.find((f) => f.folder === playsetFolder);
  const videos = playset?.videos ?? [];
  if (videos.length === 0) return null;
  return videos[Math.min(indexInScene, videos.length - 1)]?.path ?? null;
}

/** Rewrite stale scene clip paths after batch renames (`perfect_loop_*` → branded stems). */
export function reconcileSceneVideoPathsAgainstLibrary(
  scenes: Scene[],
  videoLibrary: VideoLibrary,
): Scene[] {
  if (!Array.isArray(scenes) || scenes.length === 0 || videoLibrary.length === 0) return scenes;

  const known = libraryPathSet(videoLibrary);

  return scenes.map((scene) => {
    if (/^montreuil26-track-\d{2}$/.test(scene.id)) return scene;
    const rawPaths = Array.isArray(scene.videoPaths)
      ? scene.videoPaths.filter((p): p is string => typeof p === "string" && p.length > 0)
      : [];
    if (rawPaths.length === 0) return scene;

    const resolved: string[] = [];
    for (let i = 0; i < rawPaths.length; i++) {
      const stale = rawPaths[i]!;
      const hit = pathKnownInLibrary(stale, known, videoLibrary);
      if (hit) {
        if (!resolved.some((p) => clipPathsEquivalent(p, hit))) resolved.push(hit);
        continue;
      }

      const autoIdx = parseAutoLoopIndex1(stale);
      const sourceFolder = playsetFolderForStalePath(scene, stale);
      const playset = videoLibrary.find((f) => f.folder === sourceFolder);
      const playsetVideos = playset?.videos ?? [];
      const byAutoIdx =
        autoIdx != null && playsetVideos[autoIdx - 1]?.path ? playsetVideos[autoIdx - 1]!.path : null;
      const substitute = byAutoIdx ?? substituteFromPlayset(sourceFolder, i, videoLibrary);
      if (substitute && !resolved.some((p) => clipPathsEquivalent(p, substitute))) {
        resolved.push(substitute);
      }
    }

    if (resolved.length === 0) {
      const sourceFolder = playsetFolderForStalePath(scene, rawPaths[0] ?? "");
      const fallback = (videoLibrary.find((f) => f.folder === sourceFolder)?.videos ?? [])
        .slice(0, 3)
        .map((v) => v.path)
        .filter((p): p is string => typeof p === "string" && p.length > 0);
      if (fallback.length === 0) return scene;
      return { ...scene, videoPaths: fallback };
    }

    const unchanged =
      resolved.length === rawPaths.length &&
      resolved.every((p, idx) => clipPathsEquivalent(p, rawPaths[idx]!));
    return unchanged ? scene : { ...scene, videoPaths: resolved };
  });
}
