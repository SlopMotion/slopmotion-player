/** Fold UVs that walk off-frame back in as a mirror — identity inside 0..1. */
export const BLUR_MIRROR_UV_GLSL = `
  vec2 t = _st - 2.0 * floor(_st * 0.5);
  t = mix(t, 2.0 - t, step(1.0, t));
  vec2 inset = 0.5 / max(resolution.xy, vec2(1.0));
  return clamp(t, inset, 1.0 - inset);
`;

/** Shared wrap used by noise scatter (hydra-synth cannot nest helper functions). */
const BLUR_MIRROR_WRAP_INLINE = `
  vec2 tB = stB - 2.0 * floor(stB * 0.5);
  tB = mix(tB, 2.0 - tB, step(1.0, tB));
  vec2 insetB = 0.5 / max(resolution.xy, vec2(1.0));
  stB = clamp(tB, insetB, 1.0 - insetB);
`;

/** Frosted noise blur — simplified fractal noise UV scatter (from Normal Map noise mode). */

export const BLUR_NOISE_DISTORT_GLSL = `
  float a = clamp(amount, 0.0, 2.0);
  if (a < 0.00001) return _st;

  float aspectN = resolution.x / max(1.0, resolution.y);
  float epsN = 2.0 / min(resolution.x, resolution.y);
  vec2 uvN = _st;
  uvN.x *= aspectN;
  vec2 pN = uvN;
  float scN = max(2.0, scale);
  float tN = time * max(0.0, speed);

  vec2 qC = pN * scN;
  float n0 = fract(sin(dot(qC + vec2(tN * 0.31, tN * 0.17), vec2(127.1, 311.7))) * 43758.5453);
  float n1 = fract(sin(dot(qC * 2.13 + vec2(4.1, tN * 0.23), vec2(127.1, 311.7))) * 43758.5453);
  float n2 = fract(sin(dot(qC * 4.07 - vec2(2.3, tN * 0.19), vec2(127.1, 311.7))) * 43758.5453);
  float hC = (n0 + n1 * 0.5 + n2 * 0.25) / 1.75;

  vec2 pX = pN + vec2(epsN, 0.0);
  vec2 qX = pX * scN;
  float nx0 = fract(sin(dot(qX + vec2(tN * 0.31, tN * 0.17), vec2(127.1, 311.7))) * 43758.5453);
  float nx1 = fract(sin(dot(qX * 2.13 + vec2(4.1, tN * 0.23), vec2(127.1, 311.7))) * 43758.5453);
  float nx2 = fract(sin(dot(qX * 4.07 - vec2(2.3, tN * 0.19), vec2(127.1, 311.7))) * 43758.5453);
  float hX = (nx0 + nx1 * 0.5 + nx2 * 0.25) / 1.75;

  vec2 pY = pN + vec2(0.0, epsN);
  vec2 qY = pY * scN;
  float ny0 = fract(sin(dot(qY + vec2(tN * 0.31, tN * 0.17), vec2(127.1, 311.7))) * 43758.5453);
  float ny1 = fract(sin(dot(qY * 2.13 + vec2(4.1, tN * 0.23), vec2(127.1, 311.7))) * 43758.5453);
  float ny2 = fract(sin(dot(qY * 4.07 - vec2(2.3, tN * 0.19), vec2(127.1, 311.7))) * 43758.5453);
  float hY = (ny0 + ny1 * 0.5 + ny2 * 0.25) / 1.75;

  vec2 offset = vec2(hC - hX, hC - hY) * a * 0.11;
  offset.x /= aspectN;
  vec2 stB = _st + offset;
  ${BLUR_MIRROR_WRAP_INLINE}
  return stB;
`;
