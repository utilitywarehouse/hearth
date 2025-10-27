import { createContext } from 'react';
import { ProgressStepperProps } from './ProgressStepper.props';

export type ProgressStepperContextOptions = {
  showLabels: ProgressStepperProps['showLabels'];
  interactive: ProgressStepperProps['interactive'];
};

export const ProgressStepperContext = createContext<ProgressStepperContextOptions>({
  showLabels: true,
  interactive: false,
});
