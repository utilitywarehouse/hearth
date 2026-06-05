import React from 'react';
import { Checkbox, Flex, HelperText, TextInput } from '@utilitywarehouse/hearth-react';
import * as browserTokens from '@utilitywarehouse/hearth-tokens/browser';

// ---------------------------------------------------------------------------
// Token flattening
// ---------------------------------------------------------------------------

export interface TokenEntry {
  name: string;
  value: string;
}

export function flattenTokens(obj: Record<string, unknown>, prefix = ''): TokenEntry[] {
  const entries: TokenEntry[] = [];
  for (const [key, raw] of Object.entries(obj)) {
    const name = prefix ? `${prefix}.${key}` : key;
    if (raw !== null && typeof raw === 'object') {
      entries.push(...flattenTokens(raw as Record<string, unknown>, name));
    } else {
      entries.push({ name, value: String(raw) });
    }
  }
  return entries;
}

// ---------------------------------------------------------------------------
// Search input
// ---------------------------------------------------------------------------

interface TokenSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TokenSearchInput({
  value,
  onChange,
  placeholder = 'Filter by name or value…',
}: TokenSearchInputProps) {
  return (
    <TextInput
      label="Search tokens"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      required
    />
  );
}

// ---------------------------------------------------------------------------
// Include component tokens checkbox
// ---------------------------------------------------------------------------

interface IncludeComponentsCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function IncludeComponentsCheckbox({
  checked,
  onCheckedChange,
}: IncludeComponentsCheckboxProps) {
  return (
    <Checkbox
      label="Include component tokens"
      checked={checked}
      onCheckedChange={onCheckedChange}
    />
  );
}

// ---------------------------------------------------------------------------
// Token table
// ---------------------------------------------------------------------------

export const cellStyle: React.CSSProperties = {
  padding: `${browserTokens.space[150]}`,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

export const rowStyle: React.CSSProperties = {
  borderBottom: `${browserTokens.border.width[1]} solid ${browserTokens.semantic.border.subtle}`,
};

export const tableStyle: React.CSSProperties = {
  width: '100%',
  tableLayout: 'fixed',
  borderCollapse: 'collapse',
  fontSize: browserTokens.font.size[100],
  fontFamily: browserTokens.font.family.detail,
};

export const tableHeaderStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: `${browserTokens.space[100]} ${browserTokens.space[150]}`,
  borderBottom: `${browserTokens.border.width[1]} solid ${browserTokens.semantic.border.strong}`,
  fontFamily: browserTokens.font.family.body,
  fontWeight: browserTokens.font.weight.semibold,
  overflow: 'hidden',
};

export interface ColumnDef {
  heading: string;
  width: string;
}

interface TokenTableProps {
  columns: ColumnDef[];
  rows: Array<string[]>;
  search: string;
  totalCount: number;
}

export function TokenTable({ columns, rows, search, totalCount }: TokenTableProps) {
  return (
    <Flex direction="column" gap="100">
      <table style={tableStyle}>
        <colgroup>
          {columns.map(({ heading, width }) => (
            <col key={heading} style={{ width }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {columns.map(({ heading }) => (
              <th key={heading} style={tableHeaderStyle}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, i) => (
            <tr key={i} style={rowStyle}>
              {cells.map((cell, j) => (
                <td key={j} style={cellStyle} title={cell}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: `${browserTokens.space[200]} 12px`,
                  textAlign: 'center',
                  fontFamily: browserTokens.font.family.body,
                  color: browserTokens.semantic.text.secondary,
                }}
              >
                No tokens match &ldquo;{search}&rdquo;
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {rows.length > 0 && (
        <HelperText>
          Showing {rows.length} of {totalCount} tokens
        </HelperText>
      )}
    </Flex>
  );
}
