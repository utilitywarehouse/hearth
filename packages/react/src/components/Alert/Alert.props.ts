import React from 'react';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface AlertProps extends ComponentPropsWithout<'div', RemovedProps> {
  /**
   * Sets the colour scheme.
   * @default blue
   */
  colorScheme?: 'blue' | 'green' | 'red' | 'orange';
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
