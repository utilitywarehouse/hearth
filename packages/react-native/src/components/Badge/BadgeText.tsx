import React, { forwardRef } from 'react';

import { Text } from 'react-native';
import type { TextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';

const BadgeText = forwardRef<Text, TextProps>(({ children, style, ...props }, ref) => {
  return (
    <BodyText ref={ref} {...props} size="sm" style={[styles.text, style]}>
      {children}
    </BodyText>
  );
});

BadgeText.displayName = 'BadgeText';

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.components.badge.color,
  },
}));

export default BadgeText;
