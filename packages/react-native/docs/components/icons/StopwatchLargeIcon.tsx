import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgStopwatchLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M24 4c11 0 20 9 20 20s-9 20-20 20S4 35 4 24c0-3.3.8-6.6 2.4-9.5.3-.5.9-.7 1.4-.4.5.3.7.9.4 1.4C6.7 18.1 6 21 6 24c0 9.9 8.1 18 18 18s18-8.1 18-18S33.9 6 24 6c-.6 0-1-.4-1-1s.4-1 1-1ZM11.3 9.9l13.4 13.4c.4.4.4 1 0 1.4-.4.4-1.087.313-1.4 0L9.9 11.3c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0Zm4.8-5.3c1-.4 2.2.1 2.6 1.1.4 1-.1 2.2-1.1 2.6-1 .4-2.2-.1-2.6-1.1-.4-1 .1-2.2 1.1-2.6Z"
    />
  </Svg>
);
export default SvgStopwatchLargeIcon;
