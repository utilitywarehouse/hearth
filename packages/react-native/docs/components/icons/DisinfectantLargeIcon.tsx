import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgDisinfectantLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="m25.2 7.104 6 .8c1 .1 1.8 1 1.8 2v3.6c0 1.2.6 2.4 1.6 3.2 1.5 1.2 2.4 3 2.4 4.9v19.4c0 1.1-.9 2-2 2H21c-1.1 0-2-.9-2-2v-19.5c0-1.9.9-3.7 2.4-4.8 1-.7 1.6-1.9 1.6-3.2v-4.3c0-1.2 1.1-2.2 2.2-2.1Zm-.2 2.2v4.3c0 1.9-.9 3.7-2.4 4.8-1 .7-1.6 1.9-1.6 3.2v19.4h14v-19.5c0-1.2-.6-2.4-1.6-3.2-1.1-.8-1.9-2-2.2-3.3H28c-.6 0-1-.4-1-1s.4-1 1-1h3v-2.9l-6-.8Zm3 15.7c.6 0 1 .4 1 1v3h3c.6 0 1 .4 1 1s-.4 1-1 1h-3v3c0 .6-.4 1-1 1s-1-.4-1-1v-3h-3c-.6 0-1-.4-1-1s.4-1 1-1h3v-3c0-.6.4-1 1-1Z"
    />
    <Path fill={color} d="M13 16a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M13 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M13 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M17 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M17 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M17 15a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M21 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M21 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M21 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
  </Svg>
);
export default SvgDisinfectantLargeIcon;
