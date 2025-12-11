import { createContext } from 'react';
import { ProgressStepProps } from './ProgressStep.props';

export type ProgressStepContextOptions = {
  status: ProgressStepProps['status'];
};

export const ProgressStepContext = createContext<ProgressStepContextOptions | null>(null);
