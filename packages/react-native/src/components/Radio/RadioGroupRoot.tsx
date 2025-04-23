import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { View } from 'react-native';
import RadioGroupProps from './RadioGroup.props';

const RadioGroupRoot = forwardRef<View, RadioGroupProps & { isCard?: boolean }>(
  ({ children, style, isCard = false, ...props }, ref) => {
    styles.useVariants({ type: isCard ? 'tile' : 'radio' });
    return (
      <View ref={ref} {...props} style={[styles.container, style]}>
        {children}
      </View>
    );
  }
);

RadioGroupRoot.displayName = 'RadioGroupRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    variants: {
      type: {
        tile: {
          gap: theme.components.radio.tile.group.gap,
        },
        radio: {
          gap: theme.components.radio.group.gap,
        },
      },
    },
  },
}));

export default RadioGroupRoot;
