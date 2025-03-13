import { createContext, useContext } from 'react';
import { GestureResponderEvent } from 'react-native';

interface CardContextProps {
  pressed?: boolean;
  inheritChildAction?: boolean;
}

export const CardContext = createContext<CardContextProps>({});

export const useCardContext = (): CardContextProps => {
  const context = useContext(CardContext);
  return context;
};
