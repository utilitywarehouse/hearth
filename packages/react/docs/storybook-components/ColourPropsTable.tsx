import { colorPropDefs } from '../../src/props/color.props';
import { backgroundColorPropDefs } from '../../src/props/background-color.props';
import { font, space, border, semantic } from '@utilitywarehouse/hearth-tokens/browser';
import { toMdTable } from './markdown-table';

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: font.size[100],
  fontFamily: font.family.detail,
};

const tableHeaderStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: `$space[100]} ${space[150]}`,
  borderBottom: `${border.width[1]} solid ${semantic.border.strong}`,
  fontFamily: font.family.body,
  fontWeight: font.weight.semibold,
};

const rowStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
  borderBottom: `${border.width[1]} solid ${semantic.border.subtle}`,
};

const cellStyle: React.CSSProperties = {
  padding: `${space[150]}`,
  verticalAlign: 'middle',
};

const swatchStyle: React.CSSProperties = {
  width: '128px',
  height: '32px',
  borderRadius: border.radius.sm,
  border: `${border.width[1]} solid ${semantic.border.subtle}`,
};

function Swatch({ cssVar }: { cssVar: string }) {
  return <div style={{ ...swatchStyle, backgroundColor: cssVar }} />;
}

function ColourTable({
  tokens,
  cssVarFn,
}: {
  tokens: ReadonlyArray<string>;
  cssVarFn: (value: string) => string;
}) {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={{ ...tableHeaderStyle, width: '1%', whiteSpace: 'nowrap' }} />
          <th style={tableHeaderStyle}>Value</th>
          <th style={tableHeaderStyle}>CSS custom property</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map(value => (
          <tr key={value} style={rowStyle}>
            <td style={{ ...cellStyle, width: '1%', whiteSpace: 'nowrap' }}>
              <Swatch cssVar={cssVarFn(value)} />
            </td>
            <td style={cellStyle}>{value}</td>
            <td style={cellStyle}>{cssVarFn(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ColorPropsTable() {
  const tokens = colorPropDefs.color.tokens ?? [];
  return <ColourTable tokens={tokens} cssVarFn={value => `var(--h-text-${value})`} />;
}

export function BackgroundColorPropsTable() {
  const tokens = backgroundColorPropDefs.backgroundColor.tokens ?? [];
  return <ColourTable tokens={tokens} cssVarFn={value => `var(--h-background-${value})`} />;
}

export function colorPropsMarkdown(): string {
  const tokens = colorPropDefs.color.tokens ?? [];
  return toMdTable(
    ['Value', 'CSS custom property'],
    tokens.map(v => [v, `var(--h-text-${v})`])
  );
}

export function backgroundColorPropsMarkdown(): string {
  const tokens = backgroundColorPropDefs.backgroundColor.tokens ?? [];
  return toMdTable(
    ['Value', 'CSS custom property'],
    tokens.map(v => [v, `var(--h-background-${v})`])
  );
}
