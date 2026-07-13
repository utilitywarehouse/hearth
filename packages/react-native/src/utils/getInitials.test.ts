import { describe, expect, it } from 'vitest';
import { getInitials } from './getInitials';

describe('getInitials', () => {
  it('returns undefined when no name is provided', () => {
    expect(getInitials()).toBeUndefined();
    expect(getInitials('')).toBeUndefined();
  });

  it('returns first and last initials for a two-part name', () => {
    expect(getInitials('John Smith')).toBe('JS');
  });

  it('uses the first and last parts of a longer name', () => {
    expect(getInitials('John Adam Smith')).toBe('JS');
  });

  it('returns a single initial for a single name', () => {
    expect(getInitials('John')).toBe('J');
  });

  it('uppercases lowercase names', () => {
    expect(getInitials('john smith')).toBe('JS');
  });

  it('handles unicode letters', () => {
    expect(getInitials('Álvaro Ñunez')).toBe('ÁÑ');
  });
});
