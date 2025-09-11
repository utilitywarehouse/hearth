import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgIncreaseMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M13.25 6.781V22h-2.5V6.781l-7 7L2 12 12 2l10 10-1.75 1.781z" />
  </Svg>
);
export default SvgIncreaseMediumIcon;
