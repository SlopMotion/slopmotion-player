import type { AppState, OutputMapTemplate } from "../types/settings";
import { normalizeOutputMapTemplates } from "../data/outputMapping";

export const OUTPUT_MAP_TEMPLATES_STORAGE_KEY = "hexa-account-output-map-templates";

function canUseLocalStorage(): boolean {
  return typeof localStorage !== "undefined";
}

export function readAccountOutputMapTemplates(): OutputMapTemplate[] {
  if (!canUseLocalStorage()) return [];
  try {
    const raw = localStorage.getItem(OUTPUT_MAP_TEMPLATES_STORAGE_KEY);
    if (!raw) return [];
    return normalizeOutputMapTemplates(JSON.parse(raw));
  } catch {
    return [];
  }
}

export function writeAccountOutputMapTemplates(templates: OutputMapTemplate[]): void {
  if (!canUseLocalStorage()) return;
  try {
    localStorage.setItem(
      OUTPUT_MAP_TEMPLATES_STORAGE_KEY,
      JSON.stringify(normalizeOutputMapTemplates(templates)),
    );
  } catch {
    /* private mode */
  }
}

export function mergeOutputMapTemplates(...lists: OutputMapTemplate[][]): OutputMapTemplate[] {
  const byId = new Map<string, OutputMapTemplate>();
  for (const list of lists) {
    for (const template of list) {
      const prev = byId.get(template.id);
      if (!prev || template.updatedAt >= prev.updatedAt) {
        byId.set(template.id, template);
      }
    }
  }
  return normalizeOutputMapTemplates([...byId.values()]);
}

export function withAccountOutputMapTemplates(
  state: AppState,
  accountTemplates?: OutputMapTemplate[],
): AppState {
  const templates = mergeOutputMapTemplates(
    accountTemplates ?? readAccountOutputMapTemplates(),
    normalizeOutputMapTemplates(state.global.outputMapTemplates),
  );
  if (
    templates.length === (state.global.outputMapTemplates?.length ?? 0) &&
    templates.every((template, index) => template.id === state.global.outputMapTemplates?.[index]?.id)
  ) {
    return state;
  }
  return {
    ...state,
    global: {
      ...state.global,
      outputMapTemplates: templates,
    },
  };
}

export function syncAccountOutputMapTemplatesFromAppState(state: AppState): OutputMapTemplate[] {
  const merged = mergeOutputMapTemplates(
    readAccountOutputMapTemplates(),
    normalizeOutputMapTemplates(state.global.outputMapTemplates),
  );
  writeAccountOutputMapTemplates(merged);
  return merged;
}
