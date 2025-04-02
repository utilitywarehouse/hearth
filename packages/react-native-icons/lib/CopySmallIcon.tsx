import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCopySmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path fill={color} d="M5.62 15.38V1.579h11.801v13.8zm-3.54 3.54V5.12h2.04v11.76h9.76v2.041z" />
  </Svg>
);
export default SvgCopySmallIcon;
