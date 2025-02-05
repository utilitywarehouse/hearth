import React from 'react';
import { Box, BodyText } from '../../src';
import { FC, PropsWithChildren } from 'react';

const VariantTitle: FC<
  PropsWithChildren<{
    title: string;
    upperCase?: boolean;
  }>
> = ({ title, upperCase = true, children }) => (
  <Box gap="100">
    <BodyText textTransform={upperCase ? 'uppercase' : 'none'} size="sm" bold color="grey600">
      {title}
    </BodyText>
    {children}
  </Box>
);

export default VariantTitle;
