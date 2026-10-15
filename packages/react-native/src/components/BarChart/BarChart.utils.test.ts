import { describe, expect, it } from 'vitest';
import {
  clamp,
  getActiveIndex,
  getBandWidth,
  getBarHeight,
  getCaretMotion,
  getRoundedTopBarPath,
  getYMax,
  getYTicks,
  resolveSelectedIndex,
  shouldScrollToEnd,
} from './BarChart.utils';

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
    expect(getBandWidth(4, 240, 48, 8)).toBe(60);
  });

  it('never shrinks below the bar width plus the minimum gap', () => {
    expect(getBandWidth(12, 240, 48, 8)).toBe(56);
  });

  it('handles an empty data set', () => {
    expect(getBandWidth(0, 240, 48, 8)).toBe(56);
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
  it('draws an open path with rounded top corners, inset by the stroke and sitting on the baseline', () => {
    expect(getRoundedTopBarPath(0, 100, 40, 60, 6, 2)).toBe(
      'M1 100 L1 47 Q1 41 7 41 L33 41 Q39 41 39 47 L39 100'
    );
  });

  it('leaves the path open so the base is not stroked', () => {
    expect(getRoundedTopBarPath(0, 100, 40, 60, 6, 2)).not.toContain('Z');
  });

  it('limits the radius to half the bar width', () => {
    const path = getRoundedTopBarPath(0, 100, 10, 60, 20, 2);
    expect(path).toContain('Q1 41 5 41');
  });

  it('returns a degenerate path for an empty bar', () => {
    expect(getRoundedTopBarPath(0, 100, 40, 0, 6, 2)).toBe('M1 100');
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
