import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgSkipLeftMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M3 20V4h3.016v16zm18 0L8.62 12 21 4z" />
  </Svg>
);
export default SvgSkipLeftMediumIcon;
