import { createContext, useContext } from 'react';

export type CardAccordionItemContextValue = {
  value: string;
};
export const CardAccordionItemContext = createContext<CardAccordionItemContextValue | undefined>(
  undefined
);
export const CardAccordionItemProvider = CardAccordionItemContext.Provider;
export const useCardAccordionItem = (): CardAccordionItemContextValue => {
  const context = useContext(CardAccordionItemContext);
  if (!context) {
    throw new Error('useCardAccordionItem must be used within a CardAccordionItemProvider');
  }
  return context;
};
