import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgDownloadSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M10 14 5 9l1.4-1.45 2.6 2.6V2h2v8.15l2.6-2.6L15 9zm-8 4v-5h2v3h12v-3h2v5z"
    />
  </Svg>
);
export default SvgDownloadSmallIcon;
