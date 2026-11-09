import type { Manifest, TokenEntry } from '@utilitywarehouse/hearth-manifest';

export type Layer = TokenEntry['layer'];

/** `web` reports the CSS and browser surfaces; `native` reports the JS surface, the only one with dark values. */
export type Platform = 'web' | 'native';

export type SearchOptions = { query: string; layer?: Layer; platform?: Platform; limit?: number };

/** What the CLI reports for a token: only the surfaces and values that exist for the platform asked for. */
export type TokenView = {
  path: string;
  device?: TokenEntry['device'];
  layer: Layer;
  type: string;
  description?: string;
  values: { default: string | number; dark?: string | number };
  alias?: { default: string; dark?: string };
  css?: { variable: string };
  browser?: { import: string; path: string };
  js?: { import: string; path: string; darkPath?: string };
};

const toView = (
  { path, device, layer, type, description, values, alias, surfaces }: TokenEntry,
  platform: Platform
): TokenView => ({
  path,
  ...(device ? { device } : {}),
  layer,
  type,
  ...(description ? { description } : {}),
  ...(platform === 'native'
    ? {
        values,
        ...(alias ? { alias } : {}),
        js: surfaces.js,
      }
    : {
        values: { default: values.default },
        ...(alias ? { alias: { default: alias.default } } : {}),
        ...(surfaces.css ? { css: surfaces.css } : {}),
        ...(surfaces.browser ? { browser: surfaces.browser } : {}),
      }),
});

export const DEFAULT_LIMIT = 20;

/** Tokens whose path contains the query, in the given layer (semantic by default) and platform (web by default). */
export const searchTokens = (
  manifest: Manifest,
  { query, layer = 'semantic', platform = 'web', limit = DEFAULT_LIMIT }: SearchOptions
): { tokens: Array<TokenView>; total: number } => {
  const needle = query.toLowerCase();
  const matches = manifest.entries.filter(
    entry =>
      entry.layer === layer &&
      `${entry.path} ${entry.description ?? ''}`.toLowerCase().includes(needle)
  );
  return {
    tokens: matches.slice(0, limit).map(entry => toView(entry, platform)),
    total: matches.length,
  };
};

export type GetResult =
  | { status: 'found'; tokens: Array<TokenView> }
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

/** Every token at an exact path (one per device for device-dependent tokens), in the given platform view (web by default). */
export const getToken = (
  manifest: Manifest,
  path: string,
  { platform = 'web' }: { platform?: Platform } = {}
): GetResult => {
  const entries = manifest.entries.filter(candidate => candidate.path === path);
  if (entries.length > 0) {
    return { status: 'found', tokens: entries.map(entry => toView(entry, platform)) };
  }
  const suggestions = manifest.entries
    .map(candidate => ({ path: candidate.path, distance: editDistance(path, candidate.path) }))
    .filter(candidate => candidate.distance <= MAX_SUGGESTION_DISTANCE)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, MAX_SUGGESTIONS)
    .map(candidate => candidate.path);
  return { status: 'not-found', path, suggestions };
};
