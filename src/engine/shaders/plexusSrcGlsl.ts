/**
 * Plexus — animated node grid (Shadertoy lscczl NetLayer, BigWings 2018).
 * CC BY-NC-SA 3.0 — https://www.shadertoy.com/view/lscczl
 * Flat GLSL for Hydra src registration (no nested functions).
 *
 * pointDensity  → grid scale (how many nodes fill the frame)
 * lineIntensity → line alpha + glow (brightness and halo width)
 * glow          → node sparkle intensity only
 *
 * Single-cell evaluation: shared boundary nodes hash identically in adjacent
 * cells, so the full symmetric edge set (4 inner-diamond + 4 axis + 4 diagonal
 * spokes) tiles seamlessly with every center fully connected to its neighbours.
 * Depth layers must be 1, 2, 4, or 8 so layer offsets divide the unit cell evenly.
 */

export const PLEXUS_LAYER_CHOICES = [1, 2, 4, 8] as const;

export function snapPlexusLayers(raw: number): number {
  const choices = PLEXUS_LAYER_CHOICES;
  if ((choices as readonly number[]).includes(raw)) return raw;
  let best: number = choices[0];
  for (const choice of choices) {
    if (Math.abs(choice - raw) < Math.abs(best - raw)) best = choice;
  }
  return best;
}

const lineSeg = (
  a: string,
  b: string,
  uv: string,
  out: string,
  zExpr: string,
) => `
    {
      vec2 pa = ${uv} - ${a};
      vec2 ba = ${b} - ${a};
      float hSeg = clamp(dot(pa, ba) / max(dot(ba, ba), 1.0e-6), 0.0, 1.0);
      float d = length(pa - ba * hSeg);
      float d2 = length(${a} - ${b});
      float fade = smoothstep(0.5, 1.5, d2);
      fade += smoothstep(0.02, 0.05, abs(d2 - 0.75));
      float depthW = mix(0.01, 0.07, smoothstep(0.92, 0.08, ${zExpr}));
      float along = 1.0 - 4.0 * hSeg * (1.0 - hSeg);
      depthW *= mix(0.55, 1.45, along);
      float core = smoothstep(depthW, depthW * 0.18, d);
      float halo = exp(-14.0 * d / max(depthW, 0.001)) * 0.48 * haloGain;
      ${out} += (core + halo) * fade * lineBright;
    }`;

const nodePos = (slot: string, offsX: string, offsY: string, idVar: string, tVar: string) => `
    {
      vec2 offs = vec2(${offsX}, ${offsY});
      vec2 pid = ${idVar} + offs;
      vec3 ha = fract(vec3(pid.xyx) * vec3(213.897, 653.453, 253.098));
      ha += dot(ha, ha.yzx + 79.76);
      float rn = fract((ha.x + ha.y) * ha.z);
      float n1 = fract(rn * 10.0);
      float n2 = fract(rn * 100.0);
      float ang = ${tVar} + rn;
      ${slot} = offs + vec2(sin(ang * n1), cos(ang * n2)) * 0.4;
    }`;

const nodeSparkle = (
  pt: string,
  uv: string,
  out: string,
  layerDepth: string,
  dotAmp: string,
  dotSize: string,
  sparkleNorm: string,
) => `
    {
      float d = length(${uv} - ${pt});
      float core = (0.006 * ${dotAmp}) / max(d * d, 1.0e-4);
      core *= smoothstep(${dotSize}, ${dotSize} * 0.42, d);
      float pulse = pow(sin((fract(${pt}.x) + fract(${pt}.y) + tAnim) * 5.0) * 0.4 + 0.6, 20.0);
      pulse = mix(1.0, pulse, ${sparkleNorm});
      ${out} += core * pulse * mix(0.4, 1.2, ${layerDepth});
    }`;

export const PLEXUS_SRC_GLSL = `
  vec2 res = resolution.xy;
  vec2 uv = (gl_FragCoord.xy - res * 0.5) / res.y;

  float spd = max(0.0, speed);
  float tRot = time * spd * 0.1;

  float tAnim = time * spd;
  float layerCount = layers <= 1.5 ? 1.0 : (layers <= 3.0 ? 2.0 : (layers <= 6.0 ? 4.0 : 8.0));
  float layerStep = 1.0 / layerCount;

  float pointNorm = clamp((pointDensity - 1.05) / 1.15, 0.0, 1.0);
  float sizeMax = mix(6.0, 13.0, pointNorm);

  float intensityNorm = clamp(lineIntensity, 0.0, 2.0);
  float lineBright = intensityNorm;
  float haloGain = mix(0.35, 2.4, intensityNorm * 0.5);

  float sparkleNorm = clamp(glow / 2.4, 0.0, 1.0);
  float dotAmp = mix(0.0, 7.0, sparkleNorm * sparkleNorm);
  float dotSize = mix(0.018, 0.1, sparkleNorm);

  vec2 parallaxBase = vec2(sin(tAnim * 0.17), cos(tAnim * 0.23)) * 0.32;

  float m = 0.0;

  for (float layerIdx = 0.0; layerIdx < 8.0; layerIdx += 1.0) {
    if (layerIdx > layerCount - 0.5) break;

    float n = layerIdx * layerStep;
    float z = fract(tRot + n);
    float size = mix(sizeMax, 1.0, z);
    float layerFade = smoothstep(0.0, 0.6, z) * smoothstep(1.0, 0.8, z);
    vec2 stLayer = uv * size - parallaxBase * z;
    float layerDepth = 1.0 - z;

    vec2 id = floor(stLayer) + n;
    vec2 stLocal = fract(stLayer) - 0.5;

    vec2 p0;
    vec2 p1;
    vec2 p2;
    vec2 p3;
    vec2 p4;
    vec2 p5;
    vec2 p6;
    vec2 p7;
    vec2 p8;

    ${nodePos("p0", "-1.0", "-1.0", "id", "tAnim")}
    ${nodePos("p1", "0.0", "-1.0", "id", "tAnim")}
    ${nodePos("p2", "1.0", "-1.0", "id", "tAnim")}
    ${nodePos("p3", "-1.0", "0.0", "id", "tAnim")}
    ${nodePos("p4", "0.0", "0.0", "id", "tAnim")}
    ${nodePos("p5", "1.0", "0.0", "id", "tAnim")}
    ${nodePos("p6", "-1.0", "1.0", "id", "tAnim")}
    ${nodePos("p7", "0.0", "1.0", "id", "tAnim")}
    ${nodePos("p8", "1.0", "1.0", "id", "tAnim")}

    float mLocal = 0.0;
    float sparkle = 0.0;

    ${lineSeg("p1", "p5", "stLocal", "mLocal", "layerDepth")}
    ${lineSeg("p5", "p7", "stLocal", "mLocal", "layerDepth")}
    ${lineSeg("p7", "p3", "stLocal", "mLocal", "layerDepth")}
    ${lineSeg("p3", "p1", "stLocal", "mLocal", "layerDepth")}

    ${lineSeg("p4", "p1", "stLocal", "mLocal", "layerDepth")}
    ${lineSeg("p4", "p5", "stLocal", "mLocal", "layerDepth")}
    ${lineSeg("p4", "p7", "stLocal", "mLocal", "layerDepth")}
    ${lineSeg("p4", "p3", "stLocal", "mLocal", "layerDepth")}

    ${lineSeg("p4", "p0", "stLocal", "mLocal", "layerDepth")}
    ${lineSeg("p4", "p2", "stLocal", "mLocal", "layerDepth")}
    ${lineSeg("p4", "p6", "stLocal", "mLocal", "layerDepth")}
    ${lineSeg("p4", "p8", "stLocal", "mLocal", "layerDepth")}

    ${nodeSparkle("p1", "stLocal", "sparkle", "layerDepth", "dotAmp", "dotSize", "sparkleNorm")}
    ${nodeSparkle("p3", "stLocal", "sparkle", "layerDepth", "dotAmp", "dotSize", "sparkleNorm")}
    ${nodeSparkle("p4", "stLocal", "sparkle", "layerDepth", "dotAmp", "dotSize", "sparkleNorm")}
    ${nodeSparkle("p5", "stLocal", "sparkle", "layerDepth", "dotAmp", "dotSize", "sparkleNorm")}
    ${nodeSparkle("p7", "stLocal", "sparkle", "layerDepth", "dotAmp", "dotSize", "sparkleNorm")}

    float sPhase = (sin(tAnim + n) + sin(tAnim * 0.1)) * 0.25 + 0.5;
    sPhase += pow(sin(tAnim * 0.1) * 0.5 + 0.5, 50.0) * 5.0;
    mLocal += sparkle * sPhase;
    mLocal *= mix(0.55, 1.25, layerDepth);

    m += layerFade * mLocal;
  }

  vec3 baseCol = vec3(1.0, 0.58, 0.35);
  vec3 col = baseCol * m;

  float audioGlow = -uv.y * max(0.0, audioBoost) * 2.0;
  col += baseCol * audioGlow;

  col *= 1.0 - dot(uv, uv);
  col = clamp(col, 0.0, 1.0);

  return vec4(col, 1.0);
`;
