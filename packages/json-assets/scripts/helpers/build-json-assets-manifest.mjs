const SCHEMA_VERSION = 2;
const PACKAGE_NAME = '@utilitywarehouse/hearth-json-assets';

const TYPES = ['animated'];
// File names are `{type}-{group}-…`; the `uw` group is the logos and monos. Anything else is `other`.
const CATEGORIES = { spot: 'spot', uw: 'logo' };

const toEntry = ({ name, filename: file }) => {
  if (!file.endsWith('.json')) throw new Error(`${file} is not a json file`);
  const [type, group] = file.slice(0, -'.json'.length).split('-');
  if (!TYPES.includes(type)) {
    throw new Error(`${file} does not start with a known type (${TYPES.join(', ')})`);
  }
  return {
    name,
    category: CATEGORIES[group] ?? 'other',
    type,
    file: `lib/${file}`,
    import: `${PACKAGE_NAME}/lib/${file}`,
  };
};

/** Builds the `hearth-manifest.json` of `hearth-json-assets` from the file names in its `lib`. */
export function buildJsonAssetsManifest(jsonFiles, pkg) {
  const entries = jsonFiles
    .map(toEntry)
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  return { schemaVersion: SCHEMA_VERSION, package: pkg, type: 'json-assets', entries };
}
