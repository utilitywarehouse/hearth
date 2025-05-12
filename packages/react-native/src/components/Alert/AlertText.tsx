import React, { forwardRef } from 'react';
import { Text, TextProps } from 'react-native';
import { BodyText } from '../BodyText';

const AlertText = forwardRef<Text, TextProps & { semibold?: boolean }>(
  ({ children, semibold = false, ...props }, ref) => {
    return (
      <BodyText size="md" ref={ref} {...props}>
        {children}
      </BodyText>
    );
  }
);

AlertText.displayName = 'AlertText';

export default AlertText;
