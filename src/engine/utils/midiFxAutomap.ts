import { CORE_FX_KEYS, isCoreFxKey } from "../data/fxConfig";
import type { MidiActionKey, MidiLaunchSlot } from "../types/midiMap";
import { FX_LAUNCH_SLOT_PREFIX } from "../types/midiMap";
import { encodeFxLaunchSlotAction } from "./fxParamMidiMeta";
import { encodeFxMidiTargetEnabled, parseFxMidiTarget } from "./fxMidiParam";
import {
  isSceneMidiAction,
  LAUNCH_CONTROL_SCENE_PAD_COUNT,
  LAUNCHPAD_SCENE_GRID_SLOT_IDS,
  LAUNCHPAD_SCENE_PAD_SIZE,
  launchControlSlotIdForSceneIndex,
  launchpadGridSlotIdForSceneIndex,
  sceneMidiActionForIndex,
} from "./scenePadUtils";

/** Top row, right half: Video Speed, Mixer, Transition, Color Adjust on/off. */
export const LAUNCHPAD_CORE_BLOCK_ROW = 0;
const LAUNCHPAD_CORE_COL_BY_KEY: Record<(typeof CORE_FX_KEYS)[number], number> = {
  videoSpeed: 4,
  autoMix: 5,
  transition: 6,
  colorAdjust: 7,
};

/** Launchpad bottom-right row: same order as sidebar core FX. */
export const LAUNCHPAD_CORE_FX_KEYS: readonly string[] = CORE_FX_KEYS;

export function isLaunchpadCorePadFxKey(k: string): boolean {
  return isCoreFxKey(k);
}

/** Launchpad User grid: top-left 4×4 (rows 0–3, cols 0–3). */
export const LAUNCHPAD_FX_BLOCK_ROWS = 4;
export const LAUNCHPAD_FX_BLOCK_COLS = 4;
export const LAUNCHPAD_FX_BLOCK_SIZE = LAUNCHPAD_FX_BLOCK_ROWS * LAUNCHPAD_FX_BLOCK_COLS;

/** Launch Control XL: first pad row (`pad.top`). */
export const LAUNCH_CONTROL_FX_PAD_ROW = "pad.top" as const;
export const LAUNCH_CONTROL_FX_PAD_COUNT = 8;

export const LAUNCH_CONTROL_FX_PAD_SLOT_IDS: string[] = Array.from(
  { length: LAUNCH_CONTROL_FX_PAD_COUNT },
  (_, i) => `${LAUNCH_CONTROL_FX_PAD_ROW}.${i}`,
);

export function launchpadGridSlotIdForCoreFxKey(key: string): string | null {
  const col = LAUNCHPAD_CORE_COL_BY_KEY[key as (typeof CORE_FX_KEYS)[number]];
  if (col == null) return null;
  return `grid.${LAUNCHPAD_CORE_BLOCK_ROW}.${col}`;
}

export function launchpadGridSlotIdForCoreBlockIndex(index: number): string {
  const key = LAUNCHPAD_CORE_FX_KEYS[index];
  return launchpadGridSlotIdForCoreFxKey(key!) ?? `grid.${LAUNCHPAD_CORE_BLOCK_ROW}.4`;
}

export const LAUNCHPAD_CORE_GRID_SLOT_IDS: string[] = LAUNCHPAD_CORE_FX_KEYS.map((_, i) =>
  launchpadGridSlotIdForCoreBlockIndex(i),
);

export function activeFxKeysForMidiAutomap(activeFxList: readonly string[]): string[] {
  return activeFxList.filter((k) => k && !isCoreFxKey(k));
}

function fxEnabledToggleActionForKey(effectKey: string): MidiActionKey {
  return encodeFxLaunchSlotAction(encodeFxMidiTargetEnabled(effectKey));
}

function effectKeyFromFxEnabledSlotAction(action: string | undefined): string | null {
  if (!action?.startsWith(FX_LAUNCH_SLOT_PREFIX)) return null;
  const parsed = parseFxMidiTarget(action.slice(FX_LAUNCH_SLOT_PREFIX.length));
  if (!parsed?.enabledToggle) return null;
  return parsed.effectKey;
}

export function launchpadGridSlotIdForFxBlockIndex(index: number): string {
  const col = index % LAUNCHPAD_FX_BLOCK_COLS;
  const row = Math.floor(index / LAUNCHPAD_FX_BLOCK_COLS);
  return `grid.${row}.${col}`;
}

export const LAUNCHPAD_FX_GRID_SLOT_IDS: string[] = Array.from(
  { length: LAUNCHPAD_FX_BLOCK_SIZE },
  (_, i) => launchpadGridSlotIdForFxBlockIndex(i),
);

function fxEnabledToggleSlot(effectKey: string): MidiLaunchSlot {
  return {
    action: fxEnabledToggleActionForKey(effectKey),
    mode: "toggle",
    ledStyle: "state",
  };
}

/** Remove core playback / grade toggles from the chain-FX block (top-left 4×4). */
export function clearLaunchpadFxBlockCoreActions(
  slots: Record<string, MidiLaunchSlot | undefined>,
): void {
  for (const id of LAUNCHPAD_FX_GRID_SLOT_IDS) {
    const key = effectKeyFromFxEnabledSlotAction(slots[id]?.action);
    if (key && isLaunchpadCorePadFxKey(key)) {
      slots[id] = { action: "" };
    }
  }
}

function clearLaunchpadStaleGlobalAndSceneSlots(
  slots: Record<string, MidiLaunchSlot | undefined>,
): void {
  const sceneBlock = new Set(LAUNCHPAD_SCENE_GRID_SLOT_IDS);
  const coreBlock = new Set(LAUNCHPAD_CORE_GRID_SLOT_IDS);
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const id = `grid.${row}.${col}`;
      if (sceneBlock.has(id) || coreBlock.has(id)) continue;
      const action = slots[id]?.action;
      if (!action) continue;
      const coreKey = effectKeyFromFxEnabledSlotAction(action);
      if (coreKey && isLaunchpadCorePadFxKey(coreKey)) {
        slots[id] = { action: "" };
      }
      if (isSceneMidiAction(action)) {
        slots[id] = { action: "" };
      }
    }
  }
}

/** Top row cols 4–7: core playback / grade toggles. */
export function applyLaunchpadCoreFxAutomap(slots: Record<string, MidiLaunchSlot | undefined>): void {
  clearLaunchpadStaleGlobalAndSceneSlots(slots);
  for (const key of LAUNCHPAD_CORE_FX_KEYS) {
    const id = launchpadGridSlotIdForCoreFxKey(key);
    if (id) slots[id] = fxEnabledToggleSlot(key);
  }
}

function sceneRecallSlot(sceneIndex: number): MidiLaunchSlot {
  return {
    action: sceneMidiActionForIndex(sceneIndex),
    mode: "momentary",
    ledStyle: "accent",
  };
}

/** Bottom-right 4×4: always bound to `scene.slot.0` … `scene.slot.15`. */
export function applyLaunchpadSceneAutomap(
  slots: Record<string, MidiLaunchSlot | undefined>,
  _scenes: readonly { id: string; name?: string }[],
): void {
  for (let i = 0; i < LAUNCHPAD_SCENE_PAD_SIZE; i++) {
    const id = launchpadGridSlotIdForSceneIndex(i);
    if (id) slots[id] = sceneRecallSlot(i);
  }
}

/** Launch Control bottom row buttons 3–8: `scene.slot.0` … `scene.slot.5`. */
export function applyLaunchControlSceneAutomap(
  slots: Record<string, MidiLaunchSlot | undefined>,
  _scenes: readonly { id: string; name?: string }[],
): void {
  for (let i = 0; i < LAUNCH_CONTROL_SCENE_PAD_COUNT; i++) {
    const id = launchControlSlotIdForSceneIndex(i);
    if (id) slots[id] = sceneRecallSlot(i);
  }
}

/** Keep automap block pads aligned with `activeFxList` order (index → stack position). */
function syncFxEnabledAutomapBlock(
  slots: Record<string, MidiLaunchSlot | undefined>,
  blockSlotIds: readonly string[],
  activeFxList: readonly string[],
): void {
  const keys = activeFxKeysForMidiAutomap(activeFxList);
  for (let i = 0; i < blockSlotIds.length; i++) {
    const id = blockSlotIds[i]!;
    if (i < keys.length) {
      slots[id] = fxEnabledToggleSlot(keys[i]!);
    } else if (effectKeyFromFxEnabledSlotAction(slots[id]?.action)) {
      slots[id] = { action: "" };
    }
  }
}

/** Launchpad top-left 4×4: active FX on/off toggles in stack order. */
export function applyLaunchpadActiveFxAutomap(
  slots: Record<string, MidiLaunchSlot | undefined>,
  activeFxList: readonly string[],
): void {
  syncFxEnabledAutomapBlock(slots, LAUNCHPAD_FX_GRID_SLOT_IDS, activeFxList);
}

/** Launch Control `pad.top` row: active FX on/off toggles in stack order. */
export function applyLaunchControlActiveFxAutomap(
  slots: Record<string, MidiLaunchSlot | undefined>,
  activeFxList: readonly string[],
): void {
  syncFxEnabledAutomapBlock(slots, LAUNCH_CONTROL_FX_PAD_SLOT_IDS, activeFxList);
}
