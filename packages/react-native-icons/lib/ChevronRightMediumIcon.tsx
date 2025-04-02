import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronRightMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M7.859 22 6 20.151l8.267-8.15L6 3.848 7.859 2 18 12z" />
  </Svg>
);
export default SvgChevronRightMediumIcon;
