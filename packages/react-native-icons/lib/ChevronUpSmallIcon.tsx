import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronUpSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path fill={color} d="m10 8.934-5.449 5.449-1.658-1.658L10 5.617l7.107 7.108-1.658 1.658z" />
  </Svg>
);
export default SvgChevronUpSmallIcon;
