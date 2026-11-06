import { DEVICES } from './normalize-token.js';

const records = new Map();

export const getManifestRecords = () => [...records.values()];
export const clearManifestRecords = () => {
  records.clear();
};

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

// Primitive groups that are part of the manifest. Motion tokens are not emitted as CSS.
const PRIMITIVE_GROUPS = [
  'color',
  'space',
  'border-radius',
  'border-width',
  'font',
  'letter-spacing',
  'line-height',
];
// Device-dependent groups that are semantic tokens (the device file also holds component tokens).
const DEVICE_SEMANTIC_GROUPS = ['layout', 'shadow', 'typography'];
// These do not change across devices, so the CSS and browser outputs hold one instance (the
// mobile one) with no device in its name.
const DEVICE_INDEPENDENT = ['font-weight', 'body-text', 'detail-text'];

/**
 * Works out where a raw token sits in the manifest: its layer, its path without the mode
 * or device prefix the raw files nest it under, its mode and its device. Returns null for
 * tokens the manifest does not describe.
 */
export function classifyToken({ filePath, path }) {
  const file = /---(primitive|semantic|component|device)\.json$/.exec(filePath)?.[1];
  switch (file) {
    case 'primitive':
      return PRIMITIVE_GROUPS.includes(path[0])
        ? { layer: 'primitive', path, mode: 'light' }
        : null;
    case 'semantic':
      return { layer: 'semantic', path: path.slice(1), mode: path[0] };
    case 'component':
      return { layer: 'component', path: path.slice(1), mode: path[0] };
    case 'device': {
      const [device, group, ...rest] = path;
      if (!DEVICES.includes(device)) return null;
      const classified =
        group === 'components'
          ? { layer: 'component', path: rest }
          : DEVICE_SEMANTIC_GROUPS.includes(group)
            ? { layer: 'semantic', path: [group, ...rest] }
            : null;
      if (!classified) return null;
      if (path.some(segment => DEVICE_INDEPENDENT.includes(segment))) {
        return device === 'mobile' ? { ...classified, mode: 'light' } : null;
      }
      return { ...classified, mode: 'light', device };
    }
    default:
      return null;
  }
}

/**
 * Records one surface's view of a token, for `buildTokensManifest`. Called from the
 * generators for each token they write, so the manifest names exactly what is emitted.
 * Tokens the manifest does not describe are ignored; a token seen twice is kept once.
 */
export function collectToken(token, surface, fields) {
  const placement = classifyToken(token);
  if (!placement) return;
  const record = {
    surface,
    ...placement,
    type: token.type,
    value: token.original.value,
    ...(token.original.alias && { alias: token.original.alias }),
    ...fields,
  };
  const key = [surface, record.layer, record.path.join('.'), record.mode, record.device].join('|');
  if (!records.has(key)) records.set(key, record);
}
