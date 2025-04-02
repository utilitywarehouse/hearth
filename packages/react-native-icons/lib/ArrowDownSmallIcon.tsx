import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgArrowDownSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M11.104 2.933v9.899l4.408-4.408L17.067 10 10 17.067 2.933 10l1.555-1.576 4.408 4.408v-9.9z"
    />
  </Svg>
);
export default SvgArrowDownSmallIcon;
