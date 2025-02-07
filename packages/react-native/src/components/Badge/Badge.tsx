import React, { forwardRef } from 'react';
import type BadgeProps from './Badge.props';
import { StyleSheet } from 'react-native-unistyles';
import { View } from 'react-native';
import { BadgeContext } from './Badge.context';
import BadgeText from './BadgeText';

const Badge = forwardRef<View, BadgeProps>(({ children, ...props }, ref) => {
  const { variant = 'solid', colorScheme = 'blue', flatBase = false, style, ...rest } = props;

  const value = React.useMemo(
    () => ({ colorScheme, flatBase, variant }),
    [colorScheme, flatBase, variant]
  );

  const childIsText = typeof children === 'string' || typeof children === 'number';

  styles.useVariants({ colorScheme, flatBase, variant });

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
        blue: {},
        red: {},
        green: {},
        orange: {},
        grey: {},
      },
      variant: {
        solid: {},
        outline: {
          borderWidth: theme.components.badge.outline.borderWidth,
          borderColor: theme.components.badge.outline.borderColor,
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
        colorScheme: 'blue',
        variant: 'solid',
        styles: {
          backgroundColor: theme.components.badge.solid.blue.backgroundColor,
        },
      },
      {
        colorScheme: 'red',
        variant: 'solid',
        styles: {
          backgroundColor: theme.components.badge.solid.red.backgroundColor,
        },
      },
      {
        colorScheme: 'green',
        variant: 'solid',
        styles: {
          backgroundColor: theme.components.badge.solid.green.backgroundColor,
        },
      },
      {
        colorScheme: 'orange',
        variant: 'solid',
        styles: {
          backgroundColor: theme.components.badge.solid.orange.backgroundColor,
        },
      },
      {
        colorScheme: 'grey',
        variant: 'solid',
        styles: {
          backgroundColor: theme.components.badge.solid.grey.backgroundColor,
        },
      },
      {
        colorScheme: 'blue',
        variant: 'outline',
        styles: {
          backgroundColor: 'transparent',
        },
      },
      {
        colorScheme: 'red',
        variant: 'outline',
        styles: {
          backgroundColor: 'transparent',
        },
      },
      {
        colorScheme: 'green',
        variant: 'outline',
        styles: {
          backgroundColor: 'transparent',
        },
      },
      {
        colorScheme: 'orange',
        variant: 'outline',
        styles: {
          backgroundColor: 'transparent',
        },
      },
      {
        colorScheme: 'grey',
        variant: 'outline',
        styles: {
          backgroundColor: 'transparent',
        },
      },
    ],
  },
}));

export default Badge;
