/**
 * Pixel Sort — single-pass approximation of ASDF-style glitch-art pixel sorting.
 *
 * True pixel sorting needs a multi-pass sort; this gather trick reads well in
 * one pass. Each pixel lane (column for vertical sort, row for horizontal) gets
 * a hashed threshold + streak length so adjacent lanes disagree — that
 * per-lane randomness is what makes the result look torn instead of neatly
 * gradient-sorted (`chaos` scales it).
 *
 * Two zones per lane:
 * - Bright pixels (luma >= lane threshold) remap their contiguous bright span
 *   into a monotonic luma gradient by picking the span sample whose luma is
 *   closest to their rank position.
 * - Dark pixels melt: if a bright run sits upstream (against the sort
 *   direction) within the lane's reach, the nearest bright edge color drips
 *   over them as a constant streak, slightly darkening with distance.
 *
 * Flat GLSL only (no nested functions). Samples the raw video texture like
 * normalMapLight / warpTunnel — accepted tradeoff for chain-position mismatch.
 */

const PS_LUMA = "vec3(0.299, 0.587, 0.114)";
const PS_MARCH_STEPS = 28;
const PS_RANK_TAPS = 20;

function psMarch(tag: string, dirSign: string, outVar: string): string {
  return `
  float ${outVar} = 0.0;
  for (int i = 1; i <= ${PS_MARCH_STEPS}; i++) {
    vec2 p_${tag} = psUv ${dirSign} psDir * (float(i) * psStep);
    if (p_${tag}.x < 0.001 || p_${tag}.x > 0.999 || p_${tag}.y < 0.001 || p_${tag}.y > 0.999) break;
    float l_${tag} = dot(texture2D(videoTex, p_${tag}).rgb, ${PS_LUMA});
    if (l_${tag} < psThr) break;
    ${outVar} = float(i) * psStep;
  }`;
}

export const PIXEL_SORT_COLOR_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  float dirI = floor(sortDir + 0.5);
  vec2 psDir = vec2(0.0, -1.0);
  if (dirI > 0.5 && dirI < 1.5) psDir = vec2(0.0, 1.0);
  if (dirI > 1.5 && dirI < 2.5) psDir = vec2(1.0, 0.0);
  if (dirI > 2.5) psDir = vec2(-1.0, 0.0);

  vec2 psUv = gl_FragCoord.xy / resolution.xy;
  float psLane = 0.0;
  if (abs(psDir.y) > 0.5) {
    psLane = floor(gl_FragCoord.x);
    psUv.x = (psLane + 0.5) / resolution.x;
  } else {
    psLane = floor(gl_FragCoord.y);
    psUv.y = (psLane + 0.5) / resolution.y;
  }
  psUv = clamp(psUv, 0.001, 0.999);

  float psChaos = clamp(chaos, 0.0, 1.0);
  float psH1 = fract(sin(psLane * 12.9898) * 43758.5453);
  float psH2 = fract(sin(psLane * 78.233 + 1.7) * 24634.6345);

  float psThr = clamp(clamp(threshold, 0.02, 0.98) + (psH1 - 0.5) * 0.5 * psChaos, 0.03, 0.97);
  float psReach = clamp(reach, 0.02, 1.0) * mix(1.0, 0.3 + 1.4 * psH2, psChaos);
  float psStep = psReach / float(${PS_MARCH_STEPS});

  float psMyL = dot(texture2D(videoTex, psUv).rgb, ${PS_LUMA});

  if (psMyL >= psThr) {
    ${psMarch("b", "-", "psBack")}
    ${psMarch("f", "+", "psFwd")}

    float psSpan = psBack + psFwd;
    if (psSpan < psStep) return _c0;

    float psPos = psBack / psSpan;
    float psTarget = clamp(mix(psThr, 1.0, psPos) + (psH2 - 0.5) * 0.35 * psChaos, 0.0, 1.0);

    vec3 psBest = texture2D(videoTex, psUv).rgb;
    float psBestD = 10.0;
    for (int i = 0; i < ${PS_RANK_TAPS}; i++) {
      float f_r = (float(i) + 0.5) / float(${PS_RANK_TAPS});
      vec2 p_r = clamp(psUv + psDir * (f_r * psSpan - psBack), 0.001, 0.999);
      vec3 c_r = texture2D(videoTex, p_r).rgb;
      float d_r = abs(dot(c_r, ${PS_LUMA}) - psTarget);
      if (d_r < psBestD) { psBestD = d_r; psBest = c_r; }
    }

    return vec4(mix(_c0.rgb, psBest, a), _c0.a);
  }

  float psUpD = -1.0;
  vec3 psSrcC = _c0.rgb;
  for (int i = 1; i <= ${PS_MARCH_STEPS}; i++) {
    vec2 p_m = psUv - psDir * (float(i) * psStep);
    if (p_m.x < 0.001 || p_m.x > 0.999 || p_m.y < 0.001 || p_m.y > 0.999) break;
    vec3 c_m = texture2D(videoTex, p_m).rgb;
    if (dot(c_m, ${PS_LUMA}) >= psThr) {
      psUpD = float(i) * psStep;
      psSrcC = c_m;
      break;
    }
  }
  if (psUpD < 0.0) return _c0;

  float psT = psUpD / psReach;
  vec3 psStreak = psSrcC * mix(1.0, 0.72, psT);
  float psFade = 1.0 - smoothstep(0.8, 1.0, psT);
  return vec4(mix(_c0.rgb, psStreak, a * psFade), _c0.a);
`;
