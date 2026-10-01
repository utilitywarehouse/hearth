import type { ComponentPropsWithRef, ReactNode } from 'react';
import { IconContainerProps } from '../IconContainer/IconContainer.props';

export interface CardActionContentProps extends ComponentPropsWithRef<'div'> {
  /**
   * The action's heading text.
   */
  heading: string;
  /**
   * Optional helper text to provide additional context or instructions.
   */
  helperText?: string;
  /**
   * Optional icon shown at the start of the action.
   */
  leadingIcon?: ReactNode;
  /**
   * Sets the colour scheme of the container rendered around `leadingIcon`.
   * When unset, `leadingIcon` renders without a container.
   */
  leadingIconContainerColorScheme?: IconContainerProps['colorScheme'];
  /**
   * Optional icon shown at the end of the action. Defaults to a chevron
   * icon when not set.
   */
  trailingIcon?: ReactNode;
  /**
   * Optional badge shown alongside the action.
   */
  badge?: ReactNode;
  /**
   * Placement of the badge element
   * @default 'bottom'
   */
  badgePlacement?: 'middle' | 'bottom' | 'right';
}
