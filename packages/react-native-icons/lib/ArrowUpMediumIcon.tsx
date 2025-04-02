import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgArrowUpMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M13.317 22V7.019l6.84 6.84L22 11.995 12.006 2 2 11.995l1.854 1.864 6.84-6.84V22z"
    />
  </Svg>
);
export default SvgArrowUpMediumIcon;
