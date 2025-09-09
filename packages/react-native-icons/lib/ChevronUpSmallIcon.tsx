import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronUpSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path fill={color} d="M18 13.493 16.58 15 10 8.015 3.42 15 2 13.493 10 5z" />
  </Svg>
);
export default SvgChevronUpSmallIcon;
