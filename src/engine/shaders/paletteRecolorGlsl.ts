/**
 * Palette Recolor — remaps the frame onto a palette extracted from that same
 * frame (see `utils/paletteExtract.ts`). Palette entries arrive sorted dark to
 * bright, which is what lets Ramp treat them as an ordered gradient.
 *
 * Ramp maps luminance across the palette for a smooth duotone/tritone grade;
 * Nearest snaps each pixel to its closest entry for a hard posterized look.
 */
export const PALETTE_RECOLOR_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec3 base = _c0.rgb;
  float n = floor(clamp(count, 2.0, 4.0) + 0.5);
  vec3 p0 = vec3(p0r, p0g, p0b);
  vec3 p1 = vec3(p1r, p1g, p1b);
  vec3 p2 = vec3(p2r, p2g, p2b);
  vec3 p3 = vec3(p3r, p3g, p3b);
  vec3 mapped;

  if (mode > 0.5) {
    float best = distance(base, p0);
    mapped = p0;
    float d1 = distance(base, p1);
    if (d1 < best) { best = d1; mapped = p1; }
    if (n > 2.5) {
      float d2 = distance(base, p2);
      if (d2 < best) { best = d2; mapped = p2; }
    }
    if (n > 3.5) {
      float d3 = distance(base, p3);
      if (d3 < best) { best = d3; mapped = p3; }
    }
  } else {
    float luma = dot(base, vec3(0.299, 0.587, 0.114));
    float t = min(luma * (n - 1.0), n - 1.001);
    float idx = floor(t);
    float f = t - idx;
    vec3 lo = idx < 0.5 ? p0 : (idx < 1.5 ? p1 : p2);
    vec3 hi = idx < 0.5 ? p1 : (idx < 1.5 ? p2 : p3);
    mapped = mix(lo, hi, f);
  }

  return vec4(mix(base, clamp(mapped, 0.0, 1.0), a), _c0.a);
`;
