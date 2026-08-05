import { forwardRef } from 'react';
import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import { useTextareaContext } from './Textarea.context';

const TextareaField = forwardRef<RNTextInput, TextInputProps>(
  ({ style, onFocus, onBlur, editable, multiline = true, ...props }, ref) => {
    const { disabled, readonly, validationStatus, required, setFocused } = useTextareaContext();
    const { color } = useTheme();

    const resolvedEditable = editable !== undefined ? editable : !(disabled || readonly);

    const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused?.(true);
      onFocus?.(event);
    };

    const handleBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused?.(false);
      onBlur?.(event);
    };

    return (
      <RNTextInput
        ref={ref}
        placeholderTextColor={color.text.secondary}
        selectionColor={color.purple[700]}
        cursorColor={color.purple[700]}
        verticalAlign="top"
        aria-disabled={disabled}
        aria-invalid={validationStatus === 'invalid'}
        aria-required={required}
        accessibilityState={{ disabled }}
        editable={resolvedEditable}
        readOnly={!resolvedEditable}
        multiline={multiline}
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[styles.input, style]}
      />
    );
  }
);

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
    fontWeight: `${theme.typography.mobile.bodyText.fontWeight}`,
    borderWidth: 0,
    outlineWidth: 0,
    _web: {
      width: '100%',
    },
  },
}));

export default TextareaField;
