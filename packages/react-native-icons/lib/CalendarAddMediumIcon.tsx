import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCalendarAddMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M17 22.55v-3h-3v-2h3v-3h2v3h3v2h-3v3zm-14-3v-16h3v-2h2v2h6v-2h2v2h3v9h-2v-3H5v8h7v2z"
    />
  </Svg>
);
export default SvgCalendarAddMediumIcon;
