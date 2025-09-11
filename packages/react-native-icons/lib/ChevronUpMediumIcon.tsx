import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronUpMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="m22 16.113-1.775 1.774L12 9.664l-8.225 8.224L2 16.113l10-10z" />
  </Svg>
);
export default SvgChevronUpMediumIcon;
