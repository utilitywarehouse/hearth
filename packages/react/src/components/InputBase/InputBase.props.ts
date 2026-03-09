import type { ComponentPropsWithRef } from 'react';
import { NotInputTextualAttributes } from '../../helpers/input-attributes';

export interface InputBaseProps extends Omit<
  ComponentPropsWithRef<'input'>,
  NotInputTextualAttributes | 'color' | 'defaultValue' | 'size' | 'type' | 'value'
> {
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
  /**
   * The initial value of the input when rendered.
   */
  defaultValue?: string | number;
  /**
   * The controlled value of the input. Must be used with an `onChange` handler.
   */
  value?: string | number;
}
