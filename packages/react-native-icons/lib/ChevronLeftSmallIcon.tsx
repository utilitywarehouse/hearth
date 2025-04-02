import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronLeftSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path fill={color} d="m8.934 10 5.449 5.449-1.658 1.659L5.617 10l7.108-7.107 1.658 1.658z" />
  </Svg>
);
export default SvgChevronLeftSmallIcon;
