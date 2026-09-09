/** Recirculated-frame grade: one balance knob drives luma brightness + contrast. */
export const FEEDBACK_BALANCE_BRIGHTNESS = 0.16;
export const FEEDBACK_BALANCE_CONTRAST = 0.45;

/** Map 0–1 balance (0.5 = identity) to luma brightness and contrast. */
export function feedbackBalanceGrade(balance: number): { brightness: number; contrast: number } {
  const bal = Math.max(0, Math.min(1, balance));
  const shift = (bal - 0.5) * 2;
  return {
    brightness: shift * FEEDBACK_BALANCE_BRIGHTNESS,
    contrast: 1 + Math.abs(shift) * FEEDBACK_BALANCE_CONTRAST,
  };
}

export function clampFeedbackLuminosity(luminosity: number): number {
  if (!Number.isFinite(luminosity)) return 0;
  return Math.max(-1, Math.min(1, luminosity));
}

/** Luma-only grade — no hue shift. Balance crushes/blooms; luminosity lifts or fades. */
export const FEEDBACK_GRADE_GLSL = `
  float bal = clamp(balance, 0.0, 1.0);
  float lum = clamp(luminosity, -1.0, 1.0);
  if (abs(bal - 0.5) < 0.00001 && abs(lum) < 0.00001) return _c0;

  float shift = (bal - 0.5) * 2.0;
  float brightness = shift * ${FEEDBACK_BALANCE_BRIGHTNESS.toFixed(2)};
  float contrast = 1.0 + abs(shift) * ${FEEDBACK_BALANCE_CONTRAST.toFixed(2)};

  vec3 w = vec3(0.2126, 0.7152, 0.0722);
  float luma = dot(_c0.rgb, w);
  float graded = clamp((luma - 0.5) * contrast + 0.5 + brightness + lum, 0.0, 1.0);
  return vec4(clamp(_c0.rgb + vec3(graded - luma), 0.0, 1.0), _c0.a);
`;
