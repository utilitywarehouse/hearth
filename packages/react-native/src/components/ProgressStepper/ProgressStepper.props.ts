import { TextProps, ViewProps } from 'react-native';
import type { MarginProps } from '../../types';

export type StepStatus = 'complete' | 'active' | 'incomplete';

export interface ProgressStepperProps extends ViewProps {
  /**
   * Child ProgressStep components
   */
  children: React.ReactNode;
}

export interface ProgressStepProps extends ViewProps {
  /**
   * Unique identifier for the step
   */
  id: string;
  /**
   * Current status of the step
   */
  status: StepStatus;
}

export interface ProgressStepperTextProps extends Omit<TextProps, 'children'>, MarginProps {
  /**
   * The current step number (1-indexed)
   */
  currentStep: number;
  /**
   * The total number of steps
   */
  totalSteps: number;
}

export interface ProgressStepperRootProps extends ViewProps {
  children: React.ReactNode;
}

export default ProgressStepperProps;
