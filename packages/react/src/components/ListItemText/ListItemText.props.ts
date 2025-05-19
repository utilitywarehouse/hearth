import type { ReactNode } from 'react';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface ListItemTextProps extends ComponentPropsWithout<'div', RemovedProps> {
  /**
   * Optional helper text to provide additional context or instructions.
   */
  helperText?: string;
  leadingIcon?: ReactNode;
}
