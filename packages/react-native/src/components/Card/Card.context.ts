import { createContext, useContext } from 'react';

interface CardContextProps {
  pressed?: boolean;
}

export const CardContext = createContext<CardContextProps>({});

export const useCardContext = (): CardContextProps => {
  const context = useContext(CardContext);
  return context;
};
