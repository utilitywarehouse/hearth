import { createContext, useContext } from 'react';

export interface ComboboxSelection {
  label: string;
  value: string;
}

export interface ComboboxContextValue {
  close: () => void;
  search: string;
  selectedValue?: string | null;
  selectOption: (option: ComboboxSelection) => void;
  setSearch: (value: string) => void;
}

export const ComboboxContext = createContext<ComboboxContextValue | undefined>(undefined);

export const useComboboxContext = () => {
  const context = useContext(ComboboxContext);

  if (!context) {
    throw new Error('useComboboxContext must be used within a Combobox');
  }

  return context;
};
