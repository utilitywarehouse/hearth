import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgClockLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M24 4c11 0 20 9 20 20s-9 20-20 20c-.6 0-1-.4-1-1s.4-1 1-1c9.9 0 18-8.1 18-18S33.9 6 24 6 6 14.1 6 24c0 6.9 3.9 13.1 10 16.2.5.2.7.8.5 1.3-.2.5-.8.7-1.3.5C8.3 38.6 4 31.7 4 24 4 13 13 4 24 4Zm0 6c.6 0 1 .5 1 1v12.6l5.7 6.5c.4.4.3 1-.1 1.4-.2.1-.5.2-.7.2-.3 0-.6-.1-.8-.3l-5.9-6.8c-.1 0-.1-.1-.1-.1 0-.1-.1-.1-.1-.2V11c0-.6.4-1 1-1Z"
    />
  </Svg>
);
export default SvgClockLargeIcon;
