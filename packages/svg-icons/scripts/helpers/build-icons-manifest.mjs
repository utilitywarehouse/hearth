const SCHEMA_VERSION = 2;

/** The three packages that ship the same icon list, and how to use an icon from each. */
export const ICON_PACKAGES = {
  svg: {
    name: '@utilitywarehouse/hearth-svg-icons',
    example: "Read the file from '@utilitywarehouse/hearth-svg-icons/lib/<svg>'",
  },
  react: {
    name: '@utilitywarehouse/hearth-react-icons',
    example: "import { <component> } from '@utilitywarehouse/hearth-react-icons';",
  },
  'react-native': {
    name: '@utilitywarehouse/hearth-react-native-icons',
    example: "import { <component> } from '@utilitywarehouse/hearth-react-native-icons';",
  },
};

const FILE_NAME = /^([a-z0-9-]+)-(small|medium|large)-icon\.svg$/;
const pascalCase = kebab =>
  kebab
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

const toEntry = svg => {
  const match = FILE_NAME.exec(svg);
  if (!match) throw new Error(`${svg} is not named {name}-{small|medium|large}-icon.svg`);
  const name = `${pascalCase(match[1])}${pascalCase(match[2])}Icon`;
  return { name, size: match[2], svg, component: name };
};

/**
 * Builds the `hearth-manifest.json` of one icon package from the SVG file names in
 * `svg-icons/lib`. The entries are the same for every platform; only `package` and `usage` differ.
 */
export function buildIconsManifest(svgFiles, pkg, platform) {
  const usage = ICON_PACKAGES[platform];
  if (!usage) throw new Error(`Unknown icon platform "${platform}"`);
  const entries = svgFiles
    .map(toEntry)
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  return {
    schemaVersion: SCHEMA_VERSION,
    package: pkg,
    type: 'icons',
    usage: { platform, import: usage.name, example: usage.example },
    entries,
  };
}
