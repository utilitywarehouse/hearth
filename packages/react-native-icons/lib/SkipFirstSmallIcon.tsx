import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgSkipFirstSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path fill={color} d="m10.734 10 5.449 5.45-1.658 1.658L7.417 10l7.108-7.107 1.658 1.658z" />
    <Path fill={color} d="M3.8 3h2.35v14H3.8z" />
  </Svg>
);
export default SvgSkipFirstSmallIcon;
