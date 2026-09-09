/**
 * String — a single edge-to-edge cable drawn as a graph SDF.
 * Tension pulls sag out and raises the standing-wave pitch; endpoints stay
 * pinned (sin² envelope) so the curve never kinks at the frame edge.
 * Inlined: hydra-synth forbids nested GLSL helpers.
 */
export const STRING_LAYER_COLOR_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  float tns = clamp(tension, 0.0, 1.0);
  float pos = clamp(position, 0.0, 1.0);
  float horiz = 1.0 - step(0.5, orientation);
  vec2 uv = gl_FragCoord.xy / max(resolution.xy, vec2(1.0));
  float along = mix(uv.y, uv.x, horiz);
  float across = mix(uv.x, uv.y, horiz);

  float PI = 3.14159265;
  float env = sin(along * PI);
  float env2 = env * env;
  float sag = (1.0 - tns) * 0.28;
  float rest = pos + sag * env2;

  float omega = mix(3.4, 15.5, tns);
  float amp = mix(0.09, 0.014, tns);
  float harm = clamp(harmonics, 1.0, 5.0);
  float h2 = step(1.5, harm);
  float h3 = step(2.5, harm);

  float ph1 = along * PI + time * omega;
  float ph2 = along * PI * 2.0 - time * omega * 1.27;
  float ph3 = along * PI * 3.0 + time * omega * 0.71;
  float w1 = sin(ph1);
  float w2 = sin(ph2);
  float w3 = sin(ph3);
  float waves = w1 + w2 * 0.36 * h2 + w3 * 0.16 * h3;
  float y = rest + amp * env * waves;

  float dEnv = PI * cos(along * PI);
  float dSag = sag * 2.0 * env * dEnv;
  float dw1 = PI * cos(ph1);
  float dw2 = 2.0 * PI * cos(ph2);
  float dw3 = 3.0 * PI * cos(ph3);
  float dWaves = dw1 + dw2 * 0.36 * h2 + dw3 * 0.16 * h3;
  float dy = dSag + amp * (dEnv * waves + env * dWaves);
  float dist = abs(across - y) / sqrt(1.0 + dy * dy);

  float aspect = resolution.x / max(1.0, resolution.y);
  float thScale = mix(aspect, 1.0, horiz);
  float th = mix(0.0016, 0.016, clamp(thickness, 0.0, 1.0)) * thScale;
  float aa = 1.6 / max(resolution.y, 1.0);
  float core = 1.0 - smoothstep(th, th + aa, dist);
  float g = clamp(glow, 0.0, 1.0);
  float halo = exp(-dist * mix(26.0, 78.0, tns)) * g;
  float line = clamp(core + halo * 0.9, 0.0, 1.0) * a;

  vec3 col = vec3(cr, cg, cb);
  vec3 lit = col * (1.0 + g * 1.15);
  vec3 outc = mix(_c0.rgb, lit, line);
  return vec4(outc, _c0.a);
`;
