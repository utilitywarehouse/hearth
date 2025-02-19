import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgWarningLargeContainedIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M24 12c-.552 0-1 .536-1 1.197v13.606c0 .66.448 1.197 1 1.197s1-.536 1-1.197V13.197c0-.66-.448-1.197-1-1.197Z"
    />
    <Path
      fill={color}
      d="M24 44c-.55 0-1-.45-1-1s.45-.999 1-.999c9.925 0 18.001-8.076 18.001-18.001S33.925 5.999 24 5.999 5.999 14.075 5.999 24c0 6.877 3.828 13.053 9.995 16.122.49.25.7.85.45 1.34-.25.489-.85.699-1.34.449C8.258 38.503 4 31.636 4 24 4 12.976 12.976 4 24 4c11.025 0 20 8.976 20 20 0 11.025-8.975 20-20 20Z"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M26 33c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgWarningLargeContainedIcon;
