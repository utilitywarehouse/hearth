import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export type ProgressStepStatus = 'complete' | 'active' | 'incomplete';

export interface ProgressStepProps extends ComponentPropsWithout<'li', RemovedProps> {
  /**
   * The current status of the step
   */
  status: ProgressStepStatus;
}
