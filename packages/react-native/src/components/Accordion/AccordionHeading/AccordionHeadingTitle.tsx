import React, { forwardRef } from 'react';

import TextProps from '../../DetailText/DetailText.props';
import { Text as RNText } from 'react-native';
import { DetailText } from '../../DetailText';

const AccordionHeadingTitle = forwardRef<RNText, TextProps>(({ children, ...props }, ref) => {
  return (
    <DetailText size="lg" ref={ref} {...props}>
      {children}
    </DetailText>
  );
});

AccordionHeadingTitle.displayName = 'AccordionHeadingTitle';

export default AccordionHeadingTitle;
