import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronRightMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="m7.888 22-1.775-1.775L14.337 12 6.113 3.775 7.887 2l10 10z" />
  </Svg>
);
export default SvgChevronRightMediumIcon;
