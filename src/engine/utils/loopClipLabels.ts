import { clipPathsEquivalent } from "./videoUtils";

/** Short id from `perfect_loop_<epoch>` (or fallback from basename). */
export function shortLoopHash(videoPath: string): string {
  const base = videoPath.split("/").pop() ?? videoPath;
  const m =
    base.match(/perfect_loop_(\d+)\.mp4$/i) ?? base.match(/(\d{13})\.mp4$/i);
  if (m) {
    const n = BigInt(m[1]!);
    const h = n.toString(36).slice(-4);
    return h.length >= 4 ? h : h.padStart(4, "0");
  }
  let acc = 0;
  for (let i = 0; i < base.length; i++) {
    acc = (Math.imul(acc, 31) + base.charCodeAt(i)) | 0;
  }
  return (Math.abs(acc) >>> 0).toString(36).slice(0, 4).padStart(4, "0");
}

/** Filesystem stem: `playset+hash__index` (slash in labels becomes `__` on disk). */
export function autoLoopStem(playset: string, videoPath: string, index1: number): string {
  const lib =
    playset
      .split("/")
      .filter(Boolean)
      .pop() ?? playset;
  const idx = Math.max(1, Math.floor(index1));
  return `${lib}+${shortLoopHash(videoPath)}__${idx}`;
}

export function autoLoopMp4FileName(playset: string, videoPath: string, index1: number): string {
  return `${autoLoopStem(playset, videoPath, index1)}.mp4`;
}
/** Incoming clip is newest in destination after move (library sorts by mtime). */
export function indexForIncomingClip(_targetPlayset: string, _videoPath: string): number {
  return 1;
}

/** `playset+abc1/12` — no `.mp4`. */
export function formatLoopClipLabel(playset: string, videoPath: string, index1: number): string {
  const lib =
    playset
      .split("/")
      .filter(Boolean)
      .pop() ?? playset;
  const idx = Math.max(1, Math.floor(index1));
  return `${lib}+${shortLoopHash(videoPath)}/${idx}`;
}

export function stripLoopFileExtension(name: string): string {
  return name.replace(/\.mp4$/i, "");
}
export function buildClipIndexByPath<T extends { path?: string }>(
  videos: T[],
): Map<string, number> {
  const map = new Map<string, number>();
  videos.forEach((v, i) => {
    const p = v?.path;
    if (typeof p === "string" && p) map.set(p, i + 1);
  });
  return map;
}

export function resolveClipIndexInList(
  path: string,
  videos: { path?: string }[],
  indexByPath?: Map<string, number>,
): number {
  const map = indexByPath ?? buildClipIndexByPath(videos);
  const direct = map.get(path);
  if (direct != null) return direct;
  for (const [p, idx] of map) {
    if (clipPathsEquivalent(p, path)) return idx;
  }
  return 0;
}

export type ClipLabelRow = {
  path: string;
  name?: string;
  sourceFolder?: string;
};

export type ClipLabelContext = {
  activeFolder?: string;
  selectaFolder?: string;
  unratedFolder?: string;
  /** Pre-built path → index map to avoid O(n²) rebuilds in large libraries. */
  indexByPath?: Map<string, number>;
};

export function resolveLoopClipDisplayLabel(
  vid: ClipLabelRow,
  playset: string,
  index1: number,
  options?: ClipLabelContext,
): string {
  const { activeFolder, selectaFolder, unratedFolder } = options ?? {};
  const useSource =
    activeFolder &&
    selectaFolder &&
    unratedFolder &&
    (activeFolder === selectaFolder || activeFolder === unratedFolder) &&
    vid.sourceFolder;
  const lib = useSource ? vid.sourceFolder! : playset;
  const idx = index1 > 0 ? index1 : 1;
  return formatLoopClipLabel(lib, vid.path, idx);
}

export function labelForClipInPlaysetList(
  vid: ClipLabelRow,
  playset: string,
  orderedClips: ClipLabelRow[],
  options?: ClipLabelContext,
): string {
  const idx = resolveClipIndexInList(vid.path, orderedClips, options?.indexByPath);
  return resolveLoopClipDisplayLabel(vid, playset, idx, options);
}
