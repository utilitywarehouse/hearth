import type { IconEntry, IconsManifest as Manifest } from '@utilitywarehouse/hearth-manifest';
import { suggestSimilar } from './suggest.js';

export type IconSize = IconEntry['size'];

export type SearchOptions = {
  query: string;
  size?: IconSize;
  limit?: number;
};

export type ListOptions = Omit<SearchOptions, 'query'>;

export const DEFAULT_LIMIT = 20;

/** Icons whose name, component or svg file contains the query, optionally of one size. `total` counts every match, `icons` only up to the limit. */
export const searchIcons = (
  manifest: Manifest,
  { query, size, limit = DEFAULT_LIMIT }: SearchOptions
): { icons: Array<IconEntry>; total: number } => {
  const needle = query.toLowerCase();
  const matches = manifest.entries.filter(
    entry =>
      (size === undefined || entry.size === size) &&
      `${entry.name} ${entry.component} ${entry.svg}`.toLowerCase().includes(needle)
  );
  return { icons: matches.slice(0, limit), total: matches.length };
};

/** Every icon, optionally of one size. */
export const listIcons = (manifest: Manifest, options: ListOptions) =>
  searchIcons(manifest, { ...options, query: '' });

export type GetResult =
  | { status: 'found'; icon: IconEntry }
  | { status: 'not-found'; name: string; suggestions: Array<string> };

/** The icon with exactly this name. */
export const getIcon = (manifest: Manifest, name: string): GetResult => {
  const icon = manifest.entries.find(entry => entry.name === name);
  return icon
    ? { status: 'found', icon }
    : {
        status: 'not-found',
        name,
        suggestions: suggestSimilar(
          name,
          manifest.entries.map(entry => entry.name)
        ),
      };
};
