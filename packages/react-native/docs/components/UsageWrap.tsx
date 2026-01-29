import { FC, PropsWithChildren } from 'react';
import { BottomSheetModalProvider, Box } from '../../src';

const UsageWrap: FC<PropsWithChildren> = ({ children }) => (
  <div className="sb-unstyled">
    <Box
      mt="300"
      p="200"
      bg="backgroundPrimary"
      borderRadius="md"
      borderWidth="1"
      borderColor="borderSubtle"
      width="100%"
      position="relative"
    >
      <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
    </Box>
  </div>
);

export default UsageWrap;
