import { createContext, useContext } from 'react';

export const RadioGroupContext = createContext<{
  disabled?: boolean;
  validationStatus?: 'valid' | 'invalid' | 'initial';
  type?: 'default' | 'tile';
  direction?: 'column' | 'row';
  selectedValue?: string;
  select?: (value: string) => void;
}>({});

export const useRadioGroupContext = () => useContext(RadioGroupContext);
