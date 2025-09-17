import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgThumbsDownSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M6.625 5v9.75l5.25 5.25 1.387-1.387-.975-3.863h5.588v-3.3L15.137 5zm-4.5 0v9.75h3V5z"
    />
  </Svg>
);
export default SvgThumbsDownSmallIcon;
