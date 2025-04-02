import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgArrowDownMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M10.683 2v14.981l-6.84-6.84L2 12.005 11.995 22 22 12.006l-1.854-1.865-6.84 6.84V2z"
    />
  </Svg>
);
export default SvgArrowDownMediumIcon;
