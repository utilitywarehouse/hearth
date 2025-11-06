import { ViewProps } from 'react-native';

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

export interface ProgressStepperRootProps extends ViewProps {
  children: React.ReactNode;
}

export default ProgressStepperProps;
