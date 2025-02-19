import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChatLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M44 32c0-3.9-3.1-7-7-7h-7c-3.9 0-7 3.1-7 7s3.1 7 7 7h1.5c.6 0 1-.4 1-1s-.4-1-1-1H30c-2.8 0-5-2.2-5-5s2.2-5 5-5h7c2.8 0 5 2.2 5 5s-2.2 5-5 5h-.5c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5H39c.6 0 1-.4 1-1s-.4-1-1-1h-2.5c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h.5c3.9 0 7-3.1 7-7Z"
    />
    <Path
      fill={color}
      d="M31.3 15c0-5-4-9-9-9H13c-5 0-9 4-9 9s4 9 9 9h.7c.6 0 1 .4 1 1s-.4 1-1 1h-3.3c-.6 0-1 .4-1 1s.4 1 1 1h3.3c1.6 0 3-1.3 3-3s-1.3-3-3-3H13c-3.9 0-7-3.1-7-7s3.1-7 7-7h9.3c3.9 0 7 3.1 7 7s-3.1 7-7 7h-2c-.6 0-1 .4-1 1s.4 1 1 1h2c5 0 9-4 9-9Z"
    />
    <Path fill={color} d="M30 32a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M14 15a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M35 32a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M19 15a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M40 32a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M24 15a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
  </Svg>
);
export default SvgChatLargeIcon;
