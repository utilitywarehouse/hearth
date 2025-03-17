import { createContext, useContext } from 'react';

interface CardActionContextProps {
  pressed?: boolean;
}

export const CardActionContext = createContext<CardActionContextProps>({});

export const useCardActionContext = (): CardActionContextProps => {
  const context = useContext(CardActionContext);
  return context;
};
