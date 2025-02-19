import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgPauseMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M7 2c.633 0 1 .6 1 1v18c0 .6-.438 1-1 1-.5 0-1-.5-1-1V3c0-.6.4-1 1-1Zm10 0c.5 0 1 .5 1 1v18c0 .6-.4 1-1 1-.5 0-1-.5-1-1V3c0-.6.4-1 1-1Z"
    />
  </Svg>
);
export default SvgPauseMediumIcon;
