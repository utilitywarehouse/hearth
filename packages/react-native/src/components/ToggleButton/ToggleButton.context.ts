import { createContext, useContext } from 'react';

export interface IToggleButtonContext {
  toggled: boolean;
}

export const ToggleButtonContext = createContext<IToggleButtonContext>({
  toggled: false,
});

export const useToggleButtonContext = () => {
  const context = useContext(ToggleButtonContext);
  return context;
};
