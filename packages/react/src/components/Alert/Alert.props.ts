import type { ComponentPropsWithRef, ReactNode } from 'react';
import { MarginProps } from '../../props/margin.props';
import { FlexItemProps } from '../../props/flex-item.props';
import { GridItemProps } from '../../props/grid-item.props';

export interface AlertProps
  extends Omit<ComponentPropsWithRef<'div'>, 'asChild'>, MarginProps, FlexItemProps, GridItemProps {
  /**
   * Sets the colour scheme.
   * @default info
   */
  colorScheme?: 'info' | 'positive' | 'danger' | 'warning';
  /**
   * Sets the title of the alert.
   */
  title?: string;
  /**
   * Sets the text of the alert.
   */
  text?: string | ReactNode;
  /**
   * Sets the onClose handler of the alert.
   */
  onClose?: () => void;
}
