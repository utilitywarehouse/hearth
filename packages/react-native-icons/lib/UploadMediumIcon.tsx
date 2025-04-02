import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgUploadMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M10.64 21v-7.82l-2.791 2.816-1.938-1.903 6.08-6.08 6.08 6.08-1.937 1.903-2.79-2.816V21zM3 9.218V3h18v6.218h-2.722V5.722H5.704v3.496z"
    />
  </Svg>
);
export default SvgUploadMediumIcon;
