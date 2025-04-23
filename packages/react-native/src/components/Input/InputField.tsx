import React, { ElementRef, forwardRef, useEffect, useCallback } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import {
  TextInputProps,
  TextInput as RNTextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { useInputContext } from './Input.context';
import { useTheme } from '../../hooks';
import { BottomSheetTextInput, useBottomSheetInternal } from '@gorhom/bottom-sheet';

export type InputRef = ElementRef<typeof RNTextInput> | ElementRef<typeof BottomSheetTextInput>;

const InputField = forwardRef<InputRef, TextInputProps>(
  ({ style, onFocus, onBlur, ...props }, ref) => {
    const { disabled, focused = false, type } = useInputContext();
    styles.useVariants({ focused, type });
    const { components, color } = useTheme();

    // Copied from @gorhom/bottom-sheet BottomSheetTextInput
    const bottomSheetContext = useBottomSheetInternal(true);

    const handleOnFocus = useCallback(
      (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (bottomSheetContext) {
          bottomSheetContext.shouldHandleKeyboardEvents.value = true;
        }
        if (onFocus) {
          onFocus(args);
        }
      },
      [onFocus, bottomSheetContext?.shouldHandleKeyboardEvents]
    );
    const handleOnBlur = useCallback(
      (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (bottomSheetContext) {
          bottomSheetContext.shouldHandleKeyboardEvents.value = false;
        }
        if (onBlur) {
          onBlur(args);
        }
      },
      [onBlur, bottomSheetContext?.shouldHandleKeyboardEvents]
    );

    useEffect(() => {
      return () => {
        // Reset the flag on unmount
        if (bottomSheetContext) {
          bottomSheetContext.shouldHandleKeyboardEvents.value = false;
        }
      };
    }, [bottomSheetContext?.shouldHandleKeyboardEvents]);
    // End of copied code

    return (
      <RNTextInput
        ref={ref as React.Ref<ElementRef<typeof RNTextInput>>}
        placeholderTextColor={components.input.placeholderColor}
        selectionColor={color.purple[300]}
        cursorColor={color.purple[300]}
        verticalAlign="middle"
        aria-disabled={disabled}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
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
    alignSelf: 'stretch',
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.components.text.color,
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
        currency: {
          fontSize: theme.typography.mobile.detailText['4xl'].fontSize,
          fontFamily: theme.typography.mobile.detailText.fontFamily,
          fontWeight: theme.typography.mobile.detailText.fontWeight,
          paddingTop: 0,
          paddingBottom: 0,
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
