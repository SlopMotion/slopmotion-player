/** Iterative plasma field (Shadertoy-style) — flat GLSL for Hydra src registration. */
export const PLASMA_SRC_GLSL = `
  vec2 res = resolution.xy;
  vec2 p = gl_FragCoord.xy;
  float sc = 0.2 * max(0.25, scale);
  p = sc * (p + p - res) / res.y;

  vec4 z = vec4(1.0, 2.0, 3.0, 0.0);
  vec4 acc = z;
  vec2 v = res;
  float a = 0.5;
  float t = time * max(0.0, speed);
  float grow = 0.03 * max(0.35, complexity);

  for (int i = 0; i < 19; i++) {
    float fi = float(i);
    float bowl = 0.5 - dot(p, p);
    float divBowl = abs(bowl) < 1.0e-4 ? (bowl >= 0.0 ? 1.0e-4 : -1.0e-4) : bowl;
    vec2 denomVec = (1.0 + fi * dot(v, v))
      * sin(1.5 * p / divBowl - 9.0 * p.yx + t);
    acc += (1.0 + cos(z + t)) / max(length(denomVec), 1.0e-4);

    t += 1.0;
    a += grow;
    v = cos(t - 7.0 * p * pow(a, fi)) - 5.0 * p;

    vec4 rotArg = cos(vec4(fi + 0.02 * t) - z.wxzw * 11.0);
    mat2 rot = mat2(rotArg);
    p = rot * p;
    vec2 tx = clamp(40.0 * dot(p, p) * cos(100.0 * p.yx + t), -10.0, 10.0);
    vec2 e2x = exp(2.0 * tx);
    vec2 tanhTx = (e2x - 1.0) / (e2x + 1.0);
    float pulse = cos(4.0 / exp(dot(acc, acc) / 100.0) + t) / 300.0;
    p += tanhTx / 200.0 + 0.2 * a * p + vec2(pulse);
  }

  acc = 25.6 / (min(acc, vec4(13.0)) + 164.0 / max(acc, vec4(1.0e-4)));
  vec3 col = acc.rgb - dot(p, p) / 250.0;
  col = clamp(col, 0.0, 1.0);

  return vec4(col, 1.0);
`;
