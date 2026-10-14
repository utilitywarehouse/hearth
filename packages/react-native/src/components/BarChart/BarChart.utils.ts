import { scaleLinear } from 'd3-scale';

export const DEFAULT_Y_TICKS = 6;

/**
 * The top of the y-axis: `yMax` when given, otherwise the largest value rounded up to a tidy
 * number that splits evenly across the ticks. Never zero, so the scale is always valid.
 */
export const getYMax = (values: number[], yTicks: number, yMax?: number): number => {
  if (yMax !== undefined && yMax > 0) {
    return yMax;
  }

  const largest = Math.max(0, ...values);
  if (largest === 0) {
    return 1;
  }

  const [, niceMax] = scaleLinear()
    .domain([0, largest])
    .nice(Math.max(1, yTicks - 1))
    .domain();
  return niceMax;
};

/**
 * `tickCount` evenly spaced values from 0 to `yMax` inclusive.
 */
export const getYTicks = (yMax: number, tickCount: number): number[] => {
  const count = Math.max(2, Math.round(tickCount));
  return Array.from({ length: count }, (_, index) => (yMax * index) / (count - 1));
};

/**
 * Width of the slot each bar sits in. Slots stretch to fill the viewport when there are few bars
 * and never shrink below the bar width plus `minGap`, which is what makes the chart scroll.
 */
export const getBandWidth = (
  count: number,
  viewportWidth: number,
  barWidth: number,
  minGap: number
): number => {
  const minBand = barWidth + minGap;
  if (count <= 0) {
    return minBand;
  }
  return Math.max(minBand, viewportWidth / count);
};

/**
 * Maps a value to a height in dp within the plot area. Values are clamped to the axis range.
 */
export const getBarHeight = (value: number, yMax: number, plotHeight: number): number => {
  'worklet';
  if (yMax <= 0) {
    return 0;
  }
  const ratio = Math.min(1, Math.max(0, value / yMax));
  return ratio * plotHeight;
};

/**
 * SVG path for a bar with rounded top corners and a square base. The path is left open so the
 * outline runs up one side, across the top and down the other, with no stroke along the base (a
 * fill still closes it). The sides and top are inset by half the stroke width so the outline stays
 * inside the bar's slot; the base sits on `baselineY`.
 */
export const getRoundedTopBarPath = (
  x: number,
  baselineY: number,
  width: number,
  height: number,
  radius: number,
  strokeWidth: number
): string => {
  'worklet';
  const inset = strokeWidth / 2;
  const left = x + inset;
  const right = x + width - inset;
  const bottom = baselineY;
  const top = baselineY - height + inset;
  const barHeight = bottom - top;

  if (barHeight <= 0 || right <= left) {
    return `M${left} ${bottom}`;
  }

  const r = Math.min(radius, (right - left) / 2, barHeight);
  return [
    `M${left} ${bottom}`,
    `L${left} ${top + r}`,
    `Q${left} ${top} ${left + r} ${top}`,
    `L${right - r} ${top}`,
    `Q${right} ${top} ${right} ${top + r}`,
    `L${right} ${bottom}`,
  ].join(' ');
};

/**
 * Clamps `value` to the `[min, max]` range. Returns `min` when the range is inverted.
 */
export const clamp = (value: number, min: number, max: number): number => {
  'worklet';
  if (max < min) {
    return min;
  }
  return Math.min(max, Math.max(min, value));
};

/**
 * Keeps a selected index inside the data, or `null` when there is nothing to select.
 */
export const resolveSelectedIndex = (
  index: number | null | undefined,
  length: number
): number | null => {
  if (index === null || index === undefined || length === 0) {
    return null;
  }
  return clamp(Math.round(index), 0, length - 1);
};
