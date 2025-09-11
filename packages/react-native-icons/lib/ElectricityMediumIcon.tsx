import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgElectricityMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="m8 22 1-7H4l9-13h2l-1 8h6L10 22z" />
  </Svg>
);
export default SvgElectricityMediumIcon;
