/**
 * The Universe Within — layered fractal glow (Shadertoy lscczl, BigWings 2018).
 * CC BY-NC-SA 3.0 — https://www.shadertoy.com/view/lscczl
 * Flat GLSL for Hydra src registration (no nested functions).
 */
export const UNIVERSE_WITHIN_SRC_GLSL = `
  vec2 res = resolution.xy;
  vec2 uv = (gl_FragCoord.xy * 2.0 - res.xy) / res.y;
  vec2 uv0 = uv;

  float t = time * max(0.0, speed);
  t += max(0.0, audioBoost) * 4.0;

  float layerCount = clamp(layers, 1.0, 8.0);
  float zoom = max(1.05, zoomFactor);
  float glowPow = clamp(glow, 0.6, 2.4);
  float glowWidth = 0.01 * mix(1.4, 0.65, (glowPow - 0.6) / 1.8);

  vec3 finalColor = vec3(0.0);

  for (float i = 0.0; i < 8.0; i++) {
    float active = step(i, layerCount - 0.5);
    uv = fract(uv * zoom) - 0.5;

    float d = length(uv) * exp(-length(uv0));

    vec3 pa = vec3(0.5);
    vec3 pb = vec3(0.5);
    vec3 pc = vec3(1.0);
    vec3 pd = vec3(0.263, 0.416, 0.557);
    vec3 col = pa + pb * cos(6.2831853 * (pc * (length(uv0) + i * 0.4 + t * 0.4) + pd));

    d = sin(d * 8.0 + t) / 8.0;
    d = abs(d);
    d = pow(glowWidth / max(d, 1.0e-4), glowPow);

    finalColor += col * d * active;
  }

  finalColor = pow(clamp(finalColor, 0.0, 1.0), vec3(1.0 / 2.2));
  finalColor = finalColor * 0.6 + 0.4 * finalColor * finalColor * (3.0 - 2.0 * finalColor);

  vec2 q = gl_FragCoord.xy / res;
  finalColor *= 0.5 + 0.5 * pow(16.0 * q.x * q.y * (1.0 - q.x) * (1.0 - q.y), 0.7);

  return vec4(finalColor, 1.0);
`;
