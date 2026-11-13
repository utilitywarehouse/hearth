export type ToggleGroupType = 'single' | 'multiple';

export type ToggleGroupValue = string | string[] | undefined;

/**
 * Whether `itemValue` is selected in the group's current value. In `single` mode `''` means
 * nothing is selected, as in Radix, so it never matches an item.
 */
export const isToggleGroupItemSelected = (groupValue: ToggleGroupValue, itemValue: string) =>
  Array.isArray(groupValue)
    ? groupValue.includes(itemValue)
    : groupValue !== '' && groupValue === itemValue;

/**
 * The index of the item that keyboard focus moves to from `currentIndex` when `key` is
 * pressed, or `null` if the key doesn't move focus. Matches Radix's roving focus with `loop`,
 * which the React package's `ToggleGroup` uses: arrow keys on both axes move to the
 * next/previous item and wrap at the ends, and Home/End move to the first/last item.
 */
export const getRovingFocusIndex = (
  key: string,
  currentIndex: number,
  itemCount: number
): number | null => {
  if (itemCount === 0) return null;
  switch (key) {
    case 'ArrowRight':
    case 'ArrowDown':
      return (currentIndex + 1) % itemCount;
    case 'ArrowLeft':
    case 'ArrowUp':
      return (currentIndex - 1 + itemCount) % itemCount;
    case 'Home':
      return 0;
    case 'End':
      return itemCount - 1;
    default:
      return null;
  }
};

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
