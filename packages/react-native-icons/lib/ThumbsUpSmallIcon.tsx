import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgThumbsUpSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M6.625 15V5.25L11.875 0l1.387 1.388-.975 3.862h5.588v3.3L15.137 15zm-4.5 0V5.25h3V15z"
    />
  </Svg>
);
export default SvgThumbsUpSmallIcon;
