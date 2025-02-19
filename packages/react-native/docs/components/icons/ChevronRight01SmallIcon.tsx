import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronRight01SmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M15.605 7.407c.343.342.343.77.086 1.113l-5.223 5.223a.828.828 0 0 1-1.2 0c-.342-.342-.342-.77-.085-1.113l4.624-4.624L9.27 3.468c-.343-.257-.343-.771-.086-1.114l.086-.085c.257-.343.77-.343 1.113-.086l5.223 5.224Z"
    />
  </Svg>
);
export default SvgChevronRight01SmallIcon;
