import type { ComponentPropsWithRef } from 'react';
import { MarginProps } from '../../props/margin.props';
import { BoxProps } from '../Box/Box.props';
import { FormFieldProps } from '../FormField/FormField.props';

type ElementProps = Omit<ComponentPropsWithRef<'textarea'>, 'value'>;

export interface TextAreaProps
  extends ElementProps, Omit<FormFieldProps, 'hideLabel' | keyof ElementProps>, MarginProps {
  /**
   * The controlled value of the TextArea. Must be used with an `onChange` handler.
   */
  value?: string;
  /**
   * Controls the resize behavior of the TextArea.
   * @default "both"
   */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  /**
   * Sets the minimum height of the TextArea.
   */
  minHeight?: BoxProps['minHeight'];
  /**
   * Sets the maximum height of the TextArea.
   */
  maxHeight?: BoxProps['maxHeight'];
}
