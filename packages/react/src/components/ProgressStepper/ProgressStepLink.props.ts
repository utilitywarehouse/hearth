import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface ProgressStepLinkProps
  extends Omit<ComponentPropsWithout<'a', RemovedProps>, 'children'> {
  /**
   * The label text to display for the step
   */
  label: string;
}
