import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgVanLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M27 10.5c.6 0 1 .4 1 1v1h2.1c1.8 0 3.4 1 4.3 2.5l3.4 5.8 5.5 4.6c.4.4.7 1 .7 1.6v3.5c0 1.1-.9 2-2 2h-3c0 2.8-2.2 5-5 5-2.4 0-4.4-1.7-4.9-4h-7.5c-.6 0-1-.4-1-1s.4-1 1-1h7.5c.5-2.3 2.5-4 4.9-4 2.1 0 3.8 1.2 4.6 3H42V27l-5.6-4.7c-.427-.358.427.358 0 0L32.7 16c-.5-.9-1.5-1.5-2.6-1.5H27c-.6 0-1-.4-1-1v-1H6v19h3.1c.5-2.3 2.5-4 4.9-4 2.8 0 5 2.2 5 5s-2.2 5-5 5c-2.4 0-4.4-1.7-4.9-4H6c-1.1 0-2-.9-2-2v-19c0-1.1.9-2 2-2h21Zm-13 19c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3Zm20 0c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3Zm-7-14c.6 0 1 .4 1 1v4h6c.6 0 1 .4 1 1s-.4 1-1 1h-6c-1.1 0-2-.9-2-2v-4c0-.6.4-1 1-1Z"
    />
  </Svg>
);
export default SvgVanLargeIcon;
