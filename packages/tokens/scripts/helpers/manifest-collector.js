const records = [];

export const getManifestRecords = () => records;

const IDENTIFIER = /^[A-Za-z_$][\w$]*$/;

/**
 * Builds a JS accessor, using bracket notation for segments that are not valid
 * identifiers: `color.blue[200]`.
 */
export const toAccessor = (root, segments) =>
  segments.reduce((accessor, segment) => {
    if (IDENTIFIER.test(segment)) return `${accessor}.${segment}`;
    return `${accessor}[${/^\d+$/.test(segment) ? segment : JSON.stringify(segment)}]`;
  }, root);

/**
 * Records one surface's view of a colour token, for `buildTokensManifest`. Called from
 * the generators for each token they write, so the manifest names exactly what is emitted.
 */
export function collectColorToken(token, surface, fields) {
  if (token.type !== 'color') return;
  const isPrimitive = token.filePath.includes('primitive');
  records.push({
    surface,
    layer: isPrimitive ? 'primitive' : 'semantic',
    // semantic tokens are nested under their mode in the raw files (`light.background.brand`)
    path: isPrimitive ? token.path : token.path.slice(1),
    mode: isPrimitive ? 'light' : token.path[0],
    type: token.type,
    value: token.original.value,
    ...(token.original.alias && { alias: token.original.alias }),
    ...fields,
  });
}
