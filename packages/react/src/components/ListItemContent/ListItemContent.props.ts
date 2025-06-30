import type { ReactNode } from 'react';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface ListItemContentProps
  extends ComponentPropsWithout<'div', RemovedProps | 'children'> {
  heading: string;
  /**
   * Optional helper text to provide additional context or instructions.
   */
  helperText?: string;
  leadingIcon?: ReactNode;
}
