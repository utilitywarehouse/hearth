import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCopyMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M7.563 17.89V3.346h12.45v14.542zm-3.55 3.457V6.805h2.175v12.424h10.276v2.118z"
    />
  </Svg>
);
export default SvgCopyMediumIcon;
