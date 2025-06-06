import { createContext, useContext } from 'react';

export type FieldsetContextValue = {
  hasGroupHelperText: boolean;
  'aria-describedby'?: string;
};

export const FieldsetContext = createContext<FieldsetContextValue>({
  hasGroupHelperText: false,
} as FieldsetContextValue);

export const FieldsetProvider = FieldsetContext.Provider;

export const useFieldset = () => useContext(FieldsetContext);
