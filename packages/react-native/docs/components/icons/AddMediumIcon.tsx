import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgAddMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M12.89 4.89a.89.89 0 1 0-1.78 0v6.223H4.89a.89.89 0 0 0 0 1.779h6.22v6.224a.89.89 0 1 0 1.78 0v-6.224h6.22a.89.89 0 0 0 0-1.779h-6.22V4.89Z"
    />
  </Svg>
);
export default SvgAddMediumIcon;
