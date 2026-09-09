/** Photoshop-style overlay blend — _c0 base, _c1 layer. */
export const LAYER_OVERLAY_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec3 base = _c0.rgb;
  vec3 blend = _c1.rgb;
  vec3 overlay = mix(
    2.0 * base * blend,
    1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
    step(0.5, base)
  );
  return vec4(mix(base, overlay, a), _c0.a);
`;
