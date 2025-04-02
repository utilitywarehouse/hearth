import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTickMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M9.055 19.5 2 12.35l1.858-1.882 5.197 5.267L20.142 4.5 22 6.383z" />
  </Svg>
);
export default SvgTickMediumIcon;
