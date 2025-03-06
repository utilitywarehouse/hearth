import React, { ElementRef, forwardRef } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { TextInputProps, TextInput, Platform } from 'react-native';
import { useInputContext } from './Input.context';
import { useTheme } from '../../hooks';

const InputField = forwardRef<ElementRef<typeof TextInput>, TextInputProps>(
  ({ style, ...props }, ref) => {
    const { disabled, focused = false, type } = useInputContext();
    styles.useVariants({ focused, type });
    const { components, color } = useTheme();

    return (
      <TextInput
        ref={ref}
        placeholderTextColor={components.input.colorPlaceholder}
        selectionColor={color.uwPurple}
        cursorColor={color.uwPurple}
        verticalAlign="middle"
        textAlignVertical="center"
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
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.components.text.color,
    fontSize: theme.typography.mobile.bodyText.md.fontSize,
    fontFamily: theme.typography.mobile.bodyText.fontFamily,
    fontWeight: theme.typography.mobile.bodyText.fontWeight,
    variants: {
      focused: {
        true: {
          borderWidth: 0,
        },
      },
      type: {
        text: {},
        password: {},
        search: {},
        currency: {
          fontSize: theme.typography.mobile.detailText['4xl'].fontSize,
          fontFamily: theme.typography.mobile.detailText.fontFamily,
          fontWeight: theme.typography.mobile.detailText.fontWeight,
          paddingTop: 0,
          paddingBottom: 0,
          textAlignVertical: 'center',
          // todo: fix this
          ...(Platform.OS === 'android' && { height: 37, marginTop: 5 }),
          ...(Platform.OS === 'ios' && { marginTop: -3 }),
        },
        date: {},
      },
    },
    _web: {
      width: '100%',
    },
  },
}));

export default InputField;
