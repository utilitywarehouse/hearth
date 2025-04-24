import React, { FC, PropsWithChildren } from 'react';
import { Box, HearthUIProvider } from '../../src';

const UsageWrap: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="sb-unstyled">
      <HearthUIProvider>
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
      </HearthUIProvider>
    </div>
  );
};

export default UsageWrap;
