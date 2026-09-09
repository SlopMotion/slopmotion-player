/**
 * Mirror Stripes — neon horizontal line groups filling an aspect-correct
 * Optional axis fold (Mirror param): on → complementary angles / diamond look;
 * off → single-orientation stripes. Depth layers stack with additive alpha and
 * burn. Flat GLSL only (no fwidth — WebGL1-safe).
 *
 * Density stays in a low band (≈2–18 groups) — beyond that the pattern
 * moirés. Lines-per-group follows spread; soft neon halo follows thickness.
 * Randomness is per-group / per-line only — never white-noise on continuous
 * UV, or rotated stripes shatter into points. Line width uses a screen-space
 * floor from |∇q.y| so diagonals stay continuous — thickness is capped to a
 * fraction of the stripe period so rotate never melts lines into a solid fill.
 * Depth recession and transparency track Container (scale): larger scale →
 * deeper, fainter far layers. Line tips fade gently at the container rim.
 */

export const MIRROR_STRIPES_SRC_GLSL = `
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  float aspect = resolution.x / max(1.0, resolution.y);
  vec2 p0 = uv - 0.5;
  p0.x *= aspect;

  float sc = mix(0.12, 1.0, clamp(scale, 0.0, 1.0));
  float scN = clamp(scale, 0.0, 1.0);
  float depthAmt = mix(0.22, 1.0, scN);
  float dens = mix(2.0, 18.0, clamp(density, 0.0, 1.0));
  float spr = clamp(spread, 0.0, 1.0);
  float groupW = mix(0.94, 0.1, spr);
  float stripesN = mix(5.0, 2.0, spr);
  float rnd = clamp(randomness, 0.0, 1.0);
  float th = clamp(thickness, 0.0, 1.0);
  float halfThickN = mix(0.08, 0.45, th);
  float glowAmt = mix(0.35, 0.95, th);
  float ang = rotate * 6.28318530718;
  float ca = cos(ang);
  float sa = sin(ang);
  float mir = step(0.5, mirror);
  float pxX = 1.0 / max(resolution.x, 1.0);
  float pxY = 1.0 / max(resolution.y, 1.0);

  float layerCount = layers <= 1.5 ? 1.0 : (layers <= 3.0 ? 2.0 : (layers <= 6.0 ? 4.0 : 8.0));
  float accum = 0.0;

  for (float li = 0.0; li < 8.0; li += 1.0) {
    if (li > layerCount - 0.5) break;

    float t = layerCount < 1.5 ? 0.0 : li / max(layerCount - 1.0, 1.0);
    float farSc = mix(0.78, 0.3, depthAmt);
    float layerSc = mix(1.0, farSc, t);
    float farAlpha = mix(0.58, 0.14, depthAmt);
    float layerBright = mix(1.4, farAlpha, t * t);
    float phaseOff = li * 0.137 + t * 0.31;
    float invLayer = 1.0 / max(0.001, sc * layerSc);

    vec2 p = p0 * invLayer;
    vec2 box = abs(p);
    vec2 fold = mix(p, box, mir);

    float halfW = aspect * 0.5;
    float halfH = 0.5;
    float edgeSoft = mix(0.12, 0.32, scN);
    float inside =
      (1.0 - smoothstep(halfW - edgeSoft * aspect, halfW + edgeSoft * 0.25, box.x)) *
      (1.0 - smoothstep(halfH - edgeSoft, halfH + edgeSoft * 0.25, box.y));

    vec2 q = vec2(ca * fold.x - sa * fold.y, sa * fold.x + ca * fold.y);

    float tipW = edgeSoft * 2.4 * max(halfW, 0.2);
    float tipFade = smoothstep(0.0, tipW, halfW - abs(q.x));
    tipFade = tipFade * mix(1.0, tipFade, 0.45);

    float ynAxis = mix(0.5 + 0.5 * (q.y / max(halfH, 0.0001)), abs(q.y) / max(halfH, 0.0001), mir);
    float yn = clamp(ynAxis + phaseOff * 0.08, 0.0, 1.0);

    float cell = yn * dens;
    float groupIdx = floor(cell);
    float gHash = fract(sin((groupIdx + li * 3.7) * 12.9898 + 78.233) * 43758.5453);
    float gHash2 = fract(sin((groupIdx + li * 5.1) * 39.346 + 11.135) * 43758.5453);
    float groupWVar = clamp(groupW * mix(1.0, mix(0.5, 1.35, gHash), rnd), 0.06, 0.98);
    float fi = fract(cell + (gHash2 - 0.5) * rnd * 0.22);
    float inGroup = step(fi, groupWVar);

    float localT = fi / max(groupWVar, 0.001);
    float lineIdx = floor(localT * stripesN);
    float lHash = fract(sin((groupIdx * 17.0 + lineIdx + li * 11.0) * 45.164) * 43758.5453);
    float stripeCoord = localT * stripesN + (lHash - 0.5) * rnd * 0.4;
    float fine = fract(stripeCoord);
    float dN = abs(fine - 0.5) * 2.0;

    float periodQ = (groupWVar / max(stripesN, 0.001)) * (halfH / max(dens, 0.001));
    float distQ = dN * 0.5 * periodQ;
    float gradQ = invLayer * (abs(sa) * aspect * pxX + abs(ca) * pxY);
    float aaQ = max(gradQ * 1.35, pxY * invLayer);
    float halfThickQ = min(max(halfThickN * 0.5 * periodQ, min(aaQ, periodQ * 0.22)), periodQ * 0.34);
    float core = 1.0 - smoothstep(halfThickQ * 0.35, halfThickQ, distQ);
    float softRad = min(halfThickQ * mix(1.15, 2.1, glowAmt), periodQ * 0.42);
    float soft = exp(-distQ * distQ / max(softRad * softRad * 0.4, 1.0e-8)) * glowAmt;

    float mask = clamp(inGroup * max(core, soft) * inside * tipFade, 0.0, 1.0);
    accum += mask * layerBright;
  }

  float burn = accum * 1.8;
  float a = 1.0 - exp(-accum * 1.7);
  vec3 col = vec3(cr, cg, cb) * burn;
  return vec4(col, a);
`;
