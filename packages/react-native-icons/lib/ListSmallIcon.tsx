import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgListSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path fill={color} d="M2 5a1.75 1.75 0 1 1 3.5 0A1.75 1.75 0 0 1 2 5" />
    <Path fill={color} d="M7 3.75h11v2.5H7z" />
    <Path fill={color} d="M2 10a1.75 1.75 0 1 1 3.5 0A1.75 1.75 0 0 1 2 10" />
    <Path fill={color} d="M7 8.75h11v2.5H7z" />
    <Path fill={color} d="M2 15a1.75 1.75 0 1 1 3.5 0A1.75 1.75 0 0 1 2 15" />
    <Path fill={color} d="M7 13.75h11v2.5H7z" />
  </Svg>
);
export default SvgListSmallIcon;
