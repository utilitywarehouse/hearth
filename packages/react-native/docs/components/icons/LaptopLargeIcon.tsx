import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgLaptopLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M43 32h-1V12.9c0-.8-.3-1.5-.9-2.1-.6-.6-1.2-.8-2-.8H8.9C7.3 10 6 11.3 6 12.9V29c0 .6.4 1 1 1s1-.4 1-1V12.9c0-.5.4-.9.9-.9h30.2c.2 0 .5.1.6.3.2.2.3.4.3.6V33c0 .6.4 1 1 1h.8c-.4 1.2-1.5 2-2.7 2H8.9c-1.3 0-2.4-.8-2.7-2H37c.6 0 1-.4 1-1s-.4-1-1-1H5c-.6 0-1 .4-1 1 0 2.7 2.2 5 4.9 5h30.2c2.7 0 4.9-2.2 4.9-4.9 0-.6-.4-1.1-1-1.1Z"
    />
    <Path fill={color} d="M25 15a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
  </Svg>
);
export default SvgLaptopLargeIcon;
