import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgGlovesLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M34 32c.6 0 1-.4 1-1V12c0-1.7-1.3-3-3-3-.4 0-.7.1-1 .2C31 7.5 29.7 6 28 6c-.4 0-.8.1-1.1.2C26.5 4.9 25.4 4 24 4s-2.5.9-2.9 2.2c-.3-.1-.7-.2-1.1-.2-1.7 0-3 1.3-3 3v6.2c-.3-.1-.6-.2-1-.2-1.7 0-3 1.3-3 3v23c0 1.7 1.3 3 3 3h16c1.7 0 3-1.3 3-3v-5c0-.6-.4-1-1-1s-1 .4-1 1v5c0 .6-.4 1-1 1H16c-.6 0-1-.4-1-1V18c0-.6.4-1 1-1s1 .4 1 1v7c0 .6.4 1 1 1s1-.4 1-1V9c0-.6.4-1 1-1s1 .4 1 1v9c0 .6.4 1 1 1s1-.4 1-1V7c0-.6.4-1 1-1s1 .4 1 1v11c0 .6.4 1 1 1s1-.4 1-1V9c0-.6.4-1 1-1s1 .4 1 1v9c0 .6.4 1 1 1s1-.4 1-1v-6c0-.6.4-1 1-1s1 .4 1 1v19c0 .6.4 1 1 1Z"
    />
  </Svg>
);
export default SvgGlovesLargeIcon;
