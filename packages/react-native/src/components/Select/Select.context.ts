import { createContext, useContext } from 'react';

interface SelectContextType {
  selectedValue?: string | null;
  onValueChange?: (value: string) => void;
  close?: () => void;
}

export const SelectContext = createContext<SelectContextType>({
  selectedValue: null,
  onValueChange: () => {},
  close: () => {},
});

export const useSelectContext = () => useContext(SelectContext);
