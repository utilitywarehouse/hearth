import { describe, expect, it } from 'vitest';
import { run } from '../run.js';
import {
  ICON_PACKAGES,
  createConsumer,
  iconEntry,
  iconsManifest,
  installPackage,
  type IconPlatform,
} from './consumer-fixture.js';

const consumerWithIcons = (
  platform: IconPlatform = 'react',
  entries?: Array<ReturnType<typeof iconEntry>>
) => {
  const consumer = createConsumer();
  installPackage(consumer, ICON_PACKAGES[platform], iconsManifest(platform, entries));
  return consumer;
};

const cli = (argv: Array<string>, cwd = createConsumer()) => {
  let out = '';
  let err = '';
  const code = run(argv, { cwd, stdout: text => (out += text), stderr: text => (err += text) });
  return { code, out, err };
};

const REACT = ICON_PACKAGES.react;

describe('hearth icons', () => {
  describe('search', () => {
    it('lists matching icons under the name and version of the installed icons package', () => {
      const { code, out } = cli(['icons', 'search', 'arrow'], consumerWithIcons());

      expect(code).toBe(0);
      expect(out).toContain(`${REACT} 1.2.3`);
      expect(out).toContain('ArrowRightMediumIcon');
      expect(out).toContain('arrow-right-medium-icon.svg');
      expect(out).not.toContain('AddSmallIcon');
    });

    it('exits 1 and says so when nothing matches', () => {
      const { code, out } = cli(['icons', 'search', 'zzz'], consumerWithIcons());

      expect(code).toBe(1);
      expect(out).toContain('No icons match "zzz"');
    });

    it('filters by --size', () => {
      const { out } = cli(['icons', 'search', 'add', '--size', 'small'], consumerWithIcons());

      expect(out).toContain('AddSmallIcon');
      expect(out).not.toContain('AddMediumIcon');
    });

    it('says how many were left out when the limit cuts the results', () => {
      const { out } = cli(['icons', 'search', 'icon', '--limit', '1'], consumerWithIcons());

      expect(out).toContain('Showing 1 of 4. Narrow the query or raise --limit.');
    });

    it('prints a JSON document naming the package version, platform, usage and icons for --json', () => {
      const { code, out } = cli(
        ['icons', 'search', 'add', '--size', 'small', '--json'],
        consumerWithIcons()
      );

      expect(code).toBe(0);
      expect(JSON.parse(out)).toEqual({
        package: { name: REACT, version: '1.2.3' },
        platform: 'react',
        size: 'small',
        total: 1,
        usage: { import: REACT, example: `import { <component> } from '${REACT}';` },
        icons: [
          {
            name: 'AddSmallIcon',
            size: 'small',
            svg: 'add-small-icon.svg',
            component: 'AddSmallIcon',
          },
        ],
      });
    });
  });

  describe('list', () => {
    it('lists every icon', () => {
      const { code, out } = cli(['icons', 'list'], consumerWithIcons());

      expect(code).toBe(0);
      for (const name of [
        'AddSmallIcon',
        'AddMediumIcon',
        'ArrowRightMediumIcon',
        'ArrowLeftLargeIcon',
      ]) {
        expect(out).toContain(name);
      }
    });

    it('filters by --size and reports it in --json', () => {
      const { out } = cli(['icons', 'list', '--size', 'large', '--json'], consumerWithIcons());

      expect(JSON.parse(out)).toMatchObject({ size: 'large', total: 1 });
    });

    it('omits size from --json when no size was asked for', () => {
      const { out } = cli(['icons', 'list', '--json'], consumerWithIcons());

      expect(JSON.parse(out)).not.toHaveProperty('size');
    });
  });

  describe('get', () => {
    it('shows the icon with how to import it from the installed package', () => {
      const { code, out } = cli(['icons', 'get', 'AddSmallIcon'], consumerWithIcons());

      expect(code).toBe(0);
      expect(out).toContain(`${REACT} 1.2.3`);
      expect(out).toContain('AddSmallIcon');
      expect(out).toContain('small');
      expect(out).toContain('add-small-icon.svg');
      expect(out).toContain(`import { AddSmallIcon } from '${REACT}';`);
    });

    it('shows the svg path when only the svg icons package is installed', () => {
      const { out } = cli(['icons', 'get', 'AddSmallIcon'], consumerWithIcons('svg'));

      expect(out).toContain(`${ICON_PACKAGES.svg}/add-small-icon.svg`);
    });

    it('prints the package, platform, icon and filled-in usage as JSON for --json', () => {
      const { code, out } = cli(
        ['icons', 'get', 'AddSmallIcon', '--json'],
        consumerWithIcons('react-native')
      );

      expect(code).toBe(0);
      expect(JSON.parse(out)).toEqual({
        package: { name: ICON_PACKAGES['react-native'], version: '1.2.3' },
        platform: 'react-native',
        icon: {
          name: 'AddSmallIcon',
          size: 'small',
          svg: 'add-small-icon.svg',
          component: 'AddSmallIcon',
        },
        usage: {
          import: ICON_PACKAGES['react-native'],
          example: `import { AddSmallIcon } from '${ICON_PACKAGES['react-native']}';`,
        },
      });
    });

    it('exits 1 with did-you-mean suggestions for a name that does not exist', () => {
      const { code, out, err } = cli(['icons', 'get', 'AddSmalIcon'], consumerWithIcons());

      expect(code).toBe(1);
      expect(out).toBe('');
      expect(err).toContain('No icon named "AddSmalIcon"');
      expect(err).toContain('Did you mean: AddSmallIcon');
    });
  });

  describe('when the icons package cannot be used', () => {
    it('exits 3 naming every icons package when none is installed', () => {
      const { code, out, err } = cli(['icons', 'list']);

      expect(code).toBe(3);
      expect(out).toBe('');
      for (const name of Object.values(ICON_PACKAGES)) expect(err).toContain(name);
      expect(err).toContain('npm install');
    });

    it('exits 3 when the installed package ships no manifest', () => {
      const consumer = createConsumer();
      installPackage(consumer, REACT, undefined);

      const { code, err } = cli(['icons', 'list'], consumer);

      expect(code).toBe(3);
      expect(err).toContain('ships no hearth-manifest.json');
    });

    it('exits 3 when the manifest is not valid', () => {
      const consumer = createConsumer();
      installPackage(consumer, REACT, '{"schemaVersion": 2,');

      const { code, err } = cli(['icons', 'get', 'AddSmallIcon'], consumer);

      expect(code).toBe(3);
      expect(err).toContain('is invalid');
    });

    it('exits 3 asking for a CLI update when the manifest schema is newer', () => {
      const consumer = createConsumer();
      installPackage(consumer, REACT, { ...iconsManifest(), schemaVersion: 99 });

      const { code, err } = cli(['icons', 'list'], consumer);

      expect(code).toBe(3);
      expect(err).toContain('Update @utilitywarehouse/hearth-cli');
    });
  });

  describe('usage errors', () => {
    it.each([
      [['icons', 'search'], 'Unknown command'],
      [['icons', 'get'], 'Unknown command'],
      [['icons', 'frobnicate'], 'Unknown command'],
      [['icons', 'list', 'extra'], 'Unexpected argument "extra"'],
      [['icons', 'search', 'a', 'b'], 'Unexpected argument "b"'],
      [['icons', 'list', '--size', 'huge'], '--size must be "small" or "medium" or "large"'],
      [['icons', 'list', '--limit', 'many'], '--limit must be a non-negative whole number'],
      [['icons', 'list', '--layer', 'semantic'], '--layer is not valid for "icons"'],
      [['icons', 'get', 'AddSmallIcon', '--size', 'small'], '--size is only valid for'],
      [['tokens', 'list', '--size', 'small'], '--size is not valid for "tokens"'],
    ])('exits 2 with the usage for %j', (argv, message) => {
      const { code, out, err } = cli(argv, consumerWithIcons());

      expect(code).toBe(2);
      expect(out).toBe('');
      expect(err).toContain(message);
      expect(err).toContain('hearth icons search <query>');
    });

    it('describes the icons commands in --help alongside the tokens ones', () => {
      const { out } = cli(['--help']);

      expect(out).toContain('hearth icons search <query>');
      expect(out).toContain('hearth icons list');
      expect(out).toContain('hearth icons get <name>');
      expect(out).toContain('hearth tokens search <query>');
    });
  });
});
