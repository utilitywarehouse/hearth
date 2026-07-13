import { describe, expect, it } from 'vitest';
import { maskDefaultFormat } from './TimePickerInput.utils';

describe('maskDefaultFormat', () => {
  it('returns an empty string for empty input', () => {
    expect(maskDefaultFormat('')).toBe('');
  });

  it('masks progressively while typing', () => {
    expect(maskDefaultFormat('1')).toBe('1');
    expect(maskDefaultFormat('14')).toBe('14');
    expect(maskDefaultFormat('143')).toBe('14:3');
    expect(maskDefaultFormat('1430')).toBe('14:30');
  });

  it('strips non-digit characters before masking', () => {
    expect(maskDefaultFormat('14:30')).toBe('14:30');
    expect(maskDefaultFormat('1a4b30')).toBe('14:30');
  });

  it('truncates input beyond four digits', () => {
    expect(maskDefaultFormat('143059')).toBe('14:30');
  });
});
