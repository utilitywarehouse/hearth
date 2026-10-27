import { execFileSync, spawnSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';

const packageRoot = path.resolve(__dirname, '..', '..');
const cli = path.join(packageRoot, 'dist', 'cli.js');
const fixture = path.join(
  packageRoot,
  'src/transforms/react/v1/__testfixtures__/remove-modal-loading-text.input.tsx'
);

describe('built cli', () => {
  beforeAll(() => {
    execFileSync('pnpm', ['build'], { cwd: packageRoot, stdio: 'ignore' });
  }, 60_000);

  it('runs a codemod from the built package', () => {
    const dir = mkdtempSync(path.join(tmpdir(), 'hearth-codemod-'));
    const target = path.join(dir, 'Component.tsx');
    copyFileSync(fixture, target);

    const result = spawnSync('node', [cli, 'react/v1/remove-modal-loading-text', dir, '--dry'], {
      encoding: 'utf8',
    });

    expect(result.status).toBe(0);
    expect(result.stdout).toContain('1 ok');
    expect(readFileSync(target, 'utf8')).toBe(readFileSync(fixture, 'utf8'));
  });
});
