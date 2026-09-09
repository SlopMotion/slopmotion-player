/** Canvas particle overlay — _c1 is the luma dust layer (src). */
export const LUMA_DUST_OVERLAY_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec3 dust = _c1.rgb;
  float lum = max(max(dust.r, dust.g), dust.b);
  if (lum < 0.0008) return _c0;

  float mixAmt = clamp(lum * a * 1.22, 0.0, 1.0);
  return vec4(max(_c0.rgb, mix(_c0.rgb, dust * 1.4, mixAmt)), _c0.a);
`;
