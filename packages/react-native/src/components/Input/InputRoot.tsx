import { useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { InputContext } from './Input.context';
import InputProps from './Input.props';

const InputRoot = ({
  children,
  style,
  states,
  validationStatus,
  type,
  ...props
}: InputProps & { states?: { focus?: boolean; disabled?: boolean; readonly?: boolean } }) => {
  const { focus = false, disabled = false, readonly = false } = states || {};
  styles.useVariants({ validationStatus, focus, disabled, readonly, type });

  const value = useMemo(
    () => ({ focused: focus, disabled, readonly, validationStatus, type }),
    [focus, disabled, readonly, validationStatus, type]
  );

  return (
    <InputContext.Provider value={value}>
      <View {...props} style={[styles.container, style]}>
        {children}
      </View>
    </InputContext.Provider>
  );
};

InputRoot.displayName = 'InputRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    borderColor: theme.color.border.strong,
    height: theme.components.input.height,
    borderRadius: theme.components.input.borderRadius,
    flexDirection: 'row',
    overflow: 'hidden',
    alignContent: 'center',
    paddingHorizontal: theme.components.input.paddingHorizontal,
    backgroundColor: theme.color.surface.neutral.strong,
    gap: theme.components.input.gap,
    outlineStyle: 'solid',
    outlineWidth: theme.components.input.borderWidth,
    outlineColor: theme.color.border.strong,
    variants: {
      focus: {
        true: {
          outlineWidth: theme.components.input.borderWidthFocused,
        },
      },
      validationStatus: {
        invalid: {
          borderColor: theme.color.feedback.danger.border,
          outlineColor: theme.color.feedback.danger.border,
        },
        valid: {
          borderColor: theme.color.feedback.positive.border,
          outlineColor: theme.color.feedback.positive.border,
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
          borderColor: theme.color.border.subtle,
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
