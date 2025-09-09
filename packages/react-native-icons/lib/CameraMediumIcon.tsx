import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCameraMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M16.85 6 15 4H9L7.15 6H2v14h20V6zm-2.72 9.13Q13.26 16 12 16t-2.13-.87T9 13t.87-2.13T12 10t2.13.87T15 13t-.87 2.13"
    />
  </Svg>
);
export default SvgCameraMediumIcon;
