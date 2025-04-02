import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgDownloadMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="m11.991 16.005-6.08-6.08L7.85 8.02l2.79 2.8V3h2.704v7.82l2.79-2.799 1.939 1.903zM3 21v-6.2h2.704v3.496h12.574v-3.497H21V21z"
    />
  </Svg>
);
export default SvgDownloadMediumIcon;
