import type { Preset } from "../types/settings";

export const HYDRA_FX_PRESETS_ARCHIVE_KEY = "hydra-hexa-fx-presets-archive";

const SHIPPED_PRESET_ID_PREFIXES = [
  "montreuil26-fx-",
  "demo-fx-",
  "mai-floral-fx-",
] as const;

export function isUserOwnedFxPreset(preset: Preset): boolean {
  const id = preset.id?.trim() ?? "";
  if (!id) return false;
  return !SHIPPED_PRESET_ID_PREFIXES.some((prefix) => id.startsWith(prefix));
}

function readArchiveRaw(): Preset[] {
  try {
    const raw = localStorage.getItem(HYDRA_FX_PRESETS_ARCHIVE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (p): p is Preset =>
        p != null &&
        typeof p === "object" &&
        typeof (p as Preset).id === "string" &&
        typeof (p as Preset).name === "string",
    );
  } catch {
    return [];
  }
}

function writeArchive(presets: Preset[]): void {
  try {
    localStorage.setItem(HYDRA_FX_PRESETS_ARCHIVE_KEY, JSON.stringify(presets));
  } catch {
    /* ignore quota */
  }
}

function mergeById(existing: Preset[], incoming: Preset[]): Preset[] {
  const seen = new Set(existing.map((p) => p.id));
  const out = [...existing];
  for (const p of incoming) {
    if (!p.id || seen.has(p.id)) continue;
    seen.add(p.id);
    out.push(p);
  }
  return out;
}

/** Keep user-owned presets before Project Hub / package replace wipes local state. */
export function archiveFxPresetsBeforeReplace(current: Preset[] | undefined): void {
  const owned = (current ?? []).filter(isUserOwnedFxPreset);
  if (owned.length === 0) return;
  writeArchive(mergeById(readArchiveRaw(), owned));
}

export function mergeArchivedFxPresets(presets: Preset[] | undefined): Preset[] {
  const base = presets ?? [];
  const archived = readArchiveRaw().filter(isUserOwnedFxPreset);
  if (archived.length === 0) return base;
  return mergeById(base, archived);
}

export function archivedPresetsRecoverableCount(current: Preset[] | undefined): number {
  const seen = new Set((current ?? []).map((p) => p.id));
  return readArchiveRaw().filter((p) => isUserOwnedFxPreset(p) && p.id && !seen.has(p.id)).length;
}