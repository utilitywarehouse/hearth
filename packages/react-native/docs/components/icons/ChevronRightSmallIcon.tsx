import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronRightSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M11.231 7.407c.343.342.343.77.086 1.113l-5.224 5.223a.828.828 0 0 1-1.198 0c-.343-.342-.343-.77-.086-1.113l4.624-4.624-4.538-4.538c-.395-.395-.343-.771-.086-1.114.289-.384.856-.428 1.199-.17l5.223 5.223Z"
    />
  </Svg>
);
export default SvgChevronRightSmallIcon;
