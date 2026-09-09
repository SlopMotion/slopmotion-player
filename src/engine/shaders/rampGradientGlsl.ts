/** Luma remap through up to six HSL stops. Optional cycle scrolls the ramp. */

export const RAMP_GRADIENT_CYCLE_RATE = 0.25;

export const RAMP_GRADIENT_GLSL = `
  if (amount < 0.00001) return _c0;
  float lt = dot(_c0.rgb, vec3(0.299, 0.587, 0.114));
  if (animate > 0.5) {
    lt = fract(lt + fract(time * max(0.0, speed) * ${RAMP_GRADIENT_CYCLE_RATE.toFixed(2)}));
  }
  float n = clamp(stopCount, 2.0, 6.0);
  vec3 mapped = vec3(r0, g0, b0);
  if (lt > p0) {
    mapped = mix(vec3(r0, g0, b0), vec3(r1, g1, b1), clamp((lt - p0) / max(1e-5, p1 - p0), 0.0, 1.0));
  }
  if (n > 2.5 && lt > p1) {
    mapped = mix(vec3(r1, g1, b1), vec3(r2, g2, b2), clamp((lt - p1) / max(1e-5, p2 - p1), 0.0, 1.0));
  }
  if (n > 3.5 && lt > p2) {
    mapped = mix(vec3(r2, g2, b2), vec3(r3, g3, b3), clamp((lt - p2) / max(1e-5, p3 - p2), 0.0, 1.0));
  }
  if (n > 4.5 && lt > p3) {
    mapped = mix(vec3(r3, g3, b3), vec3(r4, g4, b4), clamp((lt - p3) / max(1e-5, p4 - p3), 0.0, 1.0));
  }
  if (n > 5.5 && lt > p4) {
    mapped = mix(vec3(r4, g4, b4), vec3(r5, g5, b5), clamp((lt - p4) / max(1e-5, p5 - p4), 0.0, 1.0));
  }
  return vec4(mix(_c0.rgb, mapped, clamp(amount, 0.0, 1.0)), _c0.a);
`;
