import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCloseMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M5.6 20 4 18.4l6.4-6.4L4 5.6 5.6 4l6.4 6.4L18.4 4 20 5.6 13.6 12l6.4 6.4-1.6 1.6-6.4-6.4z"
    />
  </Svg>
);
export default SvgCloseMediumIcon;
