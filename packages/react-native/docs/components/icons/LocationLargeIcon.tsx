import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgLocationLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M24 6c-7.7 0-14 6.3-14 14 0 13.4 12.2 22 14 22 1 0 3.5-1.9 5.5-3.7.3-.4.3-1.1-.2-1.4-.3-.3-.8-.3-1.1-.1-1.2 1.2-2.6 2.3-4.1 3.1-1.7-.8-12-7.9-12-20 0-6.6 5.4-12 12-12s12 5.4 12 12c0 4.4-1.4 8.7-4 12.3-.3.5-.2 1.1.2 1.4.5.3 1.1.2 1.4-.2C36.4 29.5 38 24.8 38 20c0-7.7-6.3-14-14-14Z"
    />
    <Path
      fill={color}
      d="M17 20c0 3.9 3.1 7 7 7s7-3.1 7-7-3.1-7-7-7-7 3.1-7 7Zm12 0c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5 5 2.2 5 5Z"
    />
  </Svg>
);
export default SvgLocationLargeIcon;
