import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTickSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M12.63 4.24c.32-.32.8-.32 1.12 0 .319.32.319.72.08 1.039l-7.274 7.273c-.32.32-.72.32-1.04.08L2.24 9.355a.773.773 0 0 1 0-1.119c.32-.32.72-.32 1.039-.08l2.717 2.718L12.63 4.24Z"
    />
  </Svg>
);
export default SvgTickSmallIcon;
