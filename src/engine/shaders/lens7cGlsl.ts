import {
  LENS_7C_FACETS,
  LENS_7C_HUE_ORIGIN,
  LENS_7C_REACH_PHASE,
  LENS_7C_REACH_WOBBLE,
  LENS_7C_TAPS,
  LENS_7C_TINT_ONSET,
} from "../utils/lens7cPrism";

/**
 * Each facet only refracts the sliver of the frame that lies behind it, so the
 * seven arms rarely reinforce each other. The gain lifts that thin signal back
 * to flare strength before the screen blend caps it.
 */
export const LENS_7C_FLARE_GAIN = 2.4;

/**
 * Walks back along each facet axis looking for highlights, and paints whatever
 * it finds forward as a tinted arm. Reading `prismTex` (the chain so far) rather
 * than `_c0` is what lets one pass gather all seven refractions.
 */
export const LENS_7C_PRISM_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec2 res = max(resolution.xy, vec2(1.0));
  vec2 uv = gl_FragCoord.xy / res;
  float aspect = res.x / max(res.y, 1.0);
  float thr = mix(0.06, 0.92, clamp(threshold, 0.0, 1.0));
  float ring = rotation * 6.2831853;

  vec3 fan = vec3(0.0);

  for (int f = 0; f < ${LENS_7C_FACETS}; f++) {
    float fi = float(f);
    float turn = fi / ${LENS_7C_FACETS}.0;
    float seat = ring + turn * 6.2831853;
    vec2 axis = vec2(cos(seat) / aspect, sin(seat));
    float reach = 1.0 - ${LENS_7C_REACH_WOBBLE.toFixed(3)} * 0.5 * (1.0 - cos(fi * ${LENS_7C_REACH_PHASE.toFixed(3)}));

    float hue = fract(${LENS_7C_HUE_ORIGIN.toFixed(3)} + turn);
    vec3 tint = clamp(abs(mod(hue * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    tint = tint * tint * (3.0 - 2.0 * tint);

    vec3 arm = vec3(0.0);
    float weightSum = 0.0;
    for (int t = 1; t <= ${LENS_7C_TAPS}; t++) {
      float march = float(t) / ${LENS_7C_TAPS}.0;
      vec2 tap = uv - axis * (throwLen * reach * march);
      vec3 c = texture2D(prismTex, clamp(tap, vec2(0.0), vec2(1.0))).rgb;
      float bright = max(c.r, max(c.g, c.b));
      float spark = smoothstep(thr, thr + 0.22, bright) * bright;
      // Weighting the far taps hardest lands a recognisable ghost of the source
      // at the end of each arm, rather than smearing it evenly along the way.
      float weight = 0.22 + 0.78 * smoothstep(0.3, 1.0, march);
      float bleed = smoothstep(0.0, ${LENS_7C_TINT_ONSET.toFixed(3)}, march);
      arm += mix(vec3(1.0), tint, bleed) * (spark * weight);
      weightSum += weight;
    }
    fan += arm / max(weightSum, 0.0001);
  }
  fan /= ${LENS_7C_FACETS}.0;

  vec3 base = clamp(_c0.rgb, 0.0, 1.0);
  vec3 flare = clamp(fan * (a * ${LENS_7C_FLARE_GAIN.toFixed(2)}), 0.0, 1.0);
  vec3 lit = vec3(1.0) - (vec3(1.0) - base) * (vec3(1.0) - flare);

  float hz = clamp(haze, 0.0, 1.0);
  float luma = dot(base, vec3(0.2126, 0.7152, 0.0722));
  lit += fan * (hz * a * 1.8) * (1.0 - luma);

  return vec4(clamp(lit, 0.0, 1.0), _c0.a);
`;
