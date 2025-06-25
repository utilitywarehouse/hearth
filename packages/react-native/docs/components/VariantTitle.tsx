import { ViewProps } from 'react-native';
import { Box, DetailText, useColorMode } from '../../src';

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
}) => {
  const [colorMode] = useColorMode();
  return (
    <Box gap="100" w="full">
      <DetailText
        textTransform={upperCase ? 'uppercase' : 'none'}
        size="sm"
        color={invert ? 'warmWhite50' : colorMode === 'light' ? 'grey600' : 'grey200'}
      >
        {title}
      </DetailText>
      {children}
    </Box>
  );
};

export default VariantTitle;
