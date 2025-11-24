import { NotInputTextualAttributes } from '../../helpers/input-attributes';
import { ComponentPropsWithout } from '../../types/component-props';

export interface InputBaseProps
  extends ComponentPropsWithout<
    'input',
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
  /**
   * Indicates the validation state of the input.
   */
  validationStatus?: 'valid' | 'invalid';
}
