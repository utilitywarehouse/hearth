import React, { forwardRef } from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { BodyText } from '../../components';

export const AccordionContentText = forwardRef<RNText, TextProps>(({ children, ...props }, ref) => {
  return (
    <BodyText ref={ref} {...props}>
      {children}
    </BodyText>
  );
});

AccordionContentText.displayName = 'AccordionContentText';

export default AccordionContentText;
