import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type CardAccordionContextValue = {
  currentStep?: string;
  setCurrentStep: (step: string) => void;
  previousSteps: Array<string>;
  setPreviousSteps: React.Dispatch<React.SetStateAction<Array<string>>>;
  getStep: (value: string) => 'current' | 'previous' | 'future';
  steps?: Array<string>;
  isFirstStep: boolean;
  isLastStep: boolean;
};

export const CardAccordionContext = createContext<CardAccordionContextValue | undefined>(undefined);

export const CardAccordionProvider = ({
  children,
  steps,
  onValueChange,
  setCurrentValue,
}: {
  children: ReactNode;
  steps: Array<string>;
  onValueChange?: (value: string) => void;
  setCurrentValue?: (value: string) => void;
}) => {
  const [currentStep, setCurrentStep] = useState<string | undefined>(steps[0]);
  const [previousSteps, setPreviousSteps] = useState<Array<string>>([]);

  useEffect(() => {
    if (currentStep) {
      setCurrentValue?.(currentStep);
    }
  }, [currentStep, setCurrentValue]);

  const getStep = (value: string) => {
    if (currentStep === value) return 'current';
    if (previousSteps.includes(value)) return 'previous';
    return 'future';
  };

  const handleValueChange = (value: string) => {
    setCurrentStep(value);
    onValueChange?.(value);
  };

  const isFirstStep = currentStep === steps[0];
  const isLastStep = currentStep === steps[steps.length - 1];

  const value: CardAccordionContextValue = {
    currentStep,
    previousSteps,
    getStep,
    setCurrentStep: handleValueChange,
    setPreviousSteps,
    steps,
    isFirstStep,
    isLastStep,
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
