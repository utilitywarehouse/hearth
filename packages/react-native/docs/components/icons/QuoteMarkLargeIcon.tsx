import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgQuoteMarkLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M19 9c.6 0 1 .4 1 1s-.4 1-1 1c-7.2 0-13 5.8-13 13v12c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V26c0-.6-.4-1-1-1h-7c-.6 0-1-.4-1-1s.4-1 1-1h7c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V24c0-8.3 6.7-15 15-15Zm22 0c.6 0 1 .4 1 1s-.4 1-1 1c-7.2 0-13 5.8-13 13v12c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V26c0-.6-.4-1-1-1h-7c-.6 0-1-.4-1-1s.4-1 1-1h7c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H29c-1.7 0-3-1.3-3-3V24c0-8.3 6.7-15 15-15Z"
    />
  </Svg>
);
export default SvgQuoteMarkLargeIcon;
