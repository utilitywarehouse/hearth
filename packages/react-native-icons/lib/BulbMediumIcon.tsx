import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgBulbMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M8 18v-3.25a6.7 6.7 0 0 1-2.213-2.5A7 7 0 0 1 5 9q0-2.925 2.037-4.962T12 2t4.962 2.037T19 9a6.9 6.9 0 0 1-.788 3.238A6.96 6.96 0 0 1 16 14.75V18zm1 4v-2h6v2z"
    />
  </Svg>
);
export default SvgBulbMediumIcon;
