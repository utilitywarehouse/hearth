import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgArrowDownSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M7.325 14.414a.852.852 0 0 0 1.273 0l5.203-5.853a.788.788 0 1 0-1.177-1.047L7.96 12.76 4.464 8.825h2.214a2.071 2.071 0 0 0 2.071-2.071V2.13a.788.788 0 0 0-1.575 0v4.624a.496.496 0 0 1-.496.496H2.853a.852.852 0 0 0-.636 1.418l5.108 5.746Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgArrowDownSmallIcon;
