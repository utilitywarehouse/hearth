import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgArrowUpSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M7.325 1.586a.852.852 0 0 1 1.273 0l5.203 5.853a.788.788 0 1 1-1.177 1.047L7.96 3.24 4.464 7.175h2.214a2.07 2.07 0 0 1 2.071 2.071v4.624a.788.788 0 0 1-1.575 0V9.246a.496.496 0 0 0-.496-.496H2.853a.852.852 0 0 1-.636-1.418l5.108-5.746Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgArrowUpSmallIcon;
