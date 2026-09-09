/**
 * Resynthesize — the chain re-reads its own previous output and mutates it
 * again every frame, so the image compounds instead of being rebuilt from the
 * source. Eight mutation operators sit at the compass points of a morph pad:
 * the X/Y angle picks the flavour (blending the two nearest operators) and the
 * distance from the centre sets how hard it pushes. Dead centre is clean
 * feedback with no mutation.
 *
 * Per-frame pushes are deliberately tiny — feedback compounds them across every
 * frame the trail survives, so a "small" warp here reads as a large drift.
 * All math is inlined: hydra-synth forbids nested GLSL function definitions.
 */

const PAD_REACH = `
  vec2 pad = vec2(clamp(x, 0.0, 1.0), clamp(y, 0.0, 1.0)) - 0.5;
  float reach = clamp(length(pad) * 2.0, 0.0, 1.0);
`;

/** Eight-operator coordinate mutation, crossfaded by the morph pad angle. */
export const RESYNTH_WARP_GLSL = `${PAD_REACH}
  if (reach < 0.004) return _st;

  float aspect = resolution.x / max(1.0, resolution.y);
  vec2 p = _st - 0.5;
  p.x *= aspect;
  float rad = length(p);
  vec2 dir = p / max(rad, 0.0001);
  float padAng = atan(pad.y, pad.x);

  vec2 push = vec2(0.0);
  for (int i = 0; i < 8; i++) {
    float opAng = float(i) * 0.78539816;
    float delta = abs(mod(padAng - opAng + 3.14159265, 6.28318531) - 3.14159265);
    float w = 1.0 - delta / 0.78539816;
    if (w <= 0.0) continue;

    vec2 t = p;
    if (i == 0) {
      t = p * 0.97;
    } else if (i == 1) {
      t = p + dir * sin(rad * 22.0 - time * 2.2) * 0.014;
    } else if (i == 2) {
      float s = 0.06 * (1.0 - min(rad, 1.0));
      t = vec2(p.x * cos(s) - p.y * sin(s), p.x * sin(s) + p.y * cos(s));
    } else if (i == 3) {
      t = mix(p, abs(p) - 0.18, 0.07);
    } else if (i == 4) {
      t = p * 1.03;
    } else if (i == 5) {
      t = mix(p, floor(p * 14.0) / 14.0, 0.09);
    } else if (i == 6) {
      float s = -0.06 * (1.0 - min(rad, 1.0));
      t = vec2(p.x * cos(s) - p.y * sin(s), p.x * sin(s) + p.y * cos(s));
    } else {
      t = p + vec2(0.011, 0.006);
    }
    push += (t - p) * w;
  }

  vec2 outP = p + push * reach;
  outP.x /= aspect;
  return outP + 0.5;
`;

/** Per-iteration hue drift and decay — keeps the compounding image evolving. */
export const RESYNTH_TINT_GLSL = `${PAD_REACH}
  vec3 c = _c0.rgb;
  float hueK = clamp(hue, 0.0, 1.0);
  float shift = hueK * (0.1 + reach * 0.9) * 0.02;
  float luma = dot(c, vec3(0.299, 0.587, 0.114));

  if (shift > 0.00001) {
    float yp = luma;
    float iq1 = dot(c, vec3(0.596, -0.275, -0.321));
    float iq2 = dot(c, vec3(0.212, -0.523, 0.311));
    float chroma = sqrt(iq1 * iq1 + iq2 * iq2);
    float hAng = atan(iq2, iq1) + shift * 6.28318531;
    iq1 = chroma * cos(hAng);
    iq2 = chroma * sin(hAng);
    c = vec3(
      yp + 0.9563 * iq1 + 0.6210 * iq2,
      yp - 0.2721 * iq1 - 0.6474 * iq2,
      yp - 1.1070 * iq1 + 1.7046 * iq2
    );
  }

  // Rotation alone is a no-op on greyscale footage, so seed chroma from luma —
  // the triad sums to ~0, keeping brightness (and pure black) intact.
  float phase = time * 0.15 + reach * 2.0;
  vec3 triad = vec3(sin(phase), sin(phase + 2.0944), sin(phase + 4.1888));
  c += triad * (hueK * 0.06 * luma);

  c *= 1.0 - clamp(decay, 0.0, 1.0) * 0.06;
  return vec4(clamp(c, 0.0, 1.0), _c0.a);
`;
