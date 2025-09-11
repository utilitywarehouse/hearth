import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgMobileSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M5 18V2h10v16zm5-1.818q.303 0 .509-.21a.7.7 0 0 0 .205-.518.71.71 0 0 0-.714-.727.71.71 0 0 0-.714.727.71.71 0 0 0 .714.728m-3.571-3.273h7.142V5.636H6.43z"
    />
  </Svg>
);
export default SvgMobileSmallIcon;
