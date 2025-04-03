import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgElectricitySmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path fill={color} d="M8.787 19v-6.75H3L11.213 1v6.75H17z" />
  </Svg>
);
export default SvgElectricitySmallIcon;
