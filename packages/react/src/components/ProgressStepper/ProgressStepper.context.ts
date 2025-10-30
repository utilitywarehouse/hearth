import { createContext } from 'react';
import { ProgressStepperProps } from './ProgressStepper.props';

export type ProgressStepperContextOptions = {
  hideLabels: ProgressStepperProps['hideLabels'];
};

export const ProgressStepperContext = createContext<ProgressStepperContextOptions>({
  hideLabels: false,
});
