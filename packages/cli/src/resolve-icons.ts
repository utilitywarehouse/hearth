import { resolveManifest, type ResolveResult } from './resolve-manifest.js';

/** The three icon packages share one manifest, so any installed one will do. Checked in this order. */
export const ICON_PACKAGES = [
  '@utilitywarehouse/hearth-react-icons',
  '@utilitywarehouse/hearth-react-native-icons',
  '@utilitywarehouse/hearth-svg-icons',
] as const;

export type ResolveIconsResult =
  | ResolveResult<'icons'>
  | { status: 'none-installed'; packageNames: Array<string> };

/**
 * The manifest of the first icon package installed in `fromDir`. A package that is installed but
 * unusable (no manifest, invalid, too new) is reported as it is, not skipped for the next one.
 */
export const resolveIconsManifest = (fromDir: string): ResolveIconsResult => {
  for (const packageName of ICON_PACKAGES) {
    const result = resolveManifest(packageName, fromDir, 'icons');
    if (result.status !== 'not-installed') return result;
  }
  return { status: 'none-installed', packageNames: [...ICON_PACKAGES] };
};
