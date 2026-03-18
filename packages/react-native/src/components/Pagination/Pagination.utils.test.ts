import { describe, expect, it } from 'vitest';
import { ELLIPSIS, generatePageNumbers } from './Pagination.utils';

describe('generatePageNumbers', () => {
  it('returns all pages when the total fits within the visible limit', () => {
    expect(generatePageNumbers(1, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('returns the leading window when the current page is near the start', () => {
    expect(generatePageNumbers(2, 10)).toEqual([1, 2, 3, 4, 5, ELLIPSIS, 10]);
  });

  it('returns the centered window when the current page is in the middle', () => {
    expect(generatePageNumbers(5, 10)).toEqual([1, ELLIPSIS, 4, 5, 6, ELLIPSIS, 10]);
  });

  it('returns the trailing window when the current page is near the end', () => {
    expect(generatePageNumbers(9, 10)).toEqual([1, ELLIPSIS, 6, 7, 8, 9, 10]);
  });
});
