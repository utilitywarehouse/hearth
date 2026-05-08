import { createPressable } from '@gluestack-ui/pressable';
import type React from 'react';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { Icon } from '../Icon';
import type { PillProps } from './Pill.props';
import { usePillGroupContext } from './PillGroup.context';

const PillRoot = ({
  value,
  label,
  icon,
  states = {},
  ...props
}: PillProps & { states?: { active?: boolean } }) => {
  const { active } = states;
  const context = usePillGroupContext();
  const isSelected = context?.value.includes(value) ?? false;

  styles.useVariants({ selected: isSelected, active });

  const handlePress = () => {
    context?.onChange(value);
  };

  return (
    <Pressable
      {...props}
      style={styles.pill}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
      onPress={handlePress}
    >
      {icon && <Icon as={icon} size="sm" style={styles.icon} />}
      <BodyText weight="semibold" style={styles.text}>
        {label}
      </BodyText>
    </Pressable>
  );
};

export const Pill: React.ComponentType<React.ComponentProps<typeof PillRoot>> = createPressable({ Root: PillRoot }) as unknown as React.ComponentType<React.ComponentProps<typeof PillRoot>>;

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
