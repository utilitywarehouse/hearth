import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgMenuMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M3 19v-2h18v2zm0-6v-2h18v2zm0-6V5h18v2z" />
  </Svg>
);
export default SvgMenuMediumIcon;
