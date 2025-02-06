import React, { forwardRef } from 'react';

import { Text } from 'react-native';
import type { TextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { useBadgeContext } from './Badge.context';

const BadgeText = forwardRef<Text, TextProps>(({ children, style, ...props }, ref) => {
  const { variant, colorScheme } = useBadgeContext();
  styles.useVariants({ variant, colorScheme });
  return (
    <BodyText ref={ref} {...props} size="sm" style={[styles.text, style]}>
      {children}
    </BodyText>
  );
});

BadgeText.displayName = 'BadgeText';

const styles = StyleSheet.create(theme => ({
  text: {
    variants: {
      colorScheme: {
        blue: {},
        red: {},
        green: {},
        orange: {},
        grey: {},
      },
      variant: {
        solid: {
          color: theme.components.badge.solid.color,
        },
        outline: {},
      },
    },
    compoundVariants: [
      {
        colorScheme: 'blue',
        variant: 'outline',
        styles: {
          color: theme.components.badge.outline.blue.color,
        },
      },
      {
        colorScheme: 'red',
        variant: 'outline',
        styles: {
          color: theme.components.badge.outline.red.color,
        },
      },
      {
        colorScheme: 'green',
        variant: 'outline',
        styles: {
          color: theme.components.badge.outline.green.color,
        },
      },
      {
        colorScheme: 'orange',
        variant: 'outline',
        styles: {
          color: theme.components.badge.outline.orange.color,
        },
      },
      {
        colorScheme: 'grey',
        variant: 'outline',
        styles: {
          color: theme.components.badge.outline.grey.color,
        },
      },
    ],
  },
}));

export default BadgeText;
