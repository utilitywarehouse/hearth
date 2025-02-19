import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgBrowserGenericLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M41 41H7c-1.7 0-3-1.3-3-3V19c0-.6.4-1 1-1s1 .4 1 1v19c0 .6.4 1 1 1h34c.6 0 1-.4 1-1V16H5c-.6 0-1-.4-1-1v-5c0-1.7 1.3-3 3-3h34c1.7 0 3 1.3 3 3v1c0 .6-.4 1-1 1s-1-.4-1-1v-1c0-.6-.4-1-1-1H7c-.6 0-1 .4-1 1v4h37c.6 0 1 .4 1 1v23c0 1.7-1.3 3-3 3Z"
    />
    <Path fill={color} d="M9.5 11.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M12.5 11.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M15.5 11.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
  </Svg>
);
export default SvgBrowserGenericLargeIcon;
