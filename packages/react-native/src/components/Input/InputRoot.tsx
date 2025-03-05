import React, { forwardRef, useMemo } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { View } from 'react-native';
import InputProps from './Input.props';
import { InputContext } from './Input.context';

const InputRoot = forwardRef<
  View,
  InputProps & { states?: { focus?: boolean; disabled?: boolean; readonly?: boolean } }
>(({ children, style, states, validationStatus, ...props }, ref) => {
  const { focus = false, disabled = false, readonly = false } = states || {};
  styles.useVariants({ validationStatus, focus, disabled, readonly });

  const value = useMemo(
    () => ({ focused: focus, disabled, readonly, validationStatus }),
    [focus, disabled, readonly, validationStatus]
  );

  return (
    <InputContext.Provider value={value}>
      <View ref={ref} {...props} style={[styles.container, style]}>
        {children}
      </View>
    </InputContext.Provider>
  );
});

InputRoot.displayName = 'InputRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    borderWidth: theme.components.input.borderWidth,
    borderColor: theme.components.input.borderColor,
    height: 48,
    borderRadius: theme.components.input.borderRadius,
    flexDirection: 'row',
    overflow: 'hidden',
    alignContent: 'center',
    paddingHorizontal: theme.components.input.paddingHorizontal,
    backgroundColor: theme.components.input.backgroundColor,
    gap: theme.components.input.gap,
    variants: {
      focus: {
        true: {
          borderWidth: theme.components.input.borderWidthFocused,
          marginHorizontal: -theme.components.input.borderWidthFocused / 2,
        },
      },
      validationStatus: {
        invalid: {
          borderColor: theme.components.input.borderColorInvalid,
        },
        valid: {
          borderColor: theme.components.input.borderColorValid,
        },
        initial: {},
      },
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
      readonly: {
        true: {
          borderColor: theme.components.input.borderColorReadOnly,
        },
      },
    },
  },
}));

export default InputRoot;
