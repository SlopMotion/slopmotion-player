/** Distance field — writes `dm`. Unique suffix per inline block. */
function mapDistBody(
  wqVar: string,
  morphVar: string,
  detailVar: string,
  tbVar: string,
  suf: string,
): string {
  const w = `wq${suf}`;
  return `
    vec3 ${w} = ${wqVar};
    float cR${suf} = cos(${tbVar} * 0.38);
    float sR${suf} = sin(${tbVar} * 0.38);
    vec2 xz${suf} = mat2(cR${suf}, -sR${suf}, sR${suf}, cR${suf}) * ${w}.xz;
    ${w}.x = xz${suf}.x;
    ${w}.z = xz${suf}.y;
    float cR2${suf} = cos(${tbVar} * 0.24);
    float sR2${suf} = sin(${tbVar} * 0.24);
    vec2 xy${suf} = mat2(cR2${suf}, -sR2${suf}, sR2${suf}, cR2${suf}) * ${w}.xy;
    ${w}.x = xy${suf}.x;
    ${w}.y = xy${suf}.y;

    float m${suf} = clamp(${morphVar}, 0.0, 1.0);
    float sz${suf} = 0.82 + m${suf} * 0.48;
    float coreR${suf} = (0.26 + m${suf} * 0.28) * sz${suf};
    coreR${suf} += sin(${tbVar} * (1.85 + m${suf} * 2.4) + m${suf} * 5.1) * 0.075 * m${suf};

    float dCore${suf} = length(${w}) - coreR${suf};
    vec2 tq${suf} = vec2(length(${w}.xz) - (0.92 + m${suf} * 0.38) * sz${suf}, ${w}.y);
    float dTorus${suf} = length(tq${suf}) - (0.1 + m${suf} * 0.08);
    float sk${suf} = 0.13 * sz${suf};
    float sh${suf} = clamp(0.5 + 0.5 * (dTorus${suf} - dCore${suf}) / max(sk${suf}, 1e-4), 0.0, 1.0);
    dm = mix(dTorus${suf}, dCore${suf}, sh${suf}) - sk${suf} * sh${suf} * (1.0 - sh${suf});

    float ripFreq${suf} = max(1.0, ${detailVar});
    float rip${suf} = sin(${w}.x * ripFreq${suf} + ${tbVar} * 1.1) * sin(${w}.y * ripFreq${suf} * 1.07) * sin(${w}.z * ripFreq${suf} * 0.93);
    dm += rip${suf} * 0.016 * m${suf} * sz${suf};
  `;
}

/** Hydra `color` op body — samples chain via `_c0`, no extra video sampler. */
export const PULSE_MARCH_COLOR_GLSL = `
  float amt = clamp(amount, 0.0, 1.0);
  if (amt < 0.00001) return _c0;

  float morphV = clamp(morph, 0.0, 1.0);
  float detailV = max(1.0, detail);
  float glowV = clamp(glow, 0.0, 1.0);
  float marchSpd = max(0.0, marchSpeed);
  float tb = time * marchSpd;

  vec2 uv = (gl_FragCoord.xy / resolution.xy) * 2.0 - 1.0;
  uv.x *= resolution.x / max(1.0, resolution.y);

  vec3 ro = vec3(0.0, 0.0, 3.05);
  vec3 rd = normalize(vec3(uv, -1.72));

  float t = 0.0;
  float hit = 0.0;
  vec3 p = ro;
  float dm = 1.0;

  for (int i = 0; i < 30; i++) {
    p = ro + rd * t;
    ${mapDistBody("p", "morphV", "detailV", "tb", "0")}
    if (dm < 0.0012) {
      hit = 1.0;
      break;
    }
    if (t > 9.0) break;
    t += max(dm * 0.9, 0.0015);
  }

  vec3 bg = _c0.rgb;
  float bgLuma = dot(bg, vec3(0.299, 0.587, 0.114));
  vec3 col = bg;

  if (hit > 0.5) {
    float e = 0.0018;
    ${mapDistBody("p", "morphV", "detailV", "tb", "C")}
    float d0 = dm;
    ${mapDistBody("p + vec3(e, 0.0, 0.0)", "morphV", "detailV", "tb", "X")}
    float dx = dm - d0;
    ${mapDistBody("p + vec3(0.0, e, 0.0)", "morphV", "detailV", "tb", "Y")}
    float dy = dm - d0;
    ${mapDistBody("p + vec3(0.0, 0.0, e)", "morphV", "detailV", "tb", "Z")}
    float dz = dm - d0;
    vec3 n = normalize(vec3(dx, dy, dz));

    vec3 viewDir = normalize(ro - p);
    float ndv = max(dot(n, viewDir), 0.001);
    float wrap = pow(clamp((max(dot(n, normalize(vec3(-0.7, 0.85, 0.55))), 0.0) + 0.35) / 1.35, 0.0, 1.0), 1.2);
    float fresnel = pow(1.0 - ndv, 2.4 + glowV * 1.8);
    float rim = fresnel * (0.35 + glowV * 0.85);

    vec3 surf = bg;
    float surfL = dot(surf, vec3(0.299, 0.587, 0.114));
    vec3 body = mix(vec3(surfL * 0.35), surf, wrap * 0.72 + 0.18);
    body *= 0.55 + wrap * 0.45;
    body += vec3(rim);
    body = mix(body, vec3(clamp(surfL + rim * 0.25, 0.0, 1.0)), 0.22);

    float fog = 1.0 - exp(-t * 0.22);
    col = mix(bg * 0.15 + vec3(bgLuma * 0.05), body, 1.0 - fog * 0.35);
  }

  return vec4(mix(bg, col, amt), _c0.a);
`;
