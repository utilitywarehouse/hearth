import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgMobileLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M36 6.9C36 5.3 34.7 4 33 4H14.9C13.3 4 12 5.3 12 6.9v34.2c0 1.6 1.3 2.9 2.9 2.9h18.2c1.6 0 2.9-1.3 2.9-2.9V36c0-.6-.4-1-1-1H17c-.6 0-1 .4-1 1s.4 1 1 1h16.9v4c0 .5-.4.9-.9.9H14.9c-.5 0-.9-.4-.9-.9V6.9c0-.5.4-.9.9-.9h18.2c.5 0 .9.4.9.9V32c0 .6.4 1 1 1s1-.4 1-1V6.9Z"
    />
    <Path
      fill={color}
      d="M29.99 9.063c0-.6-.4-1-1-1h-10.1c-.6 0-1 .4-1 1s.4 1 1 1h10.2c.5 0 .9-.4.9-1Z"
    />
    <Path fill={color} d="M25 39.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
  </Svg>
);
export default SvgMobileLargeIcon;
