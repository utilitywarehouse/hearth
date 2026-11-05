import { unwrapAlias } from './unwrap-alias.js';

const SCHEMA_VERSION = 1;
const JS_IMPORT = '@utilitywarehouse/hearth-tokens';
const BROWSER_IMPORT = '@utilitywarehouse/hearth-tokens/browser';

// Semantic tokens are addressed by a path that does not repeat the layer name in the
// raw token files (`background.brand`), so the entry path adds it.
const entryPath = ({ layer, path }) =>
  (layer === 'semantic' ? ['semantic', ...path] : path).join('.');

/**
 * Merges the per-surface records collected while the tokens are generated into the
 * entries of a `hearth-manifest.json`.
 */
export function buildTokensManifest(records, meta) {
  const groups = new Map();
  for (const record of records) {
    const key = `${record.layer}:${record.path.join('.')}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }

  const entries = [...groups.values()].map(group => {
    const find = (surface, mode) =>
      group.find(record => record.surface === surface && record.mode === mode);
    const light = find('js', 'light');
    const dark = find('js', 'dark');
    const css = find('css', 'light');
    const browser = find('browser', 'light');
    if (!light) {
      const { layer, path } = group[0];
      throw new Error(`No light JS record for ${entryPath({ layer, path })}`);
    }
    if (dark?.alias && !light.alias) {
      throw new Error(`${entryPath(light)} has a dark alias but no light alias`);
    }

    const entry = {
      path: entryPath(light),
      layer: light.layer,
      type: light.type,
      values: { default: light.value },
      surfaces: {},
    };
    if (dark) entry.values.dark = dark.value;
    if (light.alias) {
      entry.alias = { default: unwrapAlias(light.alias) };
      if (dark?.alias) entry.alias.dark = unwrapAlias(dark.alias);
    }
    if (css) entry.surfaces.css = { variable: css.variable };
    if (browser) entry.surfaces.browser = { import: BROWSER_IMPORT, path: browser.accessor };
    entry.surfaces.js = { import: JS_IMPORT, path: light.accessor };
    if (dark) entry.surfaces.js.darkPath = dark.accessor;
    return entry;
  });
  entries.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));

  return { schemaVersion: SCHEMA_VERSION, package: meta, type: 'tokens', entries };
}
