import { createContext, useContext, useState, type ReactNode } from 'react';

export type CardAccordionContextValue = {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  previousSteps: Array<string>;
  setPreviousSteps: React.Dispatch<React.SetStateAction<Array<string>>>;
  getStep: (value: string) => 'current' | 'previous' | 'future';
  steps: Array<string>;
};

export const CardAccordionContext = createContext<CardAccordionContextValue | undefined>(undefined);

export const CardAccordionProvider = ({
  children,
  initialValue,
  steps,
  onValueChange,
}: {
  children: ReactNode;
  initialValue: string;
  steps: Array<string>;
  onValueChange?: (value: string) => void;
}) => {
  const [currentStep, setCurrentStep] = useState<string>(initialValue);
  const [previousSteps, setPreviousSteps] = useState<Array<string>>([]);

  const getStep = (value: string) => {
    if (currentStep === value) return 'current';
    if (previousSteps.includes(value)) return 'previous';
    return 'future';
  };

  const handleValueChange = (value: string) => {
    setCurrentStep(value);
    onValueChange?.(value);
  };

  const value = {
    currentStep,
    previousSteps,
    getStep,
    setCurrentStep: handleValueChange,
    setPreviousSteps,
    steps,
  };

  return <CardAccordionContext.Provider value={value}>{children}</CardAccordionContext.Provider>;
};

export const useCardAccordion = () => {
  const context = useContext(CardAccordionContext);
  if (!context) {
    throw new Error('useCardAccordion must be used within a CardAccordionProvider');
  }
  return context;
};
