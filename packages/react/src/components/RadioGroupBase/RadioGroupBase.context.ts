import { createContext, useContext } from 'react';

export type RadioGroupBaseContextValue = {
  hasGroupHelperText: boolean;
  'aria-describedby'?: string;
};

export const RadioGroupBaseContext = createContext<RadioGroupBaseContextValue>({
  hasGroupHelperText: false,
} as RadioGroupBaseContextValue);

export const RadioGroupBaseProvider = RadioGroupBaseContext.Provider;

export const useRadioGroupBase = () => useContext(RadioGroupBaseContext);
