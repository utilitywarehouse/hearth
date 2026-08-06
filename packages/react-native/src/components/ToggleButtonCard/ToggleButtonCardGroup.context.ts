import { createContext, useContext } from 'react';

export const ToggleButtonCardGroupContext = createContext<{
  selectedValue?: string;
  select?: (value: string) => void;
}>({});

export const useToggleButtonCardGroupContext = () => useContext(ToggleButtonCardGroupContext);
