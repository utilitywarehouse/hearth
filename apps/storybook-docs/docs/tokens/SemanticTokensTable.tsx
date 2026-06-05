import { useState, useEffect, useRef, useCallback } from 'react';
import {
  semantic as browserSemantic,
  border,
  color,
} from '@utilitywarehouse/hearth-tokens/browser';
import {
  semanticLight as jsSemanticLight,
  semanticDark as jsSemanticDark,
} from '@utilitywarehouse/hearth-tokens/js';
import { Box, Flex, HelperText, Select, SelectItem } from '@utilitywarehouse/hearth-react';
import {
  TokenSearchInput,
  cellStyle,
  rowStyle,
  tableHeaderStyle,
  tableStyle,
  flattenTokens,
} from './shared';
import React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Mode = 'browser' | 'js';
type JsColorMode = 'both' | 'light' | 'dark';

interface SemanticToken {
  name: string;
  browserName: string;
  group: string;
  cssVar: string;
  lightValue: string;
  darkValue: string;
  isColor: boolean;
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

const GROUP_KEYS = Object.keys(browserSemantic);

const flatBrowser = flattenTokens(
  browserSemantic as unknown as Record<string, unknown>,
  'semantic'
);

const tokens: SemanticToken[] = flatBrowser.map(({ name, value: cssVar }) => {
  const parts = name.split('.').slice(1); // strip leading 'semantic'
  const group = parts[0];
  const lightValue = getNestedValue(jsSemanticLight as unknown as Record<string, unknown>, parts);
  const darkValue = getNestedValue(jsSemanticDark as unknown as Record<string, unknown>, parts);
  const isColor = group !== 'opacity';
  // Shadow tokens are imported from `shadow`, not `semantic`, in browser environments
  const browserName = group === 'shadow' ? name.replace(/^semantic\./, '') : name;
  return {
    name,
    browserName,
    group,
    cssVar,
    lightValue: lightValue !== undefined ? String(lightValue) : '',
    darkValue: darkValue !== undefined ? String(darkValue) : '',
    isColor,
  };
});

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const swatchStyle: React.CSSProperties = {
  width: '128px',
  height: '32px',
  borderRadius: border.radius.sm,
  flexShrink: 0,
};

// Checkerboard background communicates transparency
const checkerboard: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%)
  `,
  backgroundSize: '8px 8px',
  backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0',
};

function ColorSwatch({ color }: { color: string }) {
  return <div style={{ ...swatchStyle, backgroundColor: color }} />;
}

function DualSwatch({ light, dark }: { light: string; dark: string }) {
  return (
    <Flex direction="column" gap="50">
      <ColorSwatch color={light} />
      <ColorSwatch color={dark} />
    </Flex>
  );
}

function OpacityPreview({ opacity }: { opacity: string }) {
  return (
    <div style={{ ...swatchStyle, ...checkerboard, position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: color.grey[1000],
          borderRadius: border.radius.sm,
          opacity,
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const toGroupLabel = (key: string) => key.charAt(0).toUpperCase() + key.slice(1);

export function SemanticTokensTable() {
  const [mode, setMode] = useState<Mode>('browser');
  const [jsColorMode, setJsColorMode] = useState<JsColorMode>('both');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [resolvedValues, setResolvedValues] = useState<Record<string, string>>({});
  const [showFade, setShowFade] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const updateFade = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setShowFade(
      el.scrollWidth > el.clientWidth && el.scrollLeft + el.clientWidth < el.scrollWidth - 1
    );
  }, []);

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const resolved: Record<string, string> = {};
    for (const { cssVar } of tokens) {
      const varName = cssVar.slice(4, -1);
      resolved[varName] = styles.getPropertyValue(varName).trim();
    }
    setResolvedValues(resolved);
  }, []);

  useEffect(() => {
    updateFade();
    window.addEventListener('resize', updateFade);
    return () => window.removeEventListener('resize', updateFade);
  }, [updateFade, resolvedValues]);

  const query = search.toLowerCase();
  const filtered = tokens.filter(t => {
    const matchesGroup = selectedGroup === 'all' || t.group === selectedGroup;
    const matchesSearch =
      !query ||
      t.name.toLowerCase().includes(query) ||
      t.cssVar.toLowerCase().includes(query) ||
      t.lightValue.toLowerCase().includes(query) ||
      t.darkValue.toLowerCase().includes(query);
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
            {GROUP_KEYS.map(g => (
              <SelectItem key={g} value={g}>
                {toGroupLabel(g)}
              </SelectItem>
            ))}
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
        <Box minWidth="300px">
          <TokenSearchInput
            value={search}
            onChange={setSearch}
            placeholder="Filter by name or value…"
          />
        </Box>
      </Flex>

      <div style={{ position: 'relative' }}>
        <div ref={scrollRef} onScroll={updateFade} style={{ overflowX: 'auto' }}>
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
              {filtered.map(({ name, browserName, cssVar, lightValue, darkValue, isColor }) => {
                const resolvedValue = resolvedValues[cssVar.slice(4, -1)] ?? '';
                const jsLightName = name.replace(/^semantic\./, 'semanticLight.');
                const jsDarkName = name.replace(/^semantic\./, 'semanticDark.');
                const showLight = mode === 'js' && jsColorMode !== 'dark';
                const showDark = mode === 'js' && jsColorMode !== 'light';
                return (
                  <tr key={name} style={rowStyle}>
                    <td
                      style={{
                        ...cellStyle,
                        verticalAlign: 'middle',
                        width: '1%',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {isColor && mode === 'browser' && <ColorSwatch color={cssVar} />}
                      {isColor && showLight && showDark && (
                        <DualSwatch light={lightValue} dark={darkValue} />
                      )}
                      {isColor && showLight && !showDark && <ColorSwatch color={lightValue} />}
                      {isColor && showDark && !showLight && <ColorSwatch color={darkValue} />}
                      {!isColor && (
                        <OpacityPreview opacity={mode === 'browser' ? resolvedValue : lightValue} />
                      )}
                    </td>
                    <td style={cellStyle}>
                      {mode === 'browser' ? (
                        browserName
                      ) : (
                        <Flex direction="column" gap="150">
                          {showLight && <span>{jsLightName}</span>}
                          {showDark && <span>{jsDarkName}</span>}
                        </Flex>
                      )}
                    </td>
                    {mode === 'browser' && <td style={cellStyle}>{cssVar}</td>}
                    <td style={cellStyle}>
                      {mode === 'browser' && resolvedValue}
                      {mode === 'js' && (
                        <Flex direction="column" gap="150">
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
        </div>
        {showFade && mode === 'browser' && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '24px',
              background: `linear-gradient(to right, transparent, ${browserSemantic.feedback.functional.surface.subtle})`,
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
      {filtered.length === 0 && <HelperText>No tokens match &ldquo;{search}&rdquo;</HelperText>}
    </Flex>
  );
}
