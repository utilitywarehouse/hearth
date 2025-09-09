import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronDownSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path fill={color} d="M2 6.507 3.42 5 10 11.985 16.58 5 18 6.507 10 15z" />
  </Svg>
);
export default SvgChevronDownSmallIcon;
