import { useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BadgeContext } from './Badge.context';
import type BadgeProps from './Badge.props';
import BadgeIcon from './BadgeIcon';
import BadgeText from './BadgeText';

const Badge = ({ children, ...props }: BadgeProps) => {
  const { variant = 'solid', icon, colorScheme = 'info', flatBase = false, style, ...rest } = props;

  const value = useMemo(
    () => ({ colorScheme, flatBase, variant }),
    [colorScheme, flatBase, variant]
  );

  const childIsText = typeof children === 'string' || typeof children === 'number';

  styles.useVariants({ colorScheme, flatBase, variant });

  return (
    <BadgeContext.Provider value={value}>
      <View {...rest} style={[styles.container, style]}>
        {!!icon && <BadgeIcon as={icon} />}
        {childIsText ? <BadgeText>{children}</BadgeText> : children}
      </View>
    </BadgeContext.Provider>
  );
};

Badge.displayName = 'Badge';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: theme.components.badge.paddingHorizontal,
    borderRadius: theme.components.badge.borderRadius,
    paddingVertical: theme.components.badge.md.paddingVertical,
    gap: theme.components.badge.gap,
    variants: {
      colorScheme: {
        info: {},
        danger: {},
        positive: {},
        warning: {},
        functional: {},
      },
      variant: {
        solid: {},
        outline: {
          borderWidth: theme.components.badge.outline.borderWidth,
          borderColor: theme.color.border.subtle,
        },
      },
      flatBase: {
        true: {
          borderBottomLeftRadius: theme.components.badge.flatBase.borderBottomLeftRadius,
          borderBottomRightRadius: theme.components.badge.flatBase.borderBottomRightRadius,
        },
        false: {},
      },
    },
    compoundVariants: [
      {
        colorScheme: 'info',
        variant: 'solid',
        styles: {
          backgroundColor: theme.color.feedback.info.surface.default,
        },
      },
      {
        colorScheme: 'danger',
        variant: 'solid',
        styles: {
          backgroundColor: theme.color.feedback.danger.surface.default,
        },
      },
      {
        colorScheme: 'positive',
        variant: 'solid',
        styles: {
          backgroundColor: theme.color.feedback.positive.surface.default,
        },
      },
      {
        colorScheme: 'warning',
        variant: 'solid',
        styles: {
          backgroundColor: theme.color.feedback.warning.surface.default,
        },
      },
      {
        colorScheme: 'functional',
        variant: 'solid',
        styles: {
          backgroundColor: theme.color.feedback.functional.surface.default,
        },
      },
      {
        colorScheme: 'info',
        variant: 'outline',
        styles: {
          backgroundColor: 'transparent',
        },
      },
      {
        colorScheme: 'danger',
        variant: 'outline',
        styles: {
          backgroundColor: 'transparent',
        },
      },
      {
        colorScheme: 'positive',
        variant: 'outline',
        styles: {
          backgroundColor: 'transparent',
        },
      },
      {
        colorScheme: 'warning',
        variant: 'outline',
        styles: {
          backgroundColor: 'transparent',
        },
      },
      {
        colorScheme: 'functional',
        variant: 'outline',
        styles: {
          backgroundColor: 'transparent',
        },
      },
    ],
  },
}));

export default Badge;
