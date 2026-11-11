import type { AssetEntry } from './asset-kinds.js';
import { header, type PackageInfo } from './output.js';

/** One row per asset; `total` is every match, which may be more than the rows shown. */
export const formatAssets = (
  pkg: PackageInfo,
  assets: Array<AssetEntry>,
  total: number,
  query?: string
): string => {
  if (total === 0) {
    return `${header(pkg)}\n\n${query ? `No assets match "${query}".` : 'No assets.'}\n`;
  }
  const nameWidth = Math.max(...assets.map(asset => asset.name.length));
  const categoryWidth = Math.max(...assets.map(asset => asset.category.length));
  const rows = assets.map(
    asset =>
      `${asset.name.padEnd(nameWidth)}  ${asset.category.padEnd(categoryWidth)}  ${asset.file}`
  );
  const footer =
    total > assets.length
      ? ['', `Showing ${assets.length} of ${total}. Narrow the query or raise --limit.`]
      : [];
  return [header(pkg), '', ...rows, ...footer].join('\n').concat('\n');
};

export const formatAsset = (pkg: PackageInfo, asset: AssetEntry): string => {
  const rows: Array<[string, string]> = [
    ['file', asset.file],
    ['import', asset.import],
  ];
  return [
    header(pkg),
    '',
    `${asset.name}  (${asset.category})`,
    ...rows.map(([label, text]) => `  ${label.padEnd(8)}${text}`),
  ]
    .join('\n')
    .concat('\n');
};
