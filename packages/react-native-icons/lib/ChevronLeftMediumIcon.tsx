import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronLeftMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="m16.113 2 1.774 1.775L9.664 12l8.224 8.225L16.113 22l-10-10z" />
  </Svg>
);
export default SvgChevronLeftMediumIcon;
