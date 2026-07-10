import { describe, expect, it } from 'vitest';
import hexWithOpacity from './hexWithOpacity';

describe('hexWithOpacity', () => {
  it('converts a hex colour with a leading hash to rgba', () => {
    expect(hexWithOpacity('#FF0000', 0.5)).toBe('rgba(255, 0, 0, 0.5)');
  });

  it('converts a hex colour without a leading hash', () => {
    expect(hexWithOpacity('00FF00', 1)).toBe('rgba(0, 255, 0, 1)');
  });

  it('accepts lowercase hex digits', () => {
    expect(hexWithOpacity('#a1b2c3', 0.25)).toBe('rgba(161, 178, 195, 0.25)');
  });

  it('throws for shorthand hex colours', () => {
    expect(() => hexWithOpacity('#fff', 1)).toThrow('Invalid hex color format');
  });

  it('throws for non-hex characters', () => {
    expect(() => hexWithOpacity('#GGGGGG', 1)).toThrow('Invalid hex color format');
  });

  it('throws for empty input', () => {
    expect(() => hexWithOpacity('', 1)).toThrow('Invalid hex color format');
  });
});
