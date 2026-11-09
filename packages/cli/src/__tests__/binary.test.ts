import { execFileSync } from 'node:child_process';
import { mkdirSync, symlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeAll, describe, expect, it } from 'vitest';
import { TOKENS_PACKAGE, createConsumer } from './consumer-fixture.js';

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const binary = join(packageRoot, 'dist', 'cli.js');
const realTokensPackage = join(packageRoot, '..', 'tokens');

describe('the built hearth binary', () => {
  beforeAll(() => {
    execFileSync('npx', ['tsup'], { cwd: packageRoot, stdio: 'pipe' });
  }, 60_000);

  it('answers a token lookup from the real tokens manifest installed in a consumer project', () => {
    const consumer = createConsumer();
    const scopeDir = join(consumer, 'node_modules', '@utilitywarehouse');
    mkdirSync(scopeDir, { recursive: true });
    symlinkSync(realTokensPackage, join(scopeDir, 'hearth-tokens'));

    const out = execFileSync(binary, ['tokens', 'get', 'semantic.background.brand', '--json'], {
      cwd: consumer,
      encoding: 'utf8',
    });

    expect(JSON.parse(out)).toMatchObject({
      package: { name: TOKENS_PACKAGE },
      platform: 'web',
      tokens: [{ path: 'semantic.background.brand', css: { variable: '--h-background-brand' } }],
    });
  });
});
