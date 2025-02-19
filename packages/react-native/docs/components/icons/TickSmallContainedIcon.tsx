import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTickSmallContainedIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M8 14c-3.307 0-6-2.693-6-6s2.693-6 6-6 6 2.693 6 6-2.693 6-6 6ZM8 3.333A4.672 4.672 0 0 0 3.333 8 4.672 4.672 0 0 0 8 12.667 4.672 4.672 0 0 0 12.667 8 4.672 4.672 0 0 0 8 3.333Z"
    />
    <Path
      fill={color}
      d="M7.253 10.329a1.11 1.11 0 0 1-.79-.338L4.728 8.222a.67.67 0 0 1 0-.942.67.67 0 0 1 .942 0l1.573 1.609 3.076-3.04a.67.67 0 0 1 .942 0 .67.67 0 0 1 0 .942l-3.244 3.2c-.214.205-.471.338-.765.338Z"
    />
  </Svg>
);
export default SvgTickSmallContainedIcon;
