import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgNoAdvertsLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M41.1 7.5c1.6 0 2.9 1.3 2.9 2.9v15.1c0 .6-.4 1-1 1s-1-.4-1-1V10.4c0-.5-.4-.9-.9-.9H6.9c-.5 0-.9.4-.9.9v21.2c0 .5.4.9.9.9h34.2c.5 0 .9-.4.9-.9v-1.1H9c-.6 0-1-.4-1-1s.4-1 1-1h34c.6 0 1 .4 1 1v2.1c0 1.6-1.3 2.9-2.9 2.9H29v4h2.9c.6 0 1 .4 1 1s-.4 1-1 1H16c-.6 0-1-.4-1-1s.4-1 1-1h3v-4H6.9c-1.6 0-2.9-1.3-2.9-2.9V10.4c0-1.6 1.3-2.9 2.9-2.9h34.2ZM27 34.5h-6v4h6v-4Zm-8.3-20.8c.4-.4 1-.4 1.4 0l3.9 3.9 3.9-3.9c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4L25.4 19l3.9 3.9c.4.4.383 1.01 0 1.4-.383.39-1.2.2-1.4 0L24 20.4l-3.9 3.9c-.2.2-1 .4-1.4 0-.4-.4-.4-1 0-1.4l3.9-3.9-3.9-3.9c-.4-.4-.4-1 0-1.4Z"
    />
  </Svg>
);
export default SvgNoAdvertsLargeIcon;
