import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgFilterSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M9.377 17.33v-5.365h1.865v1.75h6v1.865h-6v1.75zM2.7 15.58v-1.865h5.365v1.865zm3-2.938v-1.75h-3V9.038h3v-1.75h1.865v5.354zm3.177-1.75V9.038h8.365v1.854zm3-2.927V2.6h1.865v1.75h3.5v1.865h-3.5v1.75zM2.7 6.215V4.35h8.365v1.865z"
    />
  </Svg>
);
export default SvgFilterSmallIcon;
