import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgInformationSmallContainedIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M8 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6ZM8 3.286A4.723 4.723 0 0 0 3.286 8 4.723 4.723 0 0 0 8 12.714 4.723 4.723 0 0 0 12.714 8 4.723 4.723 0 0 0 8 3.286Z"
    />
    <Path
      fill={color}
      d="M7.991 11.043a.635.635 0 0 1-.634-.643l.017-2.28c0-.351.292-.643.643-.643.352 0 .643.292.634.643l-.017 2.28a.648.648 0 0 1-.643.643Z"
    />
    <Path fill={color} d="M8 6.491a.669.669 0 1 0 0-1.337.669.669 0 0 0 0 1.337Z" />
  </Svg>
);
export default SvgInformationSmallContainedIcon;
