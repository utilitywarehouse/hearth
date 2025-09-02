import type { TextInputProps, ViewProps } from 'react-native';

export interface CurrencyInputBaseProps {
  disabled?: boolean;
  validationStatus?: 'initial' | 'valid' | 'invalid';
  readonly?: boolean;
  focused?: boolean;
  placeholder?: string;
  inBottomSheet?: boolean;
  required?: boolean;
}

export type CurrencyInputProps = CurrencyInputBaseProps &
  Omit<TextInputProps, 'children'> &
  ViewProps;

export default CurrencyInputProps;
