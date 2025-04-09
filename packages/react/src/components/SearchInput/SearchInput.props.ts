import { TextInputProps } from '../TextInput/TextInput.props';

export interface SearchInputProps
  extends Omit<
    TextInputProps,
    'type' | 'hideLabel' | 'helperText' | 'validationStatus' | 'validationText' | 'enterKeyHint'
  > {
  onClear?: () => void;
  loading?: boolean;
}
