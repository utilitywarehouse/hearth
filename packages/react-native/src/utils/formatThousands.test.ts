import { describe, expect, it } from 'vitest';
import formatThousands from './formatThousands';

describe('formatThousands', () => {
  it('returns the value unchanged when it is empty', () => {
    expect(formatThousands('')).toBe('');
  });

  it('leaves values below one thousand unchanged', () => {
    expect(formatThousands('999')).toBe('999');
  });

  it('inserts commas every three digits', () => {
    expect(formatThousands('1000')).toBe('1,000');
    expect(formatThousands('1234567')).toBe('1,234,567');
  });

  it('preserves the decimal part', () => {
    expect(formatThousands('1234.56')).toBe('1,234.56');
  });

  it('preserves a leading minus sign', () => {
    expect(formatThousands('-1234567.89')).toBe('-1,234,567.89');
  });

  it('reformats values that already contain commas', () => {
    expect(formatThousands('1,23,4567')).toBe('1,234,567');
  });

  it('returns partial input while the user is still typing', () => {
    expect(formatThousands('-')).toBe('-');
    expect(formatThousands('.')).toBe('.');
    expect(formatThousands('1234.')).toBe('1,234.');
  });

  it('returns non-numeric input unchanged', () => {
    expect(formatThousands('12a4')).toBe('12a4');
  });
});
