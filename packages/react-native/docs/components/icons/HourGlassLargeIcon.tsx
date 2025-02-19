import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgHourGlassLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M37 12V7c0-1.7-1.3-3-3-3H14c-1.7 0-3 1.3-3 3v4.6c0 5.6 3.4 10.4 8.1 12.4-4.7 2-8.1 6.8-8.1 12.4V41c0 1.7 1.3 3 3 3h20c1.7 0 3-1.3 3-3v-5c0-3.5-1.4-6.8-3.9-9.3-1.2-1.2-2.6-2.1-4.1-2.7 1.5-.6 2.9-1.5 4.1-2.7 2.5-2.5 3.9-5.8 3.9-9.3Zm-2 29c0 .6-.4 1-1 1H14c-.6 0-1-.4-1-1v-.5c2.8-2.2 6.8-3.5 11-3.5s8.2 1.3 11 3.5v.5Zm-3.3-12.8c2.1 2 3.3 4.8 3.3 7.8v2c-3-1.9-6.9-3-11-3s-8 1.1-11 3v-1.6c0-6.2 4.814-11.424 11-11.4 3.256.013 5.6 1.1 7.7 3.2ZM24 23c-3.155 0-5.5-1.2-7.4-3h15c-2.1 1.9-4.445 3-7.6 3Zm-9-5c-1.3-1.8-2-4-2-6.4V7c0-.6.4-1 1-1h20c.6 0 1 .4 1 1v5c0 2.2-.6 4.2-1.8 6-.1 0 .1 0 0 0H15Z"
    />
  </Svg>
);
export default SvgHourGlassLargeIcon;
