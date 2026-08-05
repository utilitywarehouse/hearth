import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { forwardRef } from 'react';
import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import { useInputContext } from './Input.context';
import InputProps from './Input.props';

const InputField = forwardRef<
  RNTextInput,
  TextInputProps & { inBottomSheet?: boolean; type?: InputProps['type'] }
>(({ style, inBottomSheet = false, type, onFocus, onBlur, editable, ...props }, ref) => {
  const {
    disabled,
    readonly,
    focused = false,
    type: contextType,
    validationStatus,
    required,
    setFocused,
  } = useInputContext();
  const resolvedType = type ?? contextType;
  styles.useVariants({ focused, type: resolvedType });
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

  if (inBottomSheet) {
    return (
      <BottomSheetTextInput
        ref={ref as any}
        placeholderTextColor={color.text.secondary}
        selectionColor={color.surface.brand.default}
        cursorColor={color.surface.brand.default}
        verticalAlign="middle"
        aria-disabled={disabled}
        secureTextEntry={resolvedType === 'password'}
        aria-invalid={validationStatus === 'invalid'}
        aria-required={required}
        accessibilityState={{ disabled }}
        editable={resolvedEditable}
        readOnly={!resolvedEditable}
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={[styles.input, style]}
      />
    );
  }

  return (
    <RNTextInput
      ref={ref}
      placeholderTextColor={color.text.secondary}
      selectionColor={color.surface.brand.default}
      cursorColor={color.surface.brand.default}
      verticalAlign="middle"
      aria-disabled={disabled}
      secureTextEntry={resolvedType === 'password'}
      aria-invalid={validationStatus === 'invalid'}
      aria-required={required}
      accessibilityState={{ disabled }}
      editable={resolvedEditable}
      readOnly={!resolvedEditable}
      {...props}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={[styles.input, style]}
    />
  );
});

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
    fontWeight: `${theme.typography.mobile.bodyText.fontWeight}`,
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
      '_focus-visible': {
        outlineColor: 'transparent',
      },
    },
  },
}));

export default InputField;
