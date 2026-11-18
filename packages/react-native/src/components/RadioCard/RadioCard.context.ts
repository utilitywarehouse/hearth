import { createContext, useContext } from 'react';

export const RadioCardContext = createContext<{
  checked?: boolean;
  active?: boolean;
  disabled?: boolean;
}>({});

export const useRadioCardContext = () => useContext(RadioCardContext);
