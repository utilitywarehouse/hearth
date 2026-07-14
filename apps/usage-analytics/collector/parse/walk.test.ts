import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { test } from 'node:test';
import { buildContext, walkRepo } from './walk.ts';

const manifest = {
  packages: {
    '@utilitywarehouse/hearth-react': {
      type: 'component-lib' as const,
      symbols: ['Button', 'Card'],
    },
    '@utilitywarehouse/web-ui': {
      type: 'component-lib' as const,
      symbols: [],
      legacy: true,
    },
  },
};

void test('per-symbol fileCount counts distinct files, not repo count', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'walk-test-'));
  try {
    // Button appears in two files (3 refs total); Card in one file (2 refs).
    fs.writeFileSync(
      path.join(dir, 'a.tsx'),
      `import { Button } from '@utilitywarehouse/hearth-react';\nconst a = <><Button /><Button /></>;`
    );
    fs.writeFileSync(
      path.join(dir, 'b.tsx'),
      `import { Button, Card } from '@utilitywarehouse/hearth-react';\nconst b = <><Button /><Card /></>;`
    );

    const ctx = buildContext(manifest);
    const result = walkRepo(dir, ctx);
    const react = result.packages['@utilitywarehouse/hearth-react']!;

    // Button: 2 files, refs = (import+2 uses in a) + (import+1 use in b) = 3 + 2 = 5.
    assert.equal(react.symbols['Button']!.fileCount, 2);
    assert.equal(react.symbols['Button']!.refCount, 5);
    // Card: 1 file only.
    assert.equal(react.symbols['Card']!.fileCount, 1);
    assert.equal(react.fileCount, 2);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

void test("prop usage is aggregated across a repo's files", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'walk-test-'));
  try {
    fs.writeFileSync(
      path.join(dir, 'a.tsx'),
      `import { Button } from '@utilitywarehouse/hearth-react';\nconst a = <Button variant="primary" />;`
    );
    fs.writeFileSync(
      path.join(dir, 'b.tsx'),
      `import { Button } from '@utilitywarehouse/hearth-react';\nconst b = <Button variant="secondary" onClick={fn} />;`
    );

    const ctx = buildContext(manifest);
    const result = walkRepo(dir, ctx);
    const button = result.packages['@utilitywarehouse/hearth-react']!.symbols['Button']!;

    assert.equal(button.props?.['variant'], 2);
    assert.equal(button.props?.['onClick'], 1);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

void test('package.json dependency ranges are collected per package', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'walk-test-'));
  try {
    fs.writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({ dependencies: { '@utilitywarehouse/hearth-react': '^2.3.0' } })
    );

    const ctx = buildContext(manifest);
    const result = walkRepo(dir, ctx);

    assert.deepEqual(result.versions['@utilitywarehouse/hearth-react'], { '^2.3.0': 1 });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

void test('a monorepo with mixed ranges across workspace package.json files records both', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'walk-test-'));
  try {
    fs.writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({ dependencies: { '@utilitywarehouse/hearth-react': '^1.0.0' } })
    );
    fs.mkdirSync(path.join(dir, 'apps', 'foo'), { recursive: true });
    fs.writeFileSync(
      path.join(dir, 'apps', 'foo', 'package.json'),
      JSON.stringify({ dependencies: { '@utilitywarehouse/hearth-react': '^2.0.0' } })
    );

    const ctx = buildContext(manifest);
    const result = walkRepo(dir, ctx);

    assert.deepEqual(result.versions['@utilitywarehouse/hearth-react'], {
      '^1.0.0': 1,
      '^2.0.0': 1,
    });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

void test('a package declared but never imported still surfaces with zero-usage stats', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'walk-test-'));
  try {
    fs.writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({ devDependencies: { '@utilitywarehouse/hearth-react': '^2.3.0' } })
    );
    // No source files reference hearth-react at all.
    fs.writeFileSync(path.join(dir, 'a.ts'), `export const x = 1;`);

    const ctx = buildContext(manifest);
    const result = walkRepo(dir, ctx);

    assert.deepEqual(result.versions['@utilitywarehouse/hearth-react'], { '^2.3.0': 1 });
    assert.equal(result.packages['@utilitywarehouse/hearth-react'], undefined);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

void test('package.json under node_modules is ignored', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'walk-test-'));
  try {
    fs.mkdirSync(path.join(dir, 'node_modules', '@utilitywarehouse'), { recursive: true });
    fs.writeFileSync(
      path.join(dir, 'node_modules', '@utilitywarehouse', 'package.json'),
      JSON.stringify({ dependencies: { '@utilitywarehouse/hearth-react': '^9.9.9' } })
    );

    const ctx = buildContext(manifest);
    const result = walkRepo(dir, ctx);

    assert.deepEqual(result.versions, {});
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

void test('files using only a legacy package (no hearth import) are still parsed', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'walk-test-'));
  try {
    // No "@utilitywarehouse/hearth" substring anywhere in this file — a repo
    // that hasn't migrated at all yet must not be silently skipped.
    fs.writeFileSync(
      path.join(dir, 'a.tsx'),
      `import { Button } from '@utilitywarehouse/web-ui';\nconst a = <Button />;`
    );

    const ctx = buildContext(manifest);
    const result = walkRepo(dir, ctx);
    const webUi = result.packages['@utilitywarehouse/web-ui'];

    assert.ok(webUi, 'expected legacy-only file to be parsed');
    assert.equal(webUi.symbols['Button']!.refCount, 2);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
