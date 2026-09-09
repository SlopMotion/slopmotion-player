/**
 * Pattern Layer — six families, each registered as its own Hydra `src`.
 * Noise / Cells / Tiles / Polar / Geometry are procedural. Turing colors the
 * Gray-Scott buffer on o3 (blank-canvas center seed — not Labs React Diff on o1).
 *
 * Every family exposes the same four looks (Soft / Sharp / Ring / Flow).
 * All helper math is inlined: hydra-synth wraps this body inside a generated
 * function, so nested GLSL function definitions would fail to compile.
 */

import { PATTERN_RD_MAX_CELLS } from "../utils/patternLayerRd";

const PREAMBLE = `
  vec2 pres = resolution.xy;
  vec2 pp = (gl_FragCoord.xy + gl_FragCoord.xy - pres) / max(1.0, pres.y);
  float pzoom = max(0.25, scale);
  float ptime = time * max(0.0, speed);
  float pwarp = clamp(warp, 0.0, 1.0);
  pp *= pzoom;
  if (pwarp > 0.001) {
    pp += pwarp * 0.45 * vec2(
      sin(pp.y * 3.1 + ptime * 0.7),
      cos(pp.x * 2.7 - ptime * 0.6)
    );
  }
  float look = floor(clamp(variant, 0.0, 3.0) + 0.5);
`;

const EPILOGUE = `
  float tint = clamp(pat, 0.0, 1.0);
  return vec4(mix(vec3(ar, ag, ab), vec3(br, bg, bb), tint), 1.0);
`;

/** Fractal value noise — Soft clouds, Sharp ridges, Ring wood, Flow marble. */
export const PATTERN_NOISE_SRC_GLSL = `${PREAMBLE}
  float pat = 0.0;
  float amp = 0.55;
  vec2 q = pp * 1.5;
  for (int i = 0; i < 5; i++) {
    vec2 cell = floor(q);
    vec2 frc = fract(q);
    frc = frc * frc * (3.0 - 2.0 * frc);
    float n00 = fract(sin(dot(cell, vec2(127.1, 311.7))) * 43758.5453);
    float n10 = fract(sin(dot(cell + vec2(1.0, 0.0), vec2(127.1, 311.7))) * 43758.5453);
    float n01 = fract(sin(dot(cell + vec2(0.0, 1.0), vec2(127.1, 311.7))) * 43758.5453);
    float n11 = fract(sin(dot(cell + vec2(1.0, 1.0), vec2(127.1, 311.7))) * 43758.5453);
    pat += amp * mix(mix(n00, n10, frc.x), mix(n01, n11, frc.x), frc.y);
    amp *= 0.5;
    q = q * 2.07 + vec2(ptime * 0.13, ptime * -0.09);
  }
  pat = clamp(pat * 1.1, 0.0, 1.0);
  if (look > 2.5) {
    pat = 0.5 + 0.5 * sin((pp.x + pat * 3.2) * 4.0 - ptime * 0.5);
  } else if (look > 1.5) {
    pat = abs(fract((length(pp) * 1.2 + pat * 1.1) * 3.0) * 2.0 - 1.0);
  } else if (look > 0.5) {
    pat = smoothstep(0.56, 0.64, pat);
  } else {
    pat = smoothstep(0.25, 0.85, pat);
  }
${EPILOGUE}`;

/** Animated Voronoi — Soft bubbles, Sharp flat cells, Ring crystal edges, Flow distance field. */
export const PATTERN_CELLS_SRC_GLSL = `${PREAMBLE}
  vec2 q = pp * 3.0;
  vec2 cell = floor(q);
  vec2 frc = fract(q);
  float d1 = 8.0;
  float d2 = 8.0;
  vec2 nearest = cell;
  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 off = vec2(float(x), float(y));
      vec2 seed = cell + off;
      vec2 jitter = vec2(
        fract(sin(dot(seed, vec2(127.1, 311.7))) * 43758.5453),
        fract(sin(dot(seed, vec2(269.5, 183.3))) * 43758.5453)
      );
      vec2 site = off + 0.5 + 0.42 * sin(ptime + 6.2831 * jitter);
      float d = length(site - frc);
      if (d < d1) {
        d2 = d1;
        d1 = d;
        nearest = seed;
      } else if (d < d2) {
        d2 = d;
      }
    }
  }
  float pat = 1.0 - smoothstep(0.05, 0.85, d1);
  if (look > 2.5) {
    pat = clamp(d1 * 1.35, 0.0, 1.0);
  } else if (look > 1.5) {
    pat = 1.0 - smoothstep(0.02, 0.14, d2 - d1);
  } else if (look > 0.5) {
    pat = fract(sin(dot(nearest, vec2(41.3, 289.1))) * 21756.31);
  }
${EPILOGUE}`;

/** Drifting tile grid — Soft weave, Sharp checker, Ring truchet arcs, Flow herringbone. */
export const PATTERN_TILES_SRC_GLSL = `${PREAMBLE}
  vec2 q = pp * 3.0 + vec2(ptime * 0.25, ptime * 0.15);
  vec2 cell = floor(q);
  vec2 frc = fract(q);
  float parity = mod(cell.x + cell.y, 2.0);
  float pat = parity > 0.5 ? abs(sin(3.14159 * q.x)) : abs(sin(3.14159 * q.y));
  if (look > 2.5) {
    pat = smoothstep(0.35, 0.65, 0.5 + 0.5 * sin(12.566 * (parity > 0.5 ? frc.x : frc.y)));
  } else if (look > 1.5) {
    float flip = fract(sin(dot(cell, vec2(127.1, 311.7))) * 43758.5453);
    vec2 arc = flip > 0.5 ? frc : vec2(1.0 - frc.x, frc.y);
    float d = min(abs(length(arc) - 0.5), abs(length(arc - 1.0) - 0.5));
    pat = 1.0 - smoothstep(0.04, 0.16, d);
  } else if (look > 0.5) {
    pat = parity;
  }
${EPILOGUE}`;

/** Polar sweeps — Soft rays, Sharp wedges, Ring ripples, Flow spiral. */
export const PATTERN_POLAR_SRC_GLSL = `${PREAMBLE}
  float rad = length(pp);
  float ang = atan(pp.y, pp.x);
  float pat = (0.5 + 0.5 * sin(ang * 6.0 - ptime)) * (1.0 - smoothstep(0.2, 1.6, rad));
  if (look > 2.5) {
    pat = 0.5 + 0.5 * sin(ang * 3.0 + rad * 9.0 - ptime * 1.6);
  } else if (look > 1.5) {
    pat = 0.5 + 0.5 * sin(rad * 14.0 - ptime * 1.4);
  } else if (look > 0.5) {
    pat = step(0.5, fract(ang * 1.2732 + ptime * 0.1));
  }
${EPILOGUE}`;

/**
 * Geometric linework inspired by Morph-style pattern synthesis:
 * hexagons, interweaves, square tunnels, imprints, isometric grids and waves.
 */
export const PATTERN_GEOMETRY_SRC_GLSL = `
  vec2 pres = resolution.xy;
  vec2 pp = (gl_FragCoord.xy + gl_FragCoord.xy - pres) / max(1.0, pres.y);
  float pzoom = max(0.25, scale);
  float ptime = time * max(0.0, speed);
  float pwarp = clamp(warp, 0.0, 1.0);
  pp *= pzoom;
  if (pwarp > 0.001) {
    pp += pwarp * 0.34 * vec2(
      sin(pp.y * 3.1 + ptime * 0.7),
      cos(pp.x * 2.7 - ptime * 0.6)
    );
  }

  float geo = floor(clamp(geometry, 0.0, 10.0) + 0.5);
  float pat = 0.0;

  if (geo < 0.5) {
    // Classic — broad honeycomb outlines.
    vec2 q = pp * 2.15 + vec2(ptime * 0.06, 0.0);
    vec2 hexSpan = vec2(1.7320508, 1.0);
    vec2 hexA = mod(q, hexSpan) - 0.5 * hexSpan;
    vec2 hexB = mod(q - 0.5 * hexSpan, hexSpan) - 0.5 * hexSpan;
    vec2 hexUv = dot(hexA, hexA) < dot(hexB, hexB) ? hexA : hexB;
    float hexEdge = max(abs(hexUv.y), dot(abs(hexUv), vec2(0.8660254, 0.5)));
    pat = 1.0 - smoothstep(0.025, 0.095, abs(hexEdge - 0.48));
  } else if (geo < 1.5) {
    // Interweave V3 — nested square paths with alternating gates.
    vec2 q = pp * 1.75 + vec2(ptime * 0.08, -ptime * 0.05);
    vec2 tile = floor(q);
    vec2 uv = fract(q) - 0.5;
    float box = max(abs(uv.x), abs(uv.y));
    float nested = abs(fract(box * 8.0 + mod(tile.x + tile.y, 2.0) * 0.5) - 0.5);
    float rails = min(abs(uv.x), abs(uv.y));
    pat = max(
      1.0 - smoothstep(0.07, 0.18, nested),
      (1.0 - smoothstep(0.025, 0.085, rails)) * step(0.2, box)
    );
  } else if (geo < 2.5) {
    // Tight — a dense concentric square tunnel.
    vec2 q = pp + 0.025 * vec2(sin(ptime), cos(ptime * 0.8));
    float box = max(abs(q.x), abs(q.y));
    float rings = abs(fract(box * 7.5 - ptime * 0.08) - 0.5);
    pat = 1.0 - smoothstep(0.065, 0.17, rings);
  } else if (geo < 3.5) {
    // Classic low latency — a leaner, tighter honeycomb.
    vec2 q = pp * 3.15;
    vec2 hexSpan = vec2(1.7320508, 1.0);
    vec2 hexA = mod(q, hexSpan) - 0.5 * hexSpan;
    vec2 hexB = mod(q - 0.5 * hexSpan, hexSpan) - 0.5 * hexSpan;
    vec2 hexUv = dot(hexA, hexA) < dot(hexB, hexB) ? hexA : hexB;
    float hexEdge = max(abs(hexUv.y), dot(abs(hexUv), vec2(0.8660254, 0.5)));
    pat = 1.0 - smoothstep(0.018, 0.075, abs(hexEdge - 0.48));
  } else if (geo < 4.5) {
    // Interweave low latency — orthogonal links and square knots.
    vec2 uv = fract(pp * 2.6 + 0.5) - 0.5;
    float cross = min(abs(uv.x), abs(uv.y));
    float box = abs(max(abs(uv.x), abs(uv.y)) - 0.29);
    pat = max(
      1.0 - smoothstep(0.025, 0.08, cross),
      1.0 - smoothstep(0.025, 0.075, box)
    );
  } else if (geo < 5.5) {
    // Imprint Smooth — soft triangular contour islands.
    vec2 q = pp * 3.1;
    float field =
      sin(q.x * 2.1 + ptime * 0.3) +
      sin(dot(q, vec2(0.5, 0.8660254)) * 2.1 - ptime * 0.24) +
      sin(dot(q, vec2(-0.5, 0.8660254)) * 2.1 + ptime * 0.18);
    pat = 1.0 - smoothstep(0.07, 0.23, abs(sin(field * 1.75)));
  } else if (geo < 6.5) {
    // Imprint Crystal — triangular facets with bright intersections.
    vec2 q = pp * 2.8 + vec2(ptime * 0.04, 0.0);
    float lineA = abs(fract(q.x) - 0.5);
    float lineB = abs(fract(dot(q, vec2(0.5, 0.8660254))) - 0.5);
    float lineC = abs(fract(dot(q, vec2(-0.5, 0.8660254))) - 0.5);
    float crystal = min(lineA, min(lineB, lineC));
    pat = 1.0 - smoothstep(0.025, 0.09, crystal);
  } else if (geo < 7.5) {
    // Enharmonic — three-axis isometric cube lattice.
    vec2 q = pp * 2.45;
    float isoA = abs(fract(q.y) - 0.5);
    float isoB = abs(fract(dot(q, vec2(0.8660254, 0.5))) - 0.5);
    float isoC = abs(fract(dot(q, vec2(-0.8660254, 0.5))) - 0.5);
    float iso = min(isoA, min(isoB, isoC));
    pat = 1.0 - smoothstep(0.025, 0.085, iso);
  } else if (geo < 8.5) {
    // Interweave V2 — square spirals repeated as linked tiles.
    vec2 q = pp * 2.0 + vec2(ptime * 0.05, ptime * 0.03);
    vec2 uv = fract(q) - 0.5;
    float box = max(abs(uv.x), abs(uv.y));
    float nested = abs(fract(box * 6.0) - 0.5);
    float join = min(abs(uv.x + uv.y), abs(uv.x - uv.y));
    pat = max(
      1.0 - smoothstep(0.065, 0.17, nested),
      (1.0 - smoothstep(0.025, 0.08, join)) * step(0.3, box)
    );
  } else if (geo < 9.5) {
    // Fusion — concentric rings fused to a six-lobed field.
    float rad = length(pp);
    float ang = atan(pp.y, pp.x);
    float ring = abs(sin(rad * 12.0 - ptime * 0.65));
    float lobes = abs(cos(ang * 3.0) * 0.34 + rad - 0.62);
    pat = max(
      1.0 - smoothstep(0.02, 0.13, ring),
      1.0 - smoothstep(0.025, 0.1, lobes)
    );
    pat *= 1.0 - smoothstep(1.2, 1.75, rad);
  } else {
    // Sonance — crossing harmonic wave traces.
    vec2 q = pp * 2.7;
    float waveA = abs(q.y - 0.23 * sin(q.x * 3.4 + ptime));
    float waveB = abs(q.y + 0.23 * sin(q.x * 3.4 - ptime * 0.8));
    float repeats = abs(fract((waveA + waveB) * 3.0) - 0.5);
    pat = max(
      1.0 - smoothstep(0.025, 0.085, min(waveA, waveB)),
      (1.0 - smoothstep(0.06, 0.16, repeats)) * 0.72
    );
  }

${EPILOGUE}`;

/**
 * Gray-Scott runs on a virtual lattice rather than on raw pixels. Hydra's FBOs are
 * `mag: 'nearest'` uint8, so a sub-pixel stencil offset snaps to whole texels and
 * splits the field into interleaved, non-communicating sub-grids. One cell spanning
 * several pixels keeps the stencil exactly one cell wide and makes Density a real
 * feature-size control.
 */
const PATTERN_RD_GRID_GLSL = `
  // A cell needs a couple of texels to itself: at one texel apiece, rounding sends
  // some neighbour reads to the wrong cell and the field decouples. This is what
  // bounds Density on a small canvas. Sim and display both see the canvas
  // resolution here, so their grids stay in step.
  float cellsX = clamp(cells, 48.0, min(${PATTERN_RD_MAX_CELLS}.0, resolution.x * 0.5));
  vec2 grid = vec2(floor(cellsX), max(8.0, floor(cellsX / aspect)));
`;

/** Shared so the three `patternTuringDisplay` registrations cannot drift apart. */
export const PATTERN_TURING_DISPLAY_INPUTS = [
  { type: "sampler2D", name: "stateTex", default: 0 },
  { type: "float", name: "variant", default: 1 },
  { type: "float", name: "cells", default: 140 },
  { type: "float", name: "symmetry", default: 2 },
] as const;

/**
 * Turing display — reads the Gray-Scott lattice on o3 (B in `.g`) and remaps it to
 * the two Pattern colors. This has to be a `src` rather than a `color`: the sim
 * writes one value per lattice cell, so the raw texels read as visible blocks and
 * need interpolating across cell centers, which a color op cannot do from `_c0`.
 */
export function patternTuringDisplayGlsl(
  low: [number, number, number],
  high: [number, number, number],
) {
  return `
  float aspect = resolution.x / max(1.0, resolution.y);
  ${PATTERN_RD_GRID_GLSL}
  // Interpolate on the same folded lattice the sim writes to. Sampling a
  // screen-aligned grid instead straddles the fold and speckles every edge.
  ${glslFoldPatUv("uvF", "_st", "D")}
  vec2 gc = uvF * grid - 0.5;
  vec2 gf = fract(gc);
  gf = gf * gf * (3.0 - 2.0 * gf);
  vec2 g0 = (floor(gc) + 0.5) / grid;
  vec2 gs = 1.0 / grid;
  float b00 = texture2D(stateTex, clamp(g0, 0.0, 1.0)).g;
  float b10 = texture2D(stateTex, clamp(g0 + vec2(gs.x, 0.0), 0.0, 1.0)).g;
  float b01 = texture2D(stateTex, clamp(g0 + vec2(0.0, gs.y), 0.0, 1.0)).g;
  float b11 = texture2D(stateTex, clamp(g0 + gs, 0.0, 1.0)).g;
  float B = mix(mix(b00, b10, gf.x), mix(b01, b11, gf.x), gf.y);
  float look = floor(clamp(variant, 0.0, 3.0) + 0.5);
  float edge = 0.145;
  float soft = 0.055;
  float pat = smoothstep(edge - soft, edge + soft, B);
  if (look < 0.5) {
    pat = smoothstep(edge - soft * 1.4, edge + soft, B);
  } else if (look < 1.5) {
    pat = step(edge, B);
  } else if (look < 2.5) {
    pat = smoothstep(edge - soft * 0.8, edge + soft * 1.2, B);
  } else {
    pat = smoothstep(edge - soft, edge + soft * 1.1, B);
  }
  vec3 col = mix(vec3(${low[0].toFixed(4)}, ${low[1].toFixed(4)}, ${low[2].toFixed(4)}), vec3(${high[0].toFixed(4)}, ${high[1].toFixed(4)}, ${high[2].toFixed(4)}), clamp(pat, 0.0, 1.0));
  return vec4(col, 1.0);
`;
}

export const PATTERN_TURING_DISPLAY_GLSL = patternTuringDisplayGlsl(
  [0.012, 0.012, 0.024],
  [0.941, 0.671, 0.988],
);

function glslFoldPatUv(outName: string, stExpr: string, id: string): string {
  const symMode = `symM${id}`;
  const rSym = `rSym${id}`;
  const aSym = `aSym${id}`;
  const seg = `seg${id}`;
  const fit = `fit${id}`;
  return `
  vec2 ${outName} = ${stExpr} - 0.5;
  ${outName}.x *= aspect;
  float ${symMode} = floor(clamp(symmetry, 0.0, 3.0) + 0.5);
  if (${symMode} > 0.5 && ${symMode} < 1.5) {
    ${outName}.x = abs(${outName}.x);
  } else if (${symMode} > 1.5 && ${symMode} < 2.5) {
    ${outName} = abs(${outName});
  } else if (${symMode} > 2.5) {
    float ${rSym} = length(${outName});
    float ${aSym} = atan(${outName}.y, ${outName}.x);
    float ${seg} = 1.0471976;
    ${aSym} = mod(${aSym} + ${seg}, ${seg} * 2.0);
    ${aSym} = abs(${aSym} - ${seg});
    // Shrink the wedge to fit the buffer. Rotating a frame corner to the wedge
    // pushes it past the edge, where the clamp below would flatten every outer
    // radius onto the border and smear the frame into bands.
    float ${fit} = 0.49 / max(0.001, length(vec2(0.5 * aspect, 0.5)) * sin(${seg}));
    ${outName} = ${rSym} * ${fit} * vec2(cos(${aSym}), sin(${aSym}));
  }
  ${outName}.x /= aspect;
  ${outName} = clamp(${outName} + 0.5, 0.001, 0.999);
`;
}

/**
 * Autonomous Gray-Scott sim on the virtual lattice — no input texture.
 *
 * Symmetry is applied by the display pass, not here. Folding inside the sim means
 * every neighbour read has to land back on the folded cell it belongs to, which
 * only holds while the fold is idempotent — and the kaleid wedge cannot be both
 * idempotent and fitted inside the buffer. Simulating the whole frame and folding
 * once on the way out is visually the same kaleidoscope, uses the full buffer, and
 * keeps the inner loop free of the fold's atan/sin/cos.
 */
export const PATTERN_RD_SIM_GLSL = `
  vec2 uv = clamp(_st, 0.001, 0.999);
  float aspect = resolution.x / max(1.0, resolution.y);
  float spd = clamp(speed, 0.0, 2.0);
  float f = clamp(feed, 0.03, 0.09);
  float wander = clamp(styleMap, 0.0, 1.0);

  ${PATTERN_RD_GRID_GLSL}
  vec2 gs = 1.0 / grid;
  vec2 uvC = (floor(uv * grid) + 0.5) * gs;

  vec4 prev = texture2D(stateTex, uvC);
  float A = prev.r;
  float B = prev.g;

  vec2 p = (uvC - 0.5) * vec2(aspect, 1.0);
  float d = length(p);
  // Seed in blocks of a few cells rather than single cells: a lone lit cell has no
  // neighbour to divide into and decays within a handful of steps, so per-cell noise
  // mostly dies and the frame takes seconds to grow back from the few survivors.
  // Hash the block in normalised space — raw indices reach sin() arguments in the
  // tens of thousands, where it bands badly and the scatter collapses to nothing.
  vec2 seedGrid = max(vec2(1.0), floor(grid / 3.0));
  vec2 seedId = floor(uv * seedGrid) / seedGrid;
  float n = fract(sin(dot(seedId, vec2(12.9898, 78.233))) * 43758.5453);

  if (forceSeed > 0.5) {
    // Nucleate across the whole frame. A front spreading from a central disc needs
    // tens of thousands of steps to reach the edges, and a solid disc burns out in
    // its middle and leaves a permanent hole there.
    float lit = step(mix(0.988, 0.9, clamp(seedSize, 0.08, 0.55) / 0.55), n);
    B = lit;
    A = 1.0 - 0.58 * lit;
  } else {
    vec4 xp = texture2D(stateTex, clamp(uvC + vec2(gs.x, 0.0), 0.0, 1.0));
    vec4 xm = texture2D(stateTex, clamp(uvC - vec2(gs.x, 0.0), 0.0, 1.0));
    vec4 yp = texture2D(stateTex, clamp(uvC + vec2(0.0, gs.y), 0.0, 1.0));
    vec4 ym = texture2D(stateTex, clamp(uvC - vec2(0.0, gs.y), 0.0, 1.0));
    vec4 pp = texture2D(stateTex, clamp(uvC + gs, 0.0, 1.0));
    vec4 mm = texture2D(stateTex, clamp(uvC - gs, 0.0, 1.0));
    vec4 pm = texture2D(stateTex, clamp(uvC + vec2(gs.x, -gs.y), 0.0, 1.0));
    vec4 mp = texture2D(stateTex, clamp(uvC + vec2(-gs.x, gs.y), 0.0, 1.0));

    vec2 side = xp.rg + xm.rg + yp.rg + ym.rg;
    vec2 diag = pp.rg + mm.rg + pm.rg + mp.rg;
    vec2 lap = side * 0.2 + diag * 0.05 - vec2(A, B);

    // Kill drifts slowly across the frame so several Pearson regimes coexist —
    // that is what puts solid blobs, rings and dot fields in one composition.
    // Clamped to the band that survives 8-bit state, so no region dies or floods.
    float gt = time * 0.03;
    float lobes = 0.5 + 0.5 * sin(p.x * 7.3 + 1.1 + gt) * cos(p.y * 6.1 - 0.4 - gt * 0.7);
    float region = 0.75 * lobes + 0.25 * clamp(d / 0.62, 0.0, 1.0);
    float k = clamp(kill + 0.006 * (region - 0.5) * 2.0, 0.0585, 0.0685);

    float reaction = A * B * B;
    float dt = min(1.0, 0.45 + spd * 0.55);
    A = clamp(A + (lap.x - reaction + f * (1.0 - A)) * dt, 0.0, 1.0);
    B = clamp(B + (0.5 * lap.y + reaction - (k + f) * B) * dt, 0.0, 1.0);

    if (wander > 0.001) {
      // Drifting injectors keep nudging the field, which otherwise settles into a
      // fixed steady state within a few seconds and stops moving.
      float t = time * (0.14 + spd * 0.56);
      vec2 w1 = vec2(0.42 * aspect * sin(t * 0.61), 0.42 * cos(t * 0.43));
      vec2 w2 = vec2(0.36 * aspect * sin(t * 0.29 + 1.7), 0.38 * cos(t * 0.37 + 2.4));
      float rW = mix(0.014, 0.095, wander);
      float stamp = max(
        smoothstep(rW, 0.0, length(p - w1)),
        smoothstep(rW, 0.0, length(p - w2))
      ) * wander * 0.44;
      B = clamp(B + stamp, 0.0, 1.0);
      A = clamp(A - stamp * 0.2, 0.0, 1.0);
    }
  }

  return vec4(A, B, B, 1.0);
`;
