import type { IconButtonProps } from '../components/IconButton/IconButton.props';
import type { SpinnerProps } from '../components/Spinner/Spinner.props';
import type { Breakpoint } from '../types/responsive';
import { isResponsiveObject } from './is-responsive-object';

export function translateResponsiveButtonSize(
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
