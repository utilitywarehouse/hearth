import { createContext, useContext } from 'react';

export interface CardActionsContextValue {
  firstActionId?: string;
  registerAction: (id: string) => () => void;
}

export const CardActionsContext = createContext<CardActionsContextValue | null>(null);

export const useCardActionsContext = (): CardActionsContextValue | null => {
  return useContext(CardActionsContext);
};