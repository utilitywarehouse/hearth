import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgWarningMediumContainedIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M11 8a1 1 0 1 1 2 0v4a1 1 0 1 1-2 0V8Z" />
    <Path fill={color} d="M12 15a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm0-2.222a7.778 7.778 0 1 0 0-15.556 7.778 7.778 0 0 0 0 15.556Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgWarningMediumContainedIcon;
