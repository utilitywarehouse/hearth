import { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { GestureResponderEvent, Pressable, ViewStyle } from 'react-native';
import type CheckboxProps from './Checkbox.props';
import { CheckboxContext } from './Checkbox.context';

const CheckboxRoot = ({
  children,
  style,
  disabled,
  checked,
  onPressIn,
  onPressOut,
  ...props
}: CheckboxProps & { checked?: boolean }) => {
  const [touchPressed, setTouchPressed] = useState(false);
  const active = touchPressed;

  styles.useVariants({ disabled });

  const value = useMemo(
    () => ({
      disabled,
      checked,
      active,
    }),
    [disabled, checked, active]
  );

  const handlePressIn = (event: GestureResponderEvent) => {
    setTouchPressed(true);
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    setTouchPressed(false);
    onPressOut?.(event);
  };

  return (
    <CheckboxContext.Provider value={value}>
      <Pressable
        accessibilityRole="checkbox"
        disabled={disabled}
        {...props}
        accessibilityState={{
          ...props.accessibilityState,
          checked: !!checked,
          disabled: !!disabled,
        }}
        aria-checked={!!checked}
        style={[styles.container, style as ViewStyle]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
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
