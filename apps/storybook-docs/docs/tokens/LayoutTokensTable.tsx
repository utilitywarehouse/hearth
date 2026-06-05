import { useState, useEffect } from 'react';
import { layout as browserLayout, border, semantic } from '@utilitywarehouse/hearth-tokens/browser';
import { layout as jsLayout } from '@utilitywarehouse/hearth-tokens/js';
import { Box, Flex, HelperText, Select, SelectItem } from '@utilitywarehouse/hearth-react';
import { TokenSearchInput, cellStyle, rowStyle, tableHeaderStyle, tableStyle } from './shared';
import React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Mode = 'browser' | 'js';
type Breakpoint = 'mobile' | 'tablet' | 'desktop';

interface LayoutSpacingToken {
  name: string;
  jsName: string;
  breakpoint: Breakpoint;
  spacingKey: string;
  cssVar: string;
  rawValue: number;
}

// ---------------------------------------------------------------------------
// Data — spacing tokens
// ---------------------------------------------------------------------------

const BREAKPOINTS = Object.keys(jsLayout) as Breakpoint[];
const SPACING_KEYS = Object.keys(browserLayout.spacing);

const tokens: LayoutSpacingToken[] = SPACING_KEYS.flatMap(spacingKey =>
  BREAKPOINTS.map(breakpoint => ({
    name: `layout.spacing.${spacingKey}.${breakpoint}`,
    jsName: `layout.${breakpoint}.spacing.${spacingKey}`,
    breakpoint,
    spacingKey,
    cssVar: browserLayout.spacing[spacingKey as keyof typeof browserLayout.spacing][breakpoint],
    rawValue: jsLayout[breakpoint].spacing[spacingKey as keyof typeof jsLayout.desktop.spacing],
  }))
);

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SpacingBar({ value }: { value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: value,
        alignItems: 'center',
        height: '16px',
        width: 'fit-content',
      }}
    >
      <div style={{ height: '8px', border: `${border.width[1]} solid ${semantic.border.strong}` }} />
      <div style={{ height: '8px', border: `${border.width[1]} solid ${semantic.border.strong}` }} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const BREAKPOINT_LABELS: Record<Breakpoint, string> = {
  mobile: 'Mobile',
  tablet: 'Tablet',
  desktop: 'Desktop',
};

export function LayoutSpacingTokensTable() {
  const [mode, setMode] = useState<Mode>('browser');
  const [selectedBreakpoint, setSelectedBreakpoint] = useState<string>('all');
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
          {filtered.map(({ name, jsName, cssVar, rawValue }) => {
            const resolvedValue = resolvedValues[cssVar.slice(4, -1)];
            const displayValue = mode === 'browser'
              ? (resolvedValue ?? `${rawValue}px`)
              : rawValue;
            return (
              <tr key={name} style={rowStyle}>
                <td style={{ ...cellStyle, verticalAlign: 'middle', width: '1%', whiteSpace: 'nowrap' }}>
                  <SpacingBar value={resolvedValue ?? `${rawValue}px`} />
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

// ---------------------------------------------------------------------------
// JS-only reference table (breakpoints, container, grid)
// ---------------------------------------------------------------------------

type JsOnlyGroup = 'breakpoints' | 'container' | 'grid';

interface JsReferenceToken {
  name: string;
  breakpoint: Breakpoint;
  group: JsOnlyGroup;
  key: string;
  value: number;
}

const JS_ONLY_GROUPS: JsOnlyGroup[] = ['breakpoints', 'container', 'grid'];

const jsReferenceTokens: JsReferenceToken[] = BREAKPOINTS.flatMap(breakpoint =>
  JS_ONLY_GROUPS.flatMap(group =>
    Object.keys(jsLayout[breakpoint][group]).map(key => ({
      name: `layout.${breakpoint}.${group}.${key}`,
      breakpoint,
      group,
      key,
      value: (jsLayout[breakpoint][group] as Record<string, number>)[key],
    }))
  )
);

const JS_ONLY_GROUP_LABELS: Record<JsOnlyGroup, string> = {
  breakpoints: 'Breakpoints',
  container: 'Container',
  grid: 'Grid',
};

export function LayoutJsReferenceTable() {
  const [selectedBreakpoint, setSelectedBreakpoint] = useState<string>('all');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [search, setSearch] = useState('');

  const query = search.toLowerCase();
  const filtered = jsReferenceTokens.filter(t => {
    const matchesBreakpoint = selectedBreakpoint === 'all' || t.breakpoint === selectedBreakpoint;
    const matchesGroup = selectedGroup === 'all' || t.group === selectedGroup;
    const matchesSearch =
      !query ||
      t.name.toLowerCase().includes(query) ||
      String(t.value).includes(query);
    return matchesBreakpoint && matchesGroup && matchesSearch;
  });

  return (
    <Flex direction="column" gap="300">
      <Flex gap="200" wrap="wrap">
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
        <Box minWidth="200px">
          <Select
            label="Group"
            value={selectedGroup}
            onValueChange={v => setSelectedGroup(v)}
            required
          >
            <SelectItem value="all">All</SelectItem>
            {JS_ONLY_GROUPS.map(g => (
              <SelectItem key={g} value={g}>
                {JS_ONLY_GROUP_LABELS[g]}
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
            <th style={tableHeaderStyle}>Value</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(({ name, value }) => (
            <tr key={name} style={rowStyle}>
              <td style={cellStyle}>{name}</td>
              <td style={cellStyle}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && <HelperText>No tokens match &ldquo;{search}&rdquo;</HelperText>}
    </Flex>
  );
}
