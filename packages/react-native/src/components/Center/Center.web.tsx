import React, { ComponentProps, forwardRef } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Box } from '../Box';

export interface CenterProps extends Omit<ComponentProps<typeof Box>, 'style'> {}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Center = forwardRef<View, CenterProps>(({ children, ...props }, ref) => (
  <View ref={ref} style={styles.container} {...props}>
    {children}
  </View>
));

Center.displayName = 'Center';

export default Center;
