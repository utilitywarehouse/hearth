import { kebabCase } from './kebab-case';

/**
 * Converts a color token or name into a CSS variable reference used by the system.
 *
 * The input is kebab-cased and interpolated into `var(--h-color-<token>)`.
 *
 * Example
 * ```ts
 * transformColorValue('Blue 500') // => 'var(--h-color-blue-500)'
 * transformColorValue('grey-200') // => 'var(--h-color-grey-200)'
 * ```
 *
 * @param colorValue A token/name representing a color (e.g., 'blue-500').
 * @returns A CSS variable string referencing the normalized color token.
 */
export function transformColorValue(colorValue: string) {
  return `var(--h-color-${kebabCase(colorValue)})`;
}
