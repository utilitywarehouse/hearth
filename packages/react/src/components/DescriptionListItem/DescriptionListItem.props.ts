import { ReactNode } from 'react';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface DescriptionListItemProps
  extends ComponentPropsWithout<'div', RemovedProps | 'children'> {
  /**
   * Description term
   */
  heading: string;
  /**
   * Description details
   */
  description: string;
  /**
   * Optional link element
   */
  link?: ReactNode;
  /**
   * Indicates the validation state
   */
  validationStatus?: 'invalid';
  /**
   * Text to display when the `validationStatus` is set.
   */
  validationText?: string;
}
