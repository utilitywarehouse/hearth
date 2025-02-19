import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgVideoLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M38.2 8c1 0 1.8 1 1.8 2.2v27.6c0 1.2-.8 2.2-1.8 2.2H9c-.6 0-1-.4-1-1s.4-1 1-1h29V10H9c-.6 0-1-.4-1-1s.4-1 1-1h29.2ZM21.5 18l7.9 5.1c.3.2.5.5.5.8 0 .3-.1.637-.438.855l-7.908 5.084c-.586.377-1.045.2-1.354-.239a.974.974 0 0 1 .3-1.4L27 24l-5-3.3V25c0 .6-.4 1-1 1s-1-.4-1-1v-6.1c0-.4.2-.7.5-.9.3-.2.7-.2 1 0Z"
    />
  </Svg>
);
export default SvgVideoLargeIcon;
