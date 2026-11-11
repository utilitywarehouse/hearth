import type { IconEntry, IconsManifest } from '@utilitywarehouse/hearth-manifest';
import { header, type PackageInfo } from './output.js';

export type IconUsage = IconsManifest['usage'];

/** How to use one icon: the manifest's example with its `<component>` and `<svg>` placeholders filled in. */
export const usageFor = (usage: IconUsage, icon: IconEntry) => ({
  import: usage.import,
  example: usage.example.replaceAll('<component>', icon.component).replaceAll('<svg>', icon.svg),
});

/** One row per icon; `total` is every match, which may be more than the rows shown. */
export const formatIcons = (
  pkg: PackageInfo,
  icons: Array<IconEntry>,
  total: number,
  query?: string
): string => {
  if (total === 0) {
    return `${header(pkg)}\n\n${query ? `No icons match "${query}".` : 'No icons.'}\n`;
  }
  const width = Math.max(...icons.map(icon => icon.name.length));
  const rows = icons.map(icon => `${icon.name.padEnd(width)}  ${icon.size.padEnd(6)}  ${icon.svg}`);
  const footer =
    total > icons.length
      ? ['', `Showing ${icons.length} of ${total}. Narrow the query or raise --limit.`]
      : [];
  return [header(pkg), '', ...rows, ...footer].join('\n').concat('\n');
};

export const formatIcon = (pkg: PackageInfo, icon: IconEntry, usage: IconUsage): string => {
  const rows: Array<[string, string]> = [
    ['component', icon.component],
    ['svg', icon.svg],
    ['usage', usageFor(usage, icon).example],
  ];
  return [
    header(pkg),
    '',
    `${icon.name}  (${icon.size})`,
    ...rows.map(([label, text]) => `  ${label.padEnd(10)}${text}`),
  ]
    .join('\n')
    .concat('\n');
};

export const formatNoIconsPackage = (packageNames: Array<string>): string =>
  `No Hearth icons package is installed in this project. Install one of ${packageNames.join(', ')} (for example npm install ${packageNames[0]}) and run the command again.\n`;
