import { useState, useEffect } from 'react';
import { font as browserFont } from '@utilitywarehouse/hearth-tokens/browser';
import { font as jsFont, letterSpacing as jsLetterSpacing, lineHeight as jsLineHeight } from '@utilitywarehouse/hearth-tokens/js';
import { Box, Flex, HelperText, Select, SelectItem } from '@utilitywarehouse/hearth-react';
import { TokenSearchInput, cellStyle, rowStyle, tableHeaderStyle, tableStyle } from './shared';
import React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Mode = 'browser' | 'js';
type Group = 'family' | 'size' | 'weight' | 'letterSpacing' | 'lineHeight';

interface TypographyToken {
  name: string;
  jsName: string;
  group: Group;
  cssVar: string;
  rawValue: string | number;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const familyTokens: TypographyToken[] = Object.keys(browserFont.family).map(key => ({
  name: `font.family.${key}`,
  jsName: `font.family.${key}`,
  group: 'family',
  cssVar: browserFont.family[key as keyof typeof browserFont.family],
  rawValue: (jsFont as Record<string, Record<string, string>>).family[key],
}));

const sizeTokens: TypographyToken[] = Object.keys(browserFont.size).map(key => ({
  name: `font.size.${key}`,
  jsName: `font.size.${key}`,
  group: 'size',
  cssVar: browserFont.size[key as keyof typeof browserFont.size],
  rawValue: (jsFont as Record<string, Record<string, number>>).size[key],
}));

const weightTokens: TypographyToken[] = Object.keys(browserFont.weight).map(key => ({
  name: `font.weight.${key}`,
  jsName: `font.weight.${key}`,
  group: 'weight',
  cssVar: browserFont.weight[key as keyof typeof browserFont.weight],
  rawValue: (jsFont as Record<string, Record<string, number>>).weight[key],
}));

const letterSpacingTokens: TypographyToken[] = Object.keys(browserFont.letterSpacing).map(key => ({
  name: `font.letterSpacing.${key}`,
  jsName: `letterSpacing.${key}`,
  group: 'letterSpacing',
  cssVar: browserFont.letterSpacing[key as keyof typeof browserFont.letterSpacing],
  rawValue: (jsLetterSpacing as Record<string, number>)[key],
}));

const lineHeightTokens: TypographyToken[] = Object.keys(browserFont.lineHeight).map(key => ({
  name: `font.lineHeight.${key}`,
  jsName: `lineHeight.${key}`,
  group: 'lineHeight',
  cssVar: browserFont.lineHeight[key as keyof typeof browserFont.lineHeight],
  rawValue: (jsLineHeight as Record<string, number>)[key],
}));

const tokens: TypographyToken[] = [
  ...familyTokens,
  ...sizeTokens,
  ...weightTokens,
  ...letterSpacingTokens,
  ...lineHeightTokens,
];

const GROUP_LABELS: Record<Group, string> = {
  family: 'Family',
  size: 'Size',
  weight: 'Weight',
  letterSpacing: 'Letter Spacing',
  lineHeight: 'Line Height',
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function TypographyPreview({ token }: { token: TypographyToken }) {
  const { group, cssVar } = token;

  const baseStyle: React.CSSProperties = {
    fontFamily: browserFont.family.body,
    fontSize: browserFont.size[100],
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  if (group === 'family') {
    return <span style={{ ...baseStyle, fontFamily: cssVar }}>Ag</span>;
  }

  if (group === 'size') {
    // Cap display size so large values don't blow out the row
    const raw = Number(token.rawValue);
    const displaySize = raw > 24 ? browserFont.size[150] : cssVar;
    return <span style={{ ...baseStyle, fontSize: displaySize }}>Ag</span>;
  }

  if (group === 'weight') {
    return <span style={{ ...baseStyle, fontWeight: cssVar }}>Ag</span>;
  }

  if (group === 'letterSpacing') {
    return <span style={{ ...baseStyle, letterSpacing: cssVar }}>Ag</span>;
  }

  if (group === 'lineHeight') {
    return (
      <span style={{ ...baseStyle, lineHeight: cssVar, whiteSpace: 'normal', display: 'block' }}>
        Ag
        <br />
        Ag
      </span>
    );
  }

  return null;
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const GROUPS: Group[] = ['family', 'size', 'weight', 'letterSpacing', 'lineHeight'];

export function TypographyTokensTable() {
  const [mode, setMode] = useState<Mode>('browser');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [resolvedValues, setResolvedValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const resolved: Record<string, string> = {};
    for (const { cssVar } of tokens) {
      const varName = cssVar.slice(4, -1);
      resolved[varName] = styles.getPropertyValue(varName).trim();
    }
    setResolvedValues(resolved);
  }, []);

  const query = search.toLowerCase();
  const filtered = tokens.filter(t => {
    const matchesGroup = selectedGroup === 'all' || t.group === selectedGroup;
    const matchesSearch =
      !query ||
      t.name.toLowerCase().includes(query) ||
      t.jsName.toLowerCase().includes(query) ||
      t.cssVar.toLowerCase().includes(query) ||
      String(t.rawValue).toLowerCase().includes(query);
    return matchesGroup && matchesSearch;
  });

  return (
    <Flex direction="column" gap="300">
      <Flex gap="200" wrap="wrap">
        <Box minWidth="200px">
          <Select
            label="Token format"
            value={mode}
            onValueChange={v => setMode(v as Mode)}
            required
          >
            <SelectItem value="browser">Browser / CSS</SelectItem>
            <SelectItem value="js">JS</SelectItem>
          </Select>
        </Box>
        <Box minWidth="200px">
          <Select
            label="Group"
            value={selectedGroup}
            onValueChange={v => setSelectedGroup(v)}
            required
          >
            <SelectItem value="all">All</SelectItem>
            {GROUPS.map(g => (
              <SelectItem key={g} value={g}>
                {GROUP_LABELS[g]}
              </SelectItem>
            ))}
          </Select>
        </Box>
        <Box minWidth="300px">
          <TokenSearchInput
            value={search}
            onChange={setSearch}
            placeholder="Filter by name or value…"
          />
        </Box>
      </Flex>

      <table style={{ ...tableStyle, tableLayout: 'auto' }}>
        <thead>
          <tr>
            <th style={{ ...tableHeaderStyle, width: '1%', whiteSpace: 'nowrap' }}>Preview</th>
            <th style={tableHeaderStyle}>Token</th>
            {mode === 'browser' && <th style={tableHeaderStyle}>CSS Custom Property</th>}
            <th style={tableHeaderStyle}>Value</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(token => {
            const { name, jsName, cssVar, rawValue } = token;
            const resolvedValue = resolvedValues[cssVar.slice(4, -1)];
            const displayValue = mode === 'browser'
              ? (resolvedValue ?? String(rawValue))
              : String(rawValue);
            return (
              <tr key={name} style={rowStyle}>
                <td style={{ ...cellStyle, verticalAlign: 'middle', width: '1%', whiteSpace: 'nowrap' }}>
                  <TypographyPreview token={token} />
                </td>
                <td style={cellStyle}>{mode === 'browser' ? name : jsName}</td>
                {mode === 'browser' && <td style={cellStyle}>{cssVar}</td>}
                <td style={cellStyle}>{displayValue}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {filtered.length === 0 && <HelperText>No tokens match &ldquo;{search}&rdquo;</HelperText>}
    </Flex>
  );
}
