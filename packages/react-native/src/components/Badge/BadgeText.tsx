import React, { forwardRef } from 'react';

import { Text } from 'react-native';
import type { TextProps, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useBadgeContext } from './Badge.context';

const BadgeText = forwardRef<Text, TextProps>(({ children, style, ...props }, ref) => {
  const { colorScheme, strong } = useBadgeContext();
  styles.useVariants({ colorScheme, strong });
  return (
    <Text ref={ref} {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
});

BadgeText.displayName = 'BadgeText';

const styles = StyleSheet.create(theme => ({
  text: {
    fontSize: theme.fontSize[200],
    fontWeight: theme.fontWeights.regular as TextStyle['fontWeight'],
    lineHeight: theme.lineHeight[400],
    fontFamily: theme.fontFamily.body,
    variants: {
      colorScheme: {
        cyan: {
          color: theme.colors.blue[50],
        },
        red: {
          color: theme.colors.blue[50],
        },
        green: {
          color: theme.colors.blue[50],
        },
        gold: {
          color: theme.colors.blue[50],
        },
        grey: {
          color: theme.colors.blue[50],
        },
      },
      strong: {
        true: {},
      },
    },
    compoundVariants: [
      {
        colorScheme: 'cyan',
        strong: true,
        styles: { color: theme.colors.blue[50] },
      },
      {
        colorScheme: 'red',
        strong: true,
        styles: { color: theme.colors.blue[50] },
      },
      {
        colorScheme: 'green',
        strong: true,
        styles: { color: theme.colors.blue[50] },
      },
      {
        colorScheme: 'gold',
        strong: true,
        styles: { color: theme.colors.blue[50] },
      },
      {
        colorScheme: 'grey',
        strong: true,

        styles: { color: theme.colors.blue[50] },
      },
    ],
  },
}));

export default BadgeText;
