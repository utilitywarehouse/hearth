import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgOpenMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M3 21V3h9v2H5v14h14v-7h2v9zm6.7-5.3-1.4-1.4L17.6 5H14V3h7v7h-2V6.4z" />
  </Svg>
);
export default SvgOpenMediumIcon;
