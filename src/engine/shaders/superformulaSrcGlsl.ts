/**
 * Superformula (Gielis 2003) — polar radius r(θ) as a Hydra src layer.
 *
 * r(θ) = (|cos(mθ/4)|^{n2} + |sin(mθ/4)|^{n3})^{-1/n1}  with a = b = 1, n3 = n2.
 * Nested GLSL helpers are forbidden by hydra-synth, so the radius is inlined.
 *
 * Look 0 Form  — filled polar SDF
 * Look 1 Wire  — glowing outline
 * Look 2 Cloud — interference field + lathed point sparkle (the “atomic” volume)
 */
export const SUPERFORMULA_LOOK = {
  form: 0,
  wire: 1,
  cloud: 2,
} as const;

export const SUPERFORMULA_GIELIS_DEFAULTS = {
  m: 7.6,
  n1: 0.36,
  n2: 2.16,
} as const;

export const SUPERFORMULA_SRC_GLSL = `
  vec2 res = resolution.xy;
  vec2 uv = (gl_FragCoord.xy + gl_FragCoord.xy - res) / max(res.y, 1.0);

  float mm = clamp(m, 1.0, 16.0);
  float nn1 = max(0.12, n1);
  float nn2 = max(0.12, n2);
  float sz = max(0.08, size);
  float t = time * max(0.0, speed);
  float g = clamp(glow, 0.2, 2.4);
  float lookId = floor(clamp(look, 0.0, 2.0) + 0.5);
  vec3 tint = vec3(cr, cg, cb);

  float theta = atan(uv.y, uv.x) + t * 0.17;
  float rho = length(uv);

  float ct = cos(mm * theta * 0.25);
  float st = sin(mm * theta * 0.25);
  float term = pow(max(abs(ct), 1.0e-5), nn2) + pow(max(abs(st), 1.0e-5), nn2);
  float R = clamp(pow(max(term, 1.0e-6), -1.0 / nn1), 0.02, 8.0) * sz;

  vec3 col = vec3(0.0);

  if (lookId < 1.5) {
    float d = rho - R;
    if (lookId > 0.5) d = abs(d) - 0.01 * g;
    float aa = 2.2 / max(res.y, 1.0);
    float mask = 1.0 - smoothstep(-aa, aa, d);
    float halo = exp(-abs(rho - R) * (16.0 / g)) * 0.42;
    float body = mask + halo;
    col = tint * body + vec3(1.0) * pow(body, 3.0) * 0.45;
  } else {
    float u = rho / max(R, 1.0e-4);
    float contour = exp(-abs(u - 1.0) * (12.0 + 9.0 * g));
    float shells = pow(abs(sin((u - t * 0.11) * 9.0)), 11.0) * smoothstep(1.4, 0.0, u);
    shells += pow(abs(sin((u + 0.07) * 16.5 - t * 0.19)), 16.0) * 0.5 * smoothstep(1.18, 0.0, u);

    float theta2 = theta + 1.0471976;
    float ct2 = cos(mm * theta2 * 0.25);
    float st2 = sin(mm * theta2 * 0.25);
    float term2 = pow(max(abs(ct2), 1.0e-5), nn2) + pow(max(abs(st2), 1.0e-5), nn2);
    float R2 = clamp(pow(max(term2, 1.0e-6), -1.0 / nn1), 0.02, 8.0) * sz * 0.72;
    float u2 = rho / max(R2, 1.0e-4);
    float core2 = exp(-abs(u2 - 1.0) * 15.0) * 0.9;

    float field = contour * 2.2 + shells * 0.55 + core2 * 1.2;
    col = tint * field + vec3(1.0) * pow(clamp(field, 0.0, 2.4), 2.2) * 0.85;

    for (int i = 0; i < 24; i++) {
      float fi = float(i);
      float th = fi * 0.2617994 + t * 0.28;
      float ctp = cos(mm * th * 0.25);
      float stp = sin(mm * th * 0.25);
      float termP = pow(max(abs(ctp), 1.0e-5), nn2) + pow(max(abs(stp), 1.0e-5), nn2);
      float Rp = clamp(pow(max(termP, 1.0e-6), -1.0 / nn1), 0.02, 8.0) * sz * 0.82;
      vec2 p2 = vec2(cos(th), sin(th)) * Rp;

      float phi = t * 0.21;
      float c0 = cos(phi);
      float s0 = sin(phi);
      vec3 q0 = vec3(p2.x * c0, p2.y, p2.x * s0);
      float cti = 0.8525;
      float sti = 0.5227;
      q0 = vec3(q0.x, q0.y * cti - q0.z * sti, q0.y * sti + q0.z * cti);
      vec2 d0 = uv - q0.xy / (1.55 + q0.z * 0.42);
      float lum0 = (0.0014 * g) / max(dot(d0, d0), 1.0e-5);

      float phi1 = phi + 2.094395;
      float c1 = cos(phi1);
      float s1 = sin(phi1);
      vec3 q1 = vec3(p2.x * c1, p2.y, p2.x * s1);
      q1 = vec3(q1.x, q1.y * cti - q1.z * sti, q1.y * sti + q1.z * cti);
      vec2 d1 = uv - q1.xy / (1.55 + q1.z * 0.42);
      float lum1 = (0.0014 * g) / max(dot(d1, d1), 1.0e-5);

      float spark = lum0 + lum1;
      col += (tint * 0.65 + vec3(1.0) * 0.35) * spark;
    }
  }

  col = clamp(col, 0.0, 1.0);
  float a = clamp(dot(col, vec3(0.333)) * 1.35, 0.0, 1.0);
  return vec4(col, a);
`;
