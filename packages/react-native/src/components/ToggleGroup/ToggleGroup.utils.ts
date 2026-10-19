export type ToggleGroupType = 'single' | 'multiple';

export type ToggleGroupValue = string | string[] | undefined;

/** Whether `itemValue` is selected in the group's current value. */
export const isToggleGroupItemSelected = (groupValue: ToggleGroupValue, itemValue: string) =>
  Array.isArray(groupValue) ? groupValue.includes(itemValue) : groupValue === itemValue;

/**
 * The group value after `itemValue` is pressed. Matches Radix's `ToggleGroup`, which the
 * React package uses: in `single` mode pressing the selected item clears the value to `''`,
 * and in `multiple` mode pressing an item adds or removes it.
 */
export const getNextToggleGroupValue = (
  type: ToggleGroupType,
  groupValue: ToggleGroupValue,
  itemValue: string
): string | string[] => {
  if (type === 'single') {
    return groupValue === itemValue ? '' : itemValue;
  }
  const selected = Array.isArray(groupValue) ? groupValue : [];
  return selected.includes(itemValue)
    ? selected.filter(value => value !== itemValue)
    : [...selected, itemValue];
};
