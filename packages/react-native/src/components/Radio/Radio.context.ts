import { createContext, useContext } from 'react';

export const RadioContext = createContext<{
  disabled?: boolean;
  checked?: boolean;
  active?: boolean;
}>({});

export const useRadioContext = () => useContext(RadioContext);
