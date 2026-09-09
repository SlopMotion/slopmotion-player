export const SHATTER_LAYER_COORD_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;

  float d = clamp(density, 4.0, 48.0);
  float aspect = resolution.x / max(1.0, resolution.y);
  vec2 cells = vec2(d * aspect, d);
  vec2 scaled = _st * cells;
  vec2 baseCell = floor(scaled);
  vec2 local = fract(scaled);
  float nearest = 100.0;
  vec2 nearestId = baseCell;

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 neighbor = vec2(float(x), float(y));
      vec2 id = baseCell + neighbor;
      vec3 hash = fract(vec3(id.xyx) * vec3(0.1031, 0.1030, 0.0973));
      hash += dot(hash, hash.yzx + 33.33);
      vec2 point = fract((hash.xx + hash.yz) * hash.zy);
      point = mix(vec2(0.5), point, clamp(irregularity, 0.0, 1.0));
      vec2 delta = neighbor + point - local;
      float distanceToPoint = dot(delta, delta);
      if (distanceToPoint < nearest) {
        nearest = distanceToPoint;
        nearestId = id;
      }
    }
  }

  vec3 shardHash = fract(vec3(nearestId.xyx) * vec3(0.1099, 0.1137, 0.1379));
  shardHash += dot(shardHash, shardHash.yzx + 19.19);
  vec2 direction = fract((shardHash.xx + shardHash.yz) * shardHash.zy) - 0.5;
  vec2 offset = direction * clamp(scatter, 0.0, 1.0) * a * 0.12;
  return clamp(_st + offset, vec2(0.001), vec2(0.999));
`;

export const SHATTER_LAYER_GAP_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec2 uv = vec2(
    gl_FragCoord.x / resolution.x,
    1.0 - gl_FragCoord.y / resolution.y
  );
  float d = clamp(density, 4.0, 48.0);
  float aspect = resolution.x / max(1.0, resolution.y);
  vec2 cells = vec2(d * aspect, d);
  vec2 scaled = uv * cells;
  vec2 baseCell = floor(scaled);
  vec2 local = fract(scaled);
  float nearest = 100.0;
  float secondNearest = 100.0;
  vec2 nearestId = baseCell;

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 neighbor = vec2(float(x), float(y));
      vec2 id = baseCell + neighbor;
      vec3 hash = fract(vec3(id.xyx) * vec3(0.1031, 0.1030, 0.0973));
      hash += dot(hash, hash.yzx + 33.33);
      vec2 point = fract((hash.xx + hash.yz) * hash.zy);
      point = mix(vec2(0.5), point, clamp(irregularity, 0.0, 1.0));
      vec2 delta = neighbor + point - local;
      float distanceToPoint = dot(delta, delta);
      if (distanceToPoint < nearest) {
        secondNearest = nearest;
        nearest = distanceToPoint;
        nearestId = id;
      } else if (distanceToPoint < secondNearest) {
        secondNearest = distanceToPoint;
      }
    }
  }

  float edgeDistance = max(0.0, sqrt(secondNearest) - sqrt(nearest));
  float gapWidth = clamp(gap, 0.0, 0.2);
  float edgeMask = 1.0 - smoothstep(gapWidth, gapWidth + 0.045, edgeDistance);
  vec3 shadeHash = fract(vec3(nearestId.xyx) * vec3(0.1271, 0.1459, 0.1637));
  shadeHash += dot(shadeHash, shadeHash.yzx + 27.17);
  float facet = mix(0.78, 1.12, fract((shadeHash.x + shadeHash.y) * shadeHash.z));
  vec3 fractured = clamp(_c0.rgb * facet, 0.0, 1.0);
  vec3 color = mix(fractured, _c1.rgb, edgeMask * a);
  return vec4(color, _c0.a);
`;
