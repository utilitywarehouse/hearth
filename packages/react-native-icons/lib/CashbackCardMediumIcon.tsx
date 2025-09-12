import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCashbackCardMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M2 4v16h20V4zm18 8H4V8h16z" />
  </Svg>
);
export default SvgCashbackCardMediumIcon;
