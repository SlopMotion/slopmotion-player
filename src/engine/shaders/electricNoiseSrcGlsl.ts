/**
 * Noise animation — Electric (Shadertoy nimitz / stormoid.com).
 * CC BY-NC-SA 3.0 — ridged FBM along expanding rings.
 * Trigger-only: each hit adds one ring; concurrent rings grow out and fade.
 * Note: Hydra wraps src GLSL inside vec4 fn(){…} — no nested functions allowed.
 */

export const ELECTRIC_NOISE_TRIGGER_EXPAND_SEC = Math.PI / (10 * 0.15);

export const ELECTRIC_NOISE_SRC_GLSL = `
  vec2 res = resolution.xy;
  vec2 pBase = gl_FragCoord.xy / res - 0.5;
  pBase.x *= res.x / max(res.y, 1.0);
  pBase *= 4.0 * max(0.25, scale);

  float nScale = max(0.05, noiseScale);
  float turb = clamp(turbulence, 0.0, 0.6);
  float octMax = clamp(detail, 3.0, 6.0);
  float glow = max(0.35, intensity);
  float ringMix = clamp(rings, 0.0, 1.0);
  float ringPow = clamp(ringPower, 0.35, 1.35);
  float trMix = clamp(triggerRings, 0.0, 1.0);

  vec3 col = vec3(0.0);
  float rBase = length(pBase);
  float expandSec = ${ELECTRIC_NOISE_TRIGGER_EXPAND_SEC.toFixed(6)};
  float trOct = min(octMax, 4.0);

  if (triggerRingCount > 0.5 && trMix > 0.00001) {
    vec3 trAcc = vec3(0.0);

    for (int i = 0; i < 6; i++) {
      float fi = float(i);
      float active = step(fi, triggerRingCount - 0.5);
      float ageFrac = texture2D(triggerTex, vec2((fi + 0.5) / 6.0, 0.5)).r;
      float trTAnim = ageFrac * expandSec * max(0.0, speed) * 0.15;
      float fadeIn = smoothstep(0.0, 0.07, ageFrac);
      float fadeOut = 1.0 - smoothstep(0.68, 1.0, ageFrac);
      float trEnv = fadeIn * fadeOut * active;

      // One expanding annulus per event — rings coexist until they grow out.
      float ringR = mix(0.06, 2.6, ageFrac);
      float ringW = mix(0.05, 0.14, ageFrac) * mix(1.4, 0.7, ringPow);
      float ringBand = exp(-pow((rBase - ringR) / max(ringW, 0.001), 2.0));
      float singleRing = mix(ringBand * 0.35, ringBand, ringMix);

      vec2 trP2 = pBase * 0.7;
      vec2 trAnimA = vec2(trTAnim * 1.6);
      vec2 trAnimB = vec2(trTAnim * 1.7);

      float trFbmAx = 0.0;
      {
        float z = 2.0;
        vec2 pp = trP2 - trAnimA;
        for (int j = 0; j < 6; j++) {
          float fj = float(j) + 1.0;
          float w = step(fj, trOct);
          float n = texture2D(noiseTex, pp * 0.01 * nScale).x;
          trFbmAx += abs((n - 0.5) * 2.0) / z * w;
          z *= 2.0;
          pp *= 2.0;
        }
      }

      float trFbmBy = 0.0;
      {
        float z = 2.0;
        vec2 pp = trP2 + trAnimB;
        for (int j = 0; j < 6; j++) {
          float fj = float(j) + 1.0;
          float w = step(fj, trOct);
          float n = texture2D(noiseTex, pp * 0.01 * nScale).x;
          trFbmBy += abs((n - 0.5) * 2.0) / z * w;
          z *= 2.0;
          pp *= 2.0;
        }
      }

      vec2 trBasis = (vec2(trFbmAx, trFbmBy) - 0.5) * turb;
      vec2 trPWarp = pBase + trBasis;
      float trCR = cos(trTAnim * 0.2);
      float trSR = sin(trTAnim * 0.2);
      mat2 trRotM = mat2(trCR, -trSR, trSR, trCR);
      vec2 trPRot = trPWarp * trRotM;

      float trRz = 0.0;
      {
        float z = 2.0;
        vec2 pp = trPRot;
        for (int j = 0; j < 6; j++) {
          float fj = float(j) + 1.0;
          float w = step(fj, trOct);
          float n = texture2D(noiseTex, pp * 0.01 * nScale).x;
          trRz += abs((n - 0.5) * 2.0) / z * w;
          z *= 2.0;
          pp *= 2.0;
        }
      }

      vec3 tint = max(vec3(colorR, colorG, colorB), vec3(0.02));
      vec3 trCol = tint * glow / max(trRz, 0.02);
      trCol = pow(abs(trCol), vec3(0.99));
      trAcc += trCol * trEnv * singleRing;
    }

    col = min(trAcc * trMix, vec3(4.0));
  }

  return vec4(col, 1.0);
`;
