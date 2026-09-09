/**
 * Warp Tunnel — watery refractive tunnel (Shadertoy SH16B, stripped of planets/galaxy).
 * CC BY-NC-SA 3.0 — https://www.shadertoy.com/view/4sX3Rs
 * Perf: 3-octave noise in march + 2-tap XY normals; tier scales step count.
 *
 * Samples the raw video via the `videoTex` sampler input. Do NOT sample
 * `prevBuffer` here: hydra binds it to the same ping-pong fbo the pass renders
 * into, so referencing it forms a WebGL framebuffer feedback loop — every draw
 * is dropped and the whole output freezes (regression shipped in cc7454c).
 */

function map3Body(posVar: string, out: string): string {
  const o = out;
  return `
    vec3 q${o} = ${posVar};
    float f${o} = 0.0;
    f${o} += 0.50000 * _noise(q${o}); q${o} *= 2.02;
    f${o} += 0.25000 * _noise(q${o}); q${o} *= 2.03;
    f${o} += 0.12500 * _noise(q${o});
    float ${out} = f${o};
  `;
}

function tunnelMapBody(
  posVar: string,
  zOffVar: string,
  shakeVar: string,
  tVar: string,
  armsVar: string,
  audioVar: string,
  out: string,
): string {
  const o = out;
  return `
    vec3 mp${o} = ${posVar};
    mp${o}.z -= ${zOffVar};
    float tz${o} = mp${o}.z;
    vec2 tc${o} = vec2(sin(tz${o} * 0.17) * 0.4, sin(tz${o} * 0.1 + 4.0)) * 3.0 * ${shakeVar};
    mp${o}.xy -= tc${o};
    float ang${o} = atan(mp${o}.y, mp${o}.x) - mp${o}.z * 0.25 + ${tVar} * 3.7 + sin(${tVar}) * 0.2;
    ${map3Body(`mp${o}`, `m${o}`)}
    float rad${o} = sin(mp${o}.z * 0.1) * 0.5 + 3.0 + m${o} * 0.3 + ${audioVar} * 2.0 + sin(ang${o} * ${armsVar}) * 0.3;
    float ${out} = length(mp${o}.xy) - rad${o};
  `;
}

export const WARP_TUNNEL_COLOR_GLSL = `
  float amt = clamp(amount, 0.0, 1.0);
  if (amt < 0.00001) return _c0;

  float wtTime = time;
  float qTier = clamp(tunnelQuality, 0.0, 2.0);
  float marchLimit = qTier < 0.5 ? 42.0 : (qTier < 1.5 ? 34.0 : 28.0);
  float spdNorm = clamp(tunnelSpeed, 0.0, 3.0) / 3.0;
  float travelSpd = pow(spdNorm, 2.35) * 18.0;
  float zOffset = wtTime * travelSpd;
  float introFade = min(wtTime * 0.35, 1.0);
  float camZoom = 3.0 - introFade * 2.0;
  float tunnelShake = max(0.35, introFade);
  float armsAmt = max(1.0, tunnelArms);
  float fogMix = clamp(tunnelFog, 0.0, 1.0);
  float refAmt = clamp(tunnelRefract, 0.0, 1.0);
  float shineAmt = clamp(tunnelShine, 0.0, 1.0);
  float audioReact = max(0.0, audioBoost);
  float asp = resolution.x / max(1.0, resolution.y);
  float warpAmt = refAmt * 1.12;

  vec3 sunDir = normalize(vec3(-0.364, 0.582, 0.727));
  vec3 sunColor = vec3(1.35, 1.05, 0.82);

  vec2 uvBg = gl_FragCoord.xy / resolution.xy;
  vec2 vanish = uvBg - vec2(0.5, 0.5);
  vanish.x *= asp;
  float vanishR = length(vanish);
  float endGlow = exp(-vanishR * vanishR * 5.5);
  vec3 tunnelGlow = vec3(1.0) * endGlow * (0.14 + fogMix * 0.22);

  vec2 warpBase = uvBg - 0.5;
  warpBase.x *= asp;
  float warpR = length(warpBase);
  float warpSafe = smoothstep(0.0, 0.018, warpR);
  float warpTheta = atan(warpBase.y, warpBase.x);
  float warpSwirl = warpTheta + sin(warpR * 7.5 - wtTime * 1.15 + zOffset * 0.02) * 0.05 * warpAmt;
  float warpBarrel = 1.0 + pow(warpR, 1.75) * warpAmt * 1.05;
  vec2 warpP = vec2(cos(warpSwirl), sin(warpSwirl)) * warpR / warpBarrel;
  warpP.x /= asp;
  vec2 uvWarpFull = clamp(warpP + 0.5, 0.001, 0.999);
  vec2 uvWarp = mix(uvBg, uvWarpFull, warpSafe);
  vec3 bgVideo = texture2D(videoTex, uvWarp).rgb;

  vec3 camPos = vec3(0.0);
  float camZ = camPos.z - zOffset;
  vec2 tcCam = vec2(sin(camZ * 0.17) * 0.4, sin(camZ * 0.1 + 4.0)) * 3.0 * tunnelShake;
  camPos.xy += tcCam * 0.5;

  vec3 camTarget = vec3(0.0, 0.0, 5.0);
  float tgtZ = camTarget.z - zOffset;
  vec2 tcTgt = vec2(sin(tgtZ * 0.17) * 0.4, sin(tgtZ * 0.1 + 4.0)) * 3.0 * tunnelShake;
  camTarget.xy += tcTgt * 0.5;
  camTarget = mix(vec3(3.0, 0.0, 5.0), camTarget, introFade);

  float camAngle = sin(wtTime * 0.3) + wtTime * 0.1;
  vec3 camUp = vec3(sin(camAngle), cos(camAngle), 0.0);

  vec3 fwd = normalize(camTarget - camPos);
  vec3 camX = normalize(cross(fwd, camUp));
  vec3 camY = cross(camX, fwd);

  vec2 uvScr = (gl_FragCoord.xy - 0.5 * resolution.xy) / (resolution.y * camZoom);
  vec3 eyeDir = normalize(camX * uvScr.x + camY * uvScr.y + fwd);

  float marchT = 0.0;
  vec3 marchP = camPos;
  float hitDist = 1e6;

  for (int i = 0; i < 42; i++) {
    if (float(i) >= marchLimit) break;
    ${tunnelMapBody("marchP", "zOffset", "tunnelShake", "wtTime", "armsAmt", "audioReact", "sdHit")}
    marchT += sdHit;
    marchP += sdHit * eyeDir;
    if (abs(sdHit) < 0.0012) {
      hitDist = sdHit;
      break;
    }
    if (marchT > 72.0) break;
  }

  vec3 outColor = bgVideo + tunnelGlow * 0.42;

  if (abs(hitDist) < 0.012) {
    float epsN = 0.055;
    ${tunnelMapBody("marchP", "zOffset", "tunnelShake", "wtTime", "armsAmt", "audioReact", "sd0")}
    ${tunnelMapBody("marchP + vec3(epsN, 0.0, 0.0)", "zOffset", "tunnelShake", "wtTime", "armsAmt", "audioReact", "sdX")}
    ${tunnelMapBody("marchP + vec3(0.0, epsN, 0.0)", "zOffset", "tunnelShake", "wtTime", "armsAmt", "audioReact", "sdY")}
    vec3 surfNormal = normalize(vec3(sdX - sd0, sdY - sd0, 0.016));

    vec3 viewIn = normalize(eyeDir);
    float tunnelDist = length(marchP - camPos);
    float depthW = 1.0 / max(0.35, tunnelDist * 0.16);

    vec2 nScr = surfNormal.xy;
    nScr.x /= asp;
    vec2 refrOff = nScr * refAmt * depthW * 0.21;
    vec3 cRefr = texture2D(videoTex, clamp(uvWarp + refrOff, 0.001, 0.999)).rgb;

    vec2 reflOff = -nScr * refAmt * 0.09;
    vec3 cRefl = texture2D(videoTex, clamp(uvWarp + reflOff, 0.001, 0.999)).rgb;

    float ndv = max(0.0, dot(surfNormal, -viewIn));
    vec3 fresnel = vec3(pow(1.0 - ndv, 3.0)) * (0.35 + refAmt * 0.5);
    outColor = max(cRefr * (vec3(1.0) - fresnel) + cRefl * fresnel, vec3(0.0));

    float ndl = max(dot(surfNormal, sunDir), 0.0);
    float wrap = pow(clamp((ndl + 0.38) / 1.38, 0.0, 1.0), 1.35);
    outColor *= 0.58 + wrap * 0.42;

    vec3 halfDir = normalize(sunDir - viewIn);
    float specT = pow(max(dot(surfNormal, halfDir), 0.0), mix(32.0, 220.0, shineAmt));
    float specW = pow(max(dot(surfNormal, halfDir), 0.0), mix(6.0, 40.0, shineAmt));
    float crest = pow(ndl, mix(3.0, 10.0, shineAmt)) * shineAmt;
    float specCheap = step(1.5, qTier);
    vec3 specular = (specT * 1.2 + mix(specW * 0.35, 0.0, specCheap) + crest * 0.4) * sunColor * shineAmt;
    outColor += specular;

    float spiralRim = pow(1.0 - ndv, 3.5) * (specT * 0.85 + specW * 0.25 * (1.0 - specCheap)) * shineAmt;
    spiralRim += endGlow * pow(1.0 - ndv, 2.0) * 0.22;
    outColor = mix(outColor, vec3(1.0), clamp(spiralRim, 0.0, 0.82));

    float rim = pow(1.0 - ndv, 2.6) * shineAmt * 0.22;
    outColor += rim * vec3(1.0);

    float fftFog = max(0.0, audioReact - 0.5);
    float depthFade = exp(-tunnelDist * 0.048);
    float keepBright = clamp(specT * 1.8 + spiralRim, 0.0, 1.0);
    outColor *= mix(0.38 + 0.62 * depthFade, 1.0, keepBright * 0.55);

    float fogAmt = 1.0 - exp(-tunnelDist * 0.06 * (0.3 + fogMix * 0.7));
    vec3 fogCol = mix(vec3(0.08, 0.06, 0.12), vec3(1.0), endGlow * 0.75);
    fogCol += vec3(0.12, 0.1, 0.14) * fftFog;
    outColor = mix(outColor, fogCol, fogAmt * 0.55);
  } else {
    outColor = bgVideo + tunnelGlow * 0.65;
    outColor = mix(outColor, vec3(1.0), endGlow * 0.22 * shineAmt);
  }

  vec2 uvV = uvBg;
  float vignette = uvV.x * (1.0 - uvV.x) * uvV.y * (1.0 - uvV.y) * 32.0 * 0.75 + 0.25;
  outColor *= vignette;
  outColor = clamp(outColor, 0.0, 1.0);

  float hideCenter = smoothstep(0.006, 0.042, vanishR);
  vec3 centerVideo = texture2D(videoTex, uvBg).rgb;
  outColor = mix(centerVideo, outColor, hideCenter);

  return vec4(mix(bgVideo, outColor, amt), _c0.a);
`;
