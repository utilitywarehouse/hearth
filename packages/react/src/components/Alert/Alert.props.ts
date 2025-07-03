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
   * Sets the link text of the alert.
   */
  linkText?: string;
  /**
   * Sets the link href of the alert.
   */
  linkHref?: string;
  /**
   * Sets the onClick handler of the alert.
   */
  onClick?: () => void;
  /**
   * Sets the onClose handler of the alert.
   */
  onClose?: () => void;
}
