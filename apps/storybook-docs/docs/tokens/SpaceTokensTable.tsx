import { useState, useCallback } from 'react';
import { space as browserSpace } from '@utilitywarehouse/hearth-tokens/browser';
import jsSpace from '@utilitywarehouse/hearth-tokens/js/space';
import { Select, SelectItem, UnstyledIconButton } from '@utilitywarehouse/hearth-react';
import { CopySmallIcon, TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { TokenSearchInput } from './shared';
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

const BAR_COLOR = 'var(--h-color-purple-700)';
const BAR_HEIGHT = 16;

function SpaceBar({ widthValue, rawPx }: { widthValue: string; rawPx: number }) {
  if (rawPx === 0) {
    return (
      <span
        style={{ color: 'var(--h-color-grey-500)', fontSize: '0.75rem', fontFamily: 'sans-serif' }}
      >
        0
      </span>
    );
  }
  return (
    <div
      style={{
        width: widthValue,
        height: BAR_HEIGHT,
        backgroundColor: BAR_COLOR,
        borderRadius: 2,
      }}
    />
  );
}

interface CopyCellProps {
  text: string;
}

function CopyCell({ text }: CopyCellProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0 }}>
      <span
        style={{
          flex: '1 1 0',
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
        title={text}
      >
        {text}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Table
// ---------------------------------------------------------------------------

const thStyle = {
  textAlign: 'left' as const,
  padding: '8px 12px',
  borderBottom: '2px solid #d3d3d3',
  fontFamily: 'sans-serif',
  fontWeight: 600,
  overflow: 'hidden',
};

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

      <table
        style={{
          width: '100%',
          tableLayout: 'fixed',
          borderCollapse: 'collapse',
          fontSize: '0.8125rem',
          fontFamily: 'monospace',
        }}
      >
        {mode === 'browser' ? (
          <colgroup>
            <col style={{ width: '28%' }} />
            <col style={{ width: '34%' }} />
            <col style={{ width: '14%' }} />
            <col style={{ width: '24%' }} />
          </colgroup>
        ) : (
          <colgroup>
            <col style={{ width: '42%' }} />
            <col style={{ width: '18%' }} />
            <col style={{ width: '40%' }} />
          </colgroup>
        )}
        <thead>
          <tr>
            <th style={thStyle}>Token</th>
            {mode === 'browser' && <th style={thStyle}>CSS Custom Property</th>}
            <th style={thStyle}>{mode === 'browser' ? 'Raw Value' : 'Value'}</th>
            <th style={thStyle}>Preview</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map(({ name, cssVar, rawPx }) => (
            <tr key={name} style={{ borderBottom: '1px solid #ebebeb' }}>
              <td style={{ padding: '6px 12px' }}>
                <CopyCell text={name} />
              </td>
              {mode === 'browser' && (
                <td style={{ padding: '6px 12px' }}>
                  <CopyCell text={cssVar} />
                </td>
              )}
              <td style={tdStyle}>{mode === 'browser' ? `${rawPx}px` : rawPx}</td>
              <td style={{ padding: '6px 12px', verticalAlign: 'middle' }}>
                <SpaceBar widthValue={mode === 'browser' ? cssVar : `${rawPx}px`} rawPx={rawPx} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
