import assert from 'node:assert/strict';
import { test } from 'node:test';
import { analyzeFile, type AnalyzeContext } from './imports.ts';

const ctx: AnalyzeContext = {
  packages: new Map([
    [
      '@utilitywarehouse/hearth-react',
      { type: 'component-lib', symbols: new Set(['Button', 'Card', 'Box']), legacy: false },
    ],
    [
      '@utilitywarehouse/hearth-tokens',
      { type: 'tokens', symbols: new Set(['color', 'space', 'typography']), legacy: false },
    ],
    [
      '@utilitywarehouse/hearth-react-icons',
      { type: 'icons', symbols: new Set(['AddMediumIcon']), legacy: false },
    ],
    ['@utilitywarehouse/hearth-css-reset', { type: 'asset', symbols: new Set(), legacy: false }],
  ]),
};

void test('named imports + JSX usages count references', () => {
  const code = `
    import { Button, Card as MyCard } from '@utilitywarehouse/hearth-react';
    export function App() {
      return <><Button /><Button /><MyCard /></>;
    }
  `;
  const usage = analyzeFile(code, ctx);
  const react = usage.get('@utilitywarehouse/hearth-react')!;
  // Button: import + 2 JSX usages = 3; Card: import + 1 usage = 2.
  assert.equal(react.symbols['Button'], 3);
  assert.equal(react.symbols['Card'], 2);
  assert.equal(react.importStatements, 1);
});

void test('multiline imports parse', () => {
  const code = `
    import {
      Button,
      Box,
    } from '@utilitywarehouse/hearth-react';
    const x = <Box><Button/></Box>;
  `;
  const react = analyzeFile(code, ctx).get('@utilitywarehouse/hearth-react')!;
  assert.ok(react.symbols['Button']! >= 2);
  assert.ok(react.symbols['Box']! >= 2);
});

void test('non-exported symbols are dropped by the allow-list', () => {
  const code = `import { Button, NotARealComponent } from '@utilitywarehouse/hearth-react';`;
  const react = analyzeFile(code, ctx).get('@utilitywarehouse/hearth-react')!;
  assert.equal(react.symbols['Button'], 1);
  assert.equal(react.symbols['NotARealComponent'], undefined);
});

void test('token named import member access -> group granularity', () => {
  const code = `
    import { color, space } from '@utilitywarehouse/hearth-tokens';
    const styles = { color: color.blue[500], padding: space[3], border: color.red[100] };
  `;
  const tokens = analyzeFile(code, ctx).get('@utilitywarehouse/hearth-tokens')!;
  assert.ok((tokens.symbols['color.blue'] ?? 0) >= 1);
  assert.ok((tokens.symbols['color.red'] ?? 0) >= 1);
  assert.ok((tokens.symbols['space'] ?? 0) >= 1);
});

void test('token default/namespace import resolves group', () => {
  const code = `
    import tokens from '@utilitywarehouse/hearth-tokens';
    const c = tokens.color.blue[500];
  `;
  const tokens = analyzeFile(code, ctx).get('@utilitywarehouse/hearth-tokens')!;
  assert.ok((tokens.symbols['color.blue'] ?? 0) >= 1);
});

void test('require() destructuring is handled', () => {
  const code = `const { Button } = require('@utilitywarehouse/hearth-react');`;
  const react = analyzeFile(code, ctx).get('@utilitywarehouse/hearth-react')!;
  assert.equal(react.symbols['Button'], 1);
});

void test('re-export from tracked package counts', () => {
  const code = `export { Button } from '@utilitywarehouse/hearth-react';`;
  const react = analyzeFile(code, ctx).get('@utilitywarehouse/hearth-react')!;
  assert.equal(react.symbols['Button'], 1);
});

void test('side-effect asset import registers the package', () => {
  const code = `import '@utilitywarehouse/hearth-css-reset';`;
  const reset = analyzeFile(code, ctx).get('@utilitywarehouse/hearth-css-reset')!;
  assert.equal(reset.importStatements, 1);
});

void test('icon default import + usage', () => {
  const code = `
    import { AddMediumIcon } from '@utilitywarehouse/hearth-react-icons';
    const el = <AddMediumIcon />;
  `;
  const icons = analyzeFile(code, ctx).get('@utilitywarehouse/hearth-react-icons')!;
  assert.equal(icons.symbols['AddMediumIcon'], 2);
});

void test('deep/subpath imports resolve to the package', () => {
  const code = `
    import { space, color } from '@utilitywarehouse/hearth-tokens/js';
    import { AddMediumIcon } from '@utilitywarehouse/hearth-react-icons/lib/AddMediumIcon';
    const p = space[3];
    const el = <AddMediumIcon />;
  `;
  const usage = analyzeFile(code, ctx);
  assert.ok((usage.get('@utilitywarehouse/hearth-tokens')!.symbols['space'] ?? 0) >= 1);
  assert.equal(usage.get('@utilitywarehouse/hearth-react-icons')!.symbols['AddMediumIcon'], 2);
});

void test('hearth-react prefix does not swallow hearth-react-icons', () => {
  const code = `import { AddMediumIcon } from '@utilitywarehouse/hearth-react-icons';`;
  const usage = analyzeFile(code, ctx);
  assert.equal(usage.has('@utilitywarehouse/hearth-react'), false);
  assert.ok(usage.has('@utilitywarehouse/hearth-react-icons'));
});

void test('untracked package with same-named import is ignored', () => {
  const code = `import { Button } from 'some-other-lib';`;
  assert.equal(analyzeFile(code, ctx).size, 0);
});

void test('JSX prop names are counted per component-lib symbol', () => {
  const code = `
    import { Button } from '@utilitywarehouse/hearth-react';
    const el = (
      <>
        <Button variant="primary" onClick={fn} />
        <Button variant="secondary" disabled />
      </>
    );
  `;
  const react = analyzeFile(code, ctx).get('@utilitywarehouse/hearth-react')!;
  assert.equal(react.props['Button']!['variant'], 2);
  assert.equal(react.props['Button']!['onClick'], 1);
  assert.equal(react.props['Button']!['disabled'], 1);
});

void test('spread props are not counted', () => {
  const code = `
    import { Button } from '@utilitywarehouse/hearth-react';
    const rest = {};
    const el = <Button {...rest} variant="primary" />;
  `;
  const react = analyzeFile(code, ctx).get('@utilitywarehouse/hearth-react')!;
  assert.equal(react.props['Button']!['variant'], 1);
  assert.equal(Object.keys(react.props['Button']!).length, 1);
});

void test('non-JSX references to a component-lib symbol record no props', () => {
  const code = `
    import { Button } from '@utilitywarehouse/hearth-react';
    const factory = () => Button;
  `;
  const react = analyzeFile(code, ctx).get('@utilitywarehouse/hearth-react')!;
  assert.equal(react.props['Button'], undefined);
});

void test('token and icon symbols do not collect props', () => {
  const code = `
    import { color } from '@utilitywarehouse/hearth-tokens';
    import { AddMediumIcon } from '@utilitywarehouse/hearth-react-icons';
    const c = color.blue[500];
    const el = <AddMediumIcon size="small" />;
  `;
  const usage = analyzeFile(code, ctx);
  assert.equal(Object.keys(usage.get('@utilitywarehouse/hearth-tokens')!.props).length, 0);
  assert.equal(Object.keys(usage.get('@utilitywarehouse/hearth-react-icons')!.props).length, 0);
});
