/** Compact icon mosaic — 4 sets × 16 density levels (4 bands × 4 sizes). */
export const LUMA_PRINT_ICON_HATCH_GLSL = `
    vec2 cellUv = fract(rst * grid);
    vec2 p = (cellUv - 0.5) * 1.78;
    float level = clamp(floor((1.0 - lAdj) * 15.999), 0.0, 15.0);
    float setId = floor(iconSet + 0.5);
    float sub = mod(level, 4.0);
    float band = floor(level / 4.0);
    float sz = mix(0.1, 0.44, (sub + 1.0) / 5.0);
    float hh = mix(0.022, 0.07, (sub + 1.0) / 5.0);
    float barH = (1.0 - smoothstep(hh, hh + 0.018, abs(p.y))) * step(abs(p.x), sz);
    float barV = (1.0 - smoothstep(hh, hh + 0.018, abs(p.x))) * step(abs(p.y), sz);
    float dotM = 1.0 - smoothstep(sz * 0.45 - 0.02, sz * 0.45 + 0.02, length(p));
    float ringM = 1.0 - smoothstep(0.042, 0.058, abs(length(p) - sz));
    float sqFill = step(abs(p.x), sz) * step(abs(p.y), sz);
    float sqEdge = max(step(sz - 0.06, abs(p.x)) * step(abs(p.x), sz + 0.04), step(sz - 0.06, abs(p.y)) * step(abs(p.y), sz + 0.04));
    float diaFill = step(abs(p.x) + abs(p.y), sz);
    float diaEdge = step(sz - 0.05, abs(p.x) + abs(p.y)) * step(abs(p.x) + abs(p.y), sz + 0.05);
    float diagA = (1.0 - smoothstep(hh, hh + 0.018, abs(p.x - p.y) * 0.707)) * step(length(p), sz);
    float diagB = (1.0 - smoothstep(hh, hh + 0.018, abs(p.x + p.y) * 0.707)) * step(length(p), sz);
    float hatchH = (1.0 - smoothstep(hh * 0.85, hh * 0.85 + 0.016, abs(fract(p.y * 5.0 + 0.5) - 0.5))) * step(abs(p.x), sz);
    float hatchV = (1.0 - smoothstep(hh * 0.85, hh * 0.85 + 0.016, abs(fract(p.x * 5.0 + 0.5) - 0.5))) * step(abs(p.y), sz);
    float edge = max(step(cellUv.x, 0.035), max(step(cellUv.y, 0.035), max(step(0.965, cellUv.x), step(0.965, cellUv.y))));

    if (level < 0.5) {
      ink = 0.0;
    } else if (setId < 0.5) {
      if (band < 0.5) ink = dotM;
      else if (band < 1.5) ink = max(barH, barV);
      else if (band < 2.5) ink = max(sqEdge, diaEdge);
      else ink = max(max(ringM, sqFill), diaFill);
    } else if (setId < 1.5) {
      if (band < 0.5) ink = barH;
      else if (band < 1.5) ink = max(barH, barV);
      else if (band < 2.5) ink = max(max(diagA, diagB), max(barH, barV));
      else ink = max(max(hatchH, hatchV), max(diagA, diagB));
    } else if (setId < 2.5) {
      if (band < 0.5) ink = ringM;
      else if (band < 1.5) ink = max(ringM, ringM * step(0.0, sin(atan(p.y, p.x) * 3.0)));
      else if (band < 2.5) ink = max(ringM, dotM);
      else ink = max(dotM, sqFill);
    } else {
      if (band < 0.5) ink = dotM;
      else if (band < 1.5) ink = max(barH, barV);
      else if (band < 2.5) ink = max(diaEdge, sqEdge);
      else ink = max(diaFill, sqFill);
    }
    ink *= 1.0 - edge;`;
