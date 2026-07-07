import type { PackageType } from '../data/types';

/** Display metadata for each tracked package (label, type, chart colour). */
export interface PackageMetaEntry {
  name: string;
  /** Short label without the @utilitywarehouse/ scope. */
  short: string;
  color: string; // a hearth token CSS variable
}

/** Chart colours drawn from hearth-tokens (resolve via CSS custom properties). */
const COLORS: Record<string, string> = {
  '@utilitywarehouse/hearth-react': 'var(--h-color-blue-600)',
  '@utilitywarehouse/hearth-react-native': 'var(--h-color-cashback-lilac-500)',
  '@utilitywarehouse/hearth-tokens': 'var(--h-color-green-600)',
  '@utilitywarehouse/hearth-react-icons': 'var(--h-color-orange-600)',
  '@utilitywarehouse/hearth-react-native-icons': 'var(--h-color-yellow-600)',
  '@utilitywarehouse/hearth-svg-icons': 'var(--h-color-blue-400)',
  '@utilitywarehouse/hearth-svg-assets': 'var(--h-color-red-600)',
  '@utilitywarehouse/hearth-json-assets': 'var(--h-color-green-400)',
  '@utilitywarehouse/hearth-fonts': 'var(--h-color-grey-600)',
  '@utilitywarehouse/hearth-css-reset': 'var(--h-color-grey-400)',
};

const FALLBACK = 'var(--h-color-grey-500)';

export function shortName(pkg: string): string {
  return pkg.replace('@utilitywarehouse/', '');
}

export function packageColor(pkg: string): string {
  return COLORS[pkg] ?? FALLBACK;
}

/** Human labels + rendering hints per package type. */
export const TYPE_LABELS: Record<PackageType, string> = {
  'component-lib': 'Component library',
  tokens: 'Design tokens',
  icons: 'Icons',
  asset: 'Assets',
};

/** The unit each package type ranks by, for table headers. */
export const RANK_UNIT: Record<PackageType, string> = {
  'component-lib': 'Component',
  tokens: 'Token group',
  icons: 'Icon',
  asset: 'Symbol',
};

/** URL-safe slug for a package (used in routes). */
export function pkgSlug(pkg: string): string {
  return shortName(pkg);
}

export function pkgFromSlug(slug: string): string {
  return `@utilitywarehouse/${slug}`;
}
