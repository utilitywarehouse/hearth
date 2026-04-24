import { useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BadgeContext } from './Badge.context';
import type BadgeProps from './Badge.props';
import BadgeIcon from './BadgeIcon';
import BadgeText from './BadgeText';

const Badge = ({ children, ...props }: BadgeProps) => {
  const {
    variant = 'subtle',
    icon,
    colorScheme = 'info',
    flatBase = false,
    size = 'sm',
    style,
    text,
    numberOfLines,
    ...rest
  } = props;

  const value = useMemo(
    () => ({ colorScheme, flatBase, variant, size }),
    [colorScheme, flatBase, variant, size]
  );

  const childIsText = typeof children === 'string' || typeof children === 'number' || !!text;

  styles.useVariants({ colorScheme, flatBase, variant, size });

  return (
    <BadgeContext.Provider value={value}>
      <View {...rest} style={[styles.container, style]}>
        {!!icon && <BadgeIcon as={icon} />}
        {childIsText ? (
          <BadgeText numberOfLines={numberOfLines}>{text ?? children}</BadgeText>
        ) : (
          children
        )}
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
    gap: theme.components.badge.gap,
    variants: {
      colorScheme: {
        info: {},
        danger: {},
        positive: {},
        warning: {},
        functional: {},
        energy: {},
        broadband: {},
        mobile: {},
        insurance: {},
        cashback: {},
        pig: {},
        highlight: {},
      },
      variant: {
        subtle: {},
        emphasis: {},
        outline: {
          borderWidth: theme.components.badge.outline.borderWidth,
          borderColor: theme.color.border.subtle,
        },
      },
      size: {
        sm: {
          paddingVertical: theme.components.badge.sm.paddingVertical,
          minHeight: theme.components.badge.sm.height,
        },
        md: {
          paddingVertical: theme.components.badge.md.paddingVertical,
          minHeight: theme.components.badge.md.height,
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
      // Emphasis
      {
        colorScheme: 'info',
        variant: 'emphasis',
        styles: {
          backgroundColor: theme.color.feedback.info.surface.default,
        },
      },
      {
        colorScheme: 'danger',
        variant: 'emphasis',
        styles: {
          backgroundColor: theme.color.feedback.danger.surface.default,
        },
      },
      {
        colorScheme: 'positive',
        variant: 'emphasis',
        styles: {
          backgroundColor: theme.color.feedback.positive.surface.default,
        },
      },
      {
        colorScheme: 'warning',
        variant: 'emphasis',
        styles: {
          backgroundColor: theme.color.feedback.warning.surface.default,
        },
      },
      {
        colorScheme: 'functional',
        variant: 'emphasis',
        styles: {
          backgroundColor: theme.color.feedback.functional.surface.default,
        },
      },
      {
        colorScheme: 'energy',
        variant: 'emphasis',
        styles: {
          backgroundColor: theme.color.surface.energy.default,
        },
      },
      {
        colorScheme: 'broadband',
        variant: 'emphasis',
        styles: {
          backgroundColor: theme.color.surface.broadband.default,
        },
      },
      {
        colorScheme: 'mobile',
        variant: 'emphasis',
        styles: {
          backgroundColor: theme.color.surface.mobile.default,
        },
      },
      {
        colorScheme: 'insurance',
        variant: 'emphasis',
        styles: {
          backgroundColor: theme.color.surface.insurance.default,
        },
      },
      {
        colorScheme: 'cashback',
        variant: 'emphasis',
        styles: {
          backgroundColor: theme.color.surface.cashback.default,
        },
      },
      {
        colorScheme: 'pig',
        variant: 'emphasis',
        styles: {
          backgroundColor: theme.color.surface.pig.default,
        },
      },
      // Subtle
      {
        colorScheme: 'info',
        variant: 'subtle',
        styles: {
          backgroundColor: theme.color.feedback.info.surface.subtle,
        },
      },
      {
        colorScheme: 'danger',
        variant: 'subtle',
        styles: {
          backgroundColor: theme.color.feedback.danger.surface.subtle,
        },
      },
      {
        colorScheme: 'positive',
        variant: 'subtle',
        styles: {
          backgroundColor: theme.color.feedback.positive.surface.subtle,
        },
      },
      {
        colorScheme: 'warning',
        variant: 'subtle',
        styles: {
          backgroundColor: theme.color.feedback.warning.surface.subtle,
        },
      },
      {
        colorScheme: 'functional',
        variant: 'subtle',
        styles: {
          backgroundColor: theme.color.feedback.functional.surface.subtle,
        },
      },
      {
        colorScheme: 'energy',
        variant: 'subtle',
        styles: {
          backgroundColor: theme.color.surface.energy.subtle,
        },
      },
      {
        colorScheme: 'broadband',
        variant: 'subtle',
        styles: {
          backgroundColor: theme.color.surface.broadband.subtle,
        },
      },
      {
        colorScheme: 'mobile',
        variant: 'subtle',
        styles: {
          backgroundColor: theme.color.surface.mobile.subtle,
        },
      },
      {
        colorScheme: 'insurance',
        variant: 'subtle',
        styles: {
          backgroundColor: theme.color.surface.insurance.subtle,
        },
      },
      {
        colorScheme: 'cashback',
        variant: 'subtle',
        styles: {
          backgroundColor: theme.color.surface.cashback.subtle,
        },
      },
      {
        colorScheme: 'pig',
        variant: 'subtle',
        styles: {
          backgroundColor: theme.color.surface.pig.subtle,
        },
      },
      {
        colorScheme: 'highlight',
        variant: 'subtle',
        styles: {
          backgroundColor: theme.color.surface.highlight.subtle,
        },
      },
      // Outline
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
