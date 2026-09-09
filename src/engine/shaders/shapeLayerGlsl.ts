/**
 * Shape Layer — a signed-distance vector primitive drawn over the chain.
 *
 * The distance field carries alpha so Layer mode composites the shape on top of
 * the video instead of tinting the whole frame; the other blend modes read the
 * masked RGB. Roundness shrinks the primitive before growing the field back so
 * corners soften without the shape changing size. Outline stroke is centered
 * on the path; Fill keeps the original sharp field and insets the stroke so
 * convex corners stay square.
 * Position is read from Hydra `_st` (not `gl_FragCoord`) so later chain FX —
 * kaleid, warp, grade — see the shape in the same buffer UV as the clip.
 * SDF math follows the standard IQ primitives, inlined because hydra-synth
 * forbids nested GLSL function definitions.
 */
export const SHAPE_LAYER_SRC_GLSL = `
  float aspect = resolution.x / max(1.0, resolution.y);
  vec2 p = _st;
  p -= vec2(clamp(centerX, 0.0, 1.0), clamp(centerY, 0.0, 1.0));
  p.x *= aspect;

  float turn = rotate * 6.28318531;
  float ca = cos(turn);
  float sa = sin(turn);
  p = vec2(p.x * ca - p.y * sa, p.x * sa + p.y * ca);

  float sz = max(0.02, size) * 0.5;
  float rnd = clamp(roundness, 0.0, 1.0) * sz * 0.4;
  float rs = max(0.01, sz - rnd);
  float pick = floor(clamp(shape, 0.0, 4.0) + 0.5);
  float d = length(p) - rs;

  if (pick > 3.5) {
    vec2 k1 = vec2(0.809016994, -0.587785252);
    vec2 k2 = vec2(-0.809016994, -0.587785252);
    vec2 q = vec2(abs(p.x), p.y);
    q -= 2.0 * max(dot(k1, q), 0.0) * k1;
    q -= 2.0 * max(dot(k2, q), 0.0) * k2;
    q.x = abs(q.x);
    q.y -= rs;
    vec2 ba = 0.45 * vec2(-k1.y, k1.x) - vec2(0.0, 1.0);
    float h = clamp(dot(q, ba) / dot(ba, ba), 0.0, rs);
    d = length(q - ba * h) * sign(q.y * ba.x - q.x * ba.y);
  } else if (pick > 2.5) {
    vec2 k = vec2(-0.866025404, 0.5);
    vec2 q = abs(p);
    q -= 2.0 * min(dot(k, q), 0.0) * k;
    q -= vec2(clamp(q.x, -0.577350269 * rs, 0.577350269 * rs), rs);
    d = length(q) * sign(q.y);
  } else if (pick > 1.5) {
    vec2 q = p;
    q.x = abs(q.x) - rs;
    q.y = q.y + rs / 1.7320508;
    if (q.x + 1.7320508 * q.y > 0.0) {
      q = vec2(q.x - 1.7320508 * q.y, -1.7320508 * q.x - q.y) * 0.5;
    }
    q.x -= clamp(q.x, -2.0 * rs, 0.0);
    d = -length(q) * sign(q.y);
  } else if (pick > 0.5) {
    vec2 q = abs(p) - rs;
    d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
  }

  d -= rnd;

  float sw = clamp(stroke, 0.0, 1.0);
  float useFill = step(0.5, shapeFill);
  if (sw > 0.001) {
    float strokeW = sw * sz * 0.3;
    float middle = abs(d) - strokeW;
    d = mix(middle, d, useFill);
  }

  float aa = 1.6 / max(1.0, resolution.y);
  float mask = 1.0 - smoothstep(-aa, aa, d);
  return vec4(vec3(cr, cg, cb) * mask, mask * clamp(opacity, 0.0, 1.0));
`;
