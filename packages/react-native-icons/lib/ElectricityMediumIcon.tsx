import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgElectricityMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M10.613 22.5v-7.875H4L13.387 1.5v7.875H20z" />
  </Svg>
);
export default SvgElectricityMediumIcon;
