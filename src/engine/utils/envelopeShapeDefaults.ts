import type { TriggerEaseOutShape } from "../types/settings";
import { DEFAULT_EASE_OUT_SHAPE } from "./triggerEnvelopeCurve";

export const ENVELOPE_SHAPE_DEFAULTS = {
  attack: 0,
  hold: 0,
  release: 0,
  decay: 20,
  easeShape: DEFAULT_EASE_OUT_SHAPE as TriggerEaseOutShape,
} as const;
