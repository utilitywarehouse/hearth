import { createContext, useContext } from 'react';

export const CheckboxGroupContext = createContext<{
  disabled?: boolean;
  validationStatus?: 'valid' | 'invalid' | 'initial';
  type?: 'default' | 'tile';
  direction?: 'column' | 'row';
  selectedValues?: string[];
  select?: (value: string) => void;
}>({});

export const useCheckboxGroupContext = () => useContext(CheckboxGroupContext);
