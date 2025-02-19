import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgProtectionLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M23.3 4.3c.4-.4 1-.4 1.4 0 3.9 3.8 8.7 6.4 14.5 7.7.5.1.8.5.8 1v4c0 .6-.4 1-1 1s-1-.5-1-1v-3.2c-5.5-1.3-10.2-3.8-14-7.4-3.8 3.6-8.5 6.1-14 7.4v11.7c0 5.5 3 10.5 8.9 14.8C21.3 42 23.3 42 24 42c.7 0 2.7 0 5.1-1.7C35 36 38 31 38 25.5V22c0-.6.4-1 1-1s1 .4 1 1v3.5c0 6.2-3.2 11.7-9.7 16.4C27.4 44 24.8 44 24 44c-.8 0-3.4 0-6.3-2C11.3 37.3 8 31.7 8 25.5V13c0-.5.3-.9.8-1 5.7-1.3 10.6-3.9 14.5-7.7ZM24 17c.6 0 1 .4 1 1v5h5c.6 0 1 .4 1 1s-.4 1-1 1h-5v5c0 .6-.4 1-1 1s-1-.4-1-1v-5h-5c-.6 0-1-.4-1-1s.4-1 1-1h5v-5c0-.6.4-1 1-1Z"
    />
  </Svg>
);
export default SvgProtectionLargeIcon;
