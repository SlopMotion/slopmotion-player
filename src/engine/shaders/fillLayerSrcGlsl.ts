/** Procedural solid / linear / radial fill for the Fill Layer composite FX. */
export const FILL_LAYER_SRC_GLSL = `
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  float style = clamp(gradType, 0.0, 3.0);
  float sw = clamp(sweep, 0.0, 3.0);
  vec3 colorA = vec3(ar, ag, ab);
  vec3 colorB = vec3(br, bg, bb);
  if (style < 0.5) {
    return vec4(colorA, 1.0);
  }
  vec2 c = uv - 0.5;
  c.x *= resolution.x / max(1.0, resolution.y);
  float sf = clamp(softness, 0.0, 1.0);
  float dist = length(c) * 2.0;
  float t = 0.0;
  if (sw > 0.5) {
    float ang = atan(c.y, c.x) / 6.2831853 + 0.5;
    if (sw < 1.5) {
      t = ang;
    } else if (sw < 2.5) {
      t = abs(c.x) + abs(c.y);
    } else {
      t = fract(ang + dist * mix(1.0, 4.0, sf));
    }
  } else if (style < 1.5) {
    t = uv.x;
  } else if (style < 2.5) {
    t = uv.y;
  } else {
    float hard = clamp(dist, 0.0, 1.0);
    float soft = smoothstep(0.0, 1.0, dist);
    t = mix(soft, hard, 1.0 - sf * 0.9);
  }
  t = clamp(t, 0.0, 1.0);
  return vec4(mix(colorA, colorB, t), 1.0);
`;
