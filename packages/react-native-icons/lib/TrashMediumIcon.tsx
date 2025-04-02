import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTrashMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M9 16a1 1 0 1 0 2 0V9a1 1 0 1 0-2 0zm4 0a1 1 0 1 0 2 0V9a1 1 0 1 0-2 0zm-8 5V6H4V4h5V3h6v1h5v2h-1v15z"
    />
  </Svg>
);
export default SvgTrashMediumIcon;
