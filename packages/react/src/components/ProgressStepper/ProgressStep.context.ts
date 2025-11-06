import { createContext } from 'react';
import { ProgressStepStatus } from './ProgressStep.props';

export type ProgressStepContextOptions = {
  status: ProgressStepStatus;
};

export const ProgressStepContext = createContext<ProgressStepContextOptions | null>(null);
