import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgLoginMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M11.853 21v-2.426h6.706V5.441h-6.706V3H21v18zm-2.062-3.816L8.06 15.476l2.256-2.255H3v-2.426h7.285L8.029 8.539l1.73-1.707 5.169 5.191z"
    />
  </Svg>
);
export default SvgLoginMediumIcon;
