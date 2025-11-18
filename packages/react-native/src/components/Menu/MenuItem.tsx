import { createPressable } from '@gluestack-ui/pressable';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { Icon } from '../Icon';
import { useMenuContext } from './Menu.context';
import type MenuItemProps from './MenuItem.props';

const MenuItemRoot = ({
  icon,
  iconPosition = 'left',
  text,
  colorScheme = 'functional',
  disabled = false,
  onPress,
  states = {},
  ...props
}: MenuItemProps & { states?: { active?: boolean; disabled?: boolean } }) => {
  const { active } = states;
  const { close } = useMenuContext();

  styles.useVariants({ colorScheme, disabled, iconPosition, active });

  const handlePress = (event: any) => {
    if (disabled) return;
    onPress?.(event);
    close();
  };

  return (
    <Pressable
      {...props}
      onPress={handlePress}
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

const MenuItem = createPressable({ Root: MenuItemRoot });

MenuItem.displayName = 'MenuItem';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.components.menu.item.padding,
    paddingHorizontal: theme.components.menu.mobile.item.padding,
    gap: theme.components.menu.item.gap,
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
        false: {},
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
        functional: {
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.functional.surface.subtle.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.functional.surface.subtle.active,
            },
          },
        },
        destructive: {
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
    },
    compoundVariants: [
      {
        colorScheme: 'destructive',
        active: true,
        styles: {
          backgroundColor: theme.color.interactive.destructive.surface.subtle.active,
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
