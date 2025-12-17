import React from 'react';
import { MarginProps } from '../../props/margin.props';

export interface AlertProps
  extends Omit<React.ComponentPropsWithRef<'div'>, 'asChild'>,
    MarginProps {
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
  text?: string | React.ReactNode;
  /**
   * Sets the onClose handler of the alert.
   */
  onClose?: () => void;
}
