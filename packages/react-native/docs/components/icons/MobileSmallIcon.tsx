import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgMobileSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M11.47.5H4.54C3.69.5 3 1.17 3 2v10.44c0 .4.34.73.75.73s.75-.33.75-.73v-1.03h6.97v2.63H5.26c-.41 0-.75.33-.75.73 0 .4.34.73.75.73h6.2c.85 0 1.54-.67 1.54-1.5V2c0-.83-.69-1.5-1.54-1.5h.01ZM4.52 9.98l.02-8.15 6.95.03-.02 8.12H4.52Z"
    />
    <Path
      fill={color}
      d="M9.58 2.79H6.43c-.41 0-.75.34-.75.75s.34.75.75.75h3.15c.41 0 .75-.34.75-.75s-.34-.75-.75-.75Z"
    />
    <Path
      fill={color}
      d="M8.62 12.77c0-.34-.27-.61-.61-.61-.34 0-.61.27-.61.61 0 .34.27.61.61.61.34 0 .61-.27.61-.61Z"
    />
  </Svg>
);
export default SvgMobileSmallIcon;
