import type { FolderConfig, Scene } from "../types/settings";
import type { VideoLibrary } from "../types/videoLibrary";
import { labelForClipInPlaysetList, type ClipLabelRow } from "./loopClipLabels";
import { resolveLayerBlendClipPath } from "./layerBlendSource";
import { resolvePlaybackCueClipPath } from "./playbackCueSource";
import { getPlaybackCueDisplaySlot } from "./playbackCue";
import {
  clipPathsEquivalent,
  getNextPrevInOrderedPaths,
  getNextPrevVideos,
  resolveClipPathInPlaysetList,
  sceneHasPlaylist,
  scenePlaylistActiveForBrowse,
  SELECTA_FOLDER,
  UNRATED_FOLDER,
  isArchiveLoopPath,
} from "./videoUtils";
import { remapLoopVideoPath } from "../lib/loopPathCanonical";

export type PlaysetTransportMode = "shelf" | "scene" | "detached";

export type PlaysetTransportSummary = {
  mode: PlaysetTransportMode;
  primaryLabel: string;
  secondaryLabel: string;
  railLabel: string;
  railSummary: string;
  panelClipLabel: string;
  scenePlaysetLabel: string | null;
};

export function playsetSetLabel(activeFolder: string): string {
  if (activeFolder === SELECTA_FOLDER) return "selecta";
  if (activeFolder === UNRATED_FOLDER) return "unrated";
  const parts = activeFolder.split("/").filter(Boolean);
  return parts.length ? parts[parts.length - 1]! : activeFolder;
}

export function playsetTransportSummary(
  activeFolder: string,
  currentVideo: string | undefined,
  filteredLibrary: { path: string }[],
  activeScene: Scene | null,
): PlaysetTransportSummary {
  const playset = playsetSetLabel(activeFolder);
  const shelfIndex = playsetClipIndexLabel(currentVideo, filteredLibrary, null, activeFolder);

  if (!activeScene) {
    return {
      mode: "shelf",
      primaryLabel: playset,
      secondaryLabel: `${shelfIndex} shelf`,
      railLabel: playset,
      railSummary: shelfIndex,
      panelClipLabel: `${shelfIndex} · shelf`,
      scenePlaysetLabel: null,
    };
  }

  const sceneName = activeScene.name.trim() || "Scene";
  const scenePlayset = activeScene.playsetFolder?.trim() ?? "";
  const scenePlaysetLabel = scenePlayset ? playsetSetLabel(scenePlayset) : null;
  const sceneIndex = playsetClipIndexLabel(
    currentVideo,
    filteredLibrary,
    activeScene,
    activeFolder,
  );
  const browseMatchesScene = scenePlaylistActiveForBrowse(activeScene, activeFolder);

  if (browseMatchesScene) {
    return {
      mode: "scene",
      primaryLabel: sceneName,
      secondaryLabel: `${sceneIndex} scene`,
      railLabel: sceneName,
      railSummary: sceneIndex,
      panelClipLabel: `${sceneIndex} · scene`,
      scenePlaysetLabel,
    };
  }

  return {
    mode: "detached",
    primaryLabel: sceneName,
    secondaryLabel: `${shelfIndex} shelf`,
    railLabel: sceneName,
    railSummary: shelfIndex,
    panelClipLabel: `${shelfIndex} · shelf`,
    scenePlaysetLabel,
  };
}

export function playsetClipIndexLabel(
  currentVideo: string | undefined,
  filteredLibrary: { path: string }[],
  activeScene: Scene | null,
  browseFolder: string,
): string {
  const cur = currentVideo;
  if (
    activeScene &&
    sceneHasPlaylist(activeScene) &&
    scenePlaylistActiveForBrowse(activeScene, browseFolder)
  ) {
    const paths = activeScene.videoPaths;
    const n = paths.length;
    if (!cur) return n ? `—/${n}` : "—/—";
    const idx = paths.findIndex((p) => clipPathsEquivalent(p, cur));
    return `${idx >= 0 ? idx + 1 : "—"}/${n}`;
  }
  const n = filteredLibrary.length;
  if (!cur) return n ? `—/${n}` : "—/—";
  const canon = resolveClipPathInPlaysetList(filteredLibrary, cur);
  const idx = canon ? filteredLibrary.findIndex((v) => v.path === canon) : -1;
  return `${idx >= 0 ? idx + 1 : "—"}/${n}`;
}

export function activeClipDisplayLabel(
  videoPath: string | undefined,
  filteredLibrary: ClipLabelRow[],
  activeFolder: string,
  setLabel: string,
): string {
  const p = videoPath;
  if (!p) return "";
  const row = filteredLibrary.find((v) =>
    typeof v?.path === "string" ? clipPathsEquivalent(v.path, p) : false,
  );
  return labelForClipInPlaysetList(
    { path: p, sourceFolder: row?.sourceFolder },
    setLabel,
    filteredLibrary,
    {
      activeFolder,
      selectaFolder: SELECTA_FOLDER,
      unratedFolder: UNRATED_FOLDER,
    },
  );
}

export function resolveVideoNavigationTarget(
  direction: 1 | -1,
  browseFolder: string,
  currentVideo: string | undefined,
  videoLibrary: VideoLibrary,
  videoRatings: Record<string, number>,
  sortMode: "library" | "rating",
  activeScene: Scene | null | undefined,
): { target: string | null; keepSceneLink: boolean } {
  const cur = typeof currentVideo === "string" ? remapLoopVideoPath(currentVideo) : "";
  const scenePaths = (activeScene?.videoPaths ?? [])
    .filter((p): p is string => typeof p === "string" && p.length > 0)
    .map((p) => remapLoopVideoPath(p));

  if (
    activeScene &&
    sceneHasPlaylist(activeScene) &&
    scenePlaylistActiveForBrowse(activeScene, browseFolder)
  ) {
    const { next, prev } = getNextPrevInOrderedPaths(cur, scenePaths);
    return {
      target: direction === 1 ? next : prev,
      keepSceneLink: true,
    };
  }

  const { next, prev } = getNextPrevVideos(
    browseFolder,
    { video: currentVideo ?? "" },
    videoLibrary,
    videoRatings,
    sortMode,
  );
  return {
    target: direction === 1 ? next : prev,
    keepSceneLink: Boolean(activeScene),
  };
}

export function manualNextClipPath(
  filteredLibrary: { path: string }[],
  activeVideo: string | undefined,
  direction: 1 | -1 = 1,
): string | null {
  if (filteredLibrary.length === 0) return null;
  const cur = typeof activeVideo === "string" ? activeVideo : "";
  const idx = filteredLibrary.findIndex((v) => clipPathsEquivalent(v.path, cur));
  const base = idx >= 0 ? idx : 0;
  const nextIdx = (base + direction + filteredLibrary.length) % filteredLibrary.length;
  const next = filteredLibrary[nextIdx]?.path;
  if (!next || clipPathsEquivalent(next, cur)) return null;
  return next;
}

const SECONDARY_VIDEO_FX_KEYS = [
  "playbackCue",
  "layerBlend",
  "videoMap",
  "shatterLayer",
] as const satisfies ReadonlyArray<keyof FolderConfig["fx"]>;

export type SecondaryVideoFxKey = (typeof SECONDARY_VIDEO_FX_KEYS)[number];

export function resolveSecondaryVideoFxEntry(
  fx: FolderConfig["fx"] | undefined,
): { key: SecondaryVideoFxKey; config: FolderConfig["fx"][SecondaryVideoFxKey] } | null {
  if (!fx) return null;
  for (const key of SECONDARY_VIDEO_FX_KEYS) {
    const row = fx[key];
    if (key === "shatterLayer" && Math.round(Number(row?.params?.mode) || 0) < 1) continue;
    if (row?.enabled) return { key, config: row };
  }
  return null;
}

export function resolveSecondaryVideoFx(
  fx: FolderConfig["fx"] | undefined,
): FolderConfig["fx"][SecondaryVideoFxKey] | null {
  return resolveSecondaryVideoFxEntry(fx)?.config ?? null;
}

export function secondaryBlendVideoPath(
  filteredLibrary: { path: string }[],
  activeVideo: string | undefined,
  secondaryFx: FolderConfig["fx"][SecondaryVideoFxKey] | null,
  secondaryKey?: SecondaryVideoFxKey | null,
): string | undefined {
  if (!secondaryFx?.enabled || filteredLibrary.length === 0) return undefined;
  if (secondaryKey === "playbackCue") {
    return (
      resolvePlaybackCueClipPath(
        filteredLibrary,
        secondaryFx.params,
        getPlaybackCueDisplaySlot(),
      ) ?? undefined
    );
  }
  return resolveLayerBlendClipPath(filteredLibrary, activeVideo, secondaryFx.params);
}

export function isArchiveRatingLocked(videoPath: string | undefined): boolean {
  return Boolean(videoPath) && isArchiveLoopPath(videoPath!);
}
