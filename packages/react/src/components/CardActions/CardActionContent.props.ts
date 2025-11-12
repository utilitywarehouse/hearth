import { ReactNode } from 'react';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';
import { IconContainerProps } from '../IconContainer/IconContainer.props';

export interface CardActionContentProps extends ComponentPropsWithout<'div', RemovedProps> {
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
