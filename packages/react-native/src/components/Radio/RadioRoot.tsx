import { useMemo, useState } from 'react';
import { GestureResponderEvent, Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { RadioContext } from './Radio.context';
import type RadioProps from './Radio.props';

const RadioRoot = ({
  children,
  style,
  disabled,
  checked,
  onPressIn,
  onPressOut,
  ...props
}: RadioProps & { checked?: boolean }) => {
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
    <RadioContext.Provider value={value}>
      <Pressable
        accessibilityRole="radio"
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
    </RadioContext.Provider>
  );
};

RadioRoot.displayName = 'RadioRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: theme.components.radio.gap,
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

export default RadioRoot;
