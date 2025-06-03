import { createContext, useContext } from 'react';

export const ToggleButtonCardContext = createContext<{
  checked?: boolean;
  active?: boolean;
}>({});

export const useToggleButtonCardContext = () => useContext(ToggleButtonCardContext);
