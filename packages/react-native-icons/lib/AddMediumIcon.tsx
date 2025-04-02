import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgAddMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M10.72 21v-7.72H3v-2.55h7.72V3h2.55v7.73H21v2.55h-7.73V21z" />
  </Svg>
);
export default SvgAddMediumIcon;
