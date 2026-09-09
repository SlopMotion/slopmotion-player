import type { Preset, Scene, StudioSceneProgression } from "../types/settings";
import { clipPathsEquivalent } from "../utils/videoUtils";
import {
  buildPimentBresilienPreset,
  buildPimentBresilienScene,
  montreuil26FxPresetId,
  PIMENT_BRESILIEN_BPM,
  PIMENT_BRESILIEN_CLIPS,
  PIMENT_BRESILIEN_TITLE,
  PIMENT_BRESILIEN_TRACK,
} from "./montreuil26SceneCatalog";
import { PARVAGUES_SAMPLE_BUNDLE } from "./parVaguesSampleBundle";

/** Shipped demo — Piment brésilien only. */
export const MONTREUIL26_TRACKS = [
  { track: PIMENT_BRESILIEN_TRACK, title: PIMENT_BRESILIEN_TITLE, bpm: PIMENT_BRESILIEN_BPM },
] as const;

export function montreuil26SceneId(trackNumber: number): string {
  return `montreuil26-track-${String(trackNumber).padStart(2, "0")}`;
}

export { montreuil26FxPresetId };

let cachedMontreuil26FxPresets: Preset[] | null = null;
let cachedMontreuil26Scenes: Scene[] | null = null;

/** Call after selecta clip catalog loads so track playlists pick up catalog paths. */
export function invalidateMontreuil26Caches(): void {
  cachedMontreuil26FxPresets = null;
  cachedMontreuil26Scenes = null;
}

export function getMontreuil26FxPresets(): Preset[] {
  if (!cachedMontreuil26FxPresets) {
    cachedMontreuil26FxPresets = [
      buildPimentBresilienPreset(montreuil26SceneId(PIMENT_BRESILIEN_TRACK)),
    ];
  }
  return cachedMontreuil26FxPresets;
}

export function getMontreuil26Scenes(): Scene[] {
  if (!cachedMontreuil26Scenes) {
    cachedMontreuil26Scenes = [buildPimentBresilienScene(montreuil26SceneId(PIMENT_BRESILIEN_TRACK))];
  }
  return cachedMontreuil26Scenes;
}

/** Restore demo playlists when saved paths drift from the shipped clip list. */
export function repairMontreuil26SceneVideoPaths(scenes: Scene[]): Scene[] {
  let changed = false;
  const fresh = [...PIMENT_BRESILIEN_CLIPS];
  const next = scenes.map((sc) => {
    const match = /^montreuil26-track-(\d{2})$/.exec(sc.id);
    if (!match) return sc;
    const track = Number(match[1]);
    if (track !== PIMENT_BRESILIEN_TRACK) return sc;
    if (fresh.length === 0) return sc;
    const pathsOk =
      sc.videoPaths.length === fresh.length &&
      fresh.every((path) =>
        sc.videoPaths.some((saved) => typeof saved === "string" && clipPathsEquivalent(saved, path)),
      );
    if (pathsOk) return sc;
    changed = true;
    return {
      ...sc,
      playsetFolder: sc.playsetFolder?.trim() || "parvagues",
      videoPaths: [...fresh],
    };
  });
  return changed ? next : scenes;
}

export function montreuil26TrackMap(): Record<number, string | null> {
  const map: Record<number, string | null> = {};
  for (const tr of MONTREUIL26_TRACKS) {
    map[tr.track] = montreuil26SceneId(tr.track);
  }
  return map;
}

/** Default Studio progression: Piment scene on first load. */
export const MONTREUIL26_DEFAULT_STUDIO_PROGRESSION: StudioSceneProgression = {
  bundleKey: PARVAGUES_SAMPLE_BUNDLE.setName,
  mode: "tracks",
  trackMap: montreuil26TrackMap(),
  patternId: null,
};
