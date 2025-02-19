import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCvvMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M20 4c1.5 0 2 .946 2 2v12c0 1.5-.946 2-2 2H4c-1.297 0-2-.946-2-2v-4.032c0-.468.487-1 1-1a1 1 0 0 1 1 1V18h16V6H4v3h13.005l.116.007A1 1 0 0 1 16.996 11H3.841A2.006 2.006 0 0 1 2 9V6c0-1 .946-2 2-2h16Zm-4 8a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h4Zm0 2h-4v1h4v-1Z"
    />
  </Svg>
);
export default SvgCvvMediumIcon;
