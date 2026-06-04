import { useState, useEffect } from 'react';
import * as browserTokens from '@utilitywarehouse/hearth-tokens/browser';
import { TextInput, Box, BodyText } from '@utilitywarehouse/hearth-react';
import React from 'react';

interface TokenEntry {
  name: string;
  cssVar: string;
}

function flattenTokens(obj: Record<string, unknown>, prefix = ''): TokenEntry[] {
  const entries: TokenEntry[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const name = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      entries.push({ name, cssVar: value });
    } else if (value !== null && typeof value === 'object') {
      entries.push(...flattenTokens(value as Record<string, unknown>, name));
    }
  }
  return entries;
}

const allTokens = flattenTokens(browserTokens as unknown as Record<string, unknown>);

export function AllTokensTable() {
  const [search, setSearch] = useState('');
  const [resolvedValues, setResolvedValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    const resolved: Record<string, string> = {};
    for (const { cssVar } of allTokens) {
      const varName = cssVar.slice(4, -1);
      resolved[varName] = styles.getPropertyValue(varName).trim();
    }
    setResolvedValues(resolved);
  }, []);

  const query = search.toLowerCase().replaceAll('.', '');
  const filtered = query
    ? allTokens.filter(
        ({ name, cssVar }) =>
          name.toLowerCase().replaceAll('.', '').includes(query) ||
          cssVar.toLowerCase().includes(query)
      )
    : allTokens;

  return (
    <div>
      <div style={{ marginBottom: '1.5rem', maxWidth: '480px' }}>
        <TextInput
          label="Search tokens"
          placeholder="Filter by name or CSS variable…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          hideLabel
        />
      </div>
      <table
        style={{
          width: '100%',
          tableLayout: 'fixed',
          borderCollapse: 'collapse',
          fontSize: browserTokens.font.size[90],
          fontFamily: browserTokens.font.family.detail,
        }}
      >
        <thead>
          <tr>
            {(['Name', 'CSS Custom Property', 'Raw Value'] as const).map(heading => (
              <Box
                key={heading}
                asChild
                paddingX="150"
                paddingY="100"
                borderBottomColor="subtle"
                borderBottomWidth="2"
                textAlign="left"
                style={{ display: 'table-cell', whiteSpace: 'nowrap' }}
              >
                <th>
                  <BodyText as="span" weight="semibold">
                    {heading}
                  </BodyText>
                </th>
              </Box>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map(({ name, cssVar }) => {
            const varName = cssVar.slice(4, -1);
            const raw = resolvedValues[varName] ?? '';
            const cellStyle: React.CSSProperties = {
              padding: '6px 12px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            };
            return (
              <tr key={name} style={{ borderBottom: '1px solid #ebebeb' }}>
                <td style={cellStyle} title={name}>
                  {name}
                </td>
                <td style={cellStyle} title={cssVar}>
                  {cssVar}
                </td>
                <td style={cellStyle} title={raw}>
                  {raw}
                </td>
              </tr>
            );
          })}
          {filtered.length === 0 && (
            <tr>
              <td
                colSpan={3}
                style={{
                  padding: '16px 12px',
                  textAlign: 'center',
                  fontFamily: 'sans-serif',
                  color: '#5b5b5b',
                }}
              >
                No tokens match &ldquo;{search}&rdquo;
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {filtered.length > 0 && (
        <p
          style={{
            marginTop: '0.75rem',
            fontSize: '0.75rem',
            fontFamily: 'sans-serif',
            color: '#5b5b5b',
          }}
        >
          Showing {filtered.length} of {allTokens.length} tokens
        </p>
      )}
    </div>
  );
}
