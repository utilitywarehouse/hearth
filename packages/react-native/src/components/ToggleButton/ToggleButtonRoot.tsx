import { useState } from 'react';
import { GestureResponderEvent, Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { ToggleButtonProps } from './ToggleButton.props';

const ToggleButtonRoot = ({
  children,
  onToggle,
  toggled,
  accessibilityRole = 'button',
  onPress,
  onPressIn,
  onPressOut,
  ...props
}: ToggleButtonProps) => {
  const [touchPressed, setTouchPressed] = useState(false);

  styles.useVariants({
    toggled,
    active: touchPressed,
    disabled: !!props.disabled,
  });

  const handlePress = (event: GestureResponderEvent) => {
    onPress?.(event);
    if (onToggle) {
      onToggle(!toggled);
    }
  };

  const handlePressIn = (event: GestureResponderEvent) => {
    setTouchPressed(true);
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    setTouchPressed(false);
    onPressOut?.(event);
  };

  return (
    <Pressable
      accessibilityRole={accessibilityRole}
      {...props}
      accessibilityState={{ ...props.accessibilityState, selected: toggled }}
      style={state => [
        styles.container,
        (typeof props.style === 'function' ? props.style(state) : props.style) as ViewStyle,
      ]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {children}
    </Pressable>
  );
};

ToggleButtonRoot.displayName = 'ToggleButtonRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: theme.components.toggleButton.borderWidth,
    borderRadius: theme.components.toggleButton.borderRadius,
    gap: theme.components.toggleButton.gap,
    minWidth: theme.components.toggleButton.minWidth,
    paddingHorizontal: theme.components.toggleButton.paddingHorizontal,
    paddingVertical:
      theme.components.toggleButton.paddingVertical - theme.components.toggleButton.borderWidth,
    borderColor: theme.color.interactive.neutral.border.subtle,
    height: theme.components.toggleButton.height,
    _web: {
      '_focus-visible': theme.helpers.focusVisible,
    },
    variants: {
      toggled: {
        true: {
          backgroundColor: theme.color.interactive.brand.surface.strong.default,
          borderColor: theme.color.interactive.brand.border.strong,
        },
      },
      active: {
        true: {
          backgroundColor: theme.color.interactive.brand.surface.strong.active,
        },
      },
      disabled: {
        true: {},
      },
    },
    compoundVariants: [
      {
        toggled: true,
        active: true,
        styles: {
          backgroundColor: theme.color.interactive.brand.surface.strong.active,
        },
      },
      {
        disabled: false,
        toggled: false,
        styles: {
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.neutral.surface.subtle.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
            },
          },
        },
      },
      {
        disabled: false,
        toggled: true,
        styles: {
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.brand.surface.strong.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.brand.surface.strong.active,
            },
          },
        },
      },
    ],
  },
}));

export default ToggleButtonRoot;
