const SCHEMA_VERSION = 2;
const PACKAGE_NAME = '@utilitywarehouse/hearth-svg-assets';

// The same grouping Storybook uses; assets that fit none (the faces, the placeholder) are `other`.
const CATEGORIES = ['logo', 'mascot', 'spot', 'scene', 'technical'];

const pascalCase = kebab =>
  kebab
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

const toEntry = svg => {
  if (!svg.endsWith('.svg')) throw new Error(`${svg} is not an svg file`);
  const name = pascalCase(svg.slice(0, -'.svg'.length));
  const category = CATEGORIES.find(candidate => name.toLowerCase().includes(candidate)) ?? 'other';
  return { name, category, file: `lib/${svg}`, import: `${PACKAGE_NAME}/lib/${svg}` };
};

/** Builds the `hearth-manifest.json` of `hearth-svg-assets` from the SVG file names in its `lib`. */
export function buildSvgAssetsManifest(svgFiles, pkg) {
  const entries = svgFiles
    .map(toEntry)
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  return { schemaVersion: SCHEMA_VERSION, package: pkg, type: 'svg-assets', entries };
}
