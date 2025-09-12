import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgFullscreenSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M2 18v-7.193h1.978v3.827L14.634 3.978h-3.827V2H18v7.193h-1.978V5.366L5.366 16.022h3.827V18z"
    />
  </Svg>
);
export default SvgFullscreenSmallIcon;
