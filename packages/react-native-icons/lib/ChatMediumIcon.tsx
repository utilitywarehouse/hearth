import * as React from 'react';
import Svg, { Path, Mask, G } from 'react-native-svg';
import { IconProps } from './types';
const SvgChatMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Mask
      id="a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}
    >
      <Path fill={color} d="M0 0h24v24H0z" />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill={color}
        d="M6 13a1 1 0 0 0 1 1h10a1 1 0 1 0 0-2H7a1 1 0 0 0-1 1m0-3a1 1 0 0 0 1 1h10a1 1 0 1 0 0-2H7a1 1 0 0 0-1 1m0-3a1 1 0 0 0 1 1h10a1 1 0 1 0 0-2H7a1 1 0 0 0-1 1M3 18a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v19l-4-4z"
      />
    </G>
  </Svg>
);
export default SvgChatMediumIcon;
