import { TextInputProps } from '../TextInput/TextInput.props';

export interface SearchInputProps
  extends Omit<TextInputProps, 'type' | 'validationStatus' | 'validationText' | 'enterKeyHint'> {
  onClear?: () => void;
  loading?: boolean;
}
