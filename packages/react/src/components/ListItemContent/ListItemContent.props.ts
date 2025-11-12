import { ReactNode } from 'react';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface ListItemContentProps extends ComponentPropsWithout<'div', RemovedProps> {
  heading: string;
  /**
   * Optional helper text to provide additional context or instructions.
   */
  helperText?: string;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  badge?: ReactNode;
  /**
   * Placement of the badge element
   * @default 'bottom'
   */
  badgePlacement?: 'top' | 'bottom';
}
