import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCalendarSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M9.156 12.095v-1.689h1.689v1.689zm-3.25 0v-1.689h1.689v1.689zm6.5 0v-1.689h1.689v1.689zm-3.25 3v-1.689h1.689v1.689zm-3.25 0v-1.689h1.689v1.689zm6.5 0v-1.689h1.689v1.689zM2.6 18.4V3.6h3.403v-2H7.77v2h4.459v-2h1.768v2H17.4v14.8zm2.042-2.042h10.717V9H4.642z"
    />
  </Svg>
);
export default SvgCalendarSmallIcon;
