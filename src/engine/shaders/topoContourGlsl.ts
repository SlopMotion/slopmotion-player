/**
 * Topographic isolines (Shadertoy isovalues) — Hydra src layer.
 * Valleys: dim scrolled video. Ridges: rainbow or white-shade mono; optional video tint.
 * Flat GLSL only (no nested functions, no fwidth — WebGL1-safe).
 */
export const TOPO_CONTOUR_SRC_GLSL = `
  vec2 R = resolution.xy;
  vec2 U = gl_FragCoord.xy;
  vec2 uv = U / R;
  float t = time * max(0.0, speed);
  float ns = max(0.25, scale);
  float lineFreq = max(2.0, lines);
  float valleyMix = clamp(valley, 0.0, 1.0);
  float widthMul = clamp(lineWidth, 0.35, 2.5);
  float vidTint = clamp(videoTint, 0.0, 1.0);
  float monoOn = step(0.5, clamp(palette, 0.0, 1.0));

  vec3 nx = vec3(U * (8.0 * ns) / R.y, 0.1 * t);
  vec3 p0 = floor(nx);
  vec3 f0 = fract(nx);
  f0 = f0 * f0 * (3.0 - 2.0 * f0);
  float h000 = fract(sin(1000.0 * dot(p0 + vec3(0.0, 0.0, 0.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h100 = fract(sin(1000.0 * dot(p0 + vec3(1.0, 0.0, 0.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h010 = fract(sin(1000.0 * dot(p0 + vec3(0.0, 1.0, 0.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h110 = fract(sin(1000.0 * dot(p0 + vec3(1.0, 1.0, 0.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h001 = fract(sin(1000.0 * dot(p0 + vec3(0.0, 0.0, 1.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h101 = fract(sin(1000.0 * dot(p0 + vec3(1.0, 0.0, 1.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h011 = fract(sin(1000.0 * dot(p0 + vec3(0.0, 1.0, 1.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h111 = fract(sin(1000.0 * dot(p0 + vec3(1.0, 1.0, 1.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float n0 = mix(
    mix(mix(h000, h100, f0.x), mix(h010, h110, f0.x), f0.y),
    mix(mix(h001, h101, f0.x), mix(h011, h111, f0.x), f0.y),
    f0.z
  );

  vec3 nx1 = nx + 11.5;
  vec3 p1 = floor(nx1);
  vec3 f1 = fract(nx1);
  f1 = f1 * f1 * (3.0 - 2.0 * f1);
  float h000b = fract(sin(1000.0 * dot(p1 + vec3(0.0, 0.0, 0.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h100b = fract(sin(1000.0 * dot(p1 + vec3(1.0, 0.0, 0.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h010b = fract(sin(1000.0 * dot(p1 + vec3(0.0, 1.0, 0.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h110b = fract(sin(1000.0 * dot(p1 + vec3(1.0, 1.0, 0.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h001b = fract(sin(1000.0 * dot(p1 + vec3(0.0, 0.0, 1.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h101b = fract(sin(1000.0 * dot(p1 + vec3(1.0, 0.0, 1.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h011b = fract(sin(1000.0 * dot(p1 + vec3(0.0, 1.0, 1.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float h111b = fract(sin(1000.0 * dot(p1 + vec3(1.0, 1.0, 1.0), vec3(1.0, 57.0, -13.7))) * 4375.5453);
  float n1 = mix(
    mix(mix(h000b, h100b, f1.x), mix(h010b, h110b, f1.x), f1.y),
    mix(mix(h001b, h101b, f1.x), mix(h011b, h111b, f1.x), f1.y),
    f1.z
  );

  float n = (n0 + n1) * 0.5;
  float sv = sin(6.2831853 * lineFreq * n);
  float estFw = 6.2831853 * lineFreq * 8.0 * ns / max(R.y, 1.0) * 0.22 * widthMul;
  float v = smoothstep(1.0, 0.0, 0.5 * abs(sv) / max(estFw, 1.0e-5));

  vec2 valleyUv = clamp((U + vec2(1.0, sin(t))) / R, 0.001, 0.999);
  vec3 valleyVideo = texture2D(videoTex, valleyUv).rgb;
  vec3 valleyColor = exp(-33.0 / max(R.y, 1.0)) * valleyVideo * valleyMix;
  vec3 valleyMono = vec3(0.035) * valleyMix;
  vec3 valleyCol = mix(valleyColor, valleyMono, monoOn);

  vec3 rainbow = 0.5 + 0.5 * sin(12.0 * n + vec3(0.0, 2.1, -2.1));
  float whiteBand = 0.5 + 0.5 * sin(12.0 * n + 0.65);
  vec3 monoRidge = vec3(mix(0.62, 1.0, whiteBand));
  vec3 vid = texture2D(videoTex, clamp(uv, 0.001, 0.999)).rgb;
  vec3 ridgeRainbow = mix(rainbow, clamp(vid * rainbow * 2.2, 0.0, 1.0), vidTint);
  vec3 ridgeCol = mix(ridgeRainbow, monoRidge, monoOn);

  vec3 mapped = mix(valleyCol, ridgeCol, v);
  return vec4(mapped, 1.0);
`;
