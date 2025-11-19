import React from 'react';
import { Pressable, PressableProps, Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import { BodyText } from '../BodyText';

export interface PillProps extends Omit<PressableProps, 'children'> {
  label: string;
  icon?: React.ComponentType<any>;
  selected?: boolean;
}

export const Pill = ({ label, icon, selected = false, ...props }: PillProps) => {
  styles.useVariants({ selected });

  return (
    <Pressable style={styles.pill} {...props}>
      {icon && <Icon as={icon} size="sm" color={selected ? 'textInverted' : 'textPrimary'} />}
      <BodyText weight="semibold" inverted={selected}>
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
    paddingVertical: theme.components.pill.paddingVertical,
    borderRadius: theme.components.pill.borderRadius,
    borderWidth: theme.components.pill.borderWidth,
    borderColor: theme.color.interactive.neutral.border.subtle,
    backgroundColor: 'transparent',
    _web: {
      _hover: {
        backgroundColor: theme.color.interactive.neutral.surface.subtle.hover,
      },
      '_focus-visible': theme.helpers.focusVisible,
      _active: {
        backgroundColor: theme.color.interactive.neutral.surface.subtle.active,
      },
    },
    variants: {
      selected: {
        true: {
          backgroundColor: theme.color.interactive.brand.surface.strong.default,
          borderColor: theme.color.interactive.brand.surface.strong.default,
          _web: {
            _hover: {
              backgroundColor: theme.color.interactive.brand.surface.strong.hover,
              borderColor: theme.color.interactive.brand.surface.strong.hover,
            },
            _active: {
              backgroundColor: theme.color.interactive.brand.surface.strong.active,
              borderColor: theme.color.interactive.brand.surface.strong.active,
            },
          },
        },
      },
    },
  },
}));
