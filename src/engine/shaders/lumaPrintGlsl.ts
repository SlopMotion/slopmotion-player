import { LUMA_PRINT_ICON_HATCH_GLSL } from "./lumaPrintIconDefs";

/** Luminance-driven print / plotter halftone — stipple, mosaic, icons, lines, radial. */
export const LUMA_PRINT_GLSL = `
  if (amount < 0.00001) return _c0;

  float strength = clamp(amount, 0.0, 1.0);
  float dens = max(4.0, density);
  float bal = clamp(contrast, 0.0, 1.0);
  float waveAmt = clamp(wave, 0.0, 1.0);
  float modeF = clamp(mode, 0.0, 4.0);
  float rot = rotation;

  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec2 st = uv - 0.5;
  float ca = cos(rot);
  float sa = sin(rot);
  vec2 rst = vec2(st.x * ca - st.y * sa, st.x * sa + st.y * ca) + 0.5;

  vec3 lumW = vec3(0.299, 0.587, 0.114);
  float l = dot(_c0.rgb, lumW);
  float lAdj = clamp((l - bal) * (1.0 + strength * 3.2) + bal, 0.0, 1.0);
  float inkTone = 1.0 - lAdj;

  vec2 grid = vec2(dens, max(2.0, dens * (resolution.y / max(1.0, resolution.x))));
  vec2 cell = fract(rst * grid) - 0.5;

  vec3 paper = vec3(1.0);
  vec3 inkCol = vec3(0.0);
  float ink = 0.0;

  if (modeF < 0.5) {
    vec2 gv = floor(gl_FragCoord.xy / max(1.5, mix(8.0, 2.0, strength)));
    float n = _noise(vec3(gv * 0.17, 2.3));
    float jitter = (n - 0.5) * mix(0.35, 0.72, strength);
    ink = 1.0 - step(lAdj + jitter, bal);
    float n2 = _noise(vec3((gv + 3.7) * 0.17, 5.1));
    vec2 bv = floor(gl_FragCoord.xy / (2.0 + n2 * 10.0));
    float blockN = _noise(vec3(bv * 0.13, 8.4));
    if (blockN > mix(0.97, 0.82, strength) && inkTone > mix(0.08, 0.45, strength)) {
      ink = 1.0;
    }
  } else if (modeF < 1.5) {
    float side = mix(0.14, 0.9, inkTone) * mix(0.35, 1.0, strength);
    side = min(side, 0.94) * 0.9;
    vec2 q = abs(cell) - vec2(side * 0.5);
    float corner = side * 0.22;
    vec2 qOut = max(q, 0.0);
    float dist = length(qOut) + min(max(q.x, q.y), 0.0) - corner;
    ink = 1.0 - smoothstep(-0.015, 0.025, dist);
    if (inkTone > 0.32 && inkTone < 0.68) {
      float dotR = side * 0.14;
      ink = max(ink, (1.0 - step(dotR, length(cell))) * 0.9);
    }
  } else if (modeF < 2.5) {
    ${LUMA_PRINT_ICON_HATCH_GLSL}
  } else if (modeF < 3.5) {
    vec2 ls = rst - 0.5;
    float wave = waveAmt * mix(0.0, 0.11, strength) * sin(ls.x * dens * 0.12 + time * 0.35);
    ls.y += wave;
    float linePos = fract(ls.y * dens) - 0.5;
    float halfW = mix(0.015, 0.46, inkTone) * strength;
    ink = 1.0 - step(halfW, abs(linePos));
  } else {
    vec2 cc = rst - 0.5;
    cc.x *= resolution.x / max(1.0, resolution.y);
    float ang = atan(cc.y, cc.x);
    float waveOff = waveAmt * 0.035 * sin(ang * 4.0 + length(cc) * mix(6.0, 14.0, strength));
    float d = length(cc) + waveOff;
    if (shape > 0.5) {
      d = (abs(cc.x) + abs(cc.y)) + waveOff;
    }
    float ringPos = fract(d * dens * 0.075) - 0.5;
    float halfW = mix(0.008, 0.42, inkTone) * strength;
    ink = 1.0 - step(halfW, abs(ringPos));
  }

  vec3 outRgb = mix(paper, inkCol, clamp(ink, 0.0, 1.0));
  return vec4(mix(_c0.rgb, outRgb, strength), _c0.a);
`;
