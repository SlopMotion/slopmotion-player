/** Alpha-composited typography overlay — _c1 is the text canvas (src). */
export const TEXT_LAYER_OVERLAY_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;
  vec4 t = _c1;
  float alpha = clamp(t.a * a, 0.0, 1.0);
  if (alpha < 0.00001) return _c0;
  vec3 col = t.rgb;
  float g = clamp(glow, 0.0, 1.0);
  vec3 lit = col * (1.0 + g * 1.8);
  vec3 outRgb = mix(_c0.rgb, lit, alpha);
  outRgb = max(outRgb, col * alpha * g * 0.42);
  return vec4(outRgb, _c0.a);
`;
