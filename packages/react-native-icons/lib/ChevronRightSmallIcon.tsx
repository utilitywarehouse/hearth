import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronRightSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path fill={color} d="M11.066 10 5.617 4.551l1.658-1.658L14.383 10l-7.108 7.107-1.658-1.658z" />
  </Svg>
);
export default SvgChevronRightSmallIcon;
