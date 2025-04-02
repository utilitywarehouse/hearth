import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronDownMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M2 7.859 3.849 6l8.15 8.267L20.152 6 22 7.859 12 18z" />
  </Svg>
);
export default SvgChevronDownMediumIcon;
