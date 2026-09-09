/**
 * Random Gallery — grid of drifting lens cells (Shadertoy SnoopehDuckDuck).
 * Refracts the underlying video instead of procedural palette colors.
 * Flat GLSL only (no nested functions).
 */

export const RANDOM_GALLERY_DISTORT_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;

  float aspect = resolution.x / max(1.0, resolution.y);
  float sc = max(2.0, cells);
  float refr = clamp(refraction, 0.0, 1.0);
  float driftAmt = clamp(drift, 0.0, 1.0);
  float t = time * max(0.0, speed);

  vec2 uv = _st;
  uv.x *= aspect;
  uv -= vec2(aspect * 0.5, 0.5);

  uv.x += 0.04 * t * driftAmt;
  uv.y -= cos(1.1 * floor(sc * uv.x) + 0.05 * t) * driftAmt;

  vec2 ipos = floor(sc * uv) + 0.5;
  vec2 fpos = sc * uv - ipos;

  float hCell = fract(sin(dot(ipos, vec2(12.9898, 78.233))) * 43758.5453123);

  float aAng = 6.2831853 * hCell;
  float val0 = hCell - 10.0 * (cos(aAng) * uv.x + sin(aAng) * uv.y) - 0.1 * t;
  float v0Floor = floor(val0);
  float v0Frac = fract(val0);
  float v0Mix = v0Frac * v0Frac * (3.0 - 2.0 * v0Frac);
  float v0A = fract(sin(dot(v0Floor + 0.01 * ipos, vec2(12.9898, 78.233))) * 43758.5453123);
  float v0B = fract(sin(dot(v0Floor + 1.0 + 0.01 * ipos, vec2(12.9898, 78.233))) * 43758.5453123);
  float v0 = mix(v0A, v0B, v0Mix);

  float thcArg = v0 * 10.0 * length(fpos);
  float thcIn = 4.0 * cos(thcArg);
  float thcE2x = exp(clamp(2.0 * thcIn, -20.0, 20.0));
  float thcNum = (thcE2x - 1.0) / (thcE2x + 1.0);
  float thcVal = thcNum / 0.9993292947;

  float val = hCell - 2.5 * v0 * thcVal - 0.5 * t;
  float vFloor = floor(val);
  float vFrac = fract(val);
  float vMix = vFrac * vFrac * (3.0 - 2.0 * vFrac);
  float vA = fract(sin(dot(vFloor + 0.01 * ipos, vec2(12.9898, 78.233))) * 43758.5453123);
  float vB = fract(sin(dot(vFloor + 1.0 + 0.01 * ipos, vec2(12.9898, 78.233))) * 43758.5453123);
  float v = mix(vA, vB, vMix);

  float rd = max(0.08, 0.5 * v);
  float blobT = 10.0 * v + length(fpos) * 10.0 * v0 - t;
  vec2 p = (0.5 - rd) * vec2(cos(blobT), sin(blobT));

  vec2 rel = fpos - p;
  float d = length(rel);

  float k = 0.5;
  float s = smoothstep(-k, k, -d + rd);
  s = 2.0 * s * s * s;

  vec2 grad = vec2(0.0);
  float z = sqrt(max(0.0, rd * rd - d * d));
  float lens = step(d, rd) * step(1e-5, d);
  grad = (-rel / max(d, 1e-5)) * (z / max(rd, 1e-4)) * s * lens;

  vec2 disp = grad * refr * a * 0.18;
  disp.x /= sc * aspect;
  disp.y /= sc;

  vec2 outSt = _st + disp;
  return clamp(outSt, 0.001, 0.999);
`;
