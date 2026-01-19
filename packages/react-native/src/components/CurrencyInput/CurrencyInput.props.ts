import type { Ref } from 'react';
import type { TextInput, TextInputProps, ViewProps } from 'react-native';

export interface CurrencyInputBaseProps {
  ref?: Ref<TextInput>;
  disabled?: boolean;
  validationStatus?: 'initial' | 'valid' | 'invalid';
  readonly?: boolean;
  focused?: boolean;
  placeholder?: string;
  inBottomSheet?: boolean;
  required?: boolean;
  /** When not specifically disabled, the numeric value is automatically formatted with thousand separators (e.g. 1234 -> 1,234). */
  disableGroupSeparator?: boolean;
}

export type CurrencyInputProps = CurrencyInputBaseProps &
  Omit<TextInputProps, 'children'> &
  ViewProps;

export default CurrencyInputProps;
