import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCopySmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path fill={color} d="M6.03 15.4V1H17.5v14.4zM2.5 19V4.6h1.765v12.6h9.706V19z" />
  </Svg>
);
export default SvgCopySmallIcon;
