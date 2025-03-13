import { createContext, useContext } from 'react';
import { GestureResponderEvent } from 'react-native';

interface CardContextProps {
  pressed?: boolean;
  inheritChildAction?: boolean;
  registerChildAction?: (action: (e: GestureResponderEvent) => void) => void;
}

export const CardContext = createContext<CardContextProps>({});

export const useCardContext = (): CardContextProps => {
  const context = useContext(CardContext);

  return context;
};
