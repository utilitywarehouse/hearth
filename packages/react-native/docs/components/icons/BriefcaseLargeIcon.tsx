import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgBriefcaseLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M41 30.5c.6 0 1 .5 1 1v4c0 1.7-1.3 3-3 3H9c-1.7 0-3-1.3-3-3v-4c0-.6.4-1 1-1s1 .4 1 1v4c0 .6.4 1 1 1h30c.6 0 1-.4 1-1v-4c0-.6.4-1 1-1Zm-2-15c1.7 0 3 1.3 3 3v7c0 2.8-2.2 5-5 5h-2v1c0 1.7-1.3 3-3 3s-3-1.3-3-3v-1h-7c-.6 0-1-.4-1-1s.4-1 1-1h7c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2h2c1.7 0 3-1.3 3-3v-7c0-.6-.4-1-1-1H22c-.6 0-1-.4-1-1s.4-1 1-1h17Zm-15-6c2.5 0 4.8 1.3 6.1 3.5.2.5.1 1.1-.4 1.4-.5.2-1.1.1-1.4-.4-.9-1.5-2.5-2.5-4.3-2.5-2.8 0-5 2.2-5 5 0 .6-.4 1-1 1H9c-.6 0-1 .4-1 1v7c0 1.7 1.3 3 3 3h2c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v3c0 1.7-1.3 3-3 3s-3-1.3-3-3v-1h-2c-2.8 0-5-2.2-5-5v-7c0-1.7 1.3-3 3-3h8.1c.5-3.4 3.4-6 6.9-6Zm9 19h-2v3c0 .6.4 1 1 1s1-.4 1-1v-3Zm-16 0h-2v3c0 .6.4 1 1 1s1-.4 1-1v-3Z"
    />
  </Svg>
);
export default SvgBriefcaseLargeIcon;
