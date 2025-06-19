import { FC, PropsWithChildren } from 'react';
import { BottomSheetModalProvider, Box } from '../../src';

const UsageWrap: FC<PropsWithChildren> = ({ children }) => {
  return (
    <BottomSheetModalProvider>
      <div className="sb-unstyled">
        <Box
          mt="300"
          p="200"
          bg="white"
          borderRadius="md"
          borderWidth="1"
          borderColor="grey1000"
          width="100%"
        >
          {children}
        </Box>
      </div>
    </BottomSheetModalProvider>
  );
};

export default UsageWrap;
