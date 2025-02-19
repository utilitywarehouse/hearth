import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCalendarMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M22 6c0 .5-.5 1-1 1s-1-.5-1-1c0-1.5-1-2-1.5-1.994L6 4C4.946 4 3.993 5 4 6v1.986h17c.513 0 1 .514 1 1V18c0 2.142-2 4-4 4H6c-2.142 0-4-2-4-4v-5a1 1 0 0 1 1-1c.513 0 1 .5 1 1v5c0 1.054 1 2 2 2h12c1.054 0 2-1 2-2V9.986H3c-.513 0-1.007-.603-1-1V6c0-2.142 2-4 4-4h12.5C20 2 22 3 22 6Z"
    />
    <Path fill={color} d="M8 16a1 1 0 1 1 0 2H6a1 1 0 1 1 0-2h2Z" />
    <Path fill={color} d="M13 16a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2h2Z" />
    <Path fill={color} d="M18 16a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2h2Z" />
    <Path fill={color} d="M8 12a1 1 0 1 1 0 2H6a1 1 0 1 1 0-2h2Z" />
    <Path fill={color} d="M13 12a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2h2Z" />
    <Path fill={color} d="M18 12a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2h2Z" />
    <Path fill={color} d="M7 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
    <Path fill={color} d="M17 5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
  </Svg>
);
export default SvgCalendarMediumIcon;
