/** Launch Control XL bottom row: scene recall on physical buttons 3–8 (`pad.bottom.2` … `.7`). */
export const LAUNCH_CONTROL_SCENE_PAD_ROW = "pad.bottom" as const;
export const LAUNCH_CONTROL_SCENE_PAD_FIRST_COL = 2;
export const LAUNCH_CONTROL_SCENE_PAD_COUNT = 6;

/** Bottom-right 4×4 on Launchpad: scene recall (mirrors preset block geometry). */
export const LAUNCHPAD_SCENE_PAD_SIZE = 16;
export const LAUNCHPAD_SCENE_PAD_COLS = 4;
export const LAUNCHPAD_SCENE_BLOCK_FIRST_ROW = 4;
export const LAUNCHPAD_SCENE_BLOCK_FIRST_COL = 4;

export const SCENE_MIDI_SLOT_PREFIX = "scene.slot." as const;
export type SceneMidiSlotAction = `${typeof SCENE_MIDI_SLOT_PREFIX}${number}`;

export function launchControlSlotIdForSceneIndex(index: number): string | null {
  if (index < 0 || index >= LAUNCH_CONTROL_SCENE_PAD_COUNT) return null;
  return `${LAUNCH_CONTROL_SCENE_PAD_ROW}.${LAUNCH_CONTROL_SCENE_PAD_FIRST_COL + index}`;
}

export function sceneIndexFromLaunchControlSlotId(slotId: string): number | null {
  const m = /^pad\.bottom\.(\d+)$/.exec(slotId);
  if (!m) return null;
  const col = Number(m[1]);
  if (
    col < LAUNCH_CONTROL_SCENE_PAD_FIRST_COL ||
    col >= LAUNCH_CONTROL_SCENE_PAD_FIRST_COL + LAUNCH_CONTROL_SCENE_PAD_COUNT
  ) {
    return null;
  }
  return col - LAUNCH_CONTROL_SCENE_PAD_FIRST_COL;
}

export function launchpadGridSlotIdForSceneIndex(index: number): string | null {
  if (index < 0 || index >= LAUNCHPAD_SCENE_PAD_SIZE) return null;
  const col = LAUNCHPAD_SCENE_BLOCK_FIRST_COL + (index % LAUNCHPAD_SCENE_PAD_COLS);
  const rowInBlock = Math.floor(index / LAUNCHPAD_SCENE_PAD_COLS);
  const gridRow = LAUNCHPAD_SCENE_BLOCK_FIRST_ROW + rowInBlock;
  return `grid.${gridRow}.${col}`;
}

export const LAUNCHPAD_SCENE_GRID_SLOT_IDS: string[] = Array.from(
  { length: LAUNCHPAD_SCENE_PAD_SIZE },
  (_, i) => launchpadGridSlotIdForSceneIndex(i)!,
);

export function sceneSlotInPadFromLaunchpadGridId(slotId: string): number | null {
  const m = /^grid\.(\d)\.(\d)$/.exec(slotId);
  if (!m) return null;
  const row = Number(m[1]);
  const col = Number(m[2]);
  if (
    row < LAUNCHPAD_SCENE_BLOCK_FIRST_ROW ||
    row > 7 ||
    col < LAUNCHPAD_SCENE_BLOCK_FIRST_COL ||
    col >= LAUNCHPAD_SCENE_BLOCK_FIRST_COL + LAUNCHPAD_SCENE_PAD_COLS
  ) {
    return null;
  }
  return (row - LAUNCHPAD_SCENE_BLOCK_FIRST_ROW) * LAUNCHPAD_SCENE_PAD_COLS + (col - LAUNCHPAD_SCENE_BLOCK_FIRST_COL);
}

export function scenePadCompactLabel(
  scenes: readonly { name?: string }[],
  sceneIndex: number,
  maxChars = 7,
): string {
  const name = scenes[sceneIndex]?.name?.trim();
  if (!name) return `Sc · ${sceneIndex + 1}`;
  if (name.length <= maxChars) return name;
  return `${name.slice(0, maxChars - 1)}…`;
}

export function isSceneMidiAction(action: string): action is SceneMidiSlotAction {
  if (!action.startsWith(SCENE_MIDI_SLOT_PREFIX)) return false;
  const n = Number(action.slice(SCENE_MIDI_SLOT_PREFIX.length));
  return Number.isInteger(n) && n >= 0 && n < LAUNCHPAD_SCENE_PAD_SIZE;
}

export function parseSceneMidiSlotAction(action: string): number | null {
  if (!action.startsWith(SCENE_MIDI_SLOT_PREFIX)) return null;
  const n = Number(action.slice(SCENE_MIDI_SLOT_PREFIX.length));
  if (!Number.isInteger(n) || n < 0 || n >= LAUNCHPAD_SCENE_PAD_SIZE) return null;
  return n;
}

export function sceneMidiActionForIndex(index: number): SceneMidiSlotAction {
  return `${SCENE_MIDI_SLOT_PREFIX}${index}`;
}

export function activeSceneSlotIndex(
  scenes: readonly { id: string }[],
  activeSceneId: string | null | undefined,
): number | null {
  if (activeSceneId == null || activeSceneId === "") return null;
  const idx = scenes.findIndex((s) => s.id === activeSceneId);
  if (idx < 0 || idx >= LAUNCHPAD_SCENE_PAD_SIZE) return null;
  return idx;
}
