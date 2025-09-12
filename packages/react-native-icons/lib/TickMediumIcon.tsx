import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTickMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M10.11 21 3 13.89l1.778-1.778 5.332 5.333L21.555 6l1.778 1.778z" />
  </Svg>
);
export default SvgTickMediumIcon;
