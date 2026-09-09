/** Local emissive core — used when the multi-tap bloom aura is off. */
export const GLOW_COLOR_GLSL = `
  vec4 c = _c0;
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return c;

  vec3 w = vec3(0.2126, 0.7152, 0.0722);
  float luma = dot(c.rgb, w);
  float peak = max(c.r, max(c.g, c.b));
  float bright = mix(luma, peak, 0.55);

  float thr = mix(0.18, 0.78, clamp(threshold, 0.0, 1.0));
  float knee = mix(0.10, 0.28, clamp(bloom, 0.0, 1.0));
  float mask = smoothstep(max(thr - knee, 0.0), thr + knee, bright);
  mask *= mix(0.55, mask, 0.45);

  vec3 lifted = c.rgb + c.rgb * mask * a * mix(0.45, 1.05, clamp(bloom, 0.0, 1.0));
  c.rgb = lifted / (vec3(1.0) + max(lifted - vec3(1.0), vec3(0.0)) * 0.55);
  return c;
`;

/** Soft-knee highlight extract for the bloom kernel. */
export const GLOW_HIGHLIGHT_GLSL = `
  vec3 w = vec3(0.2126, 0.7152, 0.0722);
  float luma = dot(_c0.rgb, w);
  float peak = max(_c0.r, max(_c0.g, _c0.b));
  float bright = mix(luma, peak, 0.55);

  float thr = mix(0.18, 0.78, clamp(threshold, 0.0, 1.0));
  float knee = mix(0.10, 0.28, clamp(bloom, 0.0, 1.0));
  float mask = smoothstep(max(thr - knee, 0.0), thr + knee, bright);
  mask *= mix(0.55, mask, 0.45);
  return vec4(_c0.rgb * mask, mask);
`;

/** Additive halo — dark neighbors take the bloom; highlights roll off instead of clipping. */
export const GLOW_BLOOM_ADD_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;
  vec3 bloom = _c1.rgb;
  vec3 room = vec3(1.0) - clamp(_c0.rgb, 0.0, 1.0) * 0.38;
  vec3 outRgb = _c0.rgb + bloom * a * room;
  outRgb = outRgb / (vec3(1.0) + max(outRgb - vec3(1.0), vec3(0.0)) * 0.5);
  return vec4(outRgb, _c0.a);
`;
