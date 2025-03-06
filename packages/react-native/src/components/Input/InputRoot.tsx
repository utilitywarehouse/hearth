import React, { forwardRef, useMemo } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { View } from 'react-native';
import InputProps from './Input.props';
import { InputContext } from './Input.context';

const InputRoot = forwardRef<
  View,
  InputProps & { states?: { focus?: boolean; disabled?: boolean; readonly?: boolean } }
>(({ children, style, states, validationStatus, type, ...props }, ref) => {
  const { focus = false, disabled = false, readonly = false } = states || {};
  styles.useVariants({ validationStatus, focus, disabled, readonly, type });

  const value = useMemo(
    () => ({ focused: focus, disabled, readonly, validationStatus, type }),
    [focus, disabled, readonly, validationStatus, type]
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
    borderColor: theme.components.input.borderColor,
    height: theme.components.input.height,
    borderRadius: theme.components.input.borderRadius,
    flexDirection: 'row',
    overflow: 'hidden',
    alignContent: 'center',
    paddingHorizontal: theme.components.input.paddingHorizontal,
    paddingVertical: theme.components.input.paddingVertical,
    backgroundColor: theme.components.input.backgroundColor,
    gap: theme.components.input.gap,
    outlineStyle: 'solid',
    outlineWidth: theme.components.input.borderWidth,
    outlineColor: theme.components.input.borderColor,
    variants: {
      focus: {
        true: {
          outlineWidth: theme.components.input.borderWidthFocused,
        },
      },
      validationStatus: {
        invalid: {
          borderColor: theme.components.input.borderColorInvalid,
          outlineColor: theme.components.input.borderColorInvalid,
        },
        valid: {
          borderColor: theme.components.input.borderColorValid,
          outlineColor: theme.components.input.borderColorValid,
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
      type: {
        text: {},
        password: {},
        search: {},
        currency: {
          height: theme.components.input.currency.height,
          gap: theme.components.input.currency.gap,
        },
        date: {},
      },
    },
  },
}));

export default InputRoot;
