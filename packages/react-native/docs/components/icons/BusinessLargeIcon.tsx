import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgBusinessLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M21 7c.6 0 1 .4 1 1v9h8c.6 0 1 .4 1 1v22c0 .6-.4 1-1 1H5c-.6 0-1-.4-1-1V8c0-.6.4-1 1-1h16Zm16 24c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1s-1-.4-1-1v-8c0-.6.4-1 1-1Zm3 0c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1s-1-.4-1-1v-8c0-.6.4-1 1-1ZM20 9H6v30h14V9Zm9 10h-7v20h7V19ZM18 32c.6 0 1 .4 1 1s-.4 1-1 1H8c-.6 0-1-.4-1-1s.4-1 1-1h10Zm9 0c.6 0 1 .4 1 1s-.4 1-1 1h-3c-.6 0-1-.4-1-1s.4-1 1-1h3Zm11.5-9c3 0 5.5 2.5 5.5 5.5V32c0 .6-.4 1-1 1s-1-.4-1-1v-3.5c0-1.9-1.6-3.5-3.5-3.5S35 26.6 35 28.5V32c0 .6-.4 1-1 1s-1-.4-1-1v-3.5c0-3 2.5-5.5 5.5-5.5ZM18 27c.6 0 1 .4 1 1s-.4 1-1 1H8c-.6 0-1-.4-1-1s.4-1 1-1h10Zm9 0c.6 0 1 .4 1 1s-.4 1-1 1h-3c-.6 0-1-.4-1-1s.4-1 1-1h3Zm-9-5c.6 0 1 .4 1 1s-.4 1-1 1H8c-.6 0-1-.4-1-1s.4-1 1-1h10Zm9 0c.6 0 1 .4 1 1s-.4 1-1 1h-3c-.6 0-1-.4-1-1s.4-1 1-1h3Zm11.5-8c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4Zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM18 17c.6 0 1 .4 1 1s-.4 1-1 1H8c-.6 0-1-.4-1-1s.4-1 1-1h10Zm0-5c.6 0 1 .4 1 1s-.4 1-1 1H8c-.6 0-1-.4-1-1s.4-1 1-1h10Z"
    />
  </Svg>
);
export default SvgBusinessLargeIcon;
