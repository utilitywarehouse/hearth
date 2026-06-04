import React, { useState, useEffect } from 'react';
import * as browserTokens from '@utilitywarehouse/hearth-tokens/browser';
import { Checkbox, TextInput } from '@utilitywarehouse/hearth-react';

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
const baseTokens = allTokens.filter(({ name }) => !name.startsWith('components.'));
const componentTokens = allTokens.filter(({ name }) => name.startsWith('components.'));

export function AllTokensTable() {
  const [search, setSearch] = useState('');
  const [includeComponents, setIncludeComponents] = useState(false);
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

  const visibleTokens = includeComponents ? allTokens : baseTokens;
  const query = search.toLowerCase().replaceAll('.', '');
  const filtered = query
    ? visibleTokens.filter(
        ({ name, cssVar }) =>
          name.toLowerCase().replaceAll('.', '').includes(query) ||
          cssVar.toLowerCase().includes(query)
      )
    : visibleTokens;

  return (
    <div>
      <div style={{ marginBottom: '1rem', maxWidth: '480px' }}>
        <TextInput
          label="Search tokens"
          placeholder="Filter by name or CSS variable…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: '1.5rem' }}>
        <Checkbox
          label="Include component tokens"
          checked={includeComponents}
          onCheckedChange={setIncludeComponents}
        />
      </div>
      <table
        style={{
          width: '100%',
          tableLayout: 'fixed',
          borderCollapse: 'collapse',
          fontSize: '0.8125rem',
          fontFamily: 'monospace',
        }}
      >
        <colgroup>
          <col style={{ width: '34%' }} />
          <col style={{ width: '40%' }} />
          <col style={{ width: '26%' }} />
        </colgroup>
        <thead>
          <tr>
            {(['Name', 'CSS Custom Property', 'Raw Value'] as const).map(heading => (
              <th
                key={heading}
                style={{
                  textAlign: 'left',
                  padding: '8px 12px',
                  borderBottom: '2px solid #d3d3d3',
                  fontFamily: 'sans-serif',
                  fontWeight: 600,
                  overflow: 'hidden',
                }}
              >
                {heading}
              </th>
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
          Showing {filtered.length} of {visibleTokens.length} tokens
        </p>
      )}
    </div>
  );
}
