import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgHomeFilledMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M4 21V9.008L11.992 3 20 9v12h-6.017v-5.237a1.99 1.99 0 0 0-3.981 0V21z" />
  </Svg>
);
export default SvgHomeFilledMediumIcon;
