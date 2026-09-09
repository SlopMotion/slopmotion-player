/** Transition FX style indices (param `type`). Keep 4 = Random for saved presets. */
export const TRANSITION_STYLE = {
  fade: 0,
  zoom: 1,
  swipe: 2,
  pixelate: 3,
  random: 4,
  clap: 5,
  mask: 6,
  slide: 7,
} as const;
/** Concrete styles Random may pick (excludes Random itself). */
export const TRANSITION_RANDOM_POOL = [
  TRANSITION_STYLE.fade,
  TRANSITION_STYLE.zoom,
  TRANSITION_STYLE.swipe,
  TRANSITION_STYLE.pixelate,
  TRANSITION_STYLE.clap,
  TRANSITION_STYLE.mask,
  TRANSITION_STYLE.slide,
] as const;

export const TRANSITION_STYLE_MAX = TRANSITION_STYLE.slide;

/** Mixer grid sentinel for None. Not persisted — maps to `enabled: false`. */
export const TRANSITION_STYLE_NONE = 8;

export const TRANSITION_STYLE_UI_CHOICES = [
  TRANSITION_STYLE_NONE,
  TRANSITION_STYLE.fade,
  TRANSITION_STYLE.zoom,
  TRANSITION_STYLE.swipe,
  TRANSITION_STYLE.pixelate,
  TRANSITION_STYLE.random,
  TRANSITION_STYLE.clap,
  TRANSITION_STYLE.mask,
  TRANSITION_STYLE.slide,
] as const;

export const TRANSITION_STYLE_PARAM_LABEL =
  "Transition Style (0=Fade, 1=Zoom, 2=Swipe, 3=Pixelate, 4=Random, 5=Clap, 6=Mask, 7=Slide)";

export const TRANSITION_STYLE_UI_LABEL =
  "Transition Style (8=None, 0=Fade, 1=Zoom, 2=Swipe, 3=Pixelate, 4=Random, 5=Clap, 6=Mask, 7=Slide)";

export function transitionStyleGridValue(enabled: boolean, storedType: number): number {
  if (!enabled) return TRANSITION_STYLE_NONE;
  const t = Math.round(Number(storedType));
  if (!Number.isFinite(t) || t < 0 || t > TRANSITION_STYLE_MAX) return TRANSITION_STYLE.fade;
  return t;
}

export function persistTransitionStylePick(
  storedType: number,
  pickedType: number,
): { enabled: boolean; type: number } {
  const picked = Math.round(Number(pickedType));
  if (picked === TRANSITION_STYLE_NONE) {
    return { enabled: false, type: transitionStyleGridValue(true, storedType) };
  }
  return { enabled: true, type: transitionStyleGridValue(true, picked) };
}

export function resolveTransitionStyle(configuredType: number): number {
  const t = Math.round(Number(configuredType));
  if (!Number.isFinite(t)) return TRANSITION_STYLE.fade;
  if (t === TRANSITION_STYLE.random) {
    const pool = TRANSITION_RANDOM_POOL;
    return pool[Math.floor(Math.random() * pool.length)]!;
  }
  if (t < 0 || t > TRANSITION_STYLE_MAX) return TRANSITION_STYLE.fade;
  return t;
}

/** Clapboard scale-Y: close 0→0.5 on outgoing, open 0.5→1 on incoming. */
export function clapScaleY(mix: number, isIncoming: boolean): number {
  const m = Math.max(0, Math.min(1, mix));
  if (isIncoming) return m < 0.5 ? 0.02 : Math.max(0.02, (m - 0.5) * 2);
  return m < 0.5 ? Math.max(0.02, 1 - m * 2) : 0.02;
}

/** Peak mid-transition strength for motion-blur slides (0 at ends, 1 at center). */
export function slideBlurStrength(mix: number): number {
  const m = Math.max(0, Math.min(1, mix));
  return 1 - Math.abs(m - 0.5) * 2;
}
