import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgClockMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M12 4a8 8 0 1 1 0 16 1 1 0 1 1 0-2 6 6 0 1 0-6-6 1 1 0 1 1-2 0 8 8 0 0 1 8-8Zm0 3a1 1 0 0 1 .993.883L13 8v4.585l1.707 1.708a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083-2-2a1 1 0 0 1-.284-.576L11 13V8a1 1 0 0 1 1-1Z"
    />
  </Svg>
);
export default SvgClockMediumIcon;
