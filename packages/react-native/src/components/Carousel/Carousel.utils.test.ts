import { describe, expect, it } from 'vitest';
import { computeActiveIndexFromScroll, isIndexInRange } from './Carousel.utils';

describe('computeActiveIndexFromScroll', () => {
  it('computes the index for a scroll offset exactly at an item boundary', () => {
    expect(computeActiveIndexFromScroll({ scrollX: 300, itemWidth: 300, offset: 0 })).toBe(1);
  });

  it('computes the index for a scroll offset partway through an item', () => {
    expect(computeActiveIndexFromScroll({ scrollX: 250, itemWidth: 300, offset: 0 })).toBe(1);
  });

  it('accounts for a non-zero offset (e.g. centered layout padding)', () => {
    expect(computeActiveIndexFromScroll({ scrollX: 150, itemWidth: 300, offset: 150 })).toBe(1);
  });

  it('rounds up at exactly half an item width (Math.round bankers-free behaviour)', () => {
    expect(computeActiveIndexFromScroll({ scrollX: 150, itemWidth: 300, offset: 0 })).toBe(1);
  });

  it('rounds down just before the half-item boundary', () => {
    expect(computeActiveIndexFromScroll({ scrollX: 149, itemWidth: 300, offset: 0 })).toBe(0);
  });

  it('returns a negative index for a negative scroll offset', () => {
    expect(computeActiveIndexFromScroll({ scrollX: -300, itemWidth: 300, offset: 0 })).toBe(-1);
  });

  it('returns an index beyond the item count for a scroll offset past the end', () => {
    expect(computeActiveIndexFromScroll({ scrollX: 1500, itemWidth: 300, offset: 0 })).toBe(5);
  });
});

describe('isIndexInRange', () => {
  it('returns true for an index within range', () => {
    expect(isIndexInRange({ index: 2, numItems: 5 })).toBe(true);
  });

  it('returns true for the first valid index', () => {
    expect(isIndexInRange({ index: 0, numItems: 5 })).toBe(true);
  });

  it('returns true for the last valid index', () => {
    expect(isIndexInRange({ index: 4, numItems: 5 })).toBe(true);
  });

  it('returns false for a negative index', () => {
    expect(isIndexInRange({ index: -1, numItems: 5 })).toBe(false);
  });

  it('returns false for an index equal to numItems', () => {
    expect(isIndexInRange({ index: 5, numItems: 5 })).toBe(false);
  });

  it('returns false for an index past the end', () => {
    expect(isIndexInRange({ index: 10, numItems: 5 })).toBe(false);
  });

  it('returns false for any index when numItems is 0', () => {
    expect(isIndexInRange({ index: 0, numItems: 0 })).toBe(false);
  });
});
