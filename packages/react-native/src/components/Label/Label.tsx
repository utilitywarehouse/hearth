import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Text } from 'react-native';
import LabelProps from './Label.props';
import { BodyText } from '../BodyText';

const Label = forwardRef<Text, LabelProps>(
  ({ children, nested, disabled, style, ...props }, ref) => {
    styles.useVariants({ disabled });
    return (
      <BodyText
        size="md"
        weight={nested ? 'regular' : 'semibold'}
        ref={ref}
        style={[styles.text, style]}
        {...props}
      >
        {children}
      </BodyText>
    );
  }
);

Label.displayName = 'Label';

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.components.text.color,
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
  },
}));

export default Label;
