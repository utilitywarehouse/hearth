export interface ResolveActiveSelectionOptions {
  controlledValue?: string[];
  uncontrolledValue: string[];
}

/** Resolves the values `CheckboxGroup` treats as checked on every render. */
export const resolveActiveSelection = ({
  controlledValue,
  uncontrolledValue,
}: ResolveActiveSelectionOptions): string[] =>
  controlledValue !== undefined ? controlledValue : uncontrolledValue;

/**
 * Resolves the next set of checked values after toggling `itemValue`: adds it
 * when absent, removes it when present. Mirrors `@react-native-aria/checkbox`'s
 * `useCheckboxGroupItem` addValue/removeValue toggle semantics.
 */
export const toggleSelectedValue = (selectedValues: string[], itemValue: string): string[] =>
  selectedValues.includes(itemValue)
    ? selectedValues.filter(value => value !== itemValue)
    : [...selectedValues, itemValue];
