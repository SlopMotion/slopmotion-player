/** Bright-pixel extract for directional streak compositing. */
export const HIT_STREAK_EXTRACT_GLSL = `
  vec3 w = vec3(0.299, 0.587, 0.114);
  float thr = mix(0.12, 0.88, clamp(threshold, 0.0, 1.0));
  float knee = mix(0.07, 0.018, clamp(thinness, 0.0, 1.0));
  float luma = dot(_c0.rgb, w);
  float hi = smoothstep(thr, thr + knee, luma);
  hi = pow(hi, mix(1.6, 0.75, clamp(thinness, 0.0, 1.0)));
  return vec4(_c0.rgb * hi, hi);
`;
