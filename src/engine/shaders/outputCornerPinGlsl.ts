/** Perspective corner-pin + clip-mask for terminal output mapping (post-pass). */

import { OUTPUT_MAP_SHADER_MASK_POINTS, OUTPUT_MAP_TRANSFORM_GRID_POINTS } from "../data/outputMapping";
import {
  OUTPUT_MAP_ATLAS_LINK0,
  OUTPUT_MAP_ATLAS_MASK0,
  OUTPUT_MAP_ATLAS_WIDTH,
} from "../utils/outputMapMaskAtlas";

const MASK_ATLAS_U = `(index + ${OUTPUT_MAP_ATLAS_MASK0}.5) / ${OUTPUT_MAP_ATLAS_WIDTH}.0`;
const LINK_ATLAS_U = `(index + ${OUTPUT_MAP_ATLAS_LINK0}.5) / ${OUTPUT_MAP_ATLAS_WIDTH}.0`;
const TRANSFORM_ATLAS_U = `(index + 0.5) / ${OUTPUT_MAP_ATLAS_WIDTH}.0`;
const DECODE_XY =
  "vec2((enc.r * 65280.0 + enc.g * 255.0) / 65535.0, (enc.b * 65280.0 + enc.a * 255.0) / 65535.0)";

const INV_BILINEAR = `
    be = p1 - p0;
    bf = p3 - p0;
    bg = p0 - p1 + p2 - p3;
    bh = outUv - p0;
    bk2 = bg.x * bf.y - bg.y * bf.x;
    bk1 = be.x * bf.y - be.y * bf.x + bh.x * bg.y - bh.y * bg.x;
    bk0 = bh.x * be.y - bh.y * be.x;
    bq = bk1 * bk1 - 4.0 * bk0 * bk2;
    tv = 0.0;
    sv = 0.0;
    if (abs(bk2) < 1e-6) {
      tv = -bk0 / (bk1 + 1e-8);
      bden = be.x + bg.x * tv;
      if (abs(bden) < 1e-6) {
        bden = be.y + bg.y * tv;
        sv = (bh.y - bf.y * tv) / (bden + 1e-8);
      } else {
        sv = (bh.x - bf.x * tv) / bden;
      }
    } else {
      broot = sqrt(max(bq, 0.0));
      tA = (-bk1 - broot) / (2.0 * bk2);
      tB = (-bk1 + broot) / (2.0 * bk2);
      if (tA >= -0.02 && tA <= 1.02) {
        tv = tA;
      } else {
        tv = tB;
      }
      bden = be.x + bg.x * tv;
      if (abs(bden) < 1e-6) {
        bden = be.y + bg.y * tv;
        sv = (bh.y - bf.y * tv) / (bden + 1e-8);
      } else {
        sv = (bh.x - bf.x * tv) / bden;
      }
    }
    local = vec2(sv, tv);`;

function scoreGridCell(i0: number, i1: number, i2: number, i3: number, ox: string, oy: string): string {
  return `
    p0 = tPts[${i0}];
    p1 = tPts[${i1}];
    p2 = tPts[${i2}];
    p3 = tPts[${i3}];
    ${INV_BILINEAR}
    score = max(max(-local.x, local.x - 1.0), max(-local.y, local.y - 1.0));
    if (score < bestScore) {
      bestScore = score;
      bestLocal = local;
      bestOrigin = vec2(${ox}, ${oy});
    }`;
}

const EVAL_LAGRANGE = `
    l0u = 2.0 * (u - 0.5) * (u - 1.0);
    l1u = 4.0 * u * (1.0 - u);
    l2u = 2.0 * u * (u - 0.5);
    l0v = 2.0 * (v - 0.5) * (v - 1.0);
    l1v = 4.0 * v * (1.0 - v);
    l2v = 2.0 * v * (v - 0.5);
    d0u = 4.0 * u - 3.0;
    d1u = 4.0 - 8.0 * u;
    d2u = 4.0 * u - 1.0;
    d0v = 4.0 * v - 3.0;
    d1v = 4.0 - 8.0 * v;
    d2v = 4.0 * v - 1.0;
    mapped2 = tPts[0] * (l0u * l0v) + tPts[1] * (l1u * l0v) + tPts[2] * (l2u * l0v) +
              tPts[3] * (l0u * l1v) + tPts[4] * (l1u * l1v) + tPts[5] * (l2u * l1v) +
              tPts[6] * (l0u * l2v) + tPts[7] * (l1u * l2v) + tPts[8] * (l2u * l2v);
    du = tPts[0] * (d0u * l0v) + tPts[1] * (d1u * l0v) + tPts[2] * (d2u * l0v) +
         tPts[3] * (d0u * l1v) + tPts[4] * (d1u * l1v) + tPts[5] * (d2u * l1v) +
         tPts[6] * (d0u * l2v) + tPts[7] * (d1u * l2v) + tPts[8] * (d2u * l2v);
    dv = tPts[0] * (l0u * d0v) + tPts[1] * (l1u * d0v) + tPts[2] * (l2u * d0v) +
         tPts[3] * (l0u * d1v) + tPts[4] * (l1u * d1v) + tPts[5] * (l2u * d1v) +
         tPts[6] * (l0u * d2v) + tPts[7] * (l1u * d2v) + tPts[8] * (l2u * d2v);`;

function distToSeg(a: string, b: string): string {
  return `
    ba = ${b} - ${a};
    pa = outUv - ${a};
    ht = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-8), 0.0, 1.0);
    edgeDist = min(edgeDist, length(pa - ba * ht));`;
}

const LOAD_TRANSFORM = Array.from({ length: OUTPUT_MAP_TRANSFORM_GRID_POINTS }, (_, slot) => {
  return `
    index = ${slot}.0;
    enc = texture2D(maskTex, vec2(${TRANSFORM_ATLAS_U}, 0.5));
    tPts[${slot}] = ${DECODE_XY};`;
}).join("");

export const OUTPUT_CORNER_PIN_WARP_INPUTS = [
  { type: "sampler2D" as const, name: "frameTex", default: 0 },
  { type: "float" as const, name: "amount", default: 1 },
  { type: "float" as const, name: "tlX", default: 0 },
  { type: "float" as const, name: "tlY", default: 0 },
  { type: "float" as const, name: "trX", default: 1 },
  { type: "float" as const, name: "trY", default: 0 },
  { type: "float" as const, name: "brX", default: 1 },
  { type: "float" as const, name: "brY", default: 1 },
  { type: "float" as const, name: "blX", default: 0 },
  { type: "float" as const, name: "blY", default: 1 },
  { type: "sampler2D" as const, name: "maskTex", default: 0 },
  { type: "float" as const, name: "maskCount", default: 4 },
  { type: "float" as const, name: "maskLive", default: 0 },
  { type: "float" as const, name: "gridLive", default: 0 },
];

/**
 * Flat GLSL only — Hydra wraps this body inside a function; nested `float fn()` defs fail to compile.
 * Mask polys share one 64-step loop via atlas links (nested poly loops fail on WebGL1/ANGLE).
 * 4-corner pin stays a homography. Grid is one biquadratic surface (no cell seams).
 */
export const OUTPUT_CORNER_PIN_WARP_GLSL = `
  float a = clamp(amount, 0.0, 1.0);
  if (a < 0.00001) return _c0;

  vec2 tl = vec2(clamp(tlX, 0.0, 1.0), clamp(tlY, 0.0, 1.0));
  vec2 tr = vec2(clamp(trX, 0.0, 1.0), clamp(trY, 0.0, 1.0));
  vec2 br = vec2(clamp(brX, 0.0, 1.0), clamp(brY, 0.0, 1.0));
  vec2 bl = vec2(clamp(blX, 0.0, 1.0), clamp(blY, 0.0, 1.0));
  vec2 outUv = gl_FragCoord.xy / resolution.xy;
  vec2 pi = vec2(0.0);
  vec2 nextMask = vec2(0.0);
  vec2 tPts[${OUTPUT_MAP_TRANSFORM_GRID_POINTS}];
  vec2 p0 = tl;
  vec2 p1 = tr;
  vec2 p2 = br;
  vec2 p3 = bl;
  vec2 s0 = vec2(0.0, 0.0);
  vec2 s1 = vec2(1.0, 0.0);
  vec2 s2 = vec2(1.0, 1.0);
  vec2 s3 = vec2(0.0, 1.0);
  vec2 local = vec2(0.0);
  vec2 bestLocal = vec2(0.0);
  vec2 bestOrigin = vec2(0.0);
  vec2 srcUv = vec2(0.0);
  vec2 be = vec2(0.0);
  vec2 bf = vec2(0.0);
  vec2 bg = vec2(0.0);
  vec2 bh = vec2(0.0);
  vec2 ba = vec2(0.0);
  vec2 pa = vec2(0.0);
  vec2 mapped2 = vec2(0.0);
  vec2 du = vec2(0.0);
  vec2 dv = vec2(0.0);
  vec2 ferr = vec2(0.0);
  vec2 header = vec2(0.0);
  vec4 enc = vec4(0.0);
  vec4 sample = vec4(0.0);
  float index = 0.0;
  float nextIndex = 0.0;
  float bk0 = 0.0;
  float bk1 = 0.0;
  float bk2 = 0.0;
  float bq = 0.0;
  float broot = 0.0;
  float bden = 0.0;
  float tA = 0.0;
  float tB = 0.0;
  float tv = 0.0;
  float sv = 0.0;
  float ht = 0.0;
  float edgeDist = 1.0;
  float fade = 1.0;
  float score = 0.0;
  float bestScore = 10.0;
  float u = 0.5;
  float v = 0.5;
  float l0u = 0.0;
  float l1u = 0.0;
  float l2u = 0.0;
  float l0v = 0.0;
  float l1v = 0.0;
  float l2v = 0.0;
  float d0u = 0.0;
  float d1u = 0.0;
  float d2u = 0.0;
  float d0v = 0.0;
  float d1v = 0.0;
  float d2v = 0.0;
  float jdet = 0.0;
  bool covered = false;
  bool inPoly = false;

  if (maskLive > 0.5) {
    float n = clamp(floor(maskCount + 0.5), 3.0, ${OUTPUT_MAP_SHADER_MASK_POINTS}.0);
    for (int i = 0; i < ${OUTPUT_MAP_SHADER_MASK_POINTS}; i++) {
      if (float(i) + 0.5 < n) {
        index = float(i);
        enc = texture2D(maskTex, vec2(${MASK_ATLAS_U}, 0.5));
        pi = ${DECODE_XY};
        enc = texture2D(maskTex, vec2(${LINK_ATLAS_U}, 0.5));
        header = ${DECODE_XY};
        nextIndex = clamp(floor(header.x * ${OUTPUT_MAP_SHADER_MASK_POINTS}.0 + 0.5), 0.0, ${OUTPUT_MAP_SHADER_MASK_POINTS - 1}.0);
        index = nextIndex;
        enc = texture2D(maskTex, vec2(${MASK_ATLAS_U}, 0.5));
        nextMask = ${DECODE_XY};
        if (((pi.y > outUv.y) != (nextMask.y > outUv.y)) &&
          (outUv.x < (nextMask.x - pi.x) * (outUv.y - pi.y) / (nextMask.y - pi.y + 1e-8) + pi.x)) {
          inPoly = !inPoly;
        }
        if (header.y > 0.5) {
          if (header.y > 0.8) {
            covered = covered && !inPoly;
          } else {
            covered = covered || inPoly;
          }
          inPoly = false;
        }
      }
    }
    if (!covered) {
      return vec4(0.0, 0.0, 0.0, 1.0);
    }
  }

  if (gridLive > 0.5) {
    ${LOAD_TRANSFORM}
    ${scoreGridCell(0, 1, 4, 3, "0.0", "0.0")}
    ${scoreGridCell(1, 2, 5, 4, "0.5", "0.0")}
    ${scoreGridCell(3, 4, 7, 6, "0.0", "0.5")}
    ${scoreGridCell(4, 5, 8, 7, "0.5", "0.5")}
    if (bestScore > 0.05) {
      return vec4(0.0, 0.0, 0.0, 1.0);
    }
    u = clamp(bestOrigin.x + 0.5 * bestLocal.x, -0.05, 1.05);
    v = clamp(bestOrigin.y + 0.5 * bestLocal.y, -0.05, 1.05);
    srcUv = vec2(u, v);
    for (int step = 0; step < 6; step++) {
      ${EVAL_LAGRANGE}
      ferr = mapped2 - outUv;
      jdet = du.x * dv.y - du.y * dv.x;
      if (abs(jdet) > 1e-8) {
        u -= (ferr.x * dv.y - ferr.y * dv.x) / jdet;
        v -= (du.x * ferr.y - du.y * ferr.x) / jdet;
        u = clamp(u, -0.05, 1.05);
        v = clamp(v, -0.05, 1.05);
      }
    }
    ${EVAL_LAGRANGE}
    if (length(mapped2 - outUv) < 0.004 && u >= 0.0 && u <= 1.0 && v >= 0.0 && v <= 1.0) {
      srcUv = vec2(u, v);
    }
    ${distToSeg("tPts[0]", "tPts[1]")}
    ${distToSeg("tPts[1]", "tPts[2]")}
    ${distToSeg("tPts[2]", "tPts[5]")}
    ${distToSeg("tPts[5]", "tPts[8]")}
    ${distToSeg("tPts[8]", "tPts[7]")}
    ${distToSeg("tPts[7]", "tPts[6]")}
    ${distToSeg("tPts[6]", "tPts[3]")}
    ${distToSeg("tPts[3]", "tPts[0]")}
  } else {
    float s1 = (tr.x - tl.x) * (outUv.y - tl.y) - (tr.y - tl.y) * (outUv.x - tl.x);
    float s2 = (br.x - tr.x) * (outUv.y - tr.y) - (br.y - tr.y) * (outUv.x - tr.x);
    float s3 = (bl.x - br.x) * (outUv.y - br.y) - (bl.y - br.y) * (outUv.x - br.x);
    float s4 = (tl.x - bl.x) * (outUv.y - bl.y) - (tl.y - bl.y) * (outUv.x - bl.x);
    bool inQuad = !(((s1 < 0.0) || (s2 < 0.0) || (s3 < 0.0) || (s4 < 0.0)) &&
                    ((s1 > 0.0) || (s2 > 0.0) || (s3 > 0.0) || (s4 > 0.0)));
    if (!inQuad) {
      return vec4(0.0, 0.0, 0.0, 1.0);
    }

    float dx1 = p1.x - p2.x;
    float dy1 = p1.y - p2.y;
    float dx2 = p3.x - p2.x;
    float dy2 = p3.y - p2.y;
    float dx3 = p0.x - p1.x + p2.x - p3.x;
    float dy3 = p0.y - p1.y + p2.y - p3.y;
    float denom = dx1 * dy2 - dx2 * dy1;
    float g1 = 0.0;
    float g2 = 0.0;
    if (abs(denom) > 1e-6) {
      g1 = (dx3 * dy2 - dx2 * dy3) / denom;
      g2 = (dx1 * dy3 - dx3 * dy1) / denom;
    }

    float h00 = p1.x - p0.x + g1 * p1.x;
    float h10 = p1.y - p0.y + g1 * p1.y;
    float h20 = g1;
    float h01 = p3.x - p0.x + g2 * p3.x;
    float h11 = p3.y - p0.y + g2 * p3.y;
    float h21 = g2;
    float h02 = p0.x;
    float h12 = p0.y;
    float h22 = 1.0;

    float i00 = h11 * h22 - h12 * h21;
    float i10 = h12 * h20 - h10 * h22;
    float i20 = h10 * h21 - h11 * h20;
    float i01 = h21 * h02 - h01 * h22;
    float i11 = h00 * h22 - h02 * h20;
    float i21 = h01 * h20 - h00 * h21;
    float i02 = h01 * h12 - h02 * h11;
    float i12 = h02 * h10 - h00 * h12;
    float i22 = h00 * h11 - h01 * h10;
    float det = h00 * i00 + h01 * i10 + h02 * i20;
    if (abs(det) < 1e-8) {
      srcUv = outUv;
    } else {
      float invDet = 1.0 / det;
      vec3 mapped = vec3(outUv, 1.0);
      float rx = (i00 * invDet) * mapped.x + (i01 * invDet) * mapped.y + (i02 * invDet) * mapped.z;
      float ry = (i10 * invDet) * mapped.x + (i11 * invDet) * mapped.y + (i12 * invDet) * mapped.z;
      float rz = (i20 * invDet) * mapped.x + (i21 * invDet) * mapped.y + (i22 * invDet) * mapped.z;
      srcUv = vec2(rx, ry) / max(rz, 1e-6);
    }
    ${distToSeg("tl", "tr")}
    ${distToSeg("tr", "br")}
    ${distToSeg("br", "bl")}
    ${distToSeg("bl", "tl")}
  }

  fade = smoothstep(0.0, 0.016, edgeDist);
  sample = texture2D(frameTex, clamp(srcUv, 0.001, 0.999));
  return mix(vec4(0.0, 0.0, 0.0, 1.0), sample, fade);
`;
