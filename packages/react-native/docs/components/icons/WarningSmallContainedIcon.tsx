import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgWarningSmallContainedIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M8 2c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6Zm0 10.714A4.723 4.723 0 0 0 12.714 8 4.723 4.723 0 0 0 8 3.286 4.723 4.723 0 0 0 3.286 8 4.723 4.723 0 0 0 8 12.714Z"
    />
    <Path
      fill={color}
      d="M8.009 4.957c.351 0 .642.292.634.643l-.017 2.28a.648.648 0 0 1-.643.643.635.635 0 0 1-.634-.643l.017-2.28c0-.351.291-.643.643-.643Z"
    />
    <Path fill={color} d="M8 9.509a.669.669 0 1 0 0 1.337.669.669 0 0 0 0-1.337Z" />
  </Svg>
);
export default SvgWarningSmallContainedIcon;
