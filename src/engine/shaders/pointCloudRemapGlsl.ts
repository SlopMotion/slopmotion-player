export const POINT_CLOUD_REMAP_GLSL = `
  if (amount < 0.00001) return _c0;

  float c = max(2.0, cols);
  float r = max(2.0, rows);
  vec2 grid = vec2(c, r);
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  float aspect = resolution.x / max(1.0, resolution.y);

  vec2 cellId = floor(uv * grid);
  vec2 cellCenter01 = (cellId + 0.5) / grid;
  vec2 toCenter = cellCenter01 - 0.5;
  toCenter.x *= aspect;

  float l = dot(_c0.rgb, vec3(0.299, 0.587, 0.114));
  float z = clamp(l, 0.0, 1.0);
  float strength = clamp(amount, 0.0, 1.0);

  float scatter = clamp(depth, 0.0, 1.5) * strength;
  float parallaxAmt = clamp(parallax, 0.0, 1.5) * strength;
  float defocus = clamp(blur, 0.0, 1.0);
  float haze = clamp(fog, 0.0, 1.0);

  vec2 cell = fract(uv * grid) - 0.5;

  float lo = clamp(minSize, 0.0, 1.0);
  float hi = clamp(maxSize, 0.0, 1.0);
  float loBound = min(lo, hi);
  float hiBound = max(lo, hi);
  float inkLift = smoothstep(0.006, 0.04, z);

  float centerLayer = z * 15.0;
  vec3 cloud = vec3(0.0);
  float transmittance = 1.0;

  for (int i = 0; i < 16; i++) {
    float layer = float(i);
    float layerT = layer / 15.0;

    float layerDist = abs(layer - centerLayer);
    float weight = exp(-layerDist * layerDist * 3.0);
    if (weight < 0.04) continue;

    float viewZ = mix(11.0, 0.32, layerT);
    float focal = 1.25 / viewZ;
    vec2 perspShift = toCenter * focal * (scatter * 0.95 + parallaxAmt * 1.15);
    vec2 q = cell;
    q -= perspShift;
    q.y += (layerT - 0.5) * (scatter * 0.42 + parallaxAmt * 0.16);

    float perspScale = mix(0.18, 1.0, pow(layerT, 0.78));
    float side = mix(loBound, hiBound, layerT) * min(0.94, perspScale);
    float halfSide = side * 0.5 * inkLift * (1.0 + defocus * (1.0 - layerT) * 0.55);

    float softness = defocus * (1.0 - layerT) * 0.92;
    float dist = max(abs(q.x), abs(q.y));
    float inner = halfSide * max(0.08, 1.0 - softness * 0.7);
    float outer = halfSide * (1.0 + softness * 1.25);
    float mask = 1.0 - smoothstep(inner, outer, dist);

    float layerAlpha = mask * weight * mix(haze * 0.18 + 0.08, 1.0, layerT);
    vec3 col = _c0.rgb * layerAlpha;

    cloud += col * transmittance;
    transmittance *= 1.0 - layerAlpha;
  }

  return mix(_c0, vec4(clamp(cloud, 0.0, 1.0), 1.0), strength);
`;
