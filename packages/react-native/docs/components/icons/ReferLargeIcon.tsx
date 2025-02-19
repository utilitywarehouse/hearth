import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgReferLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M35 34c5 0 9 4 9 9 0 .6-.4 1-1 1s-1-.4-1-1c0-3.9-3.1-7-7-7s-7 3.1-7 7c0 .6-.4 1-1 1s-1-.4-1-1c0-5 4-9 9-9ZM13 22c.6 0 1 .4 1 1 0 5 4.1 9.1 9.1 9.1h1.5l-2.2-2.2c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l3.9 3.9c.4.4.4 1 0 1.4l-3.9 3.9c-.3.3-1 .4-1.4 0-.4-.4-.4-1 0-1.4l2.2-2.2h-1.5C17 34.1 12 29.1 12 23c0-.6.4-1 1-1Zm22 1c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5Zm0 2c-1.6 0-3 1.3-3 3s1.3 3 3 3 3-1.4 3-3c0-1.7-1.4-3-3-3ZM13 15c5 0 9 4 9 9 0 .6-.4 1-1 1s-1-.4-1-1c0-3.9-3.1-7-7-7s-7 3.1-7 7c0 .6-.4 1-1 1s-1-.4-1-1c0-5 4-9 9-9Zm0-11c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5Zm0 2c-1.6 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.4-3-3-3Z"
    />
  </Svg>
);
export default SvgReferLargeIcon;
