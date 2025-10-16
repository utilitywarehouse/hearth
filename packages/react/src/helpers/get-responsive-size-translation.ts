import type { Breakpoint, Responsive } from '../types/responsive';
import { isResponsiveObject } from './is-responsive-object';

/**
 * Translates a responsive size value according to a provided mapping.
 *
 * If a responsive size object is provided, the translation is applied per
 * breakpoint and a responsive size object is returned.
 *
 * Examples
 * ```ts
 * getResponsiveSizeTranslation('large', { large: 'medium', medium: 'small' }) // => 'medium'
 * getResponsiveSizeTranslation({ mobile: 'small', tablet: 'large' }, { large: 'medium', small: 'tiny' })
 * // => { mobile: 'tiny', tablet: 'medium' }
 * ```
 *
 * @param size - The size value (string or responsive object) to translate.
 * @param translation - Mapping object from input size to output size.
 * @returns The translated size (string or responsive object). May be `undefined` if input is unsupported.
 */
export function getResponsiveSizeTranslation(
  size: Responsive<string>,
  translation: { [key: string]: Responsive<string> }
): Responsive<string> | undefined {
  if (typeof size === 'string') {
    return translation[size];
  }
  if (isResponsiveObject(size)) {
    return Object.keys(size).reduce((acc: { [key: string]: string }, bp: string) => {
      const translated = translation[size[bp as Breakpoint]];
      if (translated) {
        acc[bp] = translated as string;
      }
      return acc;
    }, {});
  }
}
