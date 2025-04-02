import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronDownSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path fill={color} d="m10 11.066 5.449-5.449 1.658 1.658L10 14.383 2.893 7.275 4.55 5.617z" />
  </Svg>
);
export default SvgChevronDownSmallIcon;
