import { describe, expect, it } from 'vitest';
import { run } from '../run.js';
import {
  TOKENS_PACKAGE,
  createConsumer,
  installPackage,
  tokensManifest,
} from './consumer-fixture.js';

const consumerWithTokens = () => {
  const consumer = createConsumer();
  installPackage(consumer, TOKENS_PACKAGE, tokensManifest());
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
    installPackage(consumer, TOKENS_PACKAGE, tokensManifest({ schemaVersion: 2 }));

    const { code, out, err } = cli(['tokens', 'search', 'brand'], consumer);

    expect(code).toBe(3);
    expect(out).toBe('');
    expect(err).toContain('schema version 2');
    expect(err).toContain('Update @utilitywarehouse/hearth-cli');
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
});
