import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgSecurityLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M24.7 4.3c3.9 3.8 8.8 6.4 14.5 7.7.5.1.8.5.8 1v4c0 .6-.4 1-1 1s-1-.4-1-1v-3.2c-5.5-1.3-10.2-3.8-14-7.4-3.8 3.6-8.5 6.1-14 7.4v11.7c0 5.5 3 10.5 8.9 14.8C21.3 42 23.3 42 24 42c.7 0 2.7 0 5.1-1.7C35 36 38 31 38 25.5V22c0-.6.4-1 1-1s1 .4 1 1v3.5c0 6.2-3.3 11.8-9.7 16.4C27.4 44 24.8 44 24 44c-.8 0-3.4 0-6.3-2.1C11.3 37.2 8 31.7 8 25.5V13c0-.5.3-.9.8-1 5.8-1.3 10.6-3.9 14.5-7.7.4-.4 1-.4 1.4 0ZM24 16c2.2 0 4 1.8 4 4v2h.1c1.6 0 2.9 1.3 2.9 2.9v4.2c0 1.6-1.3 2.9-2.9 2.9h-8.2c-1.6 0-2.9-1.3-2.9-2.9v-4.2c0-1.6 1.3-2.9 2.9-2.9h.1v-2c0-2.2 1.8-4 4-4Zm0 2c-1.1 0-2 .9-2 2v2h2c.6 0 1 .4 1 1s-.4 1-1 1h-4.1c-.5 0-.9.4-.9.9v4.2c0 .5.4.9.9.9h8.2c.5 0 .9-.4.9-.9v-4.2c0-.5-.4-.9-.9-.9H27c-.6 0-1-.4-1-1v-3c0-1.1-.9-2-2-2Z"
    />
    <Path fill={color} d="M25 27a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
  </Svg>
);
export default SvgSecurityLargeIcon;
