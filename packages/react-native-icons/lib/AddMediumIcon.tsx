import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgAddMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M13.131 22.182H10.87v-9.05H1.818v-2.263h9.05V1.818h2.263v9.05h9.051v2.263h-9.05z"
    />
  </Svg>
);
export default SvgAddMediumIcon;
