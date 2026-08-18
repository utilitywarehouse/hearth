import { useState } from 'react';
import { GestureResponderEvent, Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { Icon } from '../Icon';
import type { PillProps } from './Pill.props';
import { usePillGroupContext } from './PillGroup.context';

export const Pill = ({ value, label, icon, ...props }: PillProps) => {
  const [pressed, setPressed] = useState(false);
  const context = usePillGroupContext();
  const isSelected = context?.value.includes(value) ?? false;

  styles.useVariants({ selected: isSelected, active: pressed });

  const handlePress = () => {
    context?.onChange(value);
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
      style={styles.pill}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {icon && <Icon as={icon} size="sm" style={styles.icon} />}
      <BodyText weight="semibold" style={styles.text}>
        {label}
      </BodyText>
    </Pressable>
  );
};

Pill.displayName = 'Pill';

const styles = StyleSheet.create(theme => ({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: theme.components.pill.height,
    minWidth: theme.components.pill.minWidth,
    gap: theme.components.pill.gap,
    paddingHorizontal: theme.components.pill.paddingHorizontal,
    borderRadius: theme.components.pill.borderRadius,
    borderWidth: theme.components.pill.borderWidth,
    borderColor: theme.color.interactive.neutral.border.subtle,
    backgroundColor: 'transparent',
    _web: {
      _hover: {
        backgroundColor: theme.color.interactive.neutral.surface.subtle.hover,
      },
    },
    variants: {
      active: {
        true: {
          backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
        },
      },
      selected: {
        true: {
          backgroundColor: theme.color.interactive.brand.surface.strong.default,
          borderColor: theme.color.interactive.brand.surface.strong.default,
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.brand.surface.strong.hover,
              borderColor: theme.color.interactive.brand.surface.strong.hover,
            },
          },
        },
      },
    },
    compoundVariants: [
      {
        selected: true,
        active: true,
        styles: {
          backgroundColor: theme.color.interactive.brand.surface.strong.active,
          borderColor: theme.color.interactive.brand.surface.strong.active,
        },
      },
    ],
  },
  text: {
    variants: {
      selected: {
        true: {
          color: theme.color.text.inverted,
        },
        false: {
          color: theme.color.text.primary,
        },
      },
    },
  },
  icon: {
    variants: {
      selected: {
        true: {
          color: theme.color.icon.inverted,
        },
        false: {
          color: theme.color.icon.primary,
        },
      },
    },
  },
}));
