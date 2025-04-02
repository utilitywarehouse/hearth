import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronUpMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M22.283 16.141 20.408 18 12.14 9.734 3.875 18 2 16.141 12.141 6z" />
  </Svg>
);
export default SvgChevronUpMediumIcon;
