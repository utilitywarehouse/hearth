import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface ProgressStepButtonProps
  extends Omit<ComponentPropsWithout<'button', RemovedProps>, 'children'> {
  /**
   * The label text to display for the step
   */
  label: string;
}
