import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface ProgressStepContentProps extends ComponentPropsWithout<'div', RemovedProps> {
  /**
   * The label text to display for the step
   */
  label: string;
}
