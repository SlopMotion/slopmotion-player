/**
 * 7C prism lens — seven glass facets cut around a rotating filter ring. Every
 * highlight in the frame is refracted once per facet, so a single bright point
 * fans out into a seven-armed spectral starburst that keeps a white core and
 * saturates as each arm travels away from its source.
 *
 * The shader (`src/shaders/lens7cGlsl.ts`) derives its ring from the constants
 * below, so the facet layout here is the single source of truth for both the
 * GLSL and the sidebar artwork.
 */

/** Facets cut into the filter ring. */
export const LENS_7C_FACETS = 7;

/** Hue of the first facet, in turns; the rest walk the spectrum around the ring. */
export const LENS_7C_HUE_ORIGIN = 0.02;

/** Longest arm, as a fraction of frame height, at full throw. */
export const LENS_7C_MAX_THROW = 0.26;

/** Hand-cut glass: facets do not all refract equally far. */
export const LENS_7C_REACH_WOBBLE = 0.22;

/** Seeds the reach variation so the ring stays uneven but repeatable. */
export const LENS_7C_REACH_PHASE = 1.7;

/** Samples taken along each arm. More taps trade fill rate for a smoother streak. */
export const LENS_7C_TAPS = 6;

/**
 * How far along an arm the facet colour reaches full strength. A short root stays
 * white where the arm leaves its highlight, so the flare cores do not look dyed.
 */
export const LENS_7C_TINT_ONSET = 0.3;

const TAU = Math.PI * 2;

function clamped01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

function facetIndex(index: number): number {
  return ((index % LENS_7C_FACETS) + LENS_7C_FACETS) % LENS_7C_FACETS;
}

/** Seat of a facet around the ring, in turns, before the filter is rotated. */
export function lens7cFacetTurn(index: number): number {
  return facetIndex(index) / LENS_7C_FACETS;
}

export function lens7cFacetHue(index: number): number {
  return (LENS_7C_HUE_ORIGIN + lens7cFacetTurn(index)) % 1;
}

/** Throw of one facet relative to the longest arm, in `1 - wobble … 1`. */
export function lens7cFacetReach(index: number): number {
  const wobble = 1 - Math.cos(facetIndex(index) * LENS_7C_REACH_PHASE);
  return 1 - LENS_7C_REACH_WOBBLE * 0.5 * wobble;
}

/** Length of the longest arm in UV units, shortened as the effect dials down. */
export function lens7cThrow(spread: number, amount: number): number {
  return clamped01(spread) * LENS_7C_MAX_THROW * (0.4 + 0.6 * clamped01(amount));
}

/**
 * Facet colour as `#rrggbb`, matching the hue ramp the shader tints its arms
 * with, so the picker artwork stays in step with the render.
 */
export function lens7cFacetColor(index: number): string {
  const hue = lens7cFacetHue(index);
  const channel = (offset: number) => {
    const ramp = Math.min(1, Math.max(0, Math.abs(((hue * 6 + offset) % 6) - 3) - 1));
    const eased = ramp * ramp * (3 - 2 * ramp);
    return Math.round(eased * 255)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${channel(0)}${channel(4)}${channel(2)}`;
}

/** Where a facet sits on a 24×24 icon canvas, for the sidebar artwork. */
export function lens7cFacetSeat(index: number, radius: number): { x: number; y: number } {
  const angle = lens7cFacetTurn(index) * TAU - Math.PI / 2;
  return { x: 12 + Math.cos(angle) * radius, y: 12 + Math.sin(angle) * radius };
}
