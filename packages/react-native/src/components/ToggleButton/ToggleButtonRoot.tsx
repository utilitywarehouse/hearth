import { GestureResponderEvent, Pressable, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { ToggleButtonProps } from './ToggleButton.props';

const ButtonRoot = ({
  children,
  onToggle,
  toggled,
  states,
  onPress,
  ...props
}: ToggleButtonProps & { states?: { active?: boolean; disabled?: boolean } }) => {
  const { active } = states || {};

  styles.useVariants({
    toggled,
    active,
  });

  const handlePress = (e: GestureResponderEvent) => {
    onPress?.(e);
    if (onToggle) {
      onToggle(!toggled);
    }
  };

  return (
    <Pressable
      {...props}
      accessibilityState={{ selected: toggled, ...props.accessibilityState }}
      style={[styles.container, props.style as ViewStyle]}
      onPress={handlePress}
    >
      {children}
    </Pressable>
  );
};

ButtonRoot.displayName = 'ButtonRoot';

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
      // '_focus-visible': theme.helpers.focusVisible,
      _hover: {
        backgroundColor: theme.color.interactive.neutral.surface.subtle.hover,
      },
      _active: {
        backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
      },
    },
    variants: {
      toggled: {
        true: {
          backgroundColor: theme.color.interactive.brand.surface.strong.default,
          borderColor: theme.color.interactive.brand.border.strong,
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
      active: {
        true: {
          backgroundColor: theme.color.interactive.brand.surface.strong.active,
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
    ],
  },
}));

export default ButtonRoot;
