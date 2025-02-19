import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgDesktopLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M41 6c1.7 0 3 1.396 3 2.992v13.96c0 .6-.4.998-1 .998s-1-.399-1-.997V8.992a1 1 0 0 0-1-.998H7a1 1 0 0 0-1 .998v24.033a1 1 0 0 0 1 .997h34a1 1 0 0 0 1-.997v-4.986H9c-.6 0-1-.4-1-.997 0-.599.4-.998 1-.998h34c.6 0 1 .4 1 .998v5.983c0 1.695-1.4 2.992-3 2.992H29v3.889h5c.6 0 1 .498 1 1.097 0 .598-.4.997-1 .997H14a1 1 0 0 1-1-.997c0-.599.4-1.097 1-1.097h5v-3.89H7c-1.7 0-3-1.395-3-2.991V8.992C4 7.296 5.3 6 7 6h34ZM27 35.917h-6v3.989h6v-3.99Z"
    />
    <Path fill={color} d="M25 30.93a1 1 0 0 1-2 .001 1 1 0 0 1 2 0Z" />
  </Svg>
);
export default SvgDesktopLargeIcon;
