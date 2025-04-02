import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgSkipRightMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M17.984 20V4H21v16zM3 20V4l12.38 8z" />
  </Svg>
);
export default SvgSkipRightMediumIcon;
