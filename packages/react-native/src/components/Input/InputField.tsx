import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import {
  findNodeHandle,
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import { useInputContext } from './Input.context';

const InputField = ({
  style,
  onFocus,
  onBlur,
  ref,
  ...props
}: TextInputProps & { ref?: React.Ref<TextInput> }) => {
  const { disabled, focused = false, type } = useInputContext();
  styles.useVariants({ focused, type });
  const { color } = useTheme();

  // Copied from @gorhom/bottom-sheet BottomSheetTextInput
  //#region refs
  const inputRef = useRef<TextInput>(null);
  //#endregion

  //#region hooks
  const { animatedKeyboardState } = useBottomSheetInternal();
  //#endregion

  //#region callbacks
  const handleOnFocus = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      const keyboardState = animatedKeyboardState.get();
      animatedKeyboardState.set({
        ...keyboardState,
        target: args.nativeEvent.target,
      });
      if (onFocus) {
        onFocus(args);
      }
    },
    [onFocus, animatedKeyboardState]
  );
  const handleOnBlur = useCallback(
    (args: NativeSyntheticEvent<TextInputFocusEventData>) => {
      /**
       * remove the keyboard state target if it belong
       * to the current component.
       */
      const keyboardState = animatedKeyboardState.get();
      if (keyboardState.target === args.nativeEvent.target) {
        animatedKeyboardState.set({
          ...keyboardState,
          target: undefined,
        });
      }
      if (onBlur) {
        onBlur(args);
      }
    },
    [onBlur, animatedKeyboardState]
  );
  //#endregion

  //#region effects
  useEffect(() => {
    return () => {
      /**
       * remove the keyboard state target if it belong
       * to the current component.
       */
      const componentNode = findNodeHandle(inputRef.current);
      const keyboardState = animatedKeyboardState.get();
      if (keyboardState.target === componentNode) {
        animatedKeyboardState.set({
          ...keyboardState,
          target: undefined,
        });
      }
    };
  }, [animatedKeyboardState]);
  // @ts-expect-error - type
  useImperativeHandle(ref, () => inputRef?.current, []);
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
