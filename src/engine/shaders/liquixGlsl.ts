/** Horizontal band smear / liquid warp — ParVagues signature effect. */
export const LIQUIX_COORD_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;
  float pv = clamp(pivot, 0.05, 0.95);
  float rowBands = max(6.0, bands);
  float sp = max(0.0, speed);
  vec2 st = _st;
  float row = floor(st.y * rowBands);
  float rib = fract(sin(row * 12.9898 + 78.233) * 43758.5453);
  float side = smoothstep(pv - 0.11, pv + 0.04, st.x);
  float wobble = sin(st.y * 6.2831853 * 15.0 + time * sp * 2.6) * 0.5 + 0.5;
  float smear = side * a * (0.045 + 0.16 * wobble + 0.11 * rib);
  float xPush = smear * (1.0 + max(0.0, st.x - pv) * 1.35 * side);
  st.x = clamp(st.x + xPush + (rib - 0.5) * side * a * 0.085, 0.001, 0.999);
  return st;
`;
