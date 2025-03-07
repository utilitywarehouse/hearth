import type { IconButtonProps } from '../components/IconButton/IconButton.props';
import type { SpinnerProps } from '../components/Spinner/Spinner.props';
import type { Breakpoint } from '../types/responsive';
import { isResponsiveObject } from './is-responsive-object';

const loadingButtonSizeDict: { [key: string]: string } = { md: 'sm', sm: 'xs' };

export function translateLoadingButtonSize(
  buttonSize: IconButtonProps['size']
): SpinnerProps['size'] {
  if (typeof buttonSize === 'string') {
    return loadingButtonSizeDict[buttonSize] as SpinnerProps['size'];
  }
  if (isResponsiveObject(buttonSize)) {
    return Object.keys(buttonSize).reduce((acc: { [key: string]: string }, bp: string) => {
      const translation = loadingButtonSizeDict[buttonSize[bp as Breakpoint]];
      if (translation) {
        acc[bp] = translation;
      }
      return acc;
    }, {});
  }
}
