import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronLeft01SmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M.269 7.344c-.343.342-.343.77-.086 1.113l5.224 5.223a.828.828 0 0 0 1.198 0c.343-.342.343-.77.086-1.113L2.067 7.943l4.538-4.538c.343-.257.343-.771.086-1.114l-.086-.085c-.257-.343-.77-.343-1.113-.086L.27 7.344Z"
    />
  </Svg>
);
export default SvgChevronLeft01SmallIcon;
