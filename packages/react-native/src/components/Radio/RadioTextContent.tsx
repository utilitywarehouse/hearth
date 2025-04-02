import React, { forwardRef } from 'react';
import FlexProps from '../Flex/Flex.props';
import { View } from 'react-native';
import { Flex } from '../Flex';

const RadioTextContent = forwardRef<View, FlexProps>(({ children, ...props }, ref) => {
  return (
    <Flex ref={ref} direction="column" space="none" {...props}>
      {children}
    </Flex>
  );
});

RadioTextContent.displayName = 'RadioTextContent';

export default RadioTextContent;
