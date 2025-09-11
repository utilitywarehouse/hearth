import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgLogoutMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="m7.5 12 5.625-5.625 1.631 1.575-2.925 2.925H21v2.25h-9.169l2.925 2.925-1.631 1.575zM3 3h5.625v2.25H5.25v13.5h3.375V21H3z"
    />
  </Svg>
);
export default SvgLogoutMediumIcon;
