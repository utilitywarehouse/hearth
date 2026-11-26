import { useState } from 'react';
import { GestureResponderEvent, Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { Icon } from '../Icon';
import { useMenuContext } from './Menu.context';
import type MenuItemProps from './MenuItem.props';

const MenuItem = ({
  icon,
  iconPosition = 'left',
  text,
  colorScheme = 'functional',
  disabled = false,
  onPress,
  ...props
}: MenuItemProps) => {
  const [pressed, setPressed] = useState(false);
  const { close } = useMenuContext();

  styles.useVariants({ colorScheme, disabled, iconPosition, active: pressed });

  const handlePress = (event: any) => {
    if (disabled) return;
    onPress?.(event);
    close();
  };

  const handlePressIn = (e: GestureResponderEvent) => {
    props.onPressIn?.(e);
    setPressed(true);
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    props.onPressOut?.(e);
    setPressed(false);
  };

  return (
    <Pressable
      {...props}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={styles.container}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      {!!icon && <Icon as={icon} style={styles.icon} />}
      <BodyText size="lg" style={styles.text}>
        {text}
      </BodyText>
    </Pressable>
  );
};

MenuItem.displayName = 'MenuItem';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.components.menu.item.padding,
    paddingHorizontal: theme.components.menu.mobile.item.padding,
    gap: theme.components.menu.item.gap,
    borderRadius: theme.components.menu.item.borderRadius,
    variants: {
      active: {
        true: {
          backgroundColor: theme.color.interactive.functional.surface.subtle.active,
        },
      },
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
          cursor: 'auto',
        },
        false: {
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.functional.surface.subtle.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.functional.surface.subtle.active,
            },
          },
        },
      },
      iconPosition: {
        left: {
          flexDirection: 'row',
        },
        right: {
          flexDirection: 'row-reverse',
        },
      },
      colorScheme: {
        functional: {},
        destructive: {},
      },
    },
    compoundVariants: [
      {
        colorScheme: 'destructive',
        active: true,
        styles: {
          backgroundColor: theme.color.interactive.destructive.surface.subtle.active,
        },
      },
      {
        colorScheme: 'destructive',
        disabled: false,
        styles: {
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.destructive.surface.subtle.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.destructive.surface.subtle.active,
            },
          },
        },
      },
    ],
  },
  text: {
    flex: 1,
    variants: {
      colorScheme: {
        functional: {
          color: theme.color.text.primary,
        },
        destructive: {
          color: theme.color.interactive.destructive.foreground.subtle,
        },
      },
    },
  },
  icon: {
    variants: {
      colorScheme: {
        functional: {
          color: theme.color.icon.primary,
        },
        destructive: {
          color: theme.color.interactive.destructive.foreground.subtle,
        },
      },
    },
  },
}));

export default MenuItem;
