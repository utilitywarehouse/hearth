import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgOpenMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M3 21V3h7.668v2.441H5.426v13.133h13.133v-5.242H21V21zm7.362-5.67-1.676-1.692 8.196-8.197h-3.67V3H21v7.787h-2.441V7.133z"
    />
  </Svg>
);
export default SvgOpenMediumIcon;
