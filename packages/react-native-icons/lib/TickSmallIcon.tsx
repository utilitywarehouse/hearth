import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTickSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path fill={color} d="M7.898 15 3 10.438l1.609-1.527 3.29 3.079L15.39 5 17 6.505z" />
  </Svg>
);
export default SvgTickSmallIcon;
