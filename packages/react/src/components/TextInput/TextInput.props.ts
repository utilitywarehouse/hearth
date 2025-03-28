import { NotInputTextualAttributes } from '../../helpers/input-attributes';
import { ComponentPropsWithout } from '../../types/component-props';

export interface TextInputProps
  extends ComponentPropsWithout<
    'input',
    NotInputTextualAttributes | 'color' | 'defaultValue' | 'size' | 'type' | 'value'
  > {
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
  defaultValue?: string | number;
  value?: string | number;
  label: string;
  supportingText?: string;
  validationStatus?: 'valid' | 'invalid';
  validationText?: string;
  hideLabel?: boolean;
}
