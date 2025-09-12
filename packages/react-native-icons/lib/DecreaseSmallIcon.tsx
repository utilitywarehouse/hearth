import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgDecreaseSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path fill={color} d="M9 14.175V2h2v12.175l5.6-5.6L18 10l-8 8-8-8 1.4-1.425z" />
  </Svg>
);
export default SvgDecreaseSmallIcon;
