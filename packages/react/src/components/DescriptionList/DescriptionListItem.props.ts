import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface DescriptionListItemProps extends Omit<ComponentPropsWithRef<'div'>, 'color'> {
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
