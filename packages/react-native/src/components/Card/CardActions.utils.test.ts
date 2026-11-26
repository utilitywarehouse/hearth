import { describe, expect, it } from 'vitest';
import { addActionId, getFirstActionId, removeActionId } from './CardActions.utils';

describe('addActionId', () => {
  it('appends a new id to the end of the order', () => {
    expect(addActionId(['a', 'b'], 'c')).toEqual(['a', 'b', 'c']);
  });

  it('does not duplicate an id that is already registered', () => {
    expect(addActionId(['a', 'b'], 'b')).toEqual(['a', 'b']);
  });

  it('does not mutate the input array', () => {
    const order = ['a'];
    addActionId(order, 'b');
    expect(order).toEqual(['a']);
  });

  it('adds to an empty order', () => {
    expect(addActionId([], 'a')).toEqual(['a']);
  });
});

describe('removeActionId', () => {
  it('removes the given id from the order', () => {
    expect(removeActionId(['a', 'b', 'c'], 'b')).toEqual(['a', 'c']);
  });

  it('is a no-op when the id is not present', () => {
    expect(removeActionId(['a', 'b'], 'z')).toEqual(['a', 'b']);
  });

  it('does not mutate the input array', () => {
    const order = ['a', 'b'];
    removeActionId(order, 'a');
    expect(order).toEqual(['a', 'b']);
  });

  it('can empty the order out entirely', () => {
    expect(removeActionId(['a'], 'a')).toEqual([]);
  });
});

describe('getFirstActionId', () => {
  it('returns the first id in the order', () => {
    expect(getFirstActionId(['a', 'b', 'c'])).toBe('a');
  });

  it('returns undefined for an empty order', () => {
    expect(getFirstActionId([])).toBeUndefined();
  });

  it('reflects a new first id after the previous first is removed', () => {
    const afterRemoval = removeActionId(['a', 'b', 'c'], 'a');
    expect(getFirstActionId(afterRemoval)).toBe('b');
  });
});
