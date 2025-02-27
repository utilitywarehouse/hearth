import React from 'react';
import { Box, DetailText } from '../../src';
import { FC, PropsWithChildren } from 'react';
import { invert } from 'react-native-svg/lib/typescript/elements/Shape';

const VariantTitle: FC<
  PropsWithChildren<{
    title: string;
    upperCase?: boolean;
    invert?: boolean;
  }>
> = ({ title, upperCase = true, invert = false, children }) => (
  <Box gap="100" w="full">
    <DetailText
      textTransform={upperCase ? 'uppercase' : 'none'}
      size="sm"
      color={invert ? 'warmWhite50' : 'grey600'}
    >
      {title}
    </DetailText>
    {children}
  </Box>
);

export default VariantTitle;
