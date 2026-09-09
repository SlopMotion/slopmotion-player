/**
 * Grid Shuffle — split the frame into a square tile grid and remap tiles
 * via a seeded LCG permutation. Flat GLSL only (no nested functions).
 */

export const GRID_SHUFFLE_DISTORT_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;

  float g = max(2.0, floor(cells + 0.5));
  float chaosAmt = clamp(chaos, 0.0, 1.0);
  float s = seed + 1.0;

  vec2 grid = vec2(g);
  vec2 cell = floor(_st * grid);
  vec2 local = fract(_st * grid);
  float idx = cell.y * g + cell.x;
  float n = g * g;

  float odd = 2.0 * floor(fract(s * 0.6180339887) * 47.0) + 1.0;
  float off = floor(fract(s * 0.3819660113) * n);
  float shuffled = mod(idx * odd + off, n);

  float h = fract(sin((idx + 1.7) * 12.9898 + s * 78.233) * 43758.5453);
  float srcIdx = mix(idx, shuffled, step(h, chaosAmt));

  vec2 srcCell = vec2(mod(srcIdx, g), floor(srcIdx / g));
  vec2 srcUv = (srcCell + local) / grid;
  return mix(_st, clamp(srcUv, 0.001, 0.999), a);
`;
