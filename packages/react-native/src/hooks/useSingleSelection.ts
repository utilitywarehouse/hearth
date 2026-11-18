import { useState } from 'react';

export interface ResolveActiveSelectionOptions {
  controlledValue?: string;
  uncontrolledValue?: string;
}

/** Resolves the value a single-select group treats as selected on every render. */
export const resolveActiveSelection = ({
  controlledValue,
  uncontrolledValue,
}: ResolveActiveSelectionOptions): string | undefined =>
  controlledValue !== undefined ? controlledValue : uncontrolledValue;

export interface UseSingleSelectionOptions {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export interface UseSingleSelectionResult {
  selectedValue: string | undefined;
  select: (itemValue: string) => void;
}

/**
 * Shared single-select group state for Radio/RadioCard/ToggleButtonCard
 * groups, replacing gluestack's `createRadio` + `@react-stately/radio`
 * machinery. Controlled/uncontrolled resolution mirrors `Tabs.utils.ts`.
 */
export const useSingleSelection = ({
  value,
  defaultValue,
  onValueChange,
  disabled,
}: UseSingleSelectionOptions): UseSingleSelectionResult => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const selectedValue = resolveActiveSelection({ controlledValue: value, uncontrolledValue });

  const select = (itemValue: string) => {
    if (disabled) return;
    if (value === undefined) setUncontrolledValue(itemValue);
    onValueChange?.(itemValue);
  };

  return {
    selectedValue,
    select,
  };
};
