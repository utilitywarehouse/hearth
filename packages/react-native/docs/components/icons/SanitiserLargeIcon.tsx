import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgSanitiserLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M17 4c.6 0 1 .4 1 1 0 .5.4 1 1 1h10c1.7 0 3 1.3 3 3 0 .6-.4 1-1 1s-1-.4-1-1-.5-1-1-1h-4v6h3c1.1 0 2 .9 2 2v2.3l2.6.8c2 .7 3.4 2.6 3.4 4.8V42c0 1.1-.9 2-2 2H14c-1.1 0-2-.9-2-2V23.9c0-2.1 1.4-4 3.4-4.7l2.6-.9V16c0-1.1.9-2 2-2h3V8h-4c-1.6 0-3-1.3-3-3 0-.6.4-1 1-1Zm11.1 12.1h-8v3c0 .4-.3.8-.7.9l-3.3 1.1c-1.3.4-2.1 1.5-2.1 2.8V42h20.2V24c0-1.2-.9-2.4-2.1-2.8l-3.3-1.1c-.5-.1-.8-.6-.7-1.1v-2.9ZM24 27c.6 0 1 .4 1 1v3h3c.5 0 1 .4 1 1s-.4 1-1 1h-3v3c0 .6-.4 1-1 1s-1-.4-1-1v-3h-3c-.6 0-1-.4-1-1s.4-1 1-1h3v-3c0-.6.4-1 1-1Z"
    />
  </Svg>
);
export default SvgSanitiserLargeIcon;
