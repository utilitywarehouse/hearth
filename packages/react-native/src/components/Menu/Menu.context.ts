import { createContext, useContext } from 'react';

export interface IMenuContext {
  close: () => void;
}

export const MenuContext = createContext<IMenuContext | undefined>(undefined);

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenuContext must be used within a Menu component');
  }
  return context;
};
