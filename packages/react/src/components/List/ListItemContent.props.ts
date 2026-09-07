import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface ListItemContentProps extends ComponentPropsWithRef<'div'> {
  /**
   * The list item's main heading text.
   */
  heading: string;
  /**
   * Optional helper text to provide additional context or instructions.
   */
  helperText?: ReactNode;
  /**
   * Optional content rendered before the heading, such as an icon or avatar.
   */
  leadingContent?: ReactNode;
  /**
   * Optional content rendered after the heading, such as an icon or chevron.
   */
  trailingContent?: ReactNode;
  /**
   * Optional badge rendered alongside the heading.
   */
  badge?: ReactNode;
  /**
   * Placement of the badge element
   * @default 'bottom'
   */
  badgePlacement?: 'top' | 'bottom';
}
