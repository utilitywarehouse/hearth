import React, { forwardRef } from 'react';
import type BadgeProps from './Badge.props';
import { StyleSheet } from 'react-native-unistyles';
import { View } from 'react-native';
import { BadgeContext } from './Badge.context';
import BadgeText from './BadgeText';

const Badge = forwardRef<View, BadgeProps>(({ children, ...props }, ref) => {
  const {
    colorScheme = 'cyan',
    size = 'large',
    strong = false,
    borderless = false,
    style,
    ...rest
  } = props;

  const value = React.useMemo(
    () => ({ colorScheme, size, borderless, strong }),
    [colorScheme, size, borderless, strong]
  );

  const childIsText = typeof children === 'string' || typeof children === 'number';

  styles.useVariants({ colorScheme, strong, size, borderless });

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
    paddingHorizontal: theme.space[200],
    borderRadius: theme.borderRadius[200],
    paddingVertical: theme.space[100],
    alignSelf: 'flex-start',
    gap: theme.space[200],
    variants: {
      colorScheme: {
        cyan: {
          backgroundColor: theme.colors.blue[700],
        },
        red: {
          backgroundColor: theme.colors.red[700],
        },
        green: {
          backgroundColor: theme.colors.green[700],
        },
        gold: {
          backgroundColor: theme.colors.orange[700],
        },
        grey: {
          backgroundColor: theme.colors.grey[700],
        },
      },
      borderless: {
        true: {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
        false: {},
      },
      strong: {
        true: {},
        false: {},
      },
      size: {
        small: {
          paddingVertical: theme.space[25],
        },
        large: {
          paddingVertical: theme.space[200],
        },
      },
    },
    compoundVariants: [
      {
        colorScheme: 'cyan',
        strong: true,
        styles: { backgroundColor: theme.colors.blue[700] },
      },
      {
        colorScheme: 'red',
        strong: true,
        styles: { backgroundColor: theme.colors.red[700] },
      },
      {
        colorScheme: 'green',
        strong: true,
        styles: { backgroundColor: theme.colors.green[700] },
      },
      {
        colorScheme: 'gold',
        strong: true,
        styles: { backgroundColor: theme.colors.orange[700] },
      },
      {
        colorScheme: 'grey',
        strong: true,
        styles: { backgroundColor: theme.colors.grey[700] },
      },
    ],
  },
}));

export default Badge;
