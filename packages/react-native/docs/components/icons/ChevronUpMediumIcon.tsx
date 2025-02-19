import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronUpMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M19.707 16.707c.39-.391.39-1.025 0-1.416L12.721 8.3a1.02 1.02 0 0 0-1.442 0l-6.986 6.992a1.002 1.002 0 0 0 1.414 1.416l6.293-6.3 6.293 6.299a1 1 0 0 0 1.414 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgChevronUpMediumIcon;
