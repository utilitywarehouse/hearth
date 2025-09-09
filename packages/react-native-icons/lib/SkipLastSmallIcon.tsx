import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgSkipLastSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path fill={color} d="M9.349 10 3.9 4.551l1.658-1.658L12.666 10l-7.108 7.108L3.9 15.449z" />
    <Path fill={color} d="M16.283 17h-2.35V3h2.35z" />
  </Svg>
);
export default SvgSkipLastSmallIcon;
