import { suggestSimilar } from './suggest.js';

/** What every asset kind's manifest entry has in common. */
export type AssetBase = { name: string; category: string; file: string; import: string };

export type SearchOptions = {
  query: string;
  category?: string;
  limit?: number;
};

export type ListOptions = Omit<SearchOptions, 'query'>;

export const DEFAULT_LIMIT = 20;

/** Assets whose name, file or import contains the query, optionally of one category. `total` counts every match, `assets` only up to the limit. */
export const searchAssets = <E extends AssetBase>(
  entries: ReadonlyArray<E>,
  { query, category, limit = DEFAULT_LIMIT }: SearchOptions
): { assets: Array<E>; total: number } => {
  const needle = query.toLowerCase();
  const matches = entries.filter(
    entry =>
      (category === undefined || entry.category === category) &&
      `${entry.name} ${entry.file} ${entry.import}`.toLowerCase().includes(needle)
  );
  return { assets: matches.slice(0, limit), total: matches.length };
};

/** Every asset, optionally of one category. */
export const listAssets = <E extends AssetBase>(entries: ReadonlyArray<E>, options: ListOptions) =>
  searchAssets(entries, { ...options, query: '' });

export type GetResult<E> =
  | { status: 'found'; asset: E }
  | { status: 'not-found'; name: string; suggestions: Array<string> };

/** The asset with exactly this name. */
export const getAsset = <E extends AssetBase>(
  entries: ReadonlyArray<E>,
  name: string
): GetResult<E> => {
  const asset = entries.find(entry => entry.name === name);
  return asset
    ? { status: 'found', asset }
    : {
        status: 'not-found',
        name,
        suggestions: suggestSimilar(
          name,
          entries.map(entry => entry.name)
        ),
      };
};
