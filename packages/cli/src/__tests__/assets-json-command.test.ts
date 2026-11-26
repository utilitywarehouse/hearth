import { describe, expect, it } from 'vitest';
import { run } from '../run.js';
import {
  JSON_ASSETS_PACKAGE,
  SVG_ASSETS_PACKAGE,
  createConsumer,
  installAssetFile,
  installPackage,
  jsonAssetEntry,
  jsonAssetsManifest,
  svgAssetsManifest,
} from './consumer-fixture.js';

const consumerWithJsonAssets = (entries?: Array<ReturnType<typeof jsonAssetEntry>>) => {
  const consumer = createConsumer();
  installPackage(consumer, JSON_ASSETS_PACKAGE, jsonAssetsManifest(entries));
  return consumer;
};

const cli = (argv: Array<string>, cwd = createConsumer()) => {
  let out = '';
  let err = '';
  const code = run(argv, { cwd, stdout: text => (out += text), stderr: text => (err += text) });
  return { code, out, err };
};

describe('hearth assets json', () => {
  describe('search and list', () => {
    it('lists matching assets under the name and version of the installed package', () => {
      const { code, out } = cli(['assets', 'json', 'search', 'spot'], consumerWithJsonAssets());

      expect(code).toBe(0);
      expect(out).toContain(`${JSON_ASSETS_PACKAGE} 1.2.3`);
      expect(out).toContain('AnimatedSpotAccountDark');
      expect(out).toContain('lib/animated-spot-account-dark.json');
      expect(out).not.toContain('AnimatedLogoLoader');
    });

    it('lists every asset, and exits 1 when nothing matches', () => {
      expect(cli(['assets', 'json', 'list'], consumerWithJsonAssets()).out).toContain(
        'AnimatedLogoLoader'
      );

      const { code, out } = cli(['assets', 'json', 'search', 'zzz'], consumerWithJsonAssets());
      expect(code).toBe(1);
      expect(out).toContain('No assets match "zzz"');
    });

    it('filters by --category', () => {
      const { out } = cli(
        ['assets', 'json', 'list', '--category', 'logo'],
        consumerWithJsonAssets()
      );

      expect(out).toContain('AnimatedLogoLoader');
      expect(out).not.toContain('AnimatedSpotAccountDark');
    });

    it('prints a JSON document naming the package version, kind and assets for --json', () => {
      const { code, out } = cli(
        ['assets', 'json', 'search', 'account', '--category', 'spot', '--json'],
        consumerWithJsonAssets()
      );

      expect(code).toBe(0);
      expect(JSON.parse(out)).toEqual({
        package: { name: JSON_ASSETS_PACKAGE, version: '1.2.3' },
        kind: 'json',
        category: 'spot',
        total: 2,
        assets: [
          jsonAssetEntry('AnimatedSpotAccountDark', 'spot'),
          jsonAssetEntry('AnimatedSpotAccountLight', 'spot'),
        ],
      });
    });
  });

  describe('get', () => {
    it('shows the asset with its category, type, file and what to import, without contents', () => {
      const { code, out } = cli(
        ['assets', 'json', 'get', 'AnimatedLogoLoader'],
        consumerWithJsonAssets()
      );

      expect(code).toBe(0);
      expect(out).toContain(`${JSON_ASSETS_PACKAGE} 1.2.3`);
      expect(out).toContain('AnimatedLogoLoader  (logo)');
      expect(out).toContain('animated');
      expect(out).toContain('lib/animated-logo-loader.json');
      expect(out).toContain(`${JSON_ASSETS_PACKAGE}/lib/animated-logo-loader.json`);
    });

    it('prints the package, kind and asset as JSON for --json', () => {
      const { out } = cli(
        ['assets', 'json', 'get', 'AnimatedLogoLoader', '--json'],
        consumerWithJsonAssets()
      );

      expect(JSON.parse(out)).toEqual({
        package: { name: JSON_ASSETS_PACKAGE, version: '1.2.3' },
        kind: 'json',
        asset: jsonAssetEntry('AnimatedLogoLoader', 'logo'),
      });
    });

    it('exits 1 with did-you-mean suggestions for a name that does not exist', () => {
      const { code, err } = cli(
        ['assets', 'json', 'get', 'AnimatedLogoLoadr'],
        consumerWithJsonAssets()
      );

      expect(code).toBe(1);
      expect(err).toContain('No json asset named "AnimatedLogoLoadr"');
      expect(err).toContain('Did you mean: AnimatedLogoLoader');
    });

    it('prints the raw file from the installed package for --print', () => {
      const consumer = consumerWithJsonAssets();
      installAssetFile(
        consumer,
        JSON_ASSETS_PACKAGE,
        'lib/animated-logo-loader.json',
        '{"v":"5"}\n'
      );

      const { code, out } = cli(
        ['assets', 'json', 'get', 'AnimatedLogoLoader', '--print'],
        consumer
      );

      expect(code).toBe(0);
      expect(out).toBe('{"v":"5"}\n');
    });

    it('refuses to print a file over 100 KB', () => {
      const consumer = consumerWithJsonAssets();
      installAssetFile(
        consumer,
        JSON_ASSETS_PACKAGE,
        'lib/animated-logo-loader.json',
        'x'.repeat(100 * 1024 + 1)
      );

      const { code, out, err } = cli(
        ['assets', 'json', 'get', 'AnimatedLogoLoader', '--print'],
        consumer
      );

      expect(code).toBe(1);
      expect(out).toBe('');
      expect(err).toContain('limit is 102400');
    });
  });

  describe('when the json assets package cannot be used', () => {
    it('exits 3 when it is not installed', () => {
      const { code, err } = cli(['assets', 'json', 'list']);

      expect(code).toBe(3);
      expect(err).toContain(`${JSON_ASSETS_PACKAGE} is not installed`);
    });

    it('does not read the svg assets package for json, or the reverse', () => {
      const consumer = createConsumer();
      installPackage(consumer, SVG_ASSETS_PACKAGE, svgAssetsManifest());

      expect(cli(['assets', 'json', 'list'], consumer).code).toBe(3);
      expect(cli(['assets', 'svg', 'list'], consumer).code).toBe(0);
    });

    it('exits 3 when the package ships a different kind of manifest', () => {
      const consumer = createConsumer();
      installPackage(consumer, JSON_ASSETS_PACKAGE, svgAssetsManifest());

      const { code, err } = cli(['assets', 'json', 'list'], consumer);

      expect(code).toBe(3);
      expect(err).toContain('expected a json-assets manifest, found svg-assets');
    });

    it('exits 3 when the installed package ships no manifest', () => {
      const consumer = createConsumer();
      installPackage(consumer, JSON_ASSETS_PACKAGE, undefined);

      const { code, err } = cli(['assets', 'json', 'list'], consumer);

      expect(code).toBe(3);
      expect(err).toContain('ships no hearth-manifest.json');
    });
  });

  describe('usage', () => {
    it.each([
      [['assets', 'json'], 'Unknown command'],
      [
        ['assets', 'json', 'list', '--category', 'mascot'],
        '--category must be "spot" or "logo" or "other"',
      ],
      [
        ['assets', 'json', 'get', 'AnimatedLogoLoader', '--limit', '1'],
        '--limit is only valid for',
      ],
      [['assets', 'json', 'list', '--print'], '--print is only valid for "assets json get"'],
    ])('exits 2 with the usage for %j', (argv, message) => {
      const { code, err } = cli(argv, consumerWithJsonAssets());

      expect(code).toBe(2);
      expect(err).toContain(message);
      expect(err).toContain('hearth assets json search <query>');
    });

    it('describes the assets json commands in --help alongside the svg ones', () => {
      const { out } = cli(['--help']);

      expect(out).toContain('hearth assets json search <query>');
      expect(out).toContain('hearth assets json list');
      expect(out).toContain('hearth assets json get <name> [--print]');
      expect(out).toContain('hearth assets svg search <query>');
    });
  });
});
