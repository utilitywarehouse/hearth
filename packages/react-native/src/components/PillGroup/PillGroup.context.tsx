import { createContext, useContext } from 'react';

export interface PillGroupContextValue {
  value: string[];
  onChange: (value: string) => void;
}

export const PillGroupContext = createContext<PillGroupContextValue | null>(null);

export const usePillGroupContext = () => {
  return useContext(PillGroupContext);
};
