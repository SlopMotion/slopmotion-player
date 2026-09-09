/** Additive star canvas overlay — _c1 is the star feedback buffer (src). */
export const THROUGH_THE_STARS_OVERLAY_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;
  vec3 stars = _c1.rgb;
  float lum = max(max(stars.r, stars.g), stars.b);
  vec3 boosted = stars * (1.0 + glow * 2.2);
  float mixAmt = clamp(lum * a * (0.8 + glow * 0.45), 0.0, 1.0);
  return vec4(max(_c0.rgb, mix(_c0.rgb, boosted, mixAmt)), _c0.a);
`;
