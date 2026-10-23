export interface ToggleSelectionOptions {
  /** The group's currently selected value(s), always normalized to an array internally. */
  currentValue: string[];
  /** The value of the `Pill` that was pressed. */
  pillValue: string;
  /** Whether the group is in multi-select mode. */
  multiple: boolean;
}

/**
 * Computes the next selection value for `PillGroup` in response to a `Pill`
 * press. Mirrors the toggle logic previously inlined in `PillGroup`'s
 * `onChange` closure.
 *
 * - In `multiple` mode, toggles `pillValue` in/out of `currentValue` and
 *   returns the resulting array.
 * - In single-select mode, always returns `pillValue` — pressing the
 *   already-selected pill re-selects the same value rather than deselecting it.
 */
export const toggleSelection = ({
  currentValue,
  pillValue,
  multiple,
}: ToggleSelectionOptions): string | string[] => {
  if (multiple) {
    return currentValue.includes(pillValue)
      ? currentValue.filter(value => value !== pillValue)
      : [...currentValue, pillValue];
  }
  return pillValue;
};
