import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTelevisionLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M29 40H19c-.6 0-1-.4-1-1s.4-1 1-1h4v-3c0-1.7 1.3-3 3-3h15c.6 0 1-.4 1-1V12c0-.6-.4-1-1-1H7c-.6 0-1 .4-1 1v19c0 .6.4 1 1 1h13c.6 0 1 .4 1 1s-.4 1-1 1H7c-1.7 0-3-1.3-3-3V12c0-1.7 1.3-3 3-3h34c1.7 0 3 1.3 3 3v19c0 1.7-1.3 3-3 3H26c-.6 0-1 .4-1 1v3h4c.6 0 1 .4 1 1s-.4 1-1 1Z"
    />
  </Svg>
);
export default SvgTelevisionLargeIcon;
