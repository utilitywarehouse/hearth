import * as React from 'react';
import { reactIcons } from '../../../utils/react-icons';
import { useState } from 'react';
import { IconsGrid } from './IconsGrid';
import { Box, Flex, SearchInput } from '@utilitywarehouse/hearth-react';

export const IconsDisplay = () => {
  const [iconName, setIconName] = useState('');

  const icons = reactIcons.filter(icon => {
    if (!iconName) return true;
    return icon.displayName?.toLowerCase().includes(iconName);
  });

  return (
    <Flex direction="column" gap="400" paddingTop="400">
      <Box width="400px">
        <SearchInput
          id="icons-search"
          label="Search icons"
          value={iconName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setIconName(event.target.value);
          }}
          onClear={() => setIconName('')}
        />
      </Box>

      <IconsGrid icons={icons} />
    </Flex>
  );
};
