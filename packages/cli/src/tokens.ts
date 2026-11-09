import type { Manifest, TokenEntry } from '@utilitywarehouse/hearth-manifest';

export type Layer = TokenEntry['layer'];

/** `web` reports the CSS and browser surfaces; `native` reports the JS surface, the only one with dark values. */
export type Platform = 'web' | 'native';

export type Device = NonNullable<TokenEntry['device']>;

export type SearchOptions = {
  query: string;
  layer?: Layer;
  type?: string;
  platform?: Platform;
  limit?: number;
};

export type ListOptions = Omit<SearchOptions, 'query'>;

/** What the CLI reports for a token: only the surfaces and values that exist for the platform asked for. */
export type TokenView = {
  path: string;
  layer: Layer;
  type: string;
  device?: Device;
  description?: string;
  values: { default: string | number; dark?: string | number };
  alias?: { default: string; dark?: string };
  css?: { variable: string };
  browser?: { import: string; path: string };
  js?: { import: string; path: string; darkPath?: string };
};

const DEVICE_ORDER: ReadonlyArray<Device> = ['mobile', 'tablet', 'desktop'];
const deviceRank = (entry: TokenEntry) => (entry.device ? DEVICE_ORDER.indexOf(entry.device) : -1);

/** Web consumers use the CSS or browser surface, so a token with neither (JS-only) is not theirs to see. */
const isVisibleOn = (entry: TokenEntry, platform: Platform) =>
  platform === 'native' || Boolean(entry.surfaces.css ?? entry.surfaces.browser);

const toView = (
  { path, layer, type, device, description, values, alias, surfaces }: TokenEntry,
  platform: Platform
): TokenView => ({
  path,
  ...(device ? { device } : {}),
  layer,
  type,
  ...(device ? { device } : {}),
  ...(description ? { description } : {}),
  ...(platform === 'native'
    ? {
        values,
        ...(alias ? { alias } : {}),
        js: surfaces.js,
      }
    : {
        // the JS value (8) is not what the stylesheet declares (8px)
        values: { default: surfaces.css?.value ?? values.default },
        ...(alias ? { alias: { default: alias.default } } : {}),
        ...(surfaces.css ? { css: { variable: surfaces.css.variable } } : {}),
        ...(surfaces.browser ? { browser: surfaces.browser } : {}),
      }),
});

export const DEFAULT_LIMIT = 20;

/** Entries grouped by path, each group in device order. */
const groupByPath = (entries: Array<TokenEntry>): Array<Array<TokenEntry>> => {
  const groups = new Map<string, Array<TokenEntry>>();
  for (const entry of entries) groups.set(entry.path, [...(groups.get(entry.path) ?? []), entry]);
  return [...groups.values()].map(group => group.sort((a, b) => deviceRank(a) - deviceRank(b)));
};

/** Tokens whose path contains the query, in the given layer (semantic by default) and platform (web by default). Limit and total count paths: a device-dependent path is one result with a token per device. */
export const searchTokens = (
  manifest: Manifest,
  { query, layer = 'semantic', type, platform = 'web', limit = DEFAULT_LIMIT }: SearchOptions
): { tokens: Array<TokenView>; total: number } => {
  const needle = query.toLowerCase();
  const matches = groupByPath(
    manifest.entries.filter(
      entry =>
        entry.layer === layer &&
        (type === undefined || entry.type === type) &&
        isVisibleOn(entry, platform) &&
        `${entry.path} ${entry.description ?? ''}`.toLowerCase().includes(needle)
    )
  );
  return {
    tokens: matches.slice(0, limit).flatMap(group => group.map(entry => toView(entry, platform))),
    total: matches.length,
  };
};

/** Every token in a layer (semantic by default), optionally of one type. */
export const listTokens = (manifest: Manifest, options: ListOptions) =>
  searchTokens(manifest, { ...options, query: '' });

export type GetResult =
  | { status: 'found'; token: TokenView }
  | { status: 'group'; path: string; tokens: Array<TokenView> }
  | { status: 'not-found'; path: string; suggestions: Array<string> };

const MAX_SUGGESTION_DISTANCE = 3;
const MAX_SUGGESTIONS = 3;

const editDistance = (a: string, b: string): number => {
  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      const substitution = previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1);
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, substitution);
    }
    previous = current;
  }
  return previous[b.length];
};

/**
 * The token at an exact path, in the given platform view (web by default). A path with a token
 * per device, or the prefix of a group of tokens (`semantic.shadow.md`), comes back as a group.
 */
export const getToken = (
  manifest: Manifest,
  path: string,
  { platform = 'web' }: { platform?: Platform } = {}
): GetResult => {
  const visible = manifest.entries.filter(entry => isVisibleOn(entry, platform));
  const exact = visible.filter(entry => entry.path === path);
  if (exact.length === 1 && !exact[0].device) {
    return { status: 'found', token: toView(exact[0], platform) };
  }
  const members =
    exact.length > 0 ? exact : visible.filter(entry => entry.path.startsWith(`${path}.`));
  if (members.length > 0) {
    return {
      status: 'group',
      path,
      tokens: groupByPath(members).flatMap(group => group.map(entry => toView(entry, platform))),
    };
  }
  const suggestions = [...new Set(visible.map(candidate => candidate.path))]
    .map(candidate => ({ path: candidate, distance: editDistance(path, candidate) }))
    .filter(candidate => candidate.distance <= MAX_SUGGESTION_DISTANCE)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, MAX_SUGGESTIONS)
    .map(candidate => candidate.path);
  return { status: 'not-found', path, suggestions };
};
