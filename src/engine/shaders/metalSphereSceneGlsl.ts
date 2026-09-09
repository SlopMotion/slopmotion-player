/** SDF body — writes distance into `dm`. Fixed organic merges + noise shell. */
function sdfBody(qVar: string): string {
  return `
    vec3 wq = ${qVar} + vec3(
      _noise(${qVar} * 0.38 + vec3(tb * 0.16, 0.0, 2.4)),
      _noise(${qVar} * 0.38 + vec3(1.7, tb * 0.12, 0.0)),
      _noise(${qVar} * 0.38 + vec3(0.0, 3.1, tb * 0.14))
    ) * 0.0045;
    dm = length(wq) - coreR;

    float ba0 = _noise(vec3(0.17, tb * 0.21, 1.3)) * TAU + tb * 0.43;
    float bb0 = _noise(vec3(2.8, tb * 0.17, 0.4)) * PI;
    float br0 = blobR * (0.76 + 0.44 * _noise(vec3(4.1, tb * 0.09, 0.2)));
    float dist0 = blobOrbit * (0.62 + 0.48 * _noise(vec3(1.7, tb * 0.13, 3.9)));
    vec3 c0 = vec3(cos(ba0) * sin(bb0), cos(bb0), sin(ba0) * sin(bb0)) * dist0;
    float db = length(wq - c0) - br0;
    float h = max(mergeK - abs(dm - db), 0.0) / mergeK;
    dm = min(dm, db) - h * h * mergeK * 0.25;

    float ba1 = _noise(vec3(5.3, tb * 0.19, 2.1)) * TAU + tb * 0.31 + 1.9;
    float bb1 = _noise(vec3(1.2, tb * 0.23, 6.7)) * PI;
    float br1 = blobR * (0.8 + 0.38 * _noise(vec3(3.3, tb * 0.11, 1.8)));
    float dist1 = blobOrbit * (0.58 + 0.52 * _noise(vec3(8.4, tb * 0.15, 0.6)));
    vec3 c1 = vec3(cos(ba1) * sin(bb1), cos(bb1), sin(ba1) * sin(bb1)) * dist1;
    db = length(wq - c1) - br1;
    h = max(mergeK - abs(dm - db), 0.0) / mergeK;
    dm = min(dm, db) - h * h * mergeK * 0.25;

    if (nAmt > 0.001) {
      vec3 nDir = normalize(wq + 1e-4);
      vec3 nSeed = nDir * (1.05 + nScale * 0.22) + vec3(tb * 0.14, -tb * 0.1, tb * 0.07);
      float nf = nScale * 0.72;
      float ns = _noise(nSeed * nf) * 0.62 + _noise(nSeed * nf * 2.05 + 3.8) * 0.28;
      ns += _noise(nSeed * nf * 4.1 + 8.3) * 0.1 * smoothstep(2.5, 6.0, nScale);
      dm -= ns * (0.022 + nAmt * 0.34) * sz;
    }
  `;
}

export const METAL_SPHERE_SCENE_GLSL = `
  float amt = clamp(amount, 0.0, 1.0);
  if (amt < 0.00001) return _c0;

  const float PI = 3.14159265;
  const float TAU = 6.2831853;
  float sz = clamp(sphereSize, 0.35, 2.0);
  float nAmt = clamp(noiseAmt, 0.0, 1.0);
  float nScale = max(1.0, detail);
  float spd = max(0.0, speed);
  float rough = clamp(roughness, 0.02, 1.0);
  float refInt = clamp(reflectAmt, 0.0, 2.0);
  float orbitSpd = rotation * TAU;
  float vidAspect = max(1.0, envAspect);
  float tb = time * spd * 0.36;
  float mergeK = 0.16 * sz;
  float blobR = 0.19 * sz;
  float blobOrbit = 0.38 * sz;
  float coreR = 1.08 * sz;

  vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
  uv.x *= resolution.x / max(1.0, resolution.y);

  float ay = time * orbitSpd * 0.55;
  float ax = sin(time * spd * 0.33) * 0.32;
  mat3 rotY = mat3(
    cos(ay), 0.0, sin(ay),
    0.0, 1.0, 0.0,
    -sin(ay), 0.0, cos(ay)
  );
  mat3 rotX = mat3(
    1.0, 0.0, 0.0,
    0.0, cos(ax), -sin(ax),
    0.0, sin(ax), cos(ax)
  );
  mat3 rot = rotX * rotY;

  vec3 ro = vec3(0.0, 0.0, 3.35);
  vec3 rd = normalize(vec3(uv, -1.85));

  float t = 0.0;
  float hit = 0.0;
  vec3 p = ro;
  vec3 qHit = vec3(0.0);
  float dm = 1e6;
  for (int i = 0; i < 44; i++) {
    p = ro + rd * t;
    qHit = vec3(dot(rot[0], p), dot(rot[1], p), dot(rot[2], p));
    ${sdfBody("qHit")}
    if (dm < 0.0014 * sz) {
      hit = 1.0;
      break;
    }
    if (t > 8.5 * sz) break;
    t += max(dm * 0.78, 0.0012 * sz);
  }

  vec3 scene = vec3(0.0);
  if (hit > 0.5) {
    float e = 0.0048 * sz;
    vec3 q0 = qHit;
    vec3 q1 = qHit + vec3(e, 0.0, 0.0);
    vec3 q2 = qHit + vec3(0.0, e, 0.0);
    vec3 q3 = qHit + vec3(0.0, 0.0, e);
    float f0 = 0.0;
    float f1 = 0.0;
    float f2 = 0.0;
    float f3 = 0.0;

    {
      ${sdfBody("q0")}
      f0 = dm;
    }
    {
      ${sdfBody("q1")}
      f1 = dm;
    }
    {
      ${sdfBody("q2")}
      f2 = dm;
    }
    {
      ${sdfBody("q3")}
      f3 = dm;
    }

    vec3 nObj = normalize(vec3(f1 - f0, f2 - f0, f3 - f0));
    vec3 nWorld = normalize(nObj.x * rot[0] + nObj.y * rot[1] + nObj.z * rot[2]);
    vec3 viewDir = normalize(ro - p);
    float ndv = max(dot(nWorld, viewDir), 0.001);
    vec3 refl = reflect(-viewDir, nWorld);

    vec3 r = normalize(refl);
    float lon = atan(r.x, r.z);
    float lat = asin(clamp(r.y, -1.0, 1.0));
    float envU = lon / TAU + 0.5;
    envU = (envU - 0.5) / vidAspect + 0.5;
    float envV = 0.5 - lat / PI;
    vec2 envUV = clamp(vec2(envU, envV), 0.0, 1.0);
    vec3 env = texture2D(tex, envUV).rgb;

    float blur = rough * 0.55;
    if (blur > 0.12) {
      vec3 t1 = normalize(cross(r, vec3(0.0, 1.0, 0.0)) + vec3(0.001));
      vec3 rOff = normalize(r + t1 * blur * 0.22);
      lon = atan(rOff.x, rOff.z);
      lat = asin(clamp(rOff.y, -1.0, 1.0));
      envU = (lon / TAU) / vidAspect + 0.5;
      envV = 0.5 - lat / PI;
      env += texture2D(tex, clamp(vec2(envU, envV), 0.0, 1.0)).rgb;
      rOff = normalize(r - t1 * blur * 0.22);
      lon = atan(rOff.x, rOff.z);
      lat = asin(clamp(rOff.y, -1.0, 1.0));
      envU = (lon / TAU) / vidAspect + 0.5;
      envV = 0.5 - lat / PI;
      env += texture2D(tex, clamp(vec2(envU, envV), 0.0, 1.0)).rgb;
      env *= 0.5;
    }
    env *= refInt;

    vec3 keyLight = normalize(vec3(-0.82, 0.92, 0.72));
    vec3 fillLight = normalize(vec3(0.08, 0.12, 0.99));
    vec3 backLight = normalize(vec3(0.48, 0.22, -0.86));
    float ndlKey = dot(nWorld, keyLight);
    float ndlFill = dot(nWorld, fillLight);
    float ndlBack = dot(nWorld, backLight);

    float wrapKey = clamp((ndlKey + 0.48) / 1.48, 0.0, 1.0);
    float keyFalloff = pow(wrapKey, mix(1.45, 0.55, rough));
    float fillWrap = pow(clamp((ndlFill + 0.12) / 1.12, 0.0, 1.0), 0.85);
    float backWrap = pow(clamp((ndlBack + 0.28) / 1.28, 0.0, 1.0), 1.1);
    float fresnel = pow(1.0 - ndv, mix(1.6, 4.2, 1.0 - rough));
    float rimMask = pow(1.0 - ndv, mix(1.2, 2.8, 1.0 - rough));
    float shadowSide = pow(clamp(-ndlKey * 0.42 + 0.52, 0.0, 1.0), 1.15);

    vec3 Hkey = normalize(viewDir + keyLight);
    float specTight = pow(max(dot(nWorld, Hkey), 0.0), mix(360.0, 22.0, rough));
    float specSoft = pow(max(dot(nWorld, Hkey), 0.0), mix(72.0, 8.0, rough));

    vec3 Hback = normalize(viewDir + backLight);
    float backSpec = pow(max(dot(nWorld, Hback), 0.0), mix(140.0, 12.0, rough));

    vec3 reflectBase = env * (0.72 + fresnel * 0.38);
    vec3 reflectFill = env * fillWrap * 0.42;
    vec3 body = reflectBase + reflectFill;
    body *= 0.52 + keyFalloff * 0.48;
    body = mix(body, env, fresnel * 0.28);

    vec3 specKey = vec3(specTight * (1.55 - rough * 0.75) * keyFalloff);
    specKey += vec3(specSoft * 0.38 * (1.0 - rough * 0.35) * keyFalloff);

    vec3 specBack = vec3(backSpec * backWrap * rimMask * 0.55 * (1.0 - rough * 0.25));

    vec3 metal = body + specKey + specBack;
    metal = mix(metal, metal * 0.72, shadowSide * 0.45);
    metal = mix(metal, env * 0.35 + metal * 0.65, rimMask * 0.22);

    float luma = dot(metal, vec3(0.299, 0.587, 0.114));
    metal = mix(metal, metal * 1.18 + vec3(0.04), smoothstep(0.02, 0.35, luma));

    scene = metal;
  }

  if (hit < 0.5) return _c0;
  return vec4(mix(_c0.rgb, scene, amt), _c0.a);
`;
