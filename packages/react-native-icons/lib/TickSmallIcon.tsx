import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTickSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path fill={color} d="M7.595 15.5 2 10.286l1.399-1.304 4.196 3.91L16.601 4.5 18 5.804z" />
  </Svg>
);
export default SvgTickSmallIcon;
