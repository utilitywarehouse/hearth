import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgStarSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="m4.137 19 1.558-6.65L.5 7.875l6.828-.6L10 1l2.672 6.3 6.828.575-5.195 4.475L15.863 19 10 15.475z"
    />
  </Svg>
);
export default SvgStarSmallIcon;
