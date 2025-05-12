import React, { forwardRef } from 'react';
import type { Text, TextProps } from 'react-native';
import { DetailText } from '../DetailText';

const AlertTitle = forwardRef<Text, TextProps>(({ children, ...props }, ref) => {
  return (
    <DetailText size="md" ref={ref} {...props}>
      {children}
    </DetailText>
  );
});

AlertTitle.displayName = 'AlertTitle';

export default AlertTitle;
