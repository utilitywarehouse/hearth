import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgThumbsDownSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M6.571 5v9.75L11.905 20l1.41-1.387-.991-3.863H18v-3.3L15.219 5zM2 5v9.75h3.048V5z"
    />
  </Svg>
);
export default SvgThumbsDownSmallIcon;
