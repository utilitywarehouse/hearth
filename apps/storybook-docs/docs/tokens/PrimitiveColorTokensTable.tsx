import { useState, useEffect } from 'react';
import { color as browserColor, border } from '@utilitywarehouse/hearth-tokens/browser';
import * as jsColor from '@utilitywarehouse/hearth-tokens/js/color';
import { Box, HelperText, Select, SelectItem } from '@utilitywarehouse/hearth-react';
import { Flex } from '@utilitywarehouse/hearth-react';
import { TokenSearchInput, cellStyle, rowStyle, tableHeaderStyle, tableStyle } from './shared';
import React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Mode = 'browser' | 'js';

interface ColorToken {
  name: string;
  palette: string;
  shade: string;
  cssVar: string;
  hex: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const PALETTE_KEYS = Object.keys(browserColor) as Array<keyof typeof browserColor>;

const tokens: ColorToken[] = PALETTE_KEYS.flatMap(palette => {
  const browserPalette = browserColor[palette] as Record<string, string>;
  const jsPalette = (jsColor as Record<string, Record<string, string>>)[palette] ?? {};
  return Object.keys(browserPalette).map(shade => ({
    name: `color.${palette}.${shade}`,
    palette,
    shade,
    cssVar: browserPalette[shade],
    hex: jsPalette[shade] ?? '',
  }));
});

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ColorSwatch({ hex, cssVar, mode }: { hex: string; cssVar: string; mode: Mode }) {
  const bg = mode === 'browser' ? cssVar : hex;
  return (
    <div
      style={{
        width: '128px',
        height: '32px',
        borderRadius: border.radius.sm,
        background: bg,
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function PrimitiveColorTokensTable() {
  const [mode, setMode] = useState<Mode>('browser');
  const [search, setSearch] = useState('');
  const [selectedPalette, setSelectedPalette] = useState<string>('all');
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
    const matchesPalette = selectedPalette === 'all' || t.palette === selectedPalette;
    const matchesSearch =
      !query ||
      t.name.toLowerCase().includes(query) ||
      t.cssVar.toLowerCase().includes(query) ||
      t.hex.toLowerCase().includes(query);
    return matchesPalette && matchesSearch;
  });

  return (
    <Flex direction="column" gap="300">
      <Flex gap="200">
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
            label="Palette"
            value={selectedPalette}
            onValueChange={v => setSelectedPalette(v)}
            required
          >
            <SelectItem value="all">All palettes</SelectItem>
            {PALETTE_KEYS.map(p => (
              <SelectItem key={p} value={p}>
                {p}
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
            <th style={{ ...tableHeaderStyle, width: '1%', whiteSpace: 'nowrap' }} />
            <th style={tableHeaderStyle}>Token</th>
            {mode === 'browser' && <th style={tableHeaderStyle}>CSS Custom Property</th>}
            <th style={tableHeaderStyle}>Value</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(({ name, cssVar, hex }) => (
            <tr key={name} style={rowStyle}>
              <td style={{ ...cellStyle, verticalAlign: 'middle' }}>
                <ColorSwatch hex={hex} cssVar={cssVar} mode={mode} />
              </td>
              <td style={cellStyle}>{name}</td>
              {mode === 'browser' && <td style={cellStyle}>{cssVar}</td>}
              <td style={cellStyle}>
                {mode === 'browser' ? (resolvedValues[cssVar.slice(4, -1)] ?? hex) : hex}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && <HelperText>No tokens match &ldquo;{search}&rdquo;</HelperText>}
    </Flex>
  );
}
