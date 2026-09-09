import type { Preset } from "../types/settings";

export type PresetScope = "global" | "scene";

export function isGlobalPreset(preset: Preset): boolean {
  const sid = preset.sceneId;
  return sid == null || (typeof sid === "string" && sid.trim().length === 0);
}

export function isScenePreset(preset: Preset, sceneId: string): boolean {
  return !isGlobalPreset(preset) && preset.sceneId === sceneId;
}

export function globalPresets(presets: Preset[] | undefined): Preset[] {
  return (presets ?? []).filter(isGlobalPreset);
}

export function presetsForScope(
  scope: PresetScope,
  presets: Preset[] | undefined,
  activeSceneId: string | null | undefined,
  options?: { allScenePresetsWhenNoActive?: boolean },
): Preset[] {
  const list = presets ?? [];
  if (scope === "global") return globalPresets(list);
  if (activeSceneId == null || activeSceneId === "") {
    if (options?.allScenePresetsWhenNoActive) {
      return list.filter((p) => !isGlobalPreset(p));
    }
    return [];
  }
  return scenePresets(list, activeSceneId);
}

export function countSceneScopedPresets(presets: Preset[] | undefined): number {
  return (presets ?? []).filter((p) => !isGlobalPreset(p)).length;
}

export function scenePresets(presets: Preset[] | undefined, sceneId: string): Preset[] {
  return (presets ?? []).filter((p) => isScenePreset(p, sceneId));
}

export function findPreset(presets: Preset[] | undefined, presetId: string | null | undefined): Preset | undefined {
  if (presetId == null || presetId === "") return undefined;
  return (presets ?? []).find((p) => p.id === presetId);
}

/** Scene-scoped preset label — drops a leading "{sceneName} · " when context already names the scene. */
export function scenePresetDisplayName(
  preset: Pick<Preset, "name">,
  sceneName: string | null | undefined,
): string {
  const name = preset.name?.trim() ?? "";
  const scene = sceneName?.trim();
  if (!scene) return name;
  const prefix = `${scene} · `;
  return name.startsWith(prefix) ? name.slice(prefix.length) : name;
}

/** Presets a scene may link to when saving or recalling FX. */
export function presetsLinkableToScene(
  presets: Preset[] | undefined,
  sceneId: string,
): Preset[] {
  return (presets ?? []).filter((p) => isGlobalPreset(p) || isScenePreset(p, sceneId));
}

export function migrateMontreuil26PresetSceneId(preset: Preset): Preset {
  if (!isGlobalPreset(preset)) return preset;
  const m = /^montreuil26-fx-(\d{2})(?:-(?:flow|pulse|spark))?$/.exec(preset.id);
  if (!m) return preset;
  return { ...preset, sceneId: `montreuil26-track-${m[1]}` };
}
