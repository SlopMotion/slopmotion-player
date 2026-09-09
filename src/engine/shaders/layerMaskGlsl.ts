/** Luma mask alpha from generator (`_c1`) applied to reveal content (`_c0`) without premultiplying RGB. */
export const LAYER_MASK_ALPHA_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  float luma = dot(_c1.rgb, vec3(0.299, 0.587, 0.114));
  float thr = clamp(threshold, 0.0, 1.0);
  float soft = max(0.01, softness);
  float m = smoothstep(thr - soft, thr + soft, luma);
  if (invert > 0.5) m = 1.0 - m;
  m = mix(1.0, m, a);
  return vec4(_c0.rgb, m * _c0.a);
`;

/** Re-exported for generic layer masking — same cut semantics as Video Map mask mode. */
export { VIDEO_MAP_MASK_GLSL as LAYER_MASK_CUT_GLSL } from "./videoMapGlsl";
