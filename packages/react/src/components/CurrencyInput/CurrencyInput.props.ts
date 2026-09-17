import { TextInputProps } from '../TextInput/TextInput.props';

export interface CurrencyInputProps extends Omit<TextInputProps, 'type' | 'hideLabel'> {
  /**
   * Disables comma-separated thousands grouping in the displayed value.
   *
   * @default false
   */
  disableGroupSeparators?: boolean;
}
