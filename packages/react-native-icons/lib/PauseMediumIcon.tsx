import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgPauseMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M14.5 20.5v-17h5v17zm-10 0v-17h5v17z" />
  </Svg>
);
export default SvgPauseMediumIcon;
