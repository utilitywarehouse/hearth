import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronRightSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path fill={color} d="M6.507 18 5 16.58 11.985 10 5 3.42 6.507 2 15 10z" />
  </Svg>
);
export default SvgChevronRightSmallIcon;
