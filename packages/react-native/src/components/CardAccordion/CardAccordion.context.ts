import { createContext, useContext } from 'react';

export interface CardAccordionContextValue {
  /** Every step's `value`, in order. */
  steps: string[];
  /** The `value` of the current step. */
  currentStep?: string;
  /** Makes `value` the current step. */
  setCurrentStep: (value: string) => void;
}

export const CardAccordionContext = createContext<CardAccordionContextValue | null>(null);

export const useCardAccordionContext = () => {
  const context = useContext(CardAccordionContext);
  if (!context) {
    throw new Error('CardAccordion sub-components must be rendered inside a CardAccordion.');
  }
  return context;
};

export const CardAccordionItemContext = createContext<{ value: string } | null>(null);

export const useCardAccordionItemContext = () => {
  const context = useContext(CardAccordionItemContext);
  if (!context) {
    throw new Error('CardAccordionButton must be rendered inside a CardAccordionItem.');
  }
  return context;
};
