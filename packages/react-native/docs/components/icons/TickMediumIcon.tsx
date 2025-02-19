import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTickMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M18.174 6.327a1.015 1.015 0 0 1 1.492 0c.426.436.426.98.106 1.416l-9.698 9.915c-.426.436-.959.436-1.385.109L4.319 13.3a1.07 1.07 0 0 1 0-1.525c.427-.436.96-.436 1.386-.11l3.623 3.705 8.846-9.043Z"
    />
  </Svg>
);
export default SvgTickMediumIcon;
