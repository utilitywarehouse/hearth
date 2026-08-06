import { useMemo, useState } from 'react';
import { GestureResponderEvent, Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { UnstyledIconButtonContext } from './UnstyledIconButton.context';
import type { UnstyledIconButtonProps } from './UnstyledIconButton.props';

const UnstyledIconButtonRoot = ({
  size,
  inverted,
  disabled,
  pressed,
  onPressIn,
  onPressOut,
  ...props
}: UnstyledIconButtonProps) => {
  const [touchPressed, setTouchPressed] = useState(false);
  const active = pressed || touchPressed;
  styles.useVariants({ disabled, size });
  const value = useMemo(
    () => ({ disabled, active, inverted, size }),
    [disabled, active, inverted, size]
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
    <UnstyledIconButtonContext.Provider value={value}>
      <Pressable
        disabled={disabled}
        {...props}
        accessibilityState={{ disabled: !!disabled, ...props.accessibilityState }}
        style={[styles.container, props.style as ViewStyle]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      />
    </UnstyledIconButtonContext.Provider>
  );
};

UnstyledIconButtonRoot.displayName = 'UnstyledIconButtonRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.sm,
    _web: {
      '_focus-visible': theme.helpers.focusVisible,
    },
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
      size: {
        sm: {
          width: theme.components.iconButton.unstyled.sm.width,
          height: theme.components.iconButton.unstyled.sm.height,
        },
        md: {
          width: theme.components.iconButton.unstyled.md.width,
          height: theme.components.iconButton.unstyled.md.height,
        },
      },
    },
  },
}));

export default UnstyledIconButtonRoot;
