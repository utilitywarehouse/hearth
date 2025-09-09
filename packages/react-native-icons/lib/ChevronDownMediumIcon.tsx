import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronDownMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="m2 7.887 1.775-1.775L12 14.338l8.225-8.226L22 7.887l-10 10z" />
  </Svg>
);
export default SvgChevronDownMediumIcon;
