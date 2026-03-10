import { createContext, useContext } from 'react';

export type CardAccordionContextValue = {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  previousSteps: Array<string>;
  setPreviousSteps: (step: string) => void;
  value?: string;
  onValueChange?: (value: string) => void;
};
export const CardAccordionContext = createContext<CardAccordionContextValue | undefined>(undefined);
export const CardAccordionProvider = CardAccordionContext.Provider;
export const useCardAccordion = () => useContext(CardAccordionContext);
