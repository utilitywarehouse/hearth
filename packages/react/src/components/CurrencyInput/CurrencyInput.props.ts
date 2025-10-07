import { TextInputProps } from '../TextInput/TextInput.props';

export interface CurrencyInputProps extends Omit<TextInputProps, 'type' | 'hideLabel'> {
  disableGroupSeparators?: boolean;
}
