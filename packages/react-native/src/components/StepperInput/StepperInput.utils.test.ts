import { describe, expect, it } from 'vitest';
import {
  clampValue,
  formatNumber,
  getDecimalPlaces,
  normalizeValue,
  parseValue,
  sanitizeValue,
} from './StepperInput.utils';

describe('normalizeValue', () => {
  it('returns an empty string for missing values', () => {
    expect(normalizeValue()).toBe('');
    expect(normalizeValue('')).toBe('');
  });

  it('stringifies numbers', () => {
    expect(normalizeValue(5)).toBe('5');
    expect(normalizeValue(-2.5)).toBe('-2.5');
    expect(normalizeValue(0)).toBe('0');
  });

  it('passes strings through', () => {
    expect(normalizeValue('12')).toBe('12');
  });
});

describe('getDecimalPlaces', () => {
  it('returns 0 for missing values', () => {
    expect(getDecimalPlaces()).toBe(0);
    expect(getDecimalPlaces('')).toBe(0);
  });

  it('returns 0 for integers', () => {
    expect(getDecimalPlaces(5)).toBe(0);
    expect(getDecimalPlaces('42')).toBe(0);
  });

  it('counts decimal places', () => {
    expect(getDecimalPlaces(1.5)).toBe(1);
    expect(getDecimalPlaces('3.141')).toBe(3);
    expect(getDecimalPlaces('2.')).toBe(0);
  });
});

describe('formatNumber', () => {
  it('truncates when precision is zero', () => {
    expect(formatNumber(3.7, 0)).toBe('3');
    expect(formatNumber(-3.7, 0)).toBe('-3');
  });

  it('formats to the given precision', () => {
    expect(formatNumber(1.25, 2)).toBe('1.25');
  });

  it('trims trailing zeros from the decimal part', () => {
    expect(formatNumber(1.5, 2)).toBe('1.5');
    expect(formatNumber(2, 2)).toBe('2');
  });
});

describe('sanitizeValue', () => {
  it('strips non-digits when negatives and decimals are not allowed', () => {
    expect(sanitizeValue('a1b2-3.4', false, false)).toBe('1234');
  });

  it('keeps a leading minus when negatives are allowed', () => {
    expect(sanitizeValue('-12', true, false)).toBe('-12');
    expect(sanitizeValue('1-2', true, false)).toBe('12');
  });

  it('drops the minus when negatives are not allowed', () => {
    expect(sanitizeValue('-12.5', false, true)).toBe('12.5');
  });

  it('keeps only the first decimal separator', () => {
    expect(sanitizeValue('1.2.3', false, true)).toBe('1.23');
  });

  it('converts commas to decimal points', () => {
    expect(sanitizeValue('1,5', false, true)).toBe('1.5');
  });

  it('handles negatives with decimals', () => {
    expect(sanitizeValue('-1.25', true, true)).toBe('-1.25');
  });

  it('preserves a bare trailing decimal point while typing', () => {
    expect(sanitizeValue('12.', false, true)).toBe('12.');
  });
});

describe('parseValue', () => {
  it('returns null for incomplete input', () => {
    expect(parseValue('')).toBeNull();
    expect(parseValue('-')).toBeNull();
    expect(parseValue('.')).toBeNull();
    expect(parseValue('-.')).toBeNull();
  });

  it('parses numeric strings', () => {
    expect(parseValue('12')).toBe(12);
    expect(parseValue('-1.5')).toBe(-1.5);
    expect(parseValue('0')).toBe(0);
  });

  it('returns null for non-numeric strings', () => {
    expect(parseValue('1.2.3')).toBeNull();
  });
});

describe('clampValue', () => {
  it('returns the value when no bounds are set', () => {
    expect(clampValue(5)).toBe(5);
  });

  it('clamps to the minimum', () => {
    expect(clampValue(2, 5)).toBe(5);
    expect(clampValue(-10, 0)).toBe(0);
  });

  it('clamps to the maximum', () => {
    expect(clampValue(20, undefined, 10)).toBe(10);
  });

  it('leaves in-range values unchanged', () => {
    expect(clampValue(7, 0, 10)).toBe(7);
  });
});
