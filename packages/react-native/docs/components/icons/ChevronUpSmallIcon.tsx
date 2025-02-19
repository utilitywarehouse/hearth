import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronUpSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M8.593 4.395c-.342-.343-.77-.343-1.113-.086L2.257 9.532a.828.828 0 0 0 0 1.2c.342.342.77.342 1.113.085l4.624-4.624 4.538 4.538c.27.269.93.269 1.2 0 .268-.268.389-.809.085-1.113L8.593 4.395Z"
    />
  </Svg>
);
export default SvgChevronUpSmallIcon;
