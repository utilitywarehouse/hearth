export interface ComputeActiveIndexFromScrollOptions {
  itemWidth: number;
  offset: number;
  scrollX: number;
}

/**
 * Computes the nearest item index for a given horizontal scroll offset.
 * Mirrors the calculation previously duplicated in `Carousel`'s
 * `handleWebScroll` and `handleWebScrollEnd` web scroll handlers.
 */
export const computeActiveIndexFromScroll = ({
  itemWidth,
  offset,
  scrollX,
}: ComputeActiveIndexFromScrollOptions): number => Math.round((scrollX + offset) / itemWidth);

export interface IsIndexInRangeOptions {
  index: number;
  numItems: number;
}

/**
 * Determines whether `index` falls within the valid `[0, numItems)` range of
 * carousel items. Mirrors the bounds check previously duplicated across
 * `Carousel`'s web scroll handlers and its programmatic-scroll effect.
 */
export const isIndexInRange = ({ index, numItems }: IsIndexInRangeOptions): boolean =>
  index >= 0 && index < numItems;
