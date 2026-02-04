import { createContext, useContext } from 'react';
import CardProps from './Card.props';

interface CardContextProps {
  pressed?: boolean;
  noPadding?: boolean;
  hasActions?: boolean;
  hasContent?: boolean;
  hasOnlyActions?: boolean;
  space?: CardProps['space'];
  variant?: CardProps['variant'];
  renderId?: number;
  getNextActionIndex?: () => number;
}

export const CardContext = createContext<CardContextProps>({});

export const useCardContext = (): CardContextProps => {
  const context = useContext(CardContext);
  return context;
};
