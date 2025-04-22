import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { View } from 'react-native';
import CheckboxGroupProps from './CheckboxGroup.props';

const CheckboxGroup = forwardRef<View, CheckboxGroupProps & { isCard?: boolean }>(
  ({ children, style, isCard = false, ...props }, ref) => {
    styles.useVariants({ type: isCard ? 'tile' : 'checkbox' });
    return (
      <View ref={ref} {...props} style={[styles.container, style]}>
        {children}
      </View>
    );
  }
);

CheckboxGroup.displayName = 'CheckboxGroup';

const styles = StyleSheet.create(theme => ({
  container: {
    variants: {
      type: {
        checkbox: {
          gap: theme.components.checkbox.group.gap,
        },
        tile: {
          gap: theme.components.checkbox.tile.group.gap,
        },
      },
    },
  },
}));

export default CheckboxGroup;
