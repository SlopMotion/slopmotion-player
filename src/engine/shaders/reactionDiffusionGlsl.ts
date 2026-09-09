/**
 * Gray-Scott reaction-diffusion (Karl Sims) on Hydra o1.
 * Video drives style map, edge seeding, and flow (Alive Tool / RD Tool style).
 */

export const REACTION_DIFF_SIM_GLSL = `
  vec2 uv = _st;
  float aspect = resolution.x / max(1.0, resolution.y);
  vec3 wLuma = vec3(0.299, 0.587, 0.114);

  float fBase = mix(0.01, 0.1, clamp(feed, 0.0, 1.0));
  float kBase = mix(0.045, 0.07, clamp(kill, 0.0, 1.0));
  float style = clamp(styleMap, 0.0, 1.0);
  float srcAmt = clamp(videoDrive, 0.0, 1.0);
  float flowAmt = clamp(flow, 0.0, 1.0);
  float emb = clamp(emboss, 0.0, 1.0);

  float h = mix(1.6, 5.0, clamp(scale, 3.0, 40.0) / 40.0) / min(resolution.x, resolution.y);
  vec2 hx = vec2(h / aspect, 0.0);
  vec2 hy = vec2(0.0, h);
  vec2 d1 = vec2(h / aspect, h);
  vec2 d2 = vec2(h / aspect, -h);

  vec4 vidC = texture2D(videoTex, uv);
  float vidL = dot(vidC.rgb, wLuma);
  float vidLx = dot(texture2D(videoTex, clamp(uv + hx, 0.001, 0.999)).rgb, wLuma)
    - dot(texture2D(videoTex, clamp(uv - hx, 0.001, 0.999)).rgb, wLuma);
  float vidLy = dot(texture2D(videoTex, clamp(uv + hy, 0.001, 0.999)).rgb, wLuma)
    - dot(texture2D(videoTex, clamp(uv - hy, 0.001, 0.999)).rgb, wLuma);
  float vidEdge = clamp(length(vec2(vidLx, vidLy)) * 3.2, 0.0, 1.0);

  float f = fBase + (uv.y - 0.5) * style * 0.038 + (vidL - 0.5) * srcAmt * 0.042;
  float k = kBase + (uv.x - 0.5) * style * 0.024 + (vidEdge - 0.35) * srcAmt * 0.028;
  f = clamp(f, 0.008, 0.11);
  k = clamp(k, 0.042, 0.072);

  vec4 prev = texture2D(stateTex, uv);
  float A = prev.r;
  float B = prev.g;

  if (forceSeed > 0.5) {
    A = 1.0;
    B = 0.0;
    float seedMask = smoothstep(0.08, 0.42, vidEdge) * srcAmt;
    seedMask = max(seedMask, (1.0 - vidL) * srcAmt * 0.35);
    seedMask = max(seedMask, smoothstep(0.55, 0.92, vidL) * srcAmt * 0.22);
    B = clamp(seedMask, 0.0, 1.0);
  } else {
    if (flowAmt > 0.0005) {
      vec2 vidGrad = vec2(vidLx, vidLy);
      vec2 advecUv = clamp(uv - vidGrad * flowAmt * 0.028, 0.002, 0.998);
      vec4 advec = texture2D(stateTex, advecUv);
      A = advec.r;
      B = advec.g;
    }

    float lapA =
      texture2D(stateTex, uv + hx).r * 0.2 +
      texture2D(stateTex, uv - hx).r * 0.2 +
      texture2D(stateTex, uv + hy).r * 0.2 +
      texture2D(stateTex, uv - hy).r * 0.2 +
      texture2D(stateTex, uv + d1).r * 0.05 +
      texture2D(stateTex, uv - d1).r * 0.05 +
      texture2D(stateTex, uv + d2).r * 0.05 +
      texture2D(stateTex, uv - d2).r * 0.05 -
      A;

    float lapB =
      texture2D(stateTex, uv + hx).g * 0.2 +
      texture2D(stateTex, uv - hx).g * 0.2 +
      texture2D(stateTex, uv + hy).g * 0.2 +
      texture2D(stateTex, uv - hy).g * 0.2 +
      texture2D(stateTex, uv + d1).g * 0.05 +
      texture2D(stateTex, uv - d1).g * 0.05 +
      texture2D(stateTex, uv + d2).g * 0.05 +
      texture2D(stateTex, uv - d2).g * 0.05 -
      B;

    float reaction = A * B * B;
    float dt = 0.55 + clamp(speed, 0.0, 2.0) * 0.45;
    A = clamp(A + (lapA - reaction + f * (1.0 - A)) * dt, 0.0, 1.0);
    B = clamp(B + (0.5 * lapB + reaction - (k + f) * B) * dt, 0.0, 1.0);

    float seedPulse = smoothstep(0.1, 0.55, vidEdge) * srcAmt * 0.11;
    seedPulse += smoothstep(0.62, 0.95, vidL) * srcAmt * 0.045;
    B = clamp(B + seedPulse, 0.0, 1.0);
  }

  float lapBVis =
    texture2D(stateTex, uv + hx).g * 0.2 +
    texture2D(stateTex, uv - hx).g * 0.2 +
    texture2D(stateTex, uv + hy).g * 0.2 +
    texture2D(stateTex, uv - hy).g * 0.2 +
    texture2D(stateTex, uv + d1).g * 0.05 +
    texture2D(stateTex, uv - d1).g * 0.05 +
    texture2D(stateTex, uv + d2).g * 0.05 +
    texture2D(stateTex, uv - d2).g * 0.05 -
    B;
  float light = clamp(0.42 + B * 0.38 + lapBVis * 2.8 * emb, 0.0, 1.0);

  return vec4(A, B, light, 1.0);
`;

export const REACTION_DIFFUSION_OVERLAY_GLSL = `
  float amt = clamp(amount, 0.0, 1.0);
  if (amt < 0.00001) return _c0;

  float A = _c1.r;
  float B = _c1.g;
  float light = _c1.b;

  float edge = abs(A - B);
  float pat = smoothstep(0.03, 0.78, B + edge * 0.32);
  pat = clamp(pat * mix(0.75, 1.25, light), 0.0, 1.0);

  vec3 vid = _c0.rgb;
  vec3 patCol = vid * (0.28 + pat * 1.15);
  patCol *= mix(0.72, 1.38, light);
  patCol = mix(patCol, max(vid * 0.35, patCol), pat);

  vec4 c = _c0;
  c.rgb = mix(c.rgb, max(c.rgb * 0.32, patCol), amt * pat);
  return c;
`;
