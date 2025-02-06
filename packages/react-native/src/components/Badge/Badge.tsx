import React, { forwardRef } from 'react';
import type BadgeProps from './Badge.props';
import { StyleSheet } from 'react-native-unistyles';
import { View } from 'react-native';
import { BadgeContext } from './Badge.context';
import BadgeText from './BadgeText';

const Badge = forwardRef<View, BadgeProps>(({ children, ...props }, ref) => {
  const { colorScheme = 'blue', flatBase = false, style, ...rest } = props;

  const value = React.useMemo(() => ({ colorScheme, flatBase }), [colorScheme, flatBase]);

  const childIsText = typeof children === 'string' || typeof children === 'number';

  styles.useVariants({ colorScheme, flatBase });

  return (
    <BadgeContext.Provider value={value}>
      <View ref={ref} {...rest} style={[styles.container, style]}>
        {childIsText ? <BadgeText>{children}</BadgeText> : children}
      </View>
    </BadgeContext.Provider>
  );
});

Badge.displayName = 'Badge';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: theme.components.badge.paddingHorizontal,
    borderRadius: theme.components.badge.borderRadius,
    paddingVertical: theme.components.badge.paddingVertical,
    gap: theme.components.badge.gap,
    variants: {
      colorScheme: {
        blue: {
          backgroundColor: theme.components.badge.blue.backgroundColor,
        },
        red: {
          backgroundColor: theme.components.badge.red.backgroundColor,
        },
        green: {
          backgroundColor: theme.components.badge.green.backgroundColor,
        },
        orange: {
          backgroundColor: theme.components.badge.orange.backgroundColor,
        },
        grey: {
          backgroundColor: theme.components.badge.grey.backgroundColor,
        },
      },
      flatBase: {
        true: {
          borderBottomLeftRadius: theme.components.badge.flatBase.borderRadiusBottomLeft,
          borderBottomRightRadius: theme.components.badge.flatBase.borderRadiusBottomRight,
        },
        false: {},
      },
    },
  },
}));

export default Badge;
