import type { SvgAssetEntry } from '@utilitywarehouse/hearth-manifest';
import type { PackageInfo } from './output.js';
import { resolveManifest, type ResolveResult } from './resolve-manifest.js';

export type AssetEntry = SvgAssetEntry;

/** The part of a resolved asset manifest the `assets` commands use, whichever kind it is. */
export type ResolveAssetsResult =
  | { status: 'ok'; manifest: { package: PackageInfo; entries: Array<AssetEntry> }; path: string }
  | Exclude<ResolveResult, { status: 'ok' }>;

/** One kind of asset (`hearth assets <name> ...`). Adding one is a module-free entry in `ASSET_KINDS`. */
export type AssetKind = {
  /** The subcommand: `hearth assets <name> list`. */
  name: string;
  /** The categories the manifest allows, for `--category`. */
  categories: ReadonlyArray<string>;
  resolve: (fromDir: string) => ResolveAssetsResult;
};

export const ASSET_KINDS: ReadonlyArray<AssetKind> = [
  {
    name: 'svg',
    categories: ['logo', 'mascot', 'spot', 'scene', 'technical', 'other'],
    resolve: fromDir =>
      resolveManifest('@utilitywarehouse/hearth-svg-assets', fromDir, 'svg-assets'),
  },
];
