import { Box, Flex, SearchInput } from '@utilitywarehouse/hearth-react';
import * as React from 'react';
import { useMemo, useState } from 'react';
import { svgAssets } from '../../../utils/svg-assets';
import { jsonAssets } from '../../../utils/json-assets';
import { AssetsGrid } from './AssetsGrid';

export const AssetsDisplay = () => {
  const [query, setQuery] = useState('');

  const assets = useMemo(() => {
    const q = query.trim().toLowerCase();
    const allAssets = [...jsonAssets, ...svgAssets];
    if (!q) return allAssets;
    return allAssets.filter(
      a => a.name.toLowerCase().includes(q) || a.path.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <Flex direction="column" gap="400" paddingTop="400">
      <Box width="400px">
        <SearchInput
          id="assets-search"
          label="Search assets"
          value={query}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
          onClear={() => setQuery('')}
        />
      </Box>

      <AssetsGrid assets={assets} />
    </Flex>
  );
};
