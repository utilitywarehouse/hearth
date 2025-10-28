import { ViewProps } from 'react-native';

export type StepState = 'complete' | 'active' | 'incomplete';

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
   * Current state of the step
   */
  state: StepState;
}

export interface ProgressStepperRootProps extends ViewProps {
  children: React.ReactNode;
}

export default ProgressStepperProps;
