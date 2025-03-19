import { NotInputTextualAttributes } from '../../helpers/input-attributes';
import { ComponentPropsWithout } from '../../types/component-props';

type TextInputOwnProps = {
  defaultValue?: string | number;
  value?: string | number;
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
};

export interface TextInputProps
  extends TextInputOwnProps,
    ComponentPropsWithout<
      'input',
      NotInputTextualAttributes | 'color' | 'defaultValue' | 'size' | 'type' | 'value'
    > {
  label: string;
  supportingText?: string;
  validationStatus?: 'valid' | 'invalid';
  validationMessage?: string;
}
