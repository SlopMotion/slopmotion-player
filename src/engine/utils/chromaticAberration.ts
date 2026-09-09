import {
  RGB_DELAY_AMOUNT_EPS,
  RGB_DELAY_SCROLL_SCALE,
} from "./rgbDelay";

export const CHROMATIC_ABERRATION_BLEND_SCALE = 0.88;

export type ChromaticAberrationScroll = {
  x: number;
  y: number;
};

export function chromaticAberrationScrollOffset(
  amount: number,
  directionRadians: number,
  channelSign: -1 | 0 | 1,
): ChromaticAberrationScroll {
  if (amount < RGB_DELAY_AMOUNT_EPS || channelSign === 0) {
    return { x: 0, y: 0 };
  }
  const scale = channelSign * amount * RGB_DELAY_SCROLL_SCALE;
  return {
    x: Math.cos(directionRadians) * scale,
    y: Math.sin(directionRadians) * scale,
  };
}

export function chromaticAberrationBlendAmount(amount: number): number {
  if (amount < RGB_DELAY_AMOUNT_EPS) return 0;
  return amount * CHROMATIC_ABERRATION_BLEND_SCALE;
}
