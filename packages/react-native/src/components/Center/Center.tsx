import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { Box } from '../Box';
import BoxProps from '../Box/Box.props';

const Center = forwardRef<View, BoxProps>(({ children, ...props }, ref) => (
  <Box ref={ref} alignItems="center" justifyContent="center" {...props}>
    {children}
  </Box>
));

Center.displayName = 'Center';

export default Center;
