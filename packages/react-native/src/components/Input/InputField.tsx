import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { useCallback, useEffect } from 'react';
import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import { useInputContext } from './Input.context';

const InputField = ({ style, onFocus, onBlur, ...props }: TextInputProps) => {
  const { disabled, focused = false, type } = useInputContext();
  styles.useVariants({ focused, type });
  const { color } = useTheme();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [onBlur, bottomSheetContext?.shouldHandleKeyboardEvents]
  );

  useEffect(() => {
    return () => {
      // Reset the flag on unmount
      if (bottomSheetContext) {
        bottomSheetContext.shouldHandleKeyboardEvents.value = false;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottomSheetContext?.shouldHandleKeyboardEvents]);
  // End of copied code

  return (
    <RNTextInput
      placeholderTextColor={color.text.secondary}
      selectionColor={color.purple[700]}
      cursorColor={color.purple[700]}
      verticalAlign="middle"
      aria-disabled={disabled}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
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
