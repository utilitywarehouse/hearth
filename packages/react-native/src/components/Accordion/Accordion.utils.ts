export type AccordionType = 'single' | 'multiple';

export interface ResolveToggledValuesOptions {
  type: AccordionType;
  collapsible: boolean;
  selectedValues: string[];
  itemValue: string;
}

/**
 * Resolves the next set of expanded item values after toggling `itemValue`.
 * Mirrors `@react-native-aria/accordion`'s `useAccordion` toggle semantics:
 * - `single`: opening an item always replaces the current selection; closing
 *   the only open item is only allowed when `collapsible` is true.
 * - `multiple`: opening adds to the selection, closing removes from it;
 *   closing any open item is only allowed when `collapsible` is true —
 *   this blocks closing an item even when other items remain open.
 */
export const resolveToggledValues = ({
  type,
  collapsible,
  selectedValues,
  itemValue,
}: ResolveToggledValuesOptions): string[] => {
  const isOpen = selectedValues.includes(itemValue);

  if (type === 'single') {
    if (isOpen) return collapsible ? [] : selectedValues;
    return [itemValue];
  }

  if (isOpen) return collapsible ? selectedValues.filter(value => value !== itemValue) : selectedValues;
  return [...selectedValues, itemValue];
};

export interface ResolveInitialValuesOptions {
  controlledValue?: string[];
  defaultValue?: string[];
}

/** Resolves the value `Accordion` should seed its uncontrolled state with on mount. */
export const resolveInitialValues = ({
  controlledValue,
  defaultValue,
}: ResolveInitialValuesOptions): string[] => controlledValue ?? defaultValue ?? [];

export interface ResolveActiveValuesOptions {
  controlledValue?: string[];
  uncontrolledValue: string[];
}

/** Resolves the expanded values `Accordion` treats as current on every render. */
export const resolveActiveValues = ({
  controlledValue,
  uncontrolledValue,
}: ResolveActiveValuesOptions): string[] =>
  controlledValue !== undefined ? controlledValue : uncontrolledValue;
