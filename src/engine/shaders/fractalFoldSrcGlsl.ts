/**
 * Fractal Fold — kaleidoscopic IFS generator built on the Kali inversion fold
 * `z = abs(z) / dot(z, z) - fold`, the family behind most "alien fractal" scenes
 * in Synesthesia / Shadertoy.
 *
 * The fold constant is a bifurcation knob: a few hundredths restructures the whole
 * form instead of only brightening it, which is what makes it worth driving from
 * audio. `foldX` / `foldY` are therefore the headline reactive params.
 *
 * Flat GLSL for Hydra src registration (no nested functions).
 */

export const FRACTAL_FOLD_MIN_DEPTH = 3;
export const FRACTAL_FOLD_MAX_DEPTH = 16;

/** Iteration count is a hard shader loop bound — snap to whole steps inside the range. */
export function snapFractalFoldDepth(raw: number): number {
  if (!Number.isFinite(raw)) return FRACTAL_FOLD_MIN_DEPTH;
  const rounded = Math.round(raw);
  if (rounded < FRACTAL_FOLD_MIN_DEPTH) return FRACTAL_FOLD_MIN_DEPTH;
  if (rounded > FRACTAL_FOLD_MAX_DEPTH) return FRACTAL_FOLD_MAX_DEPTH;
  return rounded;
}

export const FRACTAL_FOLD_SRC_GLSL = `
  vec2 res = resolution.xy;
  vec2 uv = (gl_FragCoord.xy * 2.0 - res) / max(1.0, res.y);

  float t = time * max(0.0, speed);
  float boost = clamp(audioBoost, 0.0, 1.5);

  vec2 z = uv * (1.25 / clamp(zoomFactor, 0.25, 3.0));

  float drift = 0.09 * t;
  float dc = cos(drift);
  float ds = sin(drift);
  z = mat2(dc, -ds, ds, dc) * z;
  z += 0.12 * vec2(sin(t * 0.21), cos(t * 0.17));

  vec2 fold = vec2(clamp(foldX, 0.30, 1.70), clamp(foldY, 0.30, 1.70));
  fold += 0.08 * boost;
  fold += 0.010 * vec2(sin(t * 0.37), cos(t * 0.31));

  float spinStep = clamp(spin, -1.6, 1.6);
  float sc = cos(spinStep);
  float ss = sin(spinStep);
  mat2 spinRot = mat2(sc, -ss, ss, sc);

  float iterations = clamp(iterDepth, 3.0, 16.0);
  float glowPow = clamp(glow, 0.25, 2.5);

  // Trap thresholds track the iteration count: orbit minima shrink as the orbit
  // gets longer, so a fixed threshold would flood the frame white at high depth.
  float density = iterations / 10.0;
  float axisK = 150.0 * density / glowPow;
  float radiusK = 26.0 * density;
  float stepK = 34.0 * density;

  // Soft minima rather than a hard min: neighbouring pixels often land in
  // different iteration basins, and a hard min turns that into per-pixel speckle.
  float axisAcc = 0.0;
  float radiusAcc = 0.0;
  float stepAcc = 0.0;
  float radiusSum = 0.0;
  float weightSum = 0.0;

  for (int i = 0; i < 16; i++) {
    float active = step(float(i), iterations - 0.5);

    vec2 prev = z;
    vec2 q = abs(z);
    q = spinRot * q;
    q = q / max(dot(q, q), 5.0e-4) - fold;
    q = clamp(q, -24.0, 24.0);
    z = mix(z, q, active);

    // Early folds draw the large smooth arcs; deep folds are sub-pixel and only
    // read as speckle, so their contribution decays.
    float w = exp(-float(i) * 0.24) * active;
    float radius = length(z);
    axisAcc += exp(-axisK * min(abs(z.x), abs(z.y))) * w;
    radiusAcc += exp(-radiusK * radius) * w;
    stepAcc += exp(-stepK * abs(length(z - prev) - 0.9)) * w;
    radiusSum += min(radius, 4.0) * w;
    weightSum += w;
  }

  // Hue follows the orbit's mean radius: a smooth field, so colour forms coherent
  // regions instead of the per-pixel confetti a hard-min trap produces.
  float orbitRadius = radiusSum / max(weightSum, 1.0e-3);

  float filament = 1.0 - exp(-axisAcc * 1.8);
  float shell = 1.0 - exp(-stepAcc * 0.8);
  float core = 1.0 - exp(-radiusAcc * 1.3);

  float lum = filament * 1.0 + shell * 0.30 + core * 0.85;

  float phase = hueShift + 0.05 * t + 0.85 * orbitRadius + 0.25 * stepAcc;
  vec3 pal = 0.5 + 0.5 * cos(6.2831853 * (phase + vec3(0.0, 0.33, 0.67)));

  vec3 col = pal * lum;
  col += vec3(0.55, 0.75, 1.0) * core * core * 0.5;
  col *= 1.0 + 0.8 * boost;
  col = vec3(1.0) - exp(-col * (1.6 + 0.8 * glowPow));
  col = clamp(col, 0.0, 1.0);

  vec2 g = gl_FragCoord.xy / res;
  col *= 0.74 + 0.26 * pow(max(16.0 * g.x * g.y * (1.0 - g.x) * (1.0 - g.y), 0.0), 0.30);

  return vec4(col, 1.0);
`;
