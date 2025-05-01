import React, { ElementRef, forwardRef } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { TextInputProps, TextInput } from 'react-native';
import { useTextareaContext } from './Textarea.context';
import { useTheme } from '../../hooks';

const TextareaField = forwardRef<ElementRef<typeof TextInput>, TextInputProps>(
  ({ style, ...props }, ref) => {
    const { disabled } = useTextareaContext();
    const { components, color } = useTheme();

    return (
      <TextInput
        ref={ref}
        placeholderTextColor={components.input.placeholderColor}
        selectionColor={color.purple[700]}
        cursorColor={color.purple[700]}
        verticalAlign="top"
        aria-disabled={disabled}
        {...props}
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
    color: theme.components.text.color,
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
