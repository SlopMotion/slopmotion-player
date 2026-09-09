/** Normal-map refraction + relight — Voronoi bump or video-derived normals. */

/** Fixed Voronoi drift — not user-facing. */
export const NORMAL_MAP_ANIM_SPEED = 0.2;
/** Bump-only relight — fixed; not exposed in UI. */
export const NORMAL_MAP_BUMP_LIGHTING = 0.45;
/** Fallback when Voronoi params are unset (e.g. saved Bump presets). */
export const NORMAL_MAP_VORONOI_SCALE = 12;
export const NORMAL_MAP_VORONOI_REFRACTION = 0.55;

const NM_LUMA = "vec3(0.299, 0.587, 0.114)";

const NM_VIDEO_BUMP_NORMAL = (outVar: string) => `
  vec2 nmUvB = gl_FragCoord.xy / resolution.xy;
  float nmEpsB = 2.0 / min(resolution.x, resolution.y);
  float nmLxp = dot(texture2D(videoTex, clamp(nmUvB + vec2(nmEpsB, 0.0), 0.001, 0.999)).rgb, ${NM_LUMA});
  float nmLxm = dot(texture2D(videoTex, clamp(nmUvB - vec2(nmEpsB, 0.0), 0.001, 0.999)).rgb, ${NM_LUMA});
  float nmLyp = dot(texture2D(videoTex, clamp(nmUvB + vec2(0.0, nmEpsB), 0.001, 0.999)).rgb, ${NM_LUMA});
  float nmLym = dot(texture2D(videoTex, clamp(nmUvB - vec2(0.0, nmEpsB), 0.001, 0.999)).rgb, ${NM_LUMA});
  float nmDetV = max(0.15, detail) * 14.0;
  ${outVar} = normalize(vec3((nmLxp - nmLxm) * 0.5 * nmDetV, (nmLyp - nmLym) * 0.5 * nmDetV, 1.0));
`;

const NM_VORONOI_AT = (pExpr: string, hOut: string, id: string) => `
  vec2 nmGV${id} = floor((${pExpr}) * nmSc);
  vec2 nmFV${id} = fract((${pExpr}) * nmSc);
  float nmV0${id} = fract(sin(dot(nmGV${id} + vec2(nmTn * 0.11, 0.0), vec2(127.1, 311.7))) * 43758.5453);
  float nmV1${id} = fract(sin(dot(nmGV${id} + vec2(3.7, nmTn * 0.09), vec2(127.1, 311.7))) * 43758.5453);
  ${hOut} = clamp(max(
    1.0 - length(nmFV${id} - vec2(0.25, 0.35) - nmV0${id} * 0.5),
    1.0 - length(nmFV${id} - vec2(0.72, 0.68) - nmV1${id} * 0.5)
  ), 0.0, 1.0);
`;

export const NORMAL_MAP_DISTORT_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;

  float nmAsp = resolution.x / max(1.0, resolution.y);
  float nmEps = 2.0 / min(resolution.x, resolution.y);
  float nmDet = max(0.15, detail) * 3.5;
  float nmRefr = clamp(refraction, 0.0, 1.0);
  vec2 nmUv = _st;
  nmUv.x *= nmAsp;
  vec2 nmP = nmUv;
  float nmSc = max(2.0, scale);
  float nmTn = time * max(0.0, speed);
  float nmHC = 0.0;
  float nmHX = 0.0;
  float nmHY = 0.0;
  ${NM_VORONOI_AT("nmP", "nmHC", "D0")}
  ${NM_VORONOI_AT("nmP + vec2(nmEps, 0.0)", "nmHX", "D1")}
  ${NM_VORONOI_AT("nmP + vec2(0.0, nmEps)", "nmHY", "D2")}
  vec3 nmN = normalize(vec3((nmHC - nmHX) * nmDet, (nmHC - nmHY) * nmDet, 1.0));

  vec2 nmOff = nmN.xy * nmRefr * a * 0.085;
  nmOff.x /= nmAsp;
  return _st + nmOff;
`;

export const NORMAL_MAP_LIGHT_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec3 nmLit = vec3(0.0, 0.0, 1.0);

  if (mapSource >= 0.5) {
    ${NM_VIDEO_BUMP_NORMAL("nmLit")}
  } else {
    float nmAspL = resolution.x / max(1.0, resolution.y);
    vec2 nmUvL = gl_FragCoord.xy / resolution.xy;
    nmUvL.x *= nmAspL;
    vec2 nmPL = nmUvL;
    float nmSc = max(2.0, scale);
    float nmTn = time * max(0.0, speed);
    float nmDetL = max(0.15, detail) * 3.5;
    float nmEpsL = 2.0 / min(resolution.x, resolution.y);
    float nmHCL = 0.0;
    float nmHXL = 0.0;
    float nmHYL = 0.0;
    ${NM_VORONOI_AT("nmPL", "nmHCL", "L0")}
    ${NM_VORONOI_AT("nmPL + vec2(nmEpsL, 0.0)", "nmHXL", "L1")}
    ${NM_VORONOI_AT("nmPL + vec2(0.0, nmEpsL)", "nmHYL", "L2")}
    nmLit = normalize(vec3((nmHCL - nmHXL) * nmDetL, (nmHCL - nmHYL) * nmDetL, 1.0));
  }

  vec3 nmLightDir = normalize(vec3(clamp(lightX, 0.0, 1.0) * 2.0 - 1.0, clamp(lightY, 0.0, 1.0) * 2.0 - 1.0, 0.62));
  float nmDiff = max(dot(nmLit, nmLightDir), 0.0);
  vec3 nmHalfDir = normalize(nmLightDir + vec3(0.0, 0.0, 1.0));
  float nmSpecPow = mix(10.0, 72.0, clamp(specular, 0.0, 1.0));
  float nmSpec = pow(max(dot(nmLit, nmHalfDir), 0.0), nmSpecPow);

  float nmLitAmt = clamp(lightMix, 0.0, 1.0);
  float nmSpecAmt = clamp(specular, 0.0, 1.0);
  vec3 nmRgb = _c0.rgb;
  nmRgb *= mix(1.0, 0.42 + nmDiff * 0.82, nmLitAmt * a);
  nmRgb += vec3(nmSpec * nmSpecAmt * a * 0.72);
  return vec4(clamp(nmRgb, 0.0, 1.0), _c0.a);
`;
