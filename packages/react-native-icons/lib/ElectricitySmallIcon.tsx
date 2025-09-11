import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgElectricitySmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path fill={color} d="m6.75 18 .813-5.6H3.5L10.813 2h1.624l-.812 6.4H16.5L8.375 18z" />
  </Svg>
);
export default SvgElectricitySmallIcon;
