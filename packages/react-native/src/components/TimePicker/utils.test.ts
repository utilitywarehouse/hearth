import { describe, expect, it } from 'vitest';
import { getClosestOption } from './utils';
import type { PickerOption } from './TimePicker.props';

const minuteOptions: PickerOption[] = [0, 15, 30, 45].map(value => ({
  value,
  text: String(value),
}));

const periodOptions: PickerOption[] = [
  { value: 'AM', text: 'AM' },
  { value: 'PM', text: 'PM' },
];

describe('getClosestOption', () => {
  it('returns the value unchanged when it matches an option exactly', () => {
    expect(getClosestOption(30, minuteOptions)).toBe(30);
  });

  it('snaps a mismatched numeric value to the nearest option', () => {
    expect(getClosestOption(20, minuteOptions)).toBe(15);
    expect(getClosestOption(23, minuteOptions)).toBe(30);
  });

  it('returns the value unchanged when options is empty', () => {
    expect(getClosestOption(37, [])).toBe(37);
  });

  it('falls back to the first option for a NaN value', () => {
    expect(getClosestOption(NaN, minuteOptions)).toBe(0);
  });

  it('matches a non-numeric value against string options', () => {
    expect(getClosestOption('PM', periodOptions)).toBe('PM');
  });

  it('falls back to the first option for an unmatched non-numeric value', () => {
    expect(getClosestOption('unknown', periodOptions)).toBe('AM');
  });
});
