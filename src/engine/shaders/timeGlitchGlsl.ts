/** Mix the incoming chain with a pre-sliced, full-frame history composite. */

export const TIME_GLITCH_SLICES_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;
  vec2 uv = gl_FragCoord.xy / max(resolution.xy, vec2(1.0));
  vec4 sliced = texture2D(sliceTex, clamp(uv, 0.001, 0.999));
  return mix(_c0, sliced, a);
`;
