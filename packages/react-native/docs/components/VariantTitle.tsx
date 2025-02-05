import React from 'react';
import { Box, DetailText } from '../../src';
import { FC, PropsWithChildren } from 'react';

const VariantTitle: FC<
  PropsWithChildren<{
    title: string;
    upperCase?: boolean;
  }>
> = ({ title, upperCase = true, children }) => (
  <Box gap="100">
    <DetailText textTransform={upperCase ? 'uppercase' : 'none'} size="sm" color="grey600">
      {title}
    </DetailText>
    {children}
  </Box>
);

export default VariantTitle;
