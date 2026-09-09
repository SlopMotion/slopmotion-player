/** VHS / analog tape — tracking wobble, scanlines, grain, chroma bleed, dropouts. Flat GLSL only. */

export const VHS_DISTORT_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;

  float trk = clamp(tracking, 0.0, 1.0);
  float spd = max(0.05, speed);
  float t = time * spd;

  vec2 uv = _st;
  float y = uv.y;
  float row = floor(y * max(1.0, resolution.y));

  float rn = fract(sin(row * 12.9898 + floor(t * 7.0) * 0.17) * 43758.5453);
  float rn2 = fract(sin(row * 78.233 + t * 2.3) * 43758.5453);
  float trackX =
    (rn - 0.5) * trk * a * 0.032 +
    sin(y * 220.0 + t * 5.5) * trk * a * 0.0045;

  float slipGate = step(0.982, fract(sin(floor(t * 1.6) * 991.0) * 43758.5453));
  trackX += slipGate * trk * a * 0.07 * (rn2 - 0.5);

  float headBand = step(0.9, fract(sin(floor(t * 2.8) * 17.0) * 43758.5453));
  float vJitter = headBand * trk * a * 0.014 * sin(t * 36.0);

  return _st + vec2(trackX, vJitter);
`;

export const VHS_COLOR_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  float nz = clamp(noise, 0.0, 1.0);
  float ln = clamp(lines, 0.0, 1.0);
  float dr = clamp(dropout, 0.0, 1.0);

  vec4 c = _c0;
  vec2 px = gl_FragCoord.xy / resolution.xy;
  float yPix = gl_FragCoord.y;

  float scan = sin(yPix * 3.14159) * 0.5 + 0.5;
  float scanDim = mix(1.0, 0.78 + scan * 0.22, ln * a);
  c.rgb *= scanDim;

  float n = fract(sin(dot(px * (time * 55.0 + 1.0), vec2(12.9898, 78.233))) * 43758.5453);
  float n2 = fract(sin(dot(px * 880.0 + floor(time * 22.0), vec2(39.346, 11.135))) * 43758.5453);
  c.rgb += (n - 0.5) * nz * a * 0.11 + (n2 - 0.5) * nz * a * 0.075;

  float row = floor(px.y * 480.0);
  float dropRand = fract(sin(row * 19.19 + floor(time * 3.8) * 0.31) * 43758.5453);
  if (dropRand > 1.0 - dr * a * 0.075) {
    float staticBand = fract(sin(row * 91.7 + time * 110.0) * 43758.5453);
    c.rgb = mix(c.rgb, vec3(staticBand * 0.35 + 0.1), 0.55 * dr * a);
  }

  float luma = dot(c.rgb, vec3(0.299, 0.587, 0.114));
  c.rgb = mix(c.rgb, vec3(luma), a * 0.14);
  c.rgb = mix(c.rgb, c.rgb * vec3(0.98, 1.02, 0.96), a * 0.22);

  return c;
`;
