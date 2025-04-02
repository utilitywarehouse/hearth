import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronLeftMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M16.141 2 18 3.849l-8.266 8.15L18 20.152 16.141 22 6 12z" />
  </Svg>
);
export default SvgChevronLeftMediumIcon;
