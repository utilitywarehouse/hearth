import { describe, expect, it } from 'vitest';
import { maskDefaultFormat } from './DatePickerInput.utils';

describe('maskDefaultFormat', () => {
  it('returns an empty string for empty input', () => {
    expect(maskDefaultFormat('')).toBe('');
  });

  it('masks progressively while typing', () => {
    expect(maskDefaultFormat('1')).toBe('1');
    expect(maskDefaultFormat('12')).toBe('12');
    expect(maskDefaultFormat('123')).toBe('12/3');
    expect(maskDefaultFormat('1203')).toBe('12/03');
    expect(maskDefaultFormat('12032')).toBe('12/03/2');
    expect(maskDefaultFormat('12032025')).toBe('12/03/2025');
  });

  it('strips non-digit characters before masking', () => {
    expect(maskDefaultFormat('12/03/2025')).toBe('12/03/2025');
    expect(maskDefaultFormat('12a03b2025')).toBe('12/03/2025');
  });

  it('truncates input beyond eight digits', () => {
    expect(maskDefaultFormat('120320251234')).toBe('12/03/2025');
  });
});
