import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronLeftSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path fill={color} d="M13.493 2 15 3.42 8.015 10 15 16.58 13.493 18 5 10z" />
  </Svg>
);
export default SvgChevronLeftSmallIcon;
