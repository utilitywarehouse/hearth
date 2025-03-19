import { NotInputTextualAttributes } from '../../helpers/input-attributes';
import { ComponentPropsWithout } from '../../types/component-props';

type TextInputOwnProps = {
  defaultValue?: string | number;
  value?: string | number;
  type?:
    | 'email'
    | 'hidden'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
};

export interface TextInputProps
  extends TextInputOwnProps,
    ComponentPropsWithout<
      'input',
      NotInputTextualAttributes | 'color' | 'defaultValue' | 'size' | 'type' | 'value'
    > {
  validationStatus?: 'valid' | 'invalid';
}
