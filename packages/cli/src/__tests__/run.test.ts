import { describe, expect, it } from 'vitest';
import { run } from '../run.js';
import {
  TOKENS_PACKAGE,
  createConsumer,
  installPackage,
  tokenEntry,
  tokensManifest,
} from './consumer-fixture.js';

const consumerWithTokens = () => {
  const consumer = createConsumer();
  installPackage(consumer, TOKENS_PACKAGE, tokensManifest());
  return consumer;
};

const spacingAt = (device: 'mobile' | 'tablet' | 'desktop', value: number) =>
  tokenEntry({
    layer: 'semantic',
    path: 'semantic.layout.spacing.md',
    type: 'number',
    device,
    values: { default: value },
    cssValue: `${value}px`,
    alias: { default: 'space.100' },
  });

const consumerWithMixedTokens = () => {
  const consumer = createConsumer();
  installPackage(
    consumer,
    TOKENS_PACKAGE,
    tokensManifest({
      entries: [
        tokenEntry({ layer: 'semantic', path: 'semantic.background.brand' }),
        tokenEntry({
          layer: 'semantic',
          path: 'semantic.opacity.disabled',
          type: 'number',
          values: { default: 50 },
          cssValue: '0.5',
        }),
        spacingAt('mobile', 8),
        spacingAt('tablet', 12),
        spacingAt('desktop', 16),
      ],
    })
  );
  return consumer;
};

const cli = (argv: Array<string>, cwd = createConsumer()) => {
  let out = '';
  let err = '';
  const code = run(argv, {
    cwd,
    stdout: text => (out += text),
    stderr: text => (err += text),
  });
  return { code, out, err };
};

describe('run', () => {
  it('prints the CLI version and exits 0 for --version', () => {
    const { code, out } = cli(['--version']);

    expect(code).toBe(0);
    expect(out.trim()).toMatch(/^\d+\.\d+\.\d+/);
  });

  it('prints the usage and exits 0 for --help', () => {
    const { code, out } = cli(['--help']);

    expect(code).toBe(0);
    expect(out).toContain('hearth tokens search <query>');
    expect(out).toContain('hearth tokens get <path>');
  });

  it('exits 2 with the usage on stderr for an unknown command', () => {
    const { code, out, err } = cli(['colours']);

    expect(code).toBe(2);
    expect(out).toBe('');
    expect(err).toContain('Unknown command "colours"');
    expect(err).toContain('hearth tokens search <query>');
  });

  it('lists matching tokens with the version of the installed tokens package', () => {
    const { code, out } = cli(['tokens', 'search', 'brand'], consumerWithTokens());

    expect(code).toBe(0);
    expect(out).toContain('@utilitywarehouse/hearth-tokens 1.2.3');
    expect(out).toContain('semantic.background.brand');
    expect(out).toContain('#7a42c8');
    expect(out).toContain('--h-background-brand');
    expect(out).not.toMatch(/dark/i);
  });

  it('prints a JSON document naming the package version, filters and results for --json', () => {
    const { code, out } = cli(['tokens', 'search', 'brand', '--json'], consumerWithTokens());

    expect(code).toBe(0);
    expect(JSON.parse(out)).toEqual({
      package: { name: TOKENS_PACKAGE, version: '1.2.3' },
      platform: 'web',
      layer: 'semantic',
      total: 1,
      tokens: [
        expect.objectContaining({
          path: 'semantic.background.brand',
          values: { default: '#7a42c8' },
          css: { variable: '--h-background-brand' },
        }),
      ],
    });
  });

  it('reports dark values and the JS surface for --platform native', () => {
    const { code, out } = cli(
      ['tokens', 'search', 'brand', '--platform', 'native', '--json'],
      consumerWithTokens()
    );

    expect(code).toBe(0);
    expect(JSON.parse(out)).toMatchObject({
      platform: 'native',
      tokens: [
        {
          values: { default: '#7a42c8', dark: '#442484' },
          js: { path: 'semanticLight.background.brand', darkPath: 'semanticDark.background.brand' },
        },
      ],
    });
  });

  it('exits 2 for a platform that is not web or native', () => {
    const { code, err } = cli(
      ['tokens', 'search', 'brand', '--platform', 'ios'],
      consumerWithTokens()
    );

    expect(code).toBe(2);
    expect(err).toContain('--platform must be "web" or "native"');
  });

  it('searches the layer given by --layer', () => {
    const { code, out } = cli(
      ['tokens', 'search', 'brand', '--layer', 'primitive', '--json'],
      consumerWithTokens()
    );

    expect(code).toBe(1);
    expect(JSON.parse(out)).toMatchObject({ layer: 'primitive', total: 0 });
  });

  it('says how many tokens matched when --limit truncates the list', () => {
    const { out } = cli(['tokens', 'search', 'background', '--limit', '0'], consumerWithTokens());

    expect(out).toContain('Showing 0 of 1');
  });

  it('exits 3 and says to install the package when it is not installed', () => {
    const { code, out, err } = cli(['tokens', 'search', 'brand']);

    expect(code).toBe(3);
    expect(out).toBe('');
    expect(err).toContain('@utilitywarehouse/hearth-tokens is not installed');
    expect(err).toContain('npm install @utilitywarehouse/hearth-tokens');
  });

  it('exits 3 and asks for a newer version when the installed package has no manifest', () => {
    const consumer = createConsumer();
    installPackage(consumer, TOKENS_PACKAGE, undefined);

    const { code, out, err } = cli(['tokens', 'search', 'brand'], consumer);

    expect(code).toBe(3);
    expect(out).toBe('');
    expect(err).toContain('is installed but ships no hearth-manifest.json');
    expect(err).not.toContain('is not installed');
  });

  it.each(['--layer primitive', '--limit 5', '--type number'])(
    'exits 2 when tokens get is given the search-only option %s',
    options => {
      const { code, out, err } = cli(
        ['tokens', 'get', 'semantic.background.brand', ...options.split(' ')],
        consumerWithTokens()
      );

      expect(code).toBe(2);
      expect(out).toBe('');
      expect(err).toContain('is only valid for "tokens search"');
    }
  );

  it('exits 3 and lists the problems when the installed manifest is invalid', () => {
    const consumer = createConsumer();
    installPackage(consumer, TOKENS_PACKAGE, tokensManifest({ entries: 'not-a-list' }));

    const { code, out, err } = cli(['tokens', 'search', 'brand'], consumer);

    expect(code).toBe(3);
    expect(out).toBe('');
    expect(err).toContain('hearth-manifest.json in @utilitywarehouse/hearth-tokens is invalid');
    expect(err).toContain('entries');
  });

  it('exits 3 and says to update the CLI when the manifest schema is newer than it supports', () => {
    const consumer = createConsumer();
    installPackage(consumer, TOKENS_PACKAGE, tokensManifest({ schemaVersion: 3 }));

    const { code, out, err } = cli(['tokens', 'search', 'brand'], consumer);

    expect(code).toBe(3);
    expect(out).toBe('');
    expect(err).toContain('schema version 3');
    expect(err).toContain('Update @utilitywarehouse/hearth-cli');
  });

  it('exits 3 and says to update the CLI when the manifest has a type it does not know', () => {
    const consumer = createConsumer();
    installPackage(consumer, TOKENS_PACKAGE, tokensManifest({ type: 'sounds' }));

    const { code, out, err } = cli(['tokens', 'search', 'brand'], consumer);

    expect(code).toBe(3);
    expect(out).toBe('');
    expect(err).toContain('manifest type "sounds"');
    expect(err).toContain('Update @utilitywarehouse/hearth-cli');
  });

  it('exits 3 when the package ships a manifest of a different known type', () => {
    const consumer = createConsumer();
    installPackage(
      consumer,
      TOKENS_PACKAGE,
      tokensManifest({
        type: 'icons',
        usage: { platform: 'svg', import: 'x', example: 'x' },
        entries: [],
      })
    );

    const { code, out, err } = cli(['tokens', 'search', 'brand'], consumer);

    expect(code).toBe(3);
    expect(out).toBe('');
    expect(err).toContain('expected a tokens manifest, found icons');
  });

  it('shows one token with the package version for tokens get', () => {
    const { code, out } = cli(['tokens', 'get', 'semantic.background.brand'], consumerWithTokens());

    expect(code).toBe(0);
    expect(out).toContain('@utilitywarehouse/hearth-tokens 1.2.3');
    expect(out).toContain('semantic.background.brand');
    expect(out).toContain('#7a42c8');
    expect(out).toContain('--h-background-brand');
  });

  it('prints the package, platform and token as JSON for tokens get --json', () => {
    const { code, out } = cli(
      ['tokens', 'get', 'semantic.background.brand', '--platform', 'native', '--json'],
      consumerWithTokens()
    );

    expect(code).toBe(0);
    expect(JSON.parse(out)).toMatchObject({
      package: { name: TOKENS_PACKAGE, version: '1.2.3' },
      platform: 'native',
      token: {
        path: 'semantic.background.brand',
        values: { default: '#7a42c8', dark: '#442484' },
      },
    });
  });

  it('exits 1 with did-you-mean suggestions for a path that does not exist', () => {
    const { code, out, err } = cli(
      ['tokens', 'get', 'semantic.background.brnad'],
      consumerWithTokens()
    );

    expect(code).toBe(1);
    expect(out).toBe('');
    expect(err).toContain('No token at "semantic.background.brnad"');
    expect(err).toContain('Did you mean: semantic.background.brand');
  });

  it('exits 2 with the usage for an option it does not know', () => {
    const { code, err } = cli(['tokens', 'search', 'brand', '--colour'], consumerWithTokens());

    expect(code).toBe(2);
    expect(err).toContain("Unknown option '--colour'");
    expect(err).toContain('hearth tokens search <query>');
  });

  it('exits 2 when --limit is not a non-negative whole number', () => {
    const { code, err } = cli(
      ['tokens', 'search', 'brand', '--limit', 'many'],
      consumerWithTokens()
    );

    expect(code).toBe(2);
    expect(err).toContain('--limit must be a non-negative whole number');
  });

  it('exits 3, not with a stack trace, when the installed manifest is not valid JSON', () => {
    const consumer = createConsumer();
    installPackage(consumer, TOKENS_PACKAGE, '{"schemaVersion": 1,');

    const { code, err } = cli(['tokens', 'search', 'brand'], consumer);

    expect(code).toBe(3);
    expect(err).toContain('hearth-manifest.json in @utilitywarehouse/hearth-tokens is invalid');
  });

  it('exits 2 for arguments beyond the ones a command takes', () => {
    const consumer = consumerWithTokens();

    const get = cli(['tokens', 'get', 'semantic.background.brand', 'extra'], consumer);
    const search = cli(['tokens', 'search', 'background', 'brand'], consumer);

    expect(get.code).toBe(2);
    expect(get.out).toBe('');
    expect(get.err).toContain('Unexpected argument "extra"');
    expect(search.code).toBe(2);
    expect(search.err).toContain('Unexpected argument "brand"');
  });

  describe('tokens list', () => {
    it('lists the semantic tokens with the version of the installed tokens package', () => {
      const { code, out } = cli(['tokens', 'list'], consumerWithMixedTokens());

      expect(code).toBe(0);
      expect(out).toContain('@utilitywarehouse/hearth-tokens 1.2.3');
      expect(out).toContain('semantic.background.brand');
      expect(out).toContain('semantic.opacity.disabled');
    });

    it('keeps only the tokens of the type given by --type', () => {
      const { code, out } = cli(['tokens', 'list', '--type', 'number'], consumerWithMixedTokens());

      expect(code).toBe(0);
      expect(out).toContain('semantic.opacity.disabled');
      expect(out).not.toContain('semantic.background.brand');
    });

    it('shows the CSS value on web and the JS value on native', () => {
      const consumer = consumerWithMixedTokens();

      const web = cli(['tokens', 'list', '--type', 'number'], consumer);
      const native = cli(['tokens', 'list', '--type', 'number', '--platform', 'native'], consumer);

      expect(web.out).toContain('0.5');
      expect(web.out).not.toMatch(/\b50\b/);
      expect(native.out).toMatch(/\b50\b/);
    });

    it('puts a path’s device values and alias on one block, in device order', () => {
      const { out } = cli(['tokens', 'list', '--type', 'number'], consumerWithMixedTokens());

      expect(out).toContain('mobile 8px, tablet 12px, desktop 16px');
      expect(out).toContain('space.100');
      expect(out.match(/^semantic\.layout\.spacing\.md /gm)).toHaveLength(1);
    });

    it('prints a JSON document naming the package version, filters and results for --json', () => {
      const { code, out } = cli(
        ['tokens', 'list', '--type', 'number', '--json'],
        consumerWithMixedTokens()
      );

      expect(code).toBe(0);
      expect(JSON.parse(out)).toEqual({
        package: { name: TOKENS_PACKAGE, version: '1.2.3' },
        platform: 'web',
        layer: 'semantic',
        type: 'number',
        total: 2,
        tokens: [
          expect.objectContaining({
            path: 'semantic.opacity.disabled',
            values: { default: '0.5' },
          }),
          expect.objectContaining({ path: 'semantic.layout.spacing.md', device: 'mobile' }),
          expect.objectContaining({ path: 'semantic.layout.spacing.md', device: 'tablet' }),
          expect.objectContaining({ path: 'semantic.layout.spacing.md', device: 'desktop' }),
        ],
      });
    });

    it('exits 1 when nothing matches', () => {
      const { code } = cli(['tokens', 'list', '--type', 'shadow'], consumerWithMixedTokens());

      expect(code).toBe(1);
    });

    it('exits 2 for an argument it does not take, or a --limit that is not a whole number', () => {
      const consumer = consumerWithMixedTokens();

      const extra = cli(['tokens', 'list', 'brand'], consumer);
      const limit = cli(['tokens', 'list', '--limit', 'many'], consumer);

      expect(extra.code).toBe(2);
      expect(extra.err).toContain('Unexpected argument "brand"');
      expect(limit.code).toBe(2);
    });

    it('is described in the usage', () => {
      const { out } = cli(['--help']);

      expect(out).toContain('hearth tokens list');
      expect(out).toContain('--type');
    });
  });

  describe('tokens get for a group of tokens', () => {
    it('shows every device of a path in one block', () => {
      const { code, out } = cli(
        ['tokens', 'get', 'semantic.layout.spacing.md'],
        consumerWithMixedTokens()
      );

      expect(code).toBe(0);
      expect(out).toContain('mobile 8px, tablet 12px, desktop 16px');
    });

    it('prints the package, platform, path and tokens as JSON', () => {
      const { code, out } = cli(
        ['tokens', 'get', 'semantic.layout', '--json'],
        consumerWithMixedTokens()
      );

      expect(code).toBe(0);
      expect(JSON.parse(out)).toMatchObject({
        package: { name: TOKENS_PACKAGE, version: '1.2.3' },
        platform: 'web',
        path: 'semantic.layout',
        tokens: [{ device: 'mobile' }, { device: 'tablet' }, { device: 'desktop' }],
      });
    });
  });
});
