import type { PickerOption } from './TimePicker.props';

/**
 * Snaps a value to the closest matching option's value. Used to guarantee the value
 * handed to a wheel picker always exists in its own options list — an exact match is
 * returned as-is, a numeric mismatch snaps to the nearest option by distance, and a
 * non-numeric or unmatched value falls back to the first option, since a mismatched
 * value has nothing for the wheel to scroll to.
 */
export const getClosestOption = <T extends number | string>(value: T, options: PickerOption[]): T => {
  if (!options.length) return value;

  const values = options.map(option => option.value);
  if (values.includes(value)) return value;

  const numericValues = values.filter((optionValue): optionValue is number => {
    return typeof optionValue === 'number';
  });

  if (typeof value !== 'number' || Number.isNaN(value) || !numericValues.length) {
    return (options[0]?.value ?? value) as T;
  }

  let closest = numericValues[0];
  let closestDiff = Math.abs(value - closest);

  numericValues.forEach(optionValue => {
    const diff = Math.abs(value - optionValue);
    if (diff < closestDiff) {
      closestDiff = diff;
      closest = optionValue;
    }
  });

  return closest as T;
};
