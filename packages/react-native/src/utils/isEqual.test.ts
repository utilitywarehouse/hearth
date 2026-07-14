import { describe, expect, it } from 'vitest';
import isEqual from './isEqual';

describe('isEqual', () => {
  it('returns true for identical primitives', () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual('a', 'a')).toBe(true);
    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);
  });

  it('returns false for different primitives', () => {
    expect(isEqual(1, 2)).toBe(false);
    expect(isEqual('a', 'b')).toBe(false);
    expect(isEqual(1, '1')).toBe(false);
  });

  it('returns false when only one value is null', () => {
    expect(isEqual(null, {})).toBe(false);
    expect(isEqual({}, null)).toBe(false);
  });

  it('compares flat objects by value', () => {
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
  });

  it('returns false when objects have different keys', () => {
    expect(isEqual({ a: 1 }, { b: 1 })).toBe(false);
    expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
  });

  it('compares nested objects deeply', () => {
    expect(isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 1 } } })).toBe(true);
    expect(isEqual({ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } })).toBe(false);
  });

  it('compares arrays by element', () => {
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
  });

  it('distinguishes arrays from objects', () => {
    expect(isEqual([], {})).toBe(false);
  });

  it('compares arrays of objects deeply', () => {
    expect(isEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }])).toBe(true);
    expect(isEqual([{ a: 1 }], [{ a: 2 }])).toBe(false);
  });
});
