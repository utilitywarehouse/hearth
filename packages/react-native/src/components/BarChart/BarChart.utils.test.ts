import { describe, expect, it } from 'vitest';
import {
  clamp,
  getBandWidth,
  getBarHeight,
  getRoundedTopBarPath,
  getYMax,
  getYTicks,
  resolveSelectedIndex,
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
