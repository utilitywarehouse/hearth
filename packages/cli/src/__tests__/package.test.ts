import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { binary, packageRoot } from './run-binary.js';

const read = (path: string) => readFileSync(join(packageRoot, path), 'utf8');
const pkg = JSON.parse(read('package.json')) as {
  private?: boolean;
  bin: Record<string, string>;
  files: Array<string>;
  engines: { node: string };
  exports: Record<string, unknown>;
  publishConfig: { access: string };
  peerDependencies: Record<string, string>;
  peerDependenciesMeta: Record<string, { optional?: boolean }>;
};

/** What `hearth` reads from a consumer's `node_modules`; keep in step with `INDEXED_PACKAGES` in hearth-manifest. */
const INDEXED = [
  'tokens',
  'svg-icons',
  'react-icons',
  'react-native-icons',
  'svg-assets',
  'json-assets',
].map(dir => `@utilitywarehouse/hearth-${dir}`);

describe('the published package', () => {
  it('is public, so changesets publishes it', () => {
    expect(pkg.private).toBeUndefined();
    expect(pkg.publishConfig.access).toBe('public');
  });

  it('ships a bin that the build produces, from a published directory', () => {
    expect(pkg.bin).toEqual({ hearth: './dist/cli.js' });
    expect(existsSync(binary)).toBe(true);
    expect(pkg.files).toContain('dist');
  });

  it('is bin-only: nothing but package.json is importable', () => {
    expect(pkg.exports).toEqual({ './package.json': './package.json' });
  });

  it('declares the Node floor the bundle is built for', () => {
    const target = /target:\s*'node(\d+)'/.exec(read('tsup.config.ts'))?.[1];

    expect(pkg.engines.node).toBe(`>=${target}`);
    expect(Number(target)).toBeGreaterThanOrEqual(20);
  });

  it('lists every indexed package as an optional peer that accepts any version', () => {
    expect(Object.keys(pkg.peerDependencies).sort()).toEqual([...INDEXED].sort());
    for (const name of INDEXED) {
      expect(pkg.peerDependencies[name]).toBe('*');
      expect(pkg.peerDependenciesMeta[name]).toEqual({ optional: true });
    }
  });
});
