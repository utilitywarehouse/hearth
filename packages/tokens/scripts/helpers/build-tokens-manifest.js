import { unwrapAlias } from './unwrap-alias.js';

const SCHEMA_VERSION = 1;
const JS_IMPORT = '@utilitywarehouse/hearth-tokens';
const BROWSER_IMPORT = '@utilitywarehouse/hearth-tokens/browser';

// Semantic and component tokens are addressed by a path that does not repeat the layer
// name in the raw token files (`background.brand`), so the entry path adds it.
const PREFIXED_LAYERS = ['semantic', 'component'];
const entryPath = ({ layer, path }) =>
  (PREFIXED_LAYERS.includes(layer) ? [layer, ...path] : path).join('.');

const VAR_REFERENCE = /^var\((--[\w-]+)\)$/;

/**
 * The value a CSS declaration resolves to: an aliased token is declared as `var(--h-space-100)`,
 * so this follows the reference to the variable that holds a literal.
 */
const resolveCssValue = (value, declared, seen = new Set()) => {
  const reference = VAR_REFERENCE.exec(value)?.[1];
  if (!reference) return value;
  if (!declared.has(reference) || seen.has(reference)) {
    throw new Error(`CSS value ${value} refers to ${reference}, which no token declares`);
  }
  return resolveCssValue(declared.get(reference), declared, seen.add(reference));
};

/**
 * Merges the per-surface records collected while the tokens are generated into the
 * entries of a `hearth-manifest.json`.
 */
export function buildTokensManifest(records, meta) {
  const groups = new Map();
  for (const record of records) {
    const key = `${record.layer}:${record.path.join('.')}:${record.device ?? ''}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(record);
  }

  const declared = new Map(
    records
      .filter(record => record.surface === 'css' && record.cssValue !== undefined)
      .map(record => [record.variable, record.cssValue])
  );

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
      ...(light.device && { device: light.device }),
      values: { default: light.value },
      surfaces: {},
    };
    if (dark) entry.values.dark = dark.value;
    if (light.alias) {
      entry.alias = { default: unwrapAlias(light.alias) };
      if (dark?.alias) entry.alias.dark = unwrapAlias(dark.alias);
    }
    if (css) {
      entry.surfaces.css = { variable: css.variable };
      if (css.cssValue !== undefined) {
        entry.surfaces.css.value = resolveCssValue(css.cssValue, declared);
      }
    }
    if (browser) entry.surfaces.browser = { import: BROWSER_IMPORT, path: browser.accessor };
    entry.surfaces.js = { import: JS_IMPORT, path: light.accessor };
    if (dark) entry.surfaces.js.darkPath = dark.accessor;
    return entry;
  });
  const sortKey = ({ path, device }) => `${path} ${device ?? ''}`;
  entries.sort((a, b) => (sortKey(a) < sortKey(b) ? -1 : sortKey(a) > sortKey(b) ? 1 : 0));

  return { schemaVersion: SCHEMA_VERSION, package: meta, type: 'tokens', entries };
}
