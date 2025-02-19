import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTick01SmallContainedIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12ZM6.462 9.991c.205.213.498.338.791.338.294 0 .551-.134.765-.338l3.244-3.2a.67.67 0 0 0 0-.942.67.67 0 0 0-.942 0l-3.076 3.04L5.671 7.28a.67.67 0 0 0-.942 0 .67.67 0 0 0 0 .942l1.733 1.77Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgTick01SmallContainedIcon;
