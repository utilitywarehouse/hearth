import React, { ElementRef, forwardRef } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { TextInputProps, TextInput } from 'react-native';
import { useInputContext } from './Input.context';
import { useTheme } from '../../hooks';

const InputField = forwardRef<ElementRef<typeof TextInput>, TextInputProps>(
  ({ style, ...props }, ref) => {
    const { disabled, focused = false } = useInputContext();
    styles.useVariants({ focused });
    const { components, color } = useTheme();

    return (
      <TextInput
        ref={ref}
        placeholderTextColor={components.input.colorPlaceholder}
        selectionColor={color.uwPurple}
        cursorColor={color.uwPurple}
        aria-disabled={disabled}
        {...props}
        style={[styles.input, style]}
      />
    );
  }
);

InputField.displayName = 'InputField';

const styles = StyleSheet.create(theme => ({
  input: {
    flex: 1,
    width: 'auto',
    borderRadius: theme.components.input.borderRadius,
    color: theme.components.text.color,
    fontSize: theme.typography.mobile.bodyText.md.fontSize,
    fontFamily: theme.typography.mobile.bodyText.fontFamily,
    fontWeight: theme.typography.mobile.bodyText.fontWeight,
    lineHeight: theme.typography.mobile.bodyText.md.lineHeight,
    variants: {
      focused: {
        true: {
          borderWidth: 0,
        },
      },
    },
    _web: {
      width: '100%',
    },
  },
}));

export default InputField;
