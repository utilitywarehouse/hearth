import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCalculatorLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M35 4c1.1 0 2 .9 2 2v36.2c0 1-.9 1.8-2 1.8H13c-1.1 0-2-.8-2-1.8V23c0-.6.4-1 1-1s1 .4 1 1v19h22V6H13v12h19c.6 0 1 .4 1 1s-.4 1-1 1H13c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h22ZM21.5 37.5c.6 0 1 .4 1 1s-.4 1-1 1h-5c-.6 0-1-.4-1-1s.4-1 1-1h5Z"
    />
    <Path fill={color} d="M17.5 23.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M22.5 23.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M27.5 23.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M32.5 23.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M17.5 28.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M22.5 28.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M27.5 28.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M32.5 28.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M17.5 33.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M22.5 33.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M27.5 33.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M32.5 33.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M27.5 38.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
    <Path fill={color} d="M32.5 38.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
  </Svg>
);
export default SvgCalculatorLargeIcon;
