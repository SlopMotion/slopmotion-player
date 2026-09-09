export const RGB_DELAY_AMOUNT_EPS = 0.00001;
export const RGB_DELAY_SCROLL_SCALE = 0.028;
export const RGB_DELAY_BLEND_SCALE = 0.85;

export function rgbDelayScrollOffset(amount: number, channelSign: -1 | 0 | 1): number {
  if (amount < RGB_DELAY_AMOUNT_EPS) return 0;
  return channelSign * amount * RGB_DELAY_SCROLL_SCALE;
}

export function rgbDelayBlendAmount(amount: number): number {
  if (amount < RGB_DELAY_AMOUNT_EPS) return 0;
  return amount * RGB_DELAY_BLEND_SCALE;
}
