/**
 * Wet window / lens — TDM-style rain-on-glass (Shadertoy "Rain Drops", no heart).
 * Flat GLSL only (no nested functions).
 *
 * Rain-space uses y-down screen coords (stNorm.y = 1.0 - st.y) so Heartfelt scroll
 * and per-cell drop paths agree; gravity scales signed fall time for every layer.
 */

function wetN13(idExpr: string, out: string): string {
  return `
    float pWn_${out} = ${idExpr};
    vec3 p3_${out} = fract(vec3(pWn_${out}) * vec3(0.1031, 0.11369, 0.13787));
    p3_${out} += dot(p3_${out}, p3_${out}.yzx + 19.19);
    ${out} = fract(vec3(
      (p3_${out}.x + p3_${out}.y) * p3_${out}.z,
      (p3_${out}.x + p3_${out}.z) * p3_${out}.y,
      (p3_${out}.y + p3_${out}.z) * p3_${out}.x
    ));`;
}

function wetHash1(idExpr: string, out: string): string {
  return `${out} = fract(sin(${idExpr} * 12345.564) * 7658.76);`;
}

function wetSaw(b: string, t: string, out: string): string {
  return `${out} = smoothstep(0.0, ${b}, ${t}) * smoothstep(1.0, ${b}, ${t});`;
}

function wetStaticDrops(
  tag: string,
  uvVar: string,
  tFallVar: string,
  staticScale: string,
  outH: string,
): string {
  return `
    vec2 suv_${tag} = ${uvVar} * ${staticScale};
    vec2 sid_${tag} = floor(suv_${tag});
    vec2 sfr_${tag} = fract(suv_${tag}) - 0.5;
    vec3 sn_${tag};
    ${wetN13(`sid_${tag}.x * 107.45 + sid_${tag}.y * 3543.654`, `sn_${tag}`)}
    vec2 sp_${tag} = (sn_${tag}.xy - 0.5) * 0.7;
    float sd_${tag} = length(sfr_${tag} - sp_${tag});
    float sfade_${tag};
    ${wetSaw("0.025", `fract(${tFallVar} + sn_${tag}.z)`, `sfade_${tag}`)}
    ${outH} = smoothstep(0.3, 0.0, sd_${tag}) * fract(sn_${tag}.z * 10.0) * sfade_${tag};`;
}

function wetDropLayer2(
  tag: string,
  uvVar: string,
  uvScreenVar: string,
  tFallVar: string,
  outM: string,
  outTrail: string,
): string {
  return `
    vec2 UVloc_${tag} = ${uvScreenVar};
    vec2 duv_${tag} = ${uvVar};
    duv_${tag}.y += ${tFallVar} * 0.75;
    vec2 a_${tag} = vec2(6.0, 1.0);
    vec2 grid_${tag} = a_${tag} * 2.0;
    vec2 id_${tag} = floor(duv_${tag} * grid_${tag});

    float colShift_${tag};
    ${wetHash1(`id_${tag}.x`, `colShift_${tag}`)}
    duv_${tag}.y += colShift_${tag};

    id_${tag} = floor(duv_${tag} * grid_${tag});
    vec3 n_${tag};
    ${wetN13(`id_${tag}.x * 35.2 + id_${tag}.y * 2376.1`, `n_${tag}`)}
    vec2 st_${tag} = fract(duv_${tag} * grid_${tag}) - vec2(0.5, 0.0);

    float x_${tag} = n_${tag}.x - 0.5;

    float yW_${tag} = UVloc_${tag}.y * 20.0;
    float wiggle_${tag} = sin(yW_${tag} + sin(yW_${tag}));
    x_${tag} += wiggle_${tag} * (0.5 - abs(x_${tag})) * (n_${tag}.z - 0.5);
    x_${tag} *= 0.7;

    float ti_${tag} = fract(${tFallVar} + n_${tag}.z);
    float sawT_${tag};
    ${wetSaw("0.85", `ti_${tag}`, `sawT_${tag}`)}
    float yDrop_${tag} = (sawT_${tag} - 0.5) * 0.9 + 0.5;
    vec2 p_${tag} = vec2(x_${tag}, yDrop_${tag});

    float d_${tag} = length((st_${tag} - p_${tag}) * a_${tag}.yx);
    float mainDrop_${tag} = smoothstep(0.4, 0.0, d_${tag});

    float r_${tag} = sqrt(smoothstep(1.0, yDrop_${tag}, st_${tag}.y));
    float cd_${tag} = abs(st_${tag}.x - x_${tag});
    float trail_${tag} = smoothstep(0.23 * r_${tag}, 0.15 * r_${tag} * r_${tag}, cd_${tag});
    float trailFront_${tag} = smoothstep(-0.02, 0.02, st_${tag}.y - yDrop_${tag});
    trail_${tag} *= trailFront_${tag} * r_${tag} * r_${tag};

    float yTrail_${tag} = UVloc_${tag}.y;
    float trail2_${tag} = smoothstep(0.2 * r_${tag}, 0.0, cd_${tag});
    float droplets_${tag} = max(0.0, (sin(yTrail_${tag} * (1.0 - yTrail_${tag}) * 120.0) - st_${tag}.y))
      * trail2_${tag} * trailFront_${tag} * n_${tag}.z;
    yTrail_${tag} = fract(yTrail_${tag} * 10.0) + (st_${tag}.y - 0.5);
    float dd_${tag} = length(st_${tag} - vec2(x_${tag}, yTrail_${tag}));
    droplets_${tag} = smoothstep(0.3, 0.0, dd_${tag});

    ${outM} = mainDrop_${tag} + droplets_${tag} * r_${tag} * trailFront_${tag};
    ${outTrail} = trail_${tag};`;
}

function wetDropsAt(
  tag: string,
  uvVar: string,
  uvScreenVar: string,
  tFallVar: string,
  rainAmt: string,
  staticScale: string,
  outH: string,
  outTrail: string,
): string {
  return `
  {
    float rainAmt_${tag} = clamp(${rainAmt}, 0.0, 1.0);
    float l0_${tag} = smoothstep(-0.5, 1.0, rainAmt_${tag}) * 2.0;
    float l1_${tag} = smoothstep(0.25, 0.75, rainAmt_${tag});
    float l2_${tag} = smoothstep(0.0, 0.5, rainAmt_${tag});

    float sD_${tag};
    ${wetStaticDrops(tag, uvVar, tFallVar, staticScale, `sD_${tag}`)}

    float m1x_${tag}, m1t_${tag};
    ${wetDropLayer2(`${tag}a`, uvVar, uvScreenVar, tFallVar, `m1x_${tag}`, `m1t_${tag}`)}

    float m2x_${tag}, m2t_${tag};
    ${wetDropLayer2(`${tag}b`, `${uvVar} * 1.85`, uvScreenVar, tFallVar, `m2x_${tag}`, `m2t_${tag}`)}

    float c_${tag} = sD_${tag} * l0_${tag} + m1x_${tag} * l1_${tag} + m2x_${tag} * l2_${tag};
    ${outH} = smoothstep(0.3, 1.0, c_${tag});
    ${outTrail} = max(m1t_${tag} * l0_${tag}, m2t_${tag} * l1_${tag});
  }`;
}

const WET_COMMON = `
  float dens = max(6.0, density);
  float grav = clamp(gravity, 0.0, 1.0);
  float spd = max(0.0, speed);
  float tAnim = time * spd * 0.58;
  float fallMul = mix(0.35, 1.15, grav);
  float tFall = tAnim * fallMul;
  float rainAmt = a;
  float staticScale = mix(24.0, 46.0, (dens - 6.0) / 34.0);
  float zoomBreath = -cos(time * spd * 0.6);
  float zoomMix = mix(0.4, 1.0, grav);
`;

function wetAspectUv(stExpr: string): string {
  return `
  float aspect = resolution.x / max(1.0, resolution.y);
  vec2 stNorm = ${stExpr};
  stNorm.y = 1.0 - stNorm.y;
  vec2 uv = stNorm - 0.5;
  uv.x *= aspect;
  uv *= 0.88 + zoomBreath * 0.08 * zoomMix;
  vec2 UV = stNorm;
  UV = (UV - 0.5) * (0.96 + zoomBreath * 0.04 * zoomMix) + 0.5;`;
}

export const WET_LENS_DISTORT_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _st;

  float refr = clamp(refraction, 0.0, 1.0);
  ${WET_COMMON}
  ${wetAspectUv("_st")}

  float dropH, dropTrail;
  ${wetDropsAt("d0", "uv", "UV", "tFall", "rainAmt", "staticScale", "dropH", "dropTrail")}

  float eps = 1.0 / min(resolution.x, resolution.y);
  float dropHx, dropTrailX;
  ${wetDropsAt("dx", "uv + vec2(eps, 0.0)", "UV", "tFall", "rainAmt", "staticScale", "dropHx", "dropTrailX")}

  float dropHy, dropTrailY;
  ${wetDropsAt("dy", "uv + vec2(0.0, eps)", "UV", "tFall", "rainAmt", "staticScale", "dropHy", "dropTrailY")}

  vec2 n = vec2(dropHx - dropH, dropHy - dropH);

  float minBlur = mix(1.8, 2.6, grav);
  float maxBlur = mix(3.0, 6.0, rainAmt);
  float focus = mix(maxBlur - dropTrail, minBlur, smoothstep(0.1, 0.2, dropH));
  vec2 disp = n * mix(0.020, 0.068, refr) * a * (0.72 + focus * 0.04);
  disp.x /= aspect;
  disp.y = -disp.y;

  return _st + disp;
`;

export const WET_LENS_OVERLAY_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  ${WET_COMMON}
  vec2 stUv = gl_FragCoord.xy / resolution.xy;
  ${wetAspectUv("stUv")}

  float dropH, dropTrail;
  ${wetDropsAt("o0", "uv", "UV", "tFall", "rainAmt", "staticScale", "dropH", "dropTrail")}

  float hi = clamp(highlights, 0.0, 1.0);
  float cover = clamp(dropH * a, 0.0, 1.0);
  float trailW = clamp(dropTrail * a, 0.0, 1.0);

  float spec = pow(cover, 3.6) * hi * a * 0.58;
  float trailLine = trailW * cover * hi * a * 0.36;
  float rim = smoothstep(0.42, 0.78, cover) * (1.0 - smoothstep(0.84, 0.98, cover)) * a * 0.3;

  vec3 c = _c0.rgb;
  float gray = 0.33333 * (c.r + c.g + c.b);
  c = mix(c, vec3(gray), cover * 0.03 * grav);

  c.r += spec * 0.98 + trailLine * 0.2;
  c.g += spec * 0.94 + trailLine * 0.24;
  c.b += spec * 1.04 + trailLine * 0.3;
  c -= vec3(rim * 0.1);
  c = mix(c, c * vec3(0.94, 0.97, 1.03), cover * 0.07 * a);

  vec2 vigUv = UV - 0.5;
  c *= 1.0 - dot(vigUv, vigUv) * 0.16 * a;

  return vec4(clamp(c, 0.0, 1.0), _c0.a);
`;
