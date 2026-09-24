/**
 * Helper function to convert camelCase back to nested object path
 * e.g., feedbackDangerSurfaceDefault -> ['feedback', 'danger', 'surface', 'default']
 */
export const camelCaseToPath = (camelCased: string): string[] => {
  // Split on uppercase letters but keep them
  const parts = camelCased.split(/(?=[A-Z])/).map(part => part.toLowerCase());
  return parts;
};

/**
 * Helper function to get nested value from object using path array
 */
export const getNestedValue = (obj: any, path: string[]): any => {
  return path.reduce((current, key) => {
    return current && typeof current === 'object' ? current[key] : undefined;
  }, obj);
};

const resolveThemeValueSlow = (value: string, themeMapping: any): any => {
  // Try camelCase to nested path conversion (e.g., feedbackDangerSurfaceDefault)
  if (/^[a-z][a-zA-Z]*$/.test(value)) {
    // Only camelCase strings without numbers
    const path = camelCaseToPath(value);
    const nestedValue = getNestedValue(themeMapping, path);
    if (nestedValue !== undefined) {
      return nestedValue;
    }
  }

  // Then, try the existing numeric suffix pattern (e.g., broadbandBlue100)
  const shadeMatch = value.match(/\d+$/);
  if (shadeMatch) {
    const shade = shadeMatch[0];
    const base = value.slice(0, -shade.length);
    const nested = themeMapping[base];
    if (nested && typeof nested === 'object') {
      return nested[shade] ?? value;
    }
  }

  // If none of the approaches work, return the original value
  return value;
};

/**
 * Cache for the slow resolution path (camelCase paths and numeric suffixes), keyed by
 * theme mapping object. Mapping objects are static for the lifetime of a theme, so each
 * (mapping, value) pair only pays the regex/split cost once.
 * resolveThemeValueSlow never returns `undefined` for string values (it falls back to
 * the input value), so `undefined` is safe as the cache-miss sentinel.
 */
const slowResolutionCache = new WeakMap<object, Map<string, any>>();

/**
 * Helper function to resolve a theme value
 * Supports:
 * - Direct lookup (value -> themeMapping[value])
 * - Camel case to nested path (feedbackDangerSurfaceDefault -> themeMapping.feedback.danger.surface.default)
 * - Numeric suffix pattern (broadbandBlue100 -> themeMapping.broadbandBlue[100])
 */
export const resolveThemeValue = (value: any, themeMapping: any): any => {
  if (typeof value !== 'string' || !themeMapping || typeof themeMapping !== 'object') {
    return value;
  }

  // First, try direct lookup for simple values
  if (themeMapping[value] !== undefined) {
    return themeMapping[value];
  }

  let cache = slowResolutionCache.get(themeMapping);
  const cached = cache?.get(value);
  if (cached !== undefined) {
    return cached;
  }

  const resolved = resolveThemeValueSlow(value, themeMapping);

  if (!cache) {
    cache = new Map();
    slowResolutionCache.set(themeMapping, cache);
  }
  cache.set(value, resolved);

  return resolved;
};

/**
 * Resolve a dot-notation key against the theme object.
 * e.g., 'semanticColor.text' -> theme.semanticColor.text
 * Simple keys like 'space' are resolved via direct bracket access.
 */
export const resolveThemeKey = (theme: Record<string, any>, key: string): any => {
  if (key.includes('.')) {
    return key.split('.').reduce((obj, k) => obj?.[k], theme);
  }
  return theme[key];
};

/**
 * Resolve a theme value with a fallback theme mapping.
 * First tries the primary mapping (e.g., theme.semanticColor.background for simplified tokens).
 * If not found, falls back to the secondary mapping (e.g., theme.color for full color values).
 * This ensures backward compatibility while supporting simplified token names.
 */
export const resolveThemeValueWithFallback = (
  value: any,
  primaryMapping: any,
  fallbackMapping?: any
): any => {
  const resolved = resolveThemeValue(value, primaryMapping);

  // If the value was resolved (changed from input), return it
  if (resolved !== value) {
    return resolved;
  }

  // If we have a fallback mapping and the primary didn't resolve, try the fallback
  if (fallbackMapping) {
    return resolveThemeValue(value, fallbackMapping);
  }

  return resolved;
};
