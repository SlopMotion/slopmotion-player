import {
  applyLaunchControlActiveFxAutomap,
  applyLaunchControlSceneAutomap,
  applyLaunchpadActiveFxAutomap,
  applyLaunchpadCoreFxAutomap,
  applyLaunchpadSceneAutomap,
  clearLaunchpadFxBlockCoreActions,
} from "../utils/midiFxAutomap";
import {
  applyLaunchControlLeftNavAutomap,
  applyLaunchpadMiniRightNavAutomap,
} from "../utils/midiSideNavAutomap";
import { isSceneMidiAction } from "../utils/scenePadUtils";
import { parseFxMidiTarget } from "../utils/fxMidiParam";
import {
  isPresetMidiAction,
  launchpadGridSlotIdForPresetSlotInPad,
  type PresetMidiAction,
} from "../utils/presetPadUtils";
import type { SceneMidiSlotAction } from "../utils/scenePadUtils";

export type MidiSlotEnsureOpts = {
  /** When set, empty FX pad cells get `fx:<key>::enabled` toggles (Launchpad top-left 4×4, LC `pad.top`). */
  activeFxList?: readonly string[];
  /** When set, Launchpad scene block + LCXL bottom-row pads get `scene.slot.<n>` recall. */
  scenes?: readonly { id: string; name?: string }[];
};

export type MidiWireKind = "cc" | "note" | "pitch";

/** Prefix for Launch Control slots mapped to an FX param (`encodeFxMidiTarget` payload). */
export const FX_LAUNCH_SLOT_PREFIX = "fx:" as const;

export type MidiBuiltinActionKey =
  | ""
  | "global.bpm"
  | "global.inputGain"
  | "global.inputMultiplier"
  | "video.next"
  | "video.prev"
  | "video.togglePlay"
  | "ui.toggleZen"
  | "ui.panel.audio"
  | "ui.panel.video"
  | "ui.panel.menu"
  | PresetMidiAction;

/** Built-in targets plus `fx:<targetId>` rows from `encodeFxMidiTarget` (Launch Control grid). */
export type MidiActionKey =
  | MidiBuiltinActionKey
  | SceneMidiSlotAction
  | `${typeof FX_LAUNCH_SLOT_PREFIX}${string}`;

export interface MidiLearnBinding {
  channel: number;
  kind: MidiWireKind;
  number: number;
}

export interface LaunchControlMidiMap {
  midiInDebug: boolean;
  /** Hardware LED feedback via SysEx on Launch Control XL MIDI Out. */
  midiLedFeedback: boolean;
  slots: Record<string, MidiLaunchSlot>;
}

/** How incoming MIDI is interpreted for this control. */
export type MidiSlotBehaviorMode = "value" | "toggle" | "momentary" | "pushPull";

/** How hardware / layout LEDs are tinted for this slot (when LED feedback is on). */
export type MidiSlotLedStyle = "auto" | "state" | "accent";

export interface MidiLaunchSlot {
  action: MidiActionKey;
  /** Default inferred from action + control kind when omitted. */
  mode?: MidiSlotBehaviorMode;
  /** Numeric range override (FX params, globals). Falls back to FX definition or built-in scale. */
  min?: number;
  max?: number;
  step?: number;
  /** When false, this slot skips hardware LED feedback (map-level switch still applies). */
  ledFeedback?: boolean;
  /** LED colour rule: auto = state for FX on/off, accent for others; state = red/green; accent = row colour. */
  ledStyle?: MidiSlotLedStyle;
}

export const MIDI_SLOT_LED_STYLE_OPTIONS: { value: MidiSlotLedStyle; label: string; short: string }[] = [
  { value: "auto", label: "Auto", short: "Auto" },
  { value: "state", label: "On / off", short: "State" },
  { value: "accent", label: "Accent", short: "Accent" },
];

export const MIDI_SLOT_MODE_OPTIONS: { value: MidiSlotBehaviorMode; label: string; short: string }[] = [
  { value: "value", label: "Value", short: "Val" },
  { value: "toggle", label: "Toggle", short: "Tog" },
  { value: "momentary", label: "Momentary", short: "Mom" },
  { value: "pushPull", label: "Push / pull", short: "P/P" },
];

export function inferMidiSlotControlKind(slotId: string): "knob" | "fader" | "pad" | "side" {
  if (slotId.startsWith("knob.")) return "knob";
  // Pitch / mod wheels are continuous modulators — treat like knobs for default value mode.
  if (slotId.startsWith("wheel.")) return "knob";
  if (slotId.startsWith("fader.")) return "fader";
  if (slotId.startsWith("pad.") || slotId.startsWith("grid.")) return "pad";
  return "side";
}

export function defaultMidiSlotMode(action: MidiActionKey, slotId: string): MidiSlotBehaviorMode {
  if (!action) return "momentary";
  if (isPresetMidiAction(action) || isSceneMidiAction(action)) return "momentary";
  const fxTarget = action.startsWith(FX_LAUNCH_SLOT_PREFIX)
    ? action.slice(FX_LAUNCH_SLOT_PREFIX.length)
    : "";
  if (fxTarget.endsWith("::enabled")) return "toggle";
  if (action === "video.togglePlay" || action === "ui.toggleZen") return "toggle";
  if (action === "video.next" || action === "video.prev") return "momentary";
  if (action === "ui.panel.audio" || action === "ui.panel.video" || action === "ui.panel.menu") {
    return "momentary";
  }
  if (action.startsWith(FX_LAUNCH_SLOT_PREFIX)) {
    const kind = inferMidiSlotControlKind(slotId);
    return kind === "knob" || kind === "fader" ? "value" : "momentary";
  }
  if (action.startsWith("global.")) return "value";
  return "momentary";
}

/** Knobs/faders driving numeric FX rows must stay in value mode — momentary only crosses CC 64 once. */
export function coerceMidiSlotMode(
  action: MidiActionKey,
  slotId: string,
  mode: MidiSlotBehaviorMode,
): MidiSlotBehaviorMode {
  if (!action.startsWith(FX_LAUNCH_SLOT_PREFIX)) return mode;
  const parsed = parseFxMidiTarget(action.slice(FX_LAUNCH_SLOT_PREFIX.length));
  if (!parsed || parsed.enabledToggle) return mode;
  const kind = inferMidiSlotControlKind(slotId);
  if (kind === "knob" || kind === "fader") return "value";
  return mode;
}

export function normalizeMidiLaunchSlot(raw: unknown, slotId: string): MidiLaunchSlot {
  const empty: MidiLaunchSlot = { action: "" };
  if (!raw || typeof raw !== "object") return empty;
  const r = raw as Record<string, unknown>;
  const actionRaw = typeof r.action === "string" ? r.action : "";
  const action: MidiActionKey = isValidLaunchControlSlotAction(actionRaw)
    ? (actionRaw as MidiActionKey)
    : "";
  const modeRaw = r.mode;
  const mode =
    modeRaw === "value" || modeRaw === "toggle" || modeRaw === "momentary" || modeRaw === "pushPull"
      ? modeRaw
      : defaultMidiSlotMode(action, slotId);
  const min = typeof r.min === "number" && Number.isFinite(r.min) ? r.min : undefined;
  const max = typeof r.max === "number" && Number.isFinite(r.max) ? r.max : undefined;
  const step =
    typeof r.step === "number" && Number.isFinite(r.step) && r.step > 0 ? r.step : undefined;
  const ledFeedback = typeof r.ledFeedback === "boolean" ? r.ledFeedback : undefined;
  const ledStyleRaw = r.ledStyle;
  const ledStyle =
    ledStyleRaw === "auto" || ledStyleRaw === "state" || ledStyleRaw === "accent"
      ? ledStyleRaw
      : undefined;
  return {
    action,
    mode: coerceMidiSlotMode(action, slotId, mode),
    min,
    max,
    step,
    ledFeedback,
    ledStyle,
  };
}

export const MIDI_ACTION_OPTIONS: {
  value: MidiBuiltinActionKey;
  /** Dropdown / screen reader label */
  label: string;
  /** Narrow-cell summary (shown in closed mapper row) */
  compact: string;
}[] = [
  { value: "", label: "—", compact: "" },
  { value: "global.bpm", label: "BPM", compact: "BPM" },
  { value: "global.inputGain", label: "Input gain", compact: "In gain" },
  { value: "global.inputMultiplier", label: "Trigger scale", compact: "Trig ×" },
  { value: "video.next", label: "Playset: next clip", compact: "PS · Next" },
  { value: "video.prev", label: "Playset: prev clip", compact: "PS · Prev" },
  { value: "video.togglePlay", label: "Playset: play / stop", compact: "PS · Tran" },
  { value: "ui.toggleZen", label: "UI: zen toggle", compact: "UI · Zen" },
  { value: "ui.panel.audio", label: "UI: Audio panel", compact: "UI · Audio" },
  { value: "ui.panel.video", label: "UI: Playset panel", compact: "UI · Playset" },
  { value: "ui.panel.menu", label: "UI: sidebar menu", compact: "UI · Menu" },
];

export const MIDI_SCENE_ACTION_OPTIONS: {
  value: SceneMidiSlotAction;
  label: string;
  compact: string;
}[] = Array.from({ length: 16 }, (_, i) => ({
  value: `scene.slot.${i}` as SceneMidiSlotAction,
  label: `Scene · slot ${i + 1}`,
  compact: `Sc · ${i + 1}`,
}));

export const MIDI_PRESET_ACTION_OPTIONS: {
  value: PresetMidiAction;
  label: string;
  compact: string;
}[] = [
  { value: "preset.padPrev", label: "FX presets: previous pad", compact: "FX · Pad −" },
  { value: "preset.padNext", label: "FX presets: next pad", compact: "FX · Pad +" },
  ...Array.from({ length: 16 }, (_, i) => ({
    value: `preset.slot.${i}` as PresetMidiAction,
    label: `FX preset · pad slot ${i + 1}`,
    compact: `FX · ${i + 1}`,
  })),
];

/** Lookup for picker display / tooltips */
export function midiActionMeta(
  action: string,
):
  | (typeof MIDI_ACTION_OPTIONS)[number]
  | (typeof MIDI_PRESET_ACTION_OPTIONS)[number]
  | (typeof MIDI_SCENE_ACTION_OPTIONS)[number]
  | undefined {
  return (
    MIDI_ACTION_OPTIONS.find((o) => o.value === action) ??
    MIDI_PRESET_ACTION_OPTIONS.find((o) => o.value === action) ??
    MIDI_SCENE_ACTION_OPTIONS.find((o) => o.value === action)
  );
}

export function defaultLaunchControlMidiMap(): LaunchControlMidiMap {
  return {
    midiInDebug: false,
    midiLedFeedback: true,
    slots: {},
  };
}

const cols8 = (prefix: string) => Array.from({ length: 8 }, (_, c) => `${prefix}.${c}`);

export const LAUNCH_CONTROL_MAIN_ROWS: { rowLabel: string; ids: string[] }[] = [
  { rowLabel: "Send A", ids: cols8("knob.sendA") },
  { rowLabel: "Send B", ids: cols8("knob.sendB") },
  { rowLabel: "Pan / device", ids: cols8("knob.pan") },
  { rowLabel: "Level", ids: cols8("fader") },
  { rowLabel: "Track focus", ids: cols8("pad.top") },
  { rowLabel: "Track control", ids: cols8("pad.bottom") },
];

export const LAUNCH_CONTROL_SIDE_SLOTS: { id: string; shortLabel: string }[] = [
  { id: "side.sendUp", shortLabel: "Audio" },
  { id: "side.sendDown", shortLabel: "Playset" },
  { id: "side.trackLeft", shortLabel: "Menu" },
  { id: "side.trackRight", shortLabel: "Trk →" },
  { id: "side.device", shortLabel: "Device" },
  { id: "side.mute", shortLabel: "Mute" },
  { id: "side.solo", shortLabel: "Solo" },
  { id: "side.record", shortLabel: "Rec" },
];

export const LAUNCH_CONTROL_ALL_SLOT_IDS: string[] = [
  ...LAUNCH_CONTROL_MAIN_ROWS.flatMap((r) => r.ids),
  ...LAUNCH_CONTROL_SIDE_SLOTS.map((s) => s.id),
];

type LegacyMidiMap = Partial<LaunchControlMidiMap> & {
  midiLedDebug?: boolean;
  automapChannel?: unknown;
  slots?: Record<string, { action?: unknown; binding?: unknown }>;
};

function isValidLaunchControlSlotAction(action: string): boolean {
  if (!action) return true;
  if (MIDI_ACTION_OPTIONS.some((o) => o.value === action)) return true;
  if (isPresetMidiAction(action)) return true;
  if (isSceneMidiAction(action)) return true;
  if (!action.startsWith(FX_LAUNCH_SLOT_PREFIX)) return false;
  const id = action.slice(FX_LAUNCH_SLOT_PREFIX.length);
  const parsed = parseFxMidiTarget(id);
  return !!parsed;
}

export function ensureLaunchControlSlots(
  map: LaunchControlMidiMap | LegacyMidiMap,
  opts?: MidiSlotEnsureOpts,
): LaunchControlMidiMap {
  const defaults = defaultLaunchControlMidiMap();
  const legacy = map as LegacyMidiMap;
  const midiInDebug =
    typeof legacy.midiInDebug === "boolean"
      ? legacy.midiInDebug
      : typeof legacy.midiLedDebug === "boolean"
        ? legacy.midiLedDebug
        : defaults.midiInDebug;
  const rawSlots =
    legacy.slots && typeof legacy.slots === "object"
      ? (legacy.slots as Record<string, unknown>)
      : ({} as Record<string, unknown>);
  const midiLedFeedback =
    typeof legacy.midiLedFeedback === "boolean" ? legacy.midiLedFeedback : defaults.midiLedFeedback;
  const next: LaunchControlMidiMap = {
    ...defaults,
    midiInDebug,
    midiLedFeedback,
    slots: {},
  };
  for (const id of LAUNCH_CONTROL_ALL_SLOT_IDS) {
    const row = rawSlots[id];
    if (!row || typeof row !== "object") {
      next.slots[id] = { action: "" };
      continue;
    }
    next.slots[id] = normalizeMidiLaunchSlot(row, id);
  }
  applyLaunchControlLeftNavAutomap(next.slots);
  applyLaunchControlSceneAutomap(next.slots, opts?.scenes ?? []);
  if (opts?.activeFxList) {
    applyLaunchControlActiveFxAutomap(next.slots, opts.activeFxList);
  }
  return next;
}

export function bindingKey(b: MidiLearnBinding): string {
  return `${b.channel}:${b.kind}:${b.number}`;
}

/** Persisted Launchpad Mini [MK3] slot → action map (User / Custom 3 mode). */
export interface LaunchpadMiniMidiMap {
  midiInDebug: boolean;
  /** Mirror pad presses on hardware via LPMiniMK3 MIDI Out palette colours. */
  midiLedFeedback: boolean;
  slots: Record<string, MidiLaunchSlot>;
}

const grid8 = (row: number) => Array.from({ length: 8 }, (_, c) => `grid.${row}.${c}`);

export const LAUNCHPAD_MINI_GRID_ROWS: { rowLabel: string; ids: string[] }[] = [
  { rowLabel: "Row 1 (top)", ids: grid8(0) },
  { rowLabel: "Row 2", ids: grid8(1) },
  { rowLabel: "Row 3", ids: grid8(2) },
  { rowLabel: "Row 4", ids: grid8(3) },
  { rowLabel: "Row 5", ids: grid8(4) },
  { rowLabel: "Row 6", ids: grid8(5) },
  { rowLabel: "Row 7", ids: grid8(6) },
  { rowLabel: "Row 8 (bottom)", ids: grid8(7) },
];

export const LAUNCHPAD_MINI_TOP_SLOTS: { id: string; shortLabel: string }[] = [
  { id: "top.up", shortLabel: "↑" },
  { id: "top.down", shortLabel: "↓" },
  { id: "top.left", shortLabel: "←" },
  { id: "top.right", shortLabel: "→" },
  { id: "top.session", shortLabel: "Sess" },
  { id: "top.drums", shortLabel: "Drum" },
  { id: "top.keys", shortLabel: "Keys" },
  { id: "top.user", shortLabel: "User" },
  { id: "top.logo", shortLabel: "Logo" },
];

export const LAUNCHPAD_MINI_SCENE_SLOTS: { id: string; shortLabel: string }[] = [
  { id: "side.scene1", shortLabel: "Audio" },
  { id: "side.scene2", shortLabel: "Playset" },
  { id: "side.scene3", shortLabel: "Menu" },
  { id: "side.scene4", shortLabel: "Sc 4" },
  { id: "side.scene5", shortLabel: "Sc 5" },
  { id: "side.scene6", shortLabel: "Sc 6" },
  { id: "side.scene7", shortLabel: "Sc 7" },
  { id: "side.stopSoloMute", shortLabel: "Stop" },
];

export const LAUNCHPAD_MINI_ALL_SLOT_IDS: string[] = [
  ...LAUNCHPAD_MINI_GRID_ROWS.flatMap((r) => r.ids),
  ...LAUNCHPAD_MINI_TOP_SLOTS.map((s) => s.id),
  ...LAUNCHPAD_MINI_SCENE_SLOTS.map((s) => s.id),
];

export function defaultLaunchpadMiniMidiMap(): LaunchpadMiniMidiMap {
  return { midiInDebug: false, midiLedFeedback: true, slots: {} };
}

type LegacyLaunchpadMiniMap = Partial<LaunchpadMiniMidiMap> & {
  slots?: Record<string, { action?: unknown }>;
};

function applyDefaultLaunchpadPresetBindings(slots: Record<string, MidiLaunchSlot>) {
  for (let i = 0; i < 16; i++) {
    const id = launchpadGridSlotIdForPresetSlotInPad(i);
    if (!slots[id]?.action) {
      slots[id] = { action: `preset.slot.${i}` as PresetMidiAction, mode: "momentary" };
    }
  }
  if (!slots["top.left"]?.action) {
    slots["top.left"] = { action: "preset.padPrev", mode: "momentary" };
  }
  if (!slots["top.right"]?.action) {
    slots["top.right"] = { action: "preset.padNext", mode: "momentary" };
  }
}

export function ensureLaunchpadMiniSlots(
  map: LaunchpadMiniMidiMap | LegacyLaunchpadMiniMap,
  opts?: MidiSlotEnsureOpts,
): LaunchpadMiniMidiMap {
  const defaults = defaultLaunchpadMiniMidiMap();
  const legacy = map as LegacyLaunchpadMiniMap;
  const midiInDebug =
    typeof legacy.midiInDebug === "boolean" ? legacy.midiInDebug : defaults.midiInDebug;
  const midiLedFeedback =
    typeof legacy.midiLedFeedback === "boolean" ? legacy.midiLedFeedback : defaults.midiLedFeedback;
  const rawSlots =
    legacy.slots && typeof legacy.slots === "object"
      ? (legacy.slots as Record<string, unknown>)
      : ({} as Record<string, unknown>);
  const next: LaunchpadMiniMidiMap = { ...defaults, midiInDebug, midiLedFeedback, slots: {} };
  for (const id of LAUNCHPAD_MINI_ALL_SLOT_IDS) {
    const row = rawSlots[id];
    if (!row || typeof row !== "object") {
      next.slots[id] = { action: "" };
      continue;
    }
    next.slots[id] = normalizeMidiLaunchSlot(row, id);
  }
  applyDefaultLaunchpadPresetBindings(next.slots);
  clearLaunchpadFxBlockCoreActions(next.slots);
  applyLaunchpadCoreFxAutomap(next.slots);
  applyLaunchpadMiniRightNavAutomap(next.slots);
  applyLaunchpadSceneAutomap(next.slots, opts?.scenes ?? []);
  if (opts?.activeFxList) {
    applyLaunchpadActiveFxAutomap(next.slots, opts.activeFxList);
  }
  return next;
}

/* ─────────────────────────── Novation Launchkey 25 [MK2] ───────────────────────────
 * Keybed controller: 25 velocity keys (white + black), pitch + modulation wheels,
 * 8 rotary pots, 16 RGB pads (2×8), 2 round launch buttons + ◀▶ track buttons.
 * Slot ids: `knob.0..7`, `pad.top.0..7`, `pad.bottom.0..7`, `round.up|down`,
 * `track.left|right`, `wheel.pitch|mod`, `key.0..24`.
 */
export interface LaunchkeyMidiMap {
  midiInDebug: boolean;
  /** Drives the in-app layout LED preview (Launchkey basic mode has no LED-out wiring here). */
  midiLedFeedback: boolean;
  slots: Record<string, MidiLaunchSlot>;
}

export const LAUNCHKEY_KEY_COUNT = 25;

export const LAUNCHKEY_KNOB_IDS: string[] = Array.from({ length: 8 }, (_, c) => `knob.${c}`);
export const LAUNCHKEY_PAD_TOP_IDS: string[] = Array.from({ length: 8 }, (_, c) => `pad.top.${c}`);
export const LAUNCHKEY_PAD_BOTTOM_IDS: string[] = Array.from(
  { length: 8 },
  (_, c) => `pad.bottom.${c}`,
);

export const LAUNCHKEY_ROUND_SLOTS: { id: string; shortLabel: string }[] = [
  { id: "round.up", shortLabel: "▲" },
  { id: "round.down", shortLabel: "▼" },
];

export const LAUNCHKEY_TRACK_SLOTS: { id: string; shortLabel: string }[] = [
  { id: "track.left", shortLabel: "◀ Trk" },
  { id: "track.right", shortLabel: "Trk ▶" },
];

export const LAUNCHKEY_WHEEL_SLOTS: { id: string; shortLabel: string; centered: boolean }[] = [
  { id: "wheel.pitch", shortLabel: "Pitch", centered: true },
  { id: "wheel.mod", shortLabel: "Mod", centered: false },
];

export const LAUNCHKEY_KEY_IDS: string[] = Array.from(
  { length: LAUNCHKEY_KEY_COUNT },
  (_, i) => `key.${i}`,
);

export const LAUNCHKEY_ALL_SLOT_IDS: string[] = [
  ...LAUNCHKEY_KNOB_IDS,
  ...LAUNCHKEY_PAD_TOP_IDS,
  ...LAUNCHKEY_PAD_BOTTOM_IDS,
  ...LAUNCHKEY_ROUND_SLOTS.map((s) => s.id),
  ...LAUNCHKEY_TRACK_SLOTS.map((s) => s.id),
  ...LAUNCHKEY_WHEEL_SLOTS.map((s) => s.id),
  ...LAUNCHKEY_KEY_IDS,
];

export function defaultLaunchkeyMidiMap(): LaunchkeyMidiMap {
  return { midiInDebug: false, midiLedFeedback: true, slots: {} };
}

type LegacyLaunchkeyMap = Partial<LaunchkeyMidiMap> & {
  slots?: Record<string, { action?: unknown }>;
};

/** Pads recall FX preset pad slots out of the box; track buttons page the preset bank. */
function applyDefaultLaunchkeyBindings(slots: Record<string, MidiLaunchSlot>) {
  const padIds = [...LAUNCHKEY_PAD_TOP_IDS, ...LAUNCHKEY_PAD_BOTTOM_IDS];
  padIds.forEach((id, i) => {
    if (!slots[id]?.action) {
      slots[id] = { action: `preset.slot.${i}` as PresetMidiAction, mode: "momentary" };
    }
  });
  if (!slots["track.left"]?.action) {
    slots["track.left"] = { action: "preset.padPrev", mode: "momentary" };
  }
  if (!slots["track.right"]?.action) {
    slots["track.right"] = { action: "preset.padNext", mode: "momentary" };
  }
}

export function ensureLaunchkeySlots(
  map: LaunchkeyMidiMap | LegacyLaunchkeyMap,
  _opts?: MidiSlotEnsureOpts,
): LaunchkeyMidiMap {
  const defaults = defaultLaunchkeyMidiMap();
  const legacy = map as LegacyLaunchkeyMap;
  const midiInDebug =
    typeof legacy.midiInDebug === "boolean" ? legacy.midiInDebug : defaults.midiInDebug;
  const midiLedFeedback =
    typeof legacy.midiLedFeedback === "boolean" ? legacy.midiLedFeedback : defaults.midiLedFeedback;
  const rawSlots =
    legacy.slots && typeof legacy.slots === "object"
      ? (legacy.slots as Record<string, unknown>)
      : ({} as Record<string, unknown>);
  const next: LaunchkeyMidiMap = { ...defaults, midiInDebug, midiLedFeedback, slots: {} };
  for (const id of LAUNCHKEY_ALL_SLOT_IDS) {
    const row = rawSlots[id];
    if (!row || typeof row !== "object") {
      next.slots[id] = { action: "" };
      continue;
    }
    next.slots[id] = normalizeMidiLaunchSlot(row, id);
  }
  applyDefaultLaunchkeyBindings(next.slots);
  return next;
}
