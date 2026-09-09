/** Handheld dance-cam — body sway, step bounce, micro jitter, and roll. Flat GLSL only. */

export const SHAKE_DISTORT_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;

  float spd = clamp(speed, 0.15, 3.0);
  float t = time * spd;
  float bnc = clamp(bounce, 0.0, 1.0);
  float rAmt = clamp(roll, 0.0, 1.0);
  float zAmt = clamp(zoom, 0.0, 1.0);

  float swayX =
    sin(t * 0.71 + 0.2) * 0.58 +
    sin(t * 1.13 + 1.9) * 0.26 +
    sin(t * 0.43 + 3.1) * 0.16;
  float swayY =
    sin(t * 0.83 + 0.7) * 0.36 +
    sin(t * 1.27 + 2.4) * 0.20;

  float step = abs(sin(t * 2.07)) * 0.70 + abs(sin(t * 4.14 + 0.4)) * 0.18;
  float bounceY = (step - 0.34) * bnc;

  float jitX = sin(t * 6.8 + 0.3) * 0.07 + sin(t * 11.3 + 1.6) * 0.03;
  float jitY = cos(t * 7.9 + 0.9) * 0.06 + sin(t * 13.1 + 0.2) * 0.025;

  vec2 trans = vec2(swayX + jitX, swayY + bounceY + jitY) * a * 0.048;

  float ang =
    (sin(t * 0.61 + 0.4) * 0.55 + sin(t * 1.41 + 1.8) * 0.32 + sin(t * 0.29) * 0.16)
    * a * rAmt * 0.08;

  float breath = sin(t * 1.03) * 0.5 + 0.5;
  float cover = 1.0 + a * 0.07 + a * zAmt * (0.07 + breath * 0.045);

  float aspect = resolution.x / max(1.0, resolution.y);
  vec2 uv = _st - 0.5;
  uv.x *= aspect;
  float cs = cos(ang);
  float sn = sin(ang);
  uv = vec2(uv.x * cs - uv.y * sn, uv.x * sn + uv.y * cs);
  uv.x /= aspect;
  uv = uv / cover + 0.5 - trans;
  return clamp(uv, 0.0, 1.0);
`;
