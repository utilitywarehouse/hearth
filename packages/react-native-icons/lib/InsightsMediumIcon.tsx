import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgInsightsMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M3.735 18 2 16.32l6.209-6.018a2 2 0 0 1 2.786.002l1.753 1.704a1 1 0 0 0 1.397-.002l3.691-3.615h-2.56V6H22v6.53h-2.444v-2.444l-4.73 4.616a2 2 0 0 1-2.79.003l-1.752-1.703a1 1 0 0 0-1.394 0z"
    />
  </Svg>
);
export default SvgInsightsMediumIcon;
