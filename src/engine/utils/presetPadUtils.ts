import type { Preset } from "../types/settings";

/** One software / Launchpad pad: 4×4 (16 FX preset shortcuts). */
export const PRESET_PAD_SIZE = 16;
export const PRESET_PAD_COLS = 4;

/** Launchpad Mini [MK3] User grid rows (0-based) for the preset block (bottom-left 4×4). */
export const LAUNCHPAD_PRESET_BLOCK_FIRST_ROW = 4;

export const PRESET_MIDI_SLOT_PREFIX = "preset.slot." as const;
export const PRESET_MIDI_PAD_PREV = "preset.padPrev" as const;
export const PRESET_MIDI_PAD_NEXT = "preset.padNext" as const;

export type PresetMidiSlotAction = `${typeof PRESET_MIDI_SLOT_PREFIX}${number}`;
export type PresetMidiPadAction = typeof PRESET_MIDI_PAD_PREV | typeof PRESET_MIDI_PAD_NEXT;
export type PresetMidiAction = PresetMidiSlotAction | PresetMidiPadAction;

export function presetSlotGlobalIndex(padIndex: number, slotInPad: number): number {
  return Math.max(0, padIndex) * PRESET_PAD_SIZE + slotInPad;
}

export function launchpadGridSlotIdForPresetSlotInPad(slotInPad: number): string {
  const col = slotInPad % PRESET_PAD_COLS;
  const rowInBlock = Math.floor(slotInPad / PRESET_PAD_COLS);
  const gridRow = LAUNCHPAD_PRESET_BLOCK_FIRST_ROW + rowInBlock;
  return `grid.${gridRow}.${col}`;
}

export function presetSlotInPadFromLaunchpadGridId(slotId: string): number | null {
  const m = /^grid\.(\d)\.(\d)$/.exec(slotId);
  if (!m) return null;
  const row = Number(m[1]);
  const col = Number(m[2]);
  if (row < LAUNCHPAD_PRESET_BLOCK_FIRST_ROW || row > 7 || col < 0 || col >= PRESET_PAD_COLS) {
    return null;
  }
  return (row - LAUNCHPAD_PRESET_BLOCK_FIRST_ROW) * PRESET_PAD_COLS + col;
}

export const LAUNCHPAD_PRESET_GRID_SLOT_IDS: string[] = Array.from(
  { length: PRESET_PAD_SIZE },
  (_, i) => launchpadGridSlotIdForPresetSlotInPad(i),
);

export function isPresetMidiAction(action: string): action is PresetMidiAction {
  if (action === PRESET_MIDI_PAD_PREV || action === PRESET_MIDI_PAD_NEXT) return true;
  if (!action.startsWith(PRESET_MIDI_SLOT_PREFIX)) return false;
  const n = Number(action.slice(PRESET_MIDI_SLOT_PREFIX.length));
  return Number.isInteger(n) && n >= 0 && n < PRESET_PAD_SIZE;
}

export function parsePresetMidiSlotAction(action: string): number | null {
  if (!action.startsWith(PRESET_MIDI_SLOT_PREFIX)) return null;
  const n = Number(action.slice(PRESET_MIDI_SLOT_PREFIX.length));
  if (!Number.isInteger(n) || n < 0 || n >= PRESET_PAD_SIZE) return null;
  return n;
}

export function presetCellLabel(name: string, maxChars = 24): string {
  const t = name.trim();
  if (!t) return "···";
  if (t.length <= maxChars) return t;
  return `${t.slice(0, maxChars - 1)}…`;
}

export function presetAtPadSlot(
  presets: Preset[],
  padIndex: number,
  slotInPad: number,
): Preset | undefined {
  return presets[presetSlotGlobalIndex(padIndex, slotInPad)];
}

export function activePresetSlotInPad(
  presets: Preset[],
  activePresetId: string | null | undefined,
  padIndex: number,
): number | null {
  if (activePresetId == null || activePresetId === "") return null;
  const idx = presets.findIndex((p) => p.id === activePresetId);
  if (idx < 0) return null;
  const pad = Math.floor(idx / PRESET_PAD_SIZE);
  if (pad !== padIndex) return null;
  return idx % PRESET_PAD_SIZE;
}
