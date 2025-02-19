import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChat01LargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M44 21c0-7.2-5.8-13-13-13H17C9.8 8 4 13.8 4 21s5.8 13 13 13h3c.6 0 1-.4 1-1s-.4-1-1-1h-3c-6.1 0-11-4.9-11-11s4.9-11 11-11h14c6.1 0 11 4.9 11 11s-4.9 11-11 11h-1c-2.2 0-4 1.8-4 4s1.8 4 4 4h5c.6 0 1-.4 1-1s-.4-1-1-1h-5c-1.1 0-2-.9-2-2s.9-2 2-2h1c7.2 0 13-5.8 13-13Z"
    />
    <Path
      fill={color}
      d="M29.8 23.3c.263-.55.1-1-.4-1.3-.458-.275-1-.1-1.3.4C27.3 24 25.7 25 24 25c-1.7 0-3.3-1-4.2-2.5-.3-.5-.8-.7-1.3-.4-.482.29-.7.8-.4 1.3 1.2 2.2 3.4 3.6 5.9 3.6 2.5 0 4.7-1.4 5.8-3.7Z"
    />
    <Path fill={color} d="M20 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M30 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
  </Svg>
);
export default SvgChat01LargeIcon;
