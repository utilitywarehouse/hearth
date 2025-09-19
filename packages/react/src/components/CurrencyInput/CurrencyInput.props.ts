import { TextInputProps } from '../TextInput/TextInput.props';

export type CurrencyInputProps = Omit<TextInputProps, 'type' | 'hideLabel'>;
