/** Maps vignette edge-blur slider (0–1) to blurNoise amount (0–2). */
export function vignetteBlurStrength(blur: number): number {
  if (blur < 0.00001) return 0;
  return Math.min(2, blur * 2);
}

/** Slider 0–1 → effective darken; full framing lands near 0.5 on the Amount control. */
export function vignetteAmountCurve(amount: number): number {
  const a = Math.max(0, Math.min(1, amount ?? 0));
  return Math.min(1, a * 2);
}

export const VIGNETTE_GRADE_GLSL = `
  vec4 sharp = _c0;
  vec4 soft = _c1;
  float a = clamp(amount, 0.0, 1.0);
  float b = clamp(blur, 0.0, 1.0);
  if (a < 0.00001 && b < 0.00001) return sharp;

  float r = clamp(radius, 0.0, 1.0);
  float s = clamp(softness, 0.0, 1.0);

  vec2 uv = (gl_FragCoord.xy / resolution.xy) - 0.5;
  uv.x *= resolution.x / max(1.0, resolution.y);
  float d = length(uv) / 0.70710678;
  float edge = smoothstep(r, min(1.0, r + max(1e-4, s)), d);

  vec3 color = mix(sharp.rgb, soft.rgb, edge * b);
  float shade = 1.0 - a * edge;
  color *= shade;
  return vec4(color, sharp.a);
`;

/** Noise scatter density for vignette edge blur — slightly softer grain than full-frame noise blur. */
export const VIGNETTE_BLUR_NOISE_SCALE = 18;
export const VIGNETTE_BLUR_NOISE_SPEED = 0.14;

export const VIGNETTE_BLUR_NOISE_PASSES = 2;
