import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgDecreaseMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M10.75 17.219V2h2.5v15.219l7-7L22 12 12 22 2 12l1.75-1.781z" />
  </Svg>
);
export default SvgDecreaseMediumIcon;
