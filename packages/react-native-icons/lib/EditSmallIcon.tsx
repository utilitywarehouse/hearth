import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgEditSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M3.702 16.3h1.213l8.319-8.308-1.213-1.211-8.319 8.308zM2 18v-3.612L14.447 2 18 5.633 5.617 18zM12.617 7.397l-.596-.616 1.213 1.211z"
    />
  </Svg>
);
export default SvgEditSmallIcon;
