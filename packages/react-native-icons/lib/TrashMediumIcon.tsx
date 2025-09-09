import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTrashMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M10 17c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1s-1 .4-1 1v7c0 .6.4 1 1 1m4 0c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1s-1 .4-1 1v7c0 .6.4 1 1 1m-9 4V6H4V4h5V3h6v1h5v2h-1v15z"
    />
  </Svg>
);
export default SvgTrashMediumIcon;
