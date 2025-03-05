import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Text } from 'react-native';
import TextProps from '../BodyText/BodyText.props';
import { useHelperContext } from './HelperContext';
import { BodyText } from '../BodyText';

const HelperText = forwardRef<Text, TextProps>(({ children, style, size, ...props }, ref) => {
  const { validationStatus, disabled } = useHelperContext();
  styles.useVariants({ validationStatus, disabled });

  return (
    <BodyText size={size} ref={ref} style={[styles.text, style]} {...props}>
      {children}
    </BodyText>
  );
});

HelperText.displayName = 'HelperText';

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.components.text.supportingTextColor,
    variants: {
      validationStatus: {
        valid: {
          color: theme.components.text.colorValid,
        },
        invalid: {
          color: theme.components.text.colorInvalid,
        },
        initial: {},
      },
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
  },
}));

export default HelperText;
