import { RefAttributes } from 'react';
import { type ViewProps } from 'react-native';
import { ColorValue } from '../../types';

interface SpinnerProps extends ViewProps, RefAttributes<any> {
  /**
   * The size of the spinner.
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** The color of the spinner. */
  color?: ColorValue;
}

export default SpinnerProps;
