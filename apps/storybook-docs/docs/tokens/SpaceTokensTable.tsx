import { useState } from 'react';
import { space as browserSpace, semantic, border } from '@utilitywarehouse/hearth-tokens/browser';
import jsSpace from '@utilitywarehouse/hearth-tokens/js/space';
import { Select, SelectItem } from '@utilitywarehouse/hearth-react';
import { cellStyle, rowStyle, tableHeaderStyle, tableStyle } from './shared';
import React from 'react';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

type Mode = 'browser' | 'js';

const tokens = Object.entries(browserSpace).map(([k, cssVar]) => ({
  key: Number(k),
  name: `space.${k}`,
  cssVar: cssVar as string,
  rawPx: (jsSpace as Record<string, number>)[k],
}));

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SpaceBar({ gap }: { gap: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap,
        backgroundColor: semantic.surface.pig.subtle,
        height: '16px',
        width: 'fit-content',
        alignItems: 'center',
      }}
    >
      <div
        style={{ height: '100%', border: `${border.width[1]} solid ${semantic.border.strong}` }}
      />
      <div
        style={{ height: '100%', border: `${border.width[1]} solid ${semantic.border.strong}` }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Table
// ---------------------------------------------------------------------------

const tdStyle = {
  padding: '6px 12px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap' as const,
};

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function SpaceTokensTable() {
  const [mode, setMode] = useState<Mode>('browser');

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ marginBottom: '1rem', minWidth: 200 }}>
          <Select label="Token format" value={mode} onValueChange={v => setMode(v as Mode)}>
            <SelectItem value="browser">Browser / CSS</SelectItem>
            <SelectItem value="js">JS</SelectItem>
          </Select>
        </div>
      </div>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Token</th>
            {mode === 'browser' && <th style={tableHeaderStyle}>CSS Custom Property</th>}
            <th style={tableHeaderStyle}>{mode === 'browser' ? 'Raw Value' : 'Value'}</th>
            <th style={tableHeaderStyle}>Preview</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map(({ name, cssVar, rawPx }) => (
            <tr key={name} style={rowStyle}>
              <td style={{ padding: '6px 12px', verticalAlign: 'middle' }}>
                <SpaceBar gap={mode === 'browser' ? cssVar : `${rawPx}px`} />
              </td>
              <td style={cellStyle}>{name}</td>
              {mode === 'browser' && <td style={cellStyle}>{cssVar}</td>}
              <td style={tdStyle}>{mode === 'browser' ? `${rawPx}px` : rawPx}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
