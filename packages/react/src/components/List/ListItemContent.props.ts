import { ReactNode } from 'react';

export interface ListItemContentProps extends React.ComponentPropsWithRef<'div'> {
  heading: string;
  /**
   * Optional helper text to provide additional context or instructions.
   */
  helperText?: ReactNode;
  leadingContent?: ReactNode;
  trailingContent?: ReactNode;
  badge?: ReactNode;
  /**
   * Placement of the badge element
   * @default 'bottom'
   */
  badgePlacement?: 'top' | 'bottom';
}
