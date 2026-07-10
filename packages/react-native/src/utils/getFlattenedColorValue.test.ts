import { describe, expect, it } from 'vitest';
import getFlattenedColorValue from './getFlattenedColorValue';

describe('getFlattenedColorValue', () => {
  const colors = {
    primary: '#111',
    broadbandBlue: { 100: '#00f' },
  };

  it('returns undefined when no value is provided', () => {
    expect(getFlattenedColorValue(undefined, colors)).toBeUndefined();
    expect(getFlattenedColorValue('', colors)).toBeUndefined();
  });

  it('resolves a direct colour key', () => {
    expect(getFlattenedColorValue('primary', colors)).toBe('#111');
  });

  it('resolves a shade suffix key', () => {
    expect(getFlattenedColorValue('broadbandBlue100', colors)).toBe('#00f');
  });

  it('returns the raw value when it is not a theme colour', () => {
    expect(getFlattenedColorValue('#123456', colors)).toBe('#123456');
  });
});
