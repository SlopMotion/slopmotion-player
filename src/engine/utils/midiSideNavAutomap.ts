import type { MidiBuiltinActionKey, MidiLaunchSlot } from "../types/midiMap";

/** Physical left column on Launch Control XL (send / track arrows). */
export const LAUNCH_CONTROL_LEFT_NAV_SLOTS = [
  "side.sendUp",
  "side.sendDown",
  "side.trackLeft",
] as const;

export const PANEL_NAV_ACTIONS: readonly MidiBuiltinActionKey[] = [
  "ui.panel.audio",
  "ui.panel.video",
  "ui.panel.menu",
];

/** Top three buttons on Launchpad Mini right column (CC scene column). */
export const LAUNCHPAD_MINI_RIGHT_NAV_SLOTS = [
  "side.scene1",
  "side.scene2",
  "side.scene3",
] as const;

function panelNavSlot(action: MidiBuiltinActionKey): MidiLaunchSlot {
  return { action, mode: "momentary", ledStyle: "accent" };
}

function applyPanelNavAutomap(
  slots: Record<string, MidiLaunchSlot | undefined>,
  slotIds: readonly string[],
): void {
  for (let i = 0; i < slotIds.length; i++) {
    slots[slotIds[i]!] = panelNavSlot(PANEL_NAV_ACTIONS[i]!);
  }
}

/** Map LCXL left column to Audio, Playset, and sidebar menu. */
export function applyLaunchControlLeftNavAutomap(
  slots: Record<string, MidiLaunchSlot | undefined>,
): void {
  applyPanelNavAutomap(slots, LAUNCH_CONTROL_LEFT_NAV_SLOTS);
}

/** Map Launchpad Mini right column (top → bottom) to Audio, Playset, and sidebar menu. */
export function applyLaunchpadMiniRightNavAutomap(
  slots: Record<string, MidiLaunchSlot | undefined>,
): void {
  applyPanelNavAutomap(slots, LAUNCHPAD_MINI_RIGHT_NAV_SLOTS);
}
