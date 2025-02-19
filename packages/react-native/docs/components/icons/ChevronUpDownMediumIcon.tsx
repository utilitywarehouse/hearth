import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronUpDownMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M16.044 9a.96.96 0 0 1-.681-.292l-3.428-3.6-3.303 3.468a.924.924 0 0 1-1.354 0 1.04 1.04 0 0 1 0-1.421l3.457-3.64a1.645 1.645 0 0 1 2.4.01l3.582 3.75a1.04 1.04 0 0 1 0 1.422.92.92 0 0 1-.682.293l.01.01Z"
    />
    <Path
      fill={color}
      d="M7.953 15c.25 0 .49.1.682.292l3.427 3.6 3.303-3.468a.924.924 0 0 1 1.354 0 1.04 1.04 0 0 1 0 1.421l-3.456 3.64a1.645 1.645 0 0 1-2.4-.01l-3.582-3.75a1.04 1.04 0 0 1 0-1.423.92.92 0 0 1 .682-.292l-.01-.01Z"
    />
  </Svg>
);
export default SvgChevronUpDownMediumIcon;
