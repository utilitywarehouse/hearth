import { TextInputProps } from '../TextInput/TextInput.props';

export interface SearchInputProps extends Omit<
  TextInputProps,
  'type' | 'validationStatus' | 'validationText' | 'enterKeyHint'
> {
  /**
   * Callback invoked when the clear button is clicked. When provided, a clear
   * button is shown while the input has a value.
   */
  onClear?: () => void;
  /** Displays a loading spinner and disables input interaction. */
  loading?: boolean;
}
