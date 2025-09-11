import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgInsightsMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M3.4 18 2 16.6l7.4-7.45 4 4L18.6 8H16V6h6v6h-2V9.4L13.4 16l-4-4z" />
  </Svg>
);
export default SvgInsightsMediumIcon;
