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
      token: { path: 'semantic.background.brand', css: { variable: '--h-background-brand' } },
    });
  });

  it('lists the primitive space tokens with their declared CSS values and groups the device variants of a shadow', () => {
    const consumer = createConsumer();
    const scopeDir = join(consumer, 'node_modules', '@utilitywarehouse');
    mkdirSync(scopeDir, { recursive: true });
    symlinkSync(realTokensPackage, join(scopeDir, 'hearth-tokens'));

    const space = execFileSync(
      binary,
      ['tokens', 'list', '--layer', 'primitive', '--type', 'number', '--limit', '1000', '--json'],
      { cwd: consumer, encoding: 'utf8' }
    );
    const shadow = execFileSync(binary, ['tokens', 'get', 'semantic.shadow.md.x', '--json'], {
      cwd: consumer,
      encoding: 'utf8',
    });

    const { tokens } = JSON.parse(space) as {
      tokens: Array<{ path: string; values: { default: string } }>;
    };
    expect(tokens.find(token => token.path === 'space.100')?.values).toEqual({ default: '8px' });
    expect(JSON.parse(shadow)).toMatchObject({
      path: 'semantic.shadow.md.x',
      tokens: [{ device: 'mobile' }, { device: 'tablet' }, { device: 'desktop' }],
    });
  });
});
