import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgMobileMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M6 22V2h12v20zm6-2.273a.8.8 0 0 0 .61-.261.9.9 0 0 0 .247-.648.9.9 0 0 0-.246-.648.8.8 0 0 0-.611-.26.8.8 0 0 0-.61.26.9.9 0 0 0-.247.648q0 .387.246.648a.8.8 0 0 0 .611.261m-4.286-4.09h8.572V6.544H7.714z"
    />
  </Svg>
);
export default SvgMobileMediumIcon;
