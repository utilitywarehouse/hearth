import { NotInputTextualAttributes } from '../../helpers/input-attributes';
import { ComponentPropsWithout } from '../../types/component-props';

type TextFieldOwnProps = {
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

type TextFieldInputProps = ComponentPropsWithout<
  'input',
  NotInputTextualAttributes | 'color' | 'defaultValue' | 'size' | 'type' | 'value'
>;

export interface TextFieldProps extends TextFieldInputProps, TextFieldOwnProps {
  validationStatus?: 'valid' | 'invalid';
}
