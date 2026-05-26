import { createContext, useContext } from 'react';

export type FormGroupBaseContextValue = {
  hasGroupHelperText: boolean;
  hasGroupValidationText: boolean;
  'aria-describedby'?: string;
};

export const FormGroupBaseContext = createContext<FormGroupBaseContextValue>({
  hasGroupHelperText: false,
  hasGroupValidationText: false,
});

export const FormGroupBaseProvider = FormGroupBaseContext.Provider;

export const useFormGroupBase = () => useContext(FormGroupBaseContext);
