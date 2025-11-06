import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { TextInput as RNTextInput, TextInputProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import { useInputContext } from './Input.context';

const InputField = ({
  style,
  inBottomSheet = false,
  ...props
}: TextInputProps & { inBottomSheet?: boolean }) => {
  const { disabled, focused = false, type } = useInputContext();
  styles.useVariants({ focused, type });
  const { color } = useTheme();

  if (inBottomSheet) {
    return (
      // @ts-expect-error - BottomSheetTextInput type issue
      <BottomSheetTextInput
        placeholderTextColor={color.text.secondary}
        selectionColor={color.purple[700]}
        cursorColor={color.purple[700]}
        verticalAlign="middle"
        aria-disabled={disabled}
        {...props}
        style={[styles.input, style]}
      />
    );
  }

  return (
    <RNTextInput
      placeholderTextColor={color.text.secondary}
      selectionColor={color.purple[700]}
      cursorColor={color.purple[700]}
      verticalAlign="middle"
      aria-disabled={disabled}
      {...props}
      style={[styles.input, style]}
    />
  );
};

InputField.displayName = 'InputField';

const styles = StyleSheet.create(theme => ({
  input: {
    flex: 1,
    alignSelf: 'stretch',
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.color.text.primary,
    fontSize: theme.typography.mobile.bodyText.md.fontSize,
    fontFamily: theme.typography.mobile.bodyText.fontFamily,
    fontWeight: theme.typography.mobile.bodyText.fontWeight,
    borderWidth: 0,
    variants: {
      focused: {
        true: {},
      },
      type: {
        text: {},
        password: {},
        search: {},
        date: {},
      },
    },
    _web: {
      width: '100%',
    },
  },
}));

export default InputField;
