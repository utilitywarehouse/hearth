import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronLeft01MediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M8.707 4.293a1.002 1.002 0 0 0-1.416 0L.3 11.279a1.02 1.02 0 0 0 0 1.442l6.992 6.986a1.002 1.002 0 0 0 1.416-1.414L2.408 12l6.299-6.293a1 1 0 0 0 0-1.414Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgChevronLeft01MediumIcon;
