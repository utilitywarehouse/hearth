import { TextInputProps } from '../TextInput/TextInput.props';

export interface SearchInputProps
  extends Omit<
    TextInputProps,
    'type' | 'hideLabel' | 'supportingText' | 'validationStatus' | 'validationText' | 'enterKeyHint'
  > {
  onClear?: () => void;
  loading?: boolean;
}
