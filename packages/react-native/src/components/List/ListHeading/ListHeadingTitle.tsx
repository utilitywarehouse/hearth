import React, { forwardRef } from 'react';

import TextProps from '../../DetailText/DetailText.props';
import { Text as RNText } from 'react-native';
import { DetailText } from '../../DetailText';

const ListHeadingTitle = forwardRef<RNText, TextProps>(({ children, ...props }, ref) => {
  return (
    <DetailText size="lg" ref={ref} {...props}>
      {children}
    </DetailText>
  );
});

ListHeadingTitle.displayName = 'ListHeadingTitle';

export default ListHeadingTitle;
