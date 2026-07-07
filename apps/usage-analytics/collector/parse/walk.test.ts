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

void test('prop usage is aggregated across a repo\'s files', () => {
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
