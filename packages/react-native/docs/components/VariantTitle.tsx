import { ViewProps } from 'react-native';
import { Box, DetailText } from '../../src';

const VariantTitle = ({
  title,
  upperCase = true,
  invert = false,
  children,
}: {
  title: string;
  upperCase?: boolean;
  invert?: boolean;
  children: ViewProps['children'];
}) => (
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
