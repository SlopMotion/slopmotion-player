import type { VideoLibrary } from "../types/videoLibrary";
import { getCollab } from "../data/fxCollabs";
import { STARTER_PLAYSET_SLUG, playsetFolderForPackSlug } from "../data/playsetPacks";

const ARCHIVE_PLAYSET = "archive";

export function collabPlaysetFolders(claimedCollabIds: readonly string[]): Set<string> {
  const folders = new Set<string>();
  for (const id of claimedCollabIds) {
    const folder = getCollab(id)?.playsetFolder;
    if (folder) folders.add(folder);
  }
  return folders;
}

export function ownedPlaysetFoldersFromSlugs(
  slugs: readonly string[],
  claimedCollabIds: readonly string[] = [],
): Set<string> {
  const folders = new Set<string>();
  for (const slug of slugs) {
    const folder = playsetFolderForPackSlug(slug);
    if (folder) folders.add(folder);
  }
  for (const folder of collabPlaysetFolders(claimedCollabIds)) {
    folders.add(folder);
  }
  if (folders.size === 0) {
    folders.add(playsetFolderForPackSlug(STARTER_PLAYSET_SLUG) ?? STARTER_PLAYSET_SLUG);
  }
  return folders;
}

export function filterVideoLibraryByOwnedPlaysets(
  videoLibrary: VideoLibrary,
  ownedSlugs: readonly string[],
  claimedCollabIds: readonly string[] = [],
): VideoLibrary {
  const ownedFolders = ownedPlaysetFoldersFromSlugs(ownedSlugs, claimedCollabIds);
  return videoLibrary.filter(
    (entry) => entry.folder === ARCHIVE_PLAYSET || ownedFolders.has(entry.folder),
  );
}

export function isPlaysetFolderEntitled(
  folder: string,
  ownedSlugs: readonly string[],
  claimedCollabIds: readonly string[] = [],
): boolean {
  if (folder === ARCHIVE_PLAYSET) return true;
  return ownedPlaysetFoldersFromSlugs(ownedSlugs, claimedCollabIds).has(folder);
}

export function filterGuestVideoLibrary(videoLibrary: VideoLibrary): VideoLibrary {
  return filterVideoLibraryByOwnedPlaysets(videoLibrary, [STARTER_PLAYSET_SLUG]).filter(
    (entry) => entry.folder !== "archive",
  );
}

export function pickGuestActiveFolder(
  activeFolder: string,
  videoLibrary: VideoLibrary,
): string {
  return pickEntitledActiveFolder(activeFolder, [STARTER_PLAYSET_SLUG], videoLibrary);
}

export function pickEntitledActiveFolder(
  activeFolder: string,
  ownedSlugs: readonly string[],
  videoLibrary: VideoLibrary,
  claimedCollabIds: readonly string[] = [],
): string {
  if (isPlaysetFolderEntitled(activeFolder, ownedSlugs, claimedCollabIds)) return activeFolder;
  const filtered = filterVideoLibraryByOwnedPlaysets(videoLibrary, ownedSlugs, claimedCollabIds);
  const starter = playsetFolderForPackSlug(STARTER_PLAYSET_SLUG) ?? STARTER_PLAYSET_SLUG;
  if (filtered.some((f) => f.folder === starter)) return starter;
  return filtered[0]?.folder ?? activeFolder;
}

/** Default playset for fresh blank projects and first-time sessions. */
export function starterPlaysetFromLibrary(videoLibrary: VideoLibrary): {
  folder: string;
  video: string;
} {
  const folder = playsetFolderForPackSlug(STARTER_PLAYSET_SLUG) ?? STARTER_PLAYSET_SLUG;
  const entry = videoLibrary.find((e) => e.folder === folder);
  if (entry?.videos?.[0]?.path) {
    return { folder, video: entry.videos[0].path };
  }
  return {
    folder: videoLibrary[0]?.folder || "default",
    video: videoLibrary[0]?.videos?.[0]?.path || "",
  };
}
