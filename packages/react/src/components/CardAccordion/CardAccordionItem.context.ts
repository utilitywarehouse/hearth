import { createContext, useContext } from 'react';

export type CardAccordionItemContextValue = {
  value: string;
};
export const CardAccordionItemContext = createContext<CardAccordionItemContextValue | undefined>(
  undefined
);
export const CardAccordionItemProvider = CardAccordionItemContext.Provider;
export const useCardAccordionItem = () => useContext(CardAccordionItemContext);
