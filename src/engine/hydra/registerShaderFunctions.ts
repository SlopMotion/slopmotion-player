import { bandRgbGlsl } from "../theme/audioBands";
import { METAL_SPHERE_SCENE_GLSL } from "../shaders/metalSphereSceneGlsl";
import { OSCILLOSCOPE_OVERLAY_GLSL } from "../shaders/oscilloscopeOverlayGlsl";
import { NEON_GRID_OVERLAY_GLSL } from "../shaders/neonGridOverlayGlsl";
import { THROUGH_THE_STARS_OVERLAY_GLSL } from "../shaders/throughTheStarsOverlayGlsl";
import { TEXT_LAYER_OVERLAY_GLSL } from "../shaders/textLayerOverlayGlsl";
import { PULSE_MARCH_COLOR_GLSL } from "../shaders/pulseMarchSceneGlsl";
import { POINT_CLOUD_REMAP_GLSL } from "../shaders/pointCloudRemapGlsl";
import { LUMA_PRINT_GLSL } from "../shaders/lumaPrintGlsl";
import { FILL_LAYER_SRC_GLSL } from "../shaders/fillLayerSrcGlsl";
import { PLASMA_SRC_GLSL } from "../shaders/plasmaSrcGlsl";
import {
  PATTERN_NOISE_SRC_GLSL,
  PATTERN_CELLS_SRC_GLSL,
  PATTERN_TILES_SRC_GLSL,
  PATTERN_POLAR_SRC_GLSL,
  PATTERN_GEOMETRY_SRC_GLSL,
  PATTERN_TURING_DISPLAY_GLSL,
  PATTERN_TURING_DISPLAY_INPUTS,
  PATTERN_RD_SIM_GLSL,
} from "../shaders/patternLayerGlsl";
import { ELECTRIC_NOISE_SRC_GLSL } from "../shaders/electricNoiseSrcGlsl";
import { TOPO_CONTOUR_SRC_GLSL } from "../shaders/topoContourGlsl";
import { WARP_TUNNEL_COLOR_GLSL } from "../shaders/warpTunnelGlsl";
import { UNIVERSE_WITHIN_SRC_GLSL } from "../shaders/universeWithinSrcGlsl";
import { FRACTAL_FOLD_SRC_GLSL } from "../shaders/fractalFoldSrcGlsl";
import { PLEXUS_SRC_GLSL } from "../shaders/plexusSrcGlsl";
import { SUPERFORMULA_SRC_GLSL } from "../shaders/superformulaSrcGlsl";
import { LIQUIX_COORD_GLSL } from "../shaders/liquixGlsl";
import { WET_LENS_DISTORT_GLSL, WET_LENS_OVERLAY_GLSL } from "../shaders/wetLensGlsl";
import { PIXEL_SORT_COLOR_GLSL } from "../shaders/pixelSortGlsl";
import { DEGAUSS_DISTORT_GLSL } from "../shaders/degaussGlsl";
import { VHS_DISTORT_GLSL, VHS_COLOR_GLSL } from "../shaders/vhsGlsl";
import {
  NORMAL_MAP_DISTORT_GLSL,
  NORMAL_MAP_LIGHT_GLSL,
} from "../shaders/normalMapGlsl";
import { BLUR_MIRROR_UV_GLSL, BLUR_NOISE_DISTORT_GLSL } from "../shaders/blurNoiseGlsl";
import { BLUR_GAUSSIAN_COLOR_GLSL } from "../shaders/blurGaussianGlsl";
import { VIGNETTE_GRADE_GLSL } from "../shaders/vignetteGlsl";
import { RANDOM_GALLERY_DISTORT_GLSL } from "../shaders/randomGalleryGlsl";
import { GRID_SHUFFLE_DISTORT_GLSL } from "../shaders/gridShuffleGlsl";
import { MIRROR_STRIPES_SRC_GLSL } from "../shaders/mirrorStripesGlsl";
import {
  REACTION_DIFF_SIM_GLSL,
  REACTION_DIFFUSION_OVERLAY_GLSL,
} from "../shaders/reactionDiffusionGlsl";
import { LUMA_DUST_OVERLAY_GLSL } from "../shaders/lumaDustGlsl";
import { LUMA_LOCK_OVERLAY_GLSL } from "../shaders/lumaLockGlsl";
import {
  EMBER_HEAT_DISTORT_GLSL,
  EMBER_HEAT_FLOW_GLSL,
  EMBER_HEAT_OVERLAY_GLSL,
} from "../shaders/emberHeatGlsl";
import {
  SHATTER_LAYER_COORD_GLSL,
  SHATTER_LAYER_GAP_GLSL,
} from "../shaders/shatterLayerGlsl";
import { FEEDBACK_GRADE_GLSL } from "../shaders/feedbackGlsl";
import { GHOST_FLOW_GLSL } from "../shaders/ghostFlowGlsl";
import { RESYNTH_WARP_GLSL, RESYNTH_TINT_GLSL } from "../shaders/resynthesizeGlsl";
import { SHAPE_LAYER_SRC_GLSL } from "../shaders/shapeLayerGlsl";
import { STRING_LAYER_COLOR_GLSL } from "../shaders/stringLayerGlsl";
import { PALETTE_RECOLOR_GLSL } from "../shaders/paletteRecolorGlsl";
import { HIT_STREAK_EXTRACT_GLSL } from "../shaders/hitStreakGlsl";
import { LENS_7C_PRISM_GLSL } from "../shaders/lens7cGlsl";
import {
  GLOW_BLOOM_ADD_GLSL,
  GLOW_COLOR_GLSL,
  GLOW_HIGHLIGHT_GLSL,
} from "../shaders/glowGlsl";
import { LAYER_MASK_ALPHA_GLSL, LAYER_MASK_CUT_GLSL } from "../shaders/layerMaskGlsl";
import { LAYER_OVERLAY_GLSL } from "../shaders/layerOverlayGlsl";
import { VIDEO_MAP_MASK_GLSL } from "../shaders/videoMapGlsl";
import {
  OUTPUT_CORNER_PIN_WARP_GLSL,
  OUTPUT_CORNER_PIN_WARP_INPUTS,
} from "../shaders/outputCornerPinGlsl";
import { SHAKE_DISTORT_GLSL } from "../shaders/shakeGlsl";
import { TIME_GLITCH_SLICES_GLSL } from "../shaders/timeGlitchGlsl";
import { RAMP_GRADIENT_GLSL } from "../shaders/rampGradientGlsl";
import { ANSWER_PRINT_GLSL } from "../shaders/answerPrintGlsl";
import type { HydraSynthInstance } from "../types/hydraWindow";

export function registerHydraShaderFunctions(synth: HydraSynthInstance) {
  const setFunction = synth.setFunction;
  if (!setFunction) return;
      setFunction({
        name: 'customKaleid',
        type: 'coord',
        inputs: [
          { type: 'float', name: 'nSides', default: 4 },
          { type: 'float', name: 'angle', default: 0 },
        ],
        glsl: `
          if (nSides < 0.1) return _st;
          float aspect = resolution.x / max(1.0, resolution.y);
          vec2 st = _st - 0.5;
          st.x *= aspect;

          float r = length(st);
          float a = atan(st.y, st.x);
          float pi = 2. * 3.1416;

          a = mod(a, pi / nSides);
          a = abs(a - pi / nSides / 2.);
          a += angle;

          vec2 outSt = r * vec2(cos(a), sin(a));
          outSt.x /= aspect;
          return outSt + 0.5;
        `
      });

      setFunction({
        name: 'customMirror',
        type: 'coord',
        inputs: [
          { type: 'float', name: 'amount', default: 0 },
          { type: 'float', name: 'axis', default: 0 },
          { type: 'float', name: 'angle', default: 0 },
          { type: 'float', name: 'flip', default: 0 },
          { type: 'float', name: 'centerX', default: 0.5 },
          { type: 'float', name: 'centerY', default: 0.5 },
        ],
        glsl: `
          float amt = clamp(amount, 0.0, 1.0);
          if (amt < 0.00001) return _st;
          vec2 st = _st;
          vec2 m = st;
          if (axis < 0.5) m.x = 1.0 - st.x;
          else if (axis < 1.5) m.y = 1.0 - st.y;
          else if (axis < 2.5) { m.x = 1.0 - st.x; m.y = 1.0 - st.y; }
          else {
            float aspect = resolution.x / max(1.0, resolution.y);
            vec2 c = vec2(clamp(centerX, 0.0, 1.0), clamp(centerY, 0.0, 1.0));
            vec2 p = st - c;
            p.x *= aspect;
            float th = clamp(angle, 0.0, 1.0) * 3.14159265;
            vec2 n = vec2(-sin(th), cos(th));
            float sd = dot(p, n);
            float keep = flip > 0.5 ? -1.0 : 1.0;
            if (sd * keep > 0.0) p -= 2.0 * sd * n;
            p.x /= aspect;
            m = p + c;
          }
          return mix(st, m, amt);
        `
      });

      setFunction({
        name: 'customTile',
        type: 'coord',
        inputs: [
          { type: 'float', name: 'amount', default: 0 },
          { type: 'float', name: 'cols', default: 3 },
          { type: 'float', name: 'rows', default: 3 },
        ],
        glsl: `
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _st;
          vec2 st = _st;
          vec2 reps = vec2(max(1.0, cols), max(1.0, rows));
          vec2 grid = st * reps;
          vec2 cell = fract(grid);
          vec2 id = floor(grid);
          if (mod(id.x, 2.0) >= 1.0) cell.x = 1.0 - cell.x;
          if (mod(id.y, 2.0) >= 1.0) cell.y = 1.0 - cell.y;
          return mix(st, cell, a);
        `
      });

      setFunction({
        name: 'customWrap',
        type: 'coord',
        inputs: [
          { type: 'float', name: 'amount', default: 0 },
          { type: 'float', name: 'centerX', default: 0.5 },
          { type: 'float', name: 'centerY', default: 0.5 },
          { type: 'float', name: 'radius', default: 0.75 },
          { type: 'float', name: 'falloff', default: 0.5 },
          { type: 'float', name: 'twist', default: 0 },
        ],
        glsl: `
          float amt = clamp(amount, -1.0, 1.0);
          float tw = clamp(twist, -1.0, 1.0);
          if (abs(amt) < 0.00001 && abs(tw) < 0.00001) return _st;
          vec2 c = vec2(clamp(centerX, 0.0, 1.0), clamp(centerY, 0.0, 1.0));
          vec2 d = _st - c;
          float r = length(d);
          float rad = max(0.08, clamp(radius, 0.15, 1.0));
          float t = clamp(r / rad, 0.0, 1.0);
          float soft = clamp(falloff, 0.0, 1.0);
          float edge = smoothstep(0.0, 1.0, t);
          float influence = mix(1.0 - edge, pow(1.0 - t, mix(1.2, 3.5, soft)), soft);
          float scale = 1.0 + amt * 0.78 * influence;
          float aspect = resolution.x / max(1.0, resolution.y);
          float spin = tw * 3.14159265 * influence;
          vec2 da = vec2(d.x * aspect, d.y);
          vec2 spun = vec2(
            da.x * cos(spin) - da.y * sin(spin),
            da.x * sin(spin) + da.y * cos(spin)
          );
          vec2 warped = c + vec2(spun.x / aspect, spun.y) * scale;
          return vec2(
            1.0 - abs(mod(warped.x, 2.0) - 1.0),
            1.0 - abs(mod(warped.y, 2.0) - 1.0)
          );
        `
      });

      setFunction({
        name: 'dither',
        type: 'color',
        inputs: [
          { type: 'sampler2D', name: 'blueTex', default: 0 },
          { type: 'float', name: 'amount', default: 0.0 },
          { type: 'float', name: 'binary', default: 0.0 },
          { type: 'float', name: 'balance', default: 0.5 },
          { type: 'float', name: 'scale', default: 3.0 },
        ],
        glsl: `
          vec4 src = _c0;
          float amt = clamp(amount, 0.0, 1.0);
          if (amt < 0.00001) return src;
          float bal = clamp(balance, 0.0, 1.0);
          float sc = clamp(scale, 0.25, 64.0);
          vec3 lumW = vec3(0.299, 0.587, 0.114);

          vec2 fc = gl_FragCoord.xy;
          vec2 gv = floor(fc / sc);
          float t = time * 2.1;
          vec2 blueUv = (gv + vec2(t * 0.31, t * 0.19)) / 64.0;
          float n = texture2D(blueTex, blueUv).x;
          float jitter = (n - 0.5) * amt;

          vec3 outRgb;
          if (binary > 0.5 && binary < 1.5) {
            float L = dot(src.rgb, lumW);
            float contrast = 1.0 + amt * 3.5;
            float La = clamp((L - bal) * contrast + bal, 0.0, 1.0);
            float thr = clamp(bal + jitter * 0.9, 0.002, 0.998);
            float bw = step(thr, La);
            outRgb = vec3(bw);
          } else {
            float posterize = 0.0;
            if (binary > 3.5) posterize = 6.0;
            else if (binary > 2.5) posterize = 4.0;
            else if (binary > 1.5) posterize = 3.0;
            float levels = posterize > 0.5 ? posterize : max(4.0, mix(16.0, 5.0, amt));
            outRgb.r = floor(src.r * levels + jitter) / (levels - 1.0);
            outRgb.g = floor(src.g * levels + jitter) / (levels - 1.0);
            outRgb.b = floor(src.b * levels + jitter) / (levels - 1.0);
            outRgb = clamp(outRgb, 0.0, 1.0);
          }

          return vec4(mix(src.rgb, outRgb, clamp(amt * 1.1, 0.0, 1.0)), src.a);
        `
      });

      

      setFunction({
        name: 'glow',
        type: 'color',
        inputs: [
          { type: 'float', name: 'amount', default: 0.0 },
          { type: 'float', name: 'threshold', default: 0.48 },
          { type: 'float', name: 'bloom', default: 0.55 },
        ],
        glsl: GLOW_COLOR_GLSL,
      });

      setFunction({
        name: 'glowHighlight',
        type: 'color',
        inputs: [
          { type: 'float', name: 'threshold', default: 0.48 },
          { type: 'float', name: 'bloom', default: 0.55 },
        ],
        glsl: GLOW_HIGHLIGHT_GLSL,
      });

      setFunction({
        name: 'glowBloomAdd',
        type: 'combine',
        inputs: [{ type: 'float', name: 'amount', default: 0.0 }],
        glsl: GLOW_BLOOM_ADD_GLSL,
      });

      setFunction({
        name: "sharpenUnsharp",
        type: "combine",
        inputs: [{ type: "float", name: "amount", default: 0.0 }],
        glsl: `
          float s = clamp(amount, 0.0, 2.0);
          if (s < 0.00001) return _c0;
          vec3 w = vec3(0.299, 0.587, 0.114);
          float l0 = dot(_c0.rgb, w);
          float l1 = dot(_c1.rgb, w);
          float lSharp = clamp(l0 + s * (l0 - l1), 0.0, 1.0);
          vec3 chroma = _c0.rgb - vec3(l0);
          return vec4(clamp(vec3(lSharp) + chroma, 0.0, 1.0), _c0.a);
        `,
      });

      setFunction({
        name: "flashBurst",
        type: "color",
        inputs: [{ type: "float", name: "amount", default: 0.0 }],
        glsl: `
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _c0;
          vec4 c = _c0;
          c.rgb = mix(c.rgb, vec3(1.0), a);
          return c;
        `,
      });

      setFunction({
        name: "triggerDebugOverlay",
        type: "color",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "kick", default: 0.0 },
          { type: "float", name: "low", default: 0.0 },
          { type: "float", name: "mid", default: 0.0 },
          { type: "float", name: "high", default: 0.0 },
          { type: "float", name: "beat", default: 0.0 },
          { type: "float", name: "rowY", default: 0.08 },
          { type: "float", name: "minSize", default: 0.022 },
          { type: "float", name: "maxSize", default: 0.09 },
        ],
        glsl: `
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _c0;

          float aspect = resolution.x / max(1.0, resolution.y);
          vec2 p = (gl_FragCoord.xy / resolution.xy);
          p.x *= aspect;

          float y0 = clamp(rowY, 0.03, 0.22);
          float minR = clamp(minSize, 0.008, 0.08) * aspect;
          float maxR = clamp(maxSize, minR + 0.004, 0.18) * aspect;
          float gap = 0.13 * aspect;
          float x0 = 0.5 * aspect - gap * 2.0;

          float i0 = clamp(kick, 0.0, 1.0);
          float i1 = clamp(low, 0.0, 1.0);
          float i2 = clamp(mid, 0.0, 1.0);
          float i3 = clamp(high, 0.0, 1.0);
          float i4 = clamp(beat, 0.0, 1.0);

          vec3 overlay = vec3(0.0);
          float mask = 0.0;

          vec2 c0 = vec2(x0 + gap * 0.0, y0);
          float r0 = mix(minR, maxR, i0);
          float m0 = 1.0 - smoothstep(r0 - 0.0015, r0 + 0.0015, length(p - c0));
          overlay = mix(overlay, ${bandRgbGlsl("kick")}, m0);
          mask = max(mask, m0);

          vec2 c1 = vec2(x0 + gap * 1.0, y0);
          float r1 = mix(minR, maxR, i1);
          float m1 = 1.0 - smoothstep(r1 - 0.0015, r1 + 0.0015, length(p - c1));
          overlay = mix(overlay, ${bandRgbGlsl("low")}, m1);
          mask = max(mask, m1);

          vec2 c2 = vec2(x0 + gap * 2.0, y0);
          float r2 = mix(minR, maxR, i2);
          float m2 = 1.0 - smoothstep(r2 - 0.0015, r2 + 0.0015, length(p - c2));
          overlay = mix(overlay, ${bandRgbGlsl("mid")}, m2);
          mask = max(mask, m2);

          vec2 c3 = vec2(x0 + gap * 3.0, y0);
          float r3 = mix(minR, maxR, i3);
          float m3 = 1.0 - smoothstep(r3 - 0.0015, r3 + 0.0015, length(p - c3));
          overlay = mix(overlay, ${bandRgbGlsl("high")}, m3);
          mask = max(mask, m3);

          vec2 c4 = vec2(x0 + gap * 4.0, y0);
          float r4 = mix(minR, maxR, i4);
          float m4 = 1.0 - smoothstep(r4 - 0.0015, r4 + 0.0015, length(p - c4));
          overlay = mix(overlay, ${bandRgbGlsl("beat")}, m4);
          mask = max(mask, m4);

          vec3 rgb = mix(_c0.rgb, overlay, mask * a * 0.92);
          return vec4(rgb, _c0.a);
        `,
      });

      setFunction({
        name: "exportVideoFit",
        type: "coord",
        inputs: [
          { type: "float", name: "contentHalfW", default: 0.5 },
          { type: "float", name: "contentHalfH", default: 0.5 },
          { type: "float", name: "contentOffsetY", default: 0.0 },
        ],
        glsl: `
          float halfW = max(1e-4, contentHalfW);
          float halfH = max(1e-4, contentHalfH);
          vec2 d = _st - vec2(0.5, 0.5 + contentOffsetY);
          return vec2(d.x / halfW, d.y / halfH) * 0.5 + 0.5;
        `,
      });

      setFunction({
        name: "exportMatte",
        type: "color",
        inputs: [
          { type: "float", name: "amount", default: 1.0 },
          { type: "float", name: "targetWidth", default: 1920.0 },
          { type: "float", name: "targetHeight", default: 1080.0 },
          { type: "float", name: "usePixelBox", default: 1.0 },
          { type: "float", name: "targetAspect", default: 1.7777778 },
          { type: "float", name: "inset", default: 0.025 },
          { type: "float", name: "feather", default: 0.015 },
          { type: "float", name: "contentHalfW", default: 0.5 },
          { type: "float", name: "contentHalfH", default: 0.5 },
          { type: "float", name: "contentOffsetY", default: 0.0 },
        ],
        glsl: `
          vec4 c = _c0;
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return c;

          vec2 res = resolution.xy;
          float safeW;
          float safeH;

          if (usePixelBox > 0.5) {
            safeW = clamp(targetWidth, 1.0, res.x) / res.x;
            safeH = clamp(targetHeight, 1.0, res.y) / res.y;
          } else {
            float frameAspect = res.x / max(1.0, res.y);
            float targetAspectClamped = max(0.01, targetAspect);
            if (frameAspect > targetAspectClamped) {
              safeH = 1.0;
              safeW = targetAspectClamped / frameAspect;
            } else {
              safeW = 1.0;
              safeH = frameAspect / targetAspectClamped;
            }
          }

          float insetVal = clamp(inset, 0.0, 0.25);
          safeW = max(0.01, safeW - insetVal * 2.0);
          safeH = max(0.01, safeH - insetVal * 2.0);

          vec2 uv = gl_FragCoord.xy / res;
          vec2 d = abs(uv - vec2(0.5));
          vec2 cropHalf = vec2(safeW, safeH) * 0.5;
          vec2 contentHalf = vec2(max(1e-4, contentHalfW), max(1e-4, contentHalfH));
          vec2 contentCenter = vec2(0.5, 0.5 + contentOffsetY);
          vec2 dc = abs(uv - contentCenter);

          float featherVal = max(1e-4, clamp(feather, 0.0, 0.2));
          float inCropX = 1.0 - smoothstep(cropHalf.x, cropHalf.x + featherVal, d.x);
          float inCropY = 1.0 - smoothstep(cropHalf.y, cropHalf.y + featherVal, d.y);
          float inCrop = inCropX * inCropY;

          float inContentX = 1.0 - smoothstep(contentHalf.x, contentHalf.x + featherVal * 0.35, dc.x);
          float inContentY = 1.0 - smoothstep(contentHalf.y, contentHalf.y + featherVal * 0.35, dc.y);
          float inContent = inContentX * inContentY;

          float inside = inCrop * inContent;

          vec3 matted = mix(vec3(0.0), c.rgb, inside);
          c.rgb = mix(_c0.rgb, matted, a);
          return c;
        `,
      });

      setFunction({
        name: "outputCornerPinWarp",
        type: "color",
        inputs: OUTPUT_CORNER_PIN_WARP_INPUTS,
        glsl: OUTPUT_CORNER_PIN_WARP_GLSL,
      });

      setFunction({
        name: "vignetteGrade",
        type: "combine",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "radius", default: 0.78 },
          { type: "float", name: "softness", default: 0.42 },
          { type: "float", name: "blur", default: 0.0 },
        ],
        glsl: VIGNETTE_GRADE_GLSL,
      });

      setFunction({
        name: "pulseGrade",
        type: "color",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "bloom", default: 0.45 },
        ],
        glsl: `
          vec4 c = _c0;
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return c;
          float b = clamp(bloom, 0.0, 1.0);

          // Lift highlights toward white only — bounded, no hue shift, no color artifacts.
          float luma = dot(c.rgb, vec3(0.299, 0.587, 0.114));
          float lift = b * a * smoothstep(0.55, 1.0, luma) * 0.7;
          c.rgb = mix(c.rgb, vec3(1.0), lift);

          // Gentle edge settle (pure black shadow) so the frame breathes with the beat.
          vec2 uv = (gl_FragCoord.xy / resolution.xy) - 0.5;
          uv.x *= resolution.x / max(1.0, resolution.y);
          float d = length(uv) / 0.70710678;
          float edge = smoothstep(0.65, 1.05, d);
          c.rgb *= 1.0 - a * edge * 0.22;
          return c;
        `,
      });

      setFunction({
        name: "oscilloscopeOverlay",
        type: "combine",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "glow", default: 0.55 },
        ],
        glsl: OSCILLOSCOPE_OVERLAY_GLSL,
      });

      setFunction({
        name: "neonGridOverlay",
        type: "combine",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "glow", default: 0.5 },
        ],
        glsl: NEON_GRID_OVERLAY_GLSL,
      });

      setFunction({
        name: "textLayerOverlay",
        type: "combine",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "glow", default: 0.35 },
        ],
        glsl: TEXT_LAYER_OVERLAY_GLSL,
      });

      setFunction({
        name: 'oscilloscopeDistort',
        type: 'coord',
        inputs: [
          { type: 'float', name: 'amount', default: 0.0 },
          { type: 'float', name: 'frequency', default: 8.0 },
          { type: 'float', name: 'phase', default: 0.0 },
          { type: 'float', name: 'mode', default: 0.0 },
          { type: 'float', name: 'centerFocus', default: 1.0 }
        ],
        glsl: `
          if (amount < 0.00001) return _st;
          vec2 uv = _st - vec2(0.5);
          float dist = length(uv) * 2.0;
          float envelope = pow(clamp(1.0 - dist, 0.0, 1.0), max(0.15, centerFocus));
          float wave;
          vec2 delta;
          if (mode < 0.5) {
            wave = sin(uv.x * frequency * 6.2831853 + phase);
            delta = vec2(0.0, wave * amount * envelope);
          } else if (mode < 1.5) {
            wave = sin(uv.y * frequency * 6.2831853 + phase);
            delta = vec2(wave * amount * envelope, 0.0);
          } else {
            wave = sin(dist * frequency * 6.2831853 + phase);
            vec2 dir = dist > 0.0005 ? normalize(uv) * 0.5 : vec2(0.0);
            delta = dir * wave * amount * envelope;
          }
          return _st + delta;
        `
      });

      setFunction({
        name: 'cymaticDistort',
        type: 'coord',
        inputs: [
          { type: 'float', name: 'amount', default: 0.0 },
          { type: 'float', name: 'frequency', default: 12.0 },
        ],
        glsl: `
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _st;
          const float PI = 3.14159265;
          vec2 p = (_st - vec2(0.5)) * 2.0;
          float ki = floor(max(1.0, frequency));
          float n = floor(ki / 6.0) + 1.0;
          float m = mod(ki, 6.0) + 1.0;
          if (m >= n) m = max(1.0, n - 1.0);
          if (m < 1.0) m = 1.0;
          if (abs(n - m) < 0.5) m = min(n + 1.0, 12.0);
          float nx = n * PI * p.x;
          float ny = n * PI * p.y;
          float mx = m * PI * p.x;
          float my = m * PI * p.y;
          float field = cos(nx) * cos(my) - cos(mx) * cos(ny);
          vec2 grad = vec2(
            -n * PI * sin(nx) * cos(my) + m * PI * sin(mx) * cos(ny),
            -m * PI * cos(nx) * sin(my) + n * PI * cos(mx) * sin(ny)
          );
          float gLen = length(grad);
          vec2 dir = gLen > 0.0001 ? grad / gLen : vec2(0.0);
          return _st + dir * field * a * 0.14;
        `
      });

      setFunction({
        name: 'vibrationDistort',
        type: 'coord',
        inputs: [
          { type: 'float', name: 'amount', default: 0.0 },
          { type: 'float', name: 'frequency', default: 12.0 },
        ],
        glsl: `
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _st;
          float hz = max(2.0, frequency);
          float t = time * hz * 6.2831853;
          float sx = sin(t) * 0.52 + sin(t * 2.17 + 0.6) * 0.26 + sin(t * 4.9 + 1.3) * 0.14;
          float sy = cos(t * 1.07 + 1.1) * 0.52 + cos(t * 1.83 + 0.35) * 0.26 + sin(t * 5.3 + 0.8) * 0.14;
          float spin = time * 0.38;
          float cs = cos(spin);
          float sn = sin(spin);
          vec2 delta = vec2(sx * cs - sy * sn, sx * sn + sy * cs);
          return _st + delta * a * 0.052;
        `
      });

      setFunction({
        name: "shakeDistort",
        type: "coord",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "speed", default: 1.0 },
          { type: "float", name: "bounce", default: 0.55 },
          { type: "float", name: "roll", default: 0.4 },
          { type: "float", name: "zoom", default: 0.45 },
        ],
        glsl: SHAKE_DISTORT_GLSL,
      });

      setFunction({
        name: "degaussDistort",
        type: "coord",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "frequency", default: 12.0 },
          { type: "float", name: "speed", default: 1.4 },
        ],
        glsl: DEGAUSS_DISTORT_GLSL,
      });

      setFunction({
        name: "vhsDistort",
        type: "coord",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "tracking", default: 0.48 },
          { type: "float", name: "speed", default: 1.0 },
        ],
        glsl: VHS_DISTORT_GLSL,
      });

      setFunction({
        name: "vhsColor",
        type: "color",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "noise", default: 0.38 },
          { type: "float", name: "lines", default: 0.52 },
          { type: "float", name: "dropout", default: 0.28 },
        ],
        glsl: VHS_COLOR_GLSL,
      });

      setFunction({
        name: 'lensDistort',
        type: 'coord',
        inputs: [
          { type: 'float', name: 'amount', default: 0.0 },
          { type: 'float', name: 'curvature', default: 1.0 },
        ],
        glsl: `
          if (amount < 0.00001) return _st;
          vec2 uv = _st - vec2(0.5);
          float curve = max(0.15, curvature);
          float k = -amount * 0.55 * curve;
          uv *= 1.0 + k * dot(uv, uv);
          return uv + vec2(0.5);
        `
      });

      setFunction({
        name: "wetLensDistort",
        type: "coord",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "density", default: 18.0 },
          { type: "float", name: "speed", default: 0.26 },
          { type: "float", name: "refraction", default: 0.76 },
          { type: "float", name: "gravity", default: 0.74 },
        ],
        glsl: WET_LENS_DISTORT_GLSL,
      });

      setFunction({
        name: "wetLensOverlay",
        type: "color",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "density", default: 18.0 },
          { type: "float", name: "speed", default: 0.26 },
          { type: "float", name: "highlights", default: 0.42 },
          { type: "float", name: "gravity", default: 0.74 },
        ],
        glsl: WET_LENS_OVERLAY_GLSL,
      });

      setFunction({
        name: "pixelSortSmear",
        type: "color",
        inputs: [
          { type: "sampler2D", name: "videoTex", default: 0 },
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "threshold", default: 0.45 },
          { type: "float", name: "reach", default: 0.4 },
          { type: "float", name: "chaos", default: 0.7 },
          { type: "float", name: "sortDir", default: 0.0 },
        ],
        glsl: PIXEL_SORT_COLOR_GLSL,
      });

      setFunction({
        name: "emberHeatDistort",
        type: "coord",
        inputs: [
          { type: "float", name: "amount", default: 0 },
          { type: "float", name: "speed", default: 0.8 },
          { type: "float", name: "density", default: 22 },
          { type: "float", name: "waves", default: 0.76 },
        ],
        glsl: EMBER_HEAT_DISTORT_GLSL,
      });

      setFunction({
        name: "emberHeatOverlay",
        type: "color",
        inputs: [
          { type: "float", name: "amount", default: 0 },
          { type: "float", name: "density", default: 22 },
          { type: "float", name: "speed", default: 0.8 },
          { type: "float", name: "glow", default: 0.82 },
          { type: "float", name: "waves", default: 0.76 },
          { type: "float", name: "intensity", default: 0.78 },
        ],
        glsl: EMBER_HEAT_OVERLAY_GLSL,
      });

      setFunction({
        name: "emberHeatFlow",
        type: "combine",
        inputs: [
          { type: "float", name: "amount", default: 0 },
          { type: "float", name: "waves", default: 0.76 },
        ],
        glsl: EMBER_HEAT_FLOW_GLSL,
      });

      setFunction({
        name: "blurNoise",
        type: "coord",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "scale", default: 12.0 },
          { type: "float", name: "speed", default: 0.2 },
        ],
        glsl: BLUR_NOISE_DISTORT_GLSL,
      });

      setFunction({
        name: "blurMirrorUv",
        type: "coord",
        inputs: [],
        glsl: BLUR_MIRROR_UV_GLSL,
      });

      setFunction({
        name: "blurGaussian",
        type: "color",
        inputs: [
          { type: "sampler2D", name: "blurTex", default: 0 },
          { type: "float", name: "amount", default: 0.0 },
        ],
        glsl: BLUR_GAUSSIAN_COLOR_GLSL,
      });

      setFunction({
        name: "normalMapDistort",
        type: "coord",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "scale", default: 12.0 },
          { type: "float", name: "speed", default: 0.2 },
          { type: "float", name: "refraction", default: 0.55 },
          { type: "float", name: "detail", default: 1.0 },
        ],
        glsl: NORMAL_MAP_DISTORT_GLSL,
      });

      setFunction({
        name: "normalMapLight",
        type: "color",
        inputs: [
          { type: "sampler2D", name: "videoTex", default: 0 },
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "mapSource", default: 0.0 },
          { type: "float", name: "scale", default: 12.0 },
          { type: "float", name: "speed", default: 0.2 },
          { type: "float", name: "lightMix", default: 0.45 },
          { type: "float", name: "specular", default: 0.4 },
          { type: "float", name: "lightX", default: 0.65 },
          { type: "float", name: "lightY", default: 0.35 },
          { type: "float", name: "detail", default: 1.05 },
        ],
        glsl: NORMAL_MAP_LIGHT_GLSL,
      });

      setFunction({
        name: "reactionDiffSim",
        type: "src",
        inputs: [
          { type: "sampler2D", name: "stateTex", default: 0 },
          { type: "sampler2D", name: "videoTex", default: 0 },
          { type: "float", name: "feed", default: 0.55 },
          { type: "float", name: "kill", default: 0.57 },
          { type: "float", name: "scale", default: 12.0 },
          { type: "float", name: "speed", default: 0.35 },
          { type: "float", name: "styleMap", default: 0.35 },
          { type: "float", name: "videoDrive", default: 0.72 },
          { type: "float", name: "flow", default: 0.28 },
          { type: "float", name: "emboss", default: 0.55 },
          { type: "float", name: "forceSeed", default: 0.0 },
        ],
        glsl: REACTION_DIFF_SIM_GLSL,
      });

      setFunction({
        name: "reactionDiffusionOverlay",
        type: "combine",
        inputs: [{ type: "float", name: "amount", default: 0.0 }],
        glsl: REACTION_DIFFUSION_OVERLAY_GLSL,
      });

      setFunction({
        name: "lumaDustOverlay",
        type: "combine",
        inputs: [{ type: "float", name: "amount", default: 0.0 }],
        glsl: LUMA_DUST_OVERLAY_GLSL,
      });

      setFunction({
        name: "lumaLockOverlay",
        type: "combine",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "glow", default: 0.45 },
        ],
        glsl: LUMA_LOCK_OVERLAY_GLSL,
      });

      setFunction({
        name: "concentricRotateDistort",
        type: "coord",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "mode", default: 0.0 },
          { type: "float", name: "rings", default: 7.0 },
          { type: "float", name: "ringStep", default: 0.08 },
          { type: "float", name: "speed", default: 0.25 },
          { type: "float", name: "centerX", default: 0.5 },
          { type: "float", name: "centerY", default: 0.5 },
        ],
        glsl: `
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _st;

          vec2 origin = vec2(clamp(centerX, 0.0, 1.0), clamp(centerY, 0.0, 1.0));
          vec2 uv = _st - origin;
          float aspect = resolution.x / max(1.0, resolution.y);
          uv.x *= aspect;

          float maxR = length(vec2(0.5 * aspect, 0.5));
          float ringCount = max(2.0, floor(rings + 0.5));
          const float TAU = 6.2831853;
          float perRing = clamp(ringStep, 0.0, 0.25) * TAU;
          float isDouble = step(0.5, clamp(mode, 0.0, 1.0));

          float dist = length(uv);
          float t = clamp(dist / max(maxR, 1e-4), 0.0, 1.0);
          float ringIdx = floor(t * ringCount);
          ringIdx = clamp(ringIdx, 0.0, ringCount - 1.0);
          float concentricAng = ringIdx * perRing
            + time * max(0.0, speed) * ringIdx;

          float softR = maxR * 0.05;
          float rSoft = sqrt(dot(uv, uv) + softR * softR);
          float tSoft = clamp(rSoft / max(maxR, 1e-4), 0.0, 1.0);
          vec2 n = uv / rSoft;
          float armWave = n.x * n.y * 2.0;
          float spiralPitch = perRing * ringCount * 0.5;
          float radialTwist = tSoft * tSoft * spiralPitch;
          float armTwist = tSoft * armWave * perRing * 1.35;
          float spiralAng = radialTwist + armTwist
            + time * max(0.0, speed) * tSoft * (0.25 + abs(armWave) * 0.2);

          float ang = mix(concentricAng, spiralAng, isDouble) * a;

          float cos_a = cos(-ang);
          float sin_a = sin(-ang);
          vec2 rot = vec2(uv.x * cos_a - uv.y * sin_a, uv.x * sin_a + uv.y * cos_a);
          rot.x /= aspect;
          return rot + origin;
        `,
      });

      setFunction({
        name: "randomGalleryDistort",
        type: "coord",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "cells", default: 7.0 },
          { type: "float", name: "speed", default: 0.72 },
          { type: "float", name: "refraction", default: 0.78 },
          { type: "float", name: "drift", default: 0.78 },
        ],
        glsl: RANDOM_GALLERY_DISTORT_GLSL,
      });

      setFunction({
        name: "gridShuffleDistort",
        type: "coord",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "cells", default: 4.0 },
          { type: "float", name: "chaos", default: 1.0 },
          { type: "float", name: "seed", default: 1.0 },
        ],
        glsl: GRID_SHUFFLE_DISTORT_GLSL,
      });

      setFunction({
        name: "rippleDistort",
        type: "coord",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "frequency", default: 8.0 },
          { type: "float", name: "speed", default: 1.0 },
          { type: "float", name: "decay", default: 0.5 },
          { type: "float", name: "centerX", default: 0.5 },
          { type: "float", name: "centerY", default: 0.5 },
        ],
        glsl: `
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _st;

          vec2 origin = vec2(clamp(centerX, 0.0, 1.0), clamp(centerY, 0.0, 1.0));
          vec2 uv = _st - origin;
          float aspect = resolution.x / max(1.0, resolution.y);
          uv.x *= aspect;

          float dist = length(uv);
          float falloff = mix(1.0, exp(-dist * mix(1.5, 8.0, clamp(decay, 0.0, 1.0))), clamp(decay, 0.0, 1.0));
          float phase = dist * max(2.0, frequency) * 6.2831853 - time * max(0.0, speed) * 6.2831853;
          float wave = sin(phase) * a * falloff * 0.085;
          vec2 dir = dist > 1e-4 ? uv / dist : vec2(0.0, 1.0);
          vec2 disp = dir * wave;
          disp.x /= aspect;
          return _st + disp;
        `,
      });

      setFunction({
        name: "edgeDiff",
        type: "combine",
        inputs: [
          { type: "float", name: "edgeSens", default: 0.32 },
          { type: "float", name: "edgeSoft", default: 0.25 },
          { type: "float", name: "edgeStr", default: 1.0 },
          { type: "float", name: "edgeFade", default: 0.004 },
        ],
        glsl: `
          vec3 w = vec3(0.299, 0.587, 0.114);
          float d = abs(dot(_c0.rgb, w) - dot(_c1.rgb, w));
          float sens = mix(0.001, 0.14, clamp(edgeSens, 0.0, 1.0));
          float soft = mix(0.002, 0.22, clamp(edgeSoft, 0.0, 1.0));
          float str = max(0.0, edgeStr);
          float e = clamp(smoothstep(sens, sens + soft, d) * str, 0.0, 1.0);

          // Shifted-sample wrap paints a false frame on the framebuffer border —
          // fade edge response within edgeFade UV of each side.
          vec2 uv = gl_FragCoord.xy / max(resolution.xy, vec2(1.0));
          float fade = max(1.5 / min(resolution.x, resolution.y), abs(edgeFade));
          float border = min(min(uv.x, uv.y), min(1.0 - uv.x, 1.0 - uv.y));
          e *= smoothstep(0.0, fade, border);

          return vec4(vec3(e), _c0.a);
        `,
      });

      setFunction({
        name: "centerStripMap",
        type: "coord",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "centerY", default: 0.5 },
          { type: "float", name: "bandWidth", default: 0.06 },
          { type: "float", name: "diffusion", default: 0.72 },
        ],
        glsl: `
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _st;
          float diff = clamp(diffusion, 0.0, 1.0);
          float cy = clamp(centerY, 0.05, 0.95);
          float bw = max(0.004, bandWidth);
          float halfBand = bw * 0.5;

          vec2 st = _st;
          float ady = abs(st.y - cy);
          if (ady <= halfBand) return st;

          float edge = smoothstep(halfBand, 0.5, ady);
          float pull = a * mix(1.0, edge, diff);
          st.y = mix(st.y, cy, pull);
          return st;
        `,
      });

      setFunction({
        name: "midlineStretch",
        type: "coord",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "splitY", default: 0.5 },
        ],
        glsl: `
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _st;
          float y0 = clamp(splitY, 0.05, 0.95);
          vec2 st = _st;
          // Pull samples above and below the split toward the midline (scanline stretch).
          st.y = mix(st.y, y0, a);
          return st;
        `,
      });

      setFunction({
        name: 'grainNoise',
        type: 'src',
        inputs: [
          { type: 'float', name: 'scale', default: 32 },
          { type: 'float', name: 'speed', default: 0.1 },
        ],
        glsl: `
          float sc = max(1.0, scale);
          vec2 fc = gl_FragCoord.xy;
          vec2 t = vec2(time * speed * 43.17, time * speed * 57.03);
          vec2 p0 = _st * sc * 2.0 + fc * (0.0021 + sc * 1.1e-5) + t;
          vec2 p1 = _st * sc * 2.0 * 1.6180339887 + fc.yx * (0.00175 + sc * 9.0e-6) - t * 0.82;
          vec2 p2 = _st * sc * 2.0 * 2.398082257 + fc * 0.00135 + t.yx * 0.44;
          
          vec3 p3_0 = fract(vec3(p0.xyx) * vec3(0.1031, 0.1030, 0.0973));
          p3_0 += dot(p3_0, p3_0.yxz + 33.33);
          float a = fract((p3_0.x + p3_0.y) * p3_0.z);
          
          vec3 p3_1 = fract(vec3(p1.xyx) * vec3(0.1031, 0.1030, 0.0973));
          p3_1 += dot(p3_1, p3_1.yxz + 33.33);
          float b = fract((p3_1.x + p3_1.y) * p3_1.z);
          
          vec3 p3_2 = fract(vec3(p2.xyx) * vec3(0.1031, 0.1030, 0.0973));
          p3_2 += dot(p3_2, p3_2.yxz + 33.33);
          float c = fract((p3_2.x + p3_2.y) * p3_2.z);
          
          float n = a * 0.38 + b * 0.36 + c * 0.26;
          return vec4(vec3(n), 1.0);
        `
      });

      setFunction({
        name: 'gaussianNoiseGrid',
        type: 'src',
        inputs: [
          { type: 'float', name: 'grid', default: 256.0 },
          { type: 'float', name: 'speed', default: 0.1 },
        ],
        glsl: `
          float gsz = max(8.0, grid);
          float aspect = resolution.x / max(1.0, resolution.y);
          vec2 coord = vec2(_st.x * gsz * aspect, _st.y * gsz);
          vec2 cell = floor(coord);
          float t = time * speed;
          
          vec2 p_1 = cell + vec2(3.1, 41.9) + vec2(t * 0.13, t * 0.07);
          vec3 p3_1 = fract(vec3(p_1.xyx) * vec3(0.1031, 0.1030, 0.0973));
          p3_1 += dot(p3_1, p3_1.yxz + 33.33);
          float u1 = max(1.0e-6, fract((p3_1.x + p3_1.y) * p3_1.z));
          
          vec2 p_2 = cell + vec2(17.2, 2.8) + vec2(t * 0.09, t * 0.11);
          vec3 p3_2 = fract(vec3(p_2.xyx) * vec3(0.1031, 0.1030, 0.0973));
          p3_2 += dot(p3_2, p3_2.yxz + 33.33);
          float u2 = fract((p3_2.x + p3_2.y) * p3_2.z);
          
          float r = sqrt(-2.0 * log(u1));
          float gaus = r * cos(6.28318530718 * u2);
          
          float e = exp(gaus);
          float e_inv = exp(-gaus);
          float n = (e - e_inv) / (e + e_inv) * 0.5 + 0.5;
          n = clamp(n * 1.42 - 0.21, 0.0, 1.0);
          return vec4(vec3(n), 1.0);
        `
      });

      setFunction({
        name: "shatterLayerCoord",
        type: "coord",
        inputs: [
          { type: "float", name: "amount", default: 0 },
          { type: "float", name: "density", default: 14 },
          { type: "float", name: "scatter", default: 0.62 },
          { type: "float", name: "irregularity", default: 0.82 },
        ],
        glsl: SHATTER_LAYER_COORD_GLSL,
      });

      setFunction({
        name: "shatterLayerGap",
        type: "combine",
        inputs: [
          { type: "float", name: "amount", default: 0 },
          { type: "float", name: "density", default: 14 },
          { type: "float", name: "gap", default: 0.065 },
          { type: "float", name: "irregularity", default: 0.82 },
        ],
        glsl: SHATTER_LAYER_GAP_GLSL,
      });

      setFunction({
        name: "videoMapMask",
        type: "combine",
        inputs: [
          { type: "float", name: "amount", default: 0 },
          { type: "float", name: "invert", default: 0 },
          { type: "float", name: "threshold", default: 0.35 },
          { type: "float", name: "softness", default: 0.12 },
        ],
        glsl: VIDEO_MAP_MASK_GLSL,
      });

      setFunction({
        name: "layerOverlay",
        type: "combine",
        inputs: [{ type: "float", name: "amount", default: 0 }],
        glsl: LAYER_OVERLAY_GLSL,
      });

      setFunction({
        name: "layerMaskCut",
        type: "combine",
        inputs: [
          { type: "float", name: "amount", default: 0 },
          { type: "float", name: "invert", default: 0 },
          { type: "float", name: "threshold", default: 0.35 },
          { type: "float", name: "softness", default: 0.12 },
        ],
        glsl: LAYER_MASK_CUT_GLSL,
      });

      setFunction({
        name: "layerMaskAlpha",
        type: "combine",
        inputs: [
          { type: "float", name: "amount", default: 0 },
          { type: "float", name: "invert", default: 0 },
          { type: "float", name: "threshold", default: 0.35 },
          { type: "float", name: "softness", default: 0.12 },
        ],
        glsl: LAYER_MASK_ALPHA_GLSL,
      });

      setFunction({
        name: "maskVideoRectCutout",
        type: "combine",
        inputs: [
          { type: "float", name: "centerX", default: 0.5 },
          { type: "float", name: "centerY", default: 0.5 },
          { type: "float", name: "halfWx", default: 0.1 },
          { type: "float", name: "halfHy", default: 0.08 },
        ],
        glsl: `
          vec2 uv = vec2(
            gl_FragCoord.x / resolution.x,
            1.0 - gl_FragCoord.y / resolution.y
          );
          vec2 center = vec2(clamp(centerX, 0.0, 1.0), clamp(centerY, 0.0, 1.0));
          float hx = max(0.001, halfWx);
          float hy = max(0.001, halfHy);
          vec2 d = abs(uv - center);
          float inRect = step(d.x, hx) * step(d.y, hy);
          if (inRect > 0.5) return vec4(_c1.rgb, _c0.a);
          return _c0;
        `,
      });

      setFunction({
        name: 'encodingGlitch',
        type: 'color',
        inputs: [
          { type: 'float', name: 'amount', default: 0.0 },
          { type: 'float', name: 'macroBlock', default: 0.5 },
          { type: 'float', name: 'tear', default: 0.35 },
        ],
        glsl: `
          if (amount < 0.00001) return _c0;
          vec2 uv = gl_FragCoord.xy / resolution.xy;
          float a = clamp(amount, 0.0, 1.0);
          float mb = clamp(macroBlock, 0.0, 1.0);
          float tearAmt = clamp(tear, 0.0, 1.0);
          float blocks = mix(140.0, 8.0, mb);
          vec2 blockId = floor(uv * blocks);
          vec2 q = blockId / blocks;
          float blockSeed = fract(sin(dot(blockId, vec2(12.9898, 78.233))) * 43758.5453);
          float levels = max(4.0, mix(44.0, 10.0, a));
          levels *= mix(1.0, 0.5 + blockSeed * 0.5, mb * 0.9);
          vec4 c = _c0;
          c.rgb = floor(c.rgb * levels + 0.5) / levels;
          float row = blockId.y;
          float n = fract(sin(row * 19.9898 + floor(time * 6.0) * 0.13) * 43758.5453);
          float thr = mix(1.05, 0.86, tearAmt);
          if (tearAmt > 0.00001 && n > thr) {
            float m = fract(sin(dot(q, vec2(127.1, 311.7)) + time) * 43758.5453);
            c.rgb = mix(c.rgb, c.bgr, 0.32 * tearAmt);
            c.rgb += (m - 0.5) * 0.2 * a * tearAmt;
          }
          return mix(_c0, c, a);
        `
      });

      setFunction({
        name: "fillLayerSrc",
        type: "src",
        inputs: [
          { type: "float", name: "ar", default: 0.49 },
          { type: "float", name: "ag", default: 0.23 },
          { type: "float", name: "ab", default: 0.93 },
          { type: "float", name: "br", default: 0.02 },
          { type: "float", name: "bg", default: 0.71 },
          { type: "float", name: "bb", default: 0.83 },
          { type: "float", name: "gradType", default: 1 },
          { type: "float", name: "softness", default: 0.35 },
          { type: "float", name: "sweep", default: 0 },
        ],
        glsl: FILL_LAYER_SRC_GLSL,
      });

      setFunction({
        name: "mirrorStripesSrc",
        type: "src",
        inputs: [
          { type: "float", name: "cr", default: 1.0 },
          { type: "float", name: "cg", default: 0.1 },
          { type: "float", name: "cb", default: 0.1 },
          { type: "float", name: "scale", default: 0.82 },
          { type: "float", name: "spread", default: 0.48 },
          { type: "float", name: "density", default: 0.55 },
          { type: "float", name: "thickness", default: 0.55 },
          { type: "float", name: "layers", default: 4.0 },
          { type: "float", name: "rotate", default: 0.0 },
          { type: "float", name: "randomness", default: 0.0 },
          { type: "float", name: "mirror", default: 1.0 },
        ],
        glsl: MIRROR_STRIPES_SRC_GLSL,
      });

      setFunction({
        name: "plasmaSrc",
        type: "src",
        inputs: [
          { type: "float", name: "speed", default: 1.0 },
          { type: "float", name: "scale", default: 1.0 },
          { type: "float", name: "complexity", default: 1.0 },
        ],
        glsl: PLASMA_SRC_GLSL,
      });

      const patternFamilyInputs = [
        { type: "float", name: "variant", default: 2 },
        { type: "float", name: "scale", default: 1.0 },
        { type: "float", name: "speed", default: 0.4 },
        { type: "float", name: "warp", default: 0 },
        { type: "float", name: "ar", default: 0.04 },
        { type: "float", name: "ag", default: 0.06 },
        { type: "float", name: "ab", default: 0.13 },
        { type: "float", name: "br", default: 0.13 },
        { type: "float", name: "bg", default: 0.83 },
        { type: "float", name: "bb", default: 0.93 },
      ] as const;

      setFunction({
        name: "patternNoiseSrc",
        type: "src",
        inputs: [...patternFamilyInputs],
        glsl: PATTERN_NOISE_SRC_GLSL,
      });

      setFunction({
        name: "patternCellsSrc",
        type: "src",
        inputs: [...patternFamilyInputs],
        glsl: PATTERN_CELLS_SRC_GLSL,
      });

      setFunction({
        name: "patternTilesSrc",
        type: "src",
        inputs: [...patternFamilyInputs],
        glsl: PATTERN_TILES_SRC_GLSL,
      });

      setFunction({
        name: "patternPolarSrc",
        type: "src",
        inputs: [...patternFamilyInputs],
        glsl: PATTERN_POLAR_SRC_GLSL,
      });

      setFunction({
        name: "patternGeometrySrc",
        type: "src",
        inputs: [
          { type: "float", name: "geometry", default: 0 },
          ...patternFamilyInputs.slice(1),
        ],
        glsl: PATTERN_GEOMETRY_SRC_GLSL,
      });

      setFunction({
        name: "patternTuringDisplay",
        type: "src",
        inputs: [...PATTERN_TURING_DISPLAY_INPUTS],
        glsl: PATTERN_TURING_DISPLAY_GLSL,
      });

      setFunction({
        name: "patternRdSim",
        type: "src",
        inputs: [
          { type: "sampler2D", name: "stateTex", default: 0 },
          { type: "float", name: "feed", default: 0.052 },
          { type: "float", name: "kill", default: 0.0634 },
          { type: "float", name: "cells", default: 140 },
          { type: "float", name: "styleMap", default: 0.0 },
          { type: "float", name: "speed", default: 1.0 },
          { type: "float", name: "seedSize", default: 0.18 },
          { type: "float", name: "forceSeed", default: 0.0 },
        ],
        glsl: PATTERN_RD_SIM_GLSL,
      });

      setFunction({
        name: "electricNoiseSrc",
        type: "src",
        inputs: [
          { type: "sampler2D", name: "noiseTex", default: 0 },
          { type: "float", name: "speed", default: 1.0 },
          { type: "float", name: "scale", default: 1.0 },
          { type: "float", name: "noiseScale", default: 1.0 },
          { type: "float", name: "turbulence", default: 0.2 },
          { type: "float", name: "detail", default: 5.0 },
          { type: "float", name: "intensity", default: 1.4 },
          { type: "float", name: "rings", default: 0.85 },
          { type: "float", name: "ringPower", default: 0.9 },
          { type: "float", name: "triggerRings", default: 1.0 },
          { type: "sampler2D", name: "triggerTex", default: 0 },
          { type: "float", name: "triggerRingCount", default: 0.0 },
          { type: "float", name: "colorR", default: 0.2 },
          { type: "float", name: "colorG", default: 0.1 },
          { type: "float", name: "colorB", default: 0.4 },
        ],
        glsl: ELECTRIC_NOISE_SRC_GLSL,
      });

      setFunction({
        name: "plexusSrc",
        type: "src",
        inputs: [
          { type: "float", name: "speed", default: 1.0 },
          { type: "float", name: "pointDensity", default: 1.5 },
          { type: "float", name: "lineIntensity", default: 1.0 },
          { type: "float", name: "layers", default: 4.0 },
          { type: "float", name: "glow", default: 1.2 },
          { type: "float", name: "audioBoost", default: 0.0 },
        ],
        glsl: PLEXUS_SRC_GLSL,
      });

      setFunction({
        name: "superformulaSrc",
        type: "src",
        inputs: [
          { type: "float", name: "look", default: 2 },
          { type: "float", name: "m", default: 7.6 },
          { type: "float", name: "n1", default: 0.36 },
          { type: "float", name: "n2", default: 2.16 },
          { type: "float", name: "size", default: 0.48 },
          { type: "float", name: "speed", default: 0.35 },
          { type: "float", name: "glow", default: 1.2 },
          { type: "float", name: "cr", default: 0.769 },
          { type: "float", name: "cg", default: 0.71 },
          { type: "float", name: "cb", default: 0.992 },
        ],
        glsl: SUPERFORMULA_SRC_GLSL,
      });

      setFunction({
        name: "topoContourSrc",
        type: "src",
        inputs: [
          { type: "sampler2D", name: "videoTex", default: 0 },
          { type: "float", name: "scale", default: 1.0 },
          { type: "float", name: "lines", default: 10.0 },
          { type: "float", name: "speed", default: 1.0 },
          { type: "float", name: "valley", default: 0.12 },
          { type: "float", name: "lineWidth", default: 1.0 },
          { type: "float", name: "videoTint", default: 0.35 },
          { type: "float", name: "palette", default: 0.0 },
        ],
        glsl: TOPO_CONTOUR_SRC_GLSL,
      });

      setFunction({
        name: "universeWithinSrc",
        type: "src",
        inputs: [
          { type: "float", name: "speed", default: 1.0 },
          { type: "float", name: "zoomFactor", default: 1.5 },
          { type: "float", name: "layers", default: 4.0 },
          { type: "float", name: "glow", default: 1.2 },
          { type: "float", name: "audioBoost", default: 0.0 },
        ],
        glsl: UNIVERSE_WITHIN_SRC_GLSL,
      });

      setFunction({
        name: "fractalFoldSrc",
        type: "src",
        inputs: [
          { type: "float", name: "foldX", default: 0.86 },
          { type: "float", name: "foldY", default: 1.04 },
          { type: "float", name: "zoomFactor", default: 1.0 },
          { type: "float", name: "speed", default: 0.6 },
          { type: "float", name: "spin", default: 0.42 },
          { type: "float", name: "iterDepth", default: 8.0 },
          { type: "float", name: "glow", default: 1.4 },
          { type: "float", name: "hueShift", default: 0.12 },
          { type: "float", name: "audioBoost", default: 0.0 },
        ],
        glsl: FRACTAL_FOLD_SRC_GLSL,
      });

      setFunction({
        name: "rampGradient",
        type: "color",
        inputs: [
          { type: "float", name: "amount", default: 0 },
          { type: "float", name: "stopCount", default: 3 },
          { type: "float", name: "r0", default: 0 },
          { type: "float", name: "g0", default: 0 },
          { type: "float", name: "b0", default: 0 },
          { type: "float", name: "p0", default: 0 },
          { type: "float", name: "r1", default: 0.5 },
          { type: "float", name: "g1", default: 0.5 },
          { type: "float", name: "b1", default: 0.5 },
          { type: "float", name: "p1", default: 0.5 },
          { type: "float", name: "r2", default: 1 },
          { type: "float", name: "g2", default: 1 },
          { type: "float", name: "b2", default: 1 },
          { type: "float", name: "p2", default: 1 },
          { type: "float", name: "r3", default: 0.55 },
          { type: "float", name: "g3", default: 0.55 },
          { type: "float", name: "b3", default: 0.55 },
          { type: "float", name: "p3", default: 0.7 },
          { type: "float", name: "r4", default: 0.55 },
          { type: "float", name: "g4", default: 0.55 },
          { type: "float", name: "b4", default: 0.55 },
          { type: "float", name: "p4", default: 0.82 },
          { type: "float", name: "r5", default: 0.55 },
          { type: "float", name: "g5", default: 0.55 },
          { type: "float", name: "b5", default: 0.55 },
          { type: "float", name: "p5", default: 0.94 },
          { type: "float", name: "animate", default: 0 },
          { type: "float", name: "speed", default: 0.45 },
        ],
        glsl: RAMP_GRADIENT_GLSL,
      });

      setFunction({
        name: "answerPrint",
        type: "color",
        inputs: [
          { type: "float", name: "amount", default: 0 },
          { type: "float", name: "stock", default: 0 },
          { type: "float", name: "density", default: 1 },
        ],
        glsl: ANSWER_PRINT_GLSL,
      });

      setFunction({
        name: "hdrGrade",
        type: "color",
        inputs: [
          { type: "float", name: "amount", default: 0 },
          { type: "float", name: "blackFloor", default: 0.08 },
          { type: "float", name: "highlights", default: 0.85 },
          { type: "float", name: "knee", default: 0.5 },
        ],
        glsl: `
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _c0;
          float l = dot(_c0.rgb, vec3(0.2126, 0.7152, 0.0722));
          float floorPt = clamp(blackFloor, 0.0, 0.35);
          float soft = clamp(knee, 0.0, 1.0);
          float band = mix(0.02, 0.18, soft);
          float shadowMask = smoothstep(floorPt, floorPt + band, l);
          float ln = l * shadowMask * shadowMask;
          float hiW = pow(smoothstep(0.45, 1.0, ln), mix(2.8, 1.35, soft));
          ln += clamp(highlights, 0.0, 2.0) * 0.6 * hiW * (1.0 - ln);
          float ratio = ln / max(l, 1e-4);
          vec3 graded = clamp(_c0.rgb * ratio, 0.0, 1.0);
          return vec4(mix(_c0.rgb, graded, a), _c0.a);
        `,
      });

      setFunction({
        name: "lumaPrint",
        type: "color",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "mode", default: 2.0 },
          { type: "float", name: "density", default: 24.0 },
          { type: "float", name: "contrast", default: 0.48 },
          { type: "float", name: "wave", default: 0.35 },
          { type: "float", name: "iconSet", default: 0.0 },
          { type: "float", name: "shape", default: 0.0 },
          { type: "float", name: "rotation", default: 0.0 },
        ],
        glsl: LUMA_PRINT_GLSL,
      });

      setFunction({
        name: "lumaGridSquares",
        type: "color",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "cols", default: 32.0 },
          { type: "float", name: "rows", default: 16.0 },
          { type: "float", name: "minSize", default: 0.14 },
          { type: "float", name: "maxSize", default: 0.88 },
        ],
        glsl: `
          if (amount < 0.00001) return _c0;
          float c = max(2.0, cols);
          float r = max(2.0, rows);
          vec2 grid = vec2(c, r);
          vec2 uv = gl_FragCoord.xy / resolution.xy;
          vec2 cell = fract(uv * grid) - 0.5;
          float l = dot(_c0.rgb, vec3(0.299, 0.587, 0.114));
          float strength = clamp(amount, 0.0, 1.0);
          float lo = clamp(minSize, 0.0, 1.0);
          float hi = clamp(maxSize, 0.0, 1.0);
          float loBound = min(lo, hi);
          float hiBound = max(lo, hi);
          float targetSide = mix(loBound, hiBound, clamp(l, 0.0, 1.0));
          targetSide = min(targetSide, 0.96);
          float side = mix(1.0, targetSide, strength);
          float ink = clamp(l, 0.0, 1.0);
          float dotLift = smoothstep(0.004, 0.055, ink);
          float radius = side * 0.5 * dotLift;
          float dotMask = 1.0 - step(radius, length(cell));
          return vec4(mix(_c0.rgb, vec3(dotMask), strength), 1.0);
        `,
      });

      setFunction({
        name: "pointCloudRemap",
        type: "color",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "cols", default: 32.0 },
          { type: "float", name: "rows", default: 20.0 },
          { type: "float", name: "minSize", default: 0.12 },
          { type: "float", name: "maxSize", default: 0.85 },
          { type: "float", name: "depth", default: 0.58 },
          { type: "float", name: "parallax", default: 0.78 },
          { type: "float", name: "blur", default: 0.5 },
          { type: "float", name: "fog", default: 0.4 },
        ],
        glsl: POINT_CLOUD_REMAP_GLSL,
      });

      setFunction({
        name: 'concentricMask',
        type: 'src',
        inputs: [
          { type: 'float', name: 'freq', default: 10 },
          { type: 'float', name: 'speed', default: 0.1 },
          { type: 'float', name: 'rotation', default: 0 },
          { type: 'float', name: 'balance', default: 0.5 },
        ],
        glsl: `
          vec2 st = _st - 0.5;
          // Correct for aspect ratio to keep shapes regular
          st.x *= resolution.x / resolution.y;

          float cos_a = cos(rotation);
          float sin_a = sin(rotation);
          st = vec2(st.x * cos_a - st.y * sin_a, st.x * sin_a + st.y * cos_a);
          
          float d = length(st);
          // Use freq/10 to keep it manageable compared to osc freq
          float val = sin(d * freq * 0.62831 - time * speed * 10.0);
          float threshold = 1.0 - balance * 2.0;
          return vec4(vec3(step(threshold, val)), 1.0);
        `
      });

      setFunction({
        name: 'lumaLines',
        type: 'color',
        inputs: [
          { type: 'float', name: 'amount', default: 0.0 },
          { type: 'float', name: 'cols', default: 52.0 },
          { type: 'float', name: 'minWidth', default: 0.1 },
          { type: 'float', name: 'maxWidth', default: 0.8 },
          { type: 'float', name: 'rotation', default: 0.0 },
        ],
        glsl: `
          if (amount < 0.00001) return _c0;
          float c = max(2.0, cols);
          float strength = clamp(amount, 0.0, 1.0);
          vec2 uv = gl_FragCoord.xy / resolution.xy;
          vec2 st = uv - 0.5;
          st.x *= resolution.x / max(1.0, resolution.y);
          float cos_a = cos(rotation);
          float sin_a = sin(rotation);
          vec2 rst = vec2(st.x * cos_a - st.y * sin_a, st.x * sin_a + st.y * cos_a);
          
          float cellCoord = fract(rst.x * c) - 0.5;
          float l = dot(_c0.rgb, vec3(0.299, 0.587, 0.114));
          float ink = clamp(l, 0.0, 1.0);
          float lineLift = smoothstep(0.01, 0.06, ink);
          
          float lo = clamp(minWidth, 0.0, 1.0);
          float hi = clamp(maxWidth, 0.0, 1.0);
          float loBound = min(lo, hi);
          float hiBound = max(lo, hi);
          float targetWidth = mix(loBound, hiBound, ink);
          
          float radius = targetWidth * 0.5 * lineLift;
          float lineMask = 1.0 - step(radius, abs(cellCoord));
          
          return vec4(mix(_c0.rgb, vec3(lineMask), strength), 1.0);
        `
      });

      setFunction({
        name: 'concentricSquareMask',
        type: 'src',
        inputs: [
          { type: 'float', name: 'freq', default: 10 },
          { type: 'float', name: 'speed', default: 0.1 },
          { type: 'float', name: 'rotation', default: 0 },
          { type: 'float', name: 'balance', default: 0.5 },
        ],
        glsl: `
          vec2 st = _st - 0.5;
          // Correct for aspect ratio to keep shapes regular
          st.x *= resolution.x / resolution.y;

          float cos_a = cos(rotation);
          float sin_a = sin(rotation);
          st = vec2(st.x * cos_a - st.y * sin_a, st.x * sin_a + st.y * cos_a);
          
          // Square distance (Chebyshev)
          float d = max(abs(st.x), abs(st.y));
          
          float val = sin(d * freq * 0.62831 - time * speed * 10.0);
          float threshold = 1.0 - balance * 2.0;
          return vec4(vec3(step(threshold, val)), 1.0);
        `
      });

      setFunction({
        name: 'perspectiveSlatMask',
        type: 'src',
        inputs: [
          { type: 'float', name: 'freq', default: 20 },
          { type: 'float', name: 'speed', default: 0.2 },
          { type: 'float', name: 'rotation', default: 0 },
          { type: 'float', name: 'balance', default: 0.5 },
          { type: 'float', name: 'perspective', default: 0.75 },
          { type: 'float', name: 'focus', default: 1.0 },
        ],
        glsl: `
          float aspect = resolution.x / resolution.y;
          vec2 st = _st - 0.5;
          st.x *= aspect;

          float cos_a = cos(rotation);
          float sin_a = sin(rotation);
          st = vec2(st.x * cos_a - st.y * sin_a, st.x * sin_a + st.y * cos_a);

          vec2 uv = vec2(st.x / aspect + 0.5, st.y + 0.5);
          float cols = max(3.0, freq);
          float colU = fract(uv.x * cols) - 0.5;

          float persp = clamp(perspective, 0.0, 1.0);
          float focusX = clamp(focus, 0.0, 1.0);
          float dist = uv.x - focusX;
          float twist = dist * persp * 2.2;
          twist += sin(time * speed * 10.0 + colU * 6.28318) * 0.1 * persp;

          float cy = uv.y - 0.5;
          float cos_t = cos(twist);
          float sin_t = sin(twist);
          float rx = colU * cos_t - cy * sin_t;

          float halfW = mix(0.015, 0.42, clamp(balance, 0.0, 1.0));
          halfW *= 1.0 - 0.3 * abs(sin(twist)) * persp;

          float mask = 1.0 - step(halfW, abs(rx));
          return vec4(vec3(mask), 1.0);
        `
      });

      setFunction({
        name: "dataDrip",
        type: "coord",
        inputs: [
          { type: "float", name: "amount", default: 0 },
          { type: "float", name: "columns", default: 72 },
          { type: "float", name: "chaos", default: 0.35 },
          { type: "float", name: "dance", default: 0.65 },
          { type: "float", name: "speed", default: 1.0 },
        ],
        glsl: `
          float a = clamp(amount, 0.0, 1.0);
          if (a < 0.00001) return _st;
          float cols = max(8.0, columns);
          float ch = clamp(chaos, 0.0, 1.0);
          float dn = clamp(dance, 0.0, 1.0);
          float sp = max(0.0, speed);
          vec2 st = _st;
          float colIdx = floor(st.x * cols);
          float u = (colIdx + 0.5) / cols;
          float h1 = fract(sin(u * 127.1 + colIdx * 3.7) * 43758.5453);
          float h2 = fract(sin(u * 311.7 + colIdx * 19.2) * 9988.231);
          float phase = colIdx * 0.41 + h2 * 6.2831853;

          float sway =
            sin(time * sp + phase) * 0.55 +
            sin(time * sp * 1.73 + phase * 1.6 + st.y * 4.2) * 0.3 +
            sin(time * sp * 0.45 + u * 9.5) * 0.15;
          float softPhase = 0.5 + 0.5 * sin(time * sp * 0.55 + phase * 0.85);
          float softPull = softPhase * softPhase * (0.03 + dn * 0.05);
          float danceY = (sway * dn * 0.16 - softPull * dn) * a;

          float h1Live = fract(sin(u * 127.1 + time * sp * 0.38) * 43758.5453);
          float dripRate = (0.18 + h1 * 0.62) * max(0.15, sp);
          float dripPhase = fract(time * dripRate + h2);
          float dripPull = dripPhase * dripPhase * (0.05 + ch * 0.12);
          float wv = sin(st.y * 6.2831853 * (4.0 + h2 * 14.0) + time * sp * (1.05 + h1 * 2.2));
          float stripJitter = (h1Live - 0.5) * (0.16 + ch * 0.26);
          float micro = wv * (0.018 + ch * 0.05);
          float chaosY = (stripJitter + micro - dripPull) * a * ch;

          st.y = clamp(st.y + danceY + chaosY, 0.001, 0.999);
          return st;
        `,
      });

      setFunction({
        name: "liquix",
        type: "coord",
        inputs: [
          { type: "float", name: "amount", default: 0 },
          { type: "float", name: "pivot", default: 0.48 },
          { type: "float", name: "bands", default: 56 },
          { type: "float", name: "speed", default: 1.15 },
        ],
        glsl: LIQUIX_COORD_GLSL,
      });

      setFunction({
        name: "metalSphereScene",
        type: "color",
        inputs: [
          { type: "sampler2D", name: "tex", default: 0 },
          { type: "float", name: "amount", default: 0 },
          { type: "float", name: "sphereSize", default: 1 },
          { type: "float", name: "noiseAmt", default: 0.42 },
          { type: "float", name: "detail", default: 3.5 },
          { type: "float", name: "speed", default: 0.75 },
          { type: "float", name: "roughness", default: 0.1 },
          { type: "float", name: "reflectAmt", default: 1.05 },
          { type: "float", name: "rotation", default: 0.35 },
          { type: "float", name: "envAspect", default: 1.777 },
        ],
        glsl: METAL_SPHERE_SCENE_GLSL,
      });

      setFunction({
        name: "warpTunnelColor",
        type: "color",
        inputs: [
          { type: "sampler2D", name: "videoTex", default: 0 },
          { type: "float", name: "amount", default: 0 },
          { type: "float", name: "tunnelSpeed", default: 0.55 },
          { type: "float", name: "tunnelRefract", default: 0.72 },
          { type: "float", name: "tunnelShine", default: 0.68 },
          { type: "float", name: "tunnelArms", default: 3.0 },
          { type: "float", name: "tunnelFog", default: 0.62 },
          { type: "float", name: "audioBoost", default: 0.0 },
          { type: "float", name: "tunnelQuality", default: 0.0 },
        ],
        glsl: WARP_TUNNEL_COLOR_GLSL,
      });

      setFunction({
        name: "pulseMarchColor",
        type: "color",
        inputs: [
          { type: "float", name: "amount", default: 0 },
          { type: "float", name: "morph", default: 0.55 },
          { type: "float", name: "marchSpeed", default: 1.1 },
          { type: "float", name: "detail", default: 4.5 },
          { type: "float", name: "glow", default: 0.65 },
        ],
        glsl: PULSE_MARCH_COLOR_GLSL,
      });

      setFunction({
        name: "throughTheStarsOverlay",
        type: "combine",
        inputs: [
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "glow", default: 0.74 },
        ],
        glsl: THROUGH_THE_STARS_OVERLAY_GLSL,
      });

      setFunction({
        name: "feedbackGrade",
        type: "color",
        inputs: [
          { type: "float", name: "balance", default: 0.5 },
          { type: "float", name: "luminosity", default: 0.0 },
        ],
        glsl: FEEDBACK_GRADE_GLSL,
      });

      setFunction({
        name: "ghostFlow",
        type: "color",
        inputs: [
          { type: "sampler2D", name: "prevTex", default: NaN },
          { type: "float", name: "amount", default: 0.0 },
          { type: "float", name: "melt", default: 0.62 },
          { type: "float", name: "flowScale", default: 0.48 },
          { type: "float", name: "refresh", default: 0.0 },
          { type: "float", name: "chromaBleed", default: 0.35 },
        ],
        glsl: GHOST_FLOW_GLSL,
      });

      setFunction({
        name: "paletteRecolor",
        type: "color",
        inputs: [
          { type: "float", name: "amount", default: 0 },
          { type: "float", name: "mode", default: 0 },
          { type: "float", name: "count", default: 3 },
          { type: "float", name: "p0r", default: 0 },
          { type: "float", name: "p0g", default: 0 },
          { type: "float", name: "p0b", default: 0 },
          { type: "float", name: "p1r", default: 0.5 },
          { type: "float", name: "p1g", default: 0.5 },
          { type: "float", name: "p1b", default: 0.5 },
          { type: "float", name: "p2r", default: 1 },
          { type: "float", name: "p2g", default: 1 },
          { type: "float", name: "p2b", default: 1 },
          { type: "float", name: "p3r", default: 1 },
          { type: "float", name: "p3g", default: 1 },
          { type: "float", name: "p3b", default: 1 },
        ],
        glsl: PALETTE_RECOLOR_GLSL,
      });

      setFunction({
        name: "shapeLayerSrc",
        type: "src",
        inputs: [
          { type: "float", name: "shape", default: 0 },
          { type: "float", name: "size", default: 0.45 },
          { type: "float", name: "roundness", default: 0 },
          { type: "float", name: "stroke", default: 0.15 },
          { type: "float", name: "rotate", default: 0 },
          { type: "float", name: "centerX", default: 0.5 },
          { type: "float", name: "centerY", default: 0.5 },
          { type: "float", name: "cr", default: 1.0 },
          { type: "float", name: "cg", default: 1.0 },
          { type: "float", name: "cb", default: 1.0 },
          { type: "float", name: "opacity", default: 1.0 },
          { type: "float", name: "shapeFill", default: 0 },
        ],
        glsl: SHAPE_LAYER_SRC_GLSL,
      });

      setFunction({
        name: "stringLayer",
        type: "color",
        inputs: [
          { type: "float", name: "amount", default: 1.0 },
          { type: "float", name: "tension", default: 0.42 },
          { type: "float", name: "position", default: 0.5 },
          { type: "float", name: "orientation", default: 0.0 },
          { type: "float", name: "thickness", default: 0.42 },
          { type: "float", name: "glow", default: 0.68 },
          { type: "float", name: "harmonics", default: 2.0 },
          { type: "float", name: "cr", default: 0.965 },
          { type: "float", name: "cg", default: 0.929 },
          { type: "float", name: "cb", default: 0.831 },
        ],
        glsl: STRING_LAYER_COLOR_GLSL,
      });

      setFunction({
        name: "resynthWarp",
        type: "coord",
        inputs: [
          { type: "float", name: "x", default: 0.5 },
          { type: "float", name: "y", default: 0.78 },
        ],
        glsl: RESYNTH_WARP_GLSL,
      });

      setFunction({
        name: "resynthTint",
        type: "color",
        inputs: [
          { type: "float", name: "x", default: 0.5 },
          { type: "float", name: "y", default: 0.78 },
          { type: "float", name: "hue", default: 0.25 },
          { type: "float", name: "decay", default: 0.3 },
        ],
        glsl: RESYNTH_TINT_GLSL,
      });

      setFunction({
        name: "timeGlitchSlices",
        type: "color",
        inputs: [
          { type: "sampler2D", name: "sliceTex", default: 0 },
          { type: "float", name: "amount", default: 0 },
        ],
        glsl: TIME_GLITCH_SLICES_GLSL,
      });

      setFunction({
        name: "hitStreakExtract",
        type: "color",
        inputs: [
          { type: "float", name: "threshold", default: 0.6 },
          { type: "float", name: "thinness", default: 0.55 },
        ],
        glsl: HIT_STREAK_EXTRACT_GLSL,
      });

      setFunction({
        name: "lens7cPrism",
        type: "color",
        inputs: [
          { type: "sampler2D", name: "prismTex", default: 0 },
          { type: "float", name: "amount", default: 0 },
          { type: "float", name: "throwLen", default: 0.12 },
          { type: "float", name: "rotation", default: 0 },
          { type: "float", name: "threshold", default: 0.45 },
          { type: "float", name: "haze", default: 0.5 },
        ],
        glsl: LENS_7C_PRISM_GLSL,
      });
}
