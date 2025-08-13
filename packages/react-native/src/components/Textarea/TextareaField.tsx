import { TextInput, TextInputProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import { useTextareaContext } from './Textarea.context';

const TextareaField = ({ style, ...props }: TextInputProps) => {
  const { disabled } = useTextareaContext();
  const { color } = useTheme();

  return (
    <TextInput
      placeholderTextColor={color.text.secondary}
      selectionColor={color.purple[700]}
      cursorColor={color.purple[700]}
      verticalAlign="top"
      aria-disabled={disabled}
      {...props}
      style={[styles.input, style]}
    />
  );
};

TextareaField.displayName = 'TextareaField';

const styles = StyleSheet.create(theme => ({
  input: {
    flex: 1,
    alignSelf: 'stretch',
    width: 'auto',
    justifyContent: 'flex-start',
    textAlignVertical: 'top',
    alignItems: 'flex-start',
    color: theme.color.text.primary,
    fontSize: theme.typography.mobile.bodyText.md.fontSize,
    fontFamily: theme.typography.mobile.bodyText.fontFamily,
    fontWeight: theme.typography.mobile.bodyText.fontWeight,
    borderWidth: 0,
    outlineWidth: 0,
    _web: {
      width: '100%',
    },
  },
}));

export default TextareaField;
