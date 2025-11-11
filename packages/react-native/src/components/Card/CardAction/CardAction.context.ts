import { createContext, useContext } from 'react';

export interface ICardActionContext {
  showPressed: boolean;
  active?: boolean;
  loading: boolean;
  disabled: boolean;
  size: 'md' | 'lg';
}

export const CardActionContext = createContext<ICardActionContext>({
  showPressed: false,
  active: false,
  loading: false,
  disabled: false,
  size: 'md',
});

export const useCardActionContext = () => {
  const context = useContext(CardActionContext);
  return context;
};
