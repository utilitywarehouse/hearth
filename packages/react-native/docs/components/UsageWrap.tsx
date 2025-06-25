import { FC, PropsWithChildren } from 'react';
import { BottomSheetModalProvider, Box, useColorMode } from '../../src';

const UsageWrap: FC<PropsWithChildren> = ({ children }) => {
  const [colorMode] = useColorMode();
  return (
    <div className="sb-unstyled">
      <Box
        mt="300"
        p="200"
        bg={colorMode === 'dark' ? 'background' : 'white'}
        borderRadius="md"
        borderWidth="1"
        borderColor="grey1000"
        width="100%"
        position="relative"
      >
        <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
      </Box>
    </div>
  );
};

export default UsageWrap;
