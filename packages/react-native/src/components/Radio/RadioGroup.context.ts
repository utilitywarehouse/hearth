import { createContext, useContext } from 'react';

export const RadioGroupContext = createContext<{
  disabled?: boolean;
  validationStatus?: 'valid' | 'invalid' | 'initial';
  type?: 'default' | 'tile';
  direction?: 'column' | 'row';
}>({});

export const useRadioGroupContext = () => useContext(RadioGroupContext);
