import { useState, useEffect } from 'react';
import { border as browserBorder, semantic } from '@utilitywarehouse/hearth-tokens/browser';
import { borderRadius, borderWidth } from '@utilitywarehouse/hearth-tokens/js';
import { Box, Flex, HelperText, Select, SelectItem } from '@utilitywarehouse/hearth-react';
import { TokenSearchInput, cellStyle, rowStyle, tableHeaderStyle, tableStyle } from './shared';
import React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Mode = 'browser' | 'js';
type Group = 'radius' | 'width';

interface BorderToken {
  name: string;
  jsName: string;
  group: Group;
  key: string;
  cssVar: string;
  rawValue: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const radiusTokens: BorderToken[] = Object.keys(browserBorder.radius)
  .sort(
    (a, b) =>
      (borderRadius as Record<string, number>)[a] - (borderRadius as Record<string, number>)[b]
  )
  .map(key => ({
    name: `border.radius.${key}`,
    jsName: `borderRadius.${key}`,
    group: 'radius',
    key,
    cssVar: browserBorder.radius[key as keyof typeof browserBorder.radius],
    rawValue: `${(borderRadius as Record<string, number>)[key]}px`,
  }));

const widthTokens: BorderToken[] = Object.keys(browserBorder.width).map(key => ({
  name: `border.width.${key}`,
  jsName: `borderWidth.${key}`,
  group: 'width',
  key,
  cssVar: browserBorder.width[key as keyof typeof browserBorder.width],
  rawValue: `${(borderWidth as Record<string, number>)[key]}px`,
}));

const tokens: BorderToken[] = [...radiusTokens, ...widthTokens];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function RadiusPreview({
  cssVar,
  rawValue,
  mode,
}: {
  cssVar: string;
  rawValue: string;
  mode: Mode;
}) {
  const radius = mode === 'browser' ? cssVar : rawValue;
  return (
    <div
      style={{
        width: '48px',
        height: '48px',
        borderRadius: radius,
        backgroundColor: semantic.surface.pig.subtle,
      }}
    />
  );
}

function WidthPreview({
  cssVar,
  rawValue,
  mode,
}: {
  cssVar: string;
  rawValue: string;
  mode: Mode;
}) {
  const width = mode === 'browser' ? cssVar : rawValue;
  return (
    <div
      style={{
        width: '48px',
        height: '48px',
        border: `${width} solid var(--h-color-grey-900)`,
        borderRadius: browserBorder.radius.sm,
        flexShrink: 0,
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function BorderTokensTable() {
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
      t.cssVar.toLowerCase().includes(query) ||
      t.rawValue.toLowerCase().includes(query);
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
            <SelectItem value="radius">Radius</SelectItem>
            <SelectItem value="width">Width</SelectItem>
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
            <th style={{ ...tableHeaderStyle, width: '1%', whiteSpace: 'nowrap' }} />
            <th style={tableHeaderStyle}>Token</th>
            {mode === 'browser' && <th style={tableHeaderStyle}>CSS Custom Property</th>}
            <th style={tableHeaderStyle}>Value</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(({ name, jsName, group, cssVar, rawValue }) => (
            <tr key={name} style={rowStyle}>
              <td
                style={{ ...cellStyle, verticalAlign: 'middle', width: '1%', whiteSpace: 'nowrap' }}
              >
                {group === 'radius' ? (
                  <RadiusPreview cssVar={cssVar} rawValue={rawValue} mode={mode} />
                ) : (
                  <WidthPreview cssVar={cssVar} rawValue={rawValue} mode={mode} />
                )}
              </td>
              <td style={cellStyle}>{mode === 'browser' ? name : jsName}</td>
              {mode === 'browser' && <td style={cellStyle}>{cssVar}</td>}
              <td style={cellStyle}>
                {mode === 'browser' ? (resolvedValues[cssVar.slice(4, -1)] ?? rawValue) : rawValue}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && <HelperText>No tokens match &ldquo;{search}&rdquo;</HelperText>}
    </Flex>
  );
}
