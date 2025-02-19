import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCashbackCardLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M4 12.9A2.9 2.9 0 0 1 6.9 10h34.2a2.9 2.9 0 0 1 2.9 2.9v22.2a2.9 2.9 0 0 1-2.9 2.9H6.9A2.9 2.9 0 0 1 4 35.1V30a1 1 0 0 1 1-1h34a1 1 0 1 1 0 2H6v4.1a.9.9 0 0 0 .9.9h34.2a.9.9 0 0 0 .9-.9V12.9a.9.9 0 0 0-.9-.9H6.9a.9.9 0 0 0-.9.9V26a1 1 0 1 1-2 0V12.9Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgCashbackCardLargeIcon;
