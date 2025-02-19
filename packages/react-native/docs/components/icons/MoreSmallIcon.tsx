import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgMoreSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M8 6.667a1.333 1.333 0 1 1 0 2.666 1.333 1.333 0 0 1 0-2.666Zm4.667 0a1.333 1.333 0 1 1 0 2.666 1.333 1.333 0 0 1 0-2.666Zm-9.334 0a1.333 1.333 0 1 1 0 2.666 1.333 1.333 0 0 1 0-2.666Z"
    />
  </Svg>
);
export default SvgMoreSmallIcon;
