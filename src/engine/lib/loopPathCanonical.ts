import loopPathMigrations from "../data/loopPathMigrations.json";
import {
  ARCHIVE_TO_WHITE_HOLE_FILE_MATCHERS,
  FOLDER_ALIASES,
  isActivePlaysetFolder,
  LOOP_PATH_PREFIX,
  PATH_PREFIX_REWRITES,
  shouldConsolidateFolderToArchive,
} from "./loopPathRules";

function applyPathPrefixRewrites(path: string): string {
  let out = path;
  for (const [pattern, replacement] of PATH_PREFIX_REWRITES) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

export function playsetFolderFromLoopPath(path: string): string | null {
  if (!path.startsWith(LOOP_PATH_PREFIX)) return null;
  const rest = path.slice(LOOP_PATH_PREFIX.length);
  const slash = rest.indexOf("/");
  if (slash <= 0) return null;
  return rest.slice(0, slash);
}

/** If loops were consolidated into `archive` with `folderSlug__file.mp4`, rewrite legacy paths. */
export function remapConsolidatedArchiveLoopPath(path: string): string {
  if (typeof path !== "string" || !path.startsWith(LOOP_PATH_PREFIX)) return path;
  if (path.startsWith("/loops/archive/")) return path;

  const folder = playsetFolderFromLoopPath(path);
  const file = folder ? path.slice(`${LOOP_PATH_PREFIX}${folder}/`.length) : "";
  if (!folder || !file) return path;
  if (!shouldConsolidateFolderToArchive(folder)) return path;

  const slug = folder.replace(/[^\w.-]+/g, "_");
  return `${LOOP_PATH_PREFIX}archive/${slug}__${file}`;
}

/** Merged playsets and frame-dir aliases → canonical folders. */
export function remapPointWavesPlaysetPath(path: string): string {
  if (typeof path !== "string") return path;
  return applyPathPrefixRewrites(path);
}

/** Legacy Veo bucket `VEO-incoming` → `white-hole`. */
export function remapVeoIncomingToWhiteHolePath(path: string): string {
  if (typeof path !== "string") return path;
  const folder = playsetFolderFromLoopPath(path);
  if (folder && FOLDER_ALIASES[folder]) {
    return path.replace(
      new RegExp(`^${LOOP_PATH_PREFIX}${folder.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/`),
      `${LOOP_PATH_PREFIX}${FOLDER_ALIASES[folder]}/`,
    );
  }
  return path;
}

/** Curated cohort: `archive` paths for Veo/April/000_White-Hole → `white-hole`. */
export function remapArchiveCohortToWhiteHolePath(path: string): string {
  if (typeof path !== "string" || !path.startsWith("/loops/archive/")) return path;
  const base = path.slice("/loops/archive/".length);
  if (ARCHIVE_TO_WHITE_HOLE_FILE_MATCHERS.some((match) => match(base))) {
    return `/loops/white-hole/${base}`;
  }
  return path;
}

/** Undo `archive/<activeFolder>__file` paths for catalog playsets still on disk. */
export function restoreMisarchivedActivePlaysetPath(path: string): string {
  if (typeof path !== "string" || !path.startsWith("/loops/archive/")) return path;
  const rest = path.slice("/loops/archive/".length);
  const sep = rest.indexOf("__");
  if (sep <= 0) return path;
  const folderKey = rest.slice(0, sep);
  const file = rest.slice(sep + 2);
  if (isActivePlaysetFolder(folderKey)) {
    return `${LOOP_PATH_PREFIX}${folderKey}/${file}`;
  }
  return path;
}

/** Normalize any legacy or archive path to the canonical `/loops/...` URL used in `videoLibrary.json`. */
export function remapLoopVideoPath(path: string): string {
  const migrated =
    typeof path === "string" && path in loopPathMigrations
      ? (loopPathMigrations as Record<string, string>)[path]
      : path;
  const restored = restoreMisarchivedActivePlaysetPath(migrated);
  return remapPointWavesPlaysetPath(
    remapConsolidatedArchiveLoopPath(
      remapArchiveCohortToWhiteHolePath(
        remapVeoIncomingToWhiteHolePath(remapPointWavesPlaysetPath(restored)),
      ),
    ),
  );
}

export function canonicalLoopPath(path: string): string {
  return remapLoopVideoPath(path);
}
