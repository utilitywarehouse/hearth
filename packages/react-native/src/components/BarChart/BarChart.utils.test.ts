import { describe, expect, it } from 'vitest';
import {
  clamp,
  getActiveIndex,
  getBandWidth,
  getBarColors,
  getBarHeight,
  getCaretMotion,
  getRoundedTopBarPath,
  getYMax,
  getYTicks,
  MIN_BAR_GAP,
  resolveSelectedIndex,
  shouldScrollToEnd,
} from './BarChart.utils';

describe('getBarColors', () => {
  const color = {
    feedback: { info: { surface: { subtle: 'info-subtle', default: 'info-default' } } },
    surface: { cashback: { subtle: 'cashback-subtle', default: 'cashback-default' } },
  } as unknown as Parameters<typeof getBarColors>[0];

  it('uses the feedback surface tokens for feedback schemes', () => {
    expect(getBarColors(color, 'info')).toEqual({
      fill: 'info-subtle',
      selectedFill: 'info-default',
    });
  });

  it('uses the surface tokens for brand schemes', () => {
    expect(getBarColors(color, 'cashback')).toEqual({
      fill: 'cashback-subtle',
      selectedFill: 'cashback-default',
    });
  });
});

describe('getYMax', () => {
  it('returns the explicit yMax when provided', () => {
    expect(getYMax([3, 9], 6, 24)).toBe(24);
  });

  it('rounds the largest value up to a tidy number', () => {
    expect(getYMax([8, 22], 6)).toBe(25);
  });

  it('falls back to 1 when there is no positive value', () => {
    expect(getYMax([], 6)).toBe(1);
    expect(getYMax([0, 0], 6)).toBe(1);
  });

  it('ignores a non-positive explicit yMax', () => {
    expect(getYMax([10], 6, 0)).toBe(10);
  });

  it.each([
    // [values, yTicks, expected]
    [[8, 22], 6, 25],
    [[5, 3, 22], 6, 25],
    [[-4, 22], 6, 25],
    [[10], 6, 10],
    [[8], 6, 10],
    [[12], 6, 25],
    [[100], 6, 100],
    [[101], 6, 250],
    [[1], 6, 1],
    [[0.37], 6, 0.5],
    [[0.0034], 6, 0.005],
    [[0.3], 6, 0.5],
    [[1340], 6, 2500],
    [[1_234_567], 6, 2_500_000],
    [[1e15], 6, 1e15],
    [[7], 2, 10],
    [[7], 3, 10],
    [[7], 11, 10],
    [[7], 0, 10],
    [[7], 1, 10],
    [[7], 5.5, 10],
  ])('rounds %j with %s ticks up to %s', (values, yTicks, expected) => {
    expect(getYMax(values, yTicks)).toBe(expected);
  });

  it('never returns a non-positive or non-finite max', () => {
    expect(getYMax([Number.MIN_VALUE], 6)).toBe(1);
    expect(getYMax([Number.POSITIVE_INFINITY], 6)).toBe(1);
  });
});

describe('y-axis niceness', () => {
  const bases = [1, 1.1, 1.2, 1.5, 2, 2.4, 2.5, 3, 4, 5, 6, 7, 8, 9, 9.99];
  const largestValues = bases
    .flatMap(base =>
      Array.from({ length: 13 }, (_, index) => base * 10 ** (index - 3)).flatMap(value => [
        value,
        value * (1 + 1e-12),
        value * (1 - 1e-12),
      ])
    )
    .sort((a, b) => a - b);
  const tickCounts = Array.from({ length: 11 }, (_, index) => index + 2);

  const significantDigits = (value: number) =>
    value === 0 ? 0 : value.toExponential().split('e')[0].replace(/[.-]/g, '').length;

  it('covers the tallest bar without overshooting by more than 2.5x', () => {
    for (const largest of largestValues) {
      for (const ticks of tickCounts) {
        const max = getYMax([largest], ticks);
        expect(max, `${largest} @ ${ticks}`).toBeGreaterThanOrEqual(largest * (1 - 1e-9));
        expect(max, `${largest} @ ${ticks}`).toBeLessThanOrEqual(largest * 2.5);
      }
    }
  });

  it('uses a 1, 2 or 5 x 10^k step between ticks', () => {
    for (const largest of largestValues) {
      for (const ticks of tickCounts) {
        const step = getYMax([largest], ticks) / (ticks - 1);
        const mantissa = step / 10 ** Math.floor(Math.log10(step));
        const nearest = [1, 2, 5, 10].reduce((best, candidate) =>
          Math.abs(candidate - mantissa) < Math.abs(best - mantissa) ? candidate : best
        );
        expect(mantissa, `${largest} @ ${ticks}`).toBeCloseTo(nearest, 8);
      }
    }
  });

  it('produces ticks with no float tails and at most two significant digits', () => {
    for (const largest of largestValues) {
      for (const ticks of tickCounts) {
        const labels = getYTicks(getYMax([largest], ticks), ticks);
        for (const tick of labels) {
          expect(Number(tick.toPrecision(12)), `${largest} @ ${ticks}`).toBe(tick);
          expect(significantDigits(tick), `${tick} from ${largest} @ ${ticks}`).toBeLessThanOrEqual(
            2
          );
        }
      }
    }
  });

  it('never decreases as the largest value grows', () => {
    for (const ticks of tickCounts) {
      let previous = 0;
      for (const largest of largestValues) {
        const max = getYMax([largest], ticks);
        expect(max, `${largest} @ ${ticks}`).toBeGreaterThanOrEqual(previous);
        previous = max;
      }
    }
  });

  it('is stable when its own result is fed back in', () => {
    for (const largest of largestValues) {
      for (const ticks of tickCounts) {
        const max = getYMax([largest], ticks);
        expect(getYMax([max], ticks), `${largest} @ ${ticks}`).toBe(max);
      }
    }
  });
});

describe('getYTicks', () => {
  it('returns evenly spaced ticks from 0 to yMax', () => {
    expect(getYTicks(24, 6).map(tick => Number(tick.toFixed(2)))).toEqual([
      0, 4.8, 9.6, 14.4, 19.2, 24,
    ]);
  });

  it('always returns at least a baseline and a top tick', () => {
    expect(getYTicks(10, 1)).toEqual([0, 10]);
  });
});

describe('getBandWidth', () => {
  it('stretches bands to fill the viewport when there are few bars', () => {
    expect(getBandWidth(4, 400, 48)).toBe(100);
  });

  it('never shrinks below the bar width plus the minimum gap', () => {
    expect(getBandWidth(12, 240, 48)).toBe(48 + MIN_BAR_GAP);
  });

  it('handles an empty data set', () => {
    expect(getBandWidth(0, 240, 48)).toBe(48 + MIN_BAR_GAP);
  });
});

describe('getBarHeight', () => {
  it('scales the value into the plot height', () => {
    expect(getBarHeight(12, 24, 200)).toBe(100);
  });

  it('clamps values outside the axis range', () => {
    expect(getBarHeight(40, 24, 200)).toBe(200);
    expect(getBarHeight(-5, 24, 200)).toBe(0);
  });

  it('returns 0 when the axis has no range', () => {
    expect(getBarHeight(5, 0, 200)).toBe(0);
  });
});

describe('getRoundedTopBarPath', () => {
  const bar = { x: 0, baselineY: 100, width: 40, height: 60, radius: 6, strokeWidth: 2 };

  it('draws an open path with rounded top corners, inset by the stroke and sitting on the baseline', () => {
    expect(getRoundedTopBarPath(bar)).toBe('M1 100 L1 47 Q1 41 7 41 L33 41 Q39 41 39 47 L39 100');
  });

  it('leaves the path open so the base is not stroked', () => {
    expect(getRoundedTopBarPath(bar)).not.toContain('Z');
  });

  it('limits the radius to half the bar width', () => {
    const path = getRoundedTopBarPath({ ...bar, width: 10, radius: 20 });
    expect(path).toContain('Q1 41 5 41');
  });

  it('returns a degenerate path for an empty bar', () => {
    expect(getRoundedTopBarPath({ ...bar, height: 0 })).toBe('M1 100');
  });
});

describe('clamp', () => {
  it('keeps a value within the range', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(11, 0, 10)).toBe(10);
  });

  it('returns the minimum when the range is inverted', () => {
    expect(clamp(5, 10, 0)).toBe(10);
  });
});

describe('resolveSelectedIndex', () => {
  it('returns null when nothing is selected or there is no data', () => {
    expect(resolveSelectedIndex(null, 4)).toBeNull();
    expect(resolveSelectedIndex(undefined, 4)).toBeNull();
    expect(resolveSelectedIndex(2, 0)).toBeNull();
  });

  it('keeps the index inside the data', () => {
    expect(resolveSelectedIndex(2, 4)).toBe(2);
    expect(resolveSelectedIndex(9, 4)).toBe(3);
    expect(resolveSelectedIndex(-3, 4)).toBe(0);
  });
});

describe('getActiveIndex', () => {
  it('selects the last bar when uncontrolled with no default', () => {
    expect(
      getActiveIndex({ selectedIndex: undefined, internalSelected: undefined, length: 4 })
    ).toBe(3);
  });

  it('uses the internal selection when uncontrolled', () => {
    expect(getActiveIndex({ selectedIndex: undefined, internalSelected: 1, length: 4 })).toBe(1);
  });

  it('honours an uncontrolled `null` default as no selection', () => {
    expect(
      getActiveIndex({ selectedIndex: undefined, internalSelected: null, length: 4 })
    ).toBeNull();
  });

  it('lets a controlled index win over the internal selection', () => {
    expect(getActiveIndex({ selectedIndex: 0, internalSelected: 2, length: 4 })).toBe(0);
  });

  it('treats a controlled `null` as no selection, not the last bar', () => {
    expect(getActiveIndex({ selectedIndex: null, internalSelected: 2, length: 4 })).toBeNull();
  });

  it('clamps an out-of-range index in either mode', () => {
    expect(getActiveIndex({ selectedIndex: 9, internalSelected: undefined, length: 4 })).toBe(3);
    expect(getActiveIndex({ selectedIndex: undefined, internalSelected: -2, length: 4 })).toBe(0);
  });

  it('follows the data when it shrinks below the internal selection', () => {
    expect(getActiveIndex({ selectedIndex: undefined, internalSelected: 5, length: 3 })).toBe(2);
  });

  it('returns null when there is no data', () => {
    expect(
      getActiveIndex({ selectedIndex: undefined, internalSelected: undefined, length: 0 })
    ).toBeNull();
    expect(getActiveIndex({ selectedIndex: 0, internalSelected: undefined, length: 0 })).toBeNull();
  });
});

describe('getCaretMotion', () => {
  it('reveals the caret the first time it is positioned', () => {
    expect(
      getCaretMotion({ hasPositioned: false, bandWidthChanged: true, isReducedMotion: false })
    ).toBe('reveal');
    expect(
      getCaretMotion({ hasPositioned: false, bandWidthChanged: false, isReducedMotion: true })
    ).toBe('reveal');
  });

  it('slides between bars when only the selection changed', () => {
    expect(
      getCaretMotion({ hasPositioned: true, bandWidthChanged: false, isReducedMotion: false })
    ).toBe('slide');
  });

  it('snaps when the bar slots resized, e.g. the data or viewport changed', () => {
    expect(
      getCaretMotion({ hasPositioned: true, bandWidthChanged: true, isReducedMotion: false })
    ).toBe('snap');
  });

  it('snaps when motion is reduced', () => {
    expect(
      getCaretMotion({ hasPositioned: true, bandWidthChanged: false, isReducedMotion: true })
    ).toBe('snap');
  });
});

describe('shouldScrollToEnd', () => {
  const overflowing = { viewportWidth: 240, contentWidth: 672 };

  it('scrolls once the bars overflow a measured viewport', () => {
    expect(shouldScrollToEnd({ scrolledId: null, dataId: '12', ...overflowing })).toBe(true);
  });

  it('does not scroll again for the same id', () => {
    expect(shouldScrollToEnd({ scrolledId: '12', dataId: '12', ...overflowing })).toBe(false);
  });

  it('scrolls again when the id changes', () => {
    expect(shouldScrollToEnd({ scrolledId: '12', dataId: '13', ...overflowing })).toBe(true);
    expect(shouldScrollToEnd({ scrolledId: '2024', dataId: '2025', ...overflowing })).toBe(true);
  });

  it('does not scroll before the viewport is measured', () => {
    expect(
      shouldScrollToEnd({ scrolledId: null, dataId: '12', viewportWidth: 0, contentWidth: 672 })
    ).toBe(false);
  });

  it('does not scroll when the bars fit', () => {
    expect(
      shouldScrollToEnd({ scrolledId: null, dataId: '4', viewportWidth: 240, contentWidth: 240 })
    ).toBe(false);
  });
});
