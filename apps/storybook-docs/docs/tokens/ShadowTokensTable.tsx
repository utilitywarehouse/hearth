import { useState, useEffect } from 'react';
import { shadow as browserShadow } from '@utilitywarehouse/hearth-tokens/browser';
import { shadow as jsShadow } from '@utilitywarehouse/hearth-tokens/js';
import { Box, Flex, HelperText, Select, SelectItem } from '@utilitywarehouse/hearth-react';
import { TokenSearchInput, cellStyle, rowStyle, tableHeaderStyle, tableStyle } from './shared';
import React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Mode = 'browser' | 'js';
type Breakpoint = 'mobile' | 'tablet' | 'desktop';
type ShadowSize = 'sm' | 'md';
type ShadowProperty = 'x' | 'y' | 'blur' | 'spread';

// ---------------------------------------------------------------------------
// Data — dimension tokens
// ---------------------------------------------------------------------------

type ShadowDimensionGroups = typeof browserShadow.sm;
const SHADOW_SIZES = Object.keys(browserShadow).filter(
  key => typeof browserShadow[key as keyof typeof browserShadow] === 'object'
) as ShadowSize[];
const BREAKPOINTS = Object.keys(jsShadow) as Breakpoint[];
const SHADOW_PROPERTIES = Object.keys(browserShadow.sm) as ShadowProperty[];

interface ShadowDimensionToken {
  name: string;
  jsName: string;
  size: ShadowSize;
  property: ShadowProperty;
  breakpoint: Breakpoint;
  cssVar: string;
  rawValue: number;
}

const dimensionTokens: ShadowDimensionToken[] = SHADOW_SIZES.flatMap(size =>
  SHADOW_PROPERTIES.flatMap(property =>
    BREAKPOINTS.map(breakpoint => ({
      name: `shadow.${size}.${property}.${breakpoint}`,
      jsName: `shadow.${breakpoint}.${size}.${property}`,
      size,
      property,
      breakpoint,
      cssVar: (browserShadow[size] as ShadowDimensionGroups)[property][breakpoint],
      rawValue: jsShadow[breakpoint][size][property],
    }))
  )
);

// ---------------------------------------------------------------------------
// Shadow dimension table
// ---------------------------------------------------------------------------

const BREAKPOINT_LABELS: Record<Breakpoint, string> = {
  mobile: 'Mobile',
  tablet: 'Tablet',
  desktop: 'Desktop',
};

export function ShadowDimensionTokensTable() {
  const [mode, setMode] = useState<Mode>('browser');
  const [selectedBreakpoint, setSelectedBreakpoint] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [resolvedValues, setResolvedValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const resolved: Record<string, string> = {};
    for (const { cssVar } of dimensionTokens) {
      const varName = cssVar.slice(4, -1);
      resolved[varName] = styles.getPropertyValue(varName).trim();
    }
    setResolvedValues(resolved);
  }, []);

  const query = search.toLowerCase();
  const filtered = dimensionTokens.filter(t => {
    const matchesBreakpoint = selectedBreakpoint === 'all' || t.breakpoint === selectedBreakpoint;
    const matchesSearch =
      !query ||
      t.name.toLowerCase().includes(query) ||
      t.jsName.toLowerCase().includes(query) ||
      t.cssVar.toLowerCase().includes(query) ||
      String(t.rawValue).includes(query);
    return matchesBreakpoint && matchesSearch;
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
            label="Breakpoint"
            value={selectedBreakpoint}
            onValueChange={v => setSelectedBreakpoint(v)}
            required
          >
            <SelectItem value="all">All breakpoints</SelectItem>
            {BREAKPOINTS.map(bp => (
              <SelectItem key={bp} value={bp}>
                {BREAKPOINT_LABELS[bp]}
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

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Token</th>
            {mode === 'browser' && <th style={tableHeaderStyle}>CSS Custom Property</th>}
            <th style={tableHeaderStyle}>Value</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(({ name, jsName, cssVar, rawValue }) => {
            const resolvedValue = resolvedValues[cssVar.slice(4, -1)];
            const displayValue = mode === 'browser'
              ? (resolvedValue ?? `${rawValue}px`)
              : rawValue;
            return (
              <tr key={name} style={rowStyle}>
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
