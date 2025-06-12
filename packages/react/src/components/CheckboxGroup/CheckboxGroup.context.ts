import { createContext, useContext } from 'react';

export type CheckboxGroupContextValue = {
  name?: string;
  value?: Array<string>;
  onItemCheck(value: string): void;
  onItemUncheck(value: string): void;
};
export const CheckboxGroupContext = createContext<CheckboxGroupContextValue | undefined>(undefined);
export const CheckboxGroupProvider = CheckboxGroupContext.Provider;
export const useCheckboxGroup = () => useContext(CheckboxGroupContext);
