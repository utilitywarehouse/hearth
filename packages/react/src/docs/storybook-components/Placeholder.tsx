import React from 'react';
import { Flex } from '../../components/Flex/Flex';
import type { FlexProps } from '../../components/Flex/Flex.props';

export const Placeholder = (props: FlexProps) => {
  return (
    <Flex
      borderRadius="xs"
      borderWidth="2"
      borderColor="strong"
      backgroundColor="brand"
      height="100%"
      alignItems="center"
      justifyContent="center"
      {...props}
    />
  );
};
