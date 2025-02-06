import { RefAttributes } from 'react';
import { View, type ViewProps } from 'react-native';
import { ColorValue } from '../../types';

interface SpinnerProps extends ViewProps, RefAttributes<View> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: ColorValue;
}

export default SpinnerProps;
