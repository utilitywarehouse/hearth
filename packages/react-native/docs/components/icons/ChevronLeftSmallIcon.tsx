import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronLeftSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M4.895 7.344c-.343.342-.343.77-.086 1.113l5.223 5.223a.828.828 0 0 0 1.2 0c.342-.342.342-.77.085-1.113L6.693 7.943l4.538-4.538c.343-.257.294-.905 0-1.2a.855.855 0 0 0-1.113-.085L4.895 7.344Z"
    />
  </Svg>
);
export default SvgChevronLeftSmallIcon;
