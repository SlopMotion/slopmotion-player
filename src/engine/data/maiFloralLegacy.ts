import type { Scene, SceneTrackerPattern } from "../types/settings";

/**
 * Mai Floral scene + tracker metadata kept out of `maiFloralSet.ts` so state
 * migration does not pull the heavy FX preset graph into the main bundle.
 */
export const MAI_FLORAL_SCENES: Scene[] = [
  {
    id: "mai-floral-i",
    name: "I · Deco",
    playsetFolder: "parvagues",
    fxPresetId: "mai-floral-fx-i",
    bpm: 122,
    videoPaths: [
      "/loops/parvagues/ParVagues__0lcg__21.mp4",
      "/loops/parvagues/ParVagues__1y6b__20.mp4",
      "/loops/parvagues/ParVagues__3sz6__19.mp4",
    ],
  },
  {
    id: "mai-floral-ii",
    name: "II · Sunny",
    playsetFolder: "white-hole",
    fxPresetId: "mai-floral-fx-ii",
    bpm: 131,
    videoPaths: [
      "/loops/white-hole/WhiteHole__1xy8__287.mp4",
      "/loops/white-hole/WhiteHole__a47l__290.mp4",
      "/loops/white-hole/WhiteHole__db4q__286.mp4",
    ],
  },
  {
    id: "mai-floral-iii",
    name: "III · Peak",
    playsetFolder: "point-cloud",
    fxPresetId: "mai-floral-fx-iii",
    bpm: 165,
    videoPaths: [
      "/loops/point-cloud/PointCloud__6jt5__95.mp4",
      "/loops/point-cloud/PointCloud__8eq1__94.mp4",
      "/loops/point-cloud/PointCloud__aq5q__93.mp4",
    ],
  },
  {
    id: "mai-floral-iv",
    name: "IV · Orage",
    playsetFolder: "white-hole",
    fxPresetId: "mai-floral-fx-iv",
    bpm: 108,
    videoPaths: [
      "/loops/white-hole/WhiteHole__0dzu__20.mp4",
      "/loops/white-hole/WhiteHole__03i7__79.mp4",
      "/loops/white-hole/WhiteHole__01ef__143.mp4",
    ],
  },
];

export const MAI_FLORAL_SCENE_TRACKER: SceneTrackerPattern = {
  id: "tracker-mai-floral",
  name: "Mai Floral",
  beatsPerStep: 8,
  steps: ["mai-floral-i", "mai-floral-ii", "mai-floral-iii", "mai-floral-iv", null, null, null, null],
};
