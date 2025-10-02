import type { IconButtonProps } from '../components/IconButton/IconButton.props';
import type { SpinnerProps } from '../components/Spinner/Spinner.props';
import type { Breakpoint } from '../types/responsive';
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
export function getIconButtonSpinnerSize(
  buttonSize: IconButtonProps['size']
): SpinnerProps['size'] {
  const sizeTranslation: { [key: string]: string } = { md: 'sm', sm: 'xs' };
  if (typeof buttonSize === 'string') {
    return sizeTranslation[buttonSize] as SpinnerProps['size'];
  }
  if (isResponsiveObject(buttonSize)) {
    return Object.keys(buttonSize).reduce((acc: { [key: string]: string }, bp: string) => {
      const translation = sizeTranslation[buttonSize[bp as Breakpoint]];
      if (translation) {
        acc[bp] = translation;
      }
      return acc;
    }, {});
  }
}
