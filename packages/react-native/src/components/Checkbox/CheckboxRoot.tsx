import { useMemo } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Pressable, ViewStyle } from 'react-native';
import type CheckboxProps from './Checkbox.props';
import { CheckboxContext } from './Checkbox.context';
import { useCheckboxGroupContext } from './CheckboxGroup.context';

const CheckboxRoot = ({
  children,
  style,
  states,
  ...props
}: CheckboxProps & { states?: { disabled?: boolean; checked?: boolean; active?: boolean } }) => {
  const { disabled, checked, active } = states ?? {};

  const isDisabled = useCheckboxGroupContext()?.disabled ?? disabled;

  styles.useVariants({ disabled: isDisabled });

  const value = useMemo(
    () => ({
      disabled: isDisabled,
      checked,
      active,
    }),
    [isDisabled, checked, active]
  );

  return (
    <CheckboxContext.Provider value={value}>
      <Pressable {...props} style={[styles.container, style as ViewStyle]}>
        {children}
      </Pressable>
    </CheckboxContext.Provider>
  );
};

CheckboxRoot.displayName = 'CheckboxRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: theme.components.checkbox.gap,
    alignSelf: 'stretch',
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
    _web: {
      '_focus-visible': {
        outline: 'none',
      },
      '_focus-visible > div:nth-child(2)': {
        ...theme.helpers.focusVisible,
      },
    },
  },
}));

export default CheckboxRoot;
