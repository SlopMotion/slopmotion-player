/** CRT degauss coil — radial pulse plus horizontal/vertical band wobble. Flat GLSL only. */

export const DEGAUSS_DISTORT_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;

  float freq = max(2.0, frequency);
  float spd = max(0.0, speed);
  float t = time * spd;

  vec2 uv = _st;
  vec2 origin = vec2(0.5);
  vec2 centered = uv - origin;
  float aspect = resolution.x / max(1.0, resolution.y);
  centered.x *= aspect;
  float dist = length(centered);

  float radialPhase = t * 2.8 - dist * mix(6.0, 14.0, freq * 0.04);
  float radial =
    sin(radialPhase) * 0.52 +
    sin(radialPhase * 1.63 + 1.1) * 0.28 +
    sin(radialPhase * 2.41 + 2.4) * 0.14;
  float radialScale = 1.0 - smoothstep(0.15, 0.95, dist);
  float radialWarp = radial * a * 0.11 * radialScale;

  float bandY = uv.y * freq * 6.2831853 + t * 3.6;
  float bandX = uv.x * freq * 4.71238898 + t * 2.1;
  float hWobble =
    sin(bandY) * 0.58 +
    sin(bandY * 2.07 + 0.7) * 0.26 +
    sin(bandY * 3.61 + 1.4) * 0.12;
  float vWobble =
    cos(bandX) * 0.42 +
    sin(bandX * 1.83 + 0.9) * 0.22 +
    cos(bandX * 2.97 + 1.8) * 0.1;

  vec2 dir = dist > 1e-4 ? centered / dist : vec2(0.0, 1.0);
  vec2 disp = vec2(hWobble, vWobble) * a * 0.042;
  disp += dir * radialWarp;
  disp.x /= aspect;

  return _st + disp;
`;
