import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgBedLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M42 12c-.6 0-1 .4-1 1v17H7v-2.2c0-2.1 1.7-3.9 3.9-3.9h25.9c1.7 0 3.1-1.4 3.1-3.1 0-1.7-1.4-3.1-3.1-3.1h-7.5c-1.7 0-3.1 1.4-3.1 3.1 0 .4.1.8.2 1.1H10.9c-3.3.1-5.9 2.7-5.9 6V35c0 .6.4 1 1 1s1-.4 1-1v-3h34v3c0 .6.4 1 1 1s1-.4 1-1V13c0-.6-.4-1-1-1Zm-13.8 8.9c0-.6.5-1.1 1.1-1.1h7.5c.6 0 1.1.5 1.1 1.1 0 .6-.4 1.1-1.1 1.1h-7.5c-.6 0-1.1-.5-1.1-1.1Z"
    />
  </Svg>
);
export default SvgBedLargeIcon;
