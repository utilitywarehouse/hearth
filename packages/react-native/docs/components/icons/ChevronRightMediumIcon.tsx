import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronRightMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M7.793 4.293a1.003 1.003 0 0 1 1.416 0l6.992 6.986a1.02 1.02 0 0 1 0 1.442l-6.992 6.986a1.002 1.002 0 0 1-1.416-1.414L14.092 12 7.793 5.707a1 1 0 0 1 0-1.414Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgChevronRightMediumIcon;
