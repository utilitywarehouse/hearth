import { describe, expect, it } from 'vitest';
import {
  DEFAULT_ICONS,
  DEFAULT_JSON_ASSETS,
  DEFAULT_SVG_ASSETS,
  ICON_PACKAGES,
  JSON_ASSETS_PACKAGE,
  SVG_ASSETS_PACKAGE,
  TOKENS_PACKAGE,
  createConsumer,
  iconsManifest,
  installPackage,
  jsonAssetsManifest,
  svgAssetsManifest,
  tokenEntry,
  tokensManifest,
} from './consumer-fixture.js';
import { JSON_CONTRACT, type ContractName } from './json-contract.js';
import { hearth } from './run-binary.js';

/** A consumer project with every indexed package installed from fixture manifests. */
const consumerWithEverything = () => {
  const consumer = createConsumer();
  installPackage(
    consumer,
    TOKENS_PACKAGE,
    tokensManifest({
      entries: [
        tokenEntry({ layer: 'semantic', path: 'semantic.background.brand' }),
        tokenEntry({
          layer: 'semantic',
          path: 'semantic.shadow.md.x',
          type: 'number',
          device: 'mobile',
          values: { default: 1 },
        }),
        tokenEntry({
          layer: 'semantic',
          path: 'semantic.shadow.md.x',
          type: 'number',
          device: 'tablet',
          values: { default: 2 },
        }),
      ],
    })
  );
  installPackage(consumer, ICON_PACKAGES.react, iconsManifest('react'));
  installPackage(consumer, SVG_ASSETS_PACKAGE, svgAssetsManifest());
  installPackage(consumer, JSON_ASSETS_PACKAGE, jsonAssetsManifest());
  return consumer;
};

const svgAsset = DEFAULT_SVG_ASSETS[0].name;
const jsonAsset = DEFAULT_JSON_ASSETS[0].name;

const CASES: Array<[ContractName, Array<string>]> = [
  ['tokens search/list', ['tokens', 'search', 'brand']],
  ['tokens search/list', ['tokens', 'list', '--layer', 'semantic', '--platform', 'native']],
  ['tokens get (one token)', ['tokens', 'get', 'semantic.background.brand']],
  [
    'tokens get (one token)',
    ['tokens', 'get', 'semantic.background.brand', '--platform', 'native'],
  ],
  ['tokens get (a group)', ['tokens', 'get', 'semantic.shadow.md']],
  ['icons search/list', ['icons', 'search', 'add']],
  ['icons search/list', ['icons', 'list', '--size', 'small']],
  ['icons get', ['icons', 'get', DEFAULT_ICONS[0].name]],
  ['assets svg search/list', ['assets', 'svg', 'list']],
  ['assets svg get', ['assets', 'svg', 'get', svgAsset]],
  ['assets json search/list', ['assets', 'json', 'search', jsonAsset.slice(0, 4)]],
  ['assets json get', ['assets', 'json', 'get', jsonAsset]],
];

describe('the built hearth binary against installed packages', () => {
  describe('--json', () => {
    it.each(CASES)('%s matches its contract: hearth %j', (name, args) => {
      const { code, out } = hearth(consumerWithEverything(), [...args, '--json']);

      expect(code).toBe(0);
      const result = JSON_CONTRACT[name].safeParse(JSON.parse(out));
      expect(result.error?.issues).toBeUndefined();
    });
  });

  describe('exit codes', () => {
    it.each([
      ['a token that does not exist', ['tokens', 'get', 'semantic.background.brnd'], 1],
      ['an icon that does not exist', ['icons', 'get', 'AddSmallIcn'], 1],
      ['an asset that does not exist', ['assets', 'svg', 'get', 'LogoFullPurpl'], 1],
      ['a search with no match', ['icons', 'search', 'zzzzzz'], 1],
      ['an unknown command', ['frobnicate'], 2],
      ['an unknown option', ['tokens', 'list', '--bogus'], 2],
      ['an invalid option value', ['tokens', 'list', '--platform', 'tv'], 2],
      ['a missing argument', ['tokens', 'get'], 2],
    ])('%s', (_, args, expected) => {
      expect(hearth(consumerWithEverything(), args).code).toBe(expected);
    });

    it('exits 3 and names the package when it is not installed', () => {
      const { code, err } = hearth(createConsumer(), ['tokens', 'search', 'brand']);

      expect(code).toBe(3);
      expect(err).toContain(`${TOKENS_PACKAGE} is not installed`);
    });
  });

  describe('manifest compatibility', () => {
    it('exits 3 with an update message, without a stack trace, for a newer schemaVersion', () => {
      const consumer = createConsumer();
      installPackage(consumer, TOKENS_PACKAGE, tokensManifest({ schemaVersion: 999 }));

      const { code, err } = hearth(consumer, ['tokens', 'search', 'brand']);

      expect(code).toBe(3);
      expect(err).toContain('newer than this CLI supports');
      expect(err).not.toMatch(/\bat .*\.js:\d+/);
    });
  });

  describe('startup', () => {
    // generous: this guards against a lookup becoming a multi-second wait for an agent, not against jitter
    const BUDGET_MS = 500;

    it.each([
      ['--version', ['--version']],
      ['a token lookup', ['tokens', 'get', 'semantic.background.brand', '--json']],
    ])(`answers %s within ${BUDGET_MS}ms`, (_, args) => {
      const consumer = consumerWithEverything();
      hearth(consumer, args); // warm the file cache

      const started = performance.now();
      hearth(consumer, args);

      expect(performance.now() - started).toBeLessThan(BUDGET_MS);
    });
  });
});
