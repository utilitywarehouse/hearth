import { useState, useEffect } from 'react';
import { components as browserComponents } from '@utilitywarehouse/hearth-tokens/browser';
import { components as jsComponents } from '@utilitywarehouse/hearth-tokens/js';
import { Box, Flex, HelperText, Select, SelectItem } from '@utilitywarehouse/hearth-react';
import { TokenSearchInput, cellStyle, rowStyle, tableHeaderStyle, tableStyle, flattenTokens } from './shared';
import React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Mode = 'browser' | 'js';
type JsColorMode = 'both' | 'light' | 'dark';

interface ComponentToken {
  name: string;
  component: string;
  cssVar: string;
  lightValue: string;
  darkValue: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getNestedValue(obj: Record<string, unknown>, path: string[]): unknown {
  let current: unknown = obj;
  for (const key of path) {
    if (current === null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return current;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const COMPONENT_KEYS = Object.keys(browserComponents).sort();

const flatBrowser = flattenTokens(
  browserComponents as unknown as Record<string, unknown>,
  'components'
);

const tokens: ComponentToken[] = flatBrowser.map(({ name, value: cssVar }) => {
  const parts = name.split('.').slice(1); // strip leading 'components'
  const component = parts[0];
  const lightValue = getNestedValue(
    jsComponents.light as unknown as Record<string, unknown>,
    parts
  );
  const darkValue = getNestedValue(
    jsComponents.dark as unknown as Record<string, unknown>,
    parts
  );
  return {
    name,
    component,
    cssVar,
    lightValue: lightValue !== undefined ? String(lightValue) : '',
    darkValue: darkValue !== undefined ? String(darkValue) : '',
  };
});

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ComponentTokensTable() {
  const [mode, setMode] = useState<Mode>('browser');
  const [jsColorMode, setJsColorMode] = useState<JsColorMode>('both');
  const [selectedComponent, setSelectedComponent] = useState<string>('all');
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
    const matchesComponent =
      selectedComponent === 'all' || t.component === selectedComponent;
    const matchesSearch =
      !query ||
      t.name.toLowerCase().includes(query) ||
      t.cssVar.toLowerCase().includes(query) ||
      t.lightValue.toLowerCase().includes(query) ||
      t.darkValue.toLowerCase().includes(query);
    return matchesComponent && matchesSearch;
  });

  const showLight = mode === 'js' && jsColorMode !== 'dark';
  const showDark = mode === 'js' && jsColorMode !== 'light';

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
            label="JS colour mode"
            value={jsColorMode}
            onValueChange={v => setJsColorMode(v as JsColorMode)}
            disabled={mode !== 'js'}
            required
          >
            <SelectItem value="both">Both</SelectItem>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </Select>
        </Box>
        <Box minWidth="200px">
          <Select
            label="Component"
            value={selectedComponent}
            onValueChange={v => setSelectedComponent(v)}
            required
          >
            <SelectItem value="all">All components</SelectItem>
            {COMPONENT_KEYS.map(c => (
              <SelectItem key={c} value={c}>
                {c}
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
            <th style={tableHeaderStyle}>Token</th>
            {mode === 'browser' && <th style={tableHeaderStyle}>CSS Custom Property</th>}
            <th style={{ ...tableHeaderStyle, width: '1%', whiteSpace: 'nowrap' }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(({ name, cssVar, lightValue, darkValue }) => {
            const resolvedValue = resolvedValues[cssVar.slice(4, -1)] ?? '';
            const jsLightName = `components.light.${name.split('.').slice(1).join('.')}`;
            const jsDarkName = `components.dark.${name.split('.').slice(1).join('.')}`;
            return (
              <tr key={name} style={rowStyle}>
                <td style={cellStyle}>
                  {mode === 'browser' ? (
                    name
                  ) : (
                    <Flex direction="column" gap="50">
                      {showLight && <span>{jsLightName}</span>}
                      {showDark && <span>{jsDarkName}</span>}
                    </Flex>
                  )}
                </td>
                {mode === 'browser' && <td style={cellStyle}>{cssVar}</td>}
                <td style={{ ...cellStyle, width: '1%', whiteSpace: 'nowrap' }}>
                  {mode === 'browser' && resolvedValue}
                  {mode === 'js' && (
                    <Flex direction="column" gap="50">
                      {showLight && <span>{lightValue}</span>}
                      {showDark && <span>{darkValue}</span>}
                    </Flex>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {filtered.length === 0 && <HelperText>No tokens match &ldquo;{search}&rdquo;</HelperText>}
    </Flex>
  );
}
