import { describe, expect, it } from 'vitest';
import { findDiffIndex, getNextIndexFromValueChange } from './VerificationInput.utils';

describe('findDiffIndex', () => {
  it('returns first differing index', () => {
    expect(findDiffIndex('12', '19')).toBe(1);
  });

  it('returns previous length when next appends', () => {
    expect(findDiffIndex('12', '123')).toBe(2);
  });

  it('returns next length when next shortens with same prefix', () => {
    expect(findDiffIndex('123', '12')).toBe(2);
  });
});

describe('getNextIndexFromValueChange', () => {
  it('moves to the slot after the one that changed when inserting in an empty later slot', () => {
    expect(
      getNextIndexFromValueChange({
        prevValue: '12',
        nextValue: '123',
        length: 6,
      })
    ).toBe(3);
  });

  it('caps at length when value becomes full', () => {
    expect(
      getNextIndexFromValueChange({
        prevValue: '12345',
        nextValue: '123456',
        length: 6,
      })
    ).toBe(6);
  });

  it('stays at edited index for deletions', () => {
    expect(
      getNextIndexFromValueChange({
        prevValue: '123',
        nextValue: '12',
        length: 6,
      })
    ).toBe(2);
  });
});
