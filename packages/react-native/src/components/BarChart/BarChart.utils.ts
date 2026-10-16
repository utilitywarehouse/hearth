import { space } from '../../tokens';

export const DEFAULT_Y_TICKS = 6;
/** Minimum space between neighbouring bars. */
export const MIN_BAR_GAP = space['100'];

const NICE_STEPS = [1, 2, 5, 10];

/** Smallest 1, 2 or 5 x 10^k that is at least `raw`. */
const getNiceStep = (raw: number): number => {
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const normalised = raw / magnitude;
  // The tolerance stops float noise (2.0000000000000004) bumping a value up to the next step.
  const mantissa = NICE_STEPS.find(step => normalised <= step * (1 + 1e-9)) ?? 10;
  return mantissa * magnitude;
};

/**
 * The top of the y-axis: `yMax` when given, otherwise the largest value rounded up to the
 * smallest multiple of a 1, 2 or 5 x 10^k step that covers it, so every tick is a whole multiple
 * of that step. Never zero, so the scale is always valid.
 */
export const getYMax = (values: number[], yTicks: number, yMax?: number): number => {
  if (yMax !== undefined && yMax > 0) {
    return yMax;
  }

  const largest = Math.max(0, ...values);
  if (largest === 0) {
    return 1;
  }

  const intervals = Math.max(1, Math.round(yTicks) - 1);
  const step = getNiceStep(largest / intervals);
  const niceMax = Number((step * intervals).toPrecision(12));
  // Subnormal or non-finite input underflows or overflows the step maths.
  return niceMax > 0 && Number.isFinite(niceMax) ? niceMax : 1;
};

/**
 * `tickCount` evenly spaced values from 0 to `yMax` inclusive.
 */
export const getYTicks = (yMax: number, tickCount: number): number[] => {
  const count = Math.max(2, Math.round(tickCount));
  return Array.from({ length: count }, (_, index) =>
    Number(((yMax * index) / (count - 1)).toPrecision(12))
  );
};

/**
 * Width of the slot each bar sits in. Slots stretch to fill the viewport when there are few bars
 * and never shrink below the bar width plus `MIN_BAR_GAP`, which is what makes the chart scroll.
 */
export const getBandWidth = (count: number, viewportWidth: number, barWidth: number): number => {
  const minBand = barWidth + MIN_BAR_GAP;
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
export const getRoundedTopBarPath = ({
  x,
  baselineY,
  width,
  height,
  radius,
  strokeWidth,
}: {
  x: number;
  baselineY: number;
  width: number;
  height: number;
  radius: number;
  strokeWidth: number;
}): string => {
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

/**
 * The index of the selected bar. A `selectedIndex` (including `null`) controls the selection;
 * otherwise the internal selection applies, starting on the last bar when no default was given.
 * Always kept inside the data, so shrinking `data` never leaves a stale selection.
 */
export const getActiveIndex = ({
  selectedIndex,
  internalSelected,
  length,
}: {
  selectedIndex: number | null | undefined;
  internalSelected: number | null | undefined;
  length: number;
}): number | null => {
  if (selectedIndex !== undefined) {
    return resolveSelectedIndex(selectedIndex, length);
  }
  if (internalSelected !== undefined) {
    return resolveSelectedIndex(internalSelected, length);
  }
  return resolveSelectedIndex(length - 1, length);
};

export type CaretMotion = 'reveal' | 'snap' | 'slide';

/**
 * How the caret should move to the selected bar. It reveals from under the tooltip the first time,
 * snaps when the bar slots resized (data or viewport changed, so an animation would sweep across
 * stale positions) or motion is reduced, and slides between bars otherwise.
 */
export const getCaretMotion = ({
  hasPositioned,
  bandWidthChanged,
  isReducedMotion,
}: {
  hasPositioned: boolean;
  bandWidthChanged: boolean;
  isReducedMotion: boolean;
}): CaretMotion => {
  if (!hasPositioned) {
    return 'reveal';
  }
  return bandWidthChanged || isReducedMotion ? 'snap' : 'slide';
};

/**
 * Whether the chart should jump to its newest (last) bar. That happens once per `dataId`, as soon
 * as the bars overflow the viewport, so replacing the data re-scrolls but ordinary re-renders and
 * the user's own scrolling are left alone.
 */
export const shouldScrollToEnd = ({
  scrolledId,
  dataId,
  viewportWidth,
  contentWidth,
}: {
  scrolledId: string | null;
  dataId: string;
  viewportWidth: number;
  contentWidth: number;
}): boolean => viewportWidth > 0 && contentWidth > viewportWidth && scrolledId !== dataId;
