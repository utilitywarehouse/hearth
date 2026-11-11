import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import { createConsumer } from './consumer-fixture.js';
import { JSON_CONTRACT, type ContractName } from './json-contract.js';
import { hearth, packageRoot } from './run-binary.js';

/**
 * The real indexed packages, packed with `npm pack` and unpacked into a consumer project, so a
 * `files` entry that drops `hearth-manifest.json` (or the assets it lists) fails here. Needs npm's
 * cache, which the agent sandbox blocks, so it runs only when HEARTH_CLI_TARBALLS is set (CI sets it).
 */
const PACKAGES = {
  tokens: '@utilitywarehouse/hearth-tokens',
  'react-icons': '@utilitywarehouse/hearth-react-icons',
  'svg-assets': '@utilitywarehouse/hearth-svg-assets',
  'json-assets': '@utilitywarehouse/hearth-json-assets',
} as const;

const install = (consumer: string, directory: keyof typeof PACKAGES) => {
  const packed = mkdtempSync(join(tmpdir(), 'hearth-pack-'));
  execFileSync('npm', ['pack', '--pack-destination', packed], {
    cwd: join(packageRoot, '..', directory),
    stdio: 'pipe',
  });
  const [tarball] = readdirSync(packed);
  const target = join(consumer, 'node_modules', ...PACKAGES[directory].split('/'));
  mkdirSync(target, { recursive: true });
  execFileSync('tar', ['-xzf', join(packed, tarball), '-C', target, '--strip-components=1']);
};

/** First name from a `list --json` result, so the test does not hard-code package contents. */
const firstName = (consumer: string, args: Array<string>, key: 'icons' | 'assets') => {
  const { out } = hearth(consumer, [...args, '--limit', '1', '--json']);
  return (JSON.parse(out) as Record<string, Array<{ name: string }>>)[key][0].name;
};

describe.skipIf(!process.env.HEARTH_CLI_TARBALLS)(
  'the built hearth binary against npm pack tarballs',
  () => {
    let consumer: string;

    beforeAll(() => {
      consumer = createConsumer();
      for (const directory of Object.keys(PACKAGES) as Array<keyof typeof PACKAGES>) {
        install(consumer, directory);
      }
    }, 120_000);

    it.each<[ContractName, Array<string>]>([
      ['tokens search/list', ['tokens', 'search', 'brand']],
      ['tokens get (one token)', ['tokens', 'get', 'semantic.background.brand']],
      ['icons search/list', ['icons', 'list']],
      ['assets svg search/list', ['assets', 'svg', 'list']],
      ['assets json search/list', ['assets', 'json', 'list']],
    ])('%s matches its contract: hearth %j', (name, args) => {
      const { code, out } = hearth(consumer, [...args, '--json']);

      expect(code).toBe(0);
      expect(JSON_CONTRACT[name].safeParse(JSON.parse(out)).error?.issues).toBeUndefined();
    });

    it('gets one icon and one asset of each kind that the lists name', () => {
      const icon = firstName(consumer, ['icons', 'list'], 'icons');
      const svg = firstName(consumer, ['assets', 'svg', 'list'], 'assets');
      const json = firstName(consumer, ['assets', 'json', 'list'], 'assets');

      const results: Array<[ContractName, Array<string>]> = [
        ['icons get', ['icons', 'get', icon]],
        ['assets svg get', ['assets', 'svg', 'get', svg]],
        ['assets json get', ['assets', 'json', 'get', json]],
      ];
      for (const [name, args] of results) {
        const { code, out } = hearth(consumer, [...args, '--json']);
        expect(code).toBe(0);
        expect(JSON_CONTRACT[name].safeParse(JSON.parse(out)).error?.issues).toBeUndefined();
      }
    });

    it('prints an asset file that the packed svg-assets package ships', () => {
      const svg = firstName(consumer, ['assets', 'svg', 'list'], 'assets');

      const { code, out } = hearth(consumer, ['assets', 'svg', 'get', svg, '--print']);

      expect(code).toBe(0);
      expect(out).toContain('<svg');
    });
  }
);
