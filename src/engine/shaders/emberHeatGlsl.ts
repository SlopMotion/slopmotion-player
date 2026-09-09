/** Continuous flame field — no cell/floor swirls. Needs `t`, `den`, `turb` in scope. */
function emberHeatField(
  tag: string,
  pVar: string,
  outTongues: string,
  outWarp: string,
  outWall: string,
): string {
  return `
    vec2 q_${tag} = ${pVar};
    q_${tag}.y -= t * 0.18;
    float warp_${tag} = _noise(vec3(q_${tag} * vec2(2.1, 1.05), t * 0.22)) * 0.5 + 0.5;
    float curl_${tag} = _noise(vec3(q_${tag} * vec2(den * 2.8, den * 1.4) + 1.7, t * 0.7)) * 0.5 + 0.5;
    q_${tag}.x += (warp_${tag} - 0.5) * turb * 0.42 + (curl_${tag} - 0.5) * turb * 0.22;
    q_${tag}.y += (warp_${tag} - 0.5) * turb * 0.12 + (curl_${tag} - 0.5) * turb * 0.08;
    float n1_${tag} = _noise(vec3(q_${tag} * vec2(den * 0.85, den * 0.42), t * 0.32)) * 0.5 + 0.5;
    float n2_${tag} = _noise(vec3(q_${tag} * vec2(den * 1.8, den * 0.9) + 2.4, t * 0.55)) * 0.5 + 0.5;
    float n3_${tag} = _noise(vec3(q_${tag} * vec2(den * 3.6, den * 1.7) + 6.1, t * 0.9)) * 0.5 + 0.5;
    float field_${tag} = n1_${tag} * 0.52 + n2_${tag} * 0.32 + n3_${tag} * 0.16;
    float bottom_${tag} = 1.0 - ${pVar}.y;
    float ${outTongues} = field_${tag} * mix(0.45, 1.3, pow(clamp(bottom_${tag}, 0.0, 1.0), 0.5));
    ${outTongues} += (_noise(vec3(${pVar}.x * den * 2.4, bottom_${tag} * 3.2 - t * 0.4, t * 0.2)) * 0.5 + 0.5) * 0.14 * turb;
    float ${outWall} = smoothstep(0.22, 0.7, ${outTongues});
    ${outWall} *= smoothstep(0.0, 0.16, bottom_${tag}) * mix(0.35, 1.0, smoothstep(0.05, 0.72, bottom_${tag}));
    float ${outWarp} = warp_${tag};
  `;
}

export const EMBER_HEAT_DISTORT_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;

  vec2 st = _st;
  float aspect = resolution.x / max(1.0, resolution.y);
  vec2 p = vec2(st.x * aspect, 1.0 - st.y);
  float den = mix(1.8, 6.2, clamp(density, 6.0, 40.0) / 40.0);
  float t = time * clamp(speed, 0.0, 3.0);
  float turb = 0.68;
  float waveStr = clamp(waves, 0.0, 1.0) * a;
  ${emberHeatField("d0", "p", "tongues", "warp", "wall")}
  float flameZone = smoothstep(0.02, 0.42, wall);
  float ky = mix(3.8, 13.0, clamp(density, 6.0, 40.0) / 40.0);
  float ph1 = p.y * ky - t * 1.35 + sin(p.x * ky * 0.48 + t * 0.32) * 0.85;
  float ph2 = p.y * ky * 1.7 - t * 2.05 + sin(p.x * ky * 0.9 - t * 0.5) * 0.4;
  st.x += (sin(ph1) + sin(ph2) * 0.5) * waveStr * flameZone * 0.04 / aspect;
  st.y += (cos(ph1) * 0.4 + cos(ph2) * 0.18) * waveStr * flameZone * 0.014;
  float eps = 0.02;
  vec2 px = p + vec2(eps, 0.0);
  ${emberHeatField("dx", "px", "tonguesX", "warpX", "wallX")}
  vec2 py = p + vec2(0.0, eps);
  ${emberHeatField("dy", "py", "tonguesY", "warpY", "wallY")}
  vec2 grad = vec2(tonguesX - tongues, tonguesY - tongues);
  float push = flameZone * a * 0.55;
  st.x += (grad.x * 1.05 + (warp - 0.5) * 0.3) * push * 0.034 / aspect;
  st.y -= (grad.y * 0.8) * push * 0.02;
  return clamp(st, vec2(0.001), vec2(0.999));
`;

export const EMBER_HEAT_OVERLAY_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec2 st = vec2(uv.x, 1.0 - uv.y);
  float aspect = resolution.x / max(1.0, resolution.y);
  vec2 p = vec2(st.x * aspect, st.y);
  float den = mix(1.8, 6.2, clamp(density, 6.0, 40.0) / 40.0);
  float sparkDen = clamp(density, 6.0, 40.0);
  float t = time * clamp(speed, 0.0, 3.0);
  float turb = 0.68;
  float sparkAmt = clamp(intensity, 0.0, 1.0);
  float glowAmt = clamp(glow, 0.0, 1.0);
  float waveAmt = clamp(waves, 0.0, 1.0);
  ${emberHeatField("o0", "p", "tongues", "warp", "wall")}
  float burn = a * mix(0.55, 1.45, glowAmt);
  float cover = clamp(wall * burn, 0.0, 1.0);

  vec3 fire = mix(vec3(0.12, 0.01, 0.0), vec3(0.95, 0.2, 0.015), smoothstep(0.1, 0.45, tongues));
  fire = mix(fire, vec3(1.0, 0.55, 0.06), smoothstep(0.4, 0.76, tongues));
  fire = mix(fire, vec3(1.0, 0.95, 0.72), smoothstep(0.68, 1.08, tongues));

  float sparkCore = 0.0;
  float sparkTail = 0.0;
  float sparkHot = 0.0;
  float nearFlame = clamp(cover + smoothstep(0.08, 0.42, tongues) * 0.85, 0.0, 1.0);

  for (int layer = 0; layer < 3; layer++) {
    float fi = float(layer);
    float cols = sparkDen * (0.24 + fi * 0.09);
    for (int slot = 0; slot < 3; slot++) {
      float si = float(slot);
      float col = floor(uv.x * cols + fi * 2.9 + si * 1.13);
      vec3 hash = fract(vec3(col, si + fi * 7.1, col * 1.7 + si * 3.3) * vec3(0.1031, 0.1030, 0.0973));
      hash += dot(hash, hash.yzx + 33.33);
      hash = fract((hash.xxy + hash.yzz) * hash.zyx);
      float speedRnd = pow(fract(hash.y * 14.2 + hash.z * 3.1), 1.55);
      float riseSpeed = mix(0.16, 2.05, speedRnd);
      float life = fract(hash.z + t * riseSpeed);
      float maxH = mix(0.42, 1.02, pow(fract(hash.x * 5.7 + hash.y), 0.65));
      float py = life * maxH;
      float driftA = _noise(vec3(hash.xy * 4.1 + col * 0.03, t * mix(0.05, 0.24, hash.z)));
      float driftB = _noise(vec3(hash.zx * 2.8 + 2.4, t * mix(0.03, 0.14, hash.x)));
      float driftAmp = mix(0.012, 0.065, pow(fract(hash.x * 9.1 + hash.y), 1.2));
      float lean = mix(-0.07, 0.07, fract(hash.x * 3.9 + si * 0.2));
      float px = (col + mix(0.18, 0.82, hash.x)) / cols;
      px += (driftA - 0.5) * driftAmp + (driftB - 0.5) * driftAmp * 0.45;
      px += lean * life;
      float brightRnd = pow(fract(hash.z * 8.3 + hash.x * 2.9), 2.1);
      float sparkInt = mix(0.18, 1.85, brightRnd);
      float born = smoothstep(0.0, 0.08, life) * (1.0 - smoothstep(0.78, 1.0, life));
      float flicker = 0.82 + 0.18 * (0.5 + 0.5 * sin(t * mix(1.2, 3.4, hash.y) + hash.x * 8.0));
      float visible = step(1.0 - mix(0.35, 0.85, sparkAmt), fract(hash.x + hash.z * 1.7 + si * 0.17));
      float sizeRnd = pow(fract(hash.x * 13.7 + hash.y * 4.2), 1.7);
      float radius = mix(0.008, 0.028, sizeRnd);
      vec2 sparkDelta = (st - vec2(px, py)) * vec2(aspect, 1.0);
      float pointy = step(0.62, fract(hash.y + hash.z));
      float tailLen = mix(0.8, 3.4, (1.0 - pointy) * mix(0.35, 1.0, fract(hash.x * 3.1)) * mix(0.5, 1.2, speedRnd));
      float above = step(0.0, sparkDelta.y);
      float ax = abs(sparkDelta.x) / max(radius * 0.18, 0.0004);
      float ay = mix(-sparkDelta.y / max(radius * tailLen, 0.0004), sparkDelta.y / max(radius * 0.3, 0.0004), above);
      float streak = exp(-ax * ax * 7.0 - ay * ay * 2.2);
      float core = exp(-dot(sparkDelta, sparkDelta) / max(radius * radius * 0.16, 0.00005));
      float riseFade = smoothstep(0.0, 0.05, py) * (1.0 - smoothstep(0.72, 1.0, py));
      float weight = riseFade * born * visible * sparkInt * flicker * mix(0.2, 1.0, nearFlame) * (0.95 - fi * 0.16);
      sparkCore += core * weight;
      sparkTail += streak * weight * (1.0 - pointy * 0.7);
      sparkHot += core * weight * brightRnd;
    }
  }

  vec3 color = _c0.rgb;
  float luma = dot(color, vec3(0.299, 0.587, 0.114));
  vec3 warmed = color * mix(vec3(1.0), vec3(1.35, 0.42, 0.08), cover * 0.78);
  vec3 through = warmed + fire * (0.22 + luma * 1.05) * cover;
  vec3 screenF = 1.0 - (1.0 - warmed) * (1.0 - fire * cover * 0.92);
  color = mix(through, screenF, cover * 0.58);
  color += fire * pow(cover, 1.35) * mix(0.22, 1.25, glowAmt);
  color += vec3(1.0, 0.93, 0.7) * pow(clamp(cover * tongues, 0.0, 1.0), 2.2) * glowAmt * 0.85;
  color += fire * waveAmt * cover * 0.22;
  color += vec3(1.0, 0.32, 0.03) * sparkTail * sparkAmt * a * 1.55;
  color += vec3(1.0, 0.94, 0.62) * sparkCore * sparkAmt * a * 2.05;
  color += vec3(1.0, 0.95, 0.75) * sparkHot * sparkAmt * a * 1.35;
  return vec4(clamp(color, 0.0, 1.0), _c0.a);
`;

export const EMBER_HEAT_FLOW_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  float waveAmt = clamp(waves, 0.0, 1.0);
  float warm0 = max(_c0.r - _c0.b, 0.0);
  float warm1 = max(_c1.r - _c1.b, 0.0);
  float trail = clamp(warm0 * 0.72 + warm1 * 0.55, 0.0, 0.7) * waveAmt * a;
  vec3 smeared = mix(_c0.rgb, _c1.rgb, trail);
  return vec4(clamp(smeared, 0.0, 1.0), _c0.a);
`;
