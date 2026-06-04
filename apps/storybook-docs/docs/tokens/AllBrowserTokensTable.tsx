import { useState, useEffect } from 'react';
import * as browserTokens from '@utilitywarehouse/hearth-tokens/browser';
import { flattenTokens, IncludeComponentsCheckbox, TokenSearchInput, TokenTable } from './shared';
import React from 'react';
import { Flex } from '@utilitywarehouse/hearth-react';

const allTokens = flattenTokens(browserTokens as unknown as Record<string, unknown>);
const baseTokens = allTokens.filter(({ name }) => !name.startsWith('components.'));

const columns = [
  { heading: 'Name', width: '34%' },
  { heading: 'CSS Custom Property', width: '40%' },
  { heading: 'Raw Value', width: '26%' },
];

export function AllTokensTable() {
  const [search, setSearch] = useState('');
  const [includeComponents, setIncludeComponents] = useState(false);
  const [resolvedValues, setResolvedValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const resolved: Record<string, string> = {};
    for (const { value: cssVar } of allTokens) {
      const varName = cssVar.slice(4, -1);
      resolved[varName] = styles.getPropertyValue(varName).trim();
    }
    setResolvedValues(resolved);
  }, []);

  const visibleTokens = includeComponents ? allTokens : baseTokens;
  const query = search.toLowerCase().replaceAll('.', '');
  const filtered = query
    ? visibleTokens.filter(
        ({ name, value: cssVar }) =>
          name.toLowerCase().replaceAll('.', '').includes(query) ||
          cssVar.toLowerCase().includes(query)
      )
    : visibleTokens;

  const rows = filtered.map(({ name, value: cssVar }) => {
    const raw = resolvedValues[cssVar.slice(4, -1)] ?? '';
    return [name, cssVar, raw];
  });

  return (
    <Flex direction="column" gap="300">
      <Flex direction="column" gap="200" alignItems="start">
        <TokenSearchInput
          value={search}
          onChange={setSearch}
          placeholder="Filter by name or CSS variable…"
        />
        <IncludeComponentsCheckbox
          checked={includeComponents}
          onCheckedChange={setIncludeComponents}
        />
      </Flex>
      <TokenTable columns={columns} rows={rows} search={search} totalCount={visibleTokens.length} />
    </Flex>
  );
}
