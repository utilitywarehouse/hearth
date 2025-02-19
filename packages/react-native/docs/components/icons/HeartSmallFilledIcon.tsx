import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgHeartSmallFilledIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M13.977 6.111c-.087-.833-.354-1.503-.753-2.02a3.207 3.207 0 0 0-1.395-1.03c-.969-.376-2.014-.291-2.592-.085-.535.19-.962.571-1.258.9-.277-.332-.682-.71-1.216-.9-.578-.206-1.623-.291-2.592.085a3.207 3.207 0 0 0-1.395 1.03c-.4.517-.666 1.187-.753 2.02-.193 1.856.85 3.484 2.01 4.682 1.182 1.222 2.637 2.159 3.619 2.655a.668.668 0 0 0 .236.069.66.66 0 0 0 .404-.064c.98-.495 2.447-1.432 3.644-2.654 1.171-1.197 2.235-2.827 2.041-4.688Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgHeartSmallFilledIcon;
