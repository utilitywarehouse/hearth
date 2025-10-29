import { createContext } from 'react';
import { ProgressStepperProps } from './ProgressStepper.props';

export type ProgressStepperContextOptions = {
  hideLabels: ProgressStepperProps['hideLabels'];
  interactive: ProgressStepperProps['interactive'];
};

export const ProgressStepperContext = createContext<ProgressStepperContextOptions>({
  hideLabels: false,
  interactive: false,
});
