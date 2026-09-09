/** Additive neon line overlay — _c1 is the scrolling line canvas (src). */
export const NEON_GRID_OVERLAY_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;
  vec3 neon = _c1.rgb;
  float lum = max(max(neon.r, neon.g), neon.b);
  vec3 boosted = neon * (1.0 + glow * 1.8);
  float mixAmt = clamp(lum * a * (0.75 + glow * 0.35), 0.0, 1.0);
  return vec4(max(_c0.rgb, mix(_c0.rgb, boosted, mixAmt)), _c0.a);
`;
