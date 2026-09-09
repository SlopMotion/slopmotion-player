/** Outer-tap radius in pixels at amount 1 (slider 50% of 0–2). Amount 2 = 2×. */
export const BLUR_GAUSSIAN_OUTER_PX = 32;

/** Pascal row n=12 — 13 taps. */
const BINOMIAL_13 = [1, 12, 66, 220, 495, 792, 924, 792, 495, 220, 66, 12, 1] as const;

const BINOMIAL_9 = [1, 8, 28, 56, 70, 56, 28, 8, 1] as const;

function mirrorSample(uvExpr: string, weight: number): string {
  return [
    `  u = ${uvExpr};`,
    `  t = u - 2.0 * floor(u * 0.5);`,
    `  t = mix(t, 2.0 - t, step(1.0, t));`,
    `  acc += texture2D(blurTex, clamp(t, inset, 1.0 - inset)) * ${weight.toFixed(6)};`,
  ].join("\n");
}

function buildAxisSamples(): string {
  const n = BINOMIAL_13.length;
  const mid = (n - 1) / 2;
  const sum = BINOMIAL_13.reduce((acc, w) => acc + w, 0);
  const lines: string[] = [];
  for (let i = 0; i < n; i++) {
    const w = BINOMIAL_13[i]! / sum;
    const k = i - mid;
    const uv = k === 0 ? "st" : `st + cell * ${k.toFixed(1)}`;
    lines.push(mirrorSample(uv, w));
  }
  return lines.join("\n");
}

function buildTensorSamples(): string {
  const n = BINOMIAL_9.length;
  const mid = (n - 1) / 2;
  const sum = BINOMIAL_9.reduce((acc, w) => acc + w, 0);
  const lines: string[] = [];
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const w = (BINOMIAL_9[x]! * BINOMIAL_9[y]!) / (sum * sum);
      const dx = x - mid;
      const dy = y - mid;
      const uv =
        dx === 0 && dy === 0
          ? "st"
          : `st + vec2(${dx.toFixed(1)}, ${dy.toFixed(1)}) * cell`;
      lines.push(mirrorSample(uv, w));
    }
  }
  return lines.join("\n");
}

const SHARED_SETUP = `
  float a = clamp(amount, 0.0, 2.0);
  if (a < 0.00001) return _c0;

  vec2 st = gl_FragCoord.xy / max(resolution.xy, vec2(1.0));
  vec2 texel = 1.0 / max(resolution.xy, vec2(1.0));
  vec2 inset = texel * 0.5;
  float outer = a * ${BLUR_GAUSSIAN_OUTER_PX.toFixed(1)};
  vec2 u = vec2(0.0);
  vec2 t = vec2(0.0);
  vec4 acc = vec4(0.0);
`;

/**
 * One separable pass. `axis` 0 = horizontal, 1 = vertical.
 * Amount is radius (not a mix with the sharp frame).
 */
export const BLUR_GAUSSIAN_AXIS_GLSL = `
${SHARED_SETUP}
  vec2 cell = (axis < 0.5 ? vec2(texel.x, 0.0) : vec2(0.0, texel.y)) * max(0.6, outer / 6.0);
${buildAxisSamples()}
  return vec4(acc.rgb, _c0.a);
`;

/**
 * Single-pass 9×9 fallback when a second aux buffer is not free.
 * Tighter tap spacing than a 7×7 at the same radius so it does not grid.
 */
export const BLUR_GAUSSIAN_COLOR_GLSL = `
${SHARED_SETUP}
  vec2 cell = texel * max(0.6, outer / 4.0);
${buildTensorSamples()}
  return vec4(acc.rgb, _c0.a);
`;
