import { createContext, useContext } from 'react';

interface CardPressHandlerContextProps {
  pressed?: boolean;
}

export const CardPressHandlerContext = createContext<CardPressHandlerContextProps>({});

export const useCardPressHandlerContext = (): CardPressHandlerContextProps => {
  const context = useContext(CardPressHandlerContext);
  return context;
};
