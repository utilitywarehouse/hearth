import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronDownMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M19.707 8.293c.39.391.39 1.025 0 1.416L12.721 16.7a1.02 1.02 0 0 1-1.442 0L4.293 9.709a1.002 1.002 0 0 1 1.414-1.416L12 14.592l6.293-6.299a1 1 0 0 1 1.414 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgChevronDownMediumIcon;
