import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgEmailMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M2 20V4h20v16zm10-7 8-5V6l-8 5-8-5v2z" />
  </Svg>
);
export default SvgEmailMediumIcon;
