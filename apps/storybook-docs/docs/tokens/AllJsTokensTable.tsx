import { useState } from 'react';
import * as jsTokens from '@utilitywarehouse/hearth-tokens/js';
import { flattenTokens, IncludeComponentsCheckbox, TokenSearchInput, TokenTable } from './shared';
import React from 'react';
import { Flex } from '@utilitywarehouse/hearth-react';

const allTokens = flattenTokens(jsTokens as unknown as Record<string, unknown>);
const baseTokens = allTokens.filter(({ name }) => !name.startsWith('components.'));

const columns = [
  { heading: 'Name', width: '65%' },
  { heading: 'Value', width: '35%' },
];

export function AllTokensTable() {
  const [search, setSearch] = useState('');
  const [includeComponents, setIncludeComponents] = useState(false);

  const visibleTokens = includeComponents ? allTokens : baseTokens;
  const query = search.toLowerCase().replaceAll('.', '');
  const filtered = query
    ? visibleTokens.filter(
        ({ name, value }) =>
          name.toLowerCase().replaceAll('.', '').includes(query) ||
          value.toLowerCase().includes(query)
      )
    : visibleTokens;

  const rows = filtered.map(({ name, value }) => [name, value]);

  return (
    <Flex direction="column" gap="300">
      <Flex direction="column" gap="200" alignItems="start">
        <TokenSearchInput value={search} onChange={setSearch} />
        <IncludeComponentsCheckbox
          checked={includeComponents}
          onCheckedChange={setIncludeComponents}
        />
      </Flex>
      <TokenTable columns={columns} rows={rows} search={search} totalCount={visibleTokens.length} />
    </Flex>
  );
}
