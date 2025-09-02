import { color } from '../tokens';

const { light, dark, ...restOfColors } = color;

/**
 * Recursively flatten nested color objects into camelCase keys
 */
function flattenColorObject(obj: Record<string, any>, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {};

  Object.entries(obj).forEach(([key, value]) => {
    const camelKey = prefix ? `${prefix}${key.charAt(0).toUpperCase()}${key.slice(1)}` : key;

    if (typeof value === 'string') {
      result[camelKey] = value;
    } else if (value && typeof value === 'object') {
      Object.assign(result, flattenColorObject(value, camelKey));
    }
  });

  return result;
}

export function extractLightColorValues(): Record<string, string> {
  return Object.entries(restOfColors).reduce(
    (acc, [colorName, variants]) => {
      Object.entries(variants).forEach(([variantName, hexValue]) => {
        acc[`${colorName}${variantName}`] = hexValue;
      });
      return acc;
    },
    {} as Record<string, string>
  );
}

/**
 * Extract flattened semantic color values from light theme
 */
export function extractSemanticColorValues(): Record<string, string> {
  return flattenColorObject(light);
}

/**
 * Extract all flattened color values (primitive + semantic)
 */
export function extractAllColorValues(): Record<string, string> {
  return {
    ...extractLightColorValues(),
    ...extractSemanticColorValues(),
  };
}

export default function coloursAsArray(): Array<string> {
  const primitiveColors = Object.keys(restOfColors);
  const primitiveColorValues = Object.keys(extractLightColorValues());
  const semanticColorValues = Object.keys(extractSemanticColorValues());

  return [...primitiveColors, ...primitiveColorValues, ...semanticColorValues];
}
