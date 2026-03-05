import type { ComponentPropsWithRef, ReactNode } from 'react';
import { IconContainerProps } from '../IconContainer/IconContainer.props';

export interface CardActionContentProps extends ComponentPropsWithRef<'div'> {
  heading: string;
  /**
   * Optional helper text to provide additional context or instructions.
   */
  helperText?: string;
  leadingIcon?: ReactNode;
  leadingIconContainerColorScheme?: IconContainerProps['colorScheme'];
  trailingIcon?: ReactNode;
  badge?: ReactNode;
  /**
   * Placement of the badge element
   * @default 'bottom'
   */
  badgePlacement?: 'middle' | 'bottom' | 'right';
}
