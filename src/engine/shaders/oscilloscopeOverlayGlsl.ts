/** Soft additive phosphor overlay — _c1 is the scrolling spectrum canvas (keeps RGB). */
export const OSCILLOSCOPE_OVERLAY_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;
  float g = clamp(glow, 0.0, 1.0);
  vec3 src = _c1.rgb;
  float lum = max(max(src.r, src.g), src.b);
  // Preserve canvas hue; glow only boosts energy (do not collapse to grayscale).
  vec3 boosted = src * (1.0 + g * 1.6);
  float mixAmt = clamp(lum * a * (0.7 + g * 0.4), 0.0, 1.0);
  return vec4(max(_c0.rgb, mix(_c0.rgb, boosted, mixAmt)), _c0.a);
`;
