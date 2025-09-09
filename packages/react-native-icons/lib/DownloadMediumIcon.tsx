import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgDownloadMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="m12 16.5-5.625-5.625L7.95 9.244l2.925 2.925V3h2.25v9.169l2.925-2.925 1.575 1.631zM3 21v-5.625h2.25v3.375h13.5v-3.375H21V21z"
    />
  </Svg>
);
export default SvgDownloadMediumIcon;
