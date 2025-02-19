import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgSkipLeftMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M19.69 4.292a1.116 1.116 0 0 0-1.507 0l-7.415 6.988a.973.973 0 0 0 0 1.44l7.415 6.988c.414.39 1.082.39 1.507 0a.956.956 0 0 0 0-1.41l-6.684-6.288 6.684-6.288a.956.956 0 0 0 0-1.41v-.02Z"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      d="M5.06 19.988c-.583 0-1.06-.45-1.06-1V5.012c0-.55.477-1 1.06-1 .584 0 1.062.45 1.062 1v13.986c0 .55-.478 1-1.061 1v-.01Z"
    />
  </Svg>
);
export default SvgSkipLeftMediumIcon;
