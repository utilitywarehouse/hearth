import React, { forwardRef } from 'react';
import { Text, type TextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { DetailText } from '../DetailText';

const ToggleButtonText = forwardRef<Text, TextProps & { toggled: boolean }>(
  ({ children, toggled, ...props }, ref) => {
    styles.useVariants({ toggled });
    return (
      <DetailText size="md" ref={ref} {...props} style={[styles.text, props.style]}>
        {children}
      </DetailText>
    );
  }
);

ToggleButtonText.displayName = 'ToggleButtonText';

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.components.toggleButton.foregroundColor,
    variants: {
      toggled: {
        true: {
          color: theme.components.toggleButton.selected.foregroundColor,
        },
      },
    },
  },
}));

export default ToggleButtonText;
