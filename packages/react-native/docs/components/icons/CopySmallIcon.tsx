import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCopySmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M11.821 2H6.663c-.61 0-1.116.5-1.116 1.105v1.366H3.79a.791.791 0 0 0-.79.782v7.517c0 .677.558 1.23 1.242 1.23h5.705c.432 0 .79-.354.79-.782v-1.522h1.126c.632 0 1.137-.51 1.137-1.126V3.168A1.17 1.17 0 0 0 11.821 2ZM9.158 12.426H4.579V6.035h.968v4.451c0 .668.548 1.2 1.21 1.2h2.39v.74h.01Zm2.263-2.304H7.126V3.564h4.295v6.558Z"
    />
  </Svg>
);
export default SvgCopySmallIcon;
