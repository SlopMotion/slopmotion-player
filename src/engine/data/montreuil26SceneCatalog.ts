import type { FolderConfig, Preset, Scene } from "../types/settings";
import { createDefaultHydraFxMap } from "./defaultHydraFxMap";
import { isCoreFxKey } from "./fxConfig";

export const PIMENT_BRESILIEN_TRACK = 2;
export const PIMENT_BRESILIEN_BPM = 124;
export const PIMENT_BRESILIEN_TITLE = "Piment brésilien";

/** Seeded demo chain — ignored by the onboarding “add an effect” checklist. */
export const PIMENT_DEMO_FX_KEYS = ["pulse", "glow"] as const;

export const PIMENT_BRESILIEN_CLIPS = [
  "/loops/parvagues/ParVagues__kab9__28.mp4",
  "/loops/parvagues/ParVagues__spes__5.mp4",
  "/loops/parvagues/ParVagues__0lcg__21.mp4",
  "/loops/parvagues/ParVagues__3sz6__19.mp4",
] as const;

export function montreuil26FxPresetId(trackNumber: number): string {
  return `montreuil26-fx-${String(trackNumber).padStart(2, "0")}`;
}

function barsToSec(bpm: number, bars = 4): number {
  return Math.round((60 / Math.max(bpm, 60)) * bars * 4);
}

function configurePimentBresilienFx(fx: FolderConfig["fx"], bpm: number) {
  fx.videoSpeed = {
    ...fx.videoSpeed,
    enabled: true,
    base: Math.min(1.25, Math.max(0.85, 0.72 + bpm / 320)),
    syncBand: "low",
    syncMultiplier: Math.min(2.2, 0.7 + bpm / 140),
  };
  fx.autoMix = {
    ...fx.autoMix,
    enabled: true,
    base: barsToSec(bpm, 4),
    syncBand: "none",
    syncMultiplier: 0,
    params: { ...fx.autoMix.params, advanceMode: "sequential" },
  };
  fx.transition = {
    ...fx.transition,
    enabled: true,
    base: 0.5,
    syncBand: "none",
    syncMultiplier: 0,
    params: { type: 0, duration: 1 },
  };
  fx.pulse = {
    ...fx.pulse,
    enabled: true,
    base: 0.55,
    syncBand: "low",
    syncMultiplier: 0.45,
    params: { breath: 0.5, bloom: 0.45 },
  };
  fx.colorAdjust = {
    ...fx.colorAdjust,
    enabled: true,
    base: 0.08,
    syncBand: "mid",
    syncMultiplier: 0.12,
    params: { contrast: 1.08, hue: 18, saturation: 1.16, hueRev: 2 },
  };
  fx.glow = {
    ...fx.glow,
    enabled: true,
    base: 0.14,
    syncBand: "high",
    syncMultiplier: 0.22,
    params: { ...fx.glow.params, threshold: 0.48, bloom: 0.55 },
  };
}

export function buildPimentBresilienPreset(sceneId: string): Preset {
  const fx = createDefaultHydraFxMap();
  configurePimentBresilienFx(fx, PIMENT_BRESILIEN_BPM);
  const activeFxList = (Object.keys(fx) as (keyof FolderConfig["fx"])[]).filter(
    (k) => !isCoreFxKey(k as string) && fx[k].enabled,
  );
  return {
    id: montreuil26FxPresetId(PIMENT_BRESILIEN_TRACK),
    name: PIMENT_BRESILIEN_TITLE,
    sceneId,
    activeFxList,
    fx: JSON.parse(JSON.stringify(fx)),
  };
}

export function buildPimentBresilienScene(sceneId: string): Scene {
  return {
    id: sceneId,
    name: PIMENT_BRESILIEN_TITLE,
    playsetFolder: "parvagues",
    fxPresetId: montreuil26FxPresetId(PIMENT_BRESILIEN_TRACK),
    bpm: PIMENT_BRESILIEN_BPM,
    videoPaths: [...PIMENT_BRESILIEN_CLIPS],
  };
}
