import { createContext, useContext } from 'react';

export const CheckboxContext = createContext<{
  disabled?: boolean;
  checked?: boolean;
  active?: boolean;
}>({});

export const useCheckboxContext = () => useContext(CheckboxContext);
