import { createContext, useContext } from 'react';

export type FormGroupBaseContextValue = {
  hasGroupHelperText: boolean;
  'aria-describedby'?: string;
};

export const FormGroupBaseContext = createContext<FormGroupBaseContextValue>({
  hasGroupHelperText: false,
} as FormGroupBaseContextValue);

export const FormGroupBaseProvider = FormGroupBaseContext.Provider;

export const useFormGroupBase = () => useContext(FormGroupBaseContext);
