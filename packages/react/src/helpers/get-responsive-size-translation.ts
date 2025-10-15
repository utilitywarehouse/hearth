import type { Breakpoint, Responsive } from '../types/responsive';
import { isResponsiveObject } from './is-responsive-object';

/**
 * Translate an `IconButton` size into a corresponding `Spinner` size.
 *
 * Mapping used:
 * - `md` → `sm`
 * - `sm` → `xs`
 *
 * If a responsive size object is provided, the translation is applied per
 * breakpoint and a responsive size object is returned.
 *
 * Examples
 * ```ts
 * getIconButtonSpinnerSize('md') // => 'sm'
 * getIconButtonSpinnerSize({ mobile: 'sm', tablet: 'md' })
 * // => { mobile: 'xs', tablet: 'sm' }
 * ```
 *
 * @param buttonSize - The `IconButton` size (string or responsive object).
 * @returns The translated `Spinner` size (string or responsive object). May be `undefined` if input is unsupported.
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
