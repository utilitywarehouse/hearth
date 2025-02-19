import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgDataLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M5 5c.6 0 1 .4 1 1v35h2v-3c0-.6.4-1 1-1h8c.6 0 1 .4 1 1v3h1V26c0-.6.4-1 1-1h8c.6 0 1 .4 1 1v15h1v-5c0-.6.4-1 1-1h8c.6 0 1 .4 1 1v5h3c.6 0 1 .4 1 1s-.4 1-1 1h-4c-.6 0-1-.4-1-1v-5h-6v5c0 .6-.4 1-1 1h-3c-.6 0-1-.4-1-1V27h-6v15c0 .6-.4 1-1 1h-3c-.6 0-1-.4-1-1v-3h-6v3c0 .6-.4 1-1 1H5c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1Zm35 0c.6 0 1 .4 1 1v6c0 .6-.4 1-1 1s-1-.4-1-1V7h-2.5l1.2 1.2c.4.4.4 1 0 1.4l-9 9c-.4.4-1 .4-1.4 0L21 12.3 9 24.4c-.2.2-.5.3-.7.3-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l12.8-12.8c.4-.4 1-.4 1.4 0l6.3 6.3L35.6 9l-2.2-2.2c-.3-.4-.4-.8-.2-1.2.1-.4.5-.6.9-.6H40Z"
    />
  </Svg>
);
export default SvgDataLargeIcon;
