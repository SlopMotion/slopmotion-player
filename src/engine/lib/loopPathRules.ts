import playsetMeta from "../data/playsetPacks.json";
import videoLibrary from "../data/videoLibrary.json";

export const LOOP_PATH_PREFIX = "/loops/";

/** Legacy folder names → canonical playset folder (catalog source of truth). */
export const FOLDER_ALIASES: Readonly<Record<string, string>> = {
  may: "point-cloud",
  "point-waves": "point-cloud",
  "pointcloud-waves-demo": "point-cloud",
  "VEO-incoming": "white-hole",
};

/** Archive filenames promoted back into white-hole (Veo / April cohort). */
export const ARCHIVE_TO_WHITE_HOLE_FILE_MATCHERS: ReadonlyArray<(base: string) => boolean> = [
  (base) => /^VEO-/i.test(base) || /^veo_/i.test(base),
  (base) => /april/i.test(base),
  (base) => /^000_White-Hole/i.test(base) || /^000_white_hole/i.test(base),
];

/** Folders that stay live even when absent from exported catalog JSON. */
export const LEGACY_ACTIVE_FOLDER_MATCHERS: ReadonlyArray<(folder: string) => boolean> = [
  (folder) => folder.startsWith("VEO-"),
  (folder) => folder.startsWith("pointcloud-"),
  (folder) => folder.toLowerCase().includes("pointcloud"),
  (folder) => folder.startsWith("WhiteHole"),
  (folder) => folder.startsWith("bw-"),
  (folder) => folder.startsWith("PC-"),
  (folder) => folder.startsWith("00_"),
];

/** Path prefix rewrites for merged playsets, frame dirs, and archive aliases. */
export const PATH_PREFIX_REWRITES: ReadonlyArray<readonly [RegExp, string]> = [
  [/^\/loops\/may\//, "/loops/point-cloud/"],
  [/^\/loops\/pointcloud-waves-demo\//, "/loops/point-cloud/"],
  [/^\/loops\/point-waves\//, "/loops/point-cloud/"],
  [/^\/loops\/may-frames\//, "/loops/point-cloud/"],
  [/^\/loops\/pointcloud-waves-demo-frames\//, "/loops/point-cloud/"],
  [/^\/loops\/point-waves-frames\//, "/loops/point-cloud/"],
  [/^\/loops\/white-hole-frames\//, "/loops/white-hole/"],
  [/^\/loops\/WhiteHole2-frames\//, "/loops/white-hole/"],
  [/^\/loops\/WhiteHole3-frames\//, "/loops/white-hole/"],
  [/^\/loops\/VEO-April-frames\//, "/loops/white-hole/"],
  [/^\/loops\/VEO-April2-frames\//, "/loops/white-hole/"],
  [/^\/loops\/VEO-OceanLoops-frames\//, "/loops/white-hole/"],
  [/^\/loops\/VEO-Tignes-frames\//, "/loops/white-hole/"],
  [/^\/loops\/PC-WaterPointcloud-BW-frames\//, "/loops/point-cloud/"],
  [/^\/loops\/bw-pointcloud-water-frames\//, "/loops/point-cloud/"],
  [/^\/loops\/bw-pulse-water-frames\//, "/loops/point-cloud/"],
  [/^\/loops\/parvagues-frames\//, "/loops/parvagues/"],
  [/^\/loops\/archive\/(\d{2}-[^/]+-frames)\//, "/loops/point-cloud/"],
  [/^\/loops\/(\d{2}-[^/]+-frames)\//, "/loops/point-cloud/"],
  [/^\/loops\/archive\/may__/, "/loops/point-cloud/"],
  [/^\/loops\/archive\/pointcloud-waves-demo__/, "/loops/point-cloud/"],
];

function collectActivePlaysetFolders(): ReadonlySet<string> {
  const folders = new Set<string>();
  for (const pack of playsetMeta as { folder: string }[]) {
    if (pack.folder) folders.add(pack.folder);
  }
  for (const entry of videoLibrary as { folder: string }[]) {
    if (entry.folder) folders.add(entry.folder);
  }
  for (const target of Object.values(FOLDER_ALIASES)) {
    folders.add(target);
  }
  return folders;
}

/** All shipped / catalog playset folders — derived from JSON, not hand-maintained. */
export const ACTIVE_PLAYSET_FOLDERS = collectActivePlaysetFolders();

export function isActivePlaysetFolder(folder: string): boolean {
  if (!folder || folder === "archive" || folder.endsWith("-frames")) return false;
  if (FOLDER_ALIASES[folder]) return true;
  if (ACTIVE_PLAYSET_FOLDERS.has(folder)) return true;
  return LEGACY_ACTIVE_FOLDER_MATCHERS.some((match) => match(folder));
}

export function shouldConsolidateFolderToArchive(folder: string): boolean {
  return !isActivePlaysetFolder(folder);
}

/** Legacy rating / state keys for merged playsets (point-cloud ← may, point-waves, …). */
export function legacyMergedPlaysetRatingPaths(canonPath: string): string[] {
  if (!canonPath.startsWith("/loops/point-cloud/")) return [];
  const base = canonPath.slice("/loops/point-cloud/".length);
  const paths: string[] = [];
  for (const [legacy, target] of Object.entries(FOLDER_ALIASES)) {
    if (target !== "point-cloud") continue;
    paths.push(`/loops/${legacy}/${base}`);
    paths.push(`/loops/archive/${legacy}__${base}`);
  }
  return paths;
}
