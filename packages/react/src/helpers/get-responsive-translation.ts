import type { Breakpoint, Responsive } from '../types/responsive';
import { isResponsiveObject } from './is-responsive-object';

/**
 * Translates a responsive value according to a provided mapping.
 *
 * If a responsive object is provided, the translation is applied per
 * breakpoint and a responsive object is returned.
 *
 * Examples
 * ```ts
 * getResponsiveTranslation('large', { large: 'medium', medium: 'small' }) // => 'medium'
 * getResponsiveTranslation({ mobile: 'medium', tablet: 'large' }, { large: 'medium', medium: 'small' })
 * // => { mobile: 'small', tablet: 'medium' }
 * getResponsiveTranslation<Orientation>({mobile: 'column', dekstop: 'row'}, { column: 'vertical', row: 'horizontal' });
 * // => { mobile: 'vertical', tablet: 'horizontal' }
 * ```
 *
 * @param size - The size value (string or responsive object) to translate.
 * @param translation - Mapping object from input size to output size.
 * @returns The translated size (string or responsive object). May be `undefined` if input is unsupported.
 */
export function getResponsiveTranslation<Value extends string | number>(
  value: Responsive<Value | Omit<string, Value>> | undefined,
  translation: { [key: string]: Responsive<Value | Omit<string, Value>> | undefined }
): Responsive<Value | Omit<string, Value>> | undefined {
  if (typeof value === 'string') {
    return translation[value];
  }
  if (isResponsiveObject(value)) {
    return Object.keys(value).reduce((acc: { [key: string]: string }, bp: string) => {
      const translated = translation[value[bp as Breakpoint]];
      if (translated) {
        acc[bp] = translated as string;
      }
      return acc;
    }, {});
  }
}
