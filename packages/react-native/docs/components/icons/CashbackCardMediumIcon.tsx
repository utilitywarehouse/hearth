import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCashbackCardMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M20 4a2 2 0 0 1 1.994 1.85L22 6v12a2 2 0 0 1-1.85 1.994L20 20H4a2 2 0 0 1-1.995-1.85L2 18v-2.941a2 2 0 0 1 1.842-1.994l.149-.006L16.996 13a1 1 0 0 1 .125 1.993l-.116.007L4 15.059V18h16V6H4v4.032a1 1 0 0 1-1.993.116L2 10.032V6a2 2 0 0 1 1.85-1.995L4 4h16Z"
    />
  </Svg>
);
export default SvgCashbackCardMediumIcon;
