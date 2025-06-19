import { RefAttributes } from 'react';
import { type ViewProps } from 'react-native';
import { ColorValue } from '../../types';

interface SpinnerProps extends ViewProps, RefAttributes<any> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: ColorValue;
}

export default SpinnerProps;
