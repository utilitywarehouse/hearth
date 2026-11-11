import { mkdirSync, symlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { run } from '../run.js';
import {
  SVG_ASSETS_PACKAGE,
  createConsumer,
  installAssetFile,
  installPackage,
  svgAssetEntry,
  svgAssetsManifest,
} from './consumer-fixture.js';

const consumerWithSvgAssets = (entries?: Array<ReturnType<typeof svgAssetEntry>>) => {
  const consumer = createConsumer();
  installPackage(consumer, SVG_ASSETS_PACKAGE, svgAssetsManifest(entries));
  return consumer;
};

const cli = (argv: Array<string>, cwd = createConsumer()) => {
  let out = '';
  let err = '';
  const code = run(argv, { cwd, stdout: text => (out += text), stderr: text => (err += text) });
  return { code, out, err };
};

describe('hearth assets svg', () => {
  describe('search', () => {
    it('lists matching assets under the name and version of the installed package', () => {
      const { code, out } = cli(['assets', 'svg', 'search', 'logo'], consumerWithSvgAssets());

      expect(code).toBe(0);
      expect(out).toContain(`${SVG_ASSETS_PACKAGE} 1.2.3`);
      expect(out).toContain('LogoFullPurple');
      expect(out).toContain('lib/logo-full-purple.svg');
      expect(out).not.toContain('MascotWave');
    });

    it('exits 1 and says so when nothing matches', () => {
      const { code, out } = cli(['assets', 'svg', 'search', 'zzz'], consumerWithSvgAssets());

      expect(code).toBe(1);
      expect(out).toContain('No assets match "zzz"');
    });

    it('filters by --category', () => {
      const { out } = cli(
        ['assets', 'svg', 'search', 'o', '--category', 'mascot'],
        consumerWithSvgAssets()
      );

      expect(out).toContain('MascotWave');
      expect(out).not.toContain('LogoFullPurple');
    });

    it('says how many were left out when the limit cuts the results', () => {
      const { out } = cli(
        ['assets', 'svg', 'search', 'lib', '--limit', '1'],
        consumerWithSvgAssets()
      );

      expect(out).toContain('Showing 1 of 4. Narrow the query or raise --limit.');
    });

    it('prints a JSON document naming the package version, category and assets for --json', () => {
      const { code, out } = cli(
        ['assets', 'svg', 'search', 'logo', '--category', 'logo', '--json'],
        consumerWithSvgAssets()
      );

      expect(code).toBe(0);
      expect(JSON.parse(out)).toEqual({
        package: { name: SVG_ASSETS_PACKAGE, version: '1.2.3' },
        kind: 'svg',
        category: 'logo',
        total: 2,
        assets: [svgAssetEntry('LogoFullPurple', 'logo'), svgAssetEntry('LogoIconWhite', 'logo')],
      });
    });
  });

  describe('list', () => {
    it('lists every asset', () => {
      const { code, out } = cli(['assets', 'svg', 'list'], consumerWithSvgAssets());

      expect(code).toBe(0);
      for (const name of ['LogoFullPurple', 'LogoIconWhite', 'MascotWave', 'SpotAccount']) {
        expect(out).toContain(name);
      }
    });

    it('omits category from --json when none was asked for', () => {
      const { out } = cli(['assets', 'svg', 'list', '--json'], consumerWithSvgAssets());

      expect(JSON.parse(out)).toMatchObject({ kind: 'svg', total: 4 });
      expect(JSON.parse(out)).not.toHaveProperty('category');
    });

    it('exits 1 for an empty package', () => {
      const { code, out } = cli(['assets', 'svg', 'list'], consumerWithSvgAssets([]));

      expect(code).toBe(1);
      expect(out).toContain('No assets.');
    });
  });

  describe('get', () => {
    it('shows the asset with its category, file and what to import, without file contents', () => {
      const consumer = consumerWithSvgAssets();
      const { code, out } = cli(['assets', 'svg', 'get', 'MascotWave'], consumer);

      expect(code).toBe(0);
      expect(out).toContain(`${SVG_ASSETS_PACKAGE} 1.2.3`);
      expect(out).toContain('MascotWave');
      expect(out).toContain('mascot');
      expect(out).toContain('lib/mascot-wave.svg');
      expect(out).toContain(`${SVG_ASSETS_PACKAGE}/lib/mascot-wave.svg`);
      expect(out).not.toContain('<svg');
    });

    it('prints the package, kind and asset as JSON for --json', () => {
      const { code, out } = cli(
        ['assets', 'svg', 'get', 'MascotWave', '--json'],
        consumerWithSvgAssets()
      );

      expect(code).toBe(0);
      expect(JSON.parse(out)).toEqual({
        package: { name: SVG_ASSETS_PACKAGE, version: '1.2.3' },
        kind: 'svg',
        asset: svgAssetEntry('MascotWave', 'mascot'),
      });
    });

    it('exits 1 with did-you-mean suggestions for a name that does not exist', () => {
      const { code, out, err } = cli(
        ['assets', 'svg', 'get', 'MascotWav'],
        consumerWithSvgAssets()
      );

      expect(code).toBe(1);
      expect(out).toBe('');
      expect(err).toContain('No svg asset named "MascotWav"');
      expect(err).toContain('Did you mean: MascotWave');
    });
  });

  describe('get --print', () => {
    const SVG = '<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0"/></svg>\n';

    it('prints the raw file from the installed package and nothing else', () => {
      const consumer = consumerWithSvgAssets();
      installAssetFile(consumer, SVG_ASSETS_PACKAGE, 'lib/mascot-wave.svg', SVG);

      const { code, out, err } = cli(['assets', 'svg', 'get', 'MascotWave', '--print'], consumer);

      expect(code).toBe(0);
      expect(out).toBe(SVG);
      expect(err).toBe('');
    });

    it('refuses a file over 100 KB, saying how big it is and where it is', () => {
      const consumer = consumerWithSvgAssets();
      installAssetFile(
        consumer,
        SVG_ASSETS_PACKAGE,
        'lib/mascot-wave.svg',
        'x'.repeat(100 * 1024 + 1)
      );

      const { code, out, err } = cli(['assets', 'svg', 'get', 'MascotWave', '--print'], consumer);

      expect(code).toBe(1);
      expect(out).toBe('');
      expect(err).toContain('102401 bytes');
      expect(err).toContain('limit is 102400');
      expect(err).toContain('lib/mascot-wave.svg');
    });

    it('prints a file of exactly 100 KB', () => {
      const consumer = consumerWithSvgAssets();
      installAssetFile(consumer, SVG_ASSETS_PACKAGE, 'lib/mascot-wave.svg', 'x'.repeat(100 * 1024));

      const { code, out } = cli(['assets', 'svg', 'get', 'MascotWave', '--print'], consumer);

      expect(code).toBe(0);
      expect(out).toHaveLength(100 * 1024);
    });

    it('exits 3 when the package does not contain the file its manifest lists', () => {
      const { code, out, err } = cli(
        ['assets', 'svg', 'get', 'MascotWave', '--print'],
        consumerWithSvgAssets()
      );

      expect(code).toBe(3);
      expect(out).toBe('');
      expect(err).toContain('lib/mascot-wave.svg');
      expect(err).toContain('is missing');
    });

    it('refuses a manifest file path that leaves the package directory', () => {
      const consumer = createConsumer();
      const escaping = { ...svgAssetEntry('Sneaky'), file: '../../../secret.txt' };
      installPackage(consumer, SVG_ASSETS_PACKAGE, svgAssetsManifest([escaping]));
      installAssetFile(consumer, SVG_ASSETS_PACKAGE, '../../../secret.txt', 'top secret');

      const { code, out, err } = cli(['assets', 'svg', 'get', 'Sneaky', '--print'], consumer);

      expect(code).toBe(3);
      expect(out).toBe('');
      expect(err).toContain('outside the package');
    });

    const linkAsset = (consumer: string, file: string, target: string) => {
      const link = join(consumer, 'node_modules', ...SVG_ASSETS_PACKAGE.split('/'), file);
      mkdirSync(dirname(link), { recursive: true });
      symlinkSync(target, link);
    };

    it('refuses a file that is a symlink to somewhere outside the package', () => {
      const consumer = consumerWithSvgAssets();
      const outside = join(consumer, 'secret.txt');
      installAssetFile(consumer, SVG_ASSETS_PACKAGE, '../../../secret.txt', 'top secret');
      linkAsset(consumer, 'lib/mascot-wave.svg', outside);

      const { code, out, err } = cli(['assets', 'svg', 'get', 'MascotWave', '--print'], consumer);

      expect(code).toBe(3);
      expect(out).toBe('');
      expect(err).toContain('outside the package');
    });

    it('refuses a file whose parent directory is a symlink to somewhere outside the package', () => {
      const consumer = consumerWithSvgAssets();
      installAssetFile(consumer, SVG_ASSETS_PACKAGE, '../../../outside/mascot-wave.svg', SVG);
      linkAsset(consumer, 'lib', join(consumer, 'outside'));

      const { code, out, err } = cli(['assets', 'svg', 'get', 'MascotWave', '--print'], consumer);

      expect(code).toBe(3);
      expect(out).toBe('');
      expect(err).toContain('outside the package');
    });

    it('prints a file that is a symlink to another file inside the package', () => {
      const consumer = consumerWithSvgAssets();
      installAssetFile(consumer, SVG_ASSETS_PACKAGE, 'lib/shared.svg', SVG);
      linkAsset(
        consumer,
        'lib/mascot-wave.svg',
        join(
          dirname(
            join(consumer, 'node_modules', ...SVG_ASSETS_PACKAGE.split('/'), 'lib/shared.svg')
          ),
          'shared.svg'
        )
      );

      const { code, out } = cli(['assets', 'svg', 'get', 'MascotWave', '--print'], consumer);

      expect(code).toBe(0);
      expect(out).toBe(SVG);
    });

    it.each([
      [
        ['assets', 'svg', 'get', 'MascotWave', '--print', '--json'],
        '--print cannot be combined with --json',
      ],
      [['assets', 'svg', 'list', '--print'], '--print is only valid for "assets svg get"'],
      [
        ['assets', 'svg', 'search', 'logo', '--print'],
        '--print is only valid for "assets svg get"',
      ],
    ])('exits 2 with the usage for %j', (argv, message) => {
      const { code, out, err } = cli(argv, consumerWithSvgAssets());

      expect(code).toBe(2);
      expect(out).toBe('');
      expect(err).toContain(message);
      expect(err).toContain('hearth assets svg get <name> [--print]');
    });
  });

  describe('when the svg assets package cannot be used', () => {
    it('exits 3 when it is not installed', () => {
      const { code, out, err } = cli(['assets', 'svg', 'list']);

      expect(code).toBe(3);
      expect(out).toBe('');
      expect(err).toContain(`${SVG_ASSETS_PACKAGE} is not installed`);
    });

    it('exits 3 when the installed package ships no manifest', () => {
      const consumer = createConsumer();
      installPackage(consumer, SVG_ASSETS_PACKAGE, undefined);

      const { code, err } = cli(['assets', 'svg', 'list'], consumer);

      expect(code).toBe(3);
      expect(err).toContain('ships no hearth-manifest.json');
    });

    it('exits 3 when the manifest is not valid', () => {
      const consumer = createConsumer();
      installPackage(consumer, SVG_ASSETS_PACKAGE, '{"schemaVersion": 2,');

      const { code, err } = cli(['assets', 'svg', 'get', 'MascotWave'], consumer);

      expect(code).toBe(3);
      expect(err).toContain('is invalid');
    });

    it('exits 3 asking for a CLI update when the manifest schema is newer', () => {
      const consumer = createConsumer();
      installPackage(consumer, SVG_ASSETS_PACKAGE, { ...svgAssetsManifest(), schemaVersion: 99 });

      const { code, err } = cli(['assets', 'svg', 'list'], consumer);

      expect(code).toBe(3);
      expect(err).toContain('Update @utilitywarehouse/hearth-cli');
    });

    it('exits 3 asking for a CLI update when the manifest type is one this CLI does not know', () => {
      const consumer = createConsumer();
      installPackage(consumer, SVG_ASSETS_PACKAGE, { ...svgAssetsManifest(), type: 'hologram' });

      const { code, err } = cli(['assets', 'svg', 'list'], consumer);

      expect(code).toBe(3);
      expect(err).toContain('manifest type "hologram"');
    });

    it('exits 3 when the package ships a different kind of manifest', () => {
      const consumer = createConsumer();
      installPackage(consumer, SVG_ASSETS_PACKAGE, {
        ...svgAssetsManifest(),
        type: 'json-assets',
        entries: [],
      });

      const { code, err } = cli(['assets', 'svg', 'list'], consumer);

      expect(code).toBe(3);
      expect(err).toContain('expected a svg-assets manifest, found json-assets');
    });
  });

  describe('usage errors', () => {
    it.each([
      [['assets'], 'Unknown command'],
      [['assets', 'frobnicate', 'list'], 'Unknown command'],
      [['assets', 'svg'], 'Unknown command'],
      [['assets', 'svg', 'search'], 'Unknown command'],
      [['assets', 'svg', 'get'], 'Unknown command'],
      [['assets', 'svg', 'frobnicate'], 'Unknown command'],
      [['assets', 'svg', 'list', 'extra'], 'Unexpected argument "extra"'],
      [['assets', 'svg', 'search', 'a', 'b'], 'Unexpected argument "b"'],
      [
        ['assets', 'svg', 'list', '--category', 'photo'],
        '--category must be "logo" or "mascot" or "spot" or "scene" or "technical" or "other"',
      ],
      [['assets', 'svg', 'list', '--limit', 'many'], '--limit must be a non-negative whole number'],
      [['assets', 'svg', 'list', '--layer', 'semantic'], '--layer is not valid for "assets"'],
      [['assets', 'svg', 'get', 'MascotWave', '--limit', '1'], '--limit is only valid for'],
      [
        ['assets', 'svg', 'get', 'MascotWave', '--category', 'mascot'],
        '--category is only valid for',
      ],
      [['tokens', 'list', '--category', 'logo'], '--category is not valid for "tokens"'],
    ])('exits 2 with the usage for %j', (argv, message) => {
      const { code, out, err } = cli(argv, consumerWithSvgAssets());

      expect(code).toBe(2);
      expect(out).toBe('');
      expect(err).toContain(message);
      expect(err).toContain('hearth assets svg search <query>');
    });

    it('describes the assets svg commands in --help alongside the others', () => {
      const { out } = cli(['--help']);

      expect(out).toContain('hearth assets svg search <query>');
      expect(out).toContain('hearth assets svg list');
      expect(out).toContain('hearth assets svg get <name>');
      expect(out).toContain('hearth icons search <query>');
    });
  });
});
