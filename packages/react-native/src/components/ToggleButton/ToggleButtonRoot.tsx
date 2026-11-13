import { useState } from 'react';
import { GestureResponderEvent, Platform, Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { ToggleGroupType } from '../ToggleGroup/ToggleGroup.utils';
import type { ToggleButtonProps } from './ToggleButton.props';

interface ToggleButtonRootProps extends ToggleButtonProps {
  /** The type of the enclosing `ToggleGroup`, if any. Sets the button's accessibility role. */
  groupType?: ToggleGroupType;
}

const ToggleButtonRoot = ({
  children,
  onToggle,
  toggled,
  groupType,
  accessibilityRole = 'button',
  onPress,
  onPressIn,
  onPressOut,
  ...props
}: ToggleButtonRootProps) => {
  // In a single-select group the buttons behave as radios, matching Radix's `ToggleGroup` in
  // the React package. Otherwise they are pressed/unpressed toggle buttons.
  const isRadio = groupType === 'single';
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
      accessibilityRole={isRadio ? 'radio' : accessibilityRole}
      {...props}
      accessibilityState={{
        ...props.accessibilityState,
        ...(isRadio ? { checked: toggled } : { selected: toggled }),
      }}
      // react-native-web ignores `accessibilityState`, so expose the state as ARIA on web.
      {...(Platform.OS === 'web'
        ? ((isRadio ? { 'aria-checked': !!toggled } : { 'aria-pressed': !!toggled }) as object)
        : null)}
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
        true: {
          opacity: theme.opacity.disabled,
        },
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
