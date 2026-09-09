/**
 * Ghost Flow — afterimage smear along a curl-noise flow field.
 *
 * Hydra combine ops only receive two already-sampled colors at the same UV, so
 * a luma-gated mix of current vs o0 is a no-op on slow loops. This color op
 * takes the previous ping-pong buffer as `prevTex` (sampler before amount) and
 * re-samples it along a flow so the trail is spatial, not just a dissolve.
 *
 * Sample prevTex via o0.getTexture() — never `prevBuffer`, which hydra binds to
 * the same FBO this pass writes into.
 */

export const GHOST_FLOW_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec2 uv = gl_FragCoord.xy / resolution.xy;
  float meltK = clamp(melt, 0.0, 1.0);
  float flowK = clamp(flowScale, 0.0, 1.0);
  float refreshK = clamp(refresh, 0.0, 1.0);
  float cb = clamp(chromaBleed, 0.0, 1.0);

  vec3 prev = texture2D(prevTex, uv).rgb;
  vec3 lumW = vec3(0.299, 0.587, 0.114);
  float l0 = dot(_c0.rgb, lumW);
  float l1 = dot(prev, lumW);
  float motion = abs(l0 - l1);

  float n1 = _noise(vec3(uv * mix(2.4, 8.5, flowK), time * 0.16));
  float n2 = _noise(vec3(uv * mix(2.4, 8.5, flowK) + vec2(5.2, 1.7), time * 0.16 + 1.3));
  vec2 dir = vec2(n1, n2);
  float aspect = resolution.x / max(1.0, resolution.y);
  dir.x /= aspect;

  float dist = (0.02 + flowK * 0.1) * (0.4 + meltK * 0.85) * a;
  vec3 smear = prev;
  smear += texture2D(prevTex, uv - dir * dist).rgb;
  smear += texture2D(prevTex, uv - dir * dist * 2.1).rgb;
  smear += texture2D(prevTex, uv - dir * dist * 3.6).rgb;
  smear *= 0.25;

  float trail = mix(0.32, 0.84, meltK) * a * (1.0 - refreshK * 0.92);
  float moveBoost = smoothstep(0.002, 0.05, motion) * meltK * a * 0.4;
  vec3 outCol = mix(_c0.rgb, smear, clamp(trail + moveBoost, 0.0, 0.92));

  float edge = (0.35 + smoothstep(0.003, 0.07, motion) * 0.65) * cb * a * (1.0 - refreshK);
  outCol.r += edge * 0.16;
  outCol.b += edge * 0.12;
  outCol.g -= edge * 0.05;

  outCol = mix(outCol, _c0.rgb, refreshK);
  return vec4(clamp(mix(_c0.rgb, outCol, a), 0.0, 1.0), _c0.a);
`;
