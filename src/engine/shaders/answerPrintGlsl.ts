/**
 * Answer Print — twelve engaged cinema stocks on a shared lift/gamma/gain
 * + split-tone + gate pipeline. No nested helpers (hydra-synth wraps this
 * inside the generated color op).
 */
export const ANSWER_PRINT_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  float id = floor(clamp(stock, 0.0, 11.0) + 0.5);
  float d = clamp(density, 0.35, 1.75);

  float lift = 0.0;
  float gamma = 1.0;
  float gain = 1.0;
  float contrast = 1.0;
  float sat = 1.0;
  float vig = 0.0;
  float hue = 0.0;
  vec3 sh = vec3(1.0);
  vec3 hi = vec3(1.0);

  if (id < 0.5) {
    lift = 0.05; gamma = 0.86; gain = 1.14; contrast = 1.38; sat = 0.78;
    sh = vec3(0.62, 0.84, 1.08); hi = vec3(1.28, 1.04, 0.62); vig = 0.32; hue = 10.0;
  } else if (id < 1.5) {
    lift = -0.03; gamma = 0.78; gain = 0.82; contrast = 1.52; sat = 0.62;
    sh = vec3(0.32, 0.55, 1.22); hi = vec3(0.78, 0.92, 1.28); vig = 0.48; hue = -22.0;
  } else if (id < 2.5) {
    lift = 0.015; gamma = 0.72; gain = 1.22; contrast = 1.72; sat = 0.18;
    sh = vec3(0.88, 0.90, 1.04); hi = vec3(1.18, 1.14, 1.02); vig = 0.24; hue = 5.0;
  } else if (id < 3.5) {
    lift = 0.02; gamma = 0.88; gain = 1.10; contrast = 1.42; sat = 1.22;
    sh = vec3(0.12, 0.88, 1.18); hi = vec3(1.42, 0.72, 0.22); vig = 0.20; hue = -8.0;
  } else if (id < 4.5) {
    lift = -0.02; gamma = 0.70; gain = 1.18; contrast = 1.82; sat = 0.03;
    sh = vec3(0.92, 0.88, 0.82); hi = vec3(1.12, 1.06, 0.94); vig = 0.42; hue = 8.0;
  } else if (id < 5.5) {
    lift = 0.10; gamma = 1.08; gain = 1.12; contrast = 1.20; sat = 1.16;
    sh = vec3(0.72, 0.62, 1.12); hi = vec3(1.36, 0.86, 0.42); vig = 0.16; hue = 16.0;
  } else if (id < 6.5) {
    lift = 0.0; gamma = 0.80; gain = 1.18; contrast = 1.48; sat = 1.55;
    sh = vec3(0.38, 0.06, 1.12); hi = vec3(1.36, 0.18, 0.98); vig = 0.28; hue = -10.0;
  } else if (id < 7.5) {
    lift = 0.16; gamma = 1.16; gain = 0.92; contrast = 0.72; sat = 0.48;
    sh = vec3(0.92, 1.04, 0.64); hi = vec3(1.22, 1.10, 0.52); vig = 0.14; hue = 22.0;
  } else if (id < 8.5) {
    lift = 0.12; gamma = 1.10; gain = 1.16; contrast = 1.26; sat = 0.55;
    sh = vec3(0.62, 0.86, 1.22); hi = vec3(0.82, 1.04, 1.28); vig = 0.08; hue = -26.0;
  } else if (id < 9.5) {
    lift = 0.04; gamma = 0.82; gain = 1.12; contrast = 1.55; sat = 1.32;
    sh = vec3(0.18, 1.08, 0.36); hi = vec3(1.38, 0.32, 0.96); vig = 0.18; hue = 32.0;
  } else if (id < 10.5) {
    lift = -0.04; gamma = 0.80; gain = 0.68; contrast = 1.42; sat = 0.50;
    sh = vec3(0.28, 0.58, 1.10); hi = vec3(0.58, 0.88, 0.78); vig = 0.34; hue = -28.0;
  } else {
    lift = -0.03; gamma = 0.80; gain = 0.88; contrast = 1.40; sat = 0.74;
    sh = vec3(0.28, 0.34, 0.12); hi = vec3(1.42, 0.68, 0.10); vig = 0.36; hue = 26.0;
  }

  lift *= d;
  gamma = mix(1.0, gamma, d);
  gain = mix(1.0, gain, d);
  contrast = mix(1.0, contrast, d);
  sat = mix(1.0, sat, d);
  sh = mix(vec3(1.0), sh, d);
  hi = mix(vec3(1.0), hi, d);
  vig *= d;
  hue *= d;

  vec3 c = _c0.rgb;
  float lumaW = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c = max(c + lift, 0.0);
  c = pow(c, vec3(1.0 / max(gamma, 0.08)));
  c *= gain;
  c = (c - 0.5) * contrast + 0.5;
  float grey = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c = mix(vec3(grey), c, sat);

  float split = smoothstep(0.12, 0.78, lumaW);
  c *= mix(sh, hi, split);

  if (abs(hue) > 0.01) {
    float rad = hue * 0.01745329251;
    float ch = cos(rad);
    float shn = sin(rad);
    vec3 hr = vec3(
      0.299 + 0.701 * ch + 0.168 * shn,
      0.587 - 0.587 * ch + 0.330 * shn,
      0.114 - 0.114 * ch - 0.497 * shn
    );
    vec3 hg = vec3(
      0.299 - 0.299 * ch - 0.328 * shn,
      0.587 + 0.413 * ch + 0.035 * shn,
      0.114 - 0.114 * ch + 0.292 * shn
    );
    vec3 hb = vec3(
      0.299 - 0.300 * ch + 1.250 * shn,
      0.587 - 0.588 * ch - 1.050 * shn,
      0.114 + 0.886 * ch - 0.203 * shn
    );
    c = vec3(dot(c, hr), dot(c, hg), dot(c, hb));
  }

  if (vig > 0.001) {
    vec2 uv = (gl_FragCoord.xy / max(resolution.xy, vec2(1.0))) - 0.5;
    uv.x *= resolution.x / max(1.0, resolution.y);
    float edge = smoothstep(0.42, 1.05, length(uv) / 0.70710678);
    c *= 1.0 - vig * edge * edge;
  }

  return vec4(mix(_c0.rgb, clamp(c, 0.0, 1.0), a), _c0.a);
`;
