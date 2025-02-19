import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronRight01MediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M15.293 4.293a1.003 1.003 0 0 1 1.416 0l6.992 6.986a1.02 1.02 0 0 1 0 1.442l-6.992 6.986a1.002 1.002 0 0 1-1.416-1.414L21.592 12l-6.299-6.293a1 1 0 0 1 0-1.414Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgChevronRight01MediumIcon;
